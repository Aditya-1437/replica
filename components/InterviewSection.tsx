'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Users, Briefcase, Play } from 'lucide-react';
import { useSession, InterviewType } from '@/context/SessionContext';
import InterviewCard from './InterviewCard';
import TechModal from './TechModal';

const interviewTypes = [
  {
    id: 'technical' as InterviewType,
    title: 'Technical',
    description: 'Deep dive into data structures, algorithms, and system design. Tailored to your stack.',
    icon: Code2
  },
  {
    id: 'behavioral' as InterviewType,
    title: 'Behavioral',
    description: 'Master the STAR method. Practice leadership, conflict resolution, and teamwork scenarios.',
    icon: Users
  },
  {
    id: 'hr' as InterviewType,
    title: 'HR & Cultural',
    description: 'Nail common questions: "Tell me about yourself", expectations, and culture fit.',
    icon: Briefcase
  }
];

export default function InterviewSection() {
  const [selectedType, setSelectedType] = useState<InterviewType | null>(null);
  const [isTechModalOpen, setIsTechModalOpen] = useState(false);
  const { startInterview } = useSession();

  const handleStart = () => {
    if (!selectedType) return;

    if (selectedType === 'technical') {
      setIsTechModalOpen(true);
    } else {
      startInterview(selectedType);
    }
  };

  const handleTechConfirm = (tech: string[], diff: string) => {
    setIsTechModalOpen(false);
    startInterview('technical', { tech, diff });
  };

  return (
    <section className="py-24 bg-white/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">Choose Your Path</h2>
          <p className="text-slate-muted italic text-lg">Select a mode to begin your simulation</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {interviewTypes.map((type) => (
            <InterviewCard
              key={type.id}
              title={type.title}
              description={type.description}
              icon={type.icon}
              isActive={selectedType === type.id}
              onClick={() => setSelectedType(type.id)}
            />
          ))}
        </div>

        <div className="h-24 flex items-center justify-center">
          <AnimatePresence>
            {selectedType && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStart}
                  className="px-12 py-5 bg-sage-accent text-white rounded-2xl font-bold text-xl flex items-center gap-3 shadow-2xl shadow-sage-accent/30"
                >
                  <Play className="w-6 h-6 fill-current" />
                  Confirm & Start
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <TechModal 
        isOpen={isTechModalOpen} 
        onClose={() => setIsTechModalOpen(false)}
        onConfirm={handleTechConfirm}
      />
    </section>
  );
}
