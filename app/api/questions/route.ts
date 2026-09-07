import { genAI } from "@/lib/gemini";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { domain, techStack, difficulty } = await req.json();

    if (!genAI) {
      return NextResponse.json({
        questions: generateFallbackQuestions(domain, techStack, difficulty),
        fallback: true
      });
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
    const parsed = JSON.parse(text);
    
    if (parsed.questions && Array.isArray(parsed.questions) && parsed.questions.length > 0) {
      return NextResponse.json(parsed);
    }

    return NextResponse.json({ questions: generateFallbackQuestions(domain, techStack, difficulty) });
  } catch (error: any) {
    console.error("Error generating questions with Gemini, using fallback:", error?.message || error);
    return NextResponse.json({ questions: generateFallbackQuestions("technical", "General", "Medium") });
  }
}

function generateFallbackQuestions(domain?: string, techStack?: string, difficulty?: string): string[] {
  const diff = difficulty || "Intermediate";
  const tech = techStack || "General";

  if (domain === "behavioral") {
    return [
      "Describe a situation where you had to lead a critical initiative under tight deadlines and ambiguous requirements. How did you organize the team?",
      "Tell me about a time when you strongly disagreed with an engineering or product decision. How did you articulate your viewpoint and what was the outcome?",
      "Can you share an experience where a major project failed or experienced a severe regression? How did you respond, and what changes did you institute?",
      "How do you approach mentoring junior team members while maintaining your own velocity on complex deliverables?",
      "Describe a scenario where you had to persuade cross-functional stakeholders (e.g. Product, Design, Sales) to compromise on technical trade-offs.",
      "Tell me about a time you identified a critical flaw or performance bottleneck that no one else noticed. How did you advocate for fixing it?",
      "Give an example of how you handle conflicting priorities when multiple high-severity requests arrive simultaneously.",
      "Describe how you navigated a toxic or difficult dynamic with a colleague or stakeholder to achieve a successful project outcome.",
      "Tell me about a project where you took significant calculated risks to achieve a 10x improvement in outcomes. What was your framework?",
      "Reflecting on your past year, what is the most significant constructive feedback you received, and how did it change your day-to-day execution?"
    ];
  }

  if (domain === "hr") {
    return [
      "Walk me through your career journey, highlighting the key inflection points that brought you to where you are today.",
      "What specifically attracted you to Replica, and how does this role align with your long-term 3-to-5-year career objectives?",
      "What type of work culture and management style empowers you to do your most impactful work?",
      "Tell me about a time you stepped outside your defined job responsibilities to solve a company-wide problem.",
      "How do you stay updated with rapidly emerging industry trends and decide what new capabilities to invest in?",
      "Describe your ideal relationship between autonomous execution and team alignment in a remote/hybrid environment.",
      "What are your core expectations from engineering leadership, and how do you prefer to receive feedback?",
      "How do you ensure sustainable work habits and prevent burnout during intense release cycles or product launches?",
      "Can you give an example of how you've contributed to fostering diversity, inclusion, and psychological safety on your teams?",
      "Do you have any questions for us regarding the team dynamics, company trajectory, or expectations for this position?"
    ];
  }

  return [
    `For ${tech} at a ${diff} level: How would you architect a fault-tolerant system capable of handling unexpected traffic spikes with zero downtime?`,
    `Explain the internal concurrency or asynchronous execution model in ${tech}. What are the key pitfalls with race conditions or memory leaks?`,
    `Walk through how you would optimize database queries, caching strategies, and indexing when working with high-read, high-write data models.`,
    `How do you design and enforce API idempotency and distributed rate limiting across multiple microservice boundaries?`,
    `Describe the core trade-offs between consistency and availability (CAP theorem) in a distributed architecture you recently worked with.`,
    `When profiling a slow service built with ${tech}, what tooling and step-by-step methodology do you use to isolate latency hotspots?`,
    `How do you structure automated testing (unit, integration, end-to-end) and CI/CD pipelines to guarantee zero-regression deployments?`,
    `Explain your approach to schema migrations on high-volume production tables without locking or service degradation.`,
    `Describe how you secure APIs against modern vulnerability vectors (CSRF, injection, token replay, SSRF) in a ${tech} ecosystem.`,
    `If you had to re-architect an existing legacy monolithic service into clean decoupled domains using ${tech}, what would be your phase-by-phase migration plan?`
  ];
}
