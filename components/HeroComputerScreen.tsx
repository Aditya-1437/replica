'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, User, Sparkles, CheckCircle2, Zap, ShieldCheck } from 'lucide-react';

export default function HeroComputerScreen() {
  const [typedText, setTypedText] = useState('');
  const fullAnswerText = "I would implement a Sliding Window Counter using Redis Cluster for global rate tracking, paired with local in-memory token buckets for sub-millisecond local rate enforcement...";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullAnswerText.length) {
        setTypedText(fullAnswerText.slice(0, index));
        index++;
      } else {
        setTimeout(() => {
          index = 0;
        }, 3000);
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Outer Glow Backdrop */}
      <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 via-orange-600/10 to-amber-500/20 rounded-3xl blur-2xl opacity-70" />

      {/* Main Computer Window */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-slate-950 rounded-2xl border border-zinc-800 shadow-[0_24px_60px_rgba(0,0,0,0.35)] overflow-hidden"
      >
        {/* macOS Window Top Bar */}
        <div className="px-4 py-3 bg-slate-900 border-b border-zinc-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>

          <div className="flex items-center gap-2 px-3 py-1 bg-slate-950/80 rounded-full border border-zinc-800 text-[11px] font-mono text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            <span>REPLICA AI Agent • Live Session</span>
          </div>

          <div className="hidden sm:flex items-center gap-1 text-[10px] font-bold text-orange-400 uppercase tracking-widest bg-orange-500/10 px-2.5 py-1 rounded-md border border-orange-500/20">
            <Zap className="w-3 h-3" />
            <span>System Design Track</span>
          </div>
        </div>

        {/* Screen Content Window Body */}
        <div className="p-5 sm:p-6 space-y-5 bg-slate-950">
          
          {/* AI Question Card */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="p-4 rounded-xl bg-slate-900/90 border border-zinc-800/80 space-y-2.5"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-orange-600 text-white flex items-center justify-center shadow-md shadow-orange-600/30">
                <Bot className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold text-slate-200">REPLICA AI Interviewer</span>
              <span className="text-[10px] text-zinc-500 font-mono ml-auto">00:42 elapsed</span>
            </div>
            <p className="text-sm font-medium text-zinc-200 leading-relaxed pl-8">
              "How would you design a distributed rate limiter that handles 500,000 requests per second with sub-millisecond latency?"
            </p>
          </motion.div>

          {/* Candidate Response Card (Live typing) */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/20 space-y-2.5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-zinc-800 text-slate-300 flex items-center justify-center">
                  <User className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold text-slate-200">Candidate Response</span>
              </div>
              <span className="text-[10px] font-mono text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                Live Recording
              </span>
            </div>

            <div className="pl-8 min-h-[56px]">
              <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                {typedText}
                <span className="inline-block w-1.5 h-4 bg-orange-500 ml-1 animate-pulse align-middle" />
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Screen Bar */}
        <div className="px-5 py-3 bg-slate-900/90 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400 font-medium">
          <div className="flex items-center gap-2 text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-xs font-semibold">Audio & Keystrokes Active</span>
          </div>
          <span className="text-[11px] font-mono text-zinc-500">248 characters typed</span>
        </div>
      </motion.div>

      {/* Floating AI Evaluation Widget Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="absolute -bottom-6 -right-2 sm:-right-6 bg-white p-4 rounded-2xl border border-zinc-200 shadow-2xl space-y-2.5 z-20 max-w-[240px]"
      >
        <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-orange-600" />
            <span className="text-xs font-bold text-slate-950">AI Evaluation</span>
          </div>
          <span className="text-xs font-extrabold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
            94% Score
          </span>
        </div>

        <div className="space-y-1.5 text-[11px]">
          <div className="flex justify-between font-semibold">
            <span className="text-slate-500">Clarity</span>
            <span className="text-slate-900">92%</span>
          </div>
          <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
            <div className="w-[92%] h-full bg-orange-600 rounded-full" />
          </div>

          <div className="flex justify-between font-semibold pt-1">
            <span className="text-slate-500">Technical Depth</span>
            <span className="text-slate-900">96%</span>
          </div>
          <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
            <div className="w-[96%] h-full bg-emerald-500 rounded-full" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
