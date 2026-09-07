'use client';

import React from 'react';

interface ReplicaLogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubText?: boolean;
}

export default function ReplicaLogo({ 
  className = '', 
  iconOnly = false, 
  size = 'md',
  showSubText = false 
}: ReplicaLogoProps) {
  const sizeMap = {
    sm: { icon: 28, text: 'text-xl', tracking: 'tracking-[0.16em]', sub: 'text-[9px]' },
    md: { icon: 36, text: 'text-2xl', tracking: 'tracking-[0.18em]', sub: 'text-[10px]' },
    lg: { icon: 52, text: 'text-4xl', tracking: 'tracking-[0.2em]', sub: 'text-xs' },
    xl: { icon: 68, text: 'text-5xl md:text-6xl', tracking: 'tracking-[0.22em]', sub: 'text-sm' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none group ${className}`}>
      {/* Handcrafted AI Interview Agent Logo Mark */}
      <div className="relative shrink-0 flex items-center justify-center">
        <svg
          width={currentSize.icon}
          height={currentSize.icon}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-500 group-hover:scale-105 drop-shadow-md"
        >
          <defs>
            {/* Outer Carbon Shield Gradient */}
            <linearGradient id="replica-primary-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#09090B" />
              <stop offset="60%" stopColor="#18181B" />
              <stop offset="100%" stopColor="#27272A" />
            </linearGradient>

            {/* Electric Orange AI Accent Glow Gradient */}
            <linearGradient id="replica-accent-grad" x1="10" y1="10" x2="38" y2="38" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FF8A65" />
              <stop offset="50%" stopColor="#EA580C" />
              <stop offset="100%" stopColor="#9A3412" />
            </linearGradient>

            {/* AI Signal Wave Gradient */}
            <linearGradient id="replica-wave-grad" x1="12" y1="24" x2="36" y2="24" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E4E4E7" />
            </linearGradient>
          </defs>

          {/* Background Rounded Squircle */}
          <rect
            x="2"
            y="2"
            width="44"
            height="44"
            rx="13"
            fill="url(#replica-primary-grad)"
            stroke="rgba(249, 115, 22, 0.3)"
            strokeWidth="1.5"
          />

          {/* AI Dialogue Signal Arcs (Background AI Agent Waveform) */}
          <path
            d="M 10 24 C 10 16 16 10 24 10"
            stroke="rgba(249, 115, 22, 0.35)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 38 24 C 38 32 32 38 24 38"
            stroke="rgba(249, 115, 22, 0.35)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Stylized 'R' AI Agent Monogram (Candidate Voice + AI Evaluation Path) */}
          {/* Vertical Candidate Backbone */}
          <path
            d="M 16 14 V 34"
            stroke="url(#replica-wave-grad)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Upper AI Analysis Loop */}
          <path
            d="M 16 14 H 26 C 30.5 14 33 16.5 33 20 C 33 23.5 30.5 26 26 26 H 16"
            stroke="url(#replica-wave-grad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* AI Feedback & Reflection Arc */}
          <path
            d="M 23 26 Q 28 27 33 34"
            stroke="url(#replica-accent-grad)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Active AI Intelligence Core Nodes */}
          <circle cx="26" cy="20" r="2" fill="#FF8A65" />
          <circle cx="33" cy="34" r="2.2" fill="#EA580C" className="animate-pulse" />
          <circle cx="16" cy="14" r="1.8" fill="#FFFFFF" />
        </svg>
      </div>

      {!iconOnly && (
        <div className="flex flex-col">
          <span className={`font-brand font-extrabold uppercase brand-gradient-text drop-shadow-sm leading-none ${currentSize.tracking} ${currentSize.text}`}>
            REPLICA
          </span>
          {showSubText && (
            <span className={`font-mono text-slate-500 font-semibold tracking-wider uppercase mt-1 ${currentSize.sub}`}>
              AI Interview Agent
            </span>
          )}
        </div>
      )}
    </div>
  );
}
