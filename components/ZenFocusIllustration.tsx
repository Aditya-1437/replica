'use client';

import React from 'react';

export default function ZenFocusIllustration() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-auto desk-illustration group cursor-default">
      <svg
        viewBox="0 0 800 600"
        className="w-full h-full max-w-[700px] max-h-[600px] transition-transform duration-1000 ease-out group-hover:scale-[1.01]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>
          {`
            .desk-illustration:hover .ripple-anim {
              animation: rippleExpand 1.5s infinite ease-out;
            }
            @keyframes rippleExpand {
              0% { r: 5; opacity: 1; stroke-width: 4; }
              100% { r: 45; opacity: 0; stroke-width: 1; }
            }
          `}
        </style>

        {/* Soft Background Blob / Aura */}
        <circle cx="400" cy="300" r="250" fill="#F0F4F2" opacity="0.6" className="transition-all duration-[1.5s] group-hover:scale-105 group-hover:opacity-80" />

        {/* DESK */}
        <rect x="150" y="450" width="550" height="20" rx="10" fill="#F5F0E6" />

        {/* CHAIR */}
        <path d="M 120 580 L 180 580 L 180 350 Q 180 330 140 330 L 120 580 Z" fill="#607D8B" />
        <rect x="100" y="560" width="100" height="15" rx="7.5" fill="#455A64" />

        {/* PERSON - LOWER BODY */}
        <path d="M 160 440 Q 200 435 240 500 L 240 580 L 190 580 L 190 500 Q 160 480 160 460" fill="#334155" />

        {/* PERSON - HEAD & HAIR */}
        <circle cx="210" cy="230" r="45" fill="#FDE0C1" />
        {/* Hair - Short Dark */}
        <path d="M 160 230 C 150 160 270 160 260 230 C 260 190 200 170 160 230 Z" fill="#1E293B" />

        {/* Ear */}
        <circle cx="210" cy="235" r="8" fill="#E8C9A3" />

        {/* PERSON - TORSO (Leaning Forward) */}
        <path d="M 140 300 Q 260 240 280 350 L 290 410 Q 290 470 210 470 L 140 470 Q 130 380 140 300 Z" fill="#4A6741" />

        {/* ARM RESTING ON DESK */}
        <path d="M 190 330 Q 250 400 260 450" fill="none" stroke="#3D5536" strokeWidth="40" strokeLinecap="round" />
        <circle cx="265" cy="450" r="18" fill="#FDE0C1" />

        {/* MONITOR STAND */}
        <path d="M 500 450 L 515 350 L 565 350 L 580 450 Z" fill="#CBD5E1" />
        <rect x="470" y="440" width="140" height="10" rx="5" fill="#94A3B8" />

        {/* MONITOR SCREEN */}
        <rect x="380" y="160" width="340" height="210" rx="16" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="8" />

        {/* MONITOR SCREEN UI CONTENT */}
        <rect x="420" y="210" width="230" height="12" rx="6" fill="#2F3E2B" />
        <rect x="420" y="240" width="150" height="10" rx="5" fill="#CBD5E1" />
        <rect x="420" y="280" width="260" height="60" rx="8" fill="#F0F4F2" />

        {/* SIMULATED TYPING PROGRESS (Screen) */}
        <rect x="440" y="300" width="40" height="8" rx="4" fill="#4A6741" className="transition-all duration-[1.5s] ease-out group-hover:w-[220px]" />
        <rect x="440" y="316" width="10" height="8" rx="4" fill="#4A6741" className="transition-all duration-[1.5s] ease-out delay-300 group-hover:w-[160px]" />

        {/* NOTEPAD on desk */}
        <rect x="630" y="455" width="50" height="10" rx="2" fill="#FFFFFF" transform="rotate(-8 630 455)" />
        <rect x="635" y="457" width="30" height="3" fill="#CBD5E1" transform="rotate(-8 630 455)" />

        {/* DESK LAMP */}
        <path d="M 680 450 Q 720 280 620 220" fill="none" stroke="#2F3E2B" strokeWidth="8" strokeLinecap="round" />
        <circle cx="680" cy="450" r="20" fill="#2F3E2B" />
        <path d="M 630 230 L 580 180 C 600 150 650 190 630 230 Z" fill="#4A6741" />
        {/* Lamp Light Soft Glow */}
        <path d="M 590 190 L 530 230 Q 560 300 640 300 L 630 240" fill="#FDE047" opacity="0.1" className="transition-opacity duration-1000 group-hover:opacity-30" />

        {/* KEYBOARD BASE */}
        <rect x="340" y="445" width="120" height="12" rx="4" fill="#64748B" transform="rotate(3 340 445)" />

        {/* GLOWING PULSE KEYBOARD interaction */}
        <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
          <rect x="340" y="445" width="120" height="12" rx="4" fill="#94A3B8" className="animate-pulse" transform="rotate(3 340 445)" />
          <rect x="350" y="443" width="8" height="3" rx="1.5" fill="#FFFFFF" transform="rotate(3 340 445)" />
          <rect x="380" y="443" width="20" height="3" rx="1.5" fill="#FFFFFF" transform="rotate(3 340 445)" />
          <rect x="420" y="443" width="12" height="3" rx="1.5" fill="#FFFFFF" transform="rotate(3 340 445)" />
        </g>

        {/* SUBTLE KEYPRESS ICON RIPPLE ON DESK */}
        <circle cx="395" cy="445" r="5" fill="none" stroke="#4A6741" strokeWidth="2" opacity="0" className="ripple-anim" />

        {/* PERSON - FOREARM & TYPING HAND */}
        <path d="M 230 350 Q 320 380 380 440" fill="none" stroke="#4A6741" strokeWidth="40" strokeLinecap="round" />
        <circle cx="390" cy="440" r="18" fill="#FDE0C1" />

      </svg>
    </div>
  );
}
