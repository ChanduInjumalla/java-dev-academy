import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DayProgress {
  completed: boolean;
  theoryScore: number;       // 0-100
  codingPassed: number;      // how many coding challenges passed
  codingTotal: number;       // total coding challenges
  debugPassed: number;       // how many debug exercises passed
  debugTotal: number;        // total debug exercises
  xpEarned: number;
  currentStep: number;       // which step user is currently viewing
  highestStep: number;       // highest step the user has unlocked/completed
  completedAt?: string;      // ISO date
  theoryAnswers: Record<string, { score: number; submitted: boolean }>;
  codingResults: Record<string, { passed: boolean; code: string }>;
  debugResults: Record<string, { fixed: boolean; code: string }>;
}

interface ProgressState {
  // Per-day progress
  days: Record<number, DayProgress>;

  // Overall stats
  totalXp: number;
  level: number;
  currentStreak: number;
  lastActiveDate: string;

  // Actions
  initDay: (day: number, codingTotal: number, debugTotal: number) => void;
  setDayStep: (day: number, step: number) => void;
  saveTheoryAnswer: (day: number, questionId: string, score: number) => void;
  saveCodingResult: (day: number, challengeId: string, passed: boolean, code: string) => void;
  saveDebugResult: (day: number, exerciseId: string, fixed: boolean, code: string) => void;
  completeDay: (day: number) => void;
  uncompleteDay: (day: number) => void;
  getDayProgress: (day: number) => DayProgress | undefined;
  updateStreak: () => void;
  fetchUserProgress: () => Promise<void>;
}

const getToken = () => localStorage.getItem('token');

