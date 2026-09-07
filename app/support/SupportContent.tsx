'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  LifeBuoy, 
  Send, 
  Star, 
  Bug, 
  MessageSquare, 
  Mail, 
  FileText, 
  MessageCircle, 
  ExternalLink, 
  ChevronDown, 
  Zap, 
  Mic, 
  ShieldCheck, 
  Check
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useUser } from '@/context/UserContext';

// Support Channels
const CHANNELS = [
  {
    title: "Community Peer Network",
    description: "Join 5,000+ engineers practicing system design, coding, and STAR behavioral scenarios.",
    icon: MessageCircle,
    actionText: "Join Discord",
    href: "https://discord.com",
    external: true,
    tag: "Community"
  },
  {
    title: "Evaluation Rubrics Guide",
    description: "Learn how the AI evaluates situation framing, technical trade-offs, and communication pacing.",
    icon: FileText,
    actionText: "View Scoring Rubrics",
    href: "#knowledge-base",
    external: false,
    tag: "Documentation"
  },
  {
    title: "Priority Candidate Support",
    description: "Reach our core engineering and candidate success team. Guaranteed response in under 4 hours.",
    icon: Mail,
    actionText: "support@replica.ai",
    href: "mailto:support@replica.ai",
    external: false,
    tag: "Direct Help"
  },
  {
    title: "Audio & Device Troubleshooting",
    description: "Step-by-step resolution for browser microphone permissions, echo cancellation, and audio input.",
    icon: Mic,
    actionText: "Troubleshoot Audio",
    href: "#knowledge-base",
    external: false,
    tag: "Hardware"
  }
];

// Categorized Knowledge Base FAQs
interface FaqItem {
  question: string;
  answer: string;
  category: 'scoring' | 'audio' | 'privacy' | 'billing';
  categoryLabel: string;
}

const FAQS: FaqItem[] = [
  {
    category: 'scoring',
    categoryLabel: 'AI & Scoring Rubrics',
    question: "How does the AI evaluate STAR behavioral responses?",
    answer: "The evaluation engine analyzes your responses according to structured industry rubrics: Situation (contextual clarity), Task (your specific responsibility), Action (the concrete engineering steps YOU took), and Result (quantifiable business or technical outcomes). It also measures voice cadence and filler word density."
  },
  {
    category: 'scoring',
    categoryLabel: 'AI & Scoring Rubrics',
    question: "How are Technical and System Design challenges calibrated?",
    answer: "Questions are dynamically synthesized using Gemini 3 Flash based on your chosen technology stack and difficulty level (Foundational, Intermediate, Advanced, Staff). The model evaluates architectural trade-offs, concurrency handling, bottleneck awareness, and edge-case probing."
  },
  {
    category: 'audio',
    categoryLabel: 'Audio & Hardware',
    question: "How does the Camera-Free audio environment work?",
    answer: "Replica is built specifically to remove video pressure. The simulator operates 100% camera-free. We only analyze your spoken reasoning and typed responses in real-time, allowing you to focus entirely on articulating complex ideas."
  },
  {
    category: 'audio',
    categoryLabel: 'Audio & Hardware',
    question: "My browser microphone isn't detecting my voice. What should I do?",
    answer: "First, verify that your browser has granted microphone permission (check the lock/tune icon in the browser address bar). Ensure the correct microphone input is selected in your system sound settings and that browser hardware noise suppression is active."
  },
  {
    category: 'privacy',
    categoryLabel: 'Privacy & Security',
    question: "Is my interview practice private? Is it shared with recruiters?",
    answer: "No. Your practice sessions, responses, transcripts, and scores are strictly confidential and encrypted. They are never shared with recruiters, employers, or third parties, and are never used to train public generative AI models."
  },
  {
    category: 'privacy',
    categoryLabel: 'Privacy & Security',
    question: "Can I delete or export my practice session transcripts?",
    answer: "Yes. You have full ownership of your practice telemetry. You can export performance reports or permanently purge session logs from your Candidate Dashboard anytime under Account Settings."
  },
  {
    category: 'billing',
    categoryLabel: 'Billing & Membership',
    question: "How do plan upgrades, renewals, and cancellations work?",
    answer: "You can manage your subscription with one click from the Pricing or Dashboard page. Cancellations take effect at the end of your current billing period with zero hassle or retention friction."
  },
  {
    category: 'billing',
    categoryLabel: 'Billing & Membership',
    question: "Are team, university, or boot camp licenses available?",
    answer: "Yes, we offer institutional licenses with shared question banks, mentor review dashboards, and bulk billing. Contact us via enterprise@replica.ai for customized onboarding."
  }
];

