
import React from 'react';
import { Topic } from '../types';
import { BookOpenIcon } from './Icons';
import ReactMarkdown from 'react-markdown';

interface ContentPanelProps {
  selectedTopic: Topic | null;
  content: string | null;
  isLoading: boolean;
}

const LoadingSkeleton: React.FC = () => (
    <div className="animate-pulse space-y-6">
      <div className="h-8 bg-slate-300 dark:bg-slate-700 rounded w-3/4"></div>
      <div className="space-y-3">
        <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded"></div>
        <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-5/6"></div>
      </div>
      <div className="h-6 bg-slate-300 dark:bg-slate-700 rounded w-1/4 mt-4"></div>
       <div className="space-y-3">
        <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded"></div>
        <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-4/6"></div>
      </div>
    </div>
  );

const ContentPanel: React.FC<ContentPanelProps> = ({ selectedTopic, content, isLoading }) => {
  return (
    <main className="bg-white dark:bg-slate-900/70 p-6 sm:p-8 rounded-lg shadow-lg backdrop-blur-sm h-full overflow-y-auto">
      {isLoading ? (
        <LoadingSkeleton />
      ) : content ? (
        <article className="prose prose-slate dark:prose-invert max-w-none prose-h3:text-brand-primary dark:prose-h3:text-brand-secondary">
          <ReactMarkdown>{content}</ReactMarkdown>
        </article>
      ) : (
        <div className="h-full flex flex-col justify-center items-center text-center text-slate-500">
          <BookOpenIcon className="h-24 w-24 mb-4 text-slate-300 dark:text-slate-600"/>
          <h2 className="text-2xl font-semibold">Welcome to the Syllabus Explorer</h2>
          <p className="mt-2 max-w-md">Select a topic from the syllabus on the left to get a detailed, AI-powered explanation with examples.</p>
        </div>
      )}
    </main>
  );
};

export default ContentPanel;
