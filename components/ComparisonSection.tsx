'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  X, 
  Check, 
  ArrowRight, 
  ShieldAlert, 
  ShieldCheck, 
  Brain, 
  MessageSquare, 
  HelpCircle, 
  Repeat, 
  Trophy,
  Zap
} from 'lucide-react';
import TechModal from './TechModal';
import { useSession } from '@/context/SessionContext';

interface ComparisonRow {
  dimension: string;
  icon: React.ElementType;
  unprepared: {
    title: string;
    description: string;
  };
  prepared: {
    title: string;
    description: string;
  };
}

const comparisonData: ComparisonRow[] = [
  {
    dimension: 'Mindset & Anxiety',
    icon: Brain,
    unprepared: {
      title: 'High Stress & Self-Doubt',
      description: 'Entering the room with racing thoughts, camera anxiety, and fear of the unknown.'
    },
    prepared: {
      title: 'Calm & Grounded Confidence',
      description: 'Walking in with relaxed muscle memory after repeated camera-free simulations.'
    }
  },
  {
    dimension: 'Answer Delivery',
    icon: MessageSquare,
    unprepared: {
      title: 'Rambling & Losing Focus',
      description: 'Getting lost in background details, using filler words, and missing the core point.'
    },
    prepared: {
      title: 'Structured STAR Framework',
      description: 'Delivering crisp, compelling stories with clear Situation, Action, and measurable Results.'
    }
  },
  {
    dimension: 'Handling Tough Questions',
    icon: HelpCircle,
    unprepared: {
      title: 'Freezing Under Pressure',
      description: 'Awkward pauses, panic when asked unexpected follow-ups or edge cases.'
    },
    prepared: {
      title: 'Poised & Adaptive',
      description: 'Conditioned to pause thoughtfully and structure answers even to surprise curveballs.'
    }
  },
  {
    dimension: 'Practice & Feedback',
    icon: Repeat,
    unprepared: {
      title: 'Burning Real Interviews as Trial Runs',
      description: 'Practicing on dream companies with zero feedback when you get rejected.'
    },
    prepared: {
      title: 'Safe Rehearsals with Instant AI Scoring',
      description: 'Private, unlimited practice rounds with immediate rubric scoring and coaching tips.'
    }
  },
  {
    dimension: 'Final Outcome',
    icon: Trophy,
    unprepared: {
      title: 'Left Wondering What Went Wrong',
      description: 'Weeks of agonizing silence or generic rejection emails with no actionable closure.'
    },
    prepared: {
      title: 'Knowing You Put Your Best Foot Forward',
      description: 'Leaving the interview knowing your answers were structured, clear, and high-impact.'
    }
  }
];

export default function ComparisonSection() {
  const [isTechModalOpen, setIsTechModalOpen] = useState(false);
  const { startInterview } = useSession();

  const handleTechConfirm = (tech: string[], diff: string) => {
    setIsTechModalOpen(false);
    startInterview('technical', { tech, diff });
  };

  return (
    <section className="relative w-full py-20 sm:py-28 bg-gradient-to-b from-white via-zinc-50/60 to-white border-b border-zinc-200/80">
      
      <TechModal
        isOpen={isTechModalOpen}
        onClose={() => setIsTechModalOpen(false)}
        onConfirm={handleTechConfirm}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 text-xs font-bold uppercase tracking-wider shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            <span>Preparedness Comparison</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-brand text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 leading-tight tracking-tight"
          >
            Attending Unprepared vs.{' '}
            <span className="brand-gradient-text">Attending with Replica</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed"
          >
            See how practicing in a private, camera-free AI environment transforms your confidence, structure, and performance.
          </motion.p>
        </div>

        {/* Clean Comparison Table / Matrix */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-3xl border border-zinc-200/90 shadow-[0_10px_40px_rgba(0,0,0,0.04)] overflow-hidden"
        >
          {/* Table Header */}
          <div className="grid grid-cols-1 md:grid-cols-12 border-b border-zinc-200 bg-zinc-50/70">
            <div className="md:col-span-4 p-5 sm:p-6 flex items-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Preparedness Area
              </span>
            </div>
            
            {/* Unprepared Header */}
            <div className="md:col-span-4 p-5 sm:p-6 bg-rose-50/50 border-t md:border-t-0 md:border-l border-zinc-200 flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-rose-950">Without Practice</h4>
                <p className="text-[11px] text-rose-700/80 font-medium">Hoping for the best</p>
              </div>
            </div>

            {/* With Replica Header */}
            <div className="md:col-span-4 p-5 sm:p-6 bg-orange-500/5 border-t md:border-t-0 md:border-l border-zinc-200 flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-lg bg-orange-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-orange-600/30">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-slate-950 flex items-center gap-1.5">
                  <span>With Replica AI</span>
                  <span className="text-[10px] bg-orange-600 text-white px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
                    Trained
                  </span>
                </h4>
                <p className="text-[11px] text-orange-700 font-medium">Total preparedness</p>
              </div>
            </div>
          </div>

          {/* Table Body Rows */}
          <div className="divide-y divide-zinc-200/80">
            {comparisonData.map((row, idx) => (
              <div
                key={row.dimension}
                className={`grid grid-cols-1 md:grid-cols-12 transition-colors hover:bg-zinc-50/50 ${
                  idx % 2 === 1 ? 'bg-zinc-50/20' : 'bg-white'
                }`}
              >
                {/* Left: Dimension / Stage */}
                <div className="md:col-span-4 p-5 sm:p-6 flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-zinc-100 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                    <row.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                      Stage 0{idx + 1}
                    </span>
                    <h5 className="text-sm sm:text-base font-extrabold text-slate-900">
                      {row.dimension}
                    </h5>
                  </div>
                </div>

                {/* Middle: Without Practice */}
                <div className="md:col-span-4 p-5 sm:p-6 md:border-l border-zinc-200/80 bg-rose-50/20 flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-3 h-3 stroke-[3]" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-rose-950">
                      {row.unprepared.title}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                      {row.unprepared.description}
                    </p>
                  </div>
                </div>

                {/* Right: With Replica */}
                <div className="md:col-span-4 p-5 sm:p-6 md:border-l border-zinc-200/80 bg-orange-500/[0.02] flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-slate-950">
                      {row.prepared.title}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                      {row.prepared.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Summary Bar */}
          <div className="p-6 sm:p-8 bg-zinc-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-10 h-10 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0 hidden sm:flex">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-extrabold text-white">
                  Experience the transformation for yourself
                </h4>
                <p className="text-xs sm:text-sm text-zinc-400 font-medium">
                  Try a camera-free practice simulation and get instant feedback in under 2 minutes.
                </p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsTechModalOpen(true)}
              className="px-7 py-3.5 bg-orange-600 text-white rounded-2xl font-extrabold text-sm sm:text-base shadow-xl shadow-orange-600/30 hover:bg-orange-500 transition-all flex items-center gap-2.5 shrink-0 cursor-pointer"
            >
              <span>Start Free Practice</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
