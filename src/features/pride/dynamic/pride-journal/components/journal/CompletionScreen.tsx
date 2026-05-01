import { Button } from "@/components/ui/button";

interface Entry {
  text: string;
  sticker: string | null;
}

const CompletionScreen = ({
  entries,
  onSave,
  onRestart,
  onViewHistory,
}: {
  entries: Entry[];
  onSave: () => void;
  onRestart: () => void;
  onViewHistory: () => void;
  onBackToHub: () => void;
}) => {
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
        <button onClick={onSave} className="btn-primary w-full h-14 text-lg font-bold shadow-2xl shadow-pride-purple/20">
          Save to My Journey
        </button>
        
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
