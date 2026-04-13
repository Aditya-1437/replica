import { genAI } from "@/lib/gemini";
import { NextResponse } from "next/server";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { questions, answers, domain } = await req.json();

  if (!genAI) {
    return NextResponse.json({ error: "Gemini API Key not configured" }, { status: 500 });
  }

  const prompt = `Act as a Senior Hiring Manager. Review the following 10 questions and the user's typed answers for a ${domain} position. Evaluate them based on:
    Technical Accuracy: Correctness of logic/facts.
    Communication Clarity: How well the user structured their thoughts.
    Confidence: Based on word choice and assertiveness.
    
    Return EXACTLY a JSON string with the following structure:
    {
      "overallScore": number (0-100),
      "metrics": {
        "clarity": number,
        "confidence": number,
        "technical": number
      },
      "feedback": {
        "strengths": ["...", "..."],
        "growthAreas": ["...", "..."]
      },
      "detailedReview": [
        { "question": "...", "userAnswer": "...", "expectedAnswer": "...", "specificFeedback": "..." }
      ]
    }
    
    History: ${JSON.stringify({ questions, answers })}`;

  try {
    const response = await genAI.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const textStream = response.text || "{}";
    
    return new Response(textStream);
  } catch (err: any) {
    console.error("Evaluation error:", err?.message || err);
    return NextResponse.json({ error: "Evaluation failed", details: err?.message || String(err) }, { status: 500 });
  }
}
