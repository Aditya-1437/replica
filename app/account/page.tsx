'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@/context/UserContext';
import { 
  User as UserIcon, 
  Settings, 
  Activity, 
  BarChart3, 
  Clock, 
  Award, 
  Edit2, 
  Check, 
  TrendingUp,
  BrainCircuit,
  Zap,
  ArrowRight
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const metrics = [
  { label: "Clarity", value: 85, color: "bg-sage-accent" },
  { label: "Confidence", value: 72, color: "bg-blue-500" },
  { label: "Technical Depth", value: 64, color: "bg-indigo-500" },
  { label: "Pace", value: 90, color: "bg-emerald-500" }
];

const mockRecentActivity = [
  { tech: "React & Next.js", date: "2 hours ago", score: 88 },
  { tech: "System Design", date: "Yesterday", score: 76 },
  { tech: "Python Algorithms", date: "3 days ago", score: 92 },
  { tech: "Behavioral Track", date: "1 week ago", score: 84 }
];

export default function AccountPage() {
  const { user, updateUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    techStack: user?.techStack || 'Full Stack Developer'
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        techStack: user.techStack || 'Full Stack Developer'
      });
    }
  }, [user]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(formData);
    setIsEditing(false);
  };

  if (!user) return null;

  return (
    <main className="min-h-screen bg-sage-bg flex flex-col">
      <Navbar />

      <section className="flex-1 pt-24 pb-32 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-gray-100">
            <div className="space-y-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-sage-accent text-white flex items-center justify-center">
                  <UserIcon className="w-6 h-6" />
                </div>
                <h1 className="text-4xl font-serif font-bold text-slate-900 tracking-tight">Your Workspace</h1>
              </motion.div>
              <p className="text-slate-muted text-lg ml-1">Track your growth and refine your presence.</p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsEditing(!isEditing)}
              className="px-6 py-2.5 bg-white border border-gray-200 rounded-xl font-bold text-slate-700 shadow-sm flex items-center gap-2 hover:border-sage-accent/30 transition-all"
            >
              {isEditing ? <Check className="w-4 h-4" /> : <Settings className="w-4 h-4" />}
              {isEditing ? "Done Editing" : "Manage Profile"}
            </motion.button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Stats & Profile */}
            <div className="space-y-8 lg:col-span-1">
              
              {/* Profile Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm space-y-6"
              >
                {isEditing ? (
                  <form onSubmit={handleUpdate} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                      <input 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-2 bg-gray-50 border border-transparent rounded-lg focus:bg-white focus:border-sage-accent/30 focus:outline-none transition-all text-sm font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                      <input 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-2 bg-gray-50 border border-transparent rounded-lg focus:bg-white focus:border-sage-accent/30 focus:outline-none transition-all text-sm font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Tech Stack</label>
                      <input 
                        value={formData.techStack}
                        onChange={(e) => setFormData({...formData, techStack: e.target.value})}
                        className="w-full px-4 py-2 bg-gray-50 border border-transparent rounded-lg focus:bg-white focus:border-sage-accent/30 focus:outline-none transition-all text-sm font-medium"
                        placeholder="e.g. Frontend Specialist"
                      />
                    </div>
                    <button type="submit" className="w-full py-3 bg-sage-accent text-white rounded-xl font-bold text-sm shadow-lg shadow-sage-accent/20 hover:bg-sage-accent/90 transition-all">
                      Save Changes
                    </button>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="text-center space-y-2">
                      <div className="w-20 h-20 mx-auto rounded-3xl bg-gray-50 flex items-center justify-center text-slate-300 border border-dashed border-gray-200">
                        <UserIcon className="w-10 h-10" />
                      </div>
                      <div>
                        <h3 className="text-xl font-serif font-bold text-slate-900">{user.name}</h3>
                        <p className="text-slate-muted text-sm">{user.techStack || "Member since 2026"}</p>
                      </div>
                    </div>
                    <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                      <div className="text-center">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sessions</p>
                        <p className="text-lg font-bold text-slate-900">14</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Streak</p>
                        <p className="text-lg font-bold text-slate-900">3 Days</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Avg Score</p>
                        <p className="text-lg font-bold text-sage-accent">84%</p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Achievement Card */}
              <div className="bg-slate-900 p-8 rounded-[32px] text-white space-y-6 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-sage-accent/20 rounded-full blur-3xl" />
                <div className="flex items-center gap-3">
                  <Award className="w-6 h-6 text-sage-accent" />
                  <h4 className="font-bold">Next Milestone</h4>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">Complete 6 more sessions this week to unlock the <span className="text-sage-accent font-bold">"Prime Orator"</span> achievement badge.</p>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-2/3 h-full bg-sage-accent" />
                </div>
              </div>
            </div>

            {/* Right Column: Metrics & Activity */}
            <div className="space-y-8 lg:col-span-2">
              
              {/* Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Communication Pulse */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm space-y-8"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif font-bold text-slate-900 text-lg flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-sage-accent" />
                      Communication Pulse
                    </h4>
                  </div>
                  <div className="space-y-6">
                    {metrics.map((m) => (
                      <div key={m.label} className="space-y-2">
                        <div className="flex justify-between text-xs font-bold text-slate-600">
                          <span>{m.label}</span>
                          <span className="text-slate-400">{m.value}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-50 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${m.value}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className={`h-full ${m.color}`} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* AI Insights Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm space-y-6"
                >
                  <h4 className="font-serif font-bold text-slate-900 text-lg flex items-center gap-2">
                    <BrainCircuit className="w-5 h-5 text-indigo-500" />
                    AI Intelligence Focus
                  </h4>
                  <div className="space-y-4">
                    <div className="p-4 bg-indigo-50 rounded-2xl space-y-2">
                      <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Top Recommendation</p>
                      <p className="text-sm text-indigo-900 leading-snug">Incorporate more data-backed results (STARR method) in behavioral answers to improve technical depth score.</p>
                    </div>
                    <div className="p-4 bg-sage-bg rounded-2xl space-y-2">
                      <p className="text-xs font-bold text-sage-accent uppercase tracking-wider">Strength Found</p>
                      <p className="text-sm text-slate-800 leading-snug">Excellent structural consistency. You maintain logical flow even under pressure.</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Activity Feed */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm space-y-6"
              >
                <div className="flex items-center justify-between pb-2">
                  <h4 className="font-serif font-bold text-slate-900 text-lg flex items-center gap-2">
                    <Clock className="w-5 h-5 text-slate-400" />
                    Recent Practice Sessions
                  </h4>
                  <button className="text-xs font-bold text-sage-accent hover:underline">View All</button>
                </div>
                <div className="space-y-3">
                  {mockRecentActivity.map((act, i) => (
                    <div key={i} className="flex items-center justify-between p-5 bg-gray-50/50 rounded-2xl group hover:bg-white hover:shadow-md hover:border-gray-100 border border-transparent transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-slate-400 group-hover:text-sage-accent group-hover:bg-sage-bg transition-colors">
                          <Zap className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800">{act.tech}</p>
                          <p className="text-xs text-slate-400">{act.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-bold text-slate-800">{act.score}%</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Match</p>
                        </div>
                        <button className="p-2 opacity-0 group-hover:opacity-100 text-slate-300 hover:text-sage-accent transition-all">
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Practice Consistency Grid (Contribution Style) */}
              <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h4 className="font-serif font-bold text-slate-900 text-lg flex items-center gap-2">
                    <Activity className="w-5 h-5 text-emerald-500" />
                    Practice Consistency
                  </h4>
                  <span className="text-xs font-medium text-slate-400">Past 12 Weeks</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 56 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-3.5 h-3.5 rounded-sm ${
                        i % 7 === 0 ? 'bg-sage-accent' : 
                        i % 5 === 0 ? 'bg-sage-accent/40' : 
                        i % 3 === 0 ? 'bg-sage-accent/10' : 'bg-gray-50'
                      }`} 
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
