import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BookOpen, Brain, Code, Bug, Trophy, ChevronRight, Loader2 } from 'lucide-react';
import LearnStep from './LearnStep.tsx';
import TheoryQuiz from './TheoryQuiz.tsx';
import CodingChallenge from './CodingChallenge.tsx';
import DebugExercise from './DebugExercise.tsx';
import DaySummary from './DaySummary.tsx';
import { useProgress } from '../../store/useProgress.ts';
import DiscussionForum from './DiscussionForum.tsx';
import { useAuth } from '../../context/AuthContext';
import { usePageContext } from '../../store/usePageContext';

interface DayData {
  day: number;
  phase: number;
  title: string;
  difficulty: string;
  estimatedTime: string;
  xpReward: number;
  learningObjectives: string[];
  steps: any[];
}

const STEP_ICONS = [BookOpen, Brain, Code, Bug, Trophy];
const STEP_LABELS = ['Learn', 'Quiz', 'Code', 'Debug', 'Summary'];
const STEP_COLORS = ['text-blue-400', 'text-purple-400', 'text-green-400', 'text-orange-400', 'text-yellow-400'];

export default function DayView() {
  const { dayId } = useParams();
  const dayNumber = dayId ? parseInt(dayId.replace('day-', ''), 10) : 1;

  const [data, setData] = useState<DayData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const { user } = useAuth();

  const { initDay, setDayStep, getDayProgress } = useProgress();

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`/api/roadmap/day/${dayNumber}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load');
        return res.json();
      })
      .then((json: DayData) => {
        setData(json);

        // Initialize progress for this day
        const codingStep = json.steps.find((s: any) => s.type === 'coding-challenge');
        const debugStep = json.steps.find((s: any) => s.type === 'debug-challenge');
        const codingTotal = codingStep?.challenges?.length || 0;
        const debugTotal = debugStep?.exercises?.length || 0;
        initDay(dayNumber, codingTotal, debugTotal);

        // Set page context for AI Mentor
        usePageContext.getState().setContext({
          phase: json.phase,
          day: json.day,
          topic: json.title,
          lesson: json.learningObjectives?.[0] || json.title,
        });

        // Restore step from saved progress
        const saved = getDayProgress(dayNumber);
        if (saved) {
          setCurrentStep(saved.currentStep);
        } else {
          setCurrentStep(0);
        }
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [dayNumber, getDayProgress, initDay]);

  const goToStep = (step: number) => {
    setCurrentStep(step);
    setDayStep(dayNumber, step);
  };

  const goNext = () => {
    const nextStep = Math.min(currentStep + 1, activeSteps.length - 1);
    goToStep(nextStep);
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 size={40} className="animate-spin text-primary" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-8 max-w-4xl mx-auto text-center mt-20">
        <h2 className="text-2xl font-bold text-red-500 mb-2">Oops!</h2>
        <p className="text-gray-500">{error || 'Could not find this day.'}</p>
      </div>
    );
  }

  // Map data steps to renderable components
  const activeSteps = data.steps.map(step => step.type);
  // Always add summary at the end
  if (!activeSteps.includes('summary')) {
    activeSteps.push('summary');
  }

  // Get step data
  const learnStep = data.steps.find(s => s.type === 'learn');
  const quizStep = data.steps.find(s => s.type === 'theory-quiz');
  const codingStep = data.steps.find(s => s.type === 'coding-challenge');
  const debugStep = data.steps.find(s => s.type === 'debug-challenge');

  const stepTypeToIndex: Record<string, number> = {};
  activeSteps.forEach((type, i) => { stepTypeToIndex[type] = i; });

  const renderCurrentStep = () => {
    const stepType = activeSteps[currentStep];
    switch (stepType) {
      case 'learn':
        return <LearnStep content={learnStep?.content || ''} objectives={data.learningObjectives} onContinue={goNext} />;
      case 'theory-quiz':
        return <TheoryQuiz dayNumber={dayNumber} questions={quizStep?.questions || []} onComplete={goNext} />;
      case 'coding-challenge':
        return <CodingChallenge dayNumber={dayNumber} challenges={codingStep?.challenges || []} onComplete={goNext} />;
      case 'debug-challenge':
        return <DebugExercise dayNumber={dayNumber} exercises={debugStep?.exercises || []} onComplete={goNext} />;
      case 'summary':
        return <DaySummary dayNumber={dayNumber} dayData={data} />;
      default:
        return <div className="text-gray-500 text-center p-8">Unknown step type</div>;
    }
  };

  // Map step types to display info
  const getStepInfo = (type: string, index: number) => {
    const map: Record<string, { icon: any; label: string; color: string }> = {
      'learn': { icon: BookOpen, label: 'Learn', color: 'text-blue-400' },
      'theory-quiz': { icon: Brain, label: 'Quiz', color: 'text-purple-400' },
      'coding-challenge': { icon: Code, label: 'Code', color: 'text-green-400' },
      'debug-challenge': { icon: Bug, label: 'Debug', color: 'text-orange-400' },
      'summary': { icon: Trophy, label: 'Summary', color: 'text-yellow-400' },
    };
    return map[type] || { icon: STEP_ICONS[index] || BookOpen, label: STEP_LABELS[index] || 'Step', color: STEP_COLORS[index] || 'text-gray-400' };
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm px-6 py-4 shrink-0">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">{data.title}</h1>
              <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                <span className="bg-primary/10 text-primary px-2 py-0.5 rounded font-medium">Phase {data.phase}</span>
                <span>Day {data.day}</span>
                <span>•</span>
                <span className="capitalize">{data.difficulty}</span>
                <span>•</span>
                <span>{data.estimatedTime}</span>
                <span>•</span>
                <span className="text-yellow-500 font-medium">{data.xpReward} XP</span>
              </div>
            </div>
          </div>

          {/* Step indicators */}
          <div className="flex items-center gap-1">
            {activeSteps.map((type, i) => {
              const info = getStepInfo(type, i);
              const Icon = info.icon;
              const saved = getDayProgress(dayNumber);
              const highestStep = saved ? saved.highestStep : 0;
              const isActive = i === currentStep;
              const isAdmin = user?.role === 'SUPER_ADMIN' || user?.role === 'ADMIN';
              const isUnlocked = i <= highestStep || isAdmin;
              const isCompleted = i < highestStep || isAdmin;
              const isInProgress = i === highestStep;
              
              return (
                <div key={i} className="flex items-center">
                  <div className="relative group flex flex-col items-center">
                    <button
                      onClick={() => isUnlocked && goToStep(i)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm font-medium
                        ${isActive 
                          ? 'bg-primary/15 text-primary ring-1 ring-primary/30' 
                          : isCompleted 
                            ? 'bg-green-500/10 text-green-500 cursor-pointer hover:bg-green-500/20' 
                            : isInProgress
                              ? 'bg-orange-500/10 text-orange-500 cursor-pointer hover:bg-orange-500/20'
                              : 'text-gray-400 cursor-not-allowed opacity-50'
                        }`}
                    >
                      <Icon size={16} />
                      <span className="hidden sm:inline">{info.label}</span>
                    </button>
                    {/* Tooltip for status */}
                    <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg z-10 pointer-events-none">
                      {isCompleted ? 'Completed' : isInProgress ? 'In Progress' : 'Locked'}
                    </div>
                  </div>
                  {i < activeSteps.length - 1 && (
                    <ChevronRight size={14} className="text-gray-400 mx-1" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-6">
          {renderCurrentStep()}
          
          {/* Always show Discussion Forum at the bottom of the active day view */}
          <DiscussionForum dayNumber={dayNumber} />
        </div>
      </div>
    </div>
  );
}
