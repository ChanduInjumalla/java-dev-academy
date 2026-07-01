import { CodeExecutionProvider, ExecutionResult } from './CodeExecutionService';

export class Judge0Provider implements CodeExecutionProvider {
  private apiUrl: string;
  
  constructor() {
    // We can use the public Judge0 CE RapidAPI or a local instance
    this.apiUrl = process.env.JUDGE0_API_URL || 'https://judge0-ce.p.rapidapi.com';
  }

  async execute(code: string, language: string, stdin?: string): Promise<ExecutionResult> {
    // Language IDs for Judge0:
    // Java: 62 (OpenJDK 13) or 91 (OpenJDK 17) depending on the Judge0 instance
    const languageId = language.toLowerCase() === 'java' ? 91 : 71; // Fallback to python (71) for others

    const payload = {
      language_id: languageId,
      source_code: code,
      stdin: stdin || ''
    };

    try {
      // 0. Local execution if no API key is provided
      if (!process.env.RAPIDAPI_KEY) {
        console.log('[Local] Executing code locally (no API key provided)');
        const fs = require('fs/promises');
        const path = require('path');
        const { exec } = require('child_process');
        const util = require('util');
        const execAsync = util.promisify(exec);

        const tmpDir = '/tmp/java-exec-' + Math.random().toString(36).substring(7);
        await fs.mkdir(tmpDir, { recursive: true });

        try {
          const classNameMatch = code.match(/public\s+class\s+([A-Za-z0-9_]+)/);
          const className = classNameMatch ? classNameMatch[1] : 'Main';
          const filePath = path.join(tmpDir, `${className}.java`);
          await fs.writeFile(filePath, code);

          // Compile
          let compileOutput = null;
          try {
            await execAsync(`javac ${filePath}`);
          } catch (err: any) {
            compileOutput = err.stderr || err.stdout || 'Compilation Error';
            return {
              stdout: null,
              stderr: null,
              compileOutput,
              time: '0.00',
              memory: 0,
              status: { id: 6, description: 'Compilation Error' }
            };
          }

          // Run
          let runResult;
          try {
            // Write stdin to a file if provided
            let inputCmd = '';
            if (stdin) {
              const inPath = path.join(tmpDir, 'input.txt');
              await fs.writeFile(inPath, stdin);
              inputCmd = ` < ${inPath}`;
            }
            
            runResult = await execAsync(`java -cp ${tmpDir} ${className}${inputCmd}`, { timeout: 5000 });
            return {
              stdout: runResult.stdout || '',
              stderr: runResult.stderr || null,
              compileOutput: null,
              time: '0.05',
              memory: 2048,
              status: { id: 3, description: 'Accepted' }
            };
          } catch (err: any) {
            return {
              stdout: err.stdout || null,
              stderr: err.stderr || 'Runtime Error',
              compileOutput: null,
              time: '0.05',
              memory: 2048,
              status: { id: 11, description: 'Runtime Error' }
            };
          }
        } finally {
          await fs.rm(tmpDir, { recursive: true, force: true }).catch(() => {});
        }
      }

      // 1. Submit the code
      const response = await fetch(`${this.apiUrl}/submissions?base64_encoded=false&wait=true`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY || '', // Placeholder for .env key
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Judge0 API error: ${response.statusText}`);
      }

      const data = await response.json();
      
      // 2. Format and return the result
      return {
        stdout: data.stdout,
        stderr: data.stderr,
        compileOutput: data.compile_output,
        time: data.time,
        memory: data.memory,
        status: {
          id: data.status?.id || 0,
          description: data.status?.description || 'Unknown'
        }
      };

    } catch (error: any) {
      console.error('Execution error:', error);
      return {
        stdout: null,
        stderr: null,
        compileOutput: null,
        time: null,
        memory: null,
        status: {
          id: -1,
          description: `Internal Error: ${error.message}`
        }
      };
    }
  }
}
