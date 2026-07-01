import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChevronRight, CheckCircle2, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

interface LearnStepProps {
  content: string;
  objectives: string[];
  onContinue: () => void;
}

export default function LearnStep({ content, objectives, onContinue }: LearnStepProps) {
  const [checkedObjectives, setCheckedObjectives] = useState<Set<number>>(new Set());

  const toggleObjective = (index: number) => {
    const newChecked = new Set(checkedObjectives);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setCheckedObjectives(newChecked);
  };

  const allChecked = objectives.length > 0 && checkedObjectives.size === objectives.length;

  return (
    <div className="space-y-8">
      {/* Learning objectives card */}
      {objectives.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-500/20 p-2 rounded-lg">
              <BookOpen size={20} className="text-blue-400" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Learning Objectives</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Check off each objective as you learn it:</p>
          <div className="space-y-3">
            {objectives.map((obj, i) => (
              <button
                key={i}
                onClick={() => toggleObjective(i)}
                className={`flex items-center gap-3 w-full text-left p-3 rounded-lg transition-all
                  ${checkedObjectives.has(i)
                    ? 'bg-green-500/10 border border-green-500/20'
                    : 'bg-background/50 border border-border hover:border-primary/30'
                  }`}
              >
                <CheckCircle2
                  size={18}
                  className={checkedObjectives.has(i) ? 'text-green-500' : 'text-gray-600'}
                />
                <span className={`text-sm ${checkedObjectives.has(i) ? 'text-green-400 line-through' : 'text-foreground'}`}>
                  {obj}
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Markdown content */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="prose dark:prose-invert max-w-none text-foreground leading-relaxed
          prose-headings:font-bold prose-headings:text-foreground 
          prose-h1:text-4xl prose-h1:mb-8 prose-h1:bg-clip-text prose-h1:text-transparent prose-h1:bg-gradient-to-r prose-h1:from-primary prose-h1:to-purple-500
          prose-h2:text-2xl prose-h2:border-b prose-h2:border-border/50 prose-h2:pb-4 prose-h2:mt-12 prose-h2:mb-6 prose-h2:font-extrabold
          prose-h3:text-xl prose-h3:text-primary prose-h3:mt-8 prose-h3:mb-4 prose-h3:bg-primary/5 prose-h3:p-3 prose-h3:rounded-lg prose-h3:border-l-4 prose-h3:border-primary
          prose-p:text-gray-800 dark:prose-p:text-gray-300 prose-p:leading-8
          prose-strong:text-foreground prose-strong:font-bold
          prose-code:font-bold prose-code:text-foreground prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-[#09090b] prose-pre:text-white prose-pre:border prose-pre:border-border prose-pre:rounded-2xl prose-pre:shadow-lg prose-pre:p-6
          [&_pre_code]:text-white [&_pre_code]:bg-transparent [&_pre_code]:font-mono [&_pre_code]:font-normal
          prose-table:border-collapse prose-table:w-full prose-table:rounded-xl prose-table:overflow-hidden prose-table:shadow-sm prose-table:border prose-table:border-border/50
          prose-th:bg-background prose-th:text-primary prose-th:p-4 prose-th:text-left prose-th:border-b prose-th:border-border/50
          prose-td:p-4 prose-td:border-b prose-td:border-border/50 prose-tr:bg-card hover:prose-tr:bg-background/50
          prose-a:text-primary prose-a:no-underline hover:prose-a:underline hover:prose-a:text-primary/80
          prose-ul:space-y-2 prose-li:text-gray-800 dark:prose-li:text-gray-300
          prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:rounded-r-2xl prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:italic prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-300 prose-blockquote:shadow-sm"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      </motion.div>

      {/* Continue button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex justify-end sticky bottom-6"
      >
        <button
          onClick={onContinue}
          disabled={objectives.length > 0 && !allChecked}
          className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-lg transition-all shadow-lg
            ${objectives.length === 0 || allChecked
              ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary/20'
              : 'bg-gray-200 text-gray-400 dark:bg-gray-800 dark:text-gray-600 cursor-not-allowed shadow-none'
            }`}
        >
          {objectives.length > 0 && !allChecked ? 'Complete all objectives to continue' : 'Continue to Quiz'}
          {(objectives.length === 0 || allChecked) && <ChevronRight size={20} />}
        </button>
      </motion.div>
    </div>
  );
}
