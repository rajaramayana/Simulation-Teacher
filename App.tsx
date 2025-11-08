
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
    <div className="min-h-screen bg-slate-100 dark:bg-brand-dark font-sans p-4 sm:p-6 lg:p-8">
      <header className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-primary dark:text-white tracking-tight">
          Simulation & Modeling Syllabus Explorer
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          An interactive guide to the course curriculum, powered by Gemini.
        </p>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-10rem)] max-h-[800px]">
        <div className="lg:col-span-3 h-full">
          <Sidebar onSelectTopic={handleSelectTopic} selectedTopicTitle={selectedTopic?.title || null} />
        </div>
        <div className="lg:col-span-6 h-full">
          <ContentPanel selectedTopic={selectedTopic} content={topicContent} isLoading={isLoading} />
        </div>
        <div className="lg:col-span-3 h-full">
          <Chatbot />
        </div>
      </div>
    </div>
  );
};

export default App;
