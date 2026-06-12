"use client";
import { motion } from "framer-motion";
import { History, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

interface WelcomeScreenProps {
  onStart: () => void;
  onHistory: () => void;
  hasHistory: boolean;
}

const WelcomeScreen = ({ onStart, onHistory, hasHistory }: WelcomeScreenProps) => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
  <div className="premium-card p-10 md:p-12 text-center space-y-10 w-full animate-fade-in relative z-10 border-white/5 bg-black/40 backdrop-blur-xl">
    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-pride-purple/20 to-pride-blue/20 animate-pulse" />
      <svg width="60" height="60" viewBox="0 0 80 80" fill="none" className="relative z-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
        <circle cx="40" cy="40" r="4" className="fill-white" />
        <circle cx="20" cy="25" r="2.5" className="fill-pride-blue" />
        <circle cx="60" cy="20" r="3" className="fill-pride-purple" />
        <circle cx="55" cy="58" r="2" className="fill-pride-green" />
        <circle cx="15" cy="55" r="2.5" className="fill-pride-yellow" />
        <line x1="40" y1="40" x2="20" y2="25" stroke="white" strokeWidth="0.5" opacity="0.3" />
        <line x1="40" y1="40" x2="60" y2="20" stroke="white" strokeWidth="0.5" opacity="0.3" />
        <line x1="40" y1="40" x2="55" y2="58" stroke="white" strokeWidth="0.5" opacity="0.3" />
        <line x1="40" y1="40" x2="15" y2="55" stroke="white" strokeWidth="0.5" opacity="0.3" />
      </svg>
    </div>

    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-white tracking-tight">
        Inner Constellation
      </h1>
      <p className="text-lg text-white/70 leading-relaxed justified-text">
        Reflect on the stars that make up your unique identity. Map your journey across the sky of your self-discovery.
      </p>
    </div>

    <div className="space-y-4 pt-4">
      <button
        onClick={onStart}
        className="btn-primary w-full h-14 text-lg font-bold shadow-2xl shadow-pride-purple/20 border-white/10"
      >
        Map My Identity
      </button>
      
      {hasHistory && (
        <button
          onClick={onHistory}
          className="btn-secondary w-full h-14 text-white/80 border-white/5 hover:bg-white/5"
        >
          <History size={18} className="mr-2" />
          Past Constellations
        </button>
      )}
    </div>
  </div>
  );
};

export default WelcomeScreen;
