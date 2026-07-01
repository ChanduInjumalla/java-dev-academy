import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Send, CheckCircle2, XCircle, Loader2, ChevronRight, Star, AlertTriangle, Lightbulb, Target } from 'lucide-react';
import { useProgress } from '../../store/useProgress';

interface Question {
  id: string;
  question: string;
  expectedConcepts: string[];
  difficulty: string;
  xp: number;
}

interface TheoryQuizProps {
  dayNumber: number;
  questions: Question[];
  onComplete: () => void;
}

interface EvalResult {
  score: number;
  maxScore: number;
  isCorrect: boolean;
  conceptUnderstanding: string;
  missingPoints: string[];
  incorrectPoints: string[];
  feedback: string;
  suggestions: string[];
}

// Star rating component
function ConceptStars({ level }: { level: string }) {
  const starMap: Record<string, number> = { 'Excellent': 5, 'Good': 4, 'Fair': 3, 'Poor': 1 };
  const filled = starMap[level] || 0;
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={16}
          className={i <= filled ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}
        />
      ))}
      <span className="ml-2 text-sm font-medium text-gray-400">{level}</span>
    </div>
  );
}

export default function TheoryQuiz({ dayNumber, questions, onComplete }: TheoryQuizProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<string[]>(new Array(questions.length).fill(''));
  const [evaluating, setEvaluating] = useState(false);
  const [results, setResults] = useState<EvalResult[] | null>(null);
  const { saveTheoryAnswer } = useProgress();

  if (!questions || questions.length === 0) return null;

  const handleAnswerChange = (val: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQ] = val;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQ > 0) {
      setCurrentQ(prev => prev - 1);
    }
  };

  const submitAll = async () => {
    if (evaluating) return;
    setEvaluating(true);
    setResults(null);

    try {
      const evaluationPromises = questions.map(async (q, idx) => {
        // If the user didn't answer, return a 0 score immediately
        if (!answers[idx].trim()) {
          return {
            score: 0, maxScore: 10, isCorrect: false,
            conceptUnderstanding: 'Poor',
            missingPoints: q.expectedConcepts.length > 0 ? q.expectedConcepts : ['No answer provided'],
            incorrectPoints: [],
            feedback: 'No answer was provided. Please attempt all questions.',
            suggestions: ['Try to explain the concept in your own words, even if you are unsure.']
          };
        }
        
        try {
          const res = await fetch((import.meta.env.VITE_API_URL || '') + '/api/ai/evaluate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              question: q.question,
              answer: answers[idx],
              expectedConcepts: q.expectedConcepts,
              difficulty: q.difficulty,
              topic: 'Java'
            })
          });
          const data: EvalResult = await res.json();
          return data;
        } catch {
          return {
            score: 0, maxScore: 10, isCorrect: false,
            conceptUnderstanding: 'Poor',
            missingPoints: [], incorrectPoints: [],
            feedback: 'Evaluation failed. Please try again.',
            suggestions: []
          };
        }
      });

      const evalResults = await Promise.all(evaluationPromises);
      setResults(evalResults);
      
      // Save progress
      evalResults.forEach((r, idx) => {
        saveTheoryAnswer(dayNumber, questions[idx].id, r.score);
      });
    } finally {
      setEvaluating(false);
    }
  };

  const difficultyColor: Record<string, string> = {
    easy: 'bg-green-500/10 text-green-600 dark:text-green-400',
    medium: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
    hard: 'bg-red-500/10 text-red-600 dark:text-red-400',
  };

  // ── Results Screen ──
  if (results) {
    const totalScore = results.reduce((sum, r) => sum + r.score, 0);
    const maxPossible = results.reduce((sum, r) => sum + r.maxScore, 0);
    const passCount = results.filter(r => r.isCorrect).length;
    const avgScore = Math.round(totalScore / results.length);
    const passed = passCount >= Math.ceil(questions.length / 2);

    return (
      <div className="space-y-6">
        {/* Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-2xl p-8 shadow-sm text-center"
        >
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 shadow-lg ${
            passed 
              ? 'bg-gradient-to-br from-green-500 to-emerald-500' 
              : 'bg-gradient-to-br from-red-500 to-orange-500'
          }`}>
            {passed ? <CheckCircle2 size={40} className="text-white" /> : <XCircle size={40} className="text-white" />}
          </div>
          <h2 className="text-3xl font-black text-foreground mb-2">Quiz Complete!</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
            Total Score: <span className="font-bold text-primary">{totalScore} / {maxPossible}</span>
          </p>
          <p className="text-sm text-gray-500 mb-6">
            {passCount} of {questions.length} questions answered correctly
          </p>

          {/* Average concept understanding */}
          <div className="inline-flex items-center gap-2 bg-secondary rounded-xl px-4 py-2 mb-6">
            <span className="text-sm font-medium text-gray-400">Concept Understanding:</span>
            <ConceptStars level={
              avgScore >= 9 ? 'Excellent' : avgScore >= 7 ? 'Good' : avgScore >= 5 ? 'Fair' : 'Poor'
            } />
          </div>

          <div className="mt-4">
            {passed ? (
              <button
                onClick={onComplete}
                className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-lg"
              >
                Continue to Coding <ChevronRight size={20} />
              </button>
            ) : (
              <div className="space-y-4">
                <p className="text-red-500 font-medium">You need at least {Math.ceil(questions.length / 2)} correct answers to pass.</p>
                <button
                  onClick={() => {
                    setResults(null);
                    setCurrentQ(0);
                    setAnswers(new Array(questions.length).fill(''));
                  }}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-all shadow-lg"
                >
                  Retry Quiz
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Detailed Per-Question Feedback */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-foreground">Detailed Feedback</h3>
          {questions.map((q, idx) => {
            const r = results[idx];
            return (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-card border border-border rounded-xl p-6 space-y-4"
              >
                {/* Question Header */}
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    {r.isCorrect ? <CheckCircle2 className="text-green-500" /> : <XCircle className="text-red-500" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-foreground">Q{idx + 1}: {q.question}</h4>
                      <span className={`text-sm font-bold px-3 py-1 rounded-lg ${
                        r.score >= 8 ? 'bg-green-500/10 text-green-500' :
                        r.score >= 5 ? 'bg-yellow-500/10 text-yellow-500' :
                        'bg-red-500/10 text-red-500'
                      }`}>
                        {r.score}/{r.maxScore}
                      </span>
                    </div>

                    {/* Concept Understanding Stars */}
                    <div className="mb-3">
                      <ConceptStars level={r.conceptUnderstanding} />
                    </div>

                    {/* Your Answer */}
                    <div className="bg-background border border-border rounded-lg p-3 mb-4 text-sm text-gray-700 dark:text-gray-300">
                      <span className="font-semibold">Your Answer:</span> {answers[idx] || '(No answer)'}
                    </div>

                    {/* AI Feedback */}
                    <div className="flex items-start gap-2 mb-3 bg-blue-500/5 border border-blue-500/10 rounded-lg p-3">
                      <Target size={16} className="text-blue-400 mt-0.5 shrink-0" />
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        {r.feedback}
                      </p>
                    </div>

                    {/* Missing Concepts */}
                    {r.missingPoints && r.missingPoints.length > 0 && (
                      <div className="mb-3 bg-orange-500/5 border border-orange-500/10 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle size={14} className="text-orange-400" />
                          <span className="text-xs font-bold text-orange-400 uppercase">Missing Concepts</span>
                        </div>
                        <ul className="space-y-1 ml-5">
                          {r.missingPoints.map((point, i) => (
                            <li key={i} className="text-sm text-gray-600 dark:text-gray-400 list-disc">{point}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Incorrect Points */}
                    {r.incorrectPoints && r.incorrectPoints.length > 0 && (
                      <div className="mb-3 bg-red-500/5 border border-red-500/10 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <XCircle size={14} className="text-red-400" />
                          <span className="text-xs font-bold text-red-400 uppercase">Incorrect Information</span>
                        </div>
                        <ul className="space-y-1 ml-5">
                          {r.incorrectPoints.map((point, i) => (
                            <li key={i} className="text-sm text-red-600 dark:text-red-400 list-disc">{point}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Suggestions */}
                    {r.suggestions && r.suggestions.length > 0 && (
                      <div className="bg-purple-500/5 border border-purple-500/10 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Lightbulb size={14} className="text-purple-400" />
                          <span className="text-xs font-bold text-purple-400 uppercase">Suggestions</span>
                        </div>
                        <ul className="space-y-1 ml-5">
                          {r.suggestions.map((s, i) => (
                            <li key={i} className="text-sm text-gray-600 dark:text-gray-400 list-disc">{s}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  // ── Question Input Screen ──
  const question = questions[currentQ];

  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <Brain size={20} className="text-purple-500" />
        <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
          Question {currentQ + 1} of {questions.length}
        </span>
        <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQ) / questions.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded ${difficultyColor[question.difficulty] || ''}`}>
          {question.difficulty}
        </span>
      </div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-card border border-border rounded-2xl p-8 shadow-sm"
        >
          <h3 className="text-xl font-bold text-foreground mb-2">
            {question.question}
          </h3>
          <p className="text-sm text-yellow-600 dark:text-yellow-500 mb-6">+{question.xp} XP</p>

          {/* Answer textarea */}
          <textarea
            value={answers[currentQ]}
            onChange={e => handleAnswerChange(e.target.value)}
            placeholder="Type your answer here... Be as detailed as you can."
            disabled={evaluating}
            className={`w-full h-40 p-4 rounded-xl border bg-background text-foreground placeholder-gray-400 dark:placeholder-gray-600 resize-none focus:outline-none focus:ring-2 transition-all border-border focus:ring-primary/50 focus:border-primary`}
          />

          {/* Semantic evaluation note */}
          <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
            <Brain size={12} />
            Your answer will be evaluated based on concept understanding, not exact wording.
          </p>

          {/* Navigation / Submit */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={handlePrev}
              disabled={currentQ === 0 || evaluating}
              className="px-6 py-3 text-gray-600 dark:text-gray-400 font-medium hover:text-foreground transition-colors disabled:opacity-30"
            >
              Previous
            </button>
            
            {currentQ < questions.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={evaluating}
                className="flex items-center gap-2 px-6 py-3 bg-primary/10 text-primary font-semibold rounded-xl hover:bg-primary/20 transition-all"
              >
                Next Question <ChevronRight size={18} />
              </button>
            ) : (
              <button
                onClick={submitAll}
                disabled={evaluating}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-50"
              >
                {evaluating ? (
                  <><Loader2 size={18} className="animate-spin" /> Evaluating with AI...</>
                ) : (
                  <><Send size={18} /> Submit Quiz</>
                )}
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