const syncToBackend = async (day: number, data: any) => {
  const token = getToken();
  if (!token) return;
  try {
    await fetch(`/api/progress/day/${day}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
  } catch (error) {
    console.error('Failed to sync progress to backend', error);
  }
};

const DEFAULT_DAY: DayProgress = {
  completed: false,
  theoryScore: 0,
  codingPassed: 0,
  codingTotal: 0,
  debugPassed: 0,
  debugTotal: 0,
  xpEarned: 0,
  currentStep: 0,
  highestStep: 0,
  theoryAnswers: {},
  codingResults: {},
  debugResults: {},
};

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      days: {},
      totalXp: 0,
      level: 1,
      currentStreak: 0,
      lastActiveDate: '',

      initDay: (day, codingTotal, debugTotal) => {
        const state = get();
        if (state.days[day]) return; // already initialized
        set({
          days: {
            ...state.days,
            [day]: { ...DEFAULT_DAY, codingTotal, debugTotal }
          }
        });
      },

      setDayStep: (day, step) => {
        const state = get();
        const dayProgress = state.days[day] || { ...DEFAULT_DAY };
        set({
          days: {
            ...state.days,
            [day]: { 
              ...dayProgress, 
              currentStep: step,
              highestStep: Math.max(dayProgress.highestStep, step)
            }
          }
        });
      },

      saveTheoryAnswer: (day, questionId, score) => {
        const state = get();
        const dayProgress = state.days[day] || { ...DEFAULT_DAY };
        const newAnswers = { ...dayProgress.theoryAnswers, [questionId]: { score, submitted: true } };
        
        // Calculate average theory score
        const scores = Object.values(newAnswers).map(a => a.score);
        const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
        const xpFromTheory = scores.reduce((sum, s) => sum + Math.round(s * 1.5), 0);

        set({
          days: {
            ...state.days,
            [day]: {
              ...dayProgress,
              theoryAnswers: newAnswers,
              theoryScore: avgScore,
              xpEarned: xpFromTheory + dayProgress.codingPassed * 20 + dayProgress.debugPassed * 10
            }
          }
        });
        
        syncToBackend(day, {
          theoryScore: avgScore,
          xpEarned: xpFromTheory
        });
      },

      saveCodingResult: (day, challengeId, passed, code) => {
        const state = get();
        const dayProgress = state.days[day] || { ...DEFAULT_DAY };
        const newResults = { ...dayProgress.codingResults, [challengeId]: { passed, code } };
        const passedCount = Object.values(newResults).filter(r => r.passed).length;

        set({
          days: {
            ...state.days,
            [day]: {
              ...dayProgress,
              codingResults: newResults,
              codingPassed: passedCount
            }
          }
        });

        syncToBackend(day, {
          codingScore: passedCount * 20 // Assuming 20 xp per coding passed
        });
      },

      saveDebugResult: (day, exerciseId, fixed, code) => {
        const state = get();
        const dayProgress = state.days[day] || { ...DEFAULT_DAY };
        const newResults = { ...dayProgress.debugResults, [exerciseId]: { fixed, code } };
        const fixedCount = Object.values(newResults).filter(r => r.fixed).length;

        set({
          days: {
            ...state.days,
            [day]: {
              ...dayProgress,
              debugResults: newResults,
              debugPassed: fixedCount
            }
          }
        });

        syncToBackend(day, {
          debugScore: fixedCount * 15 // Assuming 15 xp per debug passed
        });
      },

      completeDay: (day) => {
        const state = get();
        const dayProgress = state.days[day] || { ...DEFAULT_DAY };
        const xpEarned = dayProgress.xpEarned || 50; // minimum XP for completion

        set({
          days: {
            ...state.days,
            [day]: { ...dayProgress, completed: true, completedAt: new Date().toISOString() }
          },
          totalXp: state.totalXp + xpEarned,
          level: Math.floor((state.totalXp + xpEarned) / 500) + 1
        });

        syncToBackend(day, {
          isCompleted: true,
          phase: Math.ceil(day / 5) // Approximation, backend handles exact phase logic
        });

        // Update streak
        get().updateStreak();
      },

      uncompleteDay: (day) => {
        const state = get();
        const dayProgress = state.days[day];
        if (!dayProgress || !dayProgress.completed) return;

        const xpEarned = dayProgress.xpEarned || 50;

        set({
          days: {
            ...state.days,
            [day]: { ...dayProgress, completed: false, completedAt: undefined }
          },
          totalXp: Math.max(0, state.totalXp - xpEarned),
          level: Math.floor(Math.max(0, state.totalXp - xpEarned) / 500) + 1
        });

        syncToBackend(day, {
          isCompleted: false,
          xpEarned: -xpEarned
        });
      },

      getDayProgress: (day) => {
        return get().days[day];
      },

      updateStreak: () => {
        const today = new Date().toISOString().split('T')[0]!;
        const state = get();

        if (state.lastActiveDate === today) return; // already updated today

        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        const newStreak = state.lastActiveDate === yesterday ? state.currentStreak + 1 : 1;

        set({
          currentStreak: newStreak,
          lastActiveDate: today
        });
      },

      fetchUserProgress: async () => {
        const token = getToken();
        if (!token) return;
        try {
          const res = await fetch((import.meta.env.VITE_API_URL || '') + '/api/progress', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (res.ok) {
            const data = await res.json();
            
            // Map backend roadmapProgress to frontend state
            const mappedDays: Record<number, DayProgress> = {};
            data.progress.forEach((p: any) => {
              mappedDays[p.day] = {
                ...DEFAULT_DAY,
                completed: p.isCompleted,
                theoryScore: p.theoryScore,
                codingPassed: p.codingScore > 0 ? 1 : 0, 
                debugPassed: p.debugScore > 0 ? 1 : 0,
              };
            });

            set({
              days: mappedDays,
              totalXp: data.stats.xp,
              level: data.stats.level,
              currentStreak: data.stats.currentStreak
            });
          }
        } catch (error) {
          console.error("Failed to fetch user progress", error);
        }
      }
    }),
    {
      name: 'javadev-progress',
    }
  )
);
