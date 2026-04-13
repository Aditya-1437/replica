'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import ZenFocusIllustration from './ZenFocusIllustration';

export default function Hero() {
  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-accent/10 border border-sage-accent/20 text-sage-accent text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Interview Excellence</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 leading-[1.1] mb-8">
            Master your next interview, <br />
            <span className="text-sage-accent">one keystroke</span> at a time.
          </h1>

          <p className="text-lg md:text-xl text-slate-muted leading-relaxed max-w-2xl mb-10">
            A private, text-based AI environment to sharpen your responses without the pressure of a camera. Practice, refine, and succeed.
          </p>

          <div className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-sage-accent text-white rounded-2xl font-semibold shadow-xl shadow-sage-accent/20 hover:bg-sage-accent/90 transition-all"
            >
              Start Practicing
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-white text-slate-700 border border-gray-200 rounded-2xl font-semibold hover:border-gray-300 transition-all"
            >
              View Examples
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Zen Focus Illustration Area */}
      <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block z-0 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 1, ease: 'easeOut' }}
          className="relative w-full h-full flex items-center justify-center p-12"
        >
          <ZenFocusIllustration />
        </motion.div>
      </div>
    </section>
  );
}

