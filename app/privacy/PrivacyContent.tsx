'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  ShieldCheck, 
  Lock, 
  EyeOff, 
  Database, 
  Download, 
  Printer, 
  Trash2, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';

export default function PrivacyContent() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="min-h-screen bg-sage-bg flex flex-col font-sans selection:bg-orange-500 selection:text-white print:bg-white">
      <Navbar />

      <section className="flex-1 pt-12 pb-24 px-4 sm:px-6 md:px-8">
        <div className="max-w-5xl mx-auto space-y-12">

          {/* ================= HERO HEADER & LEGAL HUB SWITCHER ================= */}
          <div className="space-y-6 text-center sm:text-left pt-4">
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 text-xs font-mono font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Replica Legal &amp; Trust Center</span>
              </div>

              {/* PDF Print Action */}
              <button
                type="button"
                onClick={handlePrint}
                className="px-3.5 py-1.5 rounded-xl bg-white border border-zinc-200/90 hover:bg-zinc-50 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs print:hidden"
              >
                <Printer className="w-3.5 h-3.5 text-slate-500" />
                <span>Export PDF</span>
              </button>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl font-brand font-extrabold text-slate-950 tracking-tight">
                Candidate Privacy Policy
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Effective Date: September 2026 • Version 3.2 • Applicable to all global candidates
              </p>
            </div>

            {/* Segmented Document Switcher */}
            <div className="flex items-center gap-1 bg-zinc-200/70 p-1 rounded-2xl w-fit mx-auto sm:mx-0 print:hidden">
              <span className="px-4 py-2 rounded-xl text-xs font-bold bg-white text-slate-950 shadow-2xs">
                Privacy Policy
              </span>

              <Link
                href="/terms"
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-950 transition-colors"
              >
                Terms of Service
              </Link>

              <Link
                href="/cookies"
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-950 transition-colors"
              >
                Cookie Policy
              </Link>
            </div>

          </div>

          {/* ================= PRIVACY AT A GLANCE BENTO ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-5 rounded-3xl bg-white border border-zinc-200/90 shadow-2xs space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <EyeOff className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-950">100% Camera-Free</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Zero video is captured. No webcam streams, facial recognition, or eye-tracking telemetry ever recorded.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-zinc-200/90 shadow-2xs space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-950">Never Sold or Shared</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Your practice scores, audio files, and transcripts are strictly private and never shared with employers or recruiters.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-zinc-200/90 shadow-2xs space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-950">No Public LLM Training</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Candidate voice reasoning and typed solutions are never used to train public generative artificial intelligence models.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-zinc-200/90 shadow-2xs space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Trash2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-950">Instant Right of Erasure</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Export full telemetry or permanently purge all practice logs with a single click from your Candidate Dashboard.
              </p>
            </div>

          </div>

          {/* ================= STRUCTURED LEGAL CLAUSES ================= */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-zinc-200/90 shadow-sm space-y-10 text-slate-700 text-xs sm:text-sm leading-relaxed font-medium">
            
            {/* Section 1 */}
            <section className="space-y-3 pb-8 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-orange-600 uppercase tracking-wider">
                  Section 01
                </span>
                <h2 className="text-lg sm:text-xl font-brand font-bold text-slate-950">
                  Information We Collect &amp; Process
                </h2>
              </div>
              <p>
                Replica operates a specialized, camera-free interview simulation workspace. We collect only the minimum telemetry necessary to synthesize interview questions and evaluate speech cadence:
              </p>
              <ul className="space-y-2 pl-4">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                  <span><strong>Account Credentials:</strong> Name and email address provided during onboarding or session initialization.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                  <span><strong>Audio Reasonings:</strong> Temporary microphone audio input converted in real-time into text transcripts for evaluation. We do not store persistent raw audio streams after evaluation synthesis is finalized.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                  <span><strong>Performance Telemetry:</strong> Words-per-minute pacing, filler word count, STAR methodology structural scores, and technical architecture trade-off ratings.</span>
                </li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="space-y-3 pb-8 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-orange-600 uppercase tracking-wider">
                  Section 02
                </span>
                <h2 className="text-lg sm:text-xl font-brand font-bold text-slate-950">
                  AI Processing &amp; Subprocessor Boundaries
                </h2>
              </div>
              <p>
                To generate dynamic interview challenges and provide realistic evaluation rubrics, we utilize enterprise-tier AI infrastructure, specifically Google Gemini 3 Flash.
              </p>
              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-1.5">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Zero Data Retention Agreement
                </h4>
                <p className="text-xs text-slate-600">
                  Under our enterprise API service terms, requests processed through Google Gemini models are strictly ephemeral. Candidate interview responses are processed in memory and are <strong>never stored, logged, or utilized to train Google foundational models</strong>.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section className="space-y-3 pb-8 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-orange-600 uppercase tracking-wider">
                  Section 03
                </span>
                <h2 className="text-lg sm:text-xl font-brand font-bold text-slate-950">
                  Encryption Standards &amp; Data Security
                </h2>
              </div>
              <p>
                We employ bank-grade encryption protocols to safeguard candidate practice sessions:
              </p>
              <ul className="space-y-2 pl-4">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Encryption in Transit:</strong> All network traffic between your browser and our servers is secured using modern TLS 1.3 with strict HTTPS enforcement.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Encryption at Rest:</strong> Any persistent candidate records, session summaries, or diagnostic dossiers are encrypted using AES-256 standard encryption keys.</span>
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="space-y-3 pb-8 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-orange-600 uppercase tracking-wider">
                  Section 04
                </span>
                <h2 className="text-lg sm:text-xl font-brand font-bold text-slate-950">
                  Candidate Rights (GDPR, CCPA &amp; UK DPA)
                </h2>
              </div>
              <p>
                Regardless of your geographic location, Replica extends tier-1 privacy protections to all engineers:
              </p>
              <ul className="space-y-2 pl-4">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <span><strong>Right to Access:</strong> You may request an itemized copy of all personal telemetry held within your profile.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <span><strong>Right to Data Portability:</strong> You can export full session transcripts in standardized JSON or PDF formats at any time.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <span><strong>Right to Erasure (Be Forgotten):</strong> You have the absolute right to purge all session records and profile identifiers from our production systems.</span>
                </li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-orange-600 uppercase tracking-wider">
                  Section 05
                </span>
                <h2 className="text-lg sm:text-xl font-brand font-bold text-slate-950">
                  Contact Privacy &amp; Data Protection Officer
                </h2>
              </div>
              <p>
                For questions regarding data processing, subprocessor audits, or to exercise statutory privacy rights, email our dedicated data protection team at <a href="mailto:privacy@replica.ai" className="text-orange-600 font-bold hover:underline">privacy@replica.ai</a>.
              </p>
            </section>

          </div>

          {/* ================= DATA PORTABILITY & DASHBOARD PURGE ACTION ================= */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 text-white border border-zinc-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 print:hidden">
            <div className="space-y-1.5 text-center sm:text-left max-w-lg">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-400">
                <Download className="w-3.5 h-3.5" />
                <span>Self-Service Privacy Controls</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Manage your telemetry or purge session history.
              </h3>
              <p className="text-xs text-zinc-400 font-medium">
                Visit your Candidate Dashboard Settings to download transcripts or permanently delete your account data.
              </p>
            </div>

            <Link
              href="/account"
              className="px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition-all shrink-0 flex items-center gap-2 shadow-md shadow-orange-600/20 active:scale-95"
            >
              <span>Manage in Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
