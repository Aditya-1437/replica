'use client';

import React, { createContext, useContext, useState } from 'react';

export type AppView = 'home' | 'interview' | 'results';
export type InterviewType = 'technical' | 'behavioral' | 'hr';

interface SessionContextType {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  interviewType: InterviewType | null;
  startInterview: (type: InterviewType, config?: any) => void;
  answers: string[];
  setAnswer: (index: number, answer: string) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  questions: string[];
  isAnalyzing: boolean;
  completeInterview: () => void;
  resetSession: () => void;
}

const MOCK_QUESTIONS = [
  "Can you tell me about yourself and your background?",
  "Why are you interested in this role at Replica?",
  "Describe a challenging situation and how you handled it.",
  "What are your greatest professional strengths?",
  "How do you handle conflict in a team environment?",
  "Where do you see yourself in five years?",
  "Tell me about a time you failed and what you learned.",
  "How do you prioritize your work under tight deadlines?",
  "What is your approach to learning new technologies?",
  "Do you have any questions for us?"
];

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [interviewType, setInterviewType] = useState<InterviewType | null>(null);
  const [answers, setAnswers] = useState<string[]>(new Array(10).fill(''));
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const startInterview = (type: InterviewType) => {
    setInterviewType(type);
    setCurrentStep(0);
    setAnswers(new Array(10).fill(''));
    setCurrentView('interview');
  };

  const setAnswer = (index: number, answer: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const completeInterview = () => {
    setIsAnalyzing(true);
    // Simulate AI analysis delay
    setTimeout(() => {
      setIsAnalyzing(false);
      setCurrentView('results');
    }, 3000);
  };

  const resetSession = () => {
    setCurrentView('home');
    setInterviewType(null);
    setCurrentStep(0);
    setAnswers(new Array(10).fill(''));
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
      questions: MOCK_QUESTIONS,
      isAnalyzing,
      completeInterview,
      resetSession
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
