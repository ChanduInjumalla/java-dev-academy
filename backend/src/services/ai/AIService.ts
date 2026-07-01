export interface AIReviewResult {
  score: number;
  maxScore: number;
  isCorrect: boolean;
  conceptUnderstanding: string;
  missingPoints: string[];
  incorrectPoints: string[];
  feedback: string;
  suggestions: string[];
}

// Keep the old shape for backward compat in case anything references it
export interface LegacyAIReviewResult {
  score: number;
  missingConcepts: string[];
  feedback: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface AIProvider {
  evaluateTheory(question: string, answer: string, expectedConcepts: string[], difficulty?: string, topic?: string): Promise<AIReviewResult>;
  explainCodeError(code: string, error: string): Promise<string>;
  generateHint(question: string, code: string): Promise<string>;
  chat(messages: ChatMessage[], systemPrompt: string): AsyncGenerator<string>;
}

export class AIService {
  private provider: AIProvider;

  constructor(provider: AIProvider) {
    this.provider = provider;
  }

  async evaluateTheory(question: string, answer: string, expectedConcepts: string[], difficulty?: string, topic?: string): Promise<AIReviewResult> {
    return this.provider.evaluateTheory(question, answer, expectedConcepts, difficulty, topic);
  }

  async explainCodeError(code: string, error: string): Promise<string> {
    return this.provider.explainCodeError(code, error);
  }
  
  async generateHint(question: string, code: string): Promise<string> {
    return this.provider.generateHint(question, code);
  }

  chat(messages: ChatMessage[], systemPrompt: string): AsyncGenerator<string> {
    return this.provider.chat(messages, systemPrompt);
  }
}
