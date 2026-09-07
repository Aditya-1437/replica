'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  Zap, 
  Rocket, 
  Shield, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Lock, 
  Flame, 
  Award, 
  ChevronDown, 
  Copy, 
  Building2, 
  Briefcase,
  CheckCheck
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InterviewLauncherModal from '@/components/InterviewLauncherModal';
import { InterviewType } from '@/context/SessionContext';

interface Plan {
  id: string;
  name: string;
  badge?: string;
  tagline: string;
  price: { monthly: number; annually: number };
  popular?: boolean;
  icon: React.ElementType;
  keyFeature: string;
  features: string[];
  ctaText: string;
  ctaVariant: 'primary' | 'secondary' | 'dark';
  trackTarget?: InterviewType;
}

const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Foundation',
    tagline: 'Essential drills to calibrate your fundamentals before live recruiter screens.',
    price: { monthly: 0, annually: 0 },
    icon: Shield,
    keyFeature: '3 Full Simulations / Month',
    features: [
      '3 AI mock interview sessions per month',
      'Core Technical, Behavioral & HR tracks',
      'Real-time speech clarity & pacing diagnostics',
      'Standard rubric scoring with structured takeaways',
      '100% Camera-free private practice environment'
    ],
    ctaText: 'Start Free Forever',
    ctaVariant: 'secondary',
    trackTarget: 'technical'
  },
  {
    id: 'ascent',
    name: 'Ascent Pro',
    badge: 'Most Popular',
    popular: true,
    tagline: 'Unlimited practice & deep rubric calibration to secure tier-1 engineering offers.',
    price: { monthly: 24, annually: 18 },
    icon: Zap,
    keyFeature: 'Unlimited Simulations + Instant Rubrics',
    features: [
      'Unlimited AI interview simulations (All tracks)',
      'Instant STAR Method breakdown & structural scoring',
      'System Design, Behavioral, and 20+ Tech Stacks',
      'Detailed question-by-question model answer guides',
      'Pacing, filler word & cadence articulation telemetry',
      'Full session transcripts & audio playback exports',
      'Priority AI generation speed (< 1s responses)'
    ],
    ctaText: 'Accelerate with Ascent Pro',
    ctaVariant: 'primary',
    trackTarget: 'technical'
  },
  {
    id: 'prime',
    name: 'Executive & Team',
    badge: 'High Stakes',
    tagline: 'Custom environments for staff engineers, tech leads, and cohort teams.',
    price: { monthly: 59, annually: 45 },
    icon: Rocket,
    keyFeature: 'Up to 5 Seats + Custom AI Personas',
    features: [
      'Everything in Ascent Pro included',
      'Multi-seat shared workspace (up to 5 team members)',
      'Staff & Principal level system architecture scenarios',
      'Engineering Manager & Director leadership rubrics',
      'Custom AI interviewer persona & company calibration',
      'Dedicated 1-on-1 interview strategy onboarding',
      'Team analytics & candidate progress telemetry'
    ],
    ctaText: 'Unlock Executive Access',
    ctaVariant: 'dark',
    trackTarget: 'behavioral'
  }
];

// Curated, meaningful capability comparison matrix
interface ComparisonRow {
  name: string;
  starter: string | boolean;
  ascent: string | boolean;
  prime: string | boolean;
  highlight?: boolean;
}

interface ComparisonCategory {
  category: string;
  items: ComparisonRow[];
}

