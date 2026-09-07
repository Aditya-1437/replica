'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from '@/context/SessionContext';
import { 
  ArrowRight, 
  ArrowLeft, 
  LogOut, 
  Loader2, 
  Terminal, 
  Sparkles, 
  Briefcase, 
  AlertTriangle,
  CornerDownLeft
} from 'lucide-react';
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
    resetSession,
    interviewType,
    sessionConfig
  } = useSession();

  const [showQuitModal, setShowQuitModal] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const currentAnswer = answers[currentStep] || '';
  const wordCount = currentAnswer.trim() ? currentAnswer.trim().split(/\s+/).length : 0;
  const isLastQuestion = currentStep === questions.length - 1;

  // Auto-focus textarea on step change
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [currentStep]);

  // Handle Advance
  const handleNext = () => {
    if (!currentAnswer.trim()) return;
    if (!isLastQuestion) {
      setCurrentStep(currentStep + 1);
    } else {
      completeInterview();
    }
  };

  // Handle Previous
  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Keyboard shortcut: Cmd + Enter / Ctrl + Enter to submit and proceed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        handleNext();
      }
      if (e.key === 'Escape' && showQuitModal) {
        setShowQuitModal(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentAnswer, currentStep, isLastQuestion, showQuitModal]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isAnalyzing) {
    return (
      <div className="fixed inset-0 z-[100] bg-zinc-50 flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-24 h-24 rounded-full bg-orange-500/10 flex items-center justify-center mb-8"
        >
          <Loader2 className="w-10 h-10 text-orange-600 animate-spin" />
        </motion.div>
        <h2 className="text-3xl font-sans font-extrabold text-slate-950 mb-4 tracking-tight">Generating Evaluation...</h2>
        <p className="text-slate-600 max-w-md mx-auto leading-relaxed font-medium">
          Our AI engine is analyzing your responses for clarity, technical depth, and structured confidence. This will only take a moment.
        </p>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-[#FAFAFA] font-sans">
      
      {/* ================= TOP HEADER HUD BAR ================= */}
      <header className="h-16 bg-white border-b border-zinc-200/90 px-6 sm:px-10 flex items-center justify-between shrink-0 relative z-20">
        
        {/* Left: Track & Calibration Metadata */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-orange-500/10 text-orange-600 border border-orange-500/20 flex items-center justify-center">
            {interviewType === 'technical' && <Terminal className="w-4 h-4" />}
            {interviewType === 'behavioral' && <Sparkles className="w-4 h-4" />}
            {interviewType === 'hr' && <Briefcase className="w-4 h-4" />}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900 capitalize tracking-tight">
                {interviewType ? `${interviewType} Track` : 'Simulation Track'}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 border border-zinc-200 font-semibold">
                {sessionConfig?.diff || sessionConfig?.roleLevel || 'Active'}
              </span>
            </div>
            
            {/* Tech Chips */}
            {sessionConfig?.tech && sessionConfig.tech.length > 0 && (
              <div className="hidden md:flex items-center gap-1 mt-0.5">
                {sessionConfig.tech.slice(0, 3).map((t) => (
                  <span key={t} className="text-[10px] font-mono text-zinc-500">
                    #{t}
                  </span>
                ))}
                {sessionConfig.tech.length > 3 && (
                  <span className="text-[10px] font-mono text-zinc-400">
                    +{sessionConfig.tech.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Center: Clean Question Progress */}
        <div className="flex flex-col items-center">
          <span className="text-xs font-mono font-bold text-slate-800 tracking-wider">
            QUESTION {currentStep + 1} OF {questions.length}
          </span>
          <div className="w-32 sm:w-44 h-1.5 bg-zinc-100 rounded-full mt-1.5 overflow-hidden border border-zinc-200/60">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.4 }}
              className="h-full bg-orange-600 rounded-full"
            />
          </div>
        </div>

        {/* Right: Actions & Quit Button */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 bg-zinc-50 px-2.5 py-1 rounded-lg border border-zinc-200/70">
            <span>Advance:</span>
            <kbd className="px-1.5 py-0.5 bg-white rounded border border-zinc-200 text-zinc-600 font-bold shadow-2xs flex items-center gap-0.5">
              <span>⌘</span>
              <CornerDownLeft className="w-2.5 h-2.5" />
            </kbd>
          </div>

          <button
            id="quit-interview-btn"
            onClick={() => setShowQuitModal(true)}
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-zinc-500 hover:text-red-600 hover:bg-red-50 border border-zinc-200/80 hover:border-red-200 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Quit</span>
          </button>
        </div>

      </header>

      {/* ================= MAIN DUAL-PANE INTERVIEW LAYOUT ================= */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">

        {/* ---------------- LEFT PANE: THE QUESTION BRIEF (42%) ---------------- */}
        <section 
          id="interview-question-pane"
          className="w-full lg:w-[42%] bg-white border-b lg:border-b-0 lg:border-r border-zinc-200/90 p-8 sm:p-12 overflow-y-auto flex flex-col justify-between shrink-0"
        >
          <div className="space-y-6">
            
            {/* Question Index Pill */}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 border border-orange-500/20 text-xs font-mono font-bold tracking-widest uppercase">
                <span>Question {String(currentStep + 1).padStart(2, '0')}</span>
              </span>

              <span className="text-[11px] font-mono text-zinc-400">
                {questions.length - currentStep - 1} remaining
              </span>
            </div>

            {/* Question Prompt */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 leading-snug tracking-tight font-sans">
                  {questions[currentStep]}
                </h1>
              </motion.div>
            </AnimatePresence>

          </div>

          {/* Bottom Guidance Box */}
          <div className="pt-8 border-t border-zinc-100 mt-8">
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                {interviewType === 'technical' && (
                  <>
                    <Terminal className="w-3.5 h-3.5 text-orange-600" />
                    <span>Technical Considerations</span>
                  </>
                )}
                {interviewType === 'behavioral' && (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                    <span>STAR Method Framework</span>
                  </>
                )}
                {interviewType === 'hr' && (
                  <>
                    <Briefcase className="w-3.5 h-3.5 text-orange-600" />
                    <span>Cultural Alignment</span>
                  </>
                )}
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                {interviewType === 'technical' && (
                  'Cover architectural trade-offs, edge cases, algorithmic time/space complexity, and error recovery.'
                )}
                {interviewType === 'behavioral' && (
                  'Structure your answer into: Situation (context), Task (your goal), Action (what you did), and quantifiable Result.'
                )}
                {interviewType === 'hr' && (
                  'Highlight your career trajectory, core values, working style, and communication strengths.'
                )}
              </p>
            </div>
          </div>

        </section>

        {/* ---------------- RIGHT PANE: CANDIDATE ANSWER CANVAS (58%) ---------------- */}
        <section 
          id="interview-workspace-pane"
          className="flex-1 bg-[#FAFAFA] flex flex-col overflow-hidden relative"
        >
          
          {/* Workspace Subheader: Status & Stats */}
          <div className="px-8 sm:px-12 py-3 border-b border-zinc-200/70 bg-white/70 flex items-center justify-between shrink-0">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Your Response
            </span>
            <div className="flex items-center gap-3 text-xs font-mono text-zinc-500">
              <span>{wordCount} words</span>
              <span>•</span>
              <span>{currentAnswer.length} characters</span>
            </div>
          </div>

          {/* Typing Area */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-10 flex flex-col">
            <div className="flex-1 w-full bg-white rounded-2xl border border-zinc-200/90 shadow-2xs p-6 sm:p-8 flex flex-col focus-within:border-orange-500/60 focus-within:ring-2 focus-within:ring-orange-500/10 transition-all">
              <textarea
                id="interview-answer-input"
                ref={textareaRef}
                value={currentAnswer}
                onChange={(e) => setAnswer(currentStep, e.target.value)}
                placeholder="Type your detailed response here... Take your time, clarity and structure are key."
                className="w-full flex-1 bg-transparent border-none focus:ring-0 text-base sm:text-lg font-sans text-slate-900 caret-orange-600 resize-none p-0 outline-none placeholder:text-zinc-300 min-h-[350px] leading-relaxed"
              />
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="px-6 sm:px-10 py-4 bg-white border-t border-zinc-200/90 flex items-center justify-between shrink-0">
            <div>
              {currentStep > 0 ? (
                <button
                  onClick={handlePrev}
                  className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-zinc-600 hover:text-slate-950 hover:bg-zinc-100 border border-zinc-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
              ) : (
                <span className="text-xs font-mono text-zinc-400">
                  Step 1 of {questions.length}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                id="interview-next-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNext}
                disabled={!currentAnswer.trim()}
                className={cn(
                  "px-6 sm:px-8 py-3 rounded-xl font-bold text-sm sm:text-base flex items-center gap-2 transition-all cursor-pointer",
                  currentAnswer.trim()
                    ? "bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-600/25"
                    : "bg-zinc-200 text-zinc-400 cursor-not-allowed shadow-none"
                )}
              >
                <span>{isLastQuestion ? 'Finish & Evaluate' : 'Next Question'}</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

        </section>

      </main>

      {/* ================= QUIT CONFIRMATION WARNING MODAL ================= */}
      <AnimatePresence>
        {showQuitModal && (
          <div 
            id="quit-confirmation-modal-root"
            className="fixed inset-0 z-[110] flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowQuitModal(false)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-0"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-2xl z-10 space-y-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-6 h-6 animate-pulse" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-slate-950 tracking-tight">
                    Quit Interview Mid-Way?
                  </h3>
                  <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider font-mono">
                    Progress Loss Warning
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-2 text-sm text-zinc-600 leading-relaxed">
                <p>
                  You are currently on <strong className="text-slate-900">Question {currentStep + 1} of {questions.length}</strong>.
                </p>
                <p className="text-xs text-zinc-500">
                  If you quit now, all your answers and AI scoring will be discarded, and you will have to restart the interview from the beginning.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  id="resume-interview-btn"
                  onClick={() => setShowQuitModal(false)}
                  className="px-5 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-slate-800 font-semibold text-sm transition-colors cursor-pointer"
                >
                  Resume Interview
                </button>

                <button
                  id="confirm-quit-interview-btn"
                  onClick={() => {
                    setShowQuitModal(false);
                    resetSession();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-md shadow-red-600/20 transition-all cursor-pointer"
                >
                  Quit & Discard Progress
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
