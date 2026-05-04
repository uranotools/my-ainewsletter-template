import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { parseISO, isAfter, isBefore, startOfDay, endOfDay } from "date-fns";
import type { Post } from "../types/Post";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function filterPosts(
  posts: Post[],
  query: string,
  categories: string[],
  dateRange: { start?: Date; end?: Date } | null
): Post[] {
  return posts.filter((post) => {
    // 1. Text Search (title or excerpt)
    if (query) {
      const lowerQuery = query.toLowerCase();
      if (
        !post.title.toLowerCase().includes(lowerQuery) &&
        !post.excerpt.toLowerCase().includes(lowerQuery) &&
        !post.content.toLowerCase().includes(lowerQuery)
      ) {
        return false;
      }
    }

    // 2. Category Filter
    if (categories.length > 0) {
      const hasCategory = categories.some((cat) => post.categories.includes(cat));
      if (!hasCategory) return false;
    }

    // 3. Date Range Filter
    if (dateRange) {
      const postDate = parseISO(post.date);
      if (dateRange.start && isBefore(postDate, startOfDay(dateRange.start))) return false;
      if (dateRange.end && isAfter(postDate, endOfDay(dateRange.end))) return false;
    }

    return true;
  });
}

export function getPostTimestamp(post: Post): number {
  // Try to use ID as timestamp if it looks valid (e.g., > year 2001)
  const idTimestamp = parseInt(post.id);
  if (!isNaN(idTimestamp) && idTimestamp > 1000000000000) {
    return idTimestamp;
  }
  // Fallback to date field
  return new Date(post.date).getTime();
}

export function sortPosts(posts: Post[], sortBy: 'date' | 'score' = 'date', order: 'asc' | 'desc' = 'desc'): Post[] {
  return [...posts].sort((a, b) => {
    let comparison = 0;
    if (sortBy === 'date') {
      comparison = getPostTimestamp(a) - getPostTimestamp(b);
    } else if (sortBy === 'score') {
      comparison = a.score - b.score;
    }
    return order === 'desc' ? -comparison : comparison;
  });
}

export function formatPostDate(post: Post): string {
  const date = new Date(getPostTimestamp(post));

  return date.toLocaleDateString('es-ES', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function getAllCategories(posts: Post[]): string[] {
  const set = new Set<string>();
  posts.forEach(p => p.categories.forEach(c => set.add(c)));
  return Array.from(set).sort();
}
