'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  name: string;
  email: string;
  techStack?: string;
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
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to parse saved user', e);
      }
    }
    setIsLoaded(true);
  }, []);

  const login = (name: string, email: string) => {
    const newUser = { name, email };
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
