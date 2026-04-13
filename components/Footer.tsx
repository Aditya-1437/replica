'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Send } from 'lucide-react';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white pt-24 pb-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          <div className="space-y-8">
            <h2 className="text-4xl font-serif font-bold text-slate-900 leading-tight">
              Stay Sharper. <br />
              <span className="text-sage-accent">Practice Weekly.</span>
            </h2>
            <p className="text-slate-muted text-lg max-w-md">
              Get curated interview questions and industry insights delivered to your private workspace.
            </p>
            <div className="relative max-w-md">
              <input 
                type="email"
                placeholder="email@example.com"
                className="w-full px-6 py-5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage-accent/20 focus:border-sage-accent transition-all text-slate-800"
              />
              <button className="absolute right-2 top-2 bottom-2 px-6 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all flex items-center gap-2">
                Join
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-6">
              <h4 className="font-bold text-slate-900 uppercase tracking-widest text-sm">Platform</h4>
              <ul className="space-y-4 text-slate-muted">
                <li><Link href="/" className="hover:text-sage-accent transition-colors">Technical Track</Link></li>
                <li><Link href="/" className="hover:text-sage-accent transition-colors">Behavioral Track</Link></li>
                <li><Link href="/pricing" className="hover:text-sage-accent transition-colors">Pricing</Link></li>
                <li><Link href="/support" className="hover:text-sage-accent transition-colors">Support</Link></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="font-bold text-slate-900 uppercase tracking-widest text-sm">Legal</h4>
              <ul className="space-y-4 text-slate-muted">
                <li><Link href="/privacy" className="hover:text-sage-accent transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-sage-accent transition-colors">Terms of Service</Link></li>
                <li><Link href="/cookies" className="hover:text-sage-accent transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-xl font-serif font-bold text-sage-accent">Replica</span>
            <span className="text-gray-300">|</span>
            <p className="text-sm text-slate-400">© 2026 Replica Inc.</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full border border-gray-100">
            <div className="w-2 h-2 rounded-full bg-sage-accent animate-pulse" />
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Built with AI Intelligence</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
