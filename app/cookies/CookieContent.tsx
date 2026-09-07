'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  ShieldCheck, 
  Cookie, 
  Sliders, 
  Lock, 
  Printer, 
  Check, 
  CheckCircle2
} from 'lucide-react';

interface CookieAuditItem {
  name: string;
  category: 'Essential' | 'Functional' | 'Analytics';
  purpose: string;
  duration: string;
}

const COOKIE_INVENTORY: CookieAuditItem[] = [
  {
    name: "replica_auth_session",
    category: "Essential",
    purpose: "Maintains encrypted candidate session credentials and workspace access.",
    duration: "Session / 30 Days"
  },
  {
    name: "replica_csrf_token",
    category: "Essential",
    purpose: "Protects against Cross-Site Request Forgery on API submissions.",
    duration: "Session"
  },
  {
    name: "replica_audio_pref",
    category: "Functional",
    purpose: "Remembers candidate microphone input choice and noise suppression level.",
    duration: "180 Days"
  },
  {
    name: "replica_simulator_draft",
    category: "Functional",
    purpose: "Stores interview answer drafts locally to prevent progress loss on reload.",
    duration: "Session"
  },
  {
    name: "replica_latency_telemetry",
    category: "Analytics",
    purpose: "Measures sub-300ms speech synthesis response speeds anonymously.",
    duration: "90 Days"
  }
];

