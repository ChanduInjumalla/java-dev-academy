import { BookOpen, Code, Bug, HelpCircle, BookMarked, Briefcase, StickyNote } from 'lucide-react';
import type { ChatMode } from '../../store/useChat';

const MODES: { id: ChatMode; label: string; icon: any; color: string }[] = [
  { id: 'learn', label: 'Learn', icon: BookOpen, color: 'text-blue-400' },
  { id: 'code-review', label: 'Code Review', icon: Code, color: 'text-green-400' },
  { id: 'debug', label: 'Debug', icon: Bug, color: 'text-red-400' },
  { id: 'quiz', label: 'Quiz', icon: HelpCircle, color: 'text-yellow-400' },
  { id: 'revision', label: 'Revision', icon: BookMarked, color: 'text-purple-400' },
  { id: 'interview', label: 'Interview', icon: Briefcase, color: 'text-orange-400' },
  { id: 'notes-assistant', label: 'Notes', icon: StickyNote, color: 'text-cyan-400' },
];

interface ModeSelectorProps {
  current: ChatMode;
  onChange: (mode: ChatMode) => void;
}

export default function ModeSelector({ current, onChange }: ModeSelectorProps) {
  return (
    <div className="flex gap-1 p-2 overflow-x-auto custom-scrollbar">
      {MODES.map((m) => {
        const Icon = m.icon;
        const isActive = current === m.id;
        return (
          <button
            key={m.id}
            onClick={() => onChange(m.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              isActive 
                ? 'bg-primary text-primary-foreground shadow-sm' 
                : 'bg-secondary/50 text-gray-400 hover:bg-secondary hover:text-foreground'
            }`}
          >
            <Icon size={13} className={isActive ? '' : m.color} />
            {m.label}
          </button>
        );
      })}
    </div>
  );
}
