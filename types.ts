
export interface Topic {
  title: string;
  subtopics?: string[];
}

export interface Unit {
  unit: number;
  title: string;
  topics: Topic[];
}

export interface Source {
  title: string;
  uri: string;
}

export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  sources?: Source[];
}
