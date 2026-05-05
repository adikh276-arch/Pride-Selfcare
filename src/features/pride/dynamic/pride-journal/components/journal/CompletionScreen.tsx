import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Share2 } from "lucide-react";
import { ShareModal } from "@/components/pride/ShareModal";

interface Entry {
  text: string;
  sticker: string | null;
}

const CompletionScreen = ({
  entries,
  onSave,
  onRestart,
  onViewHistory,
  onBackToHub,
}: {
  entries: Entry[];
  onSave: () => void;
  onRestart: () => void;
  onViewHistory: () => void;
  onBackToHub: () => void;
}) => {
  const [isShareOpen, setIsShareOpen] = useState(false);
  return (
  <div className="flex flex-col items-center justify-center pt-8 animate-fade-in relative z-10">
    <div className="premium-card p-10 md:p-12 text-center w-full space-y-10 shadow-2xl">
      <div className="text-7xl mb-4 animate-pulse">🌈</div>
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-foreground leading-tight">
          Your gratitude reflects the many colors of who you are.
        </h2>
        <p className="text-lg text-muted-foreground">
          Your journey is beautiful and uniquely yours. Keep shining.
        </p>
      </div>
      
      <div className="space-y-4 pt-6">
        <button
          onClick={() => setIsShareOpen(true)}
          className="flex items-center justify-center gap-2 px-6 py-2.5 mx-auto rounded-full border border-purple-200 bg-purple-50/50 text-purple-600 hover:bg-purple-100/50 transition-all text-sm font-bold shadow-sm mb-2"
        >
          <Share2 size={16} />
          <span>Share</span>
        </button>

        <button onClick={onSave} className="btn-primary w-full h-14 text-lg font-bold shadow-2xl shadow-pride-purple/20">
          Save to My Journey
        </button>

        <ShareModal 
          isOpen={isShareOpen} 
          onClose={() => setIsShareOpen(false)} 
          title="Share My Journal Entry"
        />
        
        <div className="grid grid-cols-2 gap-4">
          <button
            className="btn-secondary w-full h-14 font-bold"
            onClick={onViewHistory}
          >
            History
          </button>
          
          <button
            className="btn-secondary w-full h-14 font-bold"
            onClick={onRestart}
          >
            New Entry
          </button>
        </div>

        <button
          className="btn-ghost w-full h-12 text-muted-foreground font-bold hover:text-foreground transition-colors"
          onClick={onBackToHub}
        >
          Back to Hub
        </button>
      </div>
    </div>
  </div>
  );
};

export default CompletionScreen;
