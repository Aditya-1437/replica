import { GoogleGenAI } from "@google/genai";
import { google } from "@ai-sdk/google";

const apiKey = process.env.GEMINI_API_KEY || "";

export const genAI = apiKey ? new GoogleGenAI({}) : null;

export const geminiModel = google("gemini-3-flash-preview");