const COMPARISON_CATEGORIES: ComparisonCategory[] = [
  {
    category: "Simulations & Interview Tracks",
    items: [
      { name: "Monthly Practice Drills", starter: "3 Sessions", ascent: "Unlimited", prime: "Unlimited", highlight: true },
      { name: "Technical & System Design Tracks", starter: "Standard Architecture", ascent: "All 20+ Stacks & Scale", prime: "Staff & Principal Calibrated" },
      { name: "STAR Behavioral Storytelling", starter: "Basic Questions", ascent: "Deep STAR Rubrics", prime: "Leadership & Exec Bars" },
      { name: "HR & Culture Fit Simulation", starter: true, ascent: true, prime: true },
      { name: "Camera-Free Audio Environment", starter: true, ascent: true, prime: true },
      { name: "Custom Tech Stack Configuration", starter: "Core Frameworks", ascent: "20+ Languages & Runtimes", prime: "Full Custom Config" }
    ]
  },
  {
    category: "AI Feedback & Diagnostic Telemetry",
    items: [
      { name: "Speech Pacing & Cadence Analytics", starter: "Basic WPM", ascent: "Detailed Cadence + Fillers", prime: "Detailed Cadence + Fillers" },
      { name: "Structural STAR Score Breakdown", starter: false, ascent: "Instant (S/T/A/R)", prime: "Instant (S/T/A/R)", highlight: true },
      { name: "Question Model Answers & Hints", starter: false, ascent: true, prime: true },
      { name: "Session Audio Transcripts & Playback", starter: false, ascent: true, prime: true },
      { name: "Exportable Diagnostic Dossier (PDF)", starter: false, ascent: true, prime: true },
      { name: "AI Generation Response Latency", starter: "Standard (< 3s)", ascent: "Priority Fast (< 1s)", prime: "Priority Fast (< 1s)" }
    ]
  },
  {
    category: "Workspace, Team & SLA",
    items: [
      { name: "User Seats Included", starter: "1 Seat", ascent: "1 Seat", prime: "Up to 5 Seats", highlight: true },
      { name: "Shared Team Workspace & Leaderboard", starter: false, ascent: false, prime: true },
      { name: "Custom AI Persona & Interviewer Tone", starter: false, ascent: false, prime: true },
      { name: "Official L&D Employer Invoice", starter: false, ascent: true, prime: true },
      { name: "Candidate Support Turnaround", starter: "Community Help", ascent: "Priority Email (< 4 Hours)", prime: "Dedicated 1-on-1 Onboarding" }
    ]
  }
];

const PRICING_FAQS = [
  {
    question: "Can I expense Replica with my company's learning & development budget?",
    answer: "Yes! Most tech employers (Google, Meta, Amazon, Microsoft, and scaling startups) offer $1,000–$3,000/year in annual education or career training stipends. We issue official itemized invoices with your company name, tax ID, and date for seamless reimbursement."
  },
  {
    question: "How does the 7-day money-back guarantee work?",
    answer: "If you subscribe to Ascent Pro or Executive and don't feel noticeably sharper, more articulate, and more confident in your technical interviews within 7 days, email support@replica.ai for a prompt 100% full refund with zero questions asked."
  },
  {
    question: "Can I cancel or modify my subscription at any time?",
    answer: "Yes. You have complete autonomy. You can cancel, downgrade, or upgrade your plan directly from your Candidate Dashboard anytime with one click. Cancellations take effect at the end of the paid period."
  },
  {
    question: "How do multi-seat workspaces work on the Executive plan?",
    answer: "The Executive plan grants up to 5 seats. You can invite study partners, cohort peers, or team members via email to share interview analytics, review past sessions, and practice synchronized staff-level architectural scenarios."
  },
  {
    question: "Are practice transcripts and audio recordings private?",
    answer: "100% confidential. Your audio streams and transcripts are encrypted in transit and at rest. They are strictly private to you, never shared with recruiters or employers, and never used to train external generative AI models."
  }
];

