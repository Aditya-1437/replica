'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSession } from '@/context/SessionContext';
import { useUser } from '@/context/UserContext';
import { 
  CheckCircle2, 
  TrendingUp, 
  Zap, 
  Award, 
  ChevronRight, 
  Share2, 
  Home as HomeIcon,
  Plus,
  Minus
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ResultsDashboard() {
  const { results, resetSession } = useSession();
  const { user } = useUser();
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number | null>(null);

  if (!results) {
    return (
      <div className="min-h-screen bg-sage-bg flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-muted italic">Waiting for final evaluation results...</p>
        </div>
      </div>
    );
  }

  // Map real metrics
  const metrics = [
    { 
      label: 'Communication Clarity', 
      score: results.metrics?.clarity || 0, 
      icon: CheckCircle2, 
      subtext: (results.metrics?.clarity || 0) > 80 ? 'Very articulate responses' : 'Keep practicing clarity' 
    },
    { 
      label: 'Answer Confidence', 
      score: results.metrics?.confidence || 0, 
      icon: Zap, 
      subtext: (results.metrics?.confidence || 0) > 80 ? 'High assertiveness detected' : 'Work on voice confidence' 
    },
    { 
      label: 'Technical Accuracy', 
      score: results.metrics?.technical || 0, 
      icon: Award, 
      subtext: (results.metrics?.technical || 0) > 80 ? 'Strong foundational knowledge' : 'Review core concepts' 
    }
  ];

  const safeStrengths = results.feedback?.strengths || [];
  const safeGrowthAreas = results.feedback?.growthAreas || [];
  const safeDetailedReview = results.detailedReview || [];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-sage-bg pt-20 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">
            Great work, {user?.name.split(' ')[0]}.
          </h1>
          <p className="text-slate-muted text-lg">Here is your comprehensive performance breakdown.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Main Score Gauge */}
          <motion.div 
            variants={item}
            initial="hidden"
            animate="show"
            className="lg:col-span-1 bg-white rounded-[2.5rem] p-10 flex flex-col items-center justify-center shadow-xl shadow-slate-200/50 border border-white"
          >
            <div className="relative w-48 h-48 mb-6">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  className="text-gray-100 stroke-current"
                  strokeWidth="8"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                />
                <motion.circle
                  className="text-sage-accent stroke-current"
                  strokeWidth="8"
                  strokeLinecap="round"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                  initial={{ strokeDasharray: "0 251.2" }}
                  animate={{ strokeDasharray: `${((results.overallScore || 0) / 100) * 251.2} 251.2` }}
                  transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-serif font-bold text-slate-900">{results.overallScore || 0}</span>
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Score</span>
              </div>
            </div>
            <p className="text-center font-medium text-slate-700">
              {(results.overallScore || 0) >= 90 ? 'Exceptional' : (results.overallScore || 0) >= 80 ? 'Excellent' : 'Good Progress'}
            </p>
            <p className="text-center text-xs text-slate-400 mt-2 uppercase tracking-widest font-bold">
              Powered by Gemini 1.5 Pro
            </p>
          </motion.div>

          {/* Metrics Grid */}
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {metrics.map((metric, idx) => (
              <motion.div 
                key={metric.label}
                variants={item}
                className="bg-white rounded-3xl p-6 shadow-sm border border-white flex flex-col justify-between"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-xl bg-sage-accent/5 flex items-center justify-center text-sage-accent">
                    <metric.icon className="w-5 h-5" />
                  </div>
                  <span className="text-2xl font-bold text-slate-800">{metric.score}%</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{metric.label}</h3>
                  <p className="text-xs text-slate-400 font-medium">{metric.subtext}</p>
                </div>
                <div className="mt-4 h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.score}%` }}
                    transition={{ duration: 1, delay: 1 + idx * 0.1 }}
                    className="h-full bg-sage-accent/40"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Strengths & Growth Areas */}
        <motion.div 
          variants={item}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-white">
            <h3 className="text-xl font-serif font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5 text-sage-accent" />
              Key Strengths
            </h3>
            <ul className="space-y-4">
              {safeStrengths.map((s, i) => (
                <li key={i} className="flex gap-3 text-slate-600">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sage-accent shrink-0" />
                  <span className="text-sm font-medium">{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-white">
            <h3 className="text-xl font-serif font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Minus className="w-5 h-5 text-slate-muted" />
              Growth Areas
            </h3>
            <ul className="space-y-4">
              {safeGrowthAreas.map((g, i) => (
                <li key={i} className="flex gap-3 text-slate-600">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
                  <span className="text-sm font-medium">{g}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Detailed Question Review */}
        <motion.div 
          variants={item}
          initial="hidden"
          animate="show"
          className="space-y-4 mb-20"
        >
          <h3 className="text-2xl font-serif font-bold text-slate-900 px-2">Detailed Question Review</h3>
          {safeDetailedReview.map((review, i) => (
            <motion.div 
              key={i}
              className="bg-white rounded-2xl overflow-hidden border border-white shadow-sm"
            >
              <button 
                onClick={() => setSelectedQuestionIndex(selectedQuestionIndex === i ? null : i)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold text-slate-500">
                    {i + 1}
                  </span>
                  <span className="font-semibold text-slate-800 line-clamp-1">{review.question}</span>
                </div>
                <ChevronRight className={cn(
                  "w-5 h-5 text-slate-300 transition-transform duration-300",
                  selectedQuestionIndex === i ? "rotate-90" : ""
                )} />
              </button>

              {selectedQuestionIndex === i && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="px-6 pb-8 space-y-6 pt-2"
                >
                  <div className="bg-gray-50 p-5 rounded-2xl">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Your Answer</h4>
                    <p className="text-slate-700 leading-relaxed italic">{review.userAnswer || "No response provided."}</p>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-gray-100">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Expected Direction</h4>
                    <p className="text-slate-700 leading-relaxed">{review.expectedAnswer}</p>
                  </div>
                  <div className="bg-sage-accent/5 p-5 rounded-2xl border border-sage-accent/10">
                    <h4 className="text-xs font-bold text-sage-accent uppercase tracking-widest mb-3">AI Feedback</h4>
                    <p className="text-slate-700 leading-relaxed font-medium">{review.specificFeedback}</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Footer CTAs */}
        <div className="flex items-center justify-center gap-4">
          <button 
            onClick={resetSession}
            className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center gap-3 hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10"
          >
            <HomeIcon className="w-5 h-5" />
            Back to Home
          </button>
          <button className="px-8 py-4 bg-white text-slate-700 border border-gray-200 rounded-2xl font-bold flex items-center gap-3 hover:border-gray-300 transition-all">
            <Share2 className="w-5 h-5" />
            Share Results
          </button>
        </div>
      </div>
    </div>
  );
}
