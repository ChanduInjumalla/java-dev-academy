import { AIProvider, AIReviewResult, ChatMessage } from './AIService';
import { GoogleGenerativeAI } from '@google/generative-ai';

export class GeminiProvider implements AIProvider {
  private genAI: GoogleGenerativeAI;
  private model: any;
  private chatModel: any;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY || '';
    this.genAI = new GoogleGenerativeAI(apiKey);
    // JSON model for structured responses (theory evaluation)
    this.model = this.genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: {
        responseMimeType: "application/json",
      }
    });
    // Text model for chat streaming (natural markdown responses)
    this.chatModel = this.genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
    });
  }

  // Fallback mock evaluation when API key is missing
  private mockEvaluate(question: string, answer: string, expectedConcepts: string[]): AIReviewResult {
    const answerLower = answer.toLowerCase().trim();
    
    if (answerLower.length < 10) {
      return {
        score: 0,
        maxScore: 10,
        isCorrect: false,
        conceptUnderstanding: 'Poor',
        missingPoints: expectedConcepts.length > 0 ? expectedConcepts : ['Detailed explanation required'],
        incorrectPoints: [],
        feedback: "Your answer is too short. Please provide a more detailed explanation.",
        suggestions: ['Write at least 2-3 sentences explaining the concept.']
      };
    }

    let conceptsToCheck = expectedConcepts;
    let isDynamic = false;
    
    if (conceptsToCheck.length === 0) {
      isDynamic = true;
      const questionWords = question.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(' ').filter(w => w.length > 3);
      conceptsToCheck = [...new Set([...questionWords, 'java', 'code', 'data', 'type', 'memory', 'object', 'class', 'method'])];
    }

    let foundConcepts = 0;
    let missingConcepts: string[] = [];

    for (const concept of conceptsToCheck) {
      const words = concept.toLowerCase().split(' ').filter(w => w.length > 3);
      const isFound = words.some(w => answerLower.includes(w)) || answerLower.includes(concept.toLowerCase());
      
      if (isFound) {
        foundConcepts++;
      } else if (!isDynamic) {
        missingConcepts.push(concept);
      }
    }

    let score = 0;
    if (isDynamic) {
      if (foundConcepts >= 2) score = 9;
      else if (foundConcepts === 1) score = 6;
      else score = 2;
    } else {
      score = Math.round((foundConcepts / conceptsToCheck.length) * 10);
      if (foundConcepts === 0 && conceptsToCheck.length > 0) {
        score = 2;
      }
    }

    const isCorrect = score >= 5;
    let conceptUnderstanding: string;
    if (score >= 9) conceptUnderstanding = 'Excellent';
    else if (score >= 7) conceptUnderstanding = 'Good';
    else if (score >= 5) conceptUnderstanding = 'Fair';
    else conceptUnderstanding = 'Poor';

    return {
      score,
      maxScore: 10,
      isCorrect,
      conceptUnderstanding,
      missingPoints: isDynamic ? [] : missingConcepts,
      incorrectPoints: [],
      feedback: isCorrect
        ? (missingConcepts.length > 0 
            ? `Good effort! You missed some details on: ${missingConcepts.join(', ')}.` 
            : 'Excellent answer! You captured the core meaning perfectly.')
        : 'Your answer does not seem relevant to the question. Focus on the core meaning and try again.',
      suggestions: isCorrect ? [] : ['Review the topic material and try to explain the concept in your own words.']
    };
  }

  async evaluateTheory(question: string, answer: string, expectedConcepts: string[], difficulty: string = 'medium', topic: string = 'Java'): Promise<AIReviewResult> {
    if (!process.env.GEMINI_API_KEY) {
      console.log('No Gemini API key found, using mock evaluation.');
      return this.mockEvaluate(question, answer, expectedConcepts);
    }

    try {
      const prompt = `You are an expert Java programming instructor evaluating a student's answer.

QUESTION: "${question}"
TOPIC: ${topic}
DIFFICULTY: ${difficulty}
EXPECTED KEY CONCEPTS: ${expectedConcepts.length > 0 ? expectedConcepts.join(', ') : 'Any correct concepts related to the question'}

STUDENT'S ANSWER: "${answer}"

EVALUATION INSTRUCTIONS:
You must evaluate this answer based PURELY on SEMANTIC MEANING and TECHNICAL CORRECTNESS.

SCORING RULES:
- Score out of 10.
- If the student demonstrates correct understanding of the core concept, award 8-10 even if wording is imperfect.
- If the answer is partially correct with some key points missing, award 5-7.
- If the answer is mostly incorrect or irrelevant, award 1-4.
- If no answer is provided, award 0.

DO NOT DEDUCT MARKS FOR:
- Grammar mistakes
- Spelling errors (unless they change the technical meaning)
- Sentence structure
- Vocabulary choices
- Punctuation errors
- Using informal language

ONLY EVALUATE:
- Is the answer conceptually correct?
- Does it answer the question being asked?
- Are the important technical points included?
- Is there any factually incorrect information?
- Are there critical concepts missing?

Return a JSON object with EXACTLY this structure:
{
  "score": <number 0-10>,
  "maxScore": 10,
  "isCorrect": <boolean — true if score >= 5>,
  "conceptUnderstanding": "<one of: Excellent, Good, Fair, Poor>",
  "missingPoints": ["<important concept or point the student missed>"],
  "incorrectPoints": ["<any factually incorrect statement the student made>"],
  "feedback": "<2-3 sentence constructive feedback explaining the evaluation>",
  "suggestions": ["<specific actionable suggestion to improve the answer>"]
}`;

      const result = await this.model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      const parsedResult = JSON.parse(text.replace(/```json/g, '').replace(/```/g, '').trim());
      
      // Ensure all required fields exist with defaults
      return {
        score: parsedResult.score ?? 0,
        maxScore: parsedResult.maxScore ?? 10,
        isCorrect: parsedResult.isCorrect ?? (parsedResult.score >= 5),
        conceptUnderstanding: parsedResult.conceptUnderstanding ?? 'Poor',
        missingPoints: parsedResult.missingPoints ?? [],
        incorrectPoints: parsedResult.incorrectPoints ?? [],
        feedback: parsedResult.feedback ?? 'Evaluation completed.',
        suggestions: parsedResult.suggestions ?? []
      };

    } catch (error) {
      console.error('Gemini Evaluation Error:', error);
      return this.mockEvaluate(question, answer, expectedConcepts);
    }
  }

  async explainCodeError(code: string, error: string): Promise<string> {
    if (!process.env.GEMINI_API_KEY) return "It looks like you have a syntax error. Check your semicolons and brackets!";
    try {
      const prompt = `Explain this Java error simply for a beginner:\nError: ${error}\nCode:\n${code}`;
      const result = await this.chatModel.generateContent(prompt);
      return result.response.text();
    } catch {
      return "Check your syntax for missing semicolons.";
    }
  }

  async generateHint(question: string, code: string): Promise<string> {
    if (!process.env.GEMINI_API_KEY) return "Try breaking the problem into smaller steps.";
    try {
      const prompt = `Give a short 1 sentence hint for this Java problem without giving the answer:\nProblem: ${question}\nCurrent Code:\n${code}`;
      const result = await this.chatModel.generateContent(prompt);
      return result.response.text();
    } catch {
      return "Are you using the correct data type for large numbers?";
    }
  }

  async *chat(messages: ChatMessage[], systemPrompt: string): AsyncGenerator<string> {
    if (!process.env.GEMINI_API_KEY) {
      yield "I'm currently in offline mode. Please configure your Gemini API key to enable AI chat.";
      return;
    }

    try {
      // Build the conversation history for Gemini
      const history = messages.slice(0, -1).map(m => ({
        role: m.role === 'user' ? 'user' as const : 'model' as const,
        parts: [{ text: m.content }],
      }));

      const chatModel = this.genAI.getGenerativeModel({
        model: 'gemini-2.5-flash',
        systemInstruction: systemPrompt
      });

      const chat = chatModel.startChat({
        history,
      });

      const lastMessage = messages[messages.length - 1];
      const result = await chat.sendMessageStream(lastMessage?.content || '');

      for await (const chunk of result.stream) {
        const text = chunk.text();
        if (text) {
          yield text;
        }
      }
    } catch (error) {
      console.error('Gemini Chat Error:', error);
      yield "I'm sorry, I encountered an error processing your request. Please try again.";
    }
  }
}
