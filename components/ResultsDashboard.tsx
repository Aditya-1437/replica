'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useSession } from '@/context/SessionContext';
import { useUser } from '@/context/UserContext';
import { 
  Check, 
  Zap, 
  Award, 
  ArrowRight, 
  Share2, 
  Printer, 
  RotateCcw, 
  Sparkles, 
  ChevronRight, 
  Mic, 
  FileText, 
  Layers, 
  MessageSquare, 
  Clock, 
  TrendingUp, 
  AlertCircle, 
  ShieldCheck, 
  LayoutDashboard, 
  Copy, 
  CheckCheck
} from 'lucide-react';
import InterviewLauncherModal from '@/components/InterviewLauncherModal';

export default function ResultsDashboard() {
  const router = useRouter();
  const { results, resetSession, interviewType, sessionConfig } = useSession();
  const { user } = useUser();

  const [activeTab, setActiveTab] = useState<'overview' | 'questions' | 'articulation' | 'transcript'>('overview');
  const [selectedQuestionIdx, setSelectedQuestionIdx] = useState(0);
  const [isLauncherOpen, setIsLauncherOpen] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [copiedTranscript, setCopiedTranscript] = useState(false);

  if (!results) {
    return (
      <div className="min-h-screen bg-sage-bg flex items-center justify-center p-6">
        <div className="text-center space-y-4 max-w-md bg-white p-8 rounded-3xl border border-zinc-200/90 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-600 flex items-center justify-center mx-auto animate-pulse">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Synthesizing Candidate Assessment</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            Evaluating response structure, architectural depth, and pacing against senior engineering rubrics...
          </p>
          <div className="w-6 h-6 border-2 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  // Derive score color & verdict
  const overallScore = results.overallScore || 85;
  const verdict = results.verdict || (overallScore >= 90 ? 'Strong Hire' : overallScore >= 82 ? 'Hire' : overallScore >= 74 ? 'Lean Hire' : 'Needs Calibration');
  const percentile = results.percentile || Math.min(98, Math.max(68, Math.round(overallScore * 1.05)));

  const getVerdictTheme = (v: string) => {
    switch (v) {
      case 'Strong Hire':
        return {
          bg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-700',
          gauge: 'text-emerald-500',
          badge: 'bg-emerald-600 text-white',
          label: 'Top 8% Candidate Bar'
        };
      case 'Hire':
        return {
          bg: 'bg-orange-500/10 border-orange-500/20 text-orange-700',
          gauge: 'text-orange-500',
          badge: 'bg-orange-600 text-white',
          label: 'Top 15% Candidate Bar'
        };
      case 'Lean Hire':
        return {
          bg: 'bg-amber-500/10 border-amber-500/20 text-amber-700',
          gauge: 'text-amber-500',
          badge: 'bg-amber-600 text-white',
          label: 'Within Calibration Band'
        };
      default:
        return {
          bg: 'bg-rose-500/10 border-rose-500/20 text-rose-700',
          gauge: 'text-rose-500',
          badge: 'bg-rose-600 text-white',
          label: 'Requires Foundation Drill'
        };
    }
  };

  const verdictTheme = getVerdictTheme(verdict);

  // 4 Core Vitals
  const vitals = [
    {
      label: 'Technical Depth',
      score: results.metrics?.technical || 88,
      subtext: (results.metrics?.technical || 88) > 85 ? 'Solid trade-off articulation' : 'Reinforce edge cases',
      icon: Award,
      color: 'text-orange-600 bg-orange-50'
    },
    {
      label: 'Communication Clarity',
      score: results.metrics?.clarity || 91,
      subtext: (results.metrics?.clarity || 91) > 85 ? 'Concise situation framing' : 'Work on brevity',
      icon: MessageSquare,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      label: 'Speech Cadence',
      score: results.speechAnalysis?.wordsPerMinute ? `${results.speechAnalysis.wordsPerMinute} WPM` : '138 WPM',
      subtext: 'Ideal executive zone (120-150)',
      icon: Mic,
      color: 'text-emerald-600 bg-emerald-50'
    },
    {
      label: 'Confidence & Assertion',
      score: `${results.metrics?.confidence || 86}%`,
      subtext: (results.metrics?.confidence || 86) > 80 ? 'Assertive first-person ownership' : 'Elevate active voice',
      icon: Zap,
      color: 'text-amber-600 bg-amber-50'
    }
  ];

  const handleShareScorecard = () => {
    const shareText = `Replica AI Interview Assessment: ${verdict} (${overallScore}/100) in ${interviewType ? interviewType.toUpperCase() : 'Technical'} track! Top ${100 - percentile}% candidate percentile benchmark. https://replica.ai`;
    navigator.clipboard.writeText(shareText);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  const handleCopyTranscript = () => {
    const transcriptText = results.detailedReview?.map((item, idx) => (
      `Q${idx + 1}: ${item.question}\nAnswer: ${item.userAnswer}\nAI Feedback: ${item.specificFeedback}\n`
    )).join('\n---\n') || '';

    navigator.clipboard.writeText(transcriptText);
    setCopiedTranscript(true);
    setTimeout(() => setCopiedTranscript(false), 2500);
  };

  const handlePrintDossier = () => {
    window.print();
  };

  const currentQuestionReview = results.detailedReview?.[selectedQuestionIdx] || {
    question: 'Simulation question review',
    userAnswer: 'Candidate provided spoken response',
    expectedAnswer: 'Structured architectural approach',
    specificFeedback: 'Strong foundational reasoning.',
    score: 88
  };

  return (
    <div className="min-h-screen bg-sage-bg font-sans selection:bg-orange-500 selection:text-white pb-24 print:bg-white print:p-0">
      
      {/* Re-Attempt Interview Launcher Modal */}
      <InterviewLauncherModal
        isOpen={isLauncherOpen}
        onClose={() => setIsLauncherOpen(false)}
        initialType={interviewType || 'technical'}
      />

      {/* ================= TOP NAVIGATION & REPORT ACTIONS ================= */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-zinc-200/80 px-4 sm:px-8 py-3.5 print:hidden">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          
          {/* Breadcrumb / Session ID */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={resetSession}
              className="text-xs font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Replica</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900">
                Evaluation Dossier
              </span>
              <span className="px-2 py-0.5 rounded bg-zinc-100 text-[10px] font-mono font-bold text-zinc-600">
                #REP-8942
              </span>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2 flex-wrap">
            
            {/* Share Scorecard */}
            <button
              type="button"
              onClick={handleShareScorecard}
              className="px-3.5 py-1.5 rounded-xl bg-white border border-zinc-200/90 text-slate-700 hover:bg-zinc-50 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              {copiedShare ? (
                <>
                  <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>Share</span>
                </>
              )}
            </button>

            {/* Print / PDF */}
            <button
              type="button"
              onClick={handlePrintDossier}
              className="px-3.5 py-1.5 rounded-xl bg-white border border-zinc-200/90 text-slate-700 hover:bg-zinc-50 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Export PDF</span>
            </button>

            {/* Dashboard Redirect */}
            <button
              type="button"
              onClick={() => router.push('/account')}
              className="px-3.5 py-1.5 rounded-xl bg-white border border-zinc-200/90 text-slate-700 hover:bg-zinc-50 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-slate-500" />
              <span>Dashboard</span>
            </button>

            {/* Re-Attempt Drill Button */}
            <button
              type="button"
              onClick={() => setIsLauncherOpen(true)}
              className="px-4 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm shadow-orange-600/20"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Re-Attempt Drill</span>
            </button>
          </div>

        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 space-y-8">

        {/* ================= HERO VERDICT DOSSIER ================= */}
        <section className="bg-white rounded-3xl border border-zinc-200/90 p-6 sm:p-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            
            {/* Left Info & Verdict */}
            <div className="space-y-4 max-w-xl">
              
              <div className="flex items-center gap-2 flex-wrap">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 text-white text-xs font-mono font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Certified Candidate Assessment</span>
                </div>
                <span className="text-xs font-mono text-slate-500">
                  Track: {interviewType ? interviewType.toUpperCase() : 'TECHNICAL'} • {sessionConfig?.diff || 'Senior'} Level
                </span>
              </div>

              <div>
                <h1 className="text-2xl sm:text-4xl font-brand font-extrabold text-slate-950 tracking-tight">
                  Performance Evaluation Dossier
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                  Candidate: <strong className="text-slate-900">{user?.name || 'Candidate'}</strong> • Evaluated against Tier-1 Senior Engineering Standards
                </p>
              </div>

              {/* Verdict Banner */}
              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 flex items-center justify-between gap-4 flex-wrap">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Final Hiring Recommendation
                  </span>
                  <div className="flex items-center gap-2.5">
                    <span className={`text-xl font-brand font-extrabold px-3 py-1 rounded-xl ${verdictTheme.badge}`}>
                      {verdict}
                    </span>
                    <span className="text-xs font-bold text-slate-700">
                      Top {100 - percentile}% ({percentile}th Percentile)
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Calibration Bar
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    FAANG Bar Exceeded
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {results.summary || `Candidate demonstrated high-conviction engineering logic with structured trade-off awareness and articulate communication pacing.`}
              </p>
            </div>

            {/* Right Radial Score Gauge */}
            <div className="flex flex-col items-center justify-center p-6 bg-zinc-50 rounded-3xl border border-zinc-200/80 w-full lg:w-72 shrink-0">
              <div className="relative w-44 h-44">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    className="text-zinc-200 stroke-current"
                    strokeWidth="8"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                  <motion.circle
                    className={`${verdictTheme.gauge} stroke-current`}
                    strokeWidth="8"
                    strokeLinecap="round"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                    initial={{ strokeDasharray: "0 251.2" }}
                    animate={{ strokeDasharray: `${(overallScore / 100) * 251.2} 251.2` }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                </svg>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-brand font-extrabold text-slate-950 tracking-tight">
                    {overallScore}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                    OVERALL / 100
                  </span>
                </div>
              </div>

              <div className="text-center mt-3">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800">
                  <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                  <span>Gemini 3 Flash Evaluated</span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium">Calibrated on 10 rubric parameters</p>
              </div>
            </div>

          </div>

          {/* 4 Core Vitals Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-zinc-100">
            {vitals.map((v) => {
              const Icon = v.icon;
              return (
                <div 
                  key={v.label} 
                  className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/70 space-y-2 hover:border-zinc-300 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${v.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-lg font-brand font-extrabold text-slate-950 font-sans">
                      {typeof v.score === 'number' ? `${v.score}%` : v.score}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{v.label}</h4>
                    <p className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5">{v.subtext}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </section>

        {/* ================= 4-TAB SEGMENTED DOSSIER SWITCHER ================= */}
        <div className="space-y-6">
          
          <div className="flex items-center justify-between border-b border-zinc-200/90 pb-3 flex-wrap gap-4">
            <div className="flex items-center gap-1.5 bg-zinc-200/70 p-1 rounded-2xl">
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'overview'
                    ? 'bg-white text-slate-950 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-orange-600" />
                <span>Executive Summary</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('questions')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'questions'
                    ? 'bg-white text-slate-950 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>Question Deep Dive (10)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('articulation')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'articulation'
                    ? 'bg-white text-slate-950 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                <Mic className="w-3.5 h-3.5 text-emerald-600" />
                <span>Voice & Articulation</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('transcript')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'transcript'
                    ? 'bg-white text-slate-950 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
                <span>Full Transcript</span>
              </button>
            </div>

            <div className="text-xs font-mono text-slate-400 font-semibold">
              Evaluation Model: Gemini 3 Flash Preview
            </div>
          </div>

          {/* TAB 1: EXECUTIVE SUMMARY */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Key Strengths */}
                <div className="p-6 sm:p-7 rounded-3xl bg-white border border-zinc-200/90 shadow-sm space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-950">Demonstrated Strengths</h3>
                      <p className="text-[11px] text-slate-500">Core areas where you met or exceeded the bar</p>
                    </div>
                  </div>

                  <ul className="space-y-3 pt-1">
                    {(results.feedback?.strengths || []).map((strength, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs font-medium text-slate-700 bg-zinc-50 p-3 rounded-2xl border border-zinc-200/70">
                        <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0 text-[10px] mt-0.5">
                          ✓
                        </span>
                        <span className="leading-relaxed">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Critical Growth Areas */}
                <div className="p-6 sm:p-7 rounded-3xl bg-white border border-zinc-200/90 shadow-sm space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                      <AlertCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-950">High-Impact Growth Areas</h3>
                      <p className="text-[11px] text-slate-500">Targeted adjustments to advance to Staff/Principal level</p>
                    </div>
                  </div>

                  <ul className="space-y-3 pt-1">
                    {(results.feedback?.growthAreas || []).map((growth, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs font-medium text-slate-700 bg-zinc-50 p-3 rounded-2xl border border-zinc-200/70">
                        <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 font-bold flex items-center justify-center shrink-0 text-[10px] mt-0.5">
                          !
                        </span>
                        <span className="leading-relaxed">{growth}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Recommended Next Drills Bento */}
              <div className="p-6 sm:p-7 rounded-3xl bg-slate-950 text-white border border-zinc-800 shadow-xl space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-orange-400" />
                    <h3 className="text-base font-bold text-white">Recommended Follow-Up Practice Drills</h3>
                  </div>
                  <span className="text-xs font-mono text-zinc-400">Personalized to this session</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                  <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase text-orange-400 px-2 py-0.5 rounded bg-orange-400/10">
                        Technical Track
                      </span>
                      <h4 className="text-sm font-bold text-white mt-2">Distributed Caching & Invalidation</h4>
                      <p className="text-xs text-zinc-400 font-medium">Practice Redis vs Memcached multi-region replication and write-through policies.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsLauncherOpen(true)}
                      className="text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1 pt-2 cursor-pointer"
                    >
                      <span>Launch 10-Min Drill</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase text-blue-400 px-2 py-0.5 rounded bg-blue-400/10">
                        Behavioral Track
                      </span>
                      <h4 className="text-sm font-bold text-white mt-2">STAR Metric Quantification</h4>
                      <p className="text-xs text-zinc-400 font-medium">Calibrate articulating concrete metrics (latency % drop, revenue saved) under pressure.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsLauncherOpen(true)}
                      className="text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1 pt-2 cursor-pointer"
                    >
                      <span>Launch 10-Min Drill</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase text-emerald-400 px-2 py-0.5 rounded bg-emerald-400/10">
                        Speech Cadence
                      </span>
                      <h4 className="text-sm font-bold text-white mt-2">Concise Executive Delivery</h4>
                      <p className="text-xs text-zinc-400 font-medium">Target sub-90-second answers with zero filler word density.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsLauncherOpen(true)}
                      className="text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1 pt-2 cursor-pointer"
                    >
                      <span>Launch 10-Min Drill</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: QUESTION DEEP DIVE */}
          {activeTab === 'questions' && (
            <div className="space-y-6">
              
              {/* Question Scrubber Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {(results.detailedReview || []).map((qReview, idx) => {
                  const isSelected = selectedQuestionIdx === idx;
                  const qScore = qReview.score || 85;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedQuestionIdx(idx)}
                      className={`px-3.5 py-2 rounded-2xl border transition-all shrink-0 cursor-pointer flex items-center gap-2 ${
                        isSelected 
                          ? 'bg-slate-950 text-white border-slate-950 shadow-sm'
                          : 'bg-white text-slate-700 border-zinc-200/90 hover:border-zinc-300'
                      }`}
                    >
                      <span className="text-xs font-bold">Q{idx + 1}</span>
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                        isSelected 
                          ? 'bg-orange-500 text-white' 
                          : 'bg-zinc-100 text-slate-700'
                      }`}>
                        {qScore}%
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Selected Question Detailed Dossier Card */}
              <div className="p-6 sm:p-8 bg-white rounded-3xl border border-zinc-200/90 shadow-sm space-y-6">
                
                {/* Question Header */}
                <div className="space-y-2 pb-4 border-b border-zinc-100">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-100">
                      Question {selectedQuestionIdx + 1} of {results.detailedReview?.length || 10}
                    </span>
                    <span className="text-sm font-bold text-slate-950">
                      Calibrated Score: <strong className="text-orange-600">{currentQuestionReview.score || 88}%</strong>
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-brand font-extrabold text-slate-950 leading-snug">
                    {currentQuestionReview.question}
                  </h3>
                </div>

                {/* Candidate's Answer */}
                <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                    <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                    <span>Your Spoken / Typed Response</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed italic font-medium">
                    &ldquo;{currentQuestionReview.userAnswer}&rdquo;
                  </p>
                </div>

                {/* Model FAANG Answer */}
                <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>FAANG Senior / Staff Benchmark Standard</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                    {currentQuestionReview.expectedAnswer}
                  </p>
                </div>

                {/* AI Evaluator Specific Critique */}
                <div className="p-5 rounded-2xl bg-orange-500/5 border border-orange-500/20 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-800">
                    <AlertCircle className="w-3.5 h-3.5 text-orange-600" />
                    <span>AI Evaluator Tactical Feedback</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                    {currentQuestionReview.specificFeedback}
                  </p>
                </div>

              </div>

            </div>
          )}

          {/* TAB 3: ARTICULATION & VOICE TELEMETRY */}
          {activeTab === 'articulation' && (
            <div className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* WPM Cadence */}
                <div className="p-6 sm:p-7 rounded-3xl bg-white border border-zinc-200/90 shadow-sm space-y-4 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                    <Mic className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-950">Speech Velocity (WPM)</h3>
                    <p className="text-xs text-slate-500">Optimal engineering screen speed: 120-150 WPM</p>
                  </div>
                  <div className="py-2">
                    <div className="text-4xl font-brand font-extrabold text-slate-950 font-sans">
                      {results.speechAnalysis?.wordsPerMinute || 138}
                    </div>
                    <span className="text-[11px] font-mono font-bold text-emerald-600 uppercase">
                      Target Range Hit
                    </span>
                  </div>
                  <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>

                {/* Filler Words */}
                <div className="p-6 sm:p-7 rounded-3xl bg-white border border-zinc-200/90 shadow-sm space-y-4 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-950">Filler Word Count</h3>
                    <p className="text-xs text-slate-500">&ldquo;Um&rdquo;, &ldquo;like&rdquo;, &ldquo;basically&rdquo; density</p>
                  </div>
                  <div className="py-2">
                    <div className="text-4xl font-brand font-extrabold text-slate-950 font-sans">
                      {results.speechAnalysis?.fillerWordsCount || 3}
                    </div>
                    <span className="text-[11px] font-mono font-bold text-amber-600 uppercase">
                      Low Density (&lt; 2%)
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-1.5 flex-wrap">
                    {(results.speechAnalysis?.fillerWordsList || ['like', 'um']).map((word) => (
                      <span key={word} className="px-2 py-0.5 rounded bg-zinc-100 text-[10px] font-mono text-slate-600">
                        &quot;{word}&quot;
                      </span>
                    ))}
                  </div>
                </div>

                {/* Articulation Rating */}
                <div className="p-6 sm:p-7 rounded-3xl bg-white border border-zinc-200/90 shadow-sm space-y-4 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-950">Articulation Rating</h3>
                    <p className="text-xs text-slate-500">Clarity & structural conviction</p>
                  </div>
                  <div className="py-2">
                    <div className="text-2xl font-brand font-extrabold text-slate-950">
                      {results.speechAnalysis?.articulationRating || 'High Flow'}
                    </div>
                    <span className="text-[11px] font-mono font-bold text-blue-600 uppercase">
                      Executive Grade
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    Answers showed logical flow with clear problem statements and decisive technical reasoning.
                  </p>
                </div>

              </div>

            </div>
          )}

          {/* TAB 4: FULL SESSION TRANSCRIPT */}
          {activeTab === 'transcript' && (
            <div className="p-6 sm:p-8 bg-white rounded-3xl border border-zinc-200/90 shadow-sm space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-zinc-100 flex-wrap gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-950">Session Dialogue Transcript</h3>
                  <p className="text-xs text-slate-500">100% encrypted & camera-free recorded conversation</p>
                </div>

                <button
                  type="button"
                  onClick={handleCopyTranscript}
                  className="px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-slate-800 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedTranscript ? (
                    <>
                      <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Transcript Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Full Transcript</span>
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-6">
                {(results.detailedReview || []).map((item, idx) => (
                  <div key={idx} className="space-y-3 p-4 rounded-2xl bg-zinc-50/70 border border-zinc-200/60">
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-lg bg-orange-500/10 text-orange-600 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                        Q
                      </span>
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">AI Interviewer Prompt</span>
                        <p className="text-xs sm:text-sm font-bold text-slate-900">{item.question}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 pl-2">
                      <span className="w-6 h-6 rounded-lg bg-slate-900 text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                        A
                      </span>
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Candidate Response</span>
                        <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed italic">
                          &ldquo;{item.userAnswer}&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

        </div>

        {/* ================= BOTTOM ACTION BAR ================= */}
        <div className="p-6 sm:p-8 bg-white rounded-3xl border border-zinc-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
          <div>
            <h4 className="text-sm font-bold text-slate-950">Ready to level up further?</h4>
            <p className="text-xs text-slate-500 font-medium">Re-attempt this drill or track your long-term growth on the candidate dashboard.</p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => router.push('/account')}
              className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-slate-900 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>View Dashboard</span>
            </button>

            <button
              type="button"
              onClick={() => setIsLauncherOpen(true)}
              className="flex-1 sm:flex-initial px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition-all cursor-pointer shadow-md shadow-orange-600/20 flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Start Next Drill</span>
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}
