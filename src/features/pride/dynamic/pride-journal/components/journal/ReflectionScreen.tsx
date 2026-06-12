"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import JournalCard from "./JournalCard";

interface Entry {
  text: string;
  sticker: string | null;
}

interface ReflectionScreenProps {
  entries: Entry[];
  onComplete: () => void;
  onBack: () => void;
}

const ReflectionScreen = ({ entries, onComplete, onBack }: ReflectionScreenProps) => {
  const [meaningful, setMeaningful] = useState("");

  return (
  <div className="flex flex-col space-y-8 pt-4 animate-fade-in relative z-10">
    <div className="text-center space-y-4">
      <h2 className="text-3xl font-bold text-foreground">Your Gratitude Reflections</h2>
      <p className="text-lg text-muted-foreground leading-relaxed justified-text">
        These reflections are reminders of the strengths and experiences that shape who you are.
      </p>
    </div>

    <div className="space-y-6">
      {entries.map((entry, i) => (
        <JournalCard key={i} index={i} text={entry.text} sticker={entry.sticker} flipped compact noSparkle />
      ))}
    </div>

    <div className="premium-card p-10 space-y-6 shadow-xl">
      <p className="text-xl font-bold text-foreground">
        Which reflection feels most meaningful today?
      </p>
      <textarea
        value={meaningful}
        onChange={(e) => setMeaningful(e.target.value)}
        placeholder="Share why this one stands out... (optional)"
        className="w-full min-h-[120px] p-5 rounded-2xl bg-white/5 border border-border text-foreground text-lg leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-pride-purple/40 transition-all placeholder:text-muted-foreground/30"
      />
    </div>

    <button onClick={onComplete} className="btn-primary w-full h-14 text-lg font-bold shadow-2xl shadow-pride-purple/20">
      Continue to Summary
    </button>
  </div>
  );
};

export default ReflectionScreen;
