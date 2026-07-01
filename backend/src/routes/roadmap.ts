import { Router } from 'express';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

const router = Router();

// GET /api/roadmap/day/:day — returns structured day data for the interactive flow
router.get('/day/:day', async (req, res) => {
  try {
    const day = parseInt(req.params.day, 10);
    if (isNaN(day) || day < 1 || day > 90) {
      return res.status(400).json({ error: 'Invalid day. Must be between 1 and 90.' });
    }

    const dayStr = day.toString().padStart(2, '0');

    const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/ChanduInjumalla/java-dev-academy/master';

    // 1. First load the markdown content (since we need it either way)
    const phaseNum = getPhaseForDay(day);
    const phaseStr = phaseNum.toString().padStart(2, '0');
    
    let markdownContent = '';
    try {
      if (process.env.NODE_ENV === 'production') {
        const res = await fetch(`${GITHUB_RAW_BASE}/Phase-${phaseStr}/Day-${dayStr}.md`);
        if (!res.ok) throw new Error('Not found');
        const { content } = matter(await res.text());
        markdownContent = content;
      } else {
        const roadmapRoot = process.env.ROADMAP_ROOT || path.join(__dirname, '..', '..', '..');
        const mdPath = path.join(roadmapRoot, `Phase-${phaseStr}`, `Day-${dayStr}.md`);
        const raw = await fs.readFile(mdPath, 'utf-8');
        const { content } = matter(raw);
        markdownContent = content;
      }
    } catch {
      markdownContent = `# Day ${day}\n\nContent coming soon...`;
    }

    // 2. Try loading structured JSON
    let dayData: any;
    
    try {
      if (process.env.NODE_ENV === 'production') {
        const res = await fetch(`${GITHUB_RAW_BASE}/backend/src/data/days/day-${dayStr}.json`);
        if (!res.ok) throw new Error('Not found');
        dayData = await res.json();
      } else {
        const jsonPath = path.join(__dirname, '..', 'data', 'days', `day-${dayStr}.json`);
        const jsonContent = await fs.readFile(jsonPath, 'utf-8');
        dayData = JSON.parse(jsonContent);
      }
      
      // Attach markdown content to the learn step
      if (dayData.steps) {
        for (const step of dayData.steps) {
          if (step.type === 'learn') {
            step.content = (markdownContent.split(/## 📝 After Study Session|### 10 Theory Questions|### .*Checklist/)[0] ?? '').trim();
          }
        }
      }
    } catch {
      // If no JSON file exists, dynamically parse the Markdown!
      const parsed = parseMarkdownToInteractiveFeatures(markdownContent);
      
      dayData = {
        day,
        phase: phaseNum,
        title: `Day ${day}`,
        difficulty: 'beginner',
        estimatedTime: '6 hours',
        xpReward: 100 + (parsed.steps.length * 50),
        learningObjectives: parsed.learningObjectives,
        steps: [
          {
            type: 'learn',
            title: `Day ${day} — Learning Content`,
            content: (markdownContent.split(/## 📝 After Study Session|### 10 Theory Questions|### .*Checklist/)[0] ?? '').trim()
          },
          ...parsed.steps
        ]
      };
    }

    res.json(dayData);
  } catch (error) {
    console.error('Error loading day data:', error);
    res.status(500).json({ error: 'Failed to load day data' });
  }
});

// Helper: parse Markdown into interactive steps
function parseMarkdownToInteractiveFeatures(markdown: string) {
  const steps: any[] = [];
  const learningObjectives: string[] = [];

  // Parse objectives
  const checklistMatch = markdown.match(/### .*Checklist([\s\S]*?)(?:---|##|$)/);
  if (checklistMatch) {
    const lines = (checklistMatch[1] ?? '').split('\n');
    for (const line of lines) {
      const match = line.match(/- \[[ x]\] (.*)/);
      if (match) learningObjectives.push((match[1] ?? '').trim());
    }
  }

  // Parse Theory Questions
  const theoryMatch = markdown.match(/### .*Theory Questions([\s\S]*?)(?:---|### |##|$)/);
  if (theoryMatch) {
    const questions = [];
    const lines = (theoryMatch[1] ?? '').split('\n');
    let qId = 1;
    for (const line of lines) {
      const match = line.match(/^\d+\.\s+(.*)/);
      if (match) {
        questions.push({
          id: `q${qId++}`,
          question: (match[1] ?? '').trim(),
          expectedConcepts: [], 
          xp: 10,
          difficulty: 'medium'
        });
      }
    }
    if (questions.length > 0) {
      steps.push({ type: 'theory-quiz', questions });
    }
  }

  // Parse Coding Questions
  const codingMatch = markdown.match(/### .*Coding Questions([\s\S]*?)(?:---|### |##|$)/);
  if (codingMatch) {
    const codingChallenges = [];
    const lines = (codingMatch[1] ?? '').split('\n');
    let cId = 1;
    for (const line of lines) {
      const match = line.match(/^\d+\.\s+(.*)/);
      if (match) {
        codingChallenges.push({
          id: `c${cId++}`,
          title: `Coding Challenge ${cId-1}`,
          description: (match[1] ?? '').trim(),
          starterCode: "public class Main {\n    public static void main(String[] args) {\n        // Write your code here\n        \n    }\n}",
          testCases: [], // Empty means just check for compilation/execution errors
          hints: ["Try breaking down the problem into smaller steps.", "Think about which data types are appropriate here."],
          xp: 20
        });
      }
    }
    if (codingChallenges.length > 0) {
      steps.push({ type: 'coding-challenge', challenges: codingChallenges });
    }
  }

  // Parse Debugging Questions
  const debugMatch = markdown.match(/### .*Debugging Questions([\s\S]*?)(?:---|### |##|$)/);
  if (debugMatch) {
    const exercises = [];
    const blocks = (debugMatch[1] ?? '').split('**Debug ');
    let dId = 1;
    for (const block of blocks) {
      if (!block.trim()) continue;
      const codeMatch = block.match(/```java([\s\S]*?)```/);
      const fixMatch = block.match(/\*Fix:\s*(.*?)\*/);
      
      if (codeMatch) {
        exercises.push({
          id: `d${dId++}`,
          title: `Debug Exercise ${dId-1}`,
          buggyCode: (codeMatch[1] ?? '').trim(),
          hint: fixMatch ? (fixMatch[1] ?? '').trim() : "Look for syntax errors or type mismatches.",
          expectedOutput: "", // Empty means any successful run passes
          xp: 15
        });
      }
    }
    if (exercises.length > 0) {
      steps.push({ type: 'debug-challenge', exercises });
    }
  }

  return { steps, learningObjectives };
}

// Helper: determine phase number from day
function getPhaseForDay(day: number): number {
  if (day <= 4) return 1;
  if (day <= 9) return 2;
  if (day <= 16) return 3;
  if (day <= 21) return 4;
  if (day <= 24) return 5;
  if (day <= 28) return 6;
  if (day <= 31) return 7;
  if (day <= 36) return 8;
  if (day <= 40) return 9;
  if (day <= 45) return 10;
  if (day <= 48) return 11;
  if (day <= 51) return 12;
  if (day <= 57) return 13;
  if (day <= 63) return 14;
  if (day <= 68) return 15;
  if (day <= 73) return 16;
  if (day <= 77) return 17;
  if (day <= 80) return 18;
  if (day <= 83) return 19;
  if (day <= 85) return 20;
  if (day <= 88) return 21;
  return 22;
}

export default router;