export default function SupportContent() {
  const { user } = useUser();

  // Search & FAQ state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'scoring' | 'audio' | 'privacy' | 'billing'>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Unified Terminal Tab: 'help' | 'feedback' | 'issue'
  const [terminalTab, setTerminalTab] = useState<'help' | 'feedback' | 'issue'>('help');

  // Form States (controlled with user draft fallbacks)
  const [helpForm, setHelpForm] = useState({
    name: '',
    email: '',
    topic: 'General Question',
    message: ''
  });
  const [helpStatus, setHelpStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [feedbackCategory, setFeedbackCategory] = useState('Overall Platform Experience');
  const [feedbackNotes, setFeedbackNotes] = useState('');
  const [feedbackEmail, setFeedbackEmail] = useState('');
  const [feedbackStatus, setFeedbackStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const [issueArea, setIssueArea] = useState('Microphone & Audio Input');
  const [issueDesc, setIssueDesc] = useState('');
  const [issueEmail, setIssueEmail] = useState('');
  const [issueStatus, setIssueStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  // Form handlers
  const handleHelpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHelpStatus('sending');
    setTimeout(() => setHelpStatus('sent'), 600);
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackStatus('sending');
    setTimeout(() => setFeedbackStatus('sent'), 600);
  };

  const handleIssueSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIssueStatus('sending');
    setTimeout(() => setIssueStatus('sent'), 600);
  };

  // Filtered FAQs based on category & search query
  const filteredFaqs = useMemo(() => {
    return FAQS.filter((faq) => {
      if (selectedCategory !== 'all' && faq.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesQ = faq.question.toLowerCase().includes(query);
        const matchesA = faq.answer.toLowerCase().includes(query);
        const matchesC = faq.categoryLabel.toLowerCase().includes(query);
        if (!matchesQ && !matchesA && !matchesC) return false;
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  const getRatingLabel = (val: number) => {
    switch (val) {
      case 5: return "5/5 — Highly calibrated, loved the simulation!";
      case 4: return "4/5 — Very good, solid practice";
      case 3: return "3/5 — Helpful, with room to improve";
      case 2: return "2/5 — Needs work on question depth";
      case 1: return "1/5 — Unsatisfied";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 font-sans selection:bg-orange-500 selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-10 space-y-12">
        
        {/* ================= HERO & COMMAND SEARCH ================= */}
        <section className="text-center space-y-5 max-w-3xl mx-auto pt-2">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-xs font-mono font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>AI Simulation Engine: Operational • Latency: ~240ms</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-brand font-extrabold text-slate-950 tracking-tight">
            How can we assist your preparation?
          </h1>

          <p className="text-slate-600 text-sm sm:text-base font-medium max-w-2xl mx-auto leading-relaxed">
            Search our interview rubrics, verify your audio hardware setup, or contact candidate support for rapid assistance.
          </p>

          {/* Interactive Search Command Bar */}
          <div className="pt-2 max-w-xl mx-auto relative">
            <Search className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search rubrics, microphone setup, STAR scoring, billing..."
              className="w-full pl-12 pr-4 py-3.5 bg-white rounded-2xl border border-zinc-200/90 shadow-sm text-sm text-slate-900 placeholder:text-zinc-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-zinc-400 hover:text-slate-800 bg-zinc-100 px-2 py-0.5 rounded cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

        </section>

        {/* ================= PRE-INTERVIEW SETUP DIAGNOSTIC ================= */}
        <section className="p-6 sm:p-7 rounded-3xl bg-slate-950 text-white border border-zinc-800 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-orange-400">
                  Pre-Flight Verification
                </span>
              </div>
              <h3 className="text-xl font-brand font-extrabold text-white tracking-tight">
                Candidate Hardware & Environment Sanity Check
              </h3>
              <p className="text-xs text-zinc-400">
                Confirm your browser setup before launching high-stakes technical or behavioral simulations.
              </p>
            </div>

            {/* 3 Diagnostic Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full md:w-auto">
              <div className="px-3.5 py-2.5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-0.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                  <Mic className="w-3.5 h-3.5 text-orange-500" />
                  <span>Web Audio API</span>
                </div>
                <span className="text-[11px] font-mono text-emerald-400">Ready & Supported</span>
              </div>

              <div className="px-3.5 py-2.5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-0.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>Audio Buffer</span>
                </div>
                <span className="text-[11px] font-mono text-emerald-400">Sub-millisecond</span>
              </div>

              <div className="px-3.5 py-2.5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-0.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>100% Privacy</span>
                </div>
                <span className="text-[11px] font-mono text-emerald-400">Camera-Free</span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 4 PILLAR CHANNEL CARDS ================= */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CHANNELS.map((channel) => {
            const Icon = channel.icon;
            return (
              <div 
                key={channel.title}
                className="p-5 sm:p-6 bg-white rounded-3xl border border-zinc-200/90 shadow-2xs hover:border-orange-500/40 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-orange-500/10 text-orange-600 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-100 text-zinc-600">
                      {channel.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-950 tracking-tight">
                    {channel.title}
                  </h3>
                  
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    {channel.description}
                  </p>
                </div>

                <div className="pt-4 mt-2 border-t border-zinc-100">
                  <a
                    href={channel.href}
                    target={channel.external ? "_blank" : undefined}
                    rel={channel.external ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors"
                  >
                    <span>{channel.actionText}</span>
                    {channel.external && <ExternalLink className="w-3.5 h-3.5" />}
                  </a>
                </div>
              </div>
            );
          })}
        </section>

        {/* ================= SMART UNIFIED ASSISTANCE TERMINAL ================= */}
        <section className="bg-white rounded-3xl border border-zinc-200/90 shadow-sm overflow-hidden">
          
          {/* Segmented Mode Switcher */}
          <div className="p-4 bg-zinc-50 border-b border-zinc-200/80 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-orange-600/10 text-orange-600 flex items-center justify-center">
                <LifeBuoy className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Direct Candidate Assistance Terminal
              </span>
            </div>

            <div className="flex items-center gap-1.5 bg-zinc-200/70 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setTerminalTab('help')}
                className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  terminalTab === 'help'
                    ? 'bg-white text-slate-950 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5 text-orange-600" />
                <span>Support Request</span>
              </button>

              <button
                type="button"
                onClick={() => setTerminalTab('feedback')}
                className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  terminalTab === 'feedback'
                    ? 'bg-white text-slate-950 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>Rate & Feedback</span>
              </button>

              <button
                type="button"
                onClick={() => setTerminalTab('issue')}
                className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  terminalTab === 'issue'
                    ? 'bg-white text-slate-950 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                <Bug className="w-3.5 h-3.5 text-red-500" />
                <span>Report Incident</span>
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 sm:p-10 max-w-2xl mx-auto">
            
            {/* TAB 1: SUPPORT REQUEST */}
            {terminalTab === 'help' && (
              <div>
                {helpStatus === 'sent' ? (
                  <div className="text-center py-10 space-y-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6 stroke-[3]" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-slate-950">Support Request Dispatched</h3>
                      <p className="text-xs sm:text-sm text-slate-600">
                        Our engineering support team has received your ticket and will reply to <strong>{helpForm.email || user?.email}</strong> in under 4 hours.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setHelpStatus('idle');
                        setHelpForm(prev => ({ ...prev, message: '' }));
                      }}
                      className="text-xs font-bold text-orange-600 hover:underline pt-2 cursor-pointer"
                    >
                      Send another request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleHelpSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Your Name</label>
                        <input
                          type="text"
                          required
                          value={helpForm.name || user?.name || ''}
                          onChange={(e) => setHelpForm({ ...helpForm, name: e.target.value })}
                          placeholder="Aditya Kuncha"
                          className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Email Address</label>
                        <input
                          type="email"
                          required
                          value={helpForm.email || user?.email || ''}
                          onChange={(e) => setHelpForm({ ...helpForm, email: e.target.value })}
                          placeholder="aditya@example.com"
                          className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Assistance Category</label>
                      <select
                        value={helpForm.topic}
                        onChange={(e) => setHelpForm({ ...helpForm, topic: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none cursor-pointer"
                      >
                        <option>General Question</option>
                        <option>Interview Rubrics & Evaluation Calibration</option>
                        <option>Microphone & Audio Driver Setup</option>
                        <option>Billing, Subscription & Receipt Invoices</option>
                        <option>Privacy, Data Deletion & Encryption</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Message Details</label>
                      <textarea
                        required
                        rows={4}
                        value={helpForm.message}
                        onChange={(e) => setHelpForm({ ...helpForm, message: e.target.value })}
                        placeholder="Describe your question or what you need assistance with..."
                        className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none resize-none leading-relaxed"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={helpStatus === 'sending'}
                      className="w-full py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-orange-600/20"
                    >
                      {helpStatus === 'sending' ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Submit Support Request</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* TAB 2: RATE & FEEDBACK */}
            {terminalTab === 'feedback' && (
              <div>
                {feedbackStatus === 'sent' ? (
                  <div className="text-center py-10 space-y-4">
                    <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6 stroke-[3]" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-slate-950">Thank You for Calibrating Replica!</h3>
                      <p className="text-xs sm:text-sm text-slate-600">
                        Your direct rating and suggestions directly influence upcoming interview models and question pools.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setFeedbackStatus('idle');
                        setFeedbackNotes('');
                      }}
                      className="text-xs font-bold text-orange-600 hover:underline pt-2 cursor-pointer"
                    >
                      Submit additional feedback
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFeedbackSubmit} className="space-y-5">
                    {/* Star Selector */}
                    <div className="text-center space-y-1.5 py-1">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                        Rate Your Simulation Experience
                      </label>
                      <div className="flex items-center justify-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => {
                          const isFilled = (hoverRating !== null ? hoverRating : rating) >= star;
                          return (
                            <button
                              key={star}
                              type="button"
                              onMouseEnter={() => setHoverRating(star)}
                              onMouseLeave={() => setHoverRating(null)}
                              onClick={() => setRating(star)}
                              className="p-1 transition-transform hover:scale-110 focus:outline-none cursor-pointer"
                            >
                              <Star 
                                className={`w-8 h-8 transition-colors ${
                                  isFilled ? 'text-amber-500 fill-amber-500' : 'text-zinc-300'
                                }`} 
                              />
                            </button>
                          );
                        })}
                      </div>
                      <p className="text-xs font-semibold text-amber-700 pt-0.5">
                        {getRatingLabel(hoverRating || rating)}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Feedback Type</label>
                        <select
                          value={feedbackCategory}
                          onChange={(e) => setFeedbackCategory(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none cursor-pointer"
                        >
                          <option>Overall Platform Experience</option>
                          <option>Question Realism & Quality</option>
                          <option>STAR Scoring Precision</option>
                          <option>Feature Request / Idea</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Email (Optional)</label>
                        <input
                          type="email"
                          value={feedbackEmail || user?.email || ''}
                          onChange={(e) => setFeedbackEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Your Suggestions</label>
                      <textarea
                        required
                        rows={4}
                        value={feedbackNotes}
                        onChange={(e) => setFeedbackNotes(e.target.value)}
                        placeholder="What parts of the simulation felt high-impact? What could be improved?"
                        className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none resize-none leading-relaxed"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={feedbackStatus === 'sending'}
                      className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-amber-600/20"
                    >
                      {feedbackStatus === 'sending' ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Submit Platform Feedback</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* TAB 3: REPORT INCIDENT */}
            {terminalTab === 'issue' && (
              <div>
                {issueStatus === 'sent' ? (
                  <div className="text-center py-10 space-y-4">
                    <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6 stroke-[3]" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-slate-950">Incident Ticket Filed</h3>
                      <p className="text-xs sm:text-sm text-slate-600">
                        Our telemetry team has logged the bug report. You will receive an update once a patch is deployed.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setIssueStatus('idle');
                        setIssueDesc('');
                      }}
                      className="text-xs font-bold text-orange-600 hover:underline pt-2 cursor-pointer"
                    >
                      Report another issue
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleIssueSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Incident Subsystem</label>
                        <select
                          value={issueArea}
                          onChange={(e) => setIssueArea(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none cursor-pointer"
                        >
                          <option>Microphone & Audio Input</option>
                          <option>AI Question Generation</option>
                          <option>STAR Scoring & Evaluation</option>
                          <option>Candidate Dashboard Telemetry</option>
                          <option>Account, Authentication & Billing</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Email for Status</label>
                        <input
                          type="email"
                          required
                          value={issueEmail || user?.email || ''}
                          onChange={(e) => setIssueEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Reproduction Details</label>
                      <textarea
                        required
                        rows={4}
                        value={issueDesc}
                        onChange={(e) => setIssueDesc(e.target.value)}
                        placeholder="Describe what occurred, any browser error messages, and what you were practicing..."
                        className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none resize-none leading-relaxed"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={issueStatus === 'sending'}
                      className="w-full py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-red-600/20"
                    >
                      {issueStatus === 'sending' ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Submit Incident Report</span>
                          <Bug className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            )}

          </div>
        </section>

        {/* ================= SEARCHABLE CATEGORIZED KNOWLEDGE BASE ================= */}
        <section id="knowledge-base" className="space-y-6 pt-4">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-brand font-extrabold text-slate-950 tracking-tight">
                Knowledge Base & Diagnostics
              </h2>
              <p className="text-xs text-slate-500">
                Official rubrics, scoring methodologies, and hardware guidelines
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 bg-zinc-200/60 p-1 rounded-xl text-xs font-semibold">
              {[
                { id: 'all' as const, label: 'All FAQs' },
                { id: 'scoring' as const, label: 'AI & Scoring' },
                { id: 'audio' as const, label: 'Audio & Hardware' },
                { id: 'privacy' as const, label: 'Privacy' },
                { id: 'billing' as const, label: 'Billing' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-white text-slate-950 font-bold shadow-2xs'
                      : 'text-zinc-600 hover:text-slate-950'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Accordion FAQ List */}
          <div className="space-y-3">
            {filteredFaqs.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-3xl border border-zinc-200/80 text-slate-500 text-xs font-medium">
                No matching topics found for &ldquo;{searchQuery}&rdquo;. Try searching for &ldquo;scoring&rdquo;, &ldquo;microphone&rdquo;, or &ldquo;privacy&rdquo;.
              </div>
            ) : (
              filteredFaqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={faq.question}
                    className="border border-zinc-200/90 rounded-2xl bg-white shadow-2xs overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full px-6 py-4.5 flex items-center justify-between text-left hover:bg-zinc-50/70 transition-colors gap-4 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-orange-500/10 text-orange-600">
                          {faq.categoryLabel}
                        </span>
                        <span className="font-bold text-slate-900 text-sm">{faq.question}</span>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-orange-600' : ''}`} />
                    </button>
                    
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="px-6 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-zinc-100 font-medium"
                        >
                          {faq.answer}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })
            )}
          </div>

        </section>

      </main>

      <Footer />
    </div>
  );
}
