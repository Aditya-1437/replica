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

  const [isFocused, setIsFocused] = React.useState(false);
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
    <div className="min-h-screen bg-gradient-to-b from-sage-bg via-white to-white flex flex-col font-sans">
      {/* Progress Bar (Fluid Growth) */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-100 z-50">
        <motion.div
          initial={{ width: 0 }}
          animate={{ 
            width: `${((currentStep + 1) / questions.length) * 100}%`,
            backgroundColor: currentStep > 7 ? '#4A6741' : '#607D8B'
          }}
          className="h-full shadow-[0_0_10px_rgba(74,103,65,0.4)] transition-colors duration-1000"
        />
      </div>

      <main className="flex-1 max-w-[800px] mx-auto w-full px-6 pt-32 pb-40">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-12"
          >
            {/* Question Indicator */}
            <div className="flex justify-center">
              <span className="px-4 py-1.5 rounded-full bg-sage-accent/5 border border-sage-accent/10 text-sage-accent text-xs font-bold uppercase tracking-widest">
                Question {currentStep + 1} of {questions.length}
              </span>
            </div>

            {/* Question Text */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
                {questions[currentStep]}
              </h1>
            </div>

            {/* Premium Response Area */}
            <motion.div
              animate={{ 
                scale: isFocused ? 1.01 : 1,
                backgroundColor: isFocused ? '#FFFFFF' : '#F9FBF9',
              }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "relative p-8 md:p-12 rounded-[2.5rem] transition-shadow duration-500 min-h-[400px] cursor-text",
                isFocused 
                  ? "shadow-[0_20px_50px_rgba(74,103,65,0.1)] ring-1 ring-sage-accent/5" 
                  : "shadow-sm border border-transparent"
              )}
              onClick={() => textareaRef.current?.focus()}
            >
              {/* Animated Placeholder */}
              <AnimatePresence>
                {!currentAnswer && (
                  <motion.p
                    initial={{ opacity: 1, y: 0 }}
                    animate={isFocused ? { opacity: 0.3, y: -4 } : { opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-8 md:top-12 left-8 md:left-12 text-xl md:text-2xl text-gray-300 pointer-events-none"
                  >
                    Type your response here... take your time, clarity is key.
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Response Input Area */}
              <div className="relative">
                {/* Display Layer (Mirrors the textarea for custom cursor positioning) */}
                <div 
                  className="absolute inset-0 pointer-events-none text-xl md:text-2xl font-sans text-slate-700 leading-relaxed whitespace-pre-wrap break-words"
                  aria-hidden="true"
                >
                  {currentAnswer}
                  {isFocused && (
                    <motion.span 
                      layoutId="cursor"
                      className="inline-block custom-cursor w-[3px] h-[1.2em] translate-y-[0.2em] ml-0.5"
                    />
                  )}
                </div>

                {/* Actual Input Layer */}
                <textarea
                  ref={textareaRef}
                  value={currentAnswer}
                  onChange={(e) => setAnswer(currentStep, e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="w-full bg-transparent border-none focus:ring-0 text-xl md:text-2xl font-sans text-transparent leading-relaxed caret-transparent resize-none min-h-[300px] p-0 relative z-10"
                  style={{ WebkitTextFillColor: 'transparent' }}
                />
              </div>

            </motion.div>
          </motion.div>
        </AnimatePresence>
      </main>


      {/* Sticky Bottom Controls */}
      <div className="fixed bottom-0 left-0 w-full p-6 md:p-10 bg-gradient-to-t from-white via-white to-transparent pointer-events-none">
        <div className="max-w-[800px] mx-auto w-full flex items-center justify-between pointer-events-auto">
          <button
            onClick={resetSession}
            className="text-gray-400 hover:text-slate-900 font-medium transition-colors flex items-center gap-2 group"
          >
            <LogOut className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Exit Session
          </button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNext}
            disabled={!answers[currentStep].trim()}
            className={cn(
              "px-10 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all shadow-xl",
              answers[currentStep].trim() 
                ? "bg-sage-accent text-white shadow-sage-accent/20 hover:bg-sage-accent/90" 
                : "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
            )}
          >
            {currentStep === questions.length - 1 ? 'Finish Interview' : 'Next Question'}
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
