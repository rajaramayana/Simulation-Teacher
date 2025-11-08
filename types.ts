
export interface Topic {
  title: string;
  subtopics?: string[];
}

export interface Unit {
  unit: number;
  title: string;
  topics: Topic[];
}

export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}
