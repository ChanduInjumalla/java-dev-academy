import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface PracticeBlockProps {
  title: string;
  content: string;
}

export default function PracticeBlock({ title, content }: PracticeBlockProps) {
  const [code, setCode] = useState('public class Main {\n    public static void main(String[] args) {\n        // Write your code here\n        System.out.println("Hello World!");\n    }\n}');
  const [output, setOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState<{ id: number; description: string } | null>(null);

  const runCode = async () => {
    setIsRunning(true);
    setOutput(null);
    setStatus(null);

    try {
      const res = await fetch((import.meta.env.VITE_API_URL || '') + '/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language: 'java' })
      });
      const data = await res.json();
      
      if (data.compileOutput) {
        setOutput(data.compileOutput);
      } else if (data.stderr) {
        setOutput(data.stderr);
      } else {
        setOutput(data.stdout || 'Program exited with no output.');
      }
      setStatus(data.status);

    } catch (err) {
      setOutput('Error communicating with execution server.');
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-border bg-background/50">
        <h3 className="text-xl font-bold mb-4 text-green-500 flex items-center gap-2">
          💻 {title}
        </h3>
        <div className="prose prose-invert max-w-none text-foreground/80">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
      
      <div className="h-[400px] border-b border-border relative">
        <Editor
          height="100%"
          defaultLanguage="java"
          theme="vs-dark"
          value={code}
          onChange={(val) => setCode(val || '')}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false,
            padding: { top: 16 }
          }}
        />
      </div>
      
      <div className="p-4 bg-background/50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={runCode}
            disabled={isRunning}
            className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {isRunning ? <Loader2 size={18} className="animate-spin" /> : <Play size={18} />}
            {isRunning ? 'Running...' : 'Run Code'}
          </button>
          
          {status && (
            <div className="flex items-center gap-2 text-sm font-medium">
              {status.id === 3 ? (
                <span className="text-green-500 flex items-center gap-1"><CheckCircle2 size={16}/> Accepted</span>
              ) : status.id > 3 ? (
                <span className="text-red-500 flex items-center gap-1"><XCircle size={16}/> {status.description}</span>
              ) : null}
            </div>
          )}
        </div>
      </div>

      {output !== null && (
        <div className="border-t border-border bg-black p-4">
          <h4 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Console Output</h4>
          <pre className="text-gray-300 font-mono text-sm whitespace-pre-wrap">{output}</pre>
        </div>
      )}
    </div>
  );
}
