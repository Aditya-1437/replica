'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  name: string;
  email: string;
  techStack?: string;
  role?: string;
  seniority?: string;
  targetCompanies?: string;
  notificationsEmail?: boolean;
  noiseSuppression?: boolean;
  aiVoicePace?: string;
  defaultDifficulty?: string;
  subscriptionPlan?: string;
  subscriptionStatus?: 'active' | 'trial' | 'canceled';
  subscriptionBilling?: 'annual' | 'monthly';
  subscriptionStartDate?: string;
  subscriptionEndDate?: string;
  seats?: number;
  totalDrillsCompleted?: number;
  streakDays?: number;
  avgScore?: number;
}

interface UserContextType {
  user: User | null;
  login: (name: string, email: string) => void;
  updateUser: (data: Partial<User>) => void;
  logout: () => void;
  isLoaded: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedUser = typeof window !== 'undefined' ? localStorage.getItem('replica_user') : null;
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        // Default enriched fields for seamless experience
        const enrichedUser: User = {
          techStack: 'Full Stack & System Design',
          role: 'Software Engineer',
          seniority: 'Senior (L5 / Staff)',
          subscriptionPlan: 'Ascent Pro',
          subscriptionStatus: 'active',
          subscriptionBilling: 'annual',
          subscriptionStartDate: 'Oct 12, 2025',
          subscriptionEndDate: 'Oct 12, 2026',
          seats: 1,
          totalDrillsCompleted: 18,
          streakDays: 4,
          avgScore: 86,
          ...parsed
        };
        setUser(enrichedUser);
      } catch (e) {
        console.error('Failed to parse saved user', e);
      }
    }
    setIsLoaded(true);
  }, []);

  const login = (name: string, email: string) => {
    const newUser: User = { 
      name, 
      email,
      techStack: 'Full Stack & System Design',
      role: 'Software Engineer',
      seniority: 'Senior (L5 / Staff)',
      subscriptionPlan: 'Ascent Pro',
      subscriptionStatus: 'active',
      subscriptionBilling: 'annual',
      subscriptionStartDate: 'Oct 12, 2025',
      subscriptionEndDate: 'Oct 12, 2026',
      seats: 1,
      totalDrillsCompleted: 18,
      streakDays: 4,
      avgScore: 86
    };
    setUser(newUser);
    localStorage.setItem('replica_user', JSON.stringify(newUser));
  };

  const updateUser = (data: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem('replica_user', JSON.stringify(updatedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('replica_user');
  };

  return (
    <UserContext.Provider value={{ user, login, updateUser, logout, isLoaded }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
