import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { exec } from 'child_process';
import { configureSecurity } from './config/security';
import authRouter from './routes/auth';
import roadmapRouter from './routes/roadmap';
import progressRouter from './routes/progress';
import leaderboardRouter from './routes/leaderboard';
import { CodeExecutionService } from './services/execution/CodeExecutionService';
import { Judge0Provider } from './services/execution/Judge0Provider';
import { AIService } from './services/ai/AIService';
import { GeminiProvider } from './services/ai/GeminiProvider';

const app = express();
const port = process.env.PORT || 3000;

// Initialize Security and Middleware
configureSecurity(app);
app.use(express.json());
app.use(cookieParser());

// Initialize Services
const executionService = new CodeExecutionService(new Judge0Provider());
const aiService = new AIService(new GeminiProvider());

// --- Routes ---

// Temporary Database Setup Route (since Render free tier blocks Shell)
app.get('/api/setup-db', (req, res) => {
  exec('npx prisma db push --accept-data-loss', (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: error.message, stderr, stdout });
    }
    res.json({ message: 'Database migrated successfully!', stdout, stderr });
  });
});

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Java-Dev Academy API is running' });
});

// Auth Routes
app.use('/api/auth', authRouter);

// Progress Routes
app.use('/api/progress', progressRouter);

// Leaderboard Routes
app.use('/api/leaderboard', leaderboardRouter);

import commentsRouter from './routes/comments';
import createChatRouter from './routes/chat';

// Roadmap — serves structured day data for the interactive flow
app.use('/api/roadmap', roadmapRouter);

// Comments Router
app.use('/api/comments', commentsRouter);

// Chat Router — AI Mentor streaming chat
app.use('/api/chat', createChatRouter(aiService));

// Code Execution — compiles and runs Java code via Judge0
app.post('/api/execute', async (req, res) => {
  try {
    const { code, language, stdin } = req.body;
    if (!code) {
      return res.status(400).json({ error: 'Code is required' });
    }
    const result = await executionService.runCode(code, language, stdin);
    res.json(result);
  } catch (error) {
    console.error('Execution error:', error);
    res.status(500).json({ error: 'Failed to execute code' });
  }
});

// Code Execution with Test Cases — runs code and checks against expected outputs
app.post('/api/execute/test', async (req, res) => {
  try {
    const { code, language, testCases } = req.body;
    if (!code || !testCases || !Array.isArray(testCases)) {
      return res.status(400).json({ error: 'Code and testCases are required' });
    }

    const results = [];
    
    if (testCases.length === 0) {
      // Handle dynamically generated challenges that have no specific test cases
      const result = await executionService.runCode(code, language, "");
      const passed = !result.compileOutput && !result.stderr;
      results.push({
        passed,
        input: '(none)',
        expectedOutput: '(run without errors)',
        actualOutput: passed ? (result.stdout || 'Success!') : '',
        description: 'Compilation & Execution Check',
        isHidden: false,
        error: result.stderr || result.compileOutput || null,
        time: result.time,
        memory: result.memory
      });
    } else {
      for (const tc of testCases) {
        const result = await executionService.runCode(code, language, tc.input);
        const actualOutput = (result.stdout || '').trim();
        const expectedOutput = (tc.expectedOutput || '').trim();
        const passed = actualOutput === expectedOutput;

        results.push({
          passed,
          input: tc.isHidden ? '(hidden)' : tc.input,
          expectedOutput: tc.isHidden ? '(hidden)' : tc.expectedOutput,
          actualOutput: tc.isHidden && !passed ? '(hidden)' : actualOutput,
          description: tc.description || '',
          isHidden: tc.isHidden || false,
          error: result.stderr || result.compileOutput || null,
          time: result.time,
          memory: result.memory
        });
      }
    }

    const allPassed = results.every(r => r.passed);
    const passedCount = results.filter(r => r.passed).length;

    res.json({
      allPassed,
      passedCount,
      totalCount: results.length,
      results
    });
  } catch (error) {
    console.error('Test execution error:', error);
    res.status(500).json({ error: 'Failed to run tests' });
  }
});

// AI Evaluation — sends theory answer to Gemini for semantic grading
app.post('/api/ai/evaluate', async (req, res) => {
  try {
    const { question, answer, expectedConcepts, difficulty, topic } = req.body;
    if (!question || !answer) {
      return res.status(400).json({ error: 'Question and answer are required' });
    }
    const result = await aiService.evaluateTheory(
      question, 
      answer, 
      expectedConcepts || [], 
      difficulty || 'medium', 
      topic || 'Java'
    );
    res.json(result);
  } catch (error) {
    console.error('AI Evaluation error:', error);
    res.status(500).json({ error: 'Failed to evaluate answer' });
  }
});

// AI Hint — generates a hint for a coding problem
app.post('/api/ai/hint', async (req, res) => {
  try {
    const { question, code } = req.body;
    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }
    const hint = await aiService.generateHint(question, code || '');
    res.json({ hint });
  } catch (error) {
    console.error('AI Hint error:', error);
    res.status(500).json({ error: 'Failed to generate hint' });
  }
});

app.listen(port, () => {
  console.log(`🚀 Java-Dev Academy API running on port ${port}`);
});
