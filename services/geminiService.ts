
import { GoogleGenAI, Type } from "@google/genai";
import { RiskLevel, Platform } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeProfileAI = async (handle: string, platform: Platform) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Perform a simulated forensic behavioral analysis for a social media profile. 
      Handle: ${handle}
      Platform: ${platform}
      
      Simulate findings based on common patterns of fake/bot accounts vs real humans. 
      Focus on posting entropy, linguistic rhythm, and network motifs.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            trustScore: { type: Type.NUMBER, description: "Confidence score from 0-100" },
            findings: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  category: { type: Type.STRING },
                  description: { type: Type.STRING },
                  severity: { type: Type.STRING, enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] }
                },
                required: ["category", "description", "severity"]
              }
            },
            behavioralFingerprint: {
              type: Type.OBJECT,
              properties: {
                entropy: { type: Type.NUMBER },
                linguisticRhythm: { type: Type.ARRAY, items: { type: Type.NUMBER } },
                personaStability: { type: Type.NUMBER }
              }
            },
            coordinatedNetworkDetected: { type: Type.BOOLEAN }
          },
          required: ["trustScore", "findings", "coordinatedNetworkDetected"]
        }
      }
    });

    const result = JSON.parse(response.text);
    return result;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};
