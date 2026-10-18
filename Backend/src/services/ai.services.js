import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateAIContent = async (prompt) => {
  const response = await ai.models.generateContent({
    model: "gemini-3.8-flash",
    contents: prompt,
  });

  return response.text;
};
