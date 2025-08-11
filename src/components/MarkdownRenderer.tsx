import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  return (
    <div className={`markdown-content ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => <h1 className="text-xl font-bold text-blue-600 mb-4 border-b border-gray-300 pb-2">{children}</h1>,
          h2: ({ children }) => <h2 className="text-lg font-semibold text-blue-500 mb-3 border-b border-gray-200 pb-1">{children}</h2>,
          h3: ({ children }) => <h3 className="text-md font-medium text-blue-400 mb-2">{children}</h3>,
          h4: ({ children }) => <h4 className="text-sm font-medium text-gray-800 mb-2">{children}</h4>,
          h5: ({ children }) => <h5 className="text-sm font-medium text-gray-700 mb-1">{children}</h5>,
          h6: ({ children }) => <h6 className="text-sm font-medium text-gray-600 mb-1">{children}</h6>,
          p: ({ children }) => <p className="mb-4 leading-relaxed text-gray-800">{children}</p>,
          ul: ({ children }) => <ul className="list-disc list-outside mb-4 space-y-1 ml-6">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal list-outside mb-4 space-y-1 ml-6">{children}</ol>,
          li: ({ children }) => <li className="text-gray-800 leading-relaxed">{children}</li>,
          code: ({ children, className }) => {
            const isInline = !className;
            if (isInline) {
              return <code className="bg-gray-100 px-2 py-1 rounded text-red-600 font-mono text-sm">{children}</code>;
            }
            return <code className={className}>{children}</code>;
          },
          pre: ({ children }) => <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4 border border-gray-300">{children}</pre>,
          blockquote: ({ children }) => <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 mb-4 bg-gray-50 py-2">{children}</blockquote>,
          strong: ({ children }) => <strong className="text-gray-900 font-semibold">{children}</strong>,
          em: ({ children }) => <em className="text-gray-700 italic">{children}</em>,
          a: ({ children, href }) => (
            <a 
              href={href} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 hover:text-blue-800 underline"
            >
              {children}
            </a>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full border-collapse border border-gray-300">{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-gray-100">{children}</thead>,
          tbody: ({ children }) => <tbody>{children}</tbody>,
          tr: ({ children }) => <tr className="border-b border-gray-200">{children}</tr>,
          th: ({ children }) => <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-800">{children}</th>,
          td: ({ children }) => <td className="border border-gray-300 px-4 py-2 text-gray-800">{children}</td>,
          hr: () => <hr className="border-t border-gray-300 my-6" />,
          del: ({ children }) => <del className="line-through text-gray-500">{children}</del>,
          input: ({ checked, type }) => {
            if (type === 'checkbox') {
              return <input type="checkbox" checked={checked} readOnly className="mr-2" />;
            }
            return null;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;