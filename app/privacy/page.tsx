'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyPolicy() {
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
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-slate-900 tracking-tight">Privacy Policy</h1>
              <p className="text-slate-muted text-lg">Last updated: April 13, 2026</p>
            </div>

            <div className="prose prose-slate max-w-none space-y-10 text-slate-700 leading-relaxed">
              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-slate-900">1. Information We Collect</h2>
                <p>
                  At Replica, we prioritize your privacy. We collect information that you provide directly to us, such as your name and email address when you enter our workspace. Additionally, we collect performance data during your interview sessions to provide AI-driven sentiment analysis and feedback.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-slate-900">2. How We Use Your Information</h2>
                <p>
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide, maintain, and improve our AI interview services.</li>
                  <li>Personalize your experience and provide tailored feedback.</li>
                  <li>Communicate with you about updates, security alerts, and support needs.</li>
                  <li>Analyze trends and usage to enhance the platform's performance.</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-slate-900">3. Data Security</h2>
                <p>
                  We implement a variety of security measures to maintain the safety of your personal information. Your session data is encrypted and stored in a private environment. We do not use your private interview responses to train public AI models without your explicit consent.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-slate-900">4. Third-Party Services</h2>
                <p>
                  We may use third-party service providers, such as Google Gemini API, to process AI requests. These providers are bound by strict confidentiality agreements and are only permitted to use your data to provide the services we've requested.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-slate-900">5. Your Rights</h2>
                <p>
                  You have the right to access, update, or delete the personal information we hold about you. If you wish to exercise any of these rights, please contact us through our Support page.
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
