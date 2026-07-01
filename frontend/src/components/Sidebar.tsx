import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronDown, ChevronRight, BookOpen, CheckCircle, Circle, LayoutDashboard, User, Settings, Trophy, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgress } from '../store/useProgress';

// Mock data representing the 22 phases and their days
const phases = Array.from({ length: 22 }, (_, i) => ({
  id: i + 1,
  title: `Phase ${i + 1}`,
  days: Array.from({ length: i === 0 ? 4 : 5 }, (_, j) => ({
    id: `day-${(i * 5) + j + 1}`,
    title: `Day ${(i * 5) + j + 1}`,
    completed: j === 0 // mock some completed days
  }))
}));

interface SidebarProps {
  isMobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}

export default function Sidebar({ isMobileOpen = false, setMobileOpen }: SidebarProps) {
  const { days: daysProgress } = useProgress();
  const [openPhases, setOpenPhases] = useState<number[]>([1]); // Phase 1 open by default
  const [isCollapsed, setIsCollapsed] = useState(false);

  const togglePhase = (id: number) => {
    if (isCollapsed) setIsCollapsed(false); // Auto-expand if collapsed and trying to open a phase
    setOpenPhases(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleLinkClick = () => {
    if (isMobileOpen && setMobileOpen) setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40" 
          onClick={() => setMobileOpen?.(false)} 
        />
      )}
      
      <div className={`
        ${isCollapsed ? 'w-[90px]' : 'w-72'} 
        bg-card border-r border-border h-full flex flex-col transition-all duration-300
        fixed md:relative z-50 transform ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
      `}>
        <div className={`p-4 border-b border-border flex flex-row items-center justify-between min-h-[73px] ${isCollapsed ? 'px-3 gap-2' : ''}`}>
          {!isCollapsed && (
            <h2 className="text-xl font-bold flex items-center gap-2 truncate">
            <BookOpen className="text-primary shrink-0" size={24} />
            Java-Dev Academy
          </h2>
        )}
        {isCollapsed && (
          <BookOpen className="text-primary shrink-0" size={24} />
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-background rounded-lg text-gray-500 hover:text-foreground transition-colors flex shrink-0 items-center justify-center"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
        <NavLink
          to="/dashboard"
          title="Dashboard"
          onClick={handleLinkClick}
          className={({ isActive }) => 
            `flex items-center ${isCollapsed ? 'justify-center px-0 py-3' : 'gap-3 px-4 py-3'} rounded-lg text-sm font-semibold transition-colors mb-2 ${
              isActive 
                ? 'bg-primary text-primary-foreground' 
                : 'text-gray-500 hover:text-foreground hover:bg-background'
            }`
          }
        >
          <LayoutDashboard size={20} className="shrink-0" />
          {!isCollapsed && <span>Dashboard</span>}
        </NavLink>

        <NavLink
          to="/leaderboard"
          title="Leaderboard"
          onClick={handleLinkClick}
          className={({ isActive }) => 
            `flex items-center ${isCollapsed ? 'justify-center px-0 py-3' : 'gap-3 px-4 py-3'} rounded-lg text-sm font-semibold transition-colors mb-2 ${
              isActive 
                ? 'bg-primary text-primary-foreground' 
                : 'text-gray-500 hover:text-foreground hover:bg-background'
            }`
          }
        >
          <Trophy size={20} className="shrink-0" />
          {!isCollapsed && <span>Leaderboard</span>}
        </NavLink>

        <NavLink
          to="/profile"
          title="My Profile"
          onClick={handleLinkClick}
          className={({ isActive }) => 
            `flex items-center ${isCollapsed ? 'justify-center px-0 py-3' : 'gap-3 px-4 py-3'} rounded-lg text-sm font-semibold transition-colors mb-2 ${
              isActive 
                ? 'bg-primary text-primary-foreground' 
                : 'text-gray-500 hover:text-foreground hover:bg-background'
            }`
          }
        >
          <User size={20} className="shrink-0" />
          {!isCollapsed && <span>My Profile</span>}
        </NavLink>

        <NavLink
          to="/settings"
          title="Settings"
          onClick={handleLinkClick}
          className={({ isActive }) => 
            `flex items-center ${isCollapsed ? 'justify-center px-0 py-3' : 'gap-3 px-4 py-3'} rounded-lg text-sm font-semibold transition-colors mb-2 ${
              isActive 
                ? 'bg-primary text-primary-foreground' 
                : 'text-gray-500 hover:text-foreground hover:bg-background'
            }`
          }
        >
          <Settings size={20} className="shrink-0" />
          {!isCollapsed && <span>Settings</span>}
        </NavLink>



        {phases.map(phase => (
          <div key={phase.id} className="select-none">
            <button 
              onClick={() => togglePhase(phase.id)}
              title={isCollapsed ? phase.title : undefined}
              className={`w-full flex items-center ${isCollapsed ? 'justify-center p-3' : 'justify-between p-3'} rounded-lg hover:bg-background transition-colors text-left`}
            >
              {isCollapsed ? (
                <span className="font-bold text-foreground">{phase.id}</span>
              ) : (
                <>
                  <span className="font-semibold text-foreground">{phase.title}</span>
                  {openPhases.includes(phase.id) ? (
                    <ChevronDown size={18} className="text-gray-500" />
                  ) : (
                    <ChevronRight size={18} className="text-gray-500" />
                  )}
                </>
              )}
            </button>

            {!isCollapsed && (
              <AnimatePresence initial={false}>
                {openPhases.includes(phase.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="pl-4 py-2 space-y-1 border-l-2 border-border ml-6 mt-1 mb-2">
                      {phase.days.map(day => {
                        const numericDay = parseInt(day.id.replace('day-', ''), 10);
                        const isCompleted = daysProgress[numericDay]?.completed || false;
                        
                        return (
                        <NavLink
                          key={day.id}
                          to={`/course/${day.id}`}
                          onClick={handleLinkClick}
                          className={({ isActive }) => 
                            `flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors ${
                              isActive 
                                ? 'bg-primary/10 text-primary font-medium' 
                                : 'text-gray-500 hover:text-foreground hover:bg-background'
                            }`
                          }
                        >
                          {isCompleted ? (
                            <CheckCircle size={16} className="text-green-500 shrink-0" />
                          ) : (
                            <Circle size={16} className="shrink-0" />
                          )}
                          <span className="truncate">{day.title}</span>
                        </NavLink>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
