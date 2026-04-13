'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@/context/UserContext';
import { LogOut, User as UserIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { user, logout } = useUser();
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-40 w-full bg-sage-bg/80 backdrop-blur-md border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-serif font-bold text-sage-accent tracking-tight">Replica</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="/" 
              className={`text-sm font-semibold transition-colors ${pathname === '/' ? 'text-sage-accent' : 'text-slate-muted hover:text-sage-accent'}`}
            >
              Practice
            </Link>
            <Link 
              href="/pricing" 
              className={`text-sm font-semibold transition-colors ${pathname === '/pricing' ? 'text-sage-accent' : 'text-slate-muted hover:text-sage-accent'}`}
            >
              Pricing
            </Link>
            <Link 
              href="/support" 
              className={`text-sm font-semibold transition-colors ${pathname === '/support' ? 'text-sage-accent' : 'text-slate-muted hover:text-sage-accent'}`}
            >
              Support
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {user ? (
            <>
              <div className="hidden md:flex flex-col items-end">
                <span className="text-sm font-semibold text-slate-800">{user.name}</span>
                <span className="text-xs text-slate-muted">{user.email}</span>
              </div>

              <div className="flex items-center gap-3 bg-white pl-1.5 pr-4 py-1.5 rounded-full border border-gray-100 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-sage-accent/10 flex items-center justify-center text-sage-accent">
                  <UserIcon className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-slate-700 md:hidden">{user.name.split(' ')[0]}</span>
                <button
                  onClick={logout}
                  className="ml-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <Link 
              href="/"
              className="px-6 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-full hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10"
            >
              Get Started
            </Link>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
