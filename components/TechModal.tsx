'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';

const techStack = [
  'React', 'Next.js', 'Python', 'Rust', 'Go', 
  'SQL', 'AWS', 'Docker', 'Java', 'C++', 
  'TypeScript', 'Node.js', 'Swift', 'Kotlin', 'PHP', 
  'Ruby', 'Flutter', 'Kubernetes', 'GraphQL', 'NoSQL'
];

const difficulties = ['Beginner', 'Intermediate', 'Proficient', 'Expert'];

interface TechModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (tech: string[], difficulty: string) => void;
}

export default function TechModal({ isOpen, onClose, onConfirm }: TechModalProps) {
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState('Intermediate');

  const toggleTech = (tech: string) => {
    setSelectedTech(prev => 
      prev.includes(tech) 
        ? prev.filter(t => t !== tech) 
        : [...prev, tech]
    );
  };

  const handleConfirm = () => {
    if (selectedTech.length > 0) {
      onConfirm(selectedTech, difficulty);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8 md:p-12">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-serif font-bold text-slate-900">Technical Setup</h2>
                  <p className="text-slate-muted mt-1">Select your stack and challenge level</p>
                </div>
                <button 
                  onClick={onClose}
                  className="p-3 bg-gray-50 rounded-full text-gray-400 hover:text-slate-900 hover:bg-gray-100 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-8">
                {/* Tech Grid */}
                <div>
                  <label className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4 block">
                    Technologies <span className="text-slate-400 font-normal">({selectedTech.length} selected)</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {techStack.map((tech) => (
                      <button
                        key={tech}
                        onClick={() => toggleTech(tech)}
                        className={`
                          px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border
                          ${selectedTech.includes(tech)
                            ? 'bg-sage-accent border-sage-accent text-white shadow-lg shadow-sage-accent/20'
                            : 'bg-white border-gray-100 text-slate-600 hover:border-sage-accent/30 hover:bg-sage-accent/5'}
                        `}
                      >
                        {tech}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Difficulty Selector */}
                <div>
                  <label className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4 block">
                    Challenge Level
                  </label>
                  <div className="flex p-1.5 bg-gray-100/50 rounded-2xl border border-gray-100">
                    {difficulties.map((diff) => (
                      <button
                        key={diff}
                        onClick={() => setDifficulty(diff)}
                        className={`
                          flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-200
                          ${difficulty === diff
                            ? 'bg-white text-sage-accent shadow-sm ring-1 ring-black/5'
                            : 'text-slate-500 hover:text-slate-800'}
                        `}
                      >
                        {diff}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    disabled={selectedTech.length === 0}
                    onClick={handleConfirm}
                    className={`
                      w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all
                      ${selectedTech.length > 0
                        ? 'bg-sage-accent text-white shadow-xl shadow-sage-accent/20'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
                    `}
                  >
                    Confirm & Initialize Session
                    <Check className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
