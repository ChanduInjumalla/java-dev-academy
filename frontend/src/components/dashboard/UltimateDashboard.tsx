import { useAuth } from '../../context/AuthContext';
import { useProgress } from '../../store/useProgress';
import { Link } from 'react-router-dom';
import { Flame, Trophy, Target, BookOpen, AlertTriangle, ArrowRight, Activity, Brain, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockWeeklyData = [
  { name: 'Mon', xp: 50 },
  { name: 'Tue', xp: 120 },
  { name: 'Wed', xp: 80 },
  { name: 'Thu', xp: 150 },
  { name: 'Fri', xp: 200 },
  { name: 'Sat', xp: 100 },
  { name: 'Sun', xp: 250 },
];

export default function UltimateDashboard() {
  const { user } = useAuth();
  const { totalXp, level, currentStreak, days } = useProgress();
  
  // Calculate next level requirements
  const xpForNextLevel = level * 500;
  const progressPercent = Math.min(100, Math.round((totalXp / xpForNextLevel) * 100));

  const completedDays = Object.keys(days).filter(dayStr => days[parseInt(dayStr)].completed).map(Number);
  const nextDay = completedDays.length > 0 ? Math.max(...completedDays) + 1 : 1;

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-10">
      
      {/* Simplified Welcome Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-none p-8 md:p-10 relative overflow-hidden"
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex-1 space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
              Welcome back, {user?.name || 'Developer'}! 👋
            </h1>
            <p className="text-slate-600 text-lg">
              You're on a <span className="text-orange-500 font-bold">{currentStreak} day streak!</span> Keep pushing your limits!
            </p>
          </div>
          
          <Link 
            to={`/course/day-${nextDay}`} 
            className="shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 transition-all hover:-translate-y-1"
          >
            Continue Day {nextDay}
            <ArrowRight size={20} />
          </Link>
        </div>
        
        {/* Simple decorative element */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      </motion.div>

      {/* Gamification Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Current Level', value: `Level ${level}`, icon: Trophy, color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'group-hover:border-yellow-500/50', glow: 'group-hover:shadow-[0_0_30px_rgba(234,179,8,0.2)]' },
          { label: 'Active Streak', value: `${currentStreak} Days 🔥`, icon: Flame, color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'group-hover:border-orange-500/50', glow: 'group-hover:shadow-[0_0_30px_rgba(249,115,22,0.2)]' },
          { label: 'Total XP', value: `${totalXp.toLocaleString()} XP`, icon: Target, color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'group-hover:border-blue-500/50', glow: 'group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]' },
          { label: 'Course Progress', value: `${Math.round((completedDays.length / 90) * 100)}%`, icon: BookOpen, color: 'text-green-500', bg: 'bg-green-500/10', border: 'group-hover:border-green-500/50', glow: 'group-hover:shadow-[0_0_30px_rgba(34,197,94,0.2)]' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 + i * 0.1 }} 
            className={`group bg-card/60 backdrop-blur-xl border border-border rounded-3xl p-6 flex items-center gap-5 transition-all duration-300 hover:-translate-y-1 ${stat.border} ${stat.glow}`}
          >
            <div className={`${stat.bg} p-4 rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
              <stat.icon className={stat.color} size={30} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">{stat.label}</p>
              <h3 className="text-2xl font-extrabold text-foreground tracking-tight">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main XP Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.5 }} 
          className="lg:col-span-2 bg-card/60 backdrop-blur-xl border border-border rounded-3xl p-8 shadow-sm transition-all hover:border-border/80"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Activity className="text-primary" size={24} />
              </div>
              XP Activity
            </h2>
            <div className="px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-bold">This Week</div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockWeeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorXp" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" axisLine={false} tickLine={false} dy={10} />
                <YAxis stroke="#64748b" axisLine={false} tickLine={false} dx={-10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', color: '#f8fafc', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)' }}
                  itemStyle={{ color: '#8b5cf6', fontWeight: 'bold' }}
                  cursor={{ stroke: '#334155', strokeWidth: 2, strokeDasharray: '5 5' }}
                />
                <Line type="monotone" dataKey="xp" stroke="url(#colorXp)" strokeWidth={5} dot={{ r: 6, fill: '#1e293b', stroke: '#8b5cf6', strokeWidth: 3 }} activeDot={{ r: 8, fill: '#8b5cf6', stroke: '#fff', strokeWidth: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* AI Insights & Readiness */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="space-y-6">
          
          {/* Level Progress */}
          <div className="bg-gradient-to-b from-card/80 to-card/40 backdrop-blur-xl border border-border rounded-3xl p-8 shadow-sm">
            <div className="flex justify-between items-end mb-4">
              <div>
                <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Next Milestone</p>
                <h3 className="text-2xl font-extrabold text-foreground">Level {level + 1}</h3>
              </div>
              <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">{totalXp} / {xpForNextLevel} XP</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-4 overflow-hidden p-0.5 border border-border">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden" 
                style={{ width: `${progressPercent}%` }}
              >
                <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite] -skew-x-12" style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)' }} />
              </div>
            </div>
            <p className="text-center text-sm text-gray-500 font-medium mt-4">Just {xpForNextLevel - totalXp} XP to go! Keep it up! 🚀</p>
          </div>

          {/* AI Recommendations */}
          <div className="bg-card/60 backdrop-blur-xl border border-border rounded-3xl p-8 shadow-sm relative overflow-hidden">
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
            
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3 relative z-10">
              <div className="p-2 bg-purple-500/10 rounded-xl">
                <Brain className="text-purple-400" size={24} />
              </div>
              AI Insights
            </h3>
            
            <div className="space-y-4 relative z-10">
              <div className="group bg-red-500/5 hover:bg-red-500/10 border border-red-500/20 hover:border-red-500/40 p-5 rounded-2xl transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="bg-red-500/20 p-2 rounded-lg shrink-0 mt-0.5">
                    <AlertTriangle className="text-red-400" size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-red-500 mb-1">Needs Revision</h4>
                    <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">You struggled with <span className="font-semibold text-foreground">Loops and Conditionals</span> yesterday. Let's do a quick spaced-repetition exercise.</p>
                  </div>
                </div>
              </div>

              <div className="group bg-green-500/5 hover:bg-green-500/10 border border-green-500/20 hover:border-green-500/40 p-5 rounded-2xl transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="bg-green-500/20 p-2 rounded-lg shrink-0 mt-0.5">
                    <Trophy className="text-green-400" size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-green-500 mb-1">Strong Topic</h4>
                    <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">Your understanding of <span className="font-semibold text-foreground">Variables & Data Types</span> is excellent (92% accuracy). Great job!</p>
                  </div>
                </div>
              </div>
            </div>
            
            <button className="w-full mt-6 py-3 rounded-xl border border-border hover:bg-secondary text-sm font-bold text-foreground flex items-center justify-center gap-2 transition-all">
              View Full Analysis <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>

    </div>
  );
}
