'use client';

import React, { createContext, useContext, useState } from 'react';

export type AppView = 'home' | 'interview' | 'results';
export type InterviewType = 'technical' | 'behavioral' | 'hr';

export interface EvaluationResult {
  overallScore: number;
  metrics: {
    clarity: number;
    confidence: number;
    technical: number;
  };
  feedback: {
    strengths: string[];
    growthAreas: string[];
  };
  detailedReview: {
    question: string;
    userAnswer: string;
    expectedAnswer: string;
    specificFeedback: string;
  }[];
}

interface SessionContextType {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  interviewType: InterviewType | null;
  startInterview: (type: InterviewType, config?: { tech?: string[], diff?: string }) => Promise<void>;
  answers: string[];
  setAnswer: (index: number, answer: string) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  questions: string[];
  isAnalyzing: boolean;
  isLoadingQuestions: boolean;
  completeInterview: () => Promise<void>;
  resetSession: () => void;
  results: EvaluationResult | null;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [interviewType, setInterviewType] = useState<InterviewType | null>(null);
  const [answers, setAnswers] = useState<string[]>(new Array(10).fill(''));
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
  const [questions, setQuestions] = useState<string[]>([]);
  const [results, setResults] = useState<EvaluationResult | null>(null);

  const startInterview = async (type: InterviewType, config?: { tech?: string[], diff?: string }) => {
    setInterviewType(type);
    setCurrentStep(0);
    setAnswers(new Array(10).fill(''));
    setIsLoadingQuestions(true);
    
    try {
      const response = await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domain: type,
          techStack: config?.tech?.join(', ') || 'General',
          difficulty: config?.diff || 'Medium'
        })
      });
      
      const data = await response.json();
      if (data.questions) {
        setQuestions(data.questions);
        setCurrentView('interview');
      }
    } catch (error) {
      console.error("Failed to fetch questions:", error);
    } finally {
      setIsLoadingQuestions(false);
    }
  };

  const setAnswer = (index: number, answer: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const completeInterview = async () => {
    setIsAnalyzing(true);
    setCurrentView('results');
    
    try {
      const response = await fetch('/api/evaluate', {
        method: 'POST',
        body: JSON.stringify({
          questions,
          answers,
          domain: interviewType
        })
      });

      if (!response.body) return;

      // Handle streaming response
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        accumulated += decoder.decode(value, { stream: true });
        
        // Try to parse partial JSON if possible, but for simplicity we'll just parse lines
        // Vercel AI SDK text stream for objects sends partial JSON chunks or line-delimited
        // In this case, toTextStreamResponse() sends the stream.
        // For a more robust streaming UI, we should use useObject in the component.
        // But let's try to parse the final result here for the context state.
      }

      // Final parse
      try {
        // Find the last complete JSON object in the stream if it's multiple chunks
        // Or if it's just one big stringified object
        const finalData = JSON.parse(accumulated);
        setResults(finalData);
      } catch (e) {
        // If it's a stream of partial objects (like from streamObject), we might need to handle it differently
        // But for context state, we usually want the final object.
        console.error("Error parsing evaluation stream:", e);
      }
    } catch (error) {
      console.error("Evaluation failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetSession = () => {
    setCurrentView('home');
    setInterviewType(null);
    setCurrentStep(0);
    setAnswers(new Array(10).fill(''));
    setQuestions([]);
    setResults(null);
  };

  return (
    <SessionContext.Provider value={{
      currentView,
      setCurrentView,
      interviewType,
      startInterview,
      answers,
      setAnswer,
      currentStep,
      setCurrentStep,
      questions,
      isAnalyzing,
      isLoadingQuestions,
      completeInterview,
      resetSession,
      results
    }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}
