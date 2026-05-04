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

export function sortPosts(posts: Post[], sortBy: 'date' | 'score' = 'date', order: 'asc' | 'desc' = 'desc'): Post[] {
  return [...posts].sort((a, b) => {
    let comparison = 0;
    if (sortBy === 'date') {
      const timeA = new Date(a.date).getTime();
      const timeB = new Date(b.date).getTime();
      comparison = timeA - timeB;
      
      // Tie-breaker: use ID if dates are equal (assuming ID is a timestamp)
      if (comparison === 0) {
        const idA = parseInt(a.id) || 0;
        const idB = parseInt(b.id) || 0;
        comparison = idA - idB;
      }
    } else if (sortBy === 'score') {
      comparison = a.score - b.score;
    }
    return order === 'desc' ? -comparison : comparison;
  });
}

export function formatPostDate(post: Post): string {
  // Use ID as timestamp if valid, as it's more precise than the 'date' field
  const idTimestamp = parseInt(post.id);
  const date = (!isNaN(idTimestamp) && idTimestamp > 1000000000000) 
    ? new Date(idTimestamp) 
    : new Date(post.date);

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
