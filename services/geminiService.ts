import { GoogleGenAI } from "@google/genai";
import { ChatMessage, Source } from "../types";
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

export interface ChatbotResponse {
  text: string;
  sources: Source[];
}

export const generateTopicExplanation = async (topic: string): Promise<string> => {
  if (!ai) return Promise.resolve(MOCK_EXPLANATION);
  
  try {
    const prompt = `
You are an expert professor of "Simulation and Modeling". Your knowledge is based on the provided syllabus and a solutions manual for the textbook "Discrete-Event System Simulation" by Banks, Carson, Nelson, and Nicol.

A student has clicked on the syllabus topic: "${topic}".

Based on the context below, generate a clear, concise, and helpful explanation for this topic.
Your response MUST be formatted in Markdown. When providing mathematical formulas, equations, or symbols, use LaTeX notation. Enclose inline math with single dollar signs (e.g., \`$E=mc^2$\`) and block math with double dollar signs (e.g., \`$$ \\sum_{i=1}^n i = \\frac{n(n+1)}{2} $$\`).

Your response must include the following sections:
1.  **### Overview**: A brief, easy-to-understand summary of the topic.
2.  **### Key Concepts**: Bullet points explaining the core ideas, definitions, and any relevant formulas.
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

export const getChatbotResponse = async (question: string, history: ChatMessage[]): Promise<ChatbotResponse> => {
  if (!ai) {
    return Promise.resolve({ text: MOCK_CHAT_RESPONSE, sources: [] });
  }

  const formattedHistory = history.map(msg => `${msg.sender}: ${msg.text}`).join('\n');

  try {
    const prompt = `
You are an expert tutor for a "Simulation and Modeling" university course. Your knowledge is primarily based on the provided syllabus and a solutions manual.
Your goal is to help the student learn, not just give them the answer.

Here are your instructions:
1.  **Prioritize Provided Context:** First, try to answer the user's question using ONLY the "Syllabus" and "Solutions Manual" context provided below.
2.  **Solve Problems Step-by-Step:** If the user asks a numerical or conceptual problem, provide a detailed, step-by-step explanation of how to arrive at the solution. Explain the reasoning behind each step.
3.  **Use LaTeX for Math:** When providing mathematical formulas, equations, or symbols, use LaTeX notation. Enclose inline math with single dollar signs (e.g., \`$x^2$\`) and block math with double dollar signs (e.g., \`$$ \\frac{a}{b} $$\`).
4.  **Use Web Search as a Fallback:** If, and only if, the provided context is insufficient to answer the question, you are allowed to use your web search tool to find the information.
5.  **Cite Your Sources:**
    *   If you use the provided context, cite it (e.g., "Source: Solutions Manual, Ch. 6").
    *   If you use the web, the sources will be automatically cited.
6.  **Be Polite and encouraging:** If a question is outside your scope, politely explain that you are focused on the course material.

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
      config: {
        tools: [{googleSearch: {}}],
      },
    });
    
    const text = response.text;
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    const sources: Source[] = groundingChunks
      .filter(chunk => chunk.web && chunk.web.uri)
      .map(chunk => ({
        title: chunk.web.title || '',
        uri: chunk.web.uri,
      }));

    return { text, sources };

  } catch (error) {
    console.error("Error getting chatbot response:", error);
    const errorResponse = {
      text: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
      sources: []
    };
    return errorResponse;
  }
};