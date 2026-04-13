'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CookieContent() {
  return (
    <main className="min-h-screen bg-sage-bg flex flex-col">
      <Navbar />
      
      <section className="flex-1 pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-slate-900 tracking-tight">Cookie Policy</h1>
              <p className="text-slate-muted text-lg">Last updated: April 13, 2026</p>
            </div>

            <div className="prose prose-slate max-w-none space-y-10 text-slate-700 leading-relaxed">
              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-slate-900">1. What are Cookies?</h2>
                <p>
                  Cookies are small text files that are stored on your device when you visit a website. They are widely used to make websites work more efficiently and to provide information to the owners of the site.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-slate-900">2. How We Use Cookies</h2>
                <p>
                  Replica uses cookies to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Keep you signed in during your session.</li>
                  <li>Understand how you use our platform and personalize your experience.</li>
                  <li>Improve our site's performance and accessibility.</li>
                  <li>Store your preferences and settings.</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-slate-900">3. Types of Cookies We Use</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">Essential Cookies</h3>
                    <p className="text-sm">These are necessary for the website to function and cannot be switched off in our systems.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">Analytical Cookies</h3>
                    <p className="text-sm">These allow us to count visits and traffic sources so we can measure and improve the performance of our site.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">Preference Cookies</h3>
                    <p className="text-sm">These enable the website to provide enhanced functionality and personalization.</p>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-slate-900">4. Managing Cookies</h2>
                <p>
                  You can manage your cookie preferences through your browser settings. Most browsers allow you to block or delete cookies, but doing so may limit your ability to use certain features of Replica.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
