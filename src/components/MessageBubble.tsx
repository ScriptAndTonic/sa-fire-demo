import React from 'react';
import type { Message } from '../types/api';
import LoadingIndicator from './LoadingIndicator';
import MarkdownRenderer from './MarkdownRenderer';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const { text, isBot, timestamp, isLoading, file } = message;
  
  return (
    <div className={`message-bubble ${isBot ? 'bot' : 'user'}`}>
      <div className="message-content">
        {isBot && (
          <div className="message-header">
            <div className="bot-avatar">
              <span>EW</span>
            </div>
            <span className="bot-name">SA Fire Worker</span>
          </div>
        )}
        
        {file && !isBot && (
          <div className="message-file">
            <div className="file-attachment">
              <span className="file-icon">📎</span>
              <a 
                href={file.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="file-link"
              >
                {file.fileName}
              </a>
            </div>
          </div>
        )}
        
        <div className={`message-text ${isBot ? 'bot' : 'user'}`}>
          {isLoading ? (
            <LoadingIndicator />
          ) : isBot ? (
            <MarkdownRenderer content={text} />
          ) : (
            <p>{text}</p>
          )}
        </div>
        
        <div className={`message-timestamp ${isBot ? 'bot' : 'user'}`}>
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;