import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, AuthRequest } from '../middleware/auth';
import { AIService, ChatMessage } from '../services/ai/AIService';

const router = Router();
const prisma = new PrismaClient();

const ALLOWED_TOPICS = [
  'Java', 'Spring', 'Spring Boot', 'JDBC', 'Hibernate', 'SQL', 'PostgreSQL',
  'Data Structures', 'Algorithms', 'OOP', 'Design Patterns', 'Git', 'Docker',
  'Linux', 'Maven', 'Gradle', 'REST APIs', 'Software Engineering',
  'Computer Science', 'Technical Interview', 'Debugging', 'Code Review',
  'Programming', 'Collections', 'Multithreading', 'Streams', 'Lambda',
  'Exception Handling', 'File I/O', 'Networking', 'Serialization', 'Generics',
  'Annotations', 'Reflection', 'JUnit', 'Testing', 'SOLID', 'Clean Code'
];

const MODE_INSTRUCTIONS: Record<string, string> = {
  learn: `You are in LEARN mode. Explain concepts clearly with examples, analogies, and Java code snippets. Be thorough but beginner-friendly. Use markdown formatting with headers, bullet points, and code blocks.`,
  'code-review': `You are in CODE REVIEW mode. The user will share Java code. Analyze it for: correctness, best practices, performance, readability, potential bugs, and improvements. Give specific line-by-line feedback.`,
  debug: `You are in DEBUG mode. The user has a bug or error. Help them find and fix it step by step. Don't give the full solution immediately — guide them through debugging with hints first, then reveal the fix.`,
  quiz: `You are in QUIZ mode. Generate practice questions about the user's current topic. Start with a question, wait for the answer, then grade it and explain. Mix multiple choice, short answer, and code-writing questions.`,
  revision: `You are in REVISION mode. Help the user review previously learned topics using spaced repetition. Focus on their WEAK topics. Ask recall questions and fill knowledge gaps.`,
  interview: `You are in INTERVIEW mode. Simulate a technical Java interview. Ask one question at a time, wait for the answer, then provide feedback. Cover: Java fundamentals, OOP, collections, multithreading, design patterns, SQL, system design.`,
  'notes-assistant': `You are in NOTES ASSISTANT mode. Help the user organize study notes, create summaries of lessons, generate flashcards, and create cheat sheets. Format output cleanly with markdown.`,
};

function buildSystemPrompt(mode: string, userContext: any): string {
  const modeInstruction = MODE_INSTRUCTIONS[mode] || MODE_INSTRUCTIONS.learn;
  
  return `You are the Java Mentor AI for Java-Dev Academy — a 90-day Java learning platform.

${modeInstruction}

IDENTITY RULES:
- Your name is "Java Mentor"
- You are warm, encouraging, and patient
- You celebrate the student's progress
- You use emoji sparingly for friendliness

TOPIC GUARDRAILS:
You ONLY answer questions about: ${ALLOWED_TOPICS.join(', ')}.
If the user asks about anything unrelated (weather, cooking, movies, personal advice, etc.), politely refuse:
"I'm your Java Mentor, dedicated to helping you learn programming! 🎓 I can only assist with Java, programming concepts, and technical interview preparation. How about we focus on your current lesson?"

FORMATTING:
- Use markdown for rich formatting
- Use \`\`\`java code blocks for Java code
- Use **bold** for key terms
- Use bullet points and numbered lists
- Keep responses focused and well-structured

${userContext.currentDay ? `STUDENT CONTEXT:
- Current Phase: ${userContext.currentPhase || 'Unknown'}
- Current Day: Day ${userContext.currentDay}
- Current Topic: ${userContext.currentTopic || 'General Java'}
- Current Lesson: ${userContext.currentLesson || 'Not specified'}
- Completed Days: ${userContext.completedDays || 0} / 90
- Level: ${userContext.level || 1}
- Total XP: ${userContext.totalXp || 0}
` : ''}
${userContext.weakTopics?.length ? `- Weak Topics (needs extra help): ${userContext.weakTopics.join(', ')}` : ''}
${userContext.strongTopics?.length ? `- Strong Topics: ${userContext.strongTopics.join(', ')}` : ''}
${userContext.currentCode ? `\nCODE IN EDITOR:\n\`\`\`java\n${userContext.currentCode}\n\`\`\`` : ''}
${userContext.currentQuestion ? `\nCURRENT QUESTION: ${userContext.currentQuestion}` : ''}

Use this context to personalize your responses. Reference the student's progress and current topic naturally.`;
}

// Helper to get user context from DB
async function getUserContext(userId: string, pageContext?: any) {
  const [user, learningProfile, progress] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, xp: true, level: true }
    }),
    prisma.aILearningProfile.findUnique({
      where: { userId },
      select: { weakTopics: true, strongTopics: true }
    }),
    prisma.roadmapProgress.findMany({
      where: { userId },
      select: { day: true, isCompleted: true }
    })
  ]);

  const completedDays = progress.filter(p => p.isCompleted).length;

  return {
    name: user?.name || 'Student',
    level: user?.level || 1,
    totalXp: user?.xp || 0,
    completedDays,
    weakTopics: learningProfile?.weakTopics || [],
    strongTopics: learningProfile?.strongTopics || [],
    currentPhase: pageContext?.phase || null,
    currentDay: pageContext?.day || null,
    currentTopic: pageContext?.topic || null,
    currentLesson: pageContext?.lesson || null,
    currentCode: pageContext?.code || null,
    currentQuestion: pageContext?.question || null,
  };
}

