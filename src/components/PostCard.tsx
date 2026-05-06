import React from 'react';
import { Calendar, Zap, ExternalLink } from 'lucide-react';
import { cn, formatPostDate } from '../lib/utils';
import type { Post } from '../types/Post';

interface PostCardProps {
  post: Post;
  className?: string;
  onClick?: () => void;
}

export default function PostCard({ post, className, onClick }: PostCardProps) {
  return (
    <div 
      className={cn(
        "group relative flex flex-col bg-card brutalist-border brutalist-shadow-hover transition-all duration-300 cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className="aspect-video w-full border-b-4 border-foreground bg-muted overflow-hidden">
        <img 
          src={post.image || post.imageUrl || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800'} 
          alt={post.title} 
          className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800';
          }}
        />
      </div>
      
      <div className="p-6 flex flex-col flex-grow bg-background">
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-wrap gap-2">
            {post.categories.slice(0, 2).map((cat) => (
              <span key={cat} className="px-2 py-1 border-2 border-foreground bg-primary/10 text-foreground text-xs font-bold uppercase tracking-wider">
                {cat}
              </span>
            ))}
          </div>
          <div className="flex items-center text-xs font-bold text-background bg-foreground px-2 py-1 border-2 border-foreground">
            <Zap className="w-3 h-3 mr-1 text-primary" />
            {post.score}
          </div>
        </div>
        
        <h3 className="font-display text-2xl font-black mb-3 text-foreground line-clamp-3 group-hover:text-primary transition-colors leading-tight">
          {post.title}
        </h3>
        
        <p className="text-sm text-foreground/80 mb-4 line-clamp-3 flex-grow">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-xs text-foreground/80 mt-auto pt-4 border-t-4 border-foreground font-bold">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            {formatPostDate(post)}
          </div>
          {post.source && (
            <div className="flex items-center hover:text-primary transition-colors">
              {post.source}
              <ExternalLink className="w-4 h-4 ml-1 stroke-[3]" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
