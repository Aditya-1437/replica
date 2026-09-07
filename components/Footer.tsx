'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowUp, 
  Check, 
  Mail, 
  Sparkles,
  Lock,
  ArrowRight,
  ShieldCheck,
  Zap,
  Terminal,
  Cpu,
  ExternalLink
} from 'lucide-react';
import ReplicaLogo from '@/components/ReplicaLogo';
import InterviewLauncherModal from '@/components/InterviewLauncherModal';
import { InterviewType } from '@/context/SessionContext';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [isLauncherOpen, setIsLauncherOpen] = useState(false);
  const [launcherTrack, setLauncherTrack] = useState<InterviewType>('technical');

  const handleOpenLauncher = (track: InterviewType) => {
    setLauncherTrack(track);
    setIsLauncherOpen(true);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim().includes('@')) return;
    
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        setEmail('');
      }, 4000);
    }, 600);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-slate-950 text-white border-t border-zinc-800/90 selection:bg-orange-500 selection:text-white print:hidden">
      
      {/* Top Gradient Accent Line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />

      {/* Modern Multi-Step Interview Launcher Modal */}
      <InterviewLauncherModal
        isOpen={isLauncherOpen}
        onClose={() => setIsLauncherOpen(false)}
        initialType={launcherTrack}
      />

      {/* ================= 1. PRE-FOOTER CANDIDATE UTILITY DOCK ================= */}
      <div className="border-b border-zinc-800/80 bg-zinc-950/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Quick Launch Callout */}
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-orange-400">
              <Terminal className="w-3.5 h-3.5" />
              <span>Instant AI Interview Terminal</span>
            </div>
            <h3 className="text-base sm:text-lg font-brand font-extrabold text-white tracking-tight">
              Ready to calibrate your technical or behavioral round?
            </h3>
            <p className="text-xs text-zinc-400 font-medium max-w-lg">
              Launch a 10-minute camera-free practice simulation directly with custom stacks and senior difficulty.
            </p>
          </div>

          {/* Quick Action Track Pills & Launch Trigger */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            
            <button
              type="button"
              onClick={() => handleOpenLauncher('technical')}
              className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-xs font-bold text-zinc-200 transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs group"
            >
              <Cpu className="w-3.5 h-3.5 text-orange-500 group-hover:scale-110 transition-transform" />
              <span>Technical & Scale</span>
            </button>

            <button
              type="button"
              onClick={() => handleOpenLauncher('behavioral')}
              className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-xs font-bold text-zinc-200 transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs group"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400 group-hover:scale-110 transition-transform" />
              <span>STAR Behavioral</span>
            </button>

            <button
              type="button"
              onClick={() => handleOpenLauncher('hr')}
              className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-xs font-bold text-zinc-200 transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs group"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>HR & Leadership</span>
            </button>

            <button
              type="button"
              onClick={() => handleOpenLauncher('technical')}
              className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-md shadow-orange-600/20 active:scale-95"
            >
              <span>Start Simulation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>

      {/* ================= 2. LIVE TELEMETRY STATUS BAR ================= */}
      <div className="border-b border-zinc-800/80 bg-zinc-900/40">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between gap-4 flex-wrap text-xs text-zinc-400 font-mono">
          
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Core Engine: 99.98% Uptime</span>
            </div>
            <span className="text-zinc-700 hidden sm:inline">•</span>
            <span className="hidden sm:inline text-zinc-400">Response Latency: ~240ms</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <div className="flex items-center gap-1 text-zinc-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Camera-Free & Encrypted</span>
            </div>
            <span className="text-zinc-700">•</span>
            <span className="text-zinc-400">FAANG Calibrated</span>
          </div>

        </div>
      </div>

      {/* ================= 3. MAIN NAVIGATION MATRIX ================= */}
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-12 space-y-12">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Column 1: Brand & Candidate Commitment (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block">
              <ReplicaLogo size="sm" showSubText={true} />
            </Link>
            
            <p className="text-xs sm:text-sm text-zinc-400 font-medium leading-relaxed max-w-sm">
              Camera-free AI interview simulator engineered for software engineers to articulate complex architecture, master the STAR method, and secure tier-1 offers without performance anxiety.
            </p>

            <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800/90 space-y-1 max-w-sm">
              <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                <ShieldCheck className="w-4 h-4 text-orange-500" />
                <span>Candidate Privacy Guarantee</span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-normal font-medium">
                Practice audio and transcripts are never shared with recruiters, employers, or used to train external public models.
              </p>
            </div>
          </div>

          {/* Column 2: Simulations & Tracks (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Simulations
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400 font-medium">
              <li>
                <button
                  type="button"
                  onClick={() => handleOpenLauncher('technical')}
                  className="hover:text-orange-400 transition-colors text-left cursor-pointer"
                >
                  System Architecture
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleOpenLauncher('behavioral')}
                  className="hover:text-orange-400 transition-colors text-left cursor-pointer"
                >
                  STAR Behavioral
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleOpenLauncher('hr')}
                  className="hover:text-orange-400 transition-colors text-left cursor-pointer"
                >
                  HR & Culture Fit
                </button>
              </li>
              <li>
                <Link href="/account" className="hover:text-orange-400 transition-colors">
                  Cadence Telemetry
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleOpenLauncher('technical')}
                  className="hover:text-orange-400 transition-colors text-left cursor-pointer"
                >
                  20+ Frameworks
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform & Intelligence (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Platform
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400 font-medium">
              <li>
                <Link href="/account" className="hover:text-orange-400 transition-colors">
                  Candidate Dashboard
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-orange-400 transition-colors">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link href="/pricing#comparison-table" className="hover:text-orange-400 transition-colors">
                  Package Comparison
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-orange-400 transition-colors">
                  L&amp;D Reimbursement
                </Link>
              </li>
              <li>
                <Link href="/support#knowledge-base" className="hover:text-orange-400 transition-colors">
                  Evaluation Rubrics
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Weekly Digest (4 Cols) */}
          <div className="lg:col-span-4 space-y-3.5">
            <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800/90 shadow-sm relative overflow-hidden space-y-3">
              
              <div className="absolute top-0 right-0 w-28 h-28 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-orange-400 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Interview Digest</span>
                </div>
                <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                  Weekly
                </span>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed font-medium">
                High-yield STAR breakdowns, system design cheat-sheets, and rubric trade-offs delivered every Monday morning.
              </p>

              {status === 'success' ? (
                <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>You are subscribed! Watch your inbox on Monday.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <div className="relative flex items-center bg-slate-950 border border-zinc-800 rounded-xl focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20 transition-all p-1">
                    <Mail className="w-4 h-4 text-zinc-500 ml-2.5 shrink-0" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="aditya@example.com"
                      className="w-full pl-2.5 pr-2 py-1.5 bg-transparent text-xs text-white placeholder:text-zinc-500 focus:outline-none font-medium"
                    />
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="px-3 py-1.5 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1 shadow-sm active:scale-95 disabled:opacity-50"
                    >
                      {status === 'loading' ? (
                        <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Join</span>
                          <ArrowRight className="w-3 h-3" />
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-medium px-1">
                    <Lock className="w-2.5 h-2.5 text-zinc-400" />
                    <span>Zero spam. 1 high-yield email per week. Unsubscribe anytime.</span>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

        {/* ================= 4. BOTTOM METADATA, SOCIALS & SCROLL TOP ================= */}
        <div className="pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          
          <div className="flex items-center gap-3 flex-wrap">
            <p>© {new Date().getFullYear()} REPLICA. All rights reserved.</p>
            <span className="text-zinc-700 hidden sm:inline">•</span>
            <div className="flex items-center gap-3 text-xs">
              <Link href="/privacy" className="hover:text-zinc-300 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-zinc-300 transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-zinc-300 transition-colors">
                Cookie Preferences
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            
            {/* Social Links */}
            <div className="flex items-center gap-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 hover:text-white hover:border-zinc-700 flex items-center justify-center transition-colors text-zinc-400"
                title="GitHub"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 hover:text-white hover:border-zinc-700 flex items-center justify-center transition-colors text-zinc-400"
                title="Twitter / X"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 hover:text-white hover:border-zinc-700 flex items-center justify-center transition-colors text-zinc-400"
                title="Discord Community"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Back to Top */}
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all text-xs font-semibold cursor-pointer active:scale-95"
            >
              <span>Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>

          </div>

        </div>

      </div>
    </footer>
  );
}
