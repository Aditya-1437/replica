'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  ShieldCheck, 
  FileCheck2, 
  RotateCcw, 
  Sparkles, 
  Printer, 
  CheckCircle2, 
  ArrowRight,
  Briefcase
} from 'lucide-react';

export default function TermsContent() {
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
                Terms of Service
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Effective Date: September 2026 • Version 3.2 • Governs your use of Replica AI simulators
              </p>
            </div>

            {/* Segmented Document Switcher */}
            <div className="flex items-center gap-1 bg-zinc-200/70 p-1 rounded-2xl w-fit mx-auto sm:mx-0 print:hidden">
              <Link
                href="/privacy"
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-950 transition-colors"
              >
                Privacy Policy
              </Link>

              <span className="px-4 py-2 rounded-xl text-xs font-bold bg-white text-slate-950 shadow-2xs">
                Terms of Service
              </span>

              <Link
                href="/cookies"
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-950 transition-colors"
              >
                Cookie Policy
              </Link>
            </div>

          </div>

          {/* ================= TERMS AT A GLANCE BENTO ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-5 rounded-3xl bg-white border border-zinc-200/90 shadow-2xs space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-950">Fair Practice License</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Personal, non-exclusive license to practice mock technical and behavioral interviews for career growth.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-zinc-200/90 shadow-2xs space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <RotateCcw className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-950">7-Day Money-Back</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Full 100% refund within 7 days on Ascent Pro or Executive plans if not completely satisfied with your prep.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-zinc-200/90 shadow-2xs space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-950">L&amp;D Expense Ready</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Official itemized invoices with your employer name and tax details for standard corporate training reimbursement.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-zinc-200/90 shadow-2xs space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-950">You Own Your Output</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                All spoken reasoning, typed solutions, and architecture diagrams you produce remain 100% your intellectual property.
              </p>
            </div>

          </div>

          {/* ================= STRUCTURED LEGAL CLAUSES ================= */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-zinc-200/90 shadow-sm space-y-10 text-slate-700 text-xs sm:text-sm leading-relaxed font-medium">
            
            {/* Clause 1 */}
            <section className="space-y-3 pb-8 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-orange-600 uppercase tracking-wider">
                  Clause 01
                </span>
                <h2 className="text-lg sm:text-xl font-brand font-bold text-slate-950">
                  Acceptance of Terms &amp; Eligibility
                </h2>
              </div>
              <p>
                By accessing or subscribing to Replica (&ldquo;the Platform&rdquo;), you enter into a legally binding agreement with Replica AI Inc. You represent that you are at least 18 years of age (or the legal age of majority in your jurisdiction) and possess full authority to enter into these Terms.
              </p>
            </section>

            {/* Clause 2 */}
            <section className="space-y-3 pb-8 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-orange-600 uppercase tracking-wider">
                  Clause 02
                </span>
                <h2 className="text-lg sm:text-xl font-brand font-bold text-slate-950">
                  Permitted Use &amp; Camera-Free Simulation
                </h2>
              </div>
              <p>
                Replica provides camera-free interview practice simulations powered by conversational generative artificial intelligence. You agree to utilize the platform exclusively for personal interview preparation and professional communication coaching:
              </p>
              <ul className="space-y-2 pl-4">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                  <span>You may not reverse-engineer, decompile, scrape, or systematically extract question sets or scoring rubrics.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                  <span>You may not use automated scripts, bots, or audio spoofing tools to bypass rate limits or simulate mock interviews.</span>
                </li>
              </ul>
            </section>

            {/* Clause 3 */}
            <section className="space-y-3 pb-8 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-orange-600 uppercase tracking-wider">
                  Clause 03
                </span>
                <h2 className="text-lg sm:text-xl font-brand font-bold text-slate-950">
                  Subscriptions, Billing &amp; Corporate Expensing
                </h2>
              </div>
              <p>
                Replica offers Foundation (Free), Ascent Pro, and Executive &amp; Team membership tiers:
              </p>
              <ul className="space-y-2 pl-4">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Billing Cycles:</strong> Paid subscriptions are billed in advance on a recurring monthly or annual basis until canceled.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Instant Cancelation:</strong> You may cancel anytime from your Candidate Dashboard. Your access remains active until the end of the current billing cycle without penalty or hidden retention fees.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Itemized Invoices:</strong> We generate official itemized receipts including company name, date, and tax identification for employer Learning &amp; Development reimbursement.</span>
                </li>
              </ul>
            </section>

            {/* Clause 4 */}
            <section className="space-y-3 pb-8 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-orange-600 uppercase tracking-wider">
                  Clause 04
                </span>
                <h2 className="text-lg sm:text-xl font-brand font-bold text-slate-950">
                  7-Day Money-Back Guarantee Policy
                </h2>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-1.5">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Zero-Risk Candidate Guarantee
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  If within 7 days of subscribing to Ascent Pro or Executive you determine that Replica did not noticeably sharpen your interview performance, email <a href="mailto:support@replica.ai" className="text-orange-600 font-bold hover:underline">support@replica.ai</a> for a prompt 100% refund with zero hassle.
                </p>
              </div>
            </section>

            {/* Clause 5 */}
            <section className="space-y-3 pb-8 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-orange-600 uppercase tracking-wider">
                  Clause 05
                </span>
                <h2 className="text-lg sm:text-xl font-brand font-bold text-slate-950">
                  AI Evaluations &amp; Employment Disclaimer
                </h2>
              </div>
              <p>
                Replica is an interview simulation and career readiness platform. While our evaluation rubrics are modeled after top-tier engineering standards (Google, Stripe, Meta, Netflix), Replica does not guarantee employment, offer outcomes, or hiring decisions at any third-party company. Feedback is informational and diagnostic.
              </p>
            </section>

            {/* Clause 6 */}
            <section className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-orange-600 uppercase tracking-wider">
                  Clause 06
                </span>
                <h2 className="text-lg sm:text-xl font-brand font-bold text-slate-950">
                  Governing Law &amp; Dispute Resolution
                </h2>
              </div>
              <p>
                These Terms shall be governed by and construed under the laws of the State of Delaware, without regard to its conflict of law provisions. Any disputes arising out of these Terms shall be resolved via confidential binding arbitration.
              </p>
            </section>

          </div>

          {/* ================= BOTTOM ACTION CALLOUT ================= */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 text-white border border-zinc-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 print:hidden">
            <div className="space-y-1.5 text-center sm:text-left max-w-lg">
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Review plan details or start practicing free.
              </h3>
              <p className="text-xs text-zinc-400 font-medium">
                Experience transparent pricing and camera-free simulation before upgrading.
              </p>
            </div>

            <Link
              href="/pricing"
              className="px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition-all shrink-0 flex items-center gap-2 shadow-md shadow-orange-600/20 active:scale-95"
            >
              <span>View Pricing &amp; Plans</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
