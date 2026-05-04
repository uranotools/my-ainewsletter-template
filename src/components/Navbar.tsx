import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, Moon, Sun, Search } from 'lucide-react';

export default function Navbar() {
  const [isDark, setIsDark] = React.useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved !== null) {
      return saved === 'dark';
    }
    return true; // Default dark
  });

  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <nav className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center font-bold text-xl">
              U
            </div>
            <span className="font-bold text-xl tracking-tight">Urano AI News</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsDark(!isDark)}
              className="p-2 text-foreground/70 hover:text-foreground transition-colors rounded-full hover:bg-foreground/5"
              aria-label="Toggle Dark Mode"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <Link 
              to="/?role=editor" 
              className="p-2 text-foreground/70 hover:text-foreground transition-colors rounded-full hover:bg-foreground/5"
              aria-label="Editor Dashboard"
            >
              <Settings className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
