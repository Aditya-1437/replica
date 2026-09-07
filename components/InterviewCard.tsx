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
          ? "bg-white border-orange-500 shadow-2xl shadow-orange-500/15" 
          : "bg-white/70 border-zinc-200 hover:border-orange-500/40 hover:bg-white flex-col"
      )}
    >
      <div className={cn(
        "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors",
        isActive ? "bg-orange-600 text-white" : "bg-orange-500/10 text-orange-600"
      )}>
        <Icon className="w-7 h-7" />
      </div>

      <h3 className="text-2xl font-sans font-bold text-slate-950 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed font-medium">{description}</p>
      
      <div className={cn(
        "mt-6 flex items-center gap-2 font-semibold text-sm transition-opacity duration-300",
        isActive ? "opacity-100 text-orange-600" : "opacity-40 text-slate-400"
      )}>
        {isActive ? 'Selection active' : 'Click to select'}
        <div className={cn(
          "w-1.5 h-1.5 rounded-full",
          isActive ? "bg-orange-500 animate-pulse" : "bg-slate-300"
        )} />
      </div>
    </motion.div>
  );
}
