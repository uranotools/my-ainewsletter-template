import React from 'react';
import { Calendar, Zap, ArrowRight } from 'lucide-react';
import { formatPostDate } from '../lib/utils';
import type { Post } from '../types/Post';

interface FeaturedPostProps {
  post: Post;
  onClick?: () => void;
}

export default function FeaturedPost({ post, onClick }: FeaturedPostProps) {
  return (
    <div 
      className="relative flex flex-col md:flex-row brutalist-border brutalist-shadow-hover bg-card cursor-pointer group mb-12 transition-all"
      onClick={onClick}
    >
      <div className="w-full md:w-1/2 border-b-4 md:border-b-0 md:border-r-4 border-foreground overflow-hidden relative">
        <div className="absolute top-4 left-4 z-20 bg-primary text-primary-foreground font-bold px-3 py-1 border-2 border-foreground uppercase tracking-widest text-sm transform -rotate-2">
          Destacado
        </div>
        <img 
          src={post.image || post.imageUrl || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1600'} 
          alt={post.title} 
          className="w-full h-[400px] md:h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1600';
          }}
        />
      </div>
      
      <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between bg-background">
        <div>
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex flex-wrap gap-2">
              {post.categories.slice(0, 3).map((cat) => (
                <span key={cat} className="px-3 py-1 border-2 border-foreground bg-primary/20 text-foreground font-bold uppercase tracking-wider text-xs">
                  {cat}
                </span>
              ))}
            </div>
            <div className="flex items-center text-xs font-bold bg-foreground text-background px-3 py-1 border-2 border-foreground">
              <Zap className="w-4 h-4 mr-1" />
              SCORE {post.score}
            </div>
          </div>
          
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-[0.9] group-hover:text-primary transition-colors">
            {post.title}
          </h2>
          
          <p className="text-lg md:text-xl text-foreground/80 mb-8 border-l-4 border-foreground pl-4">
            {post.excerpt}
          </p>
        </div>
        
        <div className="flex items-center justify-between border-t-4 border-foreground pt-6 mt-8">
          <div className="flex items-center text-sm font-bold text-foreground bg-primary/20 px-3 py-1 border-2 border-foreground">
            <Calendar className="w-4 h-4 mr-2" />
            {formatPostDate(post)}
          </div>
          
          <button className="flex items-center font-display font-black text-xl uppercase text-foreground group-hover:text-primary transition-colors">
            LEER <ArrowRight className="ml-2 w-6 h-6 stroke-[3] group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
