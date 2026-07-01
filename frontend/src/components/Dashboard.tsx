import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { BookOpen, Code, Terminal, Trophy } from 'lucide-react';

const weeklyData = [
  { name: 'Mon', hours: 2, xp: 150 },
  { name: 'Tue', hours: 3, xp: 220 },
  { name: 'Wed', hours: 1, xp: 80 },
  { name: 'Thu', hours: 4, xp: 300 },
  { name: 'Fri', hours: 2.5, xp: 190 },
  { name: 'Sat', hours: 5, xp: 400 },
  { name: 'Sun', hours: 4, xp: 350 },
];

const stats = [
  { label: 'Total Progress', value: '12%', icon: Trophy, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  { label: 'Hours Studied', value: '24h', icon: BookOpen, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { label: 'Code Solved', value: '15', icon: Code, color: 'text-green-500', bg: 'bg-green-500/10' },
  { label: 'Current Streak', value: '7 Days', icon: Terminal, color: 'text-purple-500', bg: 'bg-purple-500/10' },
];

export default function Dashboard() {
  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome back, Chandu! 👋</h1>
          <p className="text-gray-500 mt-1">You're on Day 12 of your 90-Day Java Journey. Keep it up!</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-card text-card-foreground px-6 py-3 rounded-xl shadow-sm border text-center">
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Phase</p>
            <p className="text-2xl font-bold text-primary">03</p>
          </div>
          <div className="bg-primary text-primary-foreground px-6 py-3 rounded-xl shadow-sm border border-primary/20 text-center">
            <p className="text-xs opacity-80 uppercase tracking-wider font-semibold">Day</p>
            <p className="text-2xl font-bold">12</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card p-6 rounded-xl border shadow-sm flex items-center gap-4"
            >
              <div className={`p-4 rounded-lg ${stat.bg} ${stat.color}`}>
                <Icon size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card p-6 rounded-xl border shadow-sm">
          <h3 className="font-semibold text-lg mb-6 text-foreground">Study Hours (This Week)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }} 
                />
                <Line type="monotone" dataKey="hours" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card p-6 rounded-xl border shadow-sm">
          <h3 className="font-semibold text-lg mb-6 text-foreground">XP Gained (This Week)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}
                  cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                />
                <Bar dataKey="xp" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Up Next Section */}
      <div className="bg-card p-6 rounded-xl border shadow-sm">
        <h3 className="font-semibold text-lg mb-4 text-foreground">Up Next for Today</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-background border rounded-lg hover:border-primary transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="bg-primary/20 text-primary p-2 rounded-full">
                <BookOpen size={20} />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Inheritance in Java</h4>
                <p className="text-sm text-gray-500">Phase 03 - Object-Oriented Programming</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