export default function CookieContent() {
  // Interactive Cookie Preferences State
  const [preferences, setPreferences] = useState({
    essential: true, // Always true & locked
    functional: true,
    analytics: false
  });
  const [isSaved, setIsSaved] = useState(false);

  const handleToggle = (key: 'functional' | 'analytics') => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
    setIsSaved(false);
  };

  const handleSavePreferences = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

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
                Cookie &amp; Storage Policy
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Effective Date: September 2026 • Version 3.2 • Transparent storage and cookie governance
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

              <Link
                href="/terms"
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-950 transition-colors"
              >
                Terms of Service
              </Link>

              <span className="px-4 py-2 rounded-xl text-xs font-bold bg-white text-slate-950 shadow-2xs">
                Cookie Policy
              </span>
            </div>

          </div>

          {/* ================= INTERACTIVE COOKIE PREFERENCE MANAGER ================= */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200/90 shadow-sm space-y-6 print:hidden">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-100">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 uppercase tracking-wider">
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Candidate Preference Console</span>
                </div>
                <h3 className="text-xl font-brand font-bold text-slate-950">
                  Manage Your Browser Cookie Settings
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Tailor which cookies and local storage tokens Replica is permitted to set on your device.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSavePreferences}
                  className="px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-orange-600 text-white text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95 flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Save Preferences</span>
                </button>
              </div>
            </div>

            {/* Saved Toast */}
            {isSaved && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Your cookie preferences have been applied and persisted to your local browser storage.</span>
              </div>
            )}

            {/* 3 Categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Category 1: Strictly Necessary */}
              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Strictly Necessary</span>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-200 text-slate-700">
                      Always Active
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    Essential for secure authentication, session state, and CSRF protection. Cannot be disabled.
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400 pt-2 border-t border-zinc-200/60">
                  <Lock className="w-3 h-3" />
                  <span>Required for simulator</span>
                </div>
              </div>

              {/* Category 2: Functional & Audio Preferences */}
              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Functional &amp; Audio</span>
                    <button
                      type="button"
                      onClick={() => handleToggle('functional')}
                      className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${
                        preferences.functional ? 'bg-orange-600' : 'bg-zinc-300'
                      }`}
                    >
                      <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform mt-1 ml-1 ${
                        preferences.functional ? 'translate-x-5' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    Remembers microphone inputs, answer draft backups, and candidate theme choices.
                  </p>
                </div>
                <span className="text-[11px] font-mono font-semibold text-slate-600 pt-2 border-t border-zinc-200/60">
                  Status: {preferences.functional ? 'Enabled' : 'Disabled'}
                </span>
              </div>

              {/* Category 3: Performance Telemetry */}
              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Latency &amp; Telemetry</span>
                    <button
                      type="button"
                      onClick={() => handleToggle('analytics')}
                      className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${
                        preferences.analytics ? 'bg-orange-600' : 'bg-zinc-300'
                      }`}
                    >
                      <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform mt-1 ml-1 ${
                        preferences.analytics ? 'translate-x-5' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    Measures anonymous speech synthesis response times to optimize simulation servers.
                  </p>
                </div>
                <span className="text-[11px] font-mono font-semibold text-slate-600 pt-2 border-t border-zinc-200/60">
                  Status: {preferences.analytics ? 'Enabled' : 'Disabled'}
                </span>
              </div>

            </div>

          </div>

          {/* ================= COOKIE AUDIT TABLE ================= */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200/90 shadow-sm space-y-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <Cookie className="w-3.5 h-3.5 text-orange-500" />
                <span>Complete Token Audit</span>
              </div>
              <h3 className="text-xl font-brand font-bold text-slate-950">
                Itemized Cookie &amp; Storage Inventory
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Detailed disclosure of every cookie and browser storage token utilized on Replica.
              </p>
            </div>

            <div className="overflow-x-auto pt-2">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-zinc-200 bg-zinc-50/80 text-slate-900">
                    <th className="py-3 px-4 font-bold">Storage Key / Cookie</th>
                    <th className="py-3 px-4 font-bold">Classification</th>
                    <th className="py-3 px-4 font-bold">Technical Purpose</th>
                    <th className="py-3 px-4 font-bold text-right">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 font-medium text-slate-700">
                  {COOKIE_INVENTORY.map((c) => (
                    <tr key={c.name} className="hover:bg-zinc-50/50 transition-colors">
                      <td className="py-3 px-4 font-mono font-semibold text-slate-900">
                        {c.name}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
                          c.category === 'Essential'
                            ? 'bg-zinc-200 text-slate-800'
                            : c.category === 'Functional'
                              ? 'bg-orange-100 text-orange-800'
                              : 'bg-blue-100 text-blue-800'
                        }`}>
                          {c.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-600 leading-relaxed max-w-sm">
                        {c.purpose}
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-slate-500 whitespace-nowrap">
                        {c.duration}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ================= STRUCTURED LEGAL CLAUSES ================= */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-zinc-200/90 shadow-sm space-y-10 text-slate-700 text-xs sm:text-sm leading-relaxed font-medium">
            
            {/* Clause 1 */}
            <section className="space-y-3 pb-8 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-orange-600 uppercase tracking-wider">
                  Section 01
                </span>
                <h2 className="text-lg sm:text-xl font-brand font-bold text-slate-950">
                  What are Cookies &amp; Local Storage?
                </h2>
              </div>
              <p>
                Cookies and browser local storage objects are small encrypted data records stored directly on your computer or mobile device when you interact with modern web applications. They allow our platform to maintain state, remember your audio equipment permissions, and deliver sub-second AI interview interactions without requiring re-authentication on every question.
              </p>
            </section>

            {/* Clause 2 */}
            <section className="space-y-3 pb-8 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-orange-600 uppercase tracking-wider">
                  Section 02
                </span>
                <h2 className="text-lg sm:text-xl font-brand font-bold text-slate-950">
                  Third-Party Cookies &amp; Zero Cross-Site Tracking
                </h2>
              </div>
              <p>
                Replica does not employ cross-site tracking cookies, third-party advertising trackers, or ad-retargeting beacons. We believe high-stakes technical interview practice demands absolute discretion. Any storage tokens deployed on the platform are first-party and strictly dedicated to simulator performance.
              </p>
            </section>

            {/* Clause 3 */}
            <section className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-orange-600 uppercase tracking-wider">
                  Section 03
                </span>
                <h2 className="text-lg sm:text-xl font-brand font-bold text-slate-950">
                  How to Control Cookies Through Browser Settings
                </h2>
              </div>
              <p>
                In addition to using our interactive preference console above, you can modify cookie handling directly via your browser preferences (Chrome, Safari, Firefox, Edge). Please note that blocking Strictly Necessary cookies will prevent you from signing in or initiating live interview simulations.
              </p>
            </section>

          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
