import { genAI } from "@/lib/gemini";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { domain, techStack, difficulty } = await req.json();

    if (!genAI) {
      return NextResponse.json({ error: "Gemini API Key not configured" }, { status: 500 });
    }

    const prompt = `You are an expert interviewer for ${domain} focusing on ${techStack}. The difficulty level is ${difficulty}. Generate exactly 10 unique, challenging interview questions. Return the response strictly in JSON format as an array of strings: {"questions": ["...", "..."]}.`;

    const response = await genAI.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text || "{}";
    
    return NextResponse.json(JSON.parse(text));
  } catch (error: any) {
    console.error("Error generating questions:", error?.message || error);
    return NextResponse.json({ error: "Failed to generate questions", details: error?.message || String(error) }, { status: 500 });
  }
}
