"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AddNoteModal from "./AddNoteModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface MirrorScreenProps {
  notes: string[];
  onAddNote: (text: string) => void;
  onContinue: () => void;
}

const NOTE_COLORS = ["note-red", "note-orange", "note-yellow", "note-green", "note-blue", "note-purple"] as const;

// Predefined positions (percentage-based) for notes on the mirror
const NOTE_POSITIONS = [
  { top: "8%", left: "10%", rotate: -5 },
  { top: "5%", left: "55%", rotate: 4 },
  { top: "30%", left: "5%", rotate: -3 },
  { top: "28%", left: "58%", rotate: 6 },
  { top: "52%", left: "8%", rotate: -4 },
  { top: "50%", left: "52%", rotate: 3 },
  { top: "72%", left: "15%", rotate: -6 },
  { top: "70%", left: "50%", rotate: 5 },
];

const MirrorScreen = ({ notes, onAddNote, onContinue }: MirrorScreenProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = (text: string) => {
    onAddNote(text);
    setModalOpen(false);
  };

  const filledCount = notes.length;
  const prompt =
    filledCount === 0
      ? "Write something you appreciate about yourself."
      : filledCount < 3
        ? "Your mirror is starting to fill with appreciation."
        : "Your mirror is filling with appreciation.";

  return (
    <div className="flex flex-col items-center w-full max-w-sm mx-auto space-y-6 animate-fade-in">
      {/* Instruction Card */}
      <div className="premium-card p-6 w-full space-y-2 text-center">
        <p className="text-lg font-bold text-foreground">
          {filledCount === 0
            ? "Write something you appreciate about yourself"
            : filledCount < 3
              ? `Add ${3 - filledCount} more note${3 - filledCount > 1 ? "s" : ""} to reflect`
              : "Your mirror is full of joy!"}
        </p>
        <p className="text-sm text-muted-foreground">
          {filledCount === 0
            ? "Tap \"Add Note\" to place an affirmation on your mirror"
            : filledCount < 3
              ? "Keep going, you're doing great!"
              : "Continue whenever you're ready"}
        </p>
      </div>

      {/* Mirror Illustration Container */}
      <div className="relative w-full aspect-[3/4] rounded-[3rem] bg-gradient-to-br from-pride-blue/20 to-pride-purple/10 border-8 border-white/50 shadow-2xl backdrop-blur-xl overflow-hidden group">
        <div className="absolute inset-0 bg-white/5 opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2)_0%,transparent_70%)] animate-pulse" />
        </div>

        {filledCount === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 opacity-40">
            <span className="text-6xl mb-4">✨</span>
            <p className="text-sm font-bold text-foreground/40 italic">
              "I am enough, exactly as I am."
            </p>
          </div>
        )}

        {/* Notes placed on the mirror */}
        <AnimatePresence>
          {notes.map((text, i) => {
            const pos = NOTE_POSITIONS[i % NOTE_POSITIONS.length];
            const colors = [
              "bg-pride-red/90",
              "bg-pride-orange/90",
              "bg-pride-yellow/90",
              "bg-pride-green/90",
              "bg-pride-blue/90",
              "bg-pride-purple/90"
            ];
            const color = colors[i % colors.length];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.3, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className={`${color} absolute w-[42%] aspect-square rounded-xl shadow-xl p-3 flex items-center justify-center border border-white/30`}
                style={{
                  top: pos.top,
                  left: pos.left,
                  rotate: `${pos.rotate}deg`,
                }}
              >
                <p className="text-[11px] font-bold text-white text-center leading-tight drop-shadow-sm">
                  {text}
                </p>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Action Buttons */}
      <div className="w-full space-y-4">
        {filledCount < 8 && (
          <Button
            variant="pride"
            size="lg"
            onClick={() => setModalOpen(true)}
            className="w-full h-14 text-lg font-bold shadow-xl"
          >
            <Plus className="w-6 h-6 mr-2" />
            Add Note
          </Button>
        )}

        {filledCount >= 3 && (
          <Button 
            variant="secondary" 
            size="lg" 
            onClick={onContinue} 
            className="w-full h-14 text-lg font-bold"
          >
            Continue to Reflection
          </Button>
        )}
      </div>

      <AddNoteModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default MirrorScreen;
