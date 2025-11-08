
import React, { useState, useMemo } from 'react';
import { SYLLABUS_DATA } from '../constants/syllabusData';
import { Unit, Topic } from '../types';
import { SearchIcon, ChevronDownIcon } from './Icons';

interface SidebarProps {
  onSelectTopic: (topic: Topic) => void;
  selectedTopicTitle: string | null;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelectTopic, selectedTopicTitle }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedUnits, setExpandedUnits] = useState<number[]>([1]);

  const toggleUnit = (unitNumber: number) => {
    setExpandedUnits(prev =>
      prev.includes(unitNumber) ? prev.filter(u => u !== unitNumber) : [...prev, unitNumber]
    );
  };

  const filteredSyllabus = useMemo(() => {
    if (!searchTerm) return SYLLABUS_DATA;
    const lowercasedFilter = searchTerm.toLowerCase();
    
    return SYLLABUS_DATA.map(unit => {
      const filteredTopics = unit.topics.filter(topic => 
        topic.title.toLowerCase().includes(lowercasedFilter) ||
        (topic.subtopics && topic.subtopics.some(sub => sub.toLowerCase().includes(lowercasedFilter)))
      );
      return { ...unit, topics: filteredTopics };
    }).filter(unit => unit.topics.length > 0);
  }, [searchTerm]);

  return (
    <aside className="bg-white dark:bg-slate-900/70 p-4 rounded-lg shadow-lg backdrop-blur-sm h-full flex flex-col">
      <h2 className="text-xl font-bold text-brand-primary dark:text-brand-secondary mb-4">Syllabus</h2>
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search topics..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg bg-slate-50 dark:bg-slate-800 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-secondary"
        />
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
      </div>
      <nav className="flex-grow overflow-y-auto">
        <ul>
          {filteredSyllabus.map(unit => (
            <li key={unit.unit} className="mb-2">
              <button
                onClick={() => toggleUnit(unit.unit)}
                className="w-full text-left flex justify-between items-center p-2 rounded-md hover:bg-brand-light dark:hover:bg-brand-primary/50 transition-colors"
              >
                <span className="font-semibold">{`Unit ${unit.unit}: ${unit.title}`}</span>
                <ChevronDownIcon className={`h-5 w-5 transform transition-transform ${expandedUnits.includes(unit.unit) ? 'rotate-180' : ''}`} />
              </button>
              {expandedUnits.includes(unit.unit) && (
                <ul className="pl-4 mt-1 border-l-2 border-slate-200 dark:border-slate-700">
                  {unit.topics.map(topic => (
                    <li key={topic.title}>
                      <a
                        href="#"
                        onClick={(e) => { e.preventDefault(); onSelectTopic(topic); }}
                        className={`block p-2 my-1 rounded-md transition-colors text-sm ${selectedTopicTitle === topic.title ? 'bg-brand-secondary text-white font-semibold' : 'hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                      >
                        {topic.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
