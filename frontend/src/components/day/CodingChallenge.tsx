import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Loader2, CheckCircle2, XCircle, Lightbulb, ChevronRight, RotateCcw, Send, FileCode, Plus, Sparkles } from 'lucide-react';
import { useProgress } from '../../store/useProgress';
import { Panel, Group as PanelGroup, Separator as PanelResizeHandle } from 'react-resizable-panels';
import toast from 'react-hot-toast';

interface TestCase {
  input: string;
  expectedOutput: string;
  isHidden: boolean;
  description: string;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  starterCode: string;
  testCases: TestCase[];
  hints: string[];
  xp: number;
}

interface CodingChallengeProps {
  dayNumber: number;
  challenges: Challenge[];
  onComplete: () => void;
}

interface TestResult {
  passed: boolean;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  description: string;
  isHidden: boolean;
  error: string | null;
}

interface SubmissionResult {
  allPassed: boolean;
  passedCount: number;
  totalCount: number;
  results: TestResult[];
}

export default function CodingChallenge({ dayNumber, challenges, onComplete }: CodingChallengeProps) {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const challenge = challenges[currentChallenge];

  const [files, setFiles] = useState<Record<string, string>>({ 'Main.java': '' });
  const [activeFile, setActiveFile] = useState('Main.java');

  const [customInput, setCustomInput] = useState('');
  const [output, setOutput] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<SubmissionResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAskingAI, setIsAskingAI] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const { saveCodingResult } = useProgress();

  // Initialize files when challenge changes
  useEffect(() => {
    if (challenge) {
      const draft = localStorage.getItem(`draft_${challenge.id}`);
      setFiles({ 'Main.java': draft || challenge.starterCode || '' });
      setActiveFile('Main.java');
      setOutput(null);
      setTestResults(null);
      setShowHint(false);
      setHintIndex(0);
    }
  }, [challenge]);

  if (!challenge) return null;

  const getConsolidatedCode = () => {
    return Object.values(files).join('\n\n');
  };

  const handleCodeChange = (val: string | undefined) => {
    const newCode = val || '';
    setFiles(prev => ({ ...prev, [activeFile]: newCode }));
    if (activeFile === 'Main.java') {
      localStorage.setItem(`draft_${challenge.id}`, newCode);
    }
  };

  const addFile = () => {
    const fileName = prompt('Enter file name (e.g., Helper.java):');
    if (fileName && !files[fileName]) {
      setFiles(prev => ({ ...prev, [fileName]: 'class ' + fileName.replace('.java', '') + ' {\n  \n}' }));
      setActiveFile(fileName);
    }
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput(null);
    setTestResults(null);
    try {
      const res = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: getConsolidatedCode(), language: 'java', stdin: customInput })
      });
      const data = await res.json();
      if (data.compileOutput) {
        setOutput(`Compilation Error:\n${data.compileOutput}`);
      } else if (data.stderr) {
        setOutput(`Runtime Error:\n${data.stderr}`);
      } else {
        setOutput(data.stdout || '(No output)');
      }
    } catch {
      setOutput('Error: Could not connect to execution server.');
    } finally {
      setIsRunning(false);
    }
  };

  const submitCode = async () => {
    setIsSubmitting(true);
    setOutput(null);
    setTestResults(null);
    try {
      const consolidatedCode = getConsolidatedCode();
      const res = await fetch('/api/execute/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: consolidatedCode,
          language: 'java',
          testCases: challenge.testCases
        })
      });
      const data: SubmissionResult = await res.json();
      setTestResults(data);
      saveCodingResult(dayNumber, challenge.id, data.allPassed, consolidatedCode);
    } catch {
      setOutput('Error: Could not connect to execution server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const askAI = async () => {
    setIsAskingAI(true);
    try {
      const res = await fetch('/api/ai/hint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: challenge.description,
          code: getConsolidatedCode()
        })
      });
      const data = await res.json();
      toast.success(data.hint, { duration: 8000, icon: '🤖' });
    } catch {
      toast.error('Failed to get AI hint');
    } finally {
      setIsAskingAI(false);
    }
  };

  const nextChallenge = () => {
    if (currentChallenge < challenges.length - 1) {
      setCurrentChallenge(currentChallenge + 1);
    } else {
      onComplete();
    }
  };

  const resetCode = () => {
    setFiles({ 'Main.java': challenge.starterCode });
    setActiveFile('Main.java');
    localStorage.removeItem(`draft_${challenge.id}`);
    setOutput(null);
    setTestResults(null);
  };

  const revealHint = () => {
    setShowHint(true);
    setHintIndex(prev => Math.min(prev + 1, challenge.hints.length));
  };

  return (
    <div className="space-y-6 flex flex-col h-[calc(100vh-120px)]">
      {/* Progress */}
      <div className="flex items-center justify-between shrink-0">
        <h3 className="text-lg font-bold text-foreground">
          Challenge {currentChallenge + 1} of {challenges.length}: {challenge.title}
        </h3>
        <span className="text-yellow-500 font-semibold text-sm">+{challenge.xp} XP</span>
      </div>

      <PanelGroup orientation="vertical" className="flex-1 rounded-2xl overflow-hidden border border-border shadow-lg bg-card">
        {/* Top Panel: Description and Editor */}
        <Panel defaultSize={60} minSize={30} className="flex flex-col">
          <PanelGroup orientation="horizontal">
            {/* Description Panel */}
            <Panel defaultSize={30} minSize={20} className="bg-card overflow-y-auto border-r border-border p-6">
              <pre className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap font-sans leading-relaxed">{challenge.description}</pre>
              
              {/* Hints */}
              <div className="mt-8">
                <AnimatePresence>
                  {showHint && hintIndex > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-4 space-y-2 mb-4"
                    >
                      <h4 className="text-sm font-semibold text-yellow-400 flex items-center gap-2">
                        <Lightbulb size={14} /> Hints
                      </h4>
                      {challenge.hints.slice(0, hintIndex).map((hint, i) => (
                        <p key={i} className="text-yellow-700 dark:text-yellow-300 text-sm pl-6">💡 {hint}</p>
                      ))}
                      {hintIndex < challenge.hints.length && (
                        <button onClick={revealHint} className="text-yellow-500 text-xs hover:underline pl-6">
                          Show next hint...
                        </button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
                {!showHint && challenge.hints.length > 0 && (
                  <button onClick={revealHint} className="flex items-center gap-2 px-4 py-2 text-yellow-500 hover:bg-yellow-500/10 rounded-lg transition-all text-sm">
                    <Lightbulb size={16} /> Need a hint?
                  </button>
                )}
              </div>
            </Panel>

            <PanelResizeHandle className="w-2 bg-border/50 hover:bg-primary/50 transition-colors cursor-col-resize flex items-center justify-center">
              <div className="h-8 w-1 bg-gray-500 rounded-full" />
            </PanelResizeHandle>

            {/* Editor Panel */}
            <Panel defaultSize={70} minSize={40} className="flex flex-col bg-[#1e1e2e]">
              {/* File Tabs */}
              <div className="flex items-center bg-[#181825] border-b border-[#313244] overflow-x-auto custom-scrollbar shrink-0">
                {Object.keys(files).map(filename => (
                  <button
                    key={filename}
                    onClick={() => setActiveFile(filename)}
                    className={`flex items-center gap-2 px-4 py-2 text-sm border-r border-[#313244] ${
                      activeFile === filename ? 'bg-[#1e1e2e] text-primary border-t-2 border-t-primary' : 'text-gray-400 hover:bg-[#1e1e2e]/50 hover:text-gray-300 border-t-2 border-t-transparent'
                    }`}
                  >
                    <FileCode size={14} />
                    {filename}
                  </button>
                ))}
                <button
                  onClick={addFile}
                  className="p-2 text-gray-400 hover:text-primary transition-colors border-t-2 border-t-transparent"
                  title="Add new file"
                >
                  <Plus size={16} />
                </button>
                <div className="flex-1" />
                <button onClick={resetCode} className="flex items-center gap-1 px-3 py-1 mr-2 text-gray-400 hover:text-foreground rounded transition-all text-xs">
                  <RotateCcw size={12} /> Reset
                </button>
              </div>

              {/* Editor */}
              <div className="flex-1">
                <Editor
                  height="100%"
                  language="java"
                  theme="vs-dark"
                  value={files[activeFile]}
                  onChange={handleCodeChange}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    scrollBeyondLastLine: false,
                    padding: { top: 16, bottom: 16 },
                    lineNumbers: 'on',
                    renderLineHighlight: 'line',
                    tabSize: 4,
                  }}
                />
              </div>

              {/* Action bar */}
              <div className="flex items-center justify-between p-3 bg-[#181825] border-t border-[#313244] shrink-0">
                <div className="flex items-center gap-3">
                  <button
                    onClick={runCode}
                    disabled={isRunning || isSubmitting}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded hover:bg-green-500 transition-all disabled:opacity-40"
                  >
                    {isRunning ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} />}
                    Run
                  </button>
                  <button
                    onClick={submitCode}
                    disabled={isRunning || isSubmitting}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded hover:bg-primary/90 transition-all disabled:opacity-40"
                  >
                    {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                    Submit
                  </button>
                </div>
                <button
                  onClick={askAI}
                  disabled={isAskingAI}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded hover:bg-purple-500 transition-all shadow-lg shadow-purple-500/20 disabled:opacity-40"
                >
                  {isAskingAI ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                  Ask AI
                </button>
              </div>
            </Panel>
          </PanelGroup>
        </Panel>

        <PanelResizeHandle className="h-2 bg-border/50 hover:bg-primary/50 transition-colors cursor-row-resize flex items-center justify-center">
          <div className="w-8 h-1 bg-gray-500 rounded-full" />
        </PanelResizeHandle>

        {/* Bottom Panel: Output and Tests */}
        <Panel defaultSize={40} minSize={20} className="bg-[#0d1117] flex flex-col">
          <div className="px-4 py-2 bg-[#161b22] border-b border-border flex items-center gap-4 shrink-0">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Console & Tests</span>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            {/* Custom Input */}
            {challenge.testCases.some(tc => tc.input) && (
              <div className="mb-4">
                <label className="text-xs text-gray-500 mb-1 block">Custom Input (stdin)</label>
                <textarea 
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder="Enter input here for Scanner to read..."
                  className="w-full bg-[#161b22] border border-[#30363d] rounded p-3 text-sm font-mono text-gray-300 focus:outline-none focus:border-primary resize-y min-h-[60px]"
                />
              </div>
            )}

            {/* Output */}
            {output !== null && !testResults && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <label className="text-xs text-gray-500 mb-1 block">Execution Output</label>
                <pre className="bg-[#161b22] border border-[#30363d] rounded p-4 text-green-400 font-mono text-sm whitespace-pre-wrap">{output}</pre>
              </motion.div>
            )}

            {/* Test results */}
            <AnimatePresence>
              {testResults && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden"
                >
                  {/* Summary header */}
                  <div className={`p-4 ${testResults.allPassed
                    ? 'bg-green-500/10 border-b border-green-500/20'
                    : 'bg-red-500/10 border-b border-red-500/20'
                  }`}>
                    <div className="flex items-center gap-3">
                      {testResults.allPassed ? (
                        <CheckCircle2 size={24} className="text-green-500" />
                      ) : (
                        <XCircle size={24} className="text-red-500" />
                      )}
                      <div>
                        <h4 className="text-md font-bold text-gray-200">
                          {testResults.allPassed ? 'All Tests Passed! 🎉' : `${testResults.passedCount}/${testResults.totalCount} Tests Passed`}
                        </h4>
                      </div>
                    </div>
                  </div>

                  {/* Individual test results */}
                  <div className="p-3 space-y-2">
                    {testResults.results.map((r, i) => (
                      <div key={i} className={`flex items-start gap-3 p-3 rounded bg-[#0d1117] border ${r.passed ? 'border-green-500/20' : 'border-red-500/20'}`}>
                        {r.passed ? <CheckCircle2 size={16} className="text-green-500 mt-0.5" /> : <XCircle size={16} className="text-red-500 mt-0.5" />}
                        <div className="text-sm space-y-1 flex-1">
                          <p className="font-medium text-gray-300">
                            Test {i + 1}: {r.description || (r.isHidden ? 'Hidden Test' : 'Test Case')}
                          </p>
                          {!r.isHidden && !r.passed && (
                            <div className="space-y-2 mt-2">
                              <div>
                                <p className="text-xs text-gray-500 mb-1">Expected Output:</p>
                                <pre className="bg-green-500/10 border border-green-500/20 text-green-400 p-2 rounded text-xs font-mono whitespace-pre-wrap">{r.expectedOutput}</pre>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 mb-1">Your Output:</p>
                                <pre className="bg-red-500/10 border border-red-500/20 text-red-400 p-2 rounded text-xs font-mono whitespace-pre-wrap">{r.actualOutput}</pre>
                              </div>
                            </div>
                          )}
                          {r.error && (
                            <p className="text-red-400 text-xs font-mono mt-2">{r.error}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Next button */}
                  {testResults.allPassed && (
                    <div className="p-4 border-t border-[#30363d] flex justify-end">
                      <button
                        onClick={nextChallenge}
                        className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground font-semibold rounded hover:bg-primary/90 transition-all"
                      >
                        {currentChallenge < challenges.length - 1 ? 'Next Challenge' : 'Continue to Debugging'}
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
}
