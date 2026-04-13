'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  MessageCircle, 
  Mail, 
  FileText, 
  X, 
  ChevronDown, 
  Send, 
  ArrowRight,
  LifeBuoy,
  MessageSquare
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const faqs = [
  {
    question: "How accurate are the AI interview evaluations?",
    answer: "Replica uses advanced large language models fine-tuned on thousands of professional interview scenarios. While highly accurate for sentiment and content analysis, we recommend using it as a guidance tool to supplement your own judgment."
  },
  {
    question: "Is my data private and secure?",
    answer: "Absolutely. All your interview sessions and responses are encrypted. We don't share your private practice data with third parties or use it to train public models without explicit consent."
  },
  {
    question: "Can I use Replica for team training?",
    answer: "Yes! Our Prime plan is specifically designed for teams, offering collaborative workspaces, custom tech stacks, and white-labeled environments."
  },
  {
    question: "What tech stacks are currently supported?",
    answer: "We support over 50+ modern tech stacks including React, Node.js, Python, Go, System Design, and specialized tracks like DevOps and Mobile development."
  }
];

const channels = [
  {
    title: "Documentation",
    description: "Deep dive into our features and API integrations.",
    icon: FileText,
    linkText: "Read Docs",
    color: "bg-blue-50 text-blue-600"
  },
  {
    title: "Community Discord",
    description: "Join 5,000+ developers practicing together.",
    icon: MessageCircle,
    linkText: "Join Discord",
    color: "bg-indigo-50 text-indigo-600"
  },
  {
    title: "Direct Email",
    description: "Get a response from our team within 24 hours.",
    icon: Mail,
    linkText: "Send Email",
    color: "bg-sage-accent/10 text-sage-accent"
  },
  {
    title: "Twitter / X",
    description: "Follow us for real-time status updates and tips.",
    icon: X,
    linkText: "Follow Us",
    color: "bg-slate-50 text-slate-600"
  }
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => setFormStatus('sent'), 1500);
  };

  return (
    <main className="min-h-screen bg-sage-bg flex flex-col">
      <Navbar />

      <section className="flex-1 pt-24 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center space-y-8 mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-sage-accent/10 rounded-full border border-sage-accent/20"
            >
              <LifeBuoy className="w-4 h-4 text-sage-accent" />
              <span className="text-xs font-bold text-sage-accent uppercase tracking-wider">Support Center</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-serif font-bold text-slate-900 tracking-tight"
            >
              How can we <br />
              <span className="text-sage-accent italic">help you today?</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="max-w-2xl mx-auto relative"
            >
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search for articles, guides, and more..."
                className="w-full pl-14 pr-6 py-5 bg-white border border-gray-100 rounded-[24px] shadow-sm focus:outline-none focus:ring-2 focus:ring-sage-accent/20 focus:border-sage-accent transition-all text-slate-800"
              />
            </motion.div>
          </div>

          {/* Support Channels Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
            {channels.map((channel, idx) => (
              <motion.div
                key={channel.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                className="group p-8 bg-white rounded-[32px] border border-gray-50 hover:border-sage-accent/20 hover:shadow-xl transition-all duration-500"
              >
                <div className={`w-12 h-12 ${channel.color} rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}>
                  <channel.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif font-bold text-slate-900 mb-3">{channel.title}</h3>
                <p className="text-slate-muted text-sm leading-relaxed mb-6">{channel.description}</p>
                <a href="#" className="inline-flex items-center gap-2 text-sm font-bold text-sage-accent hover:gap-3 transition-all">
                  {channel.linkText}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* FAQ Section */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-serif font-bold text-slate-900">Frequently Asked Questions</h2>
                <p className="text-slate-muted">Can't find what you're looking for? Here are some of our most common inquiries.</p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <motion.div
                    key={idx}
                    className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-semibold text-slate-800">{faq.question}</span>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {openFaq === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-6 pb-6 text-slate-600 text-sm leading-relaxed"
                        >
                          {faq.answer}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm space-y-8"
            >
              <div className="space-y-2">
                <h3 className="text-2xl font-serif font-bold text-slate-900">Still need help?</h3>
                <p className="text-slate-muted">Drop us a message and our support team will get back to you.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-sage-accent/30 focus:outline-none transition-all text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email</label>
                    <input 
                      required
                      type="email" 
                      placeholder="jane@example.com"
                      className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-sage-accent/30 focus:outline-none transition-all text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Subject</label>
                  <select className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-sage-accent/30 focus:outline-none transition-all text-sm appearance-none cursor-pointer">
                    <option>General Inquiry</option>
                    <option>Technical Support</option>
                    <option>Billing Question</option>
                    <option>Feature Request</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Message</label>
                  <textarea 
                    required
                    rows={4}
                    placeholder="Tell us what's on your mind..."
                    className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-sage-accent/30 focus:outline-none transition-all text-sm resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={formStatus !== 'idle'}
                  className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                    formStatus === 'sent' 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-sage-accent text-white shadow-lg shadow-sage-accent/20 hover:bg-sage-accent/90'
                  }`}
                >
                  {formStatus === 'idle' && (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                  {formStatus === 'sending' && <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                  {formStatus === 'sent' && 'Message Sent!'}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
