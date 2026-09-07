'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@/context/UserContext';
import { 
  LogOut, 
  ChevronRight, 
  Menu, 
  X, 
  User, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  HelpCircle,
  LayoutDashboard,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ReplicaLogo from '@/components/ReplicaLogo';

const navLinks = [
  { name: 'Practice', href: '/' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Support', href: '/support' },
];

export default function Navbar() {
  const { user, logout } = useUser();
  const pathname = usePathname();
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full px-4 sm:px-6 py-3 pointer-events-none">
      <motion.nav
        initial={{ y: -25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`max-w-5xl mx-auto px-4 sm:px-5 rounded-full pointer-events-auto flex items-center justify-between transition-all duration-300 ${
          isScrolled
            ? 'h-14 bg-white/90 backdrop-blur-2xl border border-zinc-200/90 shadow-[0_12px_36px_rgba(0,0,0,0.06)]'
            : 'h-16 bg-white/80 backdrop-blur-xl border border-zinc-200/70 shadow-[0_8px_30px_rgba(0,0,0,0.03)]'
        }`}
      >
        {/* Left: Brand Logo */}
        <Link href="/" className="flex items-center group">
          <ReplicaLogo size="sm" />
        </Link>

        {/* Center: Navigation Links with Animated Pill (Desktop) */}
        <div className="hidden md:flex items-center gap-1 bg-zinc-100/70 p-1.5 rounded-full border border-zinc-200/60">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const isHovered = hoveredPath === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={() => setHoveredPath(link.href)}
                onMouseLeave={() => setHoveredPath(null)}
                className={`relative px-4 sm:px-5 py-1.5 text-xs font-bold tracking-wider uppercase rounded-full transition-colors duration-200 ${
                  isActive ? 'text-orange-600' : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                {/* Active Pill Background */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 bg-white rounded-full shadow-xs border border-zinc-200/80 z-0"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                
                {/* Hover Pill Background */}
                {!isActive && isHovered && (
                  <motion.div
                    layoutId="hoverNavPill"
                    className="absolute inset-0 bg-white/80 rounded-full z-0"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}

                <span className="relative z-10">{link.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Right: User State / CTA & Mobile Toggle */}
        <div className="flex items-center gap-2.5">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2.5 bg-zinc-100/80 hover:bg-white pl-1.5 pr-3.5 py-1 rounded-full border border-zinc-200/80 shadow-xs transition-all hover:border-orange-500/40 cursor-pointer active:scale-95 group"
              >
                <div className="w-7 h-7 rounded-full bg-orange-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-xs font-bold text-slate-800 tracking-tight max-w-[100px] truncate hidden sm:inline">
                  {user.name.split(' ')[0]}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </button>

              {/* User Dropdown Menu */}
              <AnimatePresence>
                {isUserMenuOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setIsUserMenuOpen(false)} 
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2.5 w-60 p-2 bg-slate-950 text-white rounded-2xl shadow-2xl border border-zinc-800 z-50 overflow-hidden space-y-1"
                    >
                      <div className="p-3 pb-2.5 border-b border-zinc-800">
                        <p className="text-xs font-bold text-white truncate">{user.name}</p>
                        <p className="text-[11px] font-mono text-zinc-400 truncate">{user.email}</p>
                        {user.techStack && (
                          <span className="inline-block mt-1.5 text-[10px] font-bold px-2 py-0.5 rounded-md bg-orange-500/20 text-orange-400 border border-orange-500/30">
                            {user.techStack}
                          </span>
                        )}
                      </div>

                      <div className="py-1 space-y-0.5">
                        <Link
                          href="/account"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-xl transition-colors"
                        >
                          <LayoutDashboard className="w-3.5 h-3.5 text-orange-500" />
                          <span>Candidate Dashboard</span>
                        </Link>

                        <Link
                          href="/support"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-xl transition-colors"
                        >
                          <HelpCircle className="w-3.5 h-3.5 text-zinc-400" />
                          <span>Support & Feedback</span>
                        </Link>
                      </div>

                      <div className="pt-1 border-t border-zinc-800">
                        <button
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            logout();
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded-xl transition-colors cursor-pointer"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              href="/"
              className="px-4 sm:px-5 py-2 bg-slate-950 text-white text-xs font-bold tracking-wider uppercase rounded-full hover:bg-orange-600 transition-all shadow-sm active:scale-95 flex items-center gap-1.5 group"
            >
              <span>Get Started</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          )}

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-slate-950 rounded-full hover:bg-zinc-100 transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay & Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden max-w-5xl mx-auto mt-2 p-4 bg-white/95 backdrop-blur-2xl rounded-3xl border border-zinc-200/90 shadow-xl pointer-events-auto space-y-3"
          >
            <div className="space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                      isActive
                        ? 'bg-orange-50 text-orange-600 font-extrabold'
                        : 'text-slate-700 hover:bg-zinc-100 hover:text-slate-950'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-4 h-4 text-zinc-400" />
                  </Link>
                );
              })}
            </div>

            {user && (
              <div className="pt-3 border-t border-zinc-100 space-y-1">
                <Link
                  href="/account"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold text-slate-700 hover:bg-zinc-100"
                >
                  <span>My Dashboard</span>
                  <LayoutDashboard className="w-4 h-4 text-orange-500" />
                </Link>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold text-red-600 hover:bg-red-50 text-left cursor-pointer"
                >
                  <span>Sign Out</span>
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
