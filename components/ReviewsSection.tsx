'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, CheckCircle2, Sparkles, Building2, Briefcase, Award } from 'lucide-react';

interface Review {
  name: string;
  initials: string;
  role: string;
  previousRole: string;
  outcomeCompany: string;
  outcomeBadge: string;
  avatarColor: string;
  rating: number;
  reviewTitle: string;
  reviewText: string;
  highlightMetric: string;
}

const reviews: Review[] = [
  {
    name: 'Marcus Vance',
    initials: 'MV',
    role: 'Senior Frontend Engineer',
    previousRole: 'Ex-Mid Level Developer',
    outcomeCompany: 'Fintech Tier-1',
    outcomeBadge: 'L5 Offer Accepted',
    avatarColor: 'bg-gradient-to-br from-orange-500 to-amber-600',
    rating: 5,
    reviewTitle: '“Eliminated my rambling and gave me crisp STAR structure.”',
    reviewText: 'Before Replica, I would ramble for 10 minutes on behavioral questions and freeze when asked to explain rendering internals under pressure. The camera-free AI drills gave me a zero-judgment environment to build muscle memory. In my final round, every answer was structured, punchy, and confident.',
    highlightMetric: 'Converted 1st try · Zero Filler Words'
  },
  {
    name: 'Priya Raman',
    initials: 'PR',
    role: 'Staff Distributed Systems Engineer',
    previousRole: 'Senior Backend Engineer',
    outcomeCompany: 'Cloud Infrastructure',
    outcomeBadge: 'Staff Engineer Offer',
    avatarColor: 'bg-gradient-to-br from-blue-600 to-indigo-700',
    rating: 5,
    reviewTitle: '“System design went from my biggest fear to my strongest round.”',
    reviewText: 'I always understood distributed systems theory, but talking through capacity math and partition trade-offs in real time used to trigger intense anxiety. Replica’s instant rubric feedback forced me to validate constraints upfront and state SLAs clearly. It felt like practicing with an actual principal engineer.',
    highlightMetric: '+$60k Comp Bump · 98% Rubric Score'
  },
  {
    name: 'Alex Chen',
    initials: 'AC',
    role: 'Engineering Manager',
    previousRole: 'Tech Lead / Senior IC',
    outcomeCompany: 'Enterprise SaaS',
    outcomeBadge: 'EM Role Secured',
    avatarColor: 'bg-gradient-to-br from-emerald-600 to-teal-700',
    rating: 5,
    reviewTitle: '“The secret weapon for transitioning from Senior IC to EM.”',
    reviewText: 'Transitioning into engineering management meant my interviews were 100% behavioral, conflict resolution, and leadership scenarios. Replica flagged every time I used vague hypotheticals instead of concrete Situation-Task-Action-Result examples. I walked into all 4 rounds knowing exactly what to say.',
    highlightMetric: '3 for 3 Final Round Offers'
  }
];

export default function ReviewsSection() {
  return (
    <section className="relative w-full py-20 sm:py-28 bg-white overflow-hidden border-b border-zinc-200/80">
      
      {/* Background Subtle Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-orange-500/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-14">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 text-xs font-bold uppercase tracking-wider shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            <span>Candidate Success Stories</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-brand text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 leading-tight tracking-tight"
          >
            How Replica shaped their{' '}
            <span className="brand-gradient-text">dream offers.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed"
          >
            Real engineers and managers who replaced interview dread with structured confidence and landed top offers.
          </motion.p>
        </div>

        {/* 3 Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="flex flex-col justify-between p-7 sm:p-8 rounded-3xl bg-white border border-zinc-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-orange-500/40 hover:-translate-y-1 transition-all duration-300 relative group"
            >
              {/* Subtle Top Accent Glow on Hover */}
              <div className="absolute inset-x-8 top-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="space-y-5">
                {/* 5-Star Rating & Outcome Badge */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400 drop-shadow-sm"
                      />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    {review.outcomeBadge}
                  </span>
                </div>

                {/* Review Title & Body */}
                <div className="space-y-2.5">
                  <h4 className="text-base font-extrabold text-slate-950 leading-snug">
                    {review.reviewTitle}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                    {review.reviewText}
                  </p>
                </div>
              </div>

              {/* Bottom Candidate Meta */}
              <div className="pt-6 mt-6 border-t border-zinc-100 space-y-3">
                {/* Highlight Tag */}
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-orange-600 bg-orange-500/10 px-2.5 py-1 rounded-lg border border-orange-500/20">
                  <Award className="w-3.5 h-3.5 text-orange-600" />
                  <span>{review.highlightMetric}</span>
                </div>

                {/* Avatar & Position Info */}
                <div className="flex items-center gap-3 pt-1">
                  <div className={`w-10 h-10 rounded-2xl ${review.avatarColor} text-white flex items-center justify-center font-extrabold text-xs shadow-md shrink-0`}>
                    {review.initials}
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-sm font-bold text-slate-900 truncate">
                      {review.name}
                    </h5>
                    <p className="text-[11px] font-medium text-slate-500 truncate flex items-center gap-1">
                      <Briefcase className="w-3 h-3 text-slate-400" />
                      <span>{review.role}</span>
                    </p>
                  </div>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Global Social Proof Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-2xl mx-auto p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
        >
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-[10px] font-bold ring-2 ring-white">
                MV
              </div>
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold ring-2 ring-white">
                PR
              </div>
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold ring-2 ring-white">
                AC
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold ring-2 ring-white">
                +2k
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1 justify-center sm:justify-start">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-xs font-extrabold text-slate-900 ml-1">4.95 / 5.0</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Rated by 2,400+ candidates across engineering & leadership tracks
              </p>
            </div>
          </div>

          <span className="text-[11px] font-bold text-slate-700 bg-white px-3 py-1.5 rounded-xl border border-zinc-200 shadow-sm shrink-0">
            94% Interview Pass Rate
          </span>
        </motion.div>

      </div>
    </section>
  );
}