export default function createChatRouter(aiService: AIService) {
  
  // POST /api/chat — Stream AI response via SSE
  router.post('/', authenticate, async (req: AuthRequest, res: Response): Promise<any> => {
    try {
      const userId = req.user!.id;
      const { message, conversationId, mode = 'learn', pageContext } = req.body;

      if (!message || typeof message !== 'string' || message.trim().length === 0) {
        return res.status(400).json({ error: 'Message is required' });
      }

      // Get or create conversation
      let convo: any;
      if (conversationId) {
        convo = await prisma.conversation.findFirst({
          where: { id: conversationId, userId },
          include: { messages: { orderBy: { createdAt: 'asc' }, take: 50 } }
        });
      }

      if (!convo) {
        // Auto-generate title from first message
        const title = message.length > 50 ? message.substring(0, 50) + '...' : message;
        convo = await prisma.conversation.create({
          data: { userId, title, mode },
          include: { messages: true }
        });
      }

      // Save user message
      await prisma.conversationMessage.create({
        data: { conversationId: convo.id, role: 'user', content: message }
      });

      // Build context
      const userContext = await getUserContext(userId, pageContext);

      // Build chat history
      const history: ChatMessage[] = convo.messages.map((m: any) => ({
        role: m.role as 'user' | 'model',
        content: m.content
      }));
      history.push({ role: 'user', content: message });

      const systemPrompt = buildSystemPrompt(mode, userContext);

      // Set up SSE
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      res.setHeader('X-Conversation-Id', convo.id);

      let fullResponse = '';

      const stream = aiService.chat(history, systemPrompt);
      for await (const chunk of stream) {
        fullResponse += chunk;
        res.write(`data: ${JSON.stringify({ text: chunk })}\n\n`);
      }

      // Save AI response
      await prisma.conversationMessage.create({
        data: { conversationId: convo.id, role: 'model', content: fullResponse }
      });

      // Update conversation timestamp
      await prisma.conversation.update({
        where: { id: convo.id },
        data: { updatedAt: new Date() }
      });

      res.write(`data: ${JSON.stringify({ done: true, conversationId: convo.id })}\n\n`);
      res.end();

    } catch (error) {
      console.error('Chat error:', error);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Chat failed' });
      } else {
        res.write(`data: ${JSON.stringify({ error: 'Stream interrupted' })}\n\n`);
        res.end();
      }
    }
  });

  // GET /api/chat/conversations — list user's conversations
  router.get('/conversations', authenticate, async (req: AuthRequest, res: Response): Promise<any> => {
    try {
      const userId = req.user!.id;
      const conversations = await prisma.conversation.findMany({
        where: { userId },
        orderBy: { updatedAt: 'desc' },
        select: {
          id: true, title: true, mode: true, isFavorite: true,
          createdAt: true, updatedAt: true,
          _count: { select: { messages: true } }
        }
      });
      res.json(conversations);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch conversations' });
    }
  });

  // GET /api/chat/conversations/:id — load conversation messages
  router.get('/conversations/:id', authenticate, async (req: AuthRequest, res: Response): Promise<any> => {
    try {
      const userId = req.user!.id;
      const convo = await prisma.conversation.findFirst({
        where: { id: req.params.id as string, userId },
        include: { messages: { orderBy: { createdAt: 'asc' } } }
      });
      if (!convo) return res.status(404).json({ error: 'Conversation not found' });
      res.json(convo);
    } catch (error) {
      res.status(500).json({ error: 'Failed to load conversation' });
    }
  });

  // DELETE /api/chat/conversations/:id
  router.delete('/conversations/:id', authenticate, async (req: AuthRequest, res: Response): Promise<any> => {
    try {
      const userId = req.user!.id;
      await prisma.conversation.deleteMany({ where: { id: req.params.id as string, userId } });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete conversation' });
    }
  });

  // PATCH /api/chat/conversations/:id/rename
  router.patch('/conversations/:id/rename', authenticate, async (req: AuthRequest, res: Response): Promise<any> => {
    try {
      const userId = req.user!.id;
      const { title } = req.body;
      await prisma.conversation.updateMany({
        where: { id: req.params.id as string, userId },
        data: { title }
      });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to rename conversation' });
    }
  });

  // PATCH /api/chat/conversations/:id/favorite
  router.patch('/conversations/:id/favorite', authenticate, async (req: AuthRequest, res: Response): Promise<any> => {
    try {
      const userId = req.user!.id;
      const convo = await prisma.conversation.findFirst({ where: { id: req.params.id as string, userId } });
      if (!convo) return res.status(404).json({ error: 'Not found' });
      await prisma.conversation.update({
        where: { id: convo.id },
        data: { isFavorite: !convo.isFavorite }
      });
      res.json({ success: true, isFavorite: !convo.isFavorite });
    } catch (error) {
      res.status(500).json({ error: 'Failed to toggle favorite' });
    }
  });

  return router;
}
