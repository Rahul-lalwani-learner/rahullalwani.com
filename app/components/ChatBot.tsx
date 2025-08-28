'use client';

import { useState, useRef, useEffect } from 'react';
import { useBot } from '../context/BotContext';
import { SendIcon } from '../ui/icons/SendIcon';
import { DeleteIcon } from '../ui/icons/DeleteIcon';
import { ChatIcon } from '../ui/icons/ChatIcon';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatBot() {
  const { bot, isChatOpen, openChat, closeChat } = useBot();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestedMessage = "Tell me more about Rahul?";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when loading completes
  useEffect(() => {
    if (!isLoading && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isLoading]);

  // Focus input when chat opens
  useEffect(() => {
    if (isChatOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isChatOpen]);

  // Show tooltip after 2 second delay with fade animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
      // Small delay for fade-in animation
      setTimeout(() => {
        setTooltipVisible(true);
      }, 50);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleTooltipClick = () => {
    setInput(suggestedMessage);
    setTooltipVisible(false);
    setTimeout(() => {
      setShowTooltip(false);
    }, 200); // Allow fade-out animation to complete
    openChat();
    // Focus input after opening chat
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(suggestedMessage.length, suggestedMessage.length);
    }, 150);
  };

  // Hide tooltip when chat is opened or after first message
  useEffect(() => {
    if (isChatOpen || messages.length > 0) {
      setTooltipVisible(false);
      setTimeout(() => {
        setShowTooltip(false);
      }, 200);
    }
  }, [isChatOpen, messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      const assistantMessage: Message = { role: 'assistant', content: data.message };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
    
    // Focus back to input after sending message - use a longer delay to ensure DOM is updated
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 100);
  };

  const clearChat = () => {
    setMessages([]);
  };

  // Don't render if bot is disabled
  if (!bot) return null;

  return (
    <>
      {/* Tooltip Popup */}
      {!isChatOpen && showTooltip && (
        <div className={`fixed bottom-20 right-2 sm:bottom-24 sm:right-6 z-50 transition-opacity duration-300 ${tooltipVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div 
            onClick={handleTooltipClick}
            className={`relative bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 cursor-pointer  transition-all duration-200 max-w-[calc(100vw-1rem)] sm:max-w-xs transform ${tooltipVisible ? 'translate-y-0 scale-100' : 'translate-y-2 scale-95'}`}
          >
            <p className="text-sm whitespace-nowrap">{suggestedMessage}</p>
            
            {/* Tooltip Arrow - positioned at the right end */}
            <div className="absolute top-full sm:right-6 right-7">
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white dark:border-t-gray-800"></div>
              <div className="absolute -top-px left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-200 dark:border-t-gray-600"></div>
            </div>
            
            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setTooltipVisible(false);
                setTimeout(() => {
                  setShowTooltip(false);
                }, 200);
              }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 rounded-full flex items-center justify-center text-xs text-gray-600 dark:text-gray-300 transition-colors cursor-pointer"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Chat Button */}
      {!isChatOpen && (
        <button
          onClick={openChat}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-black dark:bg-white text-white dark:text-black p-3 sm:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 cursor-pointer animate-pulse"
        >
          <ChatIcon size='size-6'/>
        </button>
      )}

      {/* Chat Window */}
      {isChatOpen && (
        <div className="fixed bottom-4 right-2 sm:right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-1rem)] max-w-72 sm:max-w-80 md:max-w-96 h-[500px] max-h-[calc(100vh-2rem)] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100">Chat with</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Rahul Support</p>
              </div>
            </div>
            <button
              onClick={closeChat}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center py-12">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Send a message to start the chat!
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  I&apos;m a RAG-powered AI assistant with comprehensive knowledge about Rahul&apos;s background, skills, and projects!
                </p>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex break-words ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg break-words ${
                    message.role === 'user'
                      ? 'bg-black dark:bg-white text-white dark:text-black'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                  }`}
                >
                  {message.role === 'user' ? (
                    <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                  ) : (
                    <div className="text-sm prose prose-sm max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-900 dark:prose-p:text-gray-100 prose-strong:text-gray-900 dark:prose-strong:text-gray-100 prose-code:text-gray-900 dark:prose-code:text-gray-100 prose-pre:bg-gray-200 dark:prose-pre:bg-gray-700 break-words">
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        components={{
                          // Customize link styling
                          a: (props) => (
                            <a 
                              {...props} 
                              className="text-blue-600 dark:text-blue-400 hover:underline" 
                              target="_blank" 
                              rel="noopener noreferrer"
                            />
                          ),
                          // Customize code block styling
                          code: (props) => {
                            const isInline = !props.className?.includes('language-');
                            return isInline ? (
                              <code 
                                {...props} 
                                className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm"
                              />
                            ) : (
                              <code 
                                {...props} 
                                className="block bg-gray-200 dark:bg-gray-700 p-2 rounded text-sm overflow-x-auto"
                              />
                            );
                          },
                          // Customize list styling
                          ul: (props) => (
                            <ul {...props} className="list-disc list-inside space-y-1" />
                          ),
                          ol: (props) => (
                            <ol {...props} className="list-decimal list-inside space-y-1" />
                          ),
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} className="p-3 sm:p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-1 sm:gap-2">
              <button
                type="button"
                onClick={clearChat}
                title="Clear chat history"
                className="p-1.5 sm:p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors flex-shrink-0"
              >
                <DeleteIcon size="size-4" extraClass="sm:size-6 cursor-pointer"/>
              </button>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something..."
                className="flex-1 min-w-0 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-1.5 sm:p-2 rounded-lg bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              >
                <SendIcon size="size-4" extraClass="sm:size-6 cursor-pointer"/>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
