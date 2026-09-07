'use client';

import React from 'react';
import { motion } from 'framer-motion';

const companies = [
  {
    name: 'Google',
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
      </svg>
    )
  },
  {
    name: 'Meta',
    logo: (
      <svg className="w-6 h-6 text-slate-800" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.804 3.003c-2.316 0-4.321 1.258-5.804 3.062-1.483-1.804-3.488-3.062-5.804-3.062-4.084 0-7.196 3.364-7.196 7.788 0 4.887 4.238 9.544 11.233 13.06.471.237 1.063.237 1.534 0 6.995-3.516 11.233-8.173 11.233-13.06 0-4.424-3.112-7.788-7.196-7.788zm-11.008 13.568c-4.996-2.614-7.796-5.875-7.796-9.18 0-2.827 1.888-4.788 4.196-4.788 1.942 0 3.634 1.261 4.717 3.045l.983 1.621.983-1.621c1.083-1.784 2.775-3.045 4.717-3.045 2.308 0 4.196 1.961 4.196 4.788 0 3.305-2.8 6.566-7.796 9.18l-2.104 1.102-2.104-1.102z"/>
      </svg>
    )
  },
  {
    name: 'Microsoft',
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <rect x="1" y="1" width="10" height="10" fill="#F25022"/>
        <rect x="13" y="1" width="10" height="10" fill="#7FBA00"/>
        <rect x="1" y="13" width="10" height="10" fill="#00A4EF"/>
        <rect x="13" y="13" width="10" height="10" fill="#FFB900"/>
      </svg>
    )
  },
  {
    name: 'Amazon',
    logo: (
      <svg className="w-5 h-5 text-slate-800" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.9 12.1c-.8.6-1.9.9-2.9.9-2.7 0-4.6-1.7-4.6-4.5 0-3.3 2.5-4.8 5.7-4.8 1 0 2.1.2 2.9.5v-.5c0-1.4-.9-2.2-2.4-2.2-1.2 0-2.3.4-3.1.9l-.6-1.3c1.1-.7 2.5-1.1 4.1-1.1 2.5 0 4 1.3 4 3.7v6.6h-1.6v-1.1zm-1.5-6.5c-.7-.2-1.5-.4-2.2-.4-1.9 0-3.4.8-3.4 2.9 0 1.6 1 2.6 2.6 2.6 1.2 0 2.3-.5 3-1.2V5.6zM22.5 21.2C18.6 23.3 13.8 24 9.1 23c-4.4-.9-8.4-3.4-11-7.1l.9-.7c2.4 3.5 6.2 5.9 10.4 6.7 4.3.9 8.8.2 12.4-1.7l.7 1z"/>
      </svg>
    )
  },
  {
    name: 'Apple',
    logo: (
      <svg className="w-5 h-5 text-slate-900" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.66-.8 1.11-1.92.99-3.04-.96.04-2.13.64-2.82 1.44-.61.71-1.15 1.86-1.01 2.96 1.08.08 2.18-.56 2.84-1.36z"/>
      </svg>
    )
  },
  {
    name: 'Netflix',
    logo: (
      <svg className="w-4 h-5" viewBox="0 0 24 24" fill="#E50914">
        <path d="M5.398 0v24l4.63-1.428V11.236l4.62 12.764L19.278 24V0h-4.63v12.764L10.028 0H5.398z"/>
      </svg>
    )
  },
  {
    name: 'Stripe',
    logo: (
      <svg className="w-5 h-5 text-indigo-600" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.763-1.444 2.112-1.444 2.164 0 4.123 1.086 4.966 1.705l.93-3.699c-.93-.619-3.21-1.459-5.882-1.459-4.225 0-7.142 2.378-7.142 6.002 0 4.792 6.452 4.996 6.452 7.42 0 .979-.893 1.583-2.35 1.583-2.479 0-5.111-1.341-6.103-2.036l-1.042 3.753c1.091.758 3.869 1.685 6.945 1.685 4.473 0 7.489-2.327 7.489-6.027.001-4.997-6.019-5.174-6.019-7.574z"/>
      </svg>
    )
  },
  {
    name: 'Uber',
    logo: (
      <svg className="w-5 h-5 text-slate-900" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm0 4.8c1.99 0 3.6 1.61 3.6 3.6 0 1.99-1.61 3.6-3.6 3.6-1.99 0-3.6-1.61-3.6-3.6 0-1.99 1.61-3.6 3.6-3.6zm0 14.8c-2.9 0-5.46-1.42-7.05-3.6.03-2.34 4.7-3.62 7.05-3.62 2.34 0 7.02 1.28 7.05 3.62-1.59 2.18-4.15 3.6-7.05 3.6z"/>
      </svg>
    )
  }
];

export default function CompanyTicker() {
  // Duplicate array 3 times for seamless infinite loop scroll
  const duplicatedCompanies = [...companies, ...companies, ...companies];

  return (
    <section className="w-full py-5 bg-white/70 backdrop-blur-md border-y border-zinc-200/60 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6 mb-3 text-center">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
          Engineers from top teams practice on Replica
        </p>
      </div>

      {/* Ticker Container with Left & Right Gradient Mask */}
      <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,_transparent_0%,_black_12%,_black_88%,_transparent_100%)]">
        <motion.div
          animate={{ x: ['0%', '-33.333%'] }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="flex items-center gap-10 sm:gap-14 w-max"
        >
          {duplicatedCompanies.map((comp, idx) => (
            <div
              key={`${comp.name}-${idx}`}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl transition-all duration-300 hover:bg-zinc-100/80 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 group cursor-default"
            >
              <div className="transition-transform group-hover:scale-110">
                {comp.logo}
              </div>
              <span className="text-xs font-bold text-slate-700 tracking-tight group-hover:text-slate-950">
                {comp.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
