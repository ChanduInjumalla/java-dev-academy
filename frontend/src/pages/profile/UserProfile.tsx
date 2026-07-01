import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useProgress } from '../../store/useProgress';
import { User, Award, Flame, Brain, BookOpen, Code, Terminal, Target } from 'lucide-react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer
} from 'recharts';

export default function UserProfile() {
  const { user } = useAuth();
  const { totalXp, level, currentStreak, days } = useProgress();
  const [learningProfile, setLearningProfile] = useState<any>(null);

  useEffect(() => {
    // In a real app we'd fetch this from the backend
    // For now we'll mock an AI profile
    setLearningProfile({
      weakTopics: ['Multithreading', 'Collections', 'Streams'],
      strongTopics: ['OOP', 'Variables', 'Loops'],
      radarData: [
        { subject: 'OOP', A: 90, fullMark: 100 },
        { subject: 'Data Structs', A: 45, fullMark: 100 },
        { subject: 'Algorithms', A: 60, fullMark: 100 },
        { subject: 'Syntax', A: 95, fullMark: 100 },
        { subject: 'Debugging', A: 70, fullMark: 100 },
        { subject: 'Theory', A: 85, fullMark: 100 },
      ]
    });
  }, []);

  if (!user) return null;

  const completedDaysCount = Object.values(days).filter(d => d.completed).length;
  const totalCodingPassed = Object.values(days).reduce((sum, d) => sum + d.codingPassed, 0);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Header Profile Section */}
      <div className="bg-card border border-border rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-sm">
        <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-primary to-purple-500 p-1">
          <div className="w-full h-full bg-card rounded-full flex items-center justify-center overflow-hidden">
            <User size={64} className="text-muted-foreground opacity-50" />
          </div>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold text-foreground mb-2">{user.name}</h1>
          <p className="text-muted-foreground mb-4">@{user.username} • {user.role}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold">
              <Award size={18} /> Level {level}
            </div>
            <div className="flex items-center gap-2 bg-orange-500/10 text-orange-500 px-4 py-2 rounded-full font-semibold">
              <Flame size={18} /> {currentStreak} Day Streak
            </div>
            <div className="flex items-center gap-2 bg-purple-500/10 text-purple-500 px-4 py-2 rounded-full font-semibold">
              <Target size={18} /> {totalXp.toLocaleString()} XP
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Stats */}
        <div className="space-y-8">
          <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <BookOpen size={24} className="text-primary" />
              Journey Stats
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-background/50 rounded-2xl border border-border">
                <span className="text-muted-foreground">Days Completed</span>
                <span className="text-xl font-bold text-foreground">{completedDaysCount} / 90</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-background/50 rounded-2xl border border-border">
                <span className="text-muted-foreground flex items-center gap-2"><Code size={16}/> Code Solved</span>
                <span className="text-xl font-bold text-foreground">{totalCodingPassed}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-background/50 rounded-2xl border border-border">
                <span className="text-muted-foreground flex items-center gap-2"><Terminal size={16}/> Bugs Fixed</span>
                <span className="text-xl font-bold text-foreground">
                  {Object.values(days).reduce((sum, d) => sum + d.debugPassed, 0)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI Learning Profile */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Brain size={24} className="text-purple-500" />
              AI Learning Profile
            </h2>
            
            {learningProfile && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={learningProfile.radarData}>
                      <PolarGrid stroke="rgba(255,255,255,0.1)" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} />
                      <Radar name="Student" dataKey="A" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.5} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-green-500 uppercase tracking-wider mb-3">Strong Topics</h3>
                    <div className="flex flex-wrap gap-2">
                      {learningProfile.strongTopics.map((topic: string) => (
                        <span key={topic} className="px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full text-sm">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-red-500 uppercase tracking-wider mb-3">Needs Review</h3>
                    <div className="flex flex-wrap gap-2">
                      {learningProfile.weakTopics.map((topic: string) => (
                        <span key={topic} className="px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded-full text-sm">
                          {topic}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      * The AI adapts your upcoming quizzes based on these weak topics.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
