'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@/context/UserContext';
import type { InterviewType } from '@/context/SessionContext';
import { 
  BarChart3, 
  Clock, 
  Settings, 
  TrendingUp, 
  Zap, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Flame, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  Target, 
  Terminal, 
  Briefcase, 
  Save, 
  ShieldCheck, 
  Play,
  Award
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InterviewLauncherModal from '@/components/InterviewLauncherModal';

// Clean practice history records
interface DrillRecord {
  id: string;
  date: string;
  track: 'technical' | 'behavioral' | 'hr';
  trackLabel: string;
  topic: string;
  difficulty: string;
  duration: string;
  score: number;
  strengths: string[];
  growthAreas: string[];
  questionsCount: number;
}

const MOCK_DRILL_HISTORY: DrillRecord[] = [
  {
    id: "DRL-8942",
    date: "Today, 10:30 AM",
    track: "technical",
    trackLabel: "System Design",
    difficulty: "Senior (L5)",
    topic: "Distributed Rate Limiter & Token Bucket Cache",
    duration: "18 mins",
    score: 92,
    strengths: [
      "Explicitly articulated token bucket refill math under high concurrency",
      "Proactively brought up Redis Cluster failover and multi-region read replicas"
    ],
    growthAreas: [
      "Could have quantified memory footprint for 100M daily active users earlier"
    ],
    questionsCount: 4
  },
  {
    id: "DRL-8910",
    date: "Yesterday, 4:15 PM",
    track: "behavioral",
    trackLabel: "STAR Behavioral",
    difficulty: "Senior (L5)",
    topic: "Cross-Functional Conflict with Product Leadership",
    duration: "14 mins",
    score: 86,
    strengths: [
      "Strong Task and Action breakdown illustrating empathetic consensus building",
      "Clear articulation of customer retention impact"
    ],
    growthAreas: [
      "Add explicit business revenue or latency reduction numbers in the Result phase"
    ],
    questionsCount: 3
  },
  {
    id: "DRL-8794",
    date: "3 days ago",
    track: "technical",
    trackLabel: "Algorithms",
    difficulty: "Senior (L5)",
    topic: "LRU Cache & Thread-Safe Concurrency Locking",
    duration: "22 mins",
    score: 88,
    strengths: [
      "Flawless O(1) time complexity explanation with Doubly Linked List & Hash Map",
      "Probed boundary edge cases around mutex lock granularity"
    ],
    growthAreas: [
      "Explain read-write lock granularity before implementing internal sync"
    ],
    questionsCount: 4
  },
  {
    id: "DRL-8650",
    date: "1 week ago",
    track: "hr",
    trackLabel: "HR & Culture",
    difficulty: "Senior (L5)",
    topic: "Executive Recruiter Screen & Career Ambition Narrative",
    duration: "15 mins",
    score: 94,
    strengths: [
      "Articulate, compelling career narrative with high executive presence",
      "Deep alignment with high-autonomy distributed engineering culture"
    ],
    growthAreas: [
      "Be more explicit regarding target team scope and mentorship responsibilities"
    ],
    questionsCount: 4
  },
  {
    id: "DRL-8420",
    date: "2 weeks ago",
    track: "behavioral",
    trackLabel: "Leadership",
    difficulty: "Staff (L6)",
    topic: "Navigating High-Stakes Production Incident Under Pressure",
    duration: "16 mins",
    score: 85,
    strengths: [
      "Calm, structured incident triage and blameless post-mortem framework"
    ],
    growthAreas: [
      "Mention skip-level communication protocols to keep executive stakeholders informed"
    ],
    questionsCount: 3
  }
];

const SKILL_COMPETENCIES = [
  { name: "System Architecture & Scale", score: 92, level: "Senior / Staff", category: "Technical" },
  { name: "STAR Method Behavioral Framing", score: 88, level: "Senior (L5)", category: "Behavioral" },
  { name: "Concurrency & Async Execution", score: 85, level: "Mid / Senior", category: "Technical" },
  { name: "Communication Clarity & Pacing", score: 94, level: "Executive Polish", category: "Delivery" }
];

const AI_COACHING_INSIGHTS = [
  {
    id: "c1",
    tag: "STAR Storytelling",
    title: "Quantify Business Impact in the Result Stage",
    description: "Your Situation and Action steps are crisp, but interviewers look for concrete metrics (e.g., 'reduced latency by 42%', 'saved $180k/yr in AWS costs').",
    suggestedTrack: "behavioral" as InterviewType,
    actionText: "Practice STAR Drill"
  },
  {
    id: "c2",
    tag: "Distributed Systems",
    title: "Deepen Redis Cluster & Failover Edge Cases",
    description: "When discussing distributed rate limiters, proactively address cluster network partitions, split-brain scenarios, and local in-memory fallbacks.",
    suggestedTrack: "technical" as InterviewType,
    actionText: "Practice System Design"
  },
  {
    id: "c3",
    tag: "Delivery & Pacing",
    title: "Maintain Structured Pauses During Architecture Probing",
    description: "You excel when taking a 5-second silence to sketch requirements before answering. Continue holding that calm executive cadence.",
    suggestedTrack: "hr" as InterviewType,
    actionText: "Practice Executive Screen"
  }
];

const WEEKLY_ACTIVITY = [
  { day: "Mon", minutes: 35, active: true },
  { day: "Tue", minutes: 20, active: true },
  { day: "Wed", minutes: 45, active: true },
  { day: "Thu", minutes: 15, active: true },
  { day: "Fri", minutes: 0, active: false },
  { day: "Sat", minutes: 30, active: true },
  { day: "Sun", minutes: 25, active: true }
];

export default function AccountContent() {
  const { user, updateUser } = useUser();
  const [activeTab, setActiveTab] = useState<'overview' | 'logs' | 'settings'>('overview');
  
  // Launcher modal state
  const [isLauncherOpen, setIsLauncherOpen] = useState(false);
  const [launcherTrack, setLauncherTrack] = useState<InterviewType>('technical');

  // Logs filter & search state
  const [logSearch, setLogSearch] = useState('');
  const [selectedTrackFilter, setSelectedTrackFilter] = useState<'all' | 'technical' | 'behavioral' | 'hr'>('all');
  const [expandedLogId, setExpandedLogId] = useState<string | null>('DRL-8942');

  // Settings form draft overrides (derived from user)
  const [formDraft, setFormDraft] = useState<{
    name?: string;
    email?: string;
    role?: string;
    techStack?: string;
    seniority?: string;
    targetCompanies?: string;
    defaultDifficulty?: string;
    notificationsEmail?: boolean;
    noiseSuppression?: boolean;
  }>({});

  const formValues = {
    name: formDraft.name ?? user?.name ?? 'Candidate',
    email: formDraft.email ?? user?.email ?? '',
    role: formDraft.role ?? user?.role ?? 'Senior Software Engineer',
    techStack: formDraft.techStack ?? user?.techStack ?? 'Full Stack & System Design',
    seniority: formDraft.seniority ?? user?.seniority ?? 'Senior (L5 / Staff)',
    targetCompanies: formDraft.targetCompanies ?? user?.targetCompanies ?? 'Google, Stripe, Meta, OpenAI',
    defaultDifficulty: formDraft.defaultDifficulty ?? user?.defaultDifficulty ?? 'Senior',
    notificationsEmail: formDraft.notificationsEmail ?? user?.notificationsEmail ?? true,
    noiseSuppression: formDraft.noiseSuppression ?? user?.noiseSuppression ?? true
  };

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLaunchSimulation = (track: InterviewType = 'technical') => {
    setLauncherTrack(track);
    setIsLauncherOpen(true);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(formValues);
    showToast("Profile & simulation preferences saved successfully!");
  };

  // Filtered logs
  const filteredLogs = useMemo(() => {
    return MOCK_DRILL_HISTORY.filter(drill => {
      if (selectedTrackFilter !== 'all' && drill.track !== selectedTrackFilter) return false;
      if (logSearch.trim()) {
        const query = logSearch.toLowerCase();
        const matchesTopic = drill.topic.toLowerCase().includes(query);
        const matchesId = drill.id.toLowerCase().includes(query);
        const matchesTrack = drill.trackLabel.toLowerCase().includes(query);
        if (!matchesTopic && !matchesId && !matchesTrack) return false;
      }
      return true;
    });
  }, [selectedTrackFilter, logSearch]);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 font-sans">
      <Navbar />

      <InterviewLauncherModal
        isOpen={isLauncherOpen}
        onClose={() => setIsLauncherOpen(false)}
        initialType={launcherTrack}
      />

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 bg-slate-950 text-white px-5 py-3 rounded-2xl shadow-xl border border-zinc-800 flex items-center gap-2.5 text-xs font-semibold"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 space-y-8">
        
        {/* ================= HERO CANDIDATE DOSSIER ================= */}
        <section className="p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200/90 shadow-sm relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            
            {/* Candidate Identity */}
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-slate-950 text-white flex items-center justify-center text-2xl font-extrabold font-brand shadow-md border border-zinc-800 shrink-0">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'C'}
              </div>

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-2xl sm:text-3xl font-brand font-extrabold text-slate-950 tracking-tight">
                    {user?.name || 'Candidate Workspace'}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-600 border border-orange-500/20 text-xs font-bold font-mono">
                    Ascent Pro
                  </span>
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 border border-amber-500/20 text-xs font-bold font-mono">
                    <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                    <span>{user?.streakDays || 4} Day Streak</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm font-medium text-slate-600 flex flex-wrap items-center gap-2">
                  <span>{user?.role || 'Senior Software Engineer'}</span>
                  <span>•</span>
                  <span className="text-orange-600 font-semibold">{user?.techStack || 'Full Stack & System Design'}</span>
                </p>

                {user?.targetCompanies && (
                  <div className="flex items-center gap-1.5 pt-0.5 text-xs text-zinc-500">
                    <Target className="w-3.5 h-3.5 text-slate-400" />
                    <span>Targeting: <strong className="text-slate-800">{user.targetCompanies}</strong></span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleLaunchSimulation('technical')}
                className="flex-1 sm:flex-initial px-6 py-3.5 bg-orange-600 hover:bg-orange-500 text-white rounded-2xl font-bold text-sm shadow-lg shadow-orange-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>Launch AI Simulation</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>

          </div>
        </section>

        {/* ================= 4 CORE VITALS BENTO GRID ================= */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Readiness Index */}
          <div className="p-5 rounded-3xl bg-white border border-zinc-200/90 shadow-2xs space-y-2 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
              <span>Readiness Index</span>
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-950 font-brand">88%</span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  +8% this week
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-1">Top 12% of software candidates</p>
            </div>
            <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
              <div className="w-[88%] h-full bg-emerald-500 rounded-full" />
            </div>
          </div>

          {/* Practice Volume */}
          <div className="p-5 rounded-3xl bg-white border border-zinc-200/90 shadow-2xs space-y-2 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
              <span>Practice Volume</span>
              <div className="w-7 h-7 rounded-lg bg-orange-500/10 text-orange-600 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-950 font-brand">18</span>
                <span className="text-xs font-bold text-slate-600">Simulations</span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-1">6.2 total hours logged</p>
            </div>
            <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
              <div className="w-[72%] h-full bg-orange-600 rounded-full" />
            </div>
          </div>

          {/* Communication Clarity */}
          <div className="p-5 rounded-3xl bg-white border border-zinc-200/90 shadow-2xs space-y-2 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
              <span>Communication Clarity</span>
              <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-950 font-brand">92%</span>
                <span className="text-xs font-mono text-zinc-500">138 WPM</span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-1">Minimal filler words (1.1 / min)</p>
            </div>
            <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
              <div className="w-[92%] h-full bg-indigo-500 rounded-full" />
            </div>
          </div>

          {/* Technical Mastery */}
          <div className="p-5 rounded-3xl bg-white border border-zinc-200/90 shadow-2xs space-y-2 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
              <span>Technical Depth</span>
              <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-950 font-brand">89%</span>
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                  Strong Architecture
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-1">High confidence in system design</p>
            </div>
            <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
              <div className="w-[89%] h-full bg-amber-500 rounded-full" />
            </div>
          </div>

        </section>

        {/* ================= 3-TAB SEGMENTED NAVIGATION ================= */}
        <div className="flex items-center gap-2 p-1.5 bg-zinc-200/70 rounded-2xl max-w-lg">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-white text-slate-950 shadow-2xs'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            <BarChart3 className={`w-4 h-4 ${activeTab === 'overview' ? 'text-orange-600' : 'text-zinc-500'}`} />
            <span>Overview & Coaching</span>
          </button>

          <button
            onClick={() => setActiveTab('logs')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'logs'
                ? 'bg-white text-slate-950 shadow-2xs'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            <Clock className={`w-4 h-4 ${activeTab === 'logs' ? 'text-orange-600' : 'text-zinc-500'}`} />
            <span>Practice Logs ({MOCK_DRILL_HISTORY.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-white text-slate-950 shadow-2xs'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            <Settings className={`w-4 h-4 ${activeTab === 'settings' ? 'text-orange-600' : 'text-zinc-500'}`} />
            <span>Settings & Profile</span>
          </button>
        </div>

        {/* ================= TAB 1: OVERVIEW & AI COACHING ================= */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Split Row: Competency Matrix & Weekly Pulse */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Skill Competency Breakdown (2 Cols) */}
              <div className="lg:col-span-2 p-6 sm:p-7 rounded-3xl bg-white border border-zinc-200/90 shadow-2xs space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-950 tracking-tight">Competency Mastery</h3>
                    <p className="text-xs text-slate-500">Evaluated across your latest simulations</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-lg">
                    Real-Time Telemetry
                  </span>
                </div>

                <div className="space-y-4 pt-1">
                  {SKILL_COMPETENCIES.map((skill) => (
                    <div key={skill.name} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-900 font-bold">{skill.name}</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-100 text-zinc-500">
                            {skill.level}
                          </span>
                        </div>
                        <span className="text-slate-900 font-mono font-bold">{skill.score}%</span>
                      </div>
                      <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-slate-900 rounded-full transition-all duration-700" 
                          style={{ width: `${skill.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly Practice Pulse (1 Col) */}
              <div className="p-6 sm:p-7 rounded-3xl bg-white border border-zinc-200/90 shadow-2xs space-y-5 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-950 tracking-tight">Weekly Practice Pulse</h3>
                  <p className="text-xs text-slate-500">Consistency across the past 7 days</p>
                </div>

                <div className="grid grid-cols-7 gap-2 text-center py-2">
                  {WEEKLY_ACTIVITY.map((d) => (
                    <div key={d.day} className="space-y-2">
                      <div className={`
                        h-16 rounded-xl flex items-end justify-center pb-2 text-[10px] font-mono font-bold transition-all
                        ${d.active ? 'bg-orange-500/15 border border-orange-500/30 text-orange-600' : 'bg-zinc-100 text-zinc-400'}
                      `}>
                        {d.minutes > 0 ? `${d.minutes}m` : '—'}
                      </div>
                      <span className="text-[11px] font-semibold text-slate-600 block">{d.day}</span>
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-xl bg-orange-50/70 border border-orange-200/60 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-orange-600 fill-orange-600" />
                    <span className="font-bold text-slate-900">4-Day Active Streak</span>
                  </div>
                  <span className="text-orange-700 font-mono font-bold">170 mins</span>
                </div>
              </div>

            </div>

            {/* AI Coaching & Diagnostic Recommendations Hub */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200/90 shadow-2xs space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-orange-500/10 text-orange-600 text-xs font-mono font-bold uppercase tracking-wider mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Diagnostic Coaching</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-950 tracking-tight">
                    High-Impact Growth Areas Identified by the Engine
                  </h3>
                </div>
                <span className="text-xs font-mono text-zinc-400 hidden sm:inline">3 Target Areas</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {AI_COACHING_INSIGHTS.map((insight) => (
                  <div 
                    key={insight.id}
                    className="p-5 rounded-2xl bg-zinc-50/80 border border-zinc-200/80 space-y-4 flex flex-col justify-between hover:border-orange-500/40 hover:bg-white transition-all shadow-2xs"
                  >
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-200/70 text-slate-700 font-mono">
                        {insight.tag}
                      </span>
                      <h4 className="text-sm font-extrabold text-slate-950 leading-snug">
                        {insight.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">
                        {insight.description}
                      </p>
                    </div>

                    <button
                      onClick={() => handleLaunchSimulation(insight.suggestedTrack)}
                      className="w-full py-2.5 rounded-xl bg-white hover:bg-orange-600 text-slate-900 hover:text-white border border-zinc-200 hover:border-orange-600 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs group"
                    >
                      <span>{insight.actionText}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        )}

        {/* ================= TAB 2: PRACTICE LOGS & DRILL HISTORY ================= */}
        {activeTab === 'logs' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Search & Filter Header */}
            <div className="p-4 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-4">
              
              <div className="relative flex-1 min-w-[240px]">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={logSearch}
                  onChange={(e) => setLogSearch(e.target.value)}
                  placeholder="Search drills by topic, ID, or track..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-slate-900 placeholder:text-zinc-400 focus:bg-white focus:outline-none focus:border-orange-500"
                />
              </div>

              {/* Track filter pills */}
              <div className="flex items-center gap-1.5 bg-zinc-100 p-1 rounded-xl text-xs font-semibold">
                {(['all', 'technical', 'behavioral', 'hr'] as const).map((track) => (
                  <button
                    key={track}
                    onClick={() => setSelectedTrackFilter(track)}
                    className={`px-3 py-1.5 rounded-lg capitalize transition-all cursor-pointer ${
                      selectedTrackFilter === track
                        ? 'bg-white text-slate-950 font-bold shadow-2xs'
                        : 'text-zinc-600 hover:text-slate-950'
                    }`}
                  >
                    {track}
                  </button>
                ))}
              </div>

            </div>

            {/* Drill List */}
            <div className="space-y-3">
              {filteredLogs.map((drill) => {
                const isExpanded = expandedLogId === drill.id;
                return (
                  <div
                    key={drill.id}
                    className="rounded-2xl bg-white border border-zinc-200/90 shadow-2xs overflow-hidden transition-all"
                  >
                    {/* Log Row Header */}
                    <button
                      onClick={() => setExpandedLogId(isExpanded ? null : drill.id)}
                      className="w-full p-5 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-zinc-50/70 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start sm:items-center gap-3.5">
                        <div className={`
                          w-10 h-10 rounded-xl flex items-center justify-center shrink-0
                          ${drill.track === 'technical' ? 'bg-orange-500/10 text-orange-600' : ''}
                          ${drill.track === 'behavioral' ? 'bg-purple-500/10 text-purple-600' : ''}
                          ${drill.track === 'hr' ? 'bg-blue-500/10 text-blue-600' : ''}
                        `}>
                          {drill.track === 'technical' && <Terminal className="w-5 h-5" />}
                          {drill.track === 'behavioral' && <Sparkles className="w-5 h-5" />}
                          {drill.track === 'hr' && <Briefcase className="w-5 h-5" />}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900 font-mono">{drill.id}</span>
                            <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-zinc-100 text-zinc-600 font-semibold">
                              {drill.trackLabel}
                            </span>
                            <span className="text-[10px] font-mono text-zinc-400">
                              {drill.difficulty}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-slate-900 mt-0.5">{drill.topic}</h4>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0">
                        <div className="text-right">
                          <span className="text-sm font-extrabold text-slate-950 font-mono">{drill.score}%</span>
                          <span className="text-[11px] text-zinc-400 block font-medium">{drill.date}</span>
                        </div>
                        <div className="w-7 h-7 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-500">
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </div>
                    </button>

                    {/* Expandable Feedback Drawer */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-6 pb-6 pt-2 border-t border-zinc-100 bg-zinc-50/50 space-y-4"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                            
                            {/* Strengths */}
                            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/60 space-y-2">
                              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                Key Strengths Demonstrated
                              </span>
                              <ul className="space-y-1.5 text-xs text-slate-700 leading-relaxed">
                                {drill.strengths.map((str, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                                    <span>{str}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Growth Areas */}
                            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/60 space-y-2">
                              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                                AI Recommended Growth Area
                              </span>
                              <ul className="space-y-1.5 text-xs text-slate-700 leading-relaxed">
                                {drill.growthAreas.map((ga, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                                    <span>{ga}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                          </div>

                          <div className="flex items-center justify-between pt-2">
                            <span className="text-xs font-mono text-zinc-400">
                              Duration: {drill.duration} • {drill.questionsCount} Questions Analyzed
                            </span>
                            <button
                              onClick={() => handleLaunchSimulation(drill.track)}
                              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                            >
                              <Play className="w-3 h-3 fill-white" />
                              <span>Re-Attempt Simulation</span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ================= TAB 3: SETTINGS & PROFILE ================= */}
        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Left 2 Cols: Profile & Simulation Preferences Form */}
            <form onSubmit={handleSaveSettings} className="lg:col-span-2 space-y-6">
              
              {/* Profile Information */}
              <div className="p-6 sm:p-7 rounded-3xl bg-white border border-zinc-200/90 shadow-2xs space-y-5">
                <div>
                  <h3 className="text-lg font-bold text-slate-950 tracking-tight">Candidate Profile</h3>
                  <p className="text-xs text-slate-500">Tailors question framing and technical depth to your background</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Full Name</label>
                    <input
                      type="text"
                      value={formValues.name}
                      onChange={(e) => setFormDraft(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs font-medium text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Email Address</label>
                    <input
                      type="email"
                      value={formValues.email}
                      onChange={(e) => setFormDraft(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs font-medium text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Target Role</label>
                    <input
                      type="text"
                      value={formValues.role}
                      onChange={(e) => setFormDraft(prev => ({ ...prev, role: e.target.value }))}
                      placeholder="e.g. Senior Software Engineer"
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs font-medium text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Seniority Level</label>
                    <select
                      value={formValues.seniority}
                      onChange={(e) => setFormDraft(prev => ({ ...prev, seniority: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs font-semibold text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none cursor-pointer"
                    >
                      <option value="Junior / Mid">Junior / Mid-Level (L3 / L4)</option>
                      <option value="Senior (L5 / Staff)">Senior Engineer (L5)</option>
                      <option value="Staff / Principal (L6+)">Staff / Principal Architect (L6+)</option>
                      <option value="Engineering Manager">Engineering Manager / Director</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Primary Tech Stack</label>
                    <input
                      type="text"
                      value={formValues.techStack}
                      onChange={(e) => setFormDraft(prev => ({ ...prev, techStack: e.target.value }))}
                      placeholder="e.g. TypeScript, React, Go, AWS, System Design"
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs font-medium text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Target Companies</label>
                    <input
                      type="text"
                      value={formValues.targetCompanies}
                      onChange={(e) => setFormDraft(prev => ({ ...prev, targetCompanies: e.target.value }))}
                      placeholder="e.g. Google, Stripe, Meta, OpenAI"
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs font-medium text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Simulation Engine Preferences */}
              <div className="p-6 sm:p-7 rounded-3xl bg-white border border-zinc-200/90 shadow-2xs space-y-5">
                <div>
                  <h3 className="text-lg font-bold text-slate-950 tracking-tight">AI Interviewer Preferences</h3>
                  <p className="text-xs text-slate-500">Configure simulator behavior during live sessions</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/80">
                    <div>
                      <p className="text-xs font-bold text-slate-900">Background Noise Suppression</p>
                      <p className="text-[11px] text-zinc-500">Reduces ambient keyboard & room noise during voice articulation</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={formValues.noiseSuppression}
                      onChange={(e) => setFormDraft(prev => ({ ...prev, noiseSuppression: e.target.checked }))}
                      className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500 cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/80">
                    <div>
                      <p className="text-xs font-bold text-slate-900">Email Diagnostic Reports</p>
                      <p className="text-[11px] text-zinc-500">Send post-interview STAR scores and growth areas to your email</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={formValues.notificationsEmail}
                      onChange={(e) => setFormDraft(prev => ({ ...prev, notificationsEmail: e.target.checked }))}
                      className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-orange-600/20 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Profile & Preferences</span>
                  </button>
                </div>
              </div>

            </form>

            {/* Right Col: Membership & Plan Card */}
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-slate-950 text-white border border-zinc-800 shadow-xl space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
                    Active Plan
                  </span>
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </div>

                <div>
                  <h3 className="text-2xl font-brand font-extrabold text-white">Ascent Pro Tier</h3>
                  <p className="text-xs text-zinc-400 mt-1">Unlimited AI interviews with Gemini 3 Flash evaluation.</p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Billing Cycle</span>
                    <span className="font-semibold text-white">Annual Membership</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Renews On</span>
                    <span className="font-mono text-zinc-300">Oct 12, 2026</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Seats</span>
                    <span className="font-semibold text-white">1 Private Candidate</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs font-semibold text-zinc-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-orange-500" />
                    <span>All 3 Tracks: Tech, STAR, HR</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-orange-500" />
                    <span>Custom Tech Stack & Difficulty</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-orange-500" />
                    <span>100% Private, Camera-Free Sessions</span>
                  </div>
                </div>

                <button
                  onClick={() => handleLaunchSimulation('technical')}
                  className="w-full py-3 rounded-xl bg-white hover:bg-zinc-100 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-orange-600 fill-orange-600" />
                  <span>Start a New Drill</span>
                </button>
              </div>
            </div>

          </motion.div>
        )}

      </main>

      <Footer />
    </div>
  );
}
