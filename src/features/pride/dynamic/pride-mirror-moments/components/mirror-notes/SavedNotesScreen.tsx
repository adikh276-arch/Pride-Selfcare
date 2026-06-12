"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import StickyNote from "./StickyNote";

interface SavedNotesScreenProps {
  notes: string[];
  onAddMore: () => void;
  onBack: () => void;
}

const SavedNotesScreen = ({ notes, onAddMore, onBack }: SavedNotesScreenProps) => {
  return (
    <div className="flex flex-col items-center w-full max-w-sm mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">My Mirror Notes</h2>
        <p className="text-lg text-muted-foreground leading-relaxed justified-text">
          Your collection of daily affirmations and self-appreciation.
        </p>
      </div>

      {notes.length === 0 ? (
        <div className="premium-card p-12 text-center text-muted-foreground text-lg w-full">
          No notes saved yet.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 w-full max-h-[50vh] overflow-y-auto no-scrollbar pb-6 px-1">
          {notes.map((text, i) => (
            <StickyNote key={i} index={i} text={text} onClick={() => {}} />
          ))}
        </div>
      )}

      <div className="w-full space-y-4">
        <Button variant="pride" size="lg" onClick={onAddMore} className="w-full h-14 text-lg font-bold shadow-xl">
          <Plus className="w-6 h-6 mr-2" />
          Add More Notes
        </Button>
        
        <Button
          variant="ghost"
          size="lg"
          onClick={onBack}
          className="w-full h-12 text-muted-foreground font-bold"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Activity
        </Button>
      </div>
    </div>
  );
};

export default SavedNotesScreen;
