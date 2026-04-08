'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@/context/UserContext';
import { ArrowRight, Mail, User } from 'lucide-react';

export default function Gatekeeper() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { login } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim()) {
      login(name, email);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-sage-bg px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md space-y-8"
      >
        <div className="text-center space-y-2">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-serif font-bold text-sage-accent tracking-tight"
          >
            Replica
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-slate-muted text-lg"
          >
            Enter your details to begin your journey.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-slate-muted ml-1">
                Full Name
              </label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 transition-colors group-focus-within:text-sage-accent" />
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-accent/20 focus:border-sage-accent focus:bg-white transition-all text-slate-800 placeholder:text-gray-300"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-muted ml-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 transition-colors group-focus-within:text-sage-accent" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-accent/20 focus:border-sage-accent focus:bg-white transition-all text-slate-800 placeholder:text-gray-300"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-4 bg-sage-accent text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-sage-accent/20 hover:bg-sage-accent/90 transition-all group"
            >
              Enter Workspace
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </form>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-sm text-slate-muted/60"
        >
          By entering, you agree to our private environment terms.
        </motion.p>
      </motion.div>
    </div>
  );
}
