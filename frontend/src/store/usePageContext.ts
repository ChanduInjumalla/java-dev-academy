import { create } from 'zustand';

interface PageContext {
  phase: number | null;
  day: number | null;
  topic: string | null;
  lesson: string | null;
  code: string | null;
  question: string | null;
}

interface PageContextStore extends PageContext {
  setContext: (ctx: Partial<PageContext>) => void;
  clearContext: () => void;
}

export const usePageContext = create<PageContextStore>((set) => ({
  phase: null,
  day: null,
  topic: null,
  lesson: null,
  code: null,
  question: null,

  setContext: (ctx) => set((state) => ({ ...state, ...ctx })),
  clearContext: () => set({ phase: null, day: null, topic: null, lesson: null, code: null, question: null }),
}));
