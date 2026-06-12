"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import StickyNote from "./StickyNote";

interface ReflectionScreenProps {
  notes: string[];
  onContinue: () => void;
}

const ReflectionScreen = ({ notes, onContinue }: ReflectionScreenProps) => {
  const [reflection, setReflection] = useState("");

  return (
    <div className="flex flex-col items-center w-full max-w-sm mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Your Mirror</h2>
        <p className="text-lg text-muted-foreground leading-relaxed justified-text">
          Take a moment to read these notes. They reflect parts of you that deserve appreciation.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full">
        {notes.map((text, i) => (
          <StickyNote key={i} index={i} text={text} onClick={() => {}} />
        ))}
      </div>

      <div className="premium-card p-8 w-full space-y-4">
        <p className="text-lg font-bold text-foreground">
          How did it feel to acknowledge these parts of yourself?
        </p>
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="Share your thoughts... (optional)"
          className="w-full h-32 rounded-2xl bg-white/50 border border-border p-5 text-lg font-bold text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:ring-2 focus:ring-pride-blue/30 resize-none transition-all"
        />
      </div>

      <Button variant="pride" size="lg" onClick={onContinue} className="w-full h-14 text-lg font-bold shadow-xl">
        Continue
      </Button>
    </div>
  );
};

export default ReflectionScreen;
