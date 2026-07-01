import { BookOpen, Code, HelpCircle, Bug, BookMarked, Sparkles, RotateCcw } from 'lucide-react';

const SUGGESTIONS = [
  { label: "Explain today's lesson", icon: BookOpen },
  { label: "Review my code", icon: Code },
  { label: "Generate 5 practice questions", icon: HelpCircle },
  { label: "Quiz me on this topic", icon: Sparkles },
  { label: "Help with debugging", icon: Bug },
  { label: "Explain the last error", icon: Bug },
  { label: "Revise yesterday's lesson", icon: RotateCcw },
  { label: "Summarize key concepts", icon: BookMarked },
];

interface SuggestedActionsProps {
  onSelect: (text: string) => void;
}

export default function SuggestedActions({ onSelect }: SuggestedActionsProps) {
  return (
    <div className="flex flex-wrap gap-2 px-4 py-3">
      {SUGGESTIONS.map((s) => {
        const Icon = s.icon;
        return (
          <button
            key={s.label}
            onClick={() => onSelect(s.label)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-secondary/50 hover:bg-secondary text-xs text-gray-400 hover:text-foreground transition-all border border-border/50 hover:border-border"
          >
            <Icon size={13} />
            {s.label}
          </button>
        );
      })}
    </div>
  );
}
