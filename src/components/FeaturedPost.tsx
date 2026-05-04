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
      className="relative rounded-3xl overflow-hidden cursor-pointer group mb-12 shadow-2xl border border-border/50"
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
      
      <img 
        src={post.image || post.imageUrl || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1600'} 
        alt={post.title} 
        className="w-full h-[500px] md:h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
        onError={(e) => {
          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1600';
        }}
      />
      
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 z-20">
        <div className="max-w-3xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex gap-2">
              {post.categories.slice(0, 3).map((cat) => (
                <span key={cat} className="px-3 py-1 rounded-full text-xs font-bold bg-primary text-primary-foreground uppercase tracking-wider">
                  {cat}
                </span>
              ))}
            </div>
            <div className="flex items-center text-xs font-bold text-amber-400 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/30">
              <Zap className="w-3.5 h-3.5 mr-1" />
              Score {post.score}
            </div>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight group-hover:text-primary transition-colors">
            {post.title}
          </h2>
          
          <p className="text-lg md:text-xl text-foreground/80 mb-6 line-clamp-2 md:line-clamp-3">
            {post.excerpt}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm font-medium text-foreground/60">
              <Calendar className="w-4 h-4 mr-2" />
              {formatPostDate(post)}
            </div>
            
            <button className="flex items-center text-foreground font-semibold group-hover:translate-x-2 transition-transform">
              Leer artículo <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
