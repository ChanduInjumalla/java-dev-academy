import { useState, useEffect } from 'react';
import { Trophy, Medal, Award, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

interface LeaderboardUser {
  id: string;
  username: string;
  name: string;
  xp: number;
  level: number;
  currentStreak: number;
}

export default function LeaderboardPage() {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch('/api/leaderboard');
        if (res.ok) {
          const data = await res.json();
          setUsers(data);
        }
      } catch (error) {
        console.error('Failed to fetch leaderboard', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 p-4">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-yellow-500/20 p-3 rounded-xl">
          <Trophy size={28} className="text-yellow-500" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Global Leaderboard</h1>
          <p className="text-muted-foreground">See how you rank among other Java-Dev Academy students!</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-background/50 border-b border-border">
                <th className="p-4 font-semibold text-muted-foreground w-16 text-center">Rank</th>
                <th className="p-4 font-semibold text-muted-foreground">Student</th>
                <th className="p-4 font-semibold text-muted-foreground text-center">Level</th>
                <th className="p-4 font-semibold text-muted-foreground text-center">XP</th>
                <th className="p-4 font-semibold text-muted-foreground text-center">Streak</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground">
                    <div className="flex justify-center items-center gap-2">
                      <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                      Loading rankings...
                    </div>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground">
                    No students have joined yet. Be the first!
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <motion.tr 
                    key={user.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-border/50 hover:bg-background/50 transition-colors"
                  >
                    <td className="p-4 text-center">
                      {index === 0 ? <Trophy size={24} className="text-yellow-500 mx-auto" /> :
                       index === 1 ? <Medal size={24} className="text-gray-400 mx-auto" /> :
                       index === 2 ? <Medal size={24} className="text-amber-700 mx-auto" /> :
                       <span className="font-bold text-gray-500">#{index + 1}</span>}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-foreground">{user.name}</p>
                          <p className="text-sm text-muted-foreground">@{user.username}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <span className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                        <Award size={14} /> {user.level}
                      </span>
                    </td>
                    <td className="p-4 text-center font-bold text-foreground">
                      {user.xp.toLocaleString()}
                    </td>
                    <td className="p-4 text-center">
                      <span className="inline-flex items-center gap-1 text-orange-500 font-semibold">
                        <Flame size={16} /> {user.currentStreak}
                      </span>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
