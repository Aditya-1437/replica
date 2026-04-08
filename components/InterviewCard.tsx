'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InterviewCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  isActive: boolean;
  onClick: () => void;
}

export default function InterviewCard({ title, description, icon: Icon, isActive, onClick }: InterviewCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "cursor-pointer p-8 rounded-[2rem] border-2 transition-all duration-300 h-full",
        isActive 
          ? "bg-white border-sage-accent shadow-2xl shadow-sage-accent/10" 
          : "bg-white/50 border-gray-100 hover:border-sage-accent/30 hover:bg-white flex-col"
      )}
    >
      <div className={cn(
        "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors",
        isActive ? "bg-sage-accent text-white" : "bg-sage-accent/5 text-sage-accent"
      )}>
        <Icon className="w-7 h-7" />
      </div>

      <h3 className="text-2xl font-serif font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-muted leading-relaxed">{description}</p>
      
      <div className={cn(
        "mt-6 flex items-center gap-2 font-semibold text-sm transition-opacity duration-300",
        isActive ? "opacity-100 text-sage-accent" : "opacity-40 text-slate-400"
      )}>
        {isActive ? 'Selection active' : 'Click to select'}
        <div className={cn(
          "w-1.5 h-1.5 rounded-full",
          isActive ? "bg-sage-accent animate-pulse" : "bg-slate-300"
        )} />
      </div>
    </motion.div>
  );
}
