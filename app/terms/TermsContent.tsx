'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TermsContent() {
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
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-slate-900 tracking-tight">Terms of Service</h1>
              <p className="text-slate-muted text-lg">Last updated: April 13, 2026</p>
            </div>

            <div className="prose prose-slate max-w-none space-y-10 text-slate-700 leading-relaxed">
              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-slate-900">1. Acceptance of Terms</h2>
                <p>
                  By accessing or using Replica, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, you are not authorized to use the platform.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-slate-900">2. Description of Service</h2>
                <p>
                  Replica provides an AI-powered interview practice environment. We offer tools for technical and behavioral interview preparation using large language models to generate questions and evaluate responses.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-slate-900">3. User Conduct</h2>
                <p>
                  You agree to use Replica only for lawful purposes. You are responsible for all content you submit to the platform. You may not use the platform to harass, abuse, or engage in any fraudulent activity.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-slate-900">4. Subscriptions and Billing</h2>
                <p>
                  Certain features of Replica require a paid subscription. All fees are non-refundable except as required by law. We reserve the right to change our pricing at any time with prior notice to users.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-slate-900">5. Limitation of Liability</h2>
                <p>
                  Replica is provided "as is" without warranty of any kind. We are not liable for any direct or indirect damages resulting from your use of the platform, including the accuracy of AI-generated feedback.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-slate-900">6. Termination</h2>
                <p>
                  We reserve the right to suspend or terminate your account at our sole discretion, without notice, for conduct that we believe violates these Terms of Service or is harmful to other users.
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
