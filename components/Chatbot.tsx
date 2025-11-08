
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { getChatbotResponse } from '../services/geminiService';
import { SendIcon, ChatBubbleIcon, LinkIcon } from './Icons';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'ai', text: "Hello! Ask me any question about Simulation and Modeling." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const { text, sources } = await getChatbotResponse(input, messages);
      const aiMessage: ChatMessage = { sender: 'ai', text, sources };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = { sender: 'ai', text: "Sorry, I'm having trouble connecting. Please try again." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  }

  return (
    <aside className="bg-white dark:bg-slate-900/70 p-4 rounded-lg shadow-lg backdrop-blur-sm h-full flex flex-col">
      <h2 className="text-xl font-bold text-brand-primary dark:text-brand-secondary mb-4 flex items-center gap-2">
        <ChatBubbleIcon className="h-6 w-6" />
        Simulation Chat
      </h2>
      <div className="flex-grow overflow-y-auto mb-4 pr-2 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs sm:max-w-sm md:max-w-md rounded-lg px-4 py-2 ${msg.sender === 'user' ? 'bg-brand-secondary text-white' : 'bg-slate-200 dark:bg-slate-800'}`}>
               <div className="prose prose-sm dark:prose-invert max-w-none">
                 <ReactMarkdown
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                 >
                    {msg.text}
                 </ReactMarkdown>
               </div>
               {msg.sources && msg.sources.length > 0 && (
                 <div className="mt-3 pt-2 border-t border-slate-300 dark:border-slate-700">
                   <h4 className="text-xs font-semibold mb-1 text-slate-600 dark:text-slate-400">Sources:</h4>
                   <ul className="space-y-1">
                     {msg.sources.map((source, i) => (
                       <li key={i} className="flex items-start">
                         <LinkIcon className="h-3 w-3 mr-1.5 mt-0.5 flex-shrink-0 text-slate-500"/>
                         <a 
                           href={source.uri} 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="text-xs text-brand-secondary hover:underline truncate"
                           title={source.title}
                         >
                           {source.title || new URL(source.uri).hostname}
                         </a>
                       </li>
                     ))}
                   </ul>
                 </div>
               )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-200 dark:bg-slate-800 rounded-lg px-4 py-2">
              <div className="flex items-center space-x-1">
                <span className="text-sm">Typing</span>
                <div className="h-1.5 w-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="h-1.5 w-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="h-1.5 w-1.5 bg-slate-500 rounded-full animate-bounce"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="relative">
        <input
          type="text"
          placeholder="Ask a question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
          className="w-full pl-4 pr-12 py-2 border rounded-lg bg-slate-50 dark:bg-slate-800 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-secondary disabled:opacity-50"
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-brand-secondary hover:bg-brand-secondary/20 disabled:text-slate-400 disabled:hover:bg-transparent transition-colors"
        >
          <SendIcon className="h-5 w-5" />
        </button>
      </div>
    </aside>
  );
};

export default Chatbot;
