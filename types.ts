export enum AnalysisType {
  FACE_CARD = 'Face Card',
  APPEARANCE = 'Appearance',
  HAIR = 'Hair',
  BODY = 'Body Style',
}

export interface AnalysisCategory {
  name: string;
  score: number;
  description: string;
}

export interface AnalysisResult {
  overallScore: number;
  title: string;
  summary: string;
  categories: AnalysisCategory[];
  recommendations: string[];
}

export interface HistoryItem {
  id: string;
  date: string;
  type: AnalysisType;
  result: AnalysisResult;
  thumbnail?: string; // Base64 of the first image
}

export interface ImageAsset {
  data: string; // Base64
  mimeType: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: number;
  messages: ChatMessage[];
}