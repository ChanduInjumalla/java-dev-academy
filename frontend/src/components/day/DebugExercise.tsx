import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Loader2, Lightbulb, ChevronRight, Bug } from 'lucide-react';
import { useProgress } from '../../store/useProgress';

interface Exercise {
  id: string;
  title: string;
  buggyCode: string;
  hint: string;
  expectedOutput: string;
  xp: number;
}

interface DebugExerciseProps {
  dayNumber: number;
  exercises: Exercise[];
  onComplete: () => void;
}

export default function DebugExercise({ dayNumber, exercises, onComplete }: DebugExerciseProps) {
  const [currentEx, setCurrentEx] = useState(0);
  const [code, setCode] = useState(exercises[0]?.buggyCode || '');
  const [output, setOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const { saveDebugResult } = useProgress();

  const exercise = exercises[currentEx];
  if (!exercise) return null;

  const runCode = async () => {
    setIsRunning(true);
    setOutput(null);
    setIsFixed(false);

    try {
      const res = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language: 'java' })
      });
      const data = await res.json();

      if (data.compileOutput) {
        setOutput(`❌ Compilation Error:\n${data.compileOutput}`);
        setIsFixed(false);
      } else if (data.stderr) {
        setOutput(`❌ Runtime Error:\n${data.stderr}`);
        setIsFixed(false);
      } else {
        const actualOutput = (data.stdout || '').trim();
        const expectedOutput = exercise.expectedOutput.trim();
        
        if (expectedOutput === "" || actualOutput === expectedOutput) {
          setOutput(`✅ Output: ${actualOutput || '(No output)'}\n\n🎉 Bug fixed! The program works correctly.`);
          setIsFixed(true);
          saveDebugResult(dayNumber, exercise.id, true, code);
        } else {
          setOutput(`Output: ${actualOutput}\nExpected: ${expectedOutput}\n\n❌ The output doesn't match. Keep debugging!`);
          setIsFixed(false);
        }
      }
    } catch {
      setOutput('Error: Could not connect to execution server.');
    } finally {
      setIsRunning(false);
    }
  };

  const nextExercise = () => {
    if (currentEx < exercises.length - 1) {
      const next = currentEx + 1;
      setCurrentEx(next);
      setCode(exercises[next]?.buggyCode || '');
      setOutput(null);
      setIsFixed(false);
      setShowHint(false);
    } else {
      onComplete();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bug size={20} className="text-orange-400" />
          <h3 className="text-lg font-bold text-foreground">
            Bug {currentEx + 1} of {exercises.length}: {exercise.title}
          </h3>
        </div>
        <span className="text-yellow-500 font-semibold text-sm">+{exercise.xp} XP</span>
      </div>

      {/* Instructions */}
      <motion.div
        key={exercise.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-orange-500/5 to-red-500/5 border border-orange-500/20 rounded-2xl p-6"
      >
        <p className="text-foreground font-medium mb-2">🐛 This code has a bug. Find and fix it!</p>
        <p className="text-gray-400 text-sm">The program should output: <code className="bg-green-500/10 text-green-400 px-2 py-0.5 rounded">{exercise.expectedOutput}</code></p>
      </motion.div>

      {/* Editor */}
      <div className="border border-border rounded-2xl overflow-hidden shadow-lg">
        <div className="h-[300px]">
          <Editor
            height="100%"
            defaultLanguage="java"
            theme="vs-dark"
            value={code}
            onChange={val => setCode(val || '')}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              scrollBeyondLastLine: false,
              padding: { top: 16, bottom: 16 },
              lineNumbers: 'on',
              tabSize: 4,
            }}
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-[#1e1e2e] border-t border-border">
          <button
            onClick={runCode}
            disabled={isRunning}
            className="flex items-center gap-2 px-5 py-2.5 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-500 transition-all disabled:opacity-40"
          >
            {isRunning ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} />}
            Test Fix
          </button>
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-2 px-4 py-2 text-yellow-500 hover:bg-yellow-500/10 rounded-lg transition-all text-sm"
          >
            <Lightbulb size={16} /> {showHint ? 'Hide Hint' : 'Show Hint'}
          </button>
        </div>
      </div>

      {/* Hint */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-4"
          >
            <p className="text-yellow-200/80 text-sm flex items-center gap-2">
              <Lightbulb size={14} className="text-yellow-500" /> {exercise.hint}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Output */}
      <AnimatePresence>
        {output !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-xl overflow-hidden border ${isFixed ? 'border-green-500/20' : 'border-border'}`}
          >
            <div className={`px-4 py-2 border-b ${isFixed ? 'bg-green-500/10 border-green-500/20' : 'bg-[#161b22] border-border'}`}>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {isFixed ? '✅ Fixed!' : 'Output'}
              </span>
            </div>
            <pre className={`p-4 font-mono text-sm whitespace-pre-wrap ${isFixed ? 'text-green-400 bg-green-500/5' : 'text-red-400 bg-[#0d1117]'}`}>
              {output}
            </pre>

            {isFixed && (
              <div className="p-4 border-t border-green-500/20 flex justify-end bg-green-500/5">
                <button
                  onClick={nextExercise}
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all"
                >
                  {currentEx < exercises.length - 1 ? 'Next Bug' : 'View Summary'}
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
