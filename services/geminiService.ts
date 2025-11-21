import { GoogleGenAI } from "@google/genai";
import type { GroundingChunk } from '../types';

interface FinancialAdviceResponse {
  text: string;
  sources: GroundingChunk[];
}

export const getFinancialAdvice = async (prompt: string): Promise<FinancialAdviceResponse> => {
  try {
    // FIX: Removed an unnecessary comment as the implementation was already correct.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const tools: any[] = [{ googleSearch: {} }];
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: tools,
      },
    });

    const text = response.text ?? "Não foi possível gerar uma resposta. Tente novamente.";
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];
    
    return { text, sources };

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return { text: "Ocorreu um erro ao buscar conselhos. Por favor, verifique sua chave de API e tente novamente.", sources: [] };
  }
};