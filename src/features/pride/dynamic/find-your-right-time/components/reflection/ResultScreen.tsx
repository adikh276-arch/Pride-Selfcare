import { motion } from "framer-motion";
import type { Reflection } from "../../pages/Index";

interface Props {
  result: Reflection["result"];
  onContinue: () => void;
}

const resultData = {
  "not-ready": {
    emoji: "🌱",
    title: "Not the right time (safety first)",
    description: "It might be safer to wait and build support before coming out.",
    bg: "bg-mint",
  },
  preparing: {
    emoji: "🌤",
    title: "Preparing",
    description: "You're getting there, but a few areas may need support.",
    bg: "bg-peach",
  },
  ready: {
    emoji: "🌈",
    title: "Ready (with support)",
    description: "You seem to have supportive factors in place, but support still matters.",
    bg: "bg-lavender",
  },
};

const ResultScreen = ({ result, onContinue }: Props) => {
  const data = resultData[result];

  return (
  <div className="flex flex-col items-center w-full space-y-8 animate-fade-in">
    <div className="text-center space-y-2">
      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">🧭 Your Readiness Reflection</p>
      <h2 className="text-3xl font-bold text-foreground">Your Path Forward</h2>
    </div>

    <div className="premium-card p-10 md:p-12 w-full space-y-6 text-center">
      <span className="text-6xl mx-auto block mb-4">{data.emoji}</span>
      <h3 className="text-2xl font-bold text-foreground leading-tight">
        {data.title}
      </h3>
      <p className="text-lg text-muted-foreground leading-relaxed justified-text">
        {data.description}
      </p>
    </div>

    <button
      onClick={onContinue}
      className="btn-primary w-full h-14 text-lg font-bold shadow-lg"
    >
      Explore Suggestions
    </button>
  </div>
  );
};

export default ResultScreen;
