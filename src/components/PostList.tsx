import React from 'react';
import PostCard from './PostCard';
import type { Post } from '../types/Post';

interface PostListProps {
  posts: Post[];
  onPostClick?: (post: Post) => void;
}

export default function PostList({ posts, onPostClick }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="py-20 text-center text-foreground/60">
        <p className="text-lg">No se encontraron artículos que coincidan con los filtros.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <PostCard 
          key={post.id} 
          post={post} 
          onClick={() => onPostClick?.(post)}
        />
      ))}
    </div>
  );
}
