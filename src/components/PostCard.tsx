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
        "group relative flex flex-col bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-foreground/20 cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className="aspect-video w-full overflow-hidden bg-muted">
        <img 
          src={post.image || post.imageUrl || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800'} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800';
          }}
        />
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-wrap gap-2">
            {post.categories.slice(0, 2).map((cat) => (
              <span key={cat} className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary uppercase tracking-wider">
                {cat}
              </span>
            ))}
          </div>
          <div className="flex items-center text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-1 rounded-full">
            <Zap className="w-3 h-3 mr-1" />
            {post.score}
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-2 text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        
        <p className="text-sm text-foreground/70 mb-4 line-clamp-3 flex-grow">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-xs text-foreground/50 mt-auto pt-4 border-t border-border">
          <div className="flex items-center">
            <Calendar className="w-3.5 h-3.5 mr-1.5" />
            {formatPostDate(post)}
          </div>
          {post.source && (
            <div className="flex items-center font-medium hover:text-foreground transition-colors">
              {post.source}
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
