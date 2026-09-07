'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Zap, 
  Sparkles, 
  Briefcase, 
  Gauge, 
  Plus, 
  CheckCircle2,
  Terminal,
  Cpu
} from 'lucide-react';
import { useSession, InterviewType, SessionConfig } from '@/context/SessionContext';

interface InterviewLauncherModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: InterviewType;
}

// Tech Stack Categories
const TECH_CATEGORIES = [
  {
    category: 'Core Languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'Go', 'Rust', 'Java', 'C++', 'SQL']
  },
  {
    category: 'Frameworks & Runtimes',
    items: ['React', 'Next.js', 'Node.js', 'Spring Boot', 'Django', 'FastAPI', 'GraphQL', 'Express']
  },
  {
    category: 'Cloud, Data & Architecture',
    items: ['AWS', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis', 'System Design', 'Kafka', 'Microservices']
  }
];

// Presets
const TECH_PRESETS = [
  { label: 'Full Stack (TS + React)', tech: ['TypeScript', 'React', 'Next.js', 'Node.js', 'PostgreSQL'] },
  { label: 'Cloud & Systems (Go + K8s)', tech: ['Go', 'Docker', 'Kubernetes', 'AWS', 'System Design'] },
  { label: 'Python & AI (FastAPI + SQL)', tech: ['Python', 'FastAPI', 'SQL', 'PostgreSQL', 'Redis'] },
  { label: 'System Design Architecture', tech: ['System Design', 'Microservices', 'Redis', 'Kafka', 'AWS'] }
];

// Difficulty definitions for Technical
const TECH_DIFFICULTIES = [
  {
    id: 'Foundational',
    label: 'Junior / Foundational',
    level: 1,
    desc: 'Core syntax, fundamental data structures, API concepts, clean coding principles.',
    tag: 'Base'
  },
  {
    id: 'Intermediate',
    label: 'Mid-Level / Core Engineer',
    level: 2,
    desc: 'Production concurrency, async flow, state management, debugging & edge cases.',
    tag: 'Core'
  },
  {
    id: 'Advanced',
    label: 'Senior / High Scale',
    level: 3,
    desc: 'System resilience, bottleneck profiling, architecture trade-offs, scalability.',
    tag: 'Senior'
  },
  {
    id: 'Staff',
    label: 'Staff / Principal Architect',
    level: 4,
    desc: 'Distributed consensus, fault-tolerant topologies, multi-region failovers, CAP trade-offs.',
    tag: 'Architect'
  }
];

// Behavioral focus topics
const BEHAVIORAL_TOPICS = [
  'Leadership & Influence',
  'Conflict & Disagreements',
  'Handling Ambiguity',
  'High-Stakes Delivery & Deadlines',
  'Failure & Post-Mortems',
  'Cross-Functional Collaboration',
  'Mentorship & Culture Building',
  'Technical Trade-offs with Product'
];

const BEHAVIORAL_LEVELS = ['Mid-Level Engineer', 'Senior Engineer', 'Staff / Tech Lead', 'Engineering Manager / Director'];

// HR focus topics
const HR_TOPICS = [
  'Elevator Pitch & Background Narrative',
  'Culture Fit & Core Values',
  'Career Ambition & Motivations',
  'Work Style & Autonomous Execution',
  'Feedback & Communication Dynamics',
  'Role Expectations & Compensation'
];

const HR_LEVELS = ['Entry-Level', 'Mid-Level', 'Senior Level', 'Executive / Leadership'];

export default function InterviewLauncherModal({ isOpen, onClose, initialType = 'technical' }: InterviewLauncherModalProps) {
  const { startInterview } = useSession();

  // Stepper state: 1 = Type selection, 2 = Configuration, 3 = Confirmation review, 4 = Launching
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  
  // Selection states
  const [selectedType, setSelectedType] = useState<InterviewType>(initialType);
  const [selectedTech, setSelectedTech] = useState<string[]>(['TypeScript', 'React', 'System Design']);
  const [customTechInput, setCustomTechInput] = useState('');
  const [selectedTechDifficulty, setSelectedTechDifficulty] = useState('Advanced');

  // Behavioral & HR states
  const [selectedBehavioralTopics, setSelectedBehavioralTopics] = useState<string[]>([
    'Leadership & Influence',
    'Handling Ambiguity',
    'High-Stakes Delivery & Deadlines'
  ]);
  const [behavioralLevel, setBehavioralLevel] = useState('Senior Engineer');

  const [selectedHrTopics, setSelectedHrTopics] = useState<string[]>([
    'Elevator Pitch & Background Narrative',
    'Culture Fit & Core Values',
    'Career Ambition & Motivations'
  ]);
  const [hrLevel, setHrLevel] = useState('Senior Level');

  // Launching phase progress text
  const [launchStage, setLaunchStage] = useState(0);

  // Reset or initialize on open
  React.useEffect(() => {
    if (isOpen) {
      setStep(1);
      setLaunchStage(0);
    }
  }, [isOpen]);

  // Toggle technology
  const toggleTech = (tech: string) => {
    setSelectedTech(prev => 
      prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]
    );
  };

  // Add custom technology tag
  const handleAddCustomTech = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = customTechInput.trim();
    if (trimmed && !selectedTech.includes(trimmed)) {
      setSelectedTech(prev => [...prev, trimmed]);
      setCustomTechInput('');
    }
  };

  // Toggle behavioral topic
  const toggleBehavioralTopic = (topic: string) => {
    setSelectedBehavioralTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  // Toggle HR topic
  const toggleHrTopic = (topic: string) => {
    setSelectedHrTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  // Handle final confirmation and engine ignition
  const handleConfirmAndLaunch = async () => {
    setStep(4);
    setLaunchStage(1);

    const config: SessionConfig = {
      tech: selectedType === 'technical' ? selectedTech : undefined,
      diff: selectedType === 'technical' ? selectedTechDifficulty : undefined,
      focusAreas: selectedType === 'behavioral' ? selectedBehavioralTopics : (selectedType === 'hr' ? selectedHrTopics : undefined),
      roleLevel: selectedType === 'behavioral' ? behavioralLevel : (selectedType === 'hr' ? hrLevel : undefined)
    };

    setTimeout(() => {
      setLaunchStage(2);
    }, 600);

    setTimeout(() => {
      setLaunchStage(3);
    }, 1200);

    setTimeout(async () => {
      await startInterview(selectedType, config);
      onClose();
    }, 1800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          id="interview-launcher-modal-root"
          className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
        >
          {/* Backdrop with dark slate blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={step !== 4 ? onClose : undefined}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl z-0"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="relative w-full max-w-3xl bg-slate-950 text-white rounded-[2rem] sm:rounded-[2.5rem] border border-zinc-800/90 shadow-[0_25px_70px_rgba(0,0,0,0.6),0_0_60px_rgba(234,88,12,0.12)] overflow-hidden z-10 flex flex-col my-auto max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient Background Gradient Aura */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

            {/* Top Modal Header */}
            <div className="px-6 sm:px-8 pt-6 pb-4 border-b border-zinc-800/80 flex items-center justify-between shrink-0 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-orange-600/20 border border-orange-500/30 flex items-center justify-center text-orange-500 shadow-sm">
                  <Zap className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-orange-400">
                      REPLICA AI ENGINE
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                    {step === 1 && 'Select Interview Track'}
                    {step === 2 && 'Configure Track Parameters'}
                    {step === 3 && 'Session Briefing & Pre-Flight Review'}
                    {step === 4 && 'Initializing Simulation Engine'}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Stepper Indicator */}
                {step !== 4 && (
                  <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-zinc-900/90 rounded-full border border-zinc-800 text-xs font-mono text-zinc-400">
                    <span className={step === 1 ? 'text-orange-400 font-bold' : ''}>01 Track</span>
                    <span className="text-zinc-600">→</span>
                    <span className={step === 2 ? 'text-orange-400 font-bold' : ''}>02 Config</span>
                    <span className="text-zinc-600">→</span>
                    <span className={step === 3 ? 'text-orange-400 font-bold' : ''}>03 Review</span>
                  </div>
                )}

                {step !== 4 && (
                  <button
                    id="close-launcher-modal-btn"
                    onClick={onClose}
                    className="p-2 rounded-full bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800 transition-colors cursor-pointer"
                    aria-label="Close launcher"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Modal Body - Scrollable Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 relative z-10">
              
              {/* ================= STEP 1: TRACK SELECTION ================= */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-2xl font-brand font-extrabold text-white tracking-tight">
                      What type of interview are you preparing for?
                    </h3>
                    <p className="text-zinc-400 text-sm mt-1">
                      Choose your simulation track. The neural engine will calibrate tailored questions and scoring metrics.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    {/* Track 1: Technical */}
                    <button
                      id="track-btn-technical"
                      onClick={() => setSelectedType('technical')}
                      className={`
                        text-left p-5 rounded-2xl border transition-all duration-200 cursor-pointer relative group flex flex-col justify-between
                        ${selectedType === 'technical'
                          ? 'bg-orange-500/10 border-orange-500 shadow-lg shadow-orange-600/10 ring-1 ring-orange-500/50'
                          : 'bg-zinc-900/60 border-zinc-800/90 hover:border-zinc-700 hover:bg-zinc-900'}
                      `}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className={`
                            w-11 h-11 rounded-xl flex items-center justify-center transition-colors
                            ${selectedType === 'technical' ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30' : 'bg-zinc-800 text-zinc-300 group-hover:text-white'}
                          `}>
                            <Terminal className="w-5 h-5" />
                          </div>
                          <span className={`
                            text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border
                            ${selectedType === 'technical'
                              ? 'bg-orange-500/20 border-orange-500/30 text-orange-400'
                              : 'bg-zinc-800/80 border-zinc-700 text-zinc-400'}
                          `}>
                            Coding & Arch
                          </span>
                        </div>

                        <h4 className="text-lg font-bold text-white mb-1.5">Technical</h4>
                        <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                          Data structures, system architecture, framework internals, and live algorithmic problem-solving.
                        </p>
                      </div>

                      <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                        <span className="text-[11px] font-mono text-zinc-500">Custom Stack + 4 Tiers</span>
                        <div className={`
                          w-4 h-4 rounded-full flex items-center justify-center border
                          ${selectedType === 'technical' ? 'bg-orange-600 border-orange-600 text-white' : 'border-zinc-700'}
                        `}>
                          {selectedType === 'technical' && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </div>
                      </div>
                    </button>

                    {/* Track 2: Behavioral */}
                    <button
                      id="track-btn-behavioral"
                      onClick={() => setSelectedType('behavioral')}
                      className={`
                        text-left p-5 rounded-2xl border transition-all duration-200 cursor-pointer relative group flex flex-col justify-between
                        ${selectedType === 'behavioral'
                          ? 'bg-orange-500/10 border-orange-500 shadow-lg shadow-orange-600/10 ring-1 ring-orange-500/50'
                          : 'bg-zinc-900/60 border-zinc-800/90 hover:border-zinc-700 hover:bg-zinc-900'}
                      `}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className={`
                            w-11 h-11 rounded-xl flex items-center justify-center transition-colors
                            ${selectedType === 'behavioral' ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30' : 'bg-zinc-800 text-zinc-300 group-hover:text-white'}
                          `}>
                            <Sparkles className="w-5 h-5" />
                          </div>
                          <span className={`
                            text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border
                            ${selectedType === 'behavioral'
                              ? 'bg-orange-500/20 border-orange-500/30 text-orange-400'
                              : 'bg-zinc-800/80 border-zinc-700 text-zinc-400'}
                          `}>
                            STAR Method
                          </span>
                        </div>

                        <h4 className="text-lg font-bold text-white mb-1.5">Behavioral</h4>
                        <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                          Master Situation-Task-Action-Result framing, leadership, handling failure, and conflict resolution.
                        </p>
                      </div>

                      <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                        <span className="text-[11px] font-mono text-zinc-500">Executive Scoring</span>
                        <div className={`
                          w-4 h-4 rounded-full flex items-center justify-center border
                          ${selectedType === 'behavioral' ? 'bg-orange-600 border-orange-600 text-white' : 'border-zinc-700'}
                        `}>
                          {selectedType === 'behavioral' && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </div>
                      </div>
                    </button>

                    {/* Track 3: HR & Cultural */}
                    <button
                      id="track-btn-hr"
                      onClick={() => setSelectedType('hr')}
                      className={`
                        text-left p-5 rounded-2xl border transition-all duration-200 cursor-pointer relative group flex flex-col justify-between
                        ${selectedType === 'hr'
                          ? 'bg-orange-500/10 border-orange-500 shadow-lg shadow-orange-600/10 ring-1 ring-orange-500/50'
                          : 'bg-zinc-900/60 border-zinc-800/90 hover:border-zinc-700 hover:bg-zinc-900'}
                      `}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className={`
                            w-11 h-11 rounded-xl flex items-center justify-center transition-colors
                            ${selectedType === 'hr' ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30' : 'bg-zinc-800 text-zinc-300 group-hover:text-white'}
                          `}>
                            <Briefcase className="w-5 h-5" />
                          </div>
                          <span className={`
                            text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border
                            ${selectedType === 'hr'
                              ? 'bg-orange-500/20 border-orange-500/30 text-orange-400'
                              : 'bg-zinc-800/80 border-zinc-700 text-zinc-400'}
                          `}>
                            Culture Fit
                          </span>
                        </div>

                        <h4 className="text-lg font-bold text-white mb-1.5">HR & Cultural</h4>
                        <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                          Nail your background narrative, culture alignment, motivation, work style, and leadership expectations.
                        </p>
                      </div>

                      <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                        <span className="text-[11px] font-mono text-zinc-500">Clarity & Fit</span>
                        <div className={`
                          w-4 h-4 rounded-full flex items-center justify-center border
                          ${selectedType === 'hr' ? 'bg-orange-600 border-orange-600 text-white' : 'border-zinc-700'}
                        `}>
                          {selectedType === 'hr' && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </div>
                      </div>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ================= STEP 2: CONFIGURATION ================= */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-6"
                >
                  {/* TECHNICAL CONFIG */}
                  {selectedType === 'technical' && (
                    <div className="space-y-6">
                      <div>
                        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono uppercase tracking-wider mb-2">
                          <Cpu className="w-3.5 h-3.5" />
                          <span>Technical Setup</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-brand font-extrabold text-white tracking-tight">
                          Select Tech Stack & Challenge Difficulty
                        </h3>
                        <p className="text-zinc-400 text-xs sm:text-sm mt-1">
                          The AI interviewer crafts real-world architecture and code questions strictly focused on your chosen technologies.
                        </p>
                      </div>

                      {/* Quick Presets */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                            Popular Stack Presets
                          </label>
                          <span className="text-[11px] font-mono text-orange-400">
                            {selectedTech.length} Technologies Active
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {TECH_PRESETS.map((preset) => (
                            <button
                              key={preset.label}
                              onClick={() => setSelectedTech(preset.tech)}
                              className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-white hover:border-orange-500/50 hover:bg-zinc-800 transition-all cursor-pointer flex items-center gap-1.5"
                            >
                              <Sparkles className="w-3 h-3 text-orange-400" />
                              <span>{preset.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Categorized Stack Grid */}
                      <div className="space-y-4">
                        {TECH_CATEGORIES.map((cat) => (
                          <div key={cat.category} className="space-y-2">
                            <h5 className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                              {cat.category}
                            </h5>
                            <div className="flex flex-wrap gap-2">
                              {cat.items.map((tech) => {
                                const isSelected = selectedTech.includes(tech);
                                return (
                                  <button
                                    key={tech}
                                    onClick={() => toggleTech(tech)}
                                    className={`
                                      px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 border cursor-pointer flex items-center gap-1.5
                                      ${isSelected
                                        ? 'bg-orange-600 border-orange-500 text-white shadow-md shadow-orange-600/30'
                                        : 'bg-zinc-900/80 border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 hover:bg-zinc-800'}
                                    `}
                                  >
                                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                                    <span>{tech}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Custom Technology Input */}
                      <form onSubmit={handleAddCustomTech} className="pt-1 flex items-center gap-2">
                        <div className="relative flex-1">
                          <input
                            type="text"
                            value={customTechInput}
                            onChange={(e) => setCustomTechInput(e.target.value)}
                            placeholder="Add custom library/tech (e.g. PyTorch, Rust, Solidity, Kafka)..."
                            className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/20 font-sans"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleAddCustomTech()}
                          disabled={!customTechInput.trim()}
                          className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold text-white transition-colors flex items-center gap-1.5 border border-zinc-700 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </button>
                      </form>

                      {/* Questioning Difficulty Selector */}
                      <div className="pt-4 border-t border-zinc-800/80 space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
                            <Gauge className="w-3.5 h-3.5 text-orange-400" />
                            <span>Questioning Difficulty Level</span>
                          </label>
                          <span className="text-[11px] font-mono text-zinc-400">
                            Selected: <strong className="text-orange-400">{selectedTechDifficulty}</strong>
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {TECH_DIFFICULTIES.map((diff) => {
                            const isSelected = selectedTechDifficulty === diff.id;
                            return (
                              <button
                                key={diff.id}
                                onClick={() => setSelectedTechDifficulty(diff.id)}
                                className={`
                                  p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between
                                  ${isSelected
                                    ? 'bg-orange-500/10 border-orange-500 shadow-sm ring-1 ring-orange-500/40'
                                    : 'bg-zinc-900/70 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900'}
                                `}
                              >
                                <div className="flex items-center justify-between mb-1.5">
                                  <span className="text-xs font-bold text-white">{diff.label}</span>
                                  {/* Level dot meters */}
                                  <div className="flex gap-1">
                                    {[1, 2, 3, 4].map((bar) => (
                                      <span
                                        key={bar}
                                        className={`w-1.5 h-3 rounded-full ${
                                          bar <= diff.level
                                            ? isSelected ? 'bg-orange-500' : 'bg-zinc-500'
                                            : 'bg-zinc-800'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                </div>
                                <p className="text-[11px] text-zinc-400 leading-normal">{diff.desc}</p>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* BEHAVIORAL CONFIG */}
                  {selectedType === 'behavioral' && (
                    <div className="space-y-6">
                      <div>
                        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono uppercase tracking-wider mb-2">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>STAR Behavioral Setup</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-brand font-extrabold text-white tracking-tight">
                          Select Focus Competencies & Seniority
                        </h3>
                        <p className="text-zinc-400 text-xs sm:text-sm mt-1">
                          Questions evaluate Situation, Task, Action, and quantifiable Result framing.
                        </p>
                      </div>

                      {/* Seniority Selector */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
                          Target Seniority Tier
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {BEHAVIORAL_LEVELS.map((lvl) => (
                            <button
                              key={lvl}
                              onClick={() => setBehavioralLevel(lvl)}
                              className={`
                                py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer
                                ${behavioralLevel === lvl
                                  ? 'bg-orange-600 border-orange-500 text-white shadow-md'
                                  : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'}
                              `}
                            >
                              {lvl}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Competencies */}
                      <div className="space-y-2 pt-2">
                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
                          Focus Competencies ({selectedBehavioralTopics.length} selected)
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {BEHAVIORAL_TOPICS.map((topic) => {
                            const isSelected = selectedBehavioralTopics.includes(topic);
                            return (
                              <button
                                key={topic}
                                onClick={() => toggleBehavioralTopic(topic)}
                                className={`
                                  p-3 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer flex items-center justify-between
                                  ${isSelected
                                    ? 'bg-orange-500/15 border-orange-500 text-white'
                                    : 'bg-zinc-900/70 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'}
                                `}
                              >
                                <span>{topic}</span>
                                {isSelected && <Check className="w-3.5 h-3.5 text-orange-400 stroke-[3]" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* HR CONFIG */}
                  {selectedType === 'hr' && (
                    <div className="space-y-6">
                      <div>
                        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono uppercase tracking-wider mb-2">
                          <Briefcase className="w-3.5 h-3.5" />
                          <span>HR & Cultural Alignment Setup</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-brand font-extrabold text-white tracking-tight">
                          Select Discussion Areas & Role Level
                        </h3>
                        <p className="text-zinc-400 text-xs sm:text-sm mt-1">
                          Prepares you for executive recruiter screens, cultural values, and career trajectory discussions.
                        </p>
                      </div>

                      {/* Role Level */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
                          Role Level
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {HR_LEVELS.map((lvl) => (
                            <button
                              key={lvl}
                              onClick={() => setHrLevel(lvl)}
                              className={`
                                py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer
                                ${hrLevel === lvl
                                  ? 'bg-orange-600 border-orange-500 text-white shadow-md'
                                  : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'}
                              `}
                            >
                              {lvl}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* HR Topics */}
                      <div className="space-y-2 pt-2">
                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
                          Focus Discussion Areas ({selectedHrTopics.length} selected)
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {HR_TOPICS.map((topic) => {
                            const isSelected = selectedHrTopics.includes(topic);
                            return (
                              <button
                                key={topic}
                                onClick={() => toggleHrTopic(topic)}
                                className={`
                                  p-3 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer flex items-center justify-between
                                  ${isSelected
                                    ? 'bg-orange-500/15 border-orange-500 text-white'
                                    : 'bg-zinc-900/70 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'}
                                `}
                              >
                                <span>{topic}</span>
                                {isSelected && <Check className="w-3.5 h-3.5 text-orange-400 stroke-[3]" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* ================= STEP 3: PRE-FLIGHT BRIEFING & CONFIRMATION ================= */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-5"
                >
                  <div>
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Pre-Flight Inspection Ready</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-brand font-extrabold text-white tracking-tight">
                      Simulation Blueprint & Confirmation
                    </h3>
                    <p className="text-zinc-400 text-xs sm:text-sm mt-1">
                      Review your simulation configuration below. Once confirmed, the AI engine will synthesize questions and open your interview panel.
                    </p>
                  </div>

                  {/* Summary Dossier Grid */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-5">
                    
                    {/* Row 1: Track & Difficulty */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-zinc-800/80">
                      <div>
                        <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">
                          Active Track
                        </span>
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-orange-600/20 text-orange-400 border border-orange-500/30 flex items-center justify-center font-bold">
                            {selectedType === 'technical' && <Terminal className="w-4 h-4" />}
                            {selectedType === 'behavioral' && <Sparkles className="w-4 h-4" />}
                            {selectedType === 'hr' && <Briefcase className="w-4 h-4" />}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white capitalize">{selectedType} Simulation</p>
                            <p className="text-[11px] text-zinc-400">
                              {selectedType === 'technical' && 'Algorithms & Architecture'}
                              {selectedType === 'behavioral' && 'STAR Leadership Matrix'}
                              {selectedType === 'hr' && 'Culture & Vision Alignment'}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">
                          Calibration Level
                        </span>
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-zinc-800 text-zinc-300 border border-zinc-700 flex items-center justify-center font-bold">
                            <Gauge className="w-4 h-4 text-orange-400" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">
                              {selectedType === 'technical' && `${selectedTechDifficulty} Level`}
                              {selectedType === 'behavioral' && behavioralLevel}
                              {selectedType === 'hr' && hrLevel}
                            </p>
                            <p className="text-[11px] text-zinc-400">Target Challenge Tier</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Row 2: Technologies / Focus Areas */}
                    <div>
                      <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block mb-2">
                        {selectedType === 'technical' ? 'Target Tech Stack' : 'Target Focus Competencies'}
                      </span>
                      
                      <div className="flex flex-wrap gap-1.5">
                        {selectedType === 'technical' && selectedTech.map((item) => (
                          <span 
                            key={item} 
                            className="px-2.5 py-1 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-300 text-xs font-semibold"
                          >
                            {item}
                          </span>
                        ))}

                        {selectedType === 'behavioral' && selectedBehavioralTopics.map((item) => (
                          <span 
                            key={item} 
                            className="px-2.5 py-1 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-300 text-xs font-semibold"
                          >
                            {item}
                          </span>
                        ))}

                        {selectedType === 'hr' && selectedHrTopics.map((item) => (
                          <span 
                            key={item} 
                            className="px-2.5 py-1 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-300 text-xs font-semibold"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Row 3: Session Specs */}
                    <div className="pt-4 border-t border-zinc-800/80 grid grid-cols-3 gap-2 text-center">
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-zinc-800/80">
                        <span className="text-base font-extrabold text-orange-400 block font-mono">10</span>
                        <span className="text-[10px] text-zinc-400 font-medium">Questions</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-zinc-800/80">
                        <span className="text-base font-extrabold text-emerald-400 block font-mono">100%</span>
                        <span className="text-[10px] text-zinc-400 font-medium">Private Sandbox</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-zinc-800/80">
                        <span className="text-base font-extrabold text-amber-400 block font-mono">Instant</span>
                        <span className="text-[10px] text-zinc-400 font-medium">AI Scoring</span>
                      </div>
                    </div>

                    {/* Engine Online Banner */}
                    <div className="px-3.5 py-2 rounded-xl bg-emerald-500/5 border border-emerald-500/20 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-semibold text-emerald-300">
                          Gemini 3 Flash Neural Engine Ready
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-500">Latency: ~240ms</span>
                    </div>

                  </div>
                </motion.div>
              )}

              {/* ================= STEP 4: LAUNCHING ENGINE HUD ================= */}
              {step === 4 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center justify-center text-center space-y-6"
                >
                  <div className="relative">
                    {/* Glowing Nexus Animation */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                      className="w-28 h-28 rounded-full border-2 border-dashed border-orange-500/40 flex items-center justify-center p-2"
                    >
                      <div className="w-full h-full rounded-full border border-orange-500/30 border-t-orange-500 animate-spin" />
                    </motion.div>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-2xl bg-orange-600 text-white flex items-center justify-center shadow-xl shadow-orange-600/40">
                        <Zap className="w-7 h-7 animate-pulse" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 max-w-md">
                    <h3 className="text-2xl font-brand font-extrabold text-white tracking-tight">
                      Igniting AI Simulation Engine...
                    </h3>
                    <p className="text-zinc-400 text-sm">
                      Synthesizing 10 calibrated questions tailored to your profile and initializing private workspace.
                    </p>
                  </div>

                  {/* Status checklist */}
                  <div className="w-full max-w-sm bg-zinc-900/90 rounded-2xl p-4 border border-zinc-800 space-y-2 text-left text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className={`w-4 h-4 ${launchStage >= 1 ? 'text-emerald-400' : 'text-zinc-600'}`} />
                      <span className={launchStage >= 1 ? 'text-zinc-200' : 'text-zinc-500'}>
                        Cognitive Model Connected
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className={`w-4 h-4 ${launchStage >= 2 ? 'text-emerald-400' : 'text-zinc-600'}`} />
                      <span className={launchStage >= 2 ? 'text-zinc-200' : 'text-zinc-500'}>
                        Question Matrix Calibrated for {selectedType}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className={`w-4 h-4 ${launchStage >= 3 ? 'text-emerald-400' : 'text-zinc-600'}`} />
                      <span className={launchStage >= 3 ? 'text-zinc-200' : 'text-zinc-500'}>
                        Opening Candidate Workspace...
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

            </div>

            {/* Modal Bottom Footer Navigation Controls */}
            {step !== 4 && (
              <div className="px-6 sm:px-8 py-4 border-t border-zinc-800/80 bg-slate-950/90 flex items-center justify-between shrink-0 relative z-10">
                {step > 1 ? (
                  <button
                    id="launcher-back-btn"
                    onClick={() => setStep((prev) => (prev - 1) as 1 | 2 | 3)}
                    className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white font-semibold text-xs sm:text-sm transition-colors flex items-center gap-2 border border-zinc-800 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                ) : (
                  <span className="text-xs font-mono text-zinc-500">Step 1 of 3</span>
                )}

                <div className="flex items-center gap-3">
                  {step === 1 && (
                    <button
                      id="launcher-step1-next-btn"
                      onClick={() => setStep(2)}
                      className="px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-orange-600/30 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                    >
                      <span>Configure Track</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}

                  {step === 2 && (
                    <button
                      id="launcher-step2-next-btn"
                      disabled={selectedType === 'technical' && selectedTech.length === 0}
                      onClick={() => setStep(3)}
                      className={`
                        px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer active:scale-95
                        ${selectedType === 'technical' && selectedTech.length === 0
                          ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                          : 'bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-600/30'}
                      `}
                    >
                      <span>Review Setup & Summary</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}

                  {step === 3 && (
                    <motion.button
                      id="launcher-confirm-start-engine-btn"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleConfirmAndLaunch}
                      className="px-7 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-orange-600/30 transition-all flex items-center gap-2.5 cursor-pointer"
                    >
                      <Zap className="w-4 h-4 fill-white" />
                      <span>Confirm & Start AI Engine</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  )}
                </div>
              </div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