export default function PricingContent() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [isLauncherOpen, setIsLauncherOpen] = useState(false);
  const [launcherInitialType, setLauncherInitialType] = useState<InterviewType | undefined>(undefined);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedTemplate, setCopiedTemplate] = useState(false);

  const handleOpenLauncher = (type?: InterviewType) => {
    setLauncherInitialType(type || 'technical');
    setIsLauncherOpen(true);
  };

  const handleCopyExpenseTemplate = () => {
    const template = `Hi [Manager Name],

I would like to request approval to use a portion of my annual Learning & Development / Professional Training budget for Replica (https://replica.ai), an AI interview simulation and technical communication platform.

Replica will help me:
- Practice high-stakes technical architecture and system design reasoning.
- Calibrate behavioral and leadership responses using the STAR method.
- Refine speech cadence, conciseness, and articulation before engineering interviews.

The cost is $${isAnnual ? '216/year ($18/month)' : '24/month'}. An official itemized invoice with company tax information will be provided.

Please let me know if this is approved so I can submit the expense receipt.

Best regards,
[Your Name]`;

    navigator.clipboard.writeText(template);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 3000);
  };

  return (
    <main className="min-h-screen bg-sage-bg flex flex-col selection:bg-orange-500 selection:text-white relative overflow-hidden">
      <Navbar />

      {/* Modern Multi-Step Interview Launcher Modal */}
      <InterviewLauncherModal
        isOpen={isLauncherOpen}
        onClose={() => setIsLauncherOpen(false)}
        initialType={launcherInitialType}
      />

      <section className="flex-1 pt-12 pb-28 px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto space-y-16">

          {/* ================= PAGE HEADER & DYNAMIC SWITCHER ================= */}
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 text-xs font-bold uppercase tracking-wider shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Transparent Pricing • Cancel Anytime</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="font-brand text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.1]"
            >
              Simple, transparent plans. <br />
              <span className="brand-gradient-text">Zero guesswork.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-sm sm:text-base text-slate-600 font-medium max-w-xl mx-auto leading-relaxed"
            >
              One offer upgrade pays for a lifetime of preparation. Select the plan tailored to your interview pipeline.
            </motion.p>

            {/* Dynamic Billing Switcher */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="pt-2 flex items-center justify-center"
            >
              <div className="inline-flex items-center p-1.5 bg-white rounded-2xl border border-zinc-200/90 shadow-sm">
                <button
                  type="button"
                  onClick={() => setIsAnnual(false)}
                  className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    !isAnnual 
                      ? 'bg-slate-950 text-white shadow-xs' 
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  Monthly
                </button>

                <button
                  type="button"
                  onClick={() => setIsAnnual(true)}
                  className={`relative px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    isAnnual 
                      ? 'bg-orange-600 text-white shadow-xs' 
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  <span>Annual</span>
                  <span className={`text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-md ${
                    isAnnual ? 'bg-white text-orange-600' : 'bg-orange-100 text-orange-700'
                  }`}>
                    Save 25%
                  </span>
                </button>
              </div>
            </motion.div>
          </div>

          {/* ================= 3 TIER PLAN CARDS ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {PLANS.map((plan, idx) => {
              const currentPrice = isAnnual ? plan.price.annually : plan.price.monthly;
              const Icon = plan.icon;

              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * idx }}
                  className={`relative flex flex-col rounded-3xl transition-all duration-300 ${
                    plan.popular
                      ? 'bg-slate-950 text-white border-2 border-orange-500 shadow-xl shadow-orange-500/10 lg:-translate-y-2'
                      : 'bg-white text-slate-950 border border-zinc-200/90 shadow-sm hover:border-zinc-300'
                  }`}
                >
                  {/* Glowing popular pill */}
                  {plan.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 bg-gradient-to-r from-orange-600 to-amber-500 text-white text-[10px] font-extrabold uppercase tracking-widest rounded-full shadow-md flex items-center gap-1.5 z-20">
                      <Flame className="w-3 h-3 fill-current" />
                      <span>{plan.badge}</span>
                    </div>
                  )}

                  {/* Header Box */}
                  <div className="p-7 pb-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                        plan.popular 
                          ? 'bg-orange-600 text-white shadow-sm' 
                          : 'bg-orange-50 text-orange-600 border border-orange-100'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>

                      {plan.badge && !plan.popular && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-zinc-100 px-2.5 py-1 rounded-full border border-zinc-200">
                          {plan.badge}
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className={`text-xl font-bold tracking-tight ${
                        plan.popular ? 'text-white' : 'text-slate-950'
                      }`}>
                        {plan.name}
                      </h3>
                      <p className={`text-xs leading-relaxed font-medium mt-1 ${
                        plan.popular ? 'text-zinc-400' : 'text-slate-500'
                      }`}>
                        {plan.tagline}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="pt-1 flex items-baseline gap-1.5">
                      <span className="text-xl font-bold">$</span>
                      <motion.span
                        key={`${currentPrice}-${isAnnual}`}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`text-4xl sm:text-5xl font-extrabold tracking-tight font-sans ${
                          plan.popular ? 'text-white' : 'text-slate-950'
                        }`}
                      >
                        {currentPrice}
                      </motion.span>
                      <span className={`text-xs font-semibold ${
                        plan.popular ? 'text-zinc-400' : 'text-slate-500'
                      }`}>
                        / month
                      </span>
                    </div>

                    {/* Key Feature Highlight Pill */}
                    <div className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 ${
                      plan.popular 
                        ? 'bg-orange-500/15 text-orange-300 border border-orange-500/30' 
                        : 'bg-zinc-100 text-slate-800'
                    }`}>
                      <Sparkles className="w-3.5 h-3.5 shrink-0 text-orange-500" />
                      <span>{plan.keyFeature}</span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className={`h-px mx-7 ${plan.popular ? 'bg-zinc-800' : 'bg-zinc-100'}`} />

                  {/* Features List */}
                  <div className="p-7 pt-5 flex-1 space-y-3.5">
                    <p className={`text-[10px] font-bold uppercase tracking-wider ${
                      plan.popular ? 'text-zinc-400' : 'text-slate-400'
                    }`}>
                      Included Capabilities:
                    </p>

                    <ul className="space-y-2.5">
                      {plan.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-xs font-medium">
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            plan.popular 
                              ? 'bg-emerald-500/20 text-emerald-400' 
                              : 'bg-orange-500/10 text-orange-600'
                          }`}>
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                          <span className={plan.popular ? 'text-zinc-200' : 'text-slate-700'}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Button */}
                  <div className="p-7 pt-0">
                    <button
                      type="button"
                      onClick={() => handleOpenLauncher(plan.trackTarget)}
                      className={`w-full py-3.5 rounded-xl font-bold text-xs tracking-wide uppercase transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 ${
                        plan.ctaVariant === 'primary'
                          ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30 hover:bg-orange-500'
                          : plan.ctaVariant === 'dark'
                            ? 'bg-white text-slate-950 hover:bg-zinc-100'
                            : 'bg-slate-950 text-white hover:bg-orange-600'
                      }`}
                    >
                      <span>{plan.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ================= PROMINENT PACKAGE COMPARISON TABLE ================= */}
          <section id="comparison-table" className="space-y-6 pt-4">
            
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-200/80 text-slate-700 text-xs font-bold uppercase tracking-wider">
                <span>Side-by-Side Breakdown</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-brand font-extrabold text-slate-950 tracking-tight">
                Compare Package Capabilities
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Detailed side-by-side comparison of interview simulations, AI evaluation depth, and team features.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-zinc-200/90 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  
                  {/* Table Header */}
                  <thead>
                    <tr className="border-b border-zinc-200 bg-zinc-50/80">
                      <th className="py-4 px-6 font-bold text-slate-900 w-2/5">
                        Plan Capability
                      </th>
                      
                      {/* Foundation Column */}
                      <th className="py-4 px-4 text-center font-bold text-slate-900 w-1/5">
                        <div className="space-y-0.5">
                          <div className="text-sm font-bold text-slate-950">Foundation</div>
                          <div className="text-[11px] font-mono text-slate-500 font-normal">$0 / month</div>
                        </div>
                      </th>

                      {/* Ascent Pro Column (Highlighted) */}
                      <th className="py-4 px-4 text-center font-bold text-orange-600 w-1/5 bg-orange-500/5 border-x border-orange-500/20">
                        <div className="space-y-0.5">
                          <div className="inline-flex items-center gap-1 text-sm font-extrabold text-orange-600">
                            <span>Ascent Pro</span>
                            <Sparkles className="w-3 h-3 text-orange-500" />
                          </div>
                          <div className="text-[11px] font-mono text-orange-700 font-normal">
                            ${isAnnual ? '18' : '24'} / month
                          </div>
                        </div>
                      </th>

                      {/* Executive Column */}
                      <th className="py-4 px-4 text-center font-bold text-slate-900 w-1/5">
                        <div className="space-y-0.5">
                          <div className="text-sm font-bold text-slate-950">Executive & Team</div>
                          <div className="text-[11px] font-mono text-slate-500 font-normal">
                            ${isAnnual ? '45' : '59'} / month
                          </div>
                        </div>
                      </th>
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody className="divide-y divide-zinc-100">
                    {COMPARISON_CATEGORIES.map((categoryGroup) => (
                      <React.Fragment key={categoryGroup.category}>
                        
                        {/* Category Divider Header */}
                        <tr className="bg-zinc-100/75">
                          <td 
                            colSpan={4} 
                            className="py-2.5 px-6 font-bold text-[11px] uppercase tracking-wider text-slate-700"
                          >
                            {categoryGroup.category}
                          </td>
                        </tr>

                        {/* Rows */}
                        {categoryGroup.items.map((item, rowIdx) => {
                          const renderCell = (val: string | boolean, isHighlighted = false) => {
                            if (typeof val === 'boolean') {
                              return val ? (
                                <div className="flex justify-center">
                                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                                    isHighlighted 
                                      ? 'bg-emerald-500/20 text-emerald-600' 
                                      : 'bg-emerald-50 text-emerald-600'
                                  }`}>
                                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                                  </div>
                                </div>
                              ) : (
                                <span className="text-zinc-300 font-mono text-base">—</span>
                              );
                            }

                            return (
                              <span className={`text-xs ${
                                isHighlighted 
                                  ? 'font-bold text-orange-600' 
                                  : 'font-medium text-slate-700'
                              }`}>
                                {val}
                              </span>
                            );
                          };

                          return (
                            <tr 
                              key={rowIdx} 
                              className="hover:bg-zinc-50/70 transition-colors"
                            >
                              <td className="py-3.5 px-6 font-medium text-slate-800">
                                <div className="flex items-center gap-1.5">
                                  <span>{item.name}</span>
                                  {item.highlight && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                                  )}
                                </div>
                              </td>

                              <td className="py-3.5 px-4 text-center">
                                {renderCell(item.starter)}
                              </td>

                              {/* Ascent Pro Highlighted Column */}
                              <td className="py-3.5 px-4 text-center bg-orange-500/5 border-x border-orange-500/20">
                                {renderCell(item.ascent, true)}
                              </td>

                              <td className="py-3.5 px-4 text-center">
                                {renderCell(item.prime)}
                              </td>
                            </tr>
                          );
                        })}
                      </React.Fragment>
                    ))}

                    {/* Action Row in Table Footer */}
                    <tr className="bg-zinc-50/80 border-t border-zinc-200">
                      <td className="py-4 px-6 font-bold text-slate-900 text-xs">
                        Ready to begin?
                      </td>
                      <td className="py-4 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleOpenLauncher('technical')}
                          className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold transition-all cursor-pointer"
                        >
                          Start Free
                        </button>
                      </td>
                      <td className="py-4 px-4 text-center bg-orange-500/5 border-x border-orange-500/20">
                        <button
                          type="button"
                          onClick={() => handleOpenLauncher('technical')}
                          className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold shadow-sm shadow-orange-600/20 transition-all cursor-pointer"
                        >
                          Choose Ascent
                        </button>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleOpenLauncher('behavioral')}
                          className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold transition-all cursor-pointer"
                        >
                          Get Executive
                        </button>
                      </td>
                    </tr>
                  </tbody>

                </table>
              </div>
            </div>
          </section>

          {/* ================= L&D EMPLOYER REIMBURSEMENT BANNER ================= */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 border border-orange-100 flex items-center justify-center shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-600">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Corporate Education Budget</span>
                </div>
                <h3 className="text-lg font-bold text-slate-950">
                  Did you know your employer can pay for Replica?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium max-w-xl">
                  Most tech companies provide $1,000–$3,000/year for professional development and communication coaching. Use our ready-made email to request reimbursement.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopyExpenseTemplate}
              className="px-5 py-3 rounded-xl bg-zinc-900 hover:bg-orange-600 text-white text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-2 active:scale-95"
            >
              {copiedTemplate ? (
                <>
                  <CheckCheck className="w-4 h-4 text-emerald-400" />
                  <span>Template Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Expense Template</span>
                </>
              )}
            </button>
          </motion.div>

          {/* ================= PRICING FAQS ACCORDION ================= */}
          <section className="space-y-6 pt-2">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-brand font-extrabold text-slate-950">
                Pricing & Billing FAQs
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Everything you need to know about plans, guarantees, and expensing.
              </p>
            </div>

            <div className="space-y-3 max-w-2xl mx-auto">
              {PRICING_FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="border border-zinc-200/80 rounded-2xl bg-white overflow-hidden shadow-2xs"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-zinc-50/50 transition-colors gap-3 cursor-pointer"
                    >
                      <span className="font-bold text-slate-900 text-sm">{faq.question}</span>
                      <ChevronDown className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-orange-600' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="px-5 pb-4 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-zinc-100 font-medium"
                        >
                          {faq.answer}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ================= TRUST & GUARANTEES BENTO ================= */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-zinc-200/80 shadow-xs flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-xs font-bold text-slate-900">7-Day Money-Back Guarantee</h3>
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                  Try Ascent Pro risk-free. If you&apos;re not satisfied, get a 100% full refund with zero questions asked.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-zinc-200/80 shadow-xs flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-xs font-bold text-slate-900">100% Confidential Practice</h3>
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                  Your mock sessions and audio files are encrypted and never shared with employers or recruiters.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-zinc-200/80 shadow-xs flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-xs font-bold text-slate-900">FAANG Calibrated Rubrics</h3>
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                  Interview prompts and evaluations modeled after Google, Stripe, Meta, and Netflix senior engineering bars.
                </p>
              </div>
            </div>
          </section>

          {/* ================= FINAL CALL TO ACTION BANNER ================= */}
          <section className="p-8 sm:p-10 rounded-3xl bg-slate-950 text-white relative overflow-hidden border border-zinc-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center sm:text-left max-w-lg">
              <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">
                Ready to accelerate your career?
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Try your first simulation in under 60 seconds.
              </h3>
              <p className="text-xs text-zinc-400 font-medium">
                No credit card required. Experience camera-free interview practice today.
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleOpenLauncher('technical')}
              className="px-7 py-3.5 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 cursor-pointer shadow-md active:scale-95"
            >
              <span>Start Free Drill</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </section>

        </div>
      </section>

      <Footer />
    </main>
  );
}
