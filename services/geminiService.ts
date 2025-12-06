import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, AnalysisType, ImageAsset, ChatMessage } from "../types";

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = "gemini-2.5-flash";

// Specific criteria mapping based on user request
const ANALYSIS_CRITERIA: Record<AnalysisType, string[]> = {
  [AnalysisType.FACE_CARD]: [
    "Facial Symmetry", "Skin Quality", "Eye Shape & Size", "Eyebrows", "Nose Shape", 
    "Lips", "Cheekbones", "Facial Expression", "Age Defying Features"
  ],
  [AnalysisType.APPEARANCE]: [
    "Fit", "Color Coordination", "Trendiness", "Fabric Choice", "Accessories", 
    "Branding", "Footwear", "Occasion Appropriateness", "Layering", 
    "Fit for Body Type", "Personal Style", "Confidence in Outfit"
  ],
  [AnalysisType.HAIR]: [
    "Hair Length", "Hair Texture", "Volume", "Hair Health", "Hair Color", 
    "Hair Style", "Hairline", "Fringe/Bangs", "Hair Grooming", 
    "Consistency", "Signature Hair Style"
  ],
  [AnalysisType.BODY]: [
    "Body Shape", "Height", "Build", "Posture", "Waist-to-Hip Ratio", 
    "Muscle Tone", "Weight Distribution", "Skin Quality", "Flexibility/Agility", 
    "Overall Health", "Chest/Upper Body", "Legs", "Overall Fitness Level"
  ]
};

export const analyzeImages = async (
  type: AnalysisType,
  images: ImageAsset[]
): Promise<AnalysisResult> => {
  const specificCriteria = ANALYSIS_CRITERIA[type] || ["General Appeal", "Style", "Authenticity", "Vibe"];
  
  const prompt = `
    Analyze the provided images for a "${type}" assessment. 
    Act as a professional stylist and aesthetics expert.
    Be honest but constructive.
    
    Evaluate the user specifically on the following categories:
    ${specificCriteria.map(c => `- ${c}`).join('\n')}

    Provide a JSON response with:
    1. An overall score (0-100).
    2. A catchy title for the look (e.g., "Sharp & Modern", "Soft & Elegant").
    3. A short summary paragraph (max 30 words).
    4. A 'categories' array containing an object for EACH of the specific categories listed above. Each object must have a 'name' (matching the category), 'score' (0-100), and a brief 'description'.
    5. 3 specific actionable recommendations to improve.
  `;

  const parts = [
    { text: prompt },
    ...images.map((img) => ({
      inlineData: {
        data: img.data,
        mimeType: img.mimeType,
      },
    })),
  ];

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: { parts },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overallScore: { type: Type.INTEGER },
            title: { type: Type.STRING },
            summary: { type: Type.STRING },
            categories: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  score: { type: Type.INTEGER },
                  description: { type: Type.STRING },
                },
                required: ["name", "score", "description"],
              },
            },
            recommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: ["overallScore", "title", "summary", "categories", "recommendations"],
        },
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as AnalysisResult;
    } else {
      throw new Error("No response text generated");
    }
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};

export const sendCoachMessage = async (
  history: ChatMessage[], 
  newMessage: string
): Promise<string> => {
  try {
    // Convert our ChatMessage format to Gemini's Content format
    const formattedHistory = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    const chat = ai.chats.create({
      model: MODEL_NAME,
      history: formattedHistory,
      config: {
        systemInstruction: "You are Anam AI, an expert AI Coach specializing in aesthetics, personal style, face card improvement, and physique building. Your goal is to give honest, actionable, and encouraging advice to help users improve their appearance. Keep responses concise, friendly, and helpful.",
      }
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text || "I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    throw error;
  }
};