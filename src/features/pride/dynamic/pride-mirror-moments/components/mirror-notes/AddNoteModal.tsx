import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const EXAMPLES = [
  "I'm proud of my resilience.",
  "I listen to people with empathy.",
  "I'm learning to trust myself.",
  "I keep trying even when things are hard.",
  "I care deeply about people.",
];

interface AddNoteModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (text: string) => void;
}

const AddNoteModal = ({ open, onClose, onSubmit }: AddNoteModalProps) => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text.trim());
      setText("");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-foreground/30 backdrop-blur-sm px-4 pb-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="premium-card p-8 w-full max-w-md shadow-2xl relative"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-foreground">Add a Note</h3>
              <button onClick={onClose} className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-lg text-muted-foreground mb-6 justified-text">
              What is one thing you appreciate about yourself?
            </p>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write your note here..."
              className="w-full h-32 rounded-2xl bg-white/50 border border-border p-5 text-lg font-bold text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:ring-2 focus:ring-pride-blue/30 resize-none mb-6 transition-all"
            />

            <div className="space-y-3 mb-8">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Inspiration:</p>
              <div className="flex flex-wrap gap-2">
                {EXAMPLES.slice(0, 3).map((ex, i) => (
                  <button
                    key={i}
                    onClick={() => setText(ex)}
                    className="text-xs bg-pride-blue/5 text-pride-blue font-bold px-4 py-2 rounded-full hover:bg-pride-blue/10 transition-colors border border-pride-blue/10"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>

            <Button
              variant="pride"
              className="w-full h-14 text-lg font-bold shadow-xl"
              onClick={handleSubmit}
              disabled={!text.trim()}
            >
              Place Note on Mirror
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddNoteModal;
