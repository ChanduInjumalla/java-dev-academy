import { useState, useEffect } from 'react';
import { Settings, Moon, Sun, Monitor } from 'lucide-react';

export default function SettingsPage() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'system');

  useEffect(() => {
    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 p-4">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-primary/20 p-3 rounded-xl">
          <Settings size={28} className="text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
      </div>

      <div className="bg-card border border-border rounded-3xl p-8 shadow-sm space-y-8">
        
        {/* Appearance */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Appearance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              onClick={() => setTheme('light')}
              className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${theme === 'light' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
            >
              <Sun size={24} className={theme === 'light' ? 'text-primary' : 'text-muted-foreground'} />
              <span className="font-semibold text-foreground">Light</span>
            </button>
            <button 
              onClick={() => setTheme('dark')}
              className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${theme === 'dark' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
            >
              <Moon size={24} className={theme === 'dark' ? 'text-primary' : 'text-muted-foreground'} />
              <span className="font-semibold text-foreground">Dark</span>
            </button>
            <button 
              onClick={() => setTheme('system')}
              className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${theme === 'system' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
            >
              <Monitor size={24} className={theme === 'system' ? 'text-primary' : 'text-muted-foreground'} />
              <span className="font-semibold text-foreground">System</span>
            </button>
          </div>
        </div>

        <hr className="border-border" />

        {/* Preferences */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Preferences</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-background rounded-xl border border-border">
              <div>
                <h3 className="font-semibold text-foreground">Code Editor Font Size</h3>
                <p className="text-sm text-muted-foreground">Adjust the font size of the Monaco editor</p>
              </div>
              <select className="bg-card border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                <option>Small (12px)</option>
                <option selected>Medium (14px)</option>
                <option>Large (16px)</option>
              </select>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-background rounded-xl border border-border">
              <div>
                <h3 className="font-semibold text-foreground">Daily Study Goal</h3>
                <p className="text-sm text-muted-foreground">How long do you plan to study each day?</p>
              </div>
              <select className="bg-card border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                <option>1 Hour</option>
                <option selected>2 Hours</option>
                <option>4+ Hours</option>
              </select>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
