export interface ExecutionResult {
  stdout: string | null;
  stderr: string | null;
  compileOutput: string | null;
  time: string | null;
  memory: number | null;
  status: {
    id: number;
    description: string;
  };
}

export interface CodeExecutionProvider {
  execute(code: string, language: string, stdin?: string): Promise<ExecutionResult>;
}

export class CodeExecutionService {
  private provider: CodeExecutionProvider;

  constructor(provider: CodeExecutionProvider) {
    this.provider = provider;
  }

  async runCode(code: string, language: string = 'java', stdin?: string): Promise<ExecutionResult> {
    return this.provider.execute(code, language, stdin);
  }
}
