import { motion } from 'framer-motion';
import { Trophy, Target, Code, Brain, Bug, Flame, CheckCircle2 } from 'lucide-react';
import { useProgress } from '../../store/useProgress';

interface DaySummaryProps {
  dayNumber: number;
  dayData: {
    title: string;
    xpReward: number;
    steps: any[];
  };
}

import confetti from 'canvas-confetti';
import toast from 'react-hot-toast';

export default function DaySummary({ dayNumber, dayData }: DaySummaryProps) {
  const { getDayProgress, completeDay, uncompleteDay, totalXp, level, currentStreak } = useProgress();
  const progress = getDayProgress(dayNumber);

  const theoryQuestions = dayData.steps.find((s: any) => s.type === 'theory-quiz')?.questions?.length || 0;
  const codingChallenges = dayData.steps.find((s: any) => s.type === 'coding-challenge')?.challenges?.length || 0;
  const debugExercises = dayData.steps.find((s: any) => s.type === 'debug-challenge')?.exercises?.length || 0;

  const theoryAnswered = progress ? Object.keys(progress.theoryAnswers).length : 0;
  const codingPassed = progress?.codingPassed || 0;
  const debugPassed = progress?.debugPassed || 0;
  const theoryScore = progress?.theoryScore || 0;

  const codingAccuracy = codingChallenges > 0 ? Math.round((codingPassed / codingChallenges) * 100) : 0;
  const debugAccuracy = debugExercises > 0 ? Math.round((debugPassed / debugExercises) * 100) : 0;

  const xpEarned = progress?.xpEarned || 0;
  const isCompleted = progress?.completed || false;

  const handleComplete = () => {
    completeDay(dayNumber);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b']
    });
    toast.success(`Awesome job! You've completed Day ${dayNumber}.`);
  };

  const stats = [
    {
      label: 'Theory Score',
      value: `${theoryScore}/10`,
      detail: `${theoryAnswered}/${theoryQuestions} answered`,
      icon: Brain,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
    },
    {
      label: 'Coding',
      value: `${codingAccuracy}%`,
      detail: `${codingPassed}/${codingChallenges} passed`,
      icon: Code,
      color: 'text-green-400',
      bg: 'bg-green-500/10',
    },
    {
      label: 'Debugging',
      value: `${debugAccuracy}%`,
      detail: `${debugPassed}/${debugExercises} fixed`,
      icon: Bug,
      color: 'text-orange-400',
      bg: 'bg-orange-500/10',
    },
    {
      label: 'XP Earned',
      value: `+${xpEarned}`,
      detail: `Total: ${totalXp}`,
      icon: Trophy,
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Congratulations header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 mb-4 shadow-lg shadow-yellow-500/20"
        >
          <Trophy size={40} className="text-white" />
        </motion.div>
        <h2 className="text-3xl font-black text-foreground mb-2">
          {isCompleted ? 'Day Completed!' : 'Day Summary'}
        </h2>
        <p className="text-gray-400 text-lg">{dayData.title}</p>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="bg-card border border-border rounded-2xl p-5 text-center"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${stat.bg} mb-3`}>
                <Icon size={24} className={stat.color} />
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-gray-500 font-medium mt-1">{stat.label}</p>
              <p className="text-xs text-gray-600 mt-0.5">{stat.detail}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Streak & Level */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex gap-4"
      >
        <div className="flex-1 bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl p-6 flex items-center gap-4">
          <Flame size={32} className="text-orange-500" />
          <div>
            <p className="text-2xl font-bold text-foreground">{currentStreak} Day{currentStreak !== 1 ? 's' : ''}</p>
            <p className="text-sm text-gray-400">Current Streak</p>
          </div>
        </div>
        <div className="flex-1 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6 flex items-center gap-4">
          <Target size={32} className="text-blue-500" />
          <div>
            <p className="text-2xl font-bold text-foreground">Level {level}</p>
            <p className="text-sm text-gray-400">{totalXp} total XP</p>
          </div>
        </div>
      </motion.div>

      {/* Complete button */}
      {!isCompleted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center"
        >
          <button
            onClick={handleComplete}
            className="flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-lg rounded-2xl hover:from-green-500 hover:to-emerald-500 transition-all shadow-lg shadow-green-500/20"
          >
            <CheckCircle2 size={24} />
            Mark Day {dayNumber} Complete
          </button>
        </motion.div>
      )}

      {isCompleted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center flex flex-col items-center gap-4"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-500/10 text-green-400 rounded-xl border border-green-500/20 font-medium">
            <CheckCircle2 size={20} />
            Completed on {progress?.completedAt ? new Date(progress.completedAt).toLocaleDateString() : 'today'}
          </div>
          <button
            onClick={() => {
              uncompleteDay(dayNumber);
              toast('Day unmarked as completed', { icon: '🔄', style: { background: '#333', color: '#fff' } });
            }}
            className="text-sm text-gray-500 hover:text-foreground transition-colors underline underline-offset-4"
          >
            Unmark as Completed
          </button>
        </motion.div>
      )}
    </div>
  );
}
