'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Lock, BrainCircuit, ArrowRight } from 'lucide-react';
import HeroComputerScreen from './HeroComputerScreen';
import InterviewLauncherModal from './InterviewLauncherModal';

const featureHighlights = [
  {
    icon: Zap,
    title: "Real-Time Evaluation",
    description: "Instant AI feedback on communication pace, structural clarity, and technical accuracy."
  },
  {
    icon: Lock,
    title: "100% Camera-Free",
    description: "Zero video pressure. Practice typing and articulating complex technical ideas comfortably."
  },
  {
    icon: BrainCircuit,
    title: "STAR Method Scoring",
    description: "Automated analysis of Situation, Task, Action, and Result framing for high-impact answers."
  }
];

export default function Hero() {
  const [isLauncherOpen, setIsLauncherOpen] = useState(false);

  const handleStartEngine = () => {
    setIsLauncherOpen(true);
  };

  return (
    <section className="relative pt-10 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-sage-bg">
      <InterviewLauncherModal
        isOpen={isLauncherOpen}
        onClose={() => setIsLauncherOpen(false)}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-12">
        
        {/* Top Section: Main Heading Spanning Total Page Width */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-5xl mx-auto space-y-6"
        >
          {/* Top Pill Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 text-xs font-bold uppercase tracking-wider shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            <span>AI Interview Simulation Agent</span>
          </motion.div>

          {/* Full Width Main Headline */}
          <h1 className="font-brand text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-950 leading-[1.08] tracking-tight">
            Ace your tech interviews with{' '}
            <span className="brand-gradient-text">
              real-time AI feedback.
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="text-base sm:text-xl text-slate-600 leading-relaxed font-medium max-w-3xl mx-auto">
            Practice system design, algorithms, and STAR behavioral scenarios in a private, camera-free environment. Get instant scoring on clarity, technical depth, and confidence.
          </p>

          {/* Start AI Engine Button */}
          <div className="pt-2 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleStartEngine}
              className="px-9 py-4 bg-orange-600 text-white rounded-2xl font-extrabold text-base sm:text-lg shadow-xl shadow-orange-600/30 hover:bg-orange-500 transition-all flex items-center gap-3 active:scale-95 group cursor-pointer"
            >
              <div className="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white animate-pulse" />
              </div>
              <span>Start AI Engine</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </motion.div>

        {/* Bottom Section: Equal 50 / 50 Split (Details Left, Computer Screen Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 items-center pt-4">
          
          {/* Left 50%: Feature Details Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Platform Capabilities
              </h3>
              <p className="text-2xl font-brand font-extrabold text-slate-950 tracking-tight">
                Designed for high-stakes preparation.
              </p>
            </div>

            <div className="space-y-3.5">
              {featureHighlights.map((feat, idx) => (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1, duration: 0.5 }}
                  className="p-4 rounded-2xl bg-white border border-zinc-200/80 shadow-sm hover:border-orange-500/40 hover:shadow-md transition-all flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-colors">
                    <feat.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-950 tracking-tight mb-1">{feat.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">{feat.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right 50%: Computer Screen Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex justify-center"
          >
            <HeroComputerScreen />
          </motion.div>

        </div>

      </div>
    </section>
  );
}
