'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function LoadingOverlay({ message = "Consulting the Interview Panel..." }: { message?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-sage-bg/90 backdrop-blur-sm"
    >
      <div className="relative">
        {/* Buttery-smooth pulse animation */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-32 h-32 bg-sage-accent/20 rounded-full blur-2xl absolute -inset-0"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-24 h-24 bg-white rounded-3xl shadow-xl border border-sage-accent/5 flex items-center justify-center"
        >
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -6, 0],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
                className="w-2.5 h-2.5 bg-sage-accent rounded-full"
              />
            ))}
          </div>
        </motion.div>
      </div>
      
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 text-xl font-serif font-bold text-slate-900 tracking-tight"
      >
        {message}
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 0.4 }}
        className="mt-2 text-sm font-medium text-slate-500 uppercase tracking-widest"
      >
        Using Gemini 1.5 Pro
      </motion.p>
    </motion.div>
  );
}
