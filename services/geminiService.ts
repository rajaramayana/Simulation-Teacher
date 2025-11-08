
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";
import { SYLLABUS_CONTEXT, SOLUTIONS_MANUAL_CONTEXT } from "../constants/knowledgeBase";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key is not set. Using mock data. Please set the API_KEY environment variable.");
}

const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

const MOCK_EXPLANATION = `
### Overview
This is a mock explanation for the selected topic. The Gemini API is not configured. Please set your API_KEY.

### Key Concepts
- **Concept A:** Definition of concept A.
- **Concept B:** Definition of concept B.

### Example
Imagine a scenario where... This demonstrates the concept in action.

### See Also
- Related Topic 1
- Related Topic 2

### Sources
- Discrete-Event System Simulation, 4th Ed.
`;

const MOCK_CHAT_RESPONSE = "This is a mock response from the chatbot. Please configure the Gemini API key to have a real conversation.";


export const generateTopicExplanation = async (topic: string): Promise<string> => {
  if (!ai) return Promise.resolve(MOCK_EXPLANATION);
  
  try {
    const prompt = `
You are an expert professor of "Simulation and Modeling". Your knowledge is based on the provided syllabus and a solutions manual for the textbook "Discrete-Event System Simulation" by Banks, Carson, Nelson, and Nicol.

A student has clicked on the syllabus topic: "${topic}".

Based on the context below, generate a clear, concise, and helpful explanation for this topic.
Your response MUST be formatted in Markdown and include the following sections:
1.  **### Overview**: A brief, easy-to-understand summary of the topic.
2.  **### Key Concepts**: Bullet points explaining the core ideas, definitions, and any simple, relevant formulas.
3.  **### Practical Example**: A short, worked-out example to illustrate the concept. Use a simple scenario.
4.  **### See Also**: A few bullet points of related topics from the syllabus.
5.  **### Sources**: A citation to the textbook.

CONTEXT:
---
${SYLLABUS_CONTEXT}
---
${SOLUTIONS_MANUAL_CONTEXT}
---
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating topic explanation:", error);
    return "Sorry, I encountered an error while generating the explanation for this topic. Please try again.";
  }
};

export const getChatbotResponse = async (question: string, history: ChatMessage[]): Promise<string> => {
  if (!ai) return Promise.resolve(MOCK_CHAT_RESPONSE);

  const formattedHistory = history.map(msg => `${msg.sender}: ${msg.text}`).join('\n');

  try {
    const prompt = `
You are a helpful Q&A assistant for a "Simulation and Modeling" course. Your knowledge is strictly limited to the provided syllabus and solutions manual text below.
Answer the user's question concisely and accurately based ONLY on the provided context.
If the question is outside the scope of the provided text, politely state that you cannot answer it and that your knowledge is limited to the course materials.
Always cite the source of your information (e.g., "Source: Solutions Manual, Ch. 6").

CONTEXT:
---
Syllabus:
${SYLLABUS_CONTEXT}
---
Solutions Manual:
${SOLUTIONS_MANUAL_CONTEXT}
---

CHAT HISTORY:
${formattedHistory}

USER QUESTION:
${question}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error getting chatbot response:", error);
    return "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.";
  }
};
