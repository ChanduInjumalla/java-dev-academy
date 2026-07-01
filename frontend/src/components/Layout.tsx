import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Toaster } from 'react-hot-toast';
import { Menu } from 'lucide-react';
import AIMentorWidget from './chat/AIMentorWidget';

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Toaster position="top-right" toastOptions={{ 
        style: { background: 'var(--card)', color: 'var(--foreground)', border: '1px solid var(--border)' }
      }} />
      
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 bg-card rounded-md border border-border shadow-md text-foreground"
        >
          <Menu size={20} />
        </button>
      </div>

      <Sidebar isMobileOpen={mobileMenuOpen} setMobileOpen={setMobileMenuOpen} />
      
      <main className="flex-1 overflow-y-auto bg-background pt-16 md:pt-0">
        <Outlet />
      </main>

      {/* Global AI Mentor Chat Widget */}
      <AIMentorWidget />
    </div>
  );
}
