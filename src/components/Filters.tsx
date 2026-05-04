import React from 'react';
import { Search, Calendar as CalendarIcon, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface FiltersProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  categories: string[];
  selectedCategories: string[];
  toggleCategory: (c: string) => void;
}

export default function Filters({
  searchQuery,
  setSearchQuery,
  categories,
  selectedCategories,
  toggleCategory
}: FiltersProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 mb-12 shadow-sm">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-grow">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
            <input
              type="text"
              placeholder="Buscar en noticias de IA..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-foreground/40 hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
      
      {categories.length > 0 && (
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground/50 mb-3">Categorías</h4>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isSelected = selectedCategories.includes(cat);
              return (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border",
                    isSelected 
                      ? "bg-primary text-primary-foreground border-primary" 
                      : "bg-background text-foreground/70 border-border hover:border-foreground/30 hover:text-foreground"
                  )}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
