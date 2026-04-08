'use client';

import { useUser } from "@/context/UserContext";
import { useSession } from "@/context/SessionContext";
import Gatekeeper from "@/components/Gatekeeper";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import InterviewSection from "@/components/InterviewSection";
import InterviewSession from "@/components/InterviewSession";
import ResultsDashboard from "@/components/ResultsDashboard";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const { user, isLoaded } = useUser();
  const { currentView } = useSession();

  if (!isLoaded) return null;

  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">
      <AnimatePresence mode="wait">
        {!user ? (
          <Gatekeeper key="gatekeeper" />
        ) : (
          <motion.div
            key={currentView}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="flex flex-col flex-1"
          >
            {currentView === 'home' && (
              <>
                <Navbar />
                <div className="flex-1">
                  <Hero />
                  <InterviewSection />
                </div>
                <Footer />
              </>
            )}
            
            {currentView === 'interview' && (
              <InterviewSession />
            )}

            {currentView === 'results' && (
              <ResultsDashboard />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}


