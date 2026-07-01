import { AIProvider, AIReviewResult, ChatMessage } from './AIService';

export class OpenAIProvider implements AIProvider {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY || '';
  }

  // Fallback mock evaluation
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
    if (!this.apiKey) {
      console.log('No OpenAI API key found, using mock evaluation.');
      return this.mockEvaluate(question, answer, expectedConcepts);
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: `You are an expert Java mentor evaluating a student's answer semantically.
Question: ${question}
Topic: ${topic}
Difficulty: ${difficulty}
Expected concepts: ${expectedConcepts.length > 0 ? expectedConcepts.join(', ') : 'Any correct concepts related to the question'}.

CRITICAL RULES:
1. Evaluate based ONLY on semantic meaning and technical correctness.
2. COMPLETELY IGNORE grammar, spelling, sentence structure, and vocabulary.
3. If the student demonstrates correct understanding, award high marks.
4. If the answer is conceptually incorrect, award low marks and explain why.

Return ONLY a JSON object:
{"score": number, "maxScore": 10, "isCorrect": boolean, "conceptUnderstanding": "Excellent|Good|Fair|Poor", "missingPoints": ["string"], "incorrectPoints": ["string"], "feedback": "string", "suggestions": ["string"]}`
            },
            {
              role: 'user',
              content: `Student Answer: ${answer}`
            }
          ],
          response_format: { type: "json_object" }
        })
      });

      const data = await response.json();
      const result = JSON.parse(data.choices[0].message.content);
      return {
        score: result.score ?? 0,
        maxScore: result.maxScore ?? 10,
        isCorrect: result.isCorrect ?? (result.score >= 5),
        conceptUnderstanding: result.conceptUnderstanding ?? 'Poor',
        missingPoints: result.missingPoints ?? [],
        incorrectPoints: result.incorrectPoints ?? [],
        feedback: result.feedback ?? 'Evaluation completed.',
        suggestions: result.suggestions ?? []
      };

    } catch (error) {
      console.error('OpenAI API Error:', error);
      return this.mockEvaluate(question, answer, expectedConcepts);
    }
  }

  async explainCodeError(code: string, error: string): Promise<string> {
    if (!this.apiKey) return "It looks like you have a syntax error. Check your semicolons and brackets!";
    return "Mock: Check line 5 for a missing semicolon.";
  }

  async generateHint(question: string, code: string): Promise<string> {
    if (!this.apiKey) return "Try breaking the problem into smaller steps.";
    return "Mock: Are you using the correct data type for large numbers?";
  }

  async *chat(messages: ChatMessage[], systemPrompt: string): AsyncGenerator<string> {
    yield "OpenAI provider is not configured. Please switch to Gemini provider.";
  }
}
