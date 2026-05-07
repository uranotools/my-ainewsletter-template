import React from 'react';
import { Search, Calendar as CalendarIcon, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface CategoryCount {
  category: string;
  count: number;
}

interface FiltersProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  categoryCounts: CategoryCount[];
  selectedCategories: string[];
  toggleCategory: (c: string) => void;
}

export default function Filters({
  searchQuery,
  setSearchQuery,
  categoryCounts,
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
      
      {categoryCounts.length > 0 && (
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-3">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground/50">Categorías / Tags</h4>
              <p className="text-[11px] text-foreground/50 mt-1">El relleno indica qué tan presente está cada tema en tus noticias.</p>
            </div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-foreground/50">{categoryCounts.length} temas activos</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categoryCounts.map(({ category, count }) => {
              const isSelected = selectedCategories.includes(category);
              const maxCount = Math.max(...categoryCounts.map((item) => item.count), 1);
              const progress = Math.round((count / maxCount) * 100);
              return (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={cn(
                    "relative overflow-hidden rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200 min-w-max",
                    isSelected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-foreground/80 hover:border-foreground/40 hover:text-foreground"
                  )}
                >
                  <span
                    className={cn(
                      "absolute inset-y-0 left-0 rounded-full bg-primary/20",
                      isSelected ? 'bg-primary/30' : 'bg-primary/10'
                    )}
                    style={{ width: `${progress}%` }}
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    <span>{category}</span>
                    <span className="rounded-full bg-foreground/10 px-2 py-0.5 text-[10px] font-semibold text-foreground/90">
                      {count}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
