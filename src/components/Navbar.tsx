import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';

export default function Navbar() {
  const [isDark, setIsDark] = React.useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved !== null) {
      return saved === 'dark';
    }
    return true;
  });
  const location = useLocation();

  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      window.location.href = '/#/';
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="border-b-4 border-foreground bg-background sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-primary text-primary-foreground border-4 border-foreground flex items-center justify-center font-display font-black text-2xl group-hover:bg-foreground group-hover:text-primary transition-colors">
              U
            </div>
            <span className="font-display font-black text-2xl tracking-tighter uppercase">Urano AI News</span>
          </Link>

          <div className="hidden md:flex items-center space-x-2 ml-8">
            <button onClick={() => scrollToSection('featured')} className="px-3 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-foreground/80 border border-border rounded-full bg-background transition-colors hover:bg-foreground hover:text-background cursor-pointer">
              Destacado
            </button>
            <button onClick={() => scrollToSection('top-stories')} className="px-3 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-foreground/80 border border-border rounded-full bg-background transition-colors hover:bg-foreground hover:text-background cursor-pointer">
              Top stories
            </button>
            <button onClick={() => scrollToSection('sections')} className="px-3 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-foreground/80 border border-border rounded-full bg-background transition-colors hover:bg-foreground hover:text-background cursor-pointer">
              Secciones
            </button>
            <button onClick={() => scrollToSection('filters')} className="px-3 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-foreground/80 border border-border rounded-full bg-background transition-colors hover:bg-foreground hover:text-background cursor-pointer">
              Filtrar
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsDark(!isDark)}
              className="p-3 text-foreground hover:bg-primary hover:text-primary-foreground border-4 border-transparent hover:border-foreground transition-all"
              aria-label="Toggle Dark Mode"
            >
              {isDark ? <Sun className="w-6 h-6 stroke-[3]" /> : <Moon className="w-6 h-6 stroke-[3]" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
