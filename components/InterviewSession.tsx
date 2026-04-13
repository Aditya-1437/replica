'use client';

import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from '@/context/SessionContext';
import { ArrowRight, LogOut, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function InterviewSession() {
  const { 
    questions, 
    currentStep, 
    setCurrentStep, 
    answers, 
    setAnswer, 
    isAnalyzing, 
    completeInterview, 
    resetSession 
  } = useSession();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-expand textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [answers, currentStep]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeInterview();
    }
  };

  if (isAnalyzing) {
    return (
      <div className="fixed inset-0 z-[100] bg-sage-bg flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-24 h-24 rounded-full bg-sage-accent/10 flex items-center justify-center mb-8"
        >
          <Loader2 className="w-10 h-10 text-sage-accent animate-spin" />
        </motion.div>
        <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">Generating Insights...</h2>
        <p className="text-slate-muted max-w-md mx-auto leading-relaxed">
          Our AI is analyzing your responses for clarity, confidence, and technical precision. This will only take a moment.
        </p>
      </div>
    );
  }

  const currentAnswer = answers[currentStep] || '';

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-row font-sans bg-white">
      {/* LEFT PANE (60%) - The Workspace */}
      <div className="w-[60%] h-full flex flex-col bg-white">
        {/* Answer Area */}
        <div className="flex-1 overflow-y-auto p-16 md:p-20 flex flex-col relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="flex-1 flex flex-col relative w-full h-full"
            >
              {/* Readability Guide (80 characters) */}
              <div 
                className="absolute top-0 bottom-0 w-px bg-gray-200/60 pointer-events-none z-0 hidden md:block text-lg font-sans font-medium"
                style={{ left: '80ch' }}
              />
              
              <textarea
                ref={textareaRef}
                value={currentAnswer}
                onChange={(e) => setAnswer(currentStep, e.target.value)}
                placeholder="Type your response here... take your time, clarity is key."
                className="w-full flex-1 bg-transparent border-none focus:ring-0 text-lg font-sans font-medium text-slate-800 caret-[#4A6741] resize-none p-0 outline-none placeholder:text-gray-300 min-h-[500px] relative z-10"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Controls - Left Pane Only */}
        <div className="w-full px-16 py-6 border-t border-gray-100 flex items-center justify-between bg-white shrink-0">
          <button
            onClick={resetSession}
            className="text-gray-400 hover:text-slate-600 font-medium transition-colors flex items-center gap-2 group opacity-60 hover:opacity-100"
          >
            <LogOut className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Exit Session
          </button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNext}
            disabled={!answers[currentStep]?.trim()}
            className={cn(
              "px-8 py-3 rounded-xl font-medium flex items-center gap-2 transition-all shadow-sm",
              answers[currentStep]?.trim() 
                ? "bg-[#4A6741] text-white hover:bg-[#3D5536]" 
                : "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
            )}
          >
            {currentStep === questions.length - 1 ? 'Finish Interview' : 'Next Question'}
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* RIGHT PANE (40%) - The Context */}
      <div className="w-[40%] h-full bg-[#F0F4F2] border-l border-gray-200 relative flex flex-col">
        {/* Progress Section */}
        <div className="w-full relative pt-8 px-12 flex flex-col">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#E2E8E4]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ 
                width: `${((currentStep + 1) / questions.length) * 100}%`,
                backgroundColor: '#4A6741'
              }}
              className="h-full transition-colors duration-1000"
            />
          </div>
          <div className="text-right mt-4 text-[#4A6741] text-sm font-bold uppercase tracking-widest opacity-80">
            Question {currentStep + 1} of {questions.length}
          </div>
        </div>

        {/* Question Text Centered */}
        <div className="flex-1 flex flex-col justify-center px-12 md:px-20 pb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <h2 className="text-2xl font-serif font-bold text-[#2F3E2B] leading-relaxed">
                {questions[currentStep]}
              </h2>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
