'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Zap, Rocket, Shield, ArrowRight, Minus } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const plans = [
  {
    name: "Foundation",
    description: "Essential tools for sharpening your core interview skills.",
    price: { monthly: 0, annually: 0 },
    features: [
      "5 AI-powered sessions per month",
      "Core technical & behavioral tracks",
      "Standard performance analytics",
      "Public community access",
      "24-hour response time"
    ],
    buttonText: "Start for Free",
    highlight: false,
    icon: Shield
  },
  {
    name: "Ascent",
    description: "Accelerate your career with unlimited practice and deep insights.",
    price: { monthly: 19, annually: 15 },
    features: [
      "Unlimited AI-powered sessions",
      "Advanced behavioral sentiment analysis",
      "Custom tech-stack simulations",
      "Interview recording & playback",
      "Priority AI processing",
      "Detailed improvement roadmap"
    ],
    buttonText: "Join Ascent",
    highlight: true,
    icon: Zap
  },
  {
    name: "Prime",
    description: "The ultimate environment for teams and high-stakes prep.",
    price: { monthly: 49, annually: 39 },
    features: [
      "Everything in Ascent",
      "Multi-user workspace (up to 5)",
      "White-labeled interview environments",
      "Custom AI model fine-tuning",
      "Dedicated success manager",
      "API access for result exporting"
    ],
    buttonText: "Contact Sales",
    highlight: false,
    icon: Rocket
  }
];

export default function PricingContent() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <main className="min-h-screen bg-sage-bg flex flex-col">
      <Navbar />

      <section className="flex-1 pt-24 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-6 mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-sage-accent/10 rounded-full border border-sage-accent/20"
            >
              <Sparkles className="w-4 h-4 text-sage-accent" />
              <span className="text-xs font-bold text-sage-accent uppercase tracking-wider">Pricing Plans</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl font-serif font-bold text-slate-900 tracking-tight"
            >
              Master your journey, <br />
              <span className="text-sage-accent/60 italic">on your terms.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-muted text-xl max-w-2xl mx-auto"
            >
              Transparent pricing designed to help you prepare effectively, whether you're just starting or scaling your team.
            </motion.p>

            {/* Billing Toggle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-4 pt-8"
            >
              <span className={`text-sm font-semibold transition-colors ${!isAnnual ? 'text-slate-900' : 'text-slate-400'}`}>Monthly</span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className="relative w-14 h-8 bg-white border border-gray-200 rounded-full p-1 transition-colors hover:border-sage-accent/40"
              >
                <div className={`absolute top-1 bottom-1 w-6 bg-sage-accent rounded-full transition-all duration-300 transform ${isAnnual ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
              <span className={`text-sm font-semibold transition-colors ${isAnnual ? 'text-slate-900' : 'text-slate-400'}`}>
                Annually
                <span className="ml-2 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">Save 25%</span>
              </span>
            </motion.div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <PricingCard key={plan.name} plan={plan} isAnnual={isAnnual} index={index} />
            ))}
          </div>

          {/* FAQ Preview or Trust Note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-24 text-center p-12 bg-white rounded-[32px] border border-gray-100 shadow-sm space-y-4"
          >
            <h3 className="text-2xl font-serif font-bold text-slate-900">Need something else?</h3>
            <p className="text-slate-muted">We offer custom solutions for universities and bootcamps. <a href="#" className="text-sage-accent font-semibold hover:underline">Get in touch with us.</a></p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function PricingCard({ plan, isAnnual, index }: { plan: any, isAnnual: boolean, index: number }) {
  const Icon = plan.icon;
  const currentPrice = isAnnual ? plan.price.annually : plan.price.monthly;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 * index }}
      className={`relative flex flex-col p-10 rounded-[40px] border transition-all duration-500 bg-white ${
        plan.highlight 
          ? 'border-sage-accent shadow-[0_24px_48px_rgba(74,103,65,0.08)] scale-105 z-10' 
          : 'border-gray-100 hover:border-gray-200 hover:shadow-xl'
      }`}
    >
      {plan.highlight && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-sage-accent text-white text-xs font-bold uppercase tracking-widest rounded-full">
          Most Popular
        </div>
      )}

      <div className="space-y-6 flex-1">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${plan.highlight ? 'bg-sage-accent text-white' : 'bg-gray-50 text-slate-400'}`}>
          <Icon className="w-7 h-7" />
        </div>

        <div>
          <h3 className="text-2xl font-serif font-bold text-slate-900">{plan.name}</h3>
          <p className="text-slate-muted text-sm mt-2 leading-relaxed">{plan.description}</p>
        </div>

        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-slate-900 tracking-tight">${currentPrice}</span>
          <span className="text-slate-400 text-sm font-medium">/month</span>
        </div>

        <div className="space-y-4 pt-4">
          {plan.features.map((feature: string, fIndex: number) => (
            <div key={fIndex} className="flex items-start gap-3">
              <div className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${plan.highlight ? 'bg-sage-accent/10' : 'bg-gray-50'}`}>
                <Check className={`w-3 h-3 ${plan.highlight ? 'text-sage-accent' : 'text-slate-400'}`} />
              </div>
              <span className="text-sm text-slate-600">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`mt-10 w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
          plan.highlight 
            ? 'bg-sage-accent text-white shadow-lg shadow-sage-accent/20 hover:bg-sage-accent/90' 
            : 'bg-gray-50 text-slate-900 hover:bg-gray-100'
        }`}
      >
        {plan.buttonText}
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    </motion.div>
  );
}

function Sparkles({ className }: { className?: string }) {
  return (
    <svg 
      className={className}
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}
