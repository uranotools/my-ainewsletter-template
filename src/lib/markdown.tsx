import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from './utils';

interface MarkdownProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownProps> = ({ content, className }) => {
  return (
    <div className={cn("prose prose-sm md:prose-base dark:prose-invert max-w-none", className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
};
