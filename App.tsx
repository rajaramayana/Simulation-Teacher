import React, { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import ContentPanel from './components/ContentPanel';
import Chatbot from './components/Chatbot';
import { Topic } from './types';
import { generateTopicExplanation } from './services/geminiService';

const App: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [topicContent, setTopicContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectTopic = useCallback(async (topic: Topic) => {
    if (topic.title === selectedTopic?.title) return;

    setSelectedTopic(topic);
    setIsLoading(true);
    setTopicContent(null);

    try {
      const explanation = await generateTopicExplanation(topic.title);
      setTopicContent(explanation);
    } catch (error) {
      setTopicContent("Failed to load content. Please check your connection or API key and try again.");
    } finally {
      setIsLoading(false);
    }
  }, [selectedTopic]);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-brand-dark font-sans flex flex-col">
      <header className="bg-gradient-to-b from-white to-slate-100 dark:from-slate-900 dark:to-brand-dark shadow-sm">
        <div className="text-center py-10 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-primary dark:text-white tracking-tight">
            Simulation & Modeling Tutor
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Interactive learning and problem-solving assistant for Simulation.
          </p>
        </div>
      </header>

      <main className="flex-grow p-4 sm:p-6 lg:p-8 flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-grow max-h-[800px]">
          <div className="lg:col-span-3 h-full">
            <Sidebar onSelectTopic={handleSelectTopic} selectedTopicTitle={selectedTopic?.title || null} />
          </div>
          <div className="lg:col-span-5 h-full">
            <ContentPanel selectedTopic={selectedTopic} content={topicContent} isLoading={isLoading} />
          </div>
          <div className="lg:col-span-4 h-full">
            <Chatbot />
          </div>
        </div>
        <div className="text-center pt-6">
          <p className="text-sm font-medium text-green-700 dark:text-green-400">
            Developed by Prof. Raj Kumar Thakur
          </p>
        </div>
      </main>
    </div>
  );
};

export default App;