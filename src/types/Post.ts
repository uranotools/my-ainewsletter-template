export interface Post {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  categories: string[];
  score: number;
  image?: string;
  imageUrl?: string;
  excerpt: string;
  content: string; // Markdown content
  source?: string;
  originalUrl?: string;
}
