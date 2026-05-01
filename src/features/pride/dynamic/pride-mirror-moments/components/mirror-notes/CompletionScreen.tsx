import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, Save, Plus } from "lucide-react";
import StickyNote from "./StickyNote";

interface CompletionScreenProps {
  notes: string[];
  onSave: () => void;
  onAddMore: () => void;
  onViewSaved: () => void;
  onBackToHub: () => void;
}

const CompletionScreen = ({ notes, onSave, onAddMore, onViewSaved, onBackToHub }: CompletionScreenProps) => {
  return (
    <div className="flex flex-col items-center w-full max-w-sm mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Beautiful 🌟</h2>
        <p className="text-lg text-muted-foreground leading-relaxed justified-text">
          Even on difficult days, these qualities remain a part of you.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full">
        {notes.slice(0, 4).map((text, i) => (
          <StickyNote key={i} index={i} text={text} onClick={() => {}} />
        ))}
      </div>

      <div className="w-full space-y-4">
        <Button variant="pride" size="lg" onClick={onSave} className="w-full h-14 text-lg font-bold shadow-xl">
          <Save className="w-6 h-6 mr-2" />
          Save to My Journey
        </Button>

        <div className="grid gap-3">
          <Button
            variant="outline"
            size="lg"
            onClick={onAddMore}
            className="w-full h-12 bg-white/50 border-white hover:bg-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add More Notes
          </Button>
          
          <Button
            variant="secondary"
            size="lg"
            onClick={onViewSaved}
            className="w-full h-12"
          >
            View History
          </Button>
          
          <Button
            variant="ghost"
            size="lg"
            onClick={onBackToHub}
            className="w-full h-12 text-muted-foreground font-bold"
          >
            Back to Hub
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompletionScreen;
