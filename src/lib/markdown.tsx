import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from './utils';

interface MarkdownProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownProps> = ({ content, className }) => {
  const normalizedContent = content.replace(/\\n/g, '\n').replace(/\\r/g, '\r');

  return (
    <div className={cn('max-w-none text-foreground/90 leading-relaxed space-y-4', className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-8 mb-4 border-b border-border pb-2" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-xl font-bold mt-6 mb-3" {...props} />,
          p: ({ node, ...props }) => <p className="mb-4 whitespace-pre-wrap" {...props} />,
          ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />,
          ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />,
          li: ({ node, ...props }) => <li className="mb-1" {...props} />,
          a: ({ node, ...props }) => (
            <a className="text-primary font-medium hover:underline underline-offset-4 decoration-primary/30 transition-all" target="_blank" rel="noopener noreferrer" {...props} />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-primary/30 pl-4 italic my-6 text-foreground/70" {...props} />
          ),
          code: ({ node, inline, className, children, ...props }) =>
            inline ? (
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                {children}
              </code>
            ) : (
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono" {...props}>
                <code>{children}</code>
              </pre>
            ),
          strong: ({ node, ...props }) => <strong className="font-bold text-foreground" {...props} />,
          img: ({ node, ...props }) => <img className="rounded-xl border border-border" {...props} alt={props.alt || ''} />,
        }}
      >
        {normalizedContent}
      </ReactMarkdown>
    </div>
  );
};
