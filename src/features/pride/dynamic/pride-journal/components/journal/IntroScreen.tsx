"use client";
import { Button } from "@/components/ui/button";
import { PrideFloatingOrbs } from "@/features/pride/components/PrideFloatingOrbs";

const IntroScreen = ({ onStart, onViewHistory, hasHistory, onBack }: { onStart: () => void; onViewHistory: () => void; hasHistory: boolean; onBack?: () => void }) => {
  return (
  <div className="flex-1 flex flex-col items-center justify-center py-10">
    <div className="premium-card p-10 md:p-12 text-center w-full space-y-8">
      <div className="w-24 h-24 bg-pride-purple/10 rounded-full flex items-center justify-center mx-auto text-5xl animate-pulse">
        📔
      </div>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-foreground">
          Identity Gratitude Journal
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed justified-text">
          Gratitude helps us notice the strength and beauty in who we are.
          Reflect on the parts of your identity you appreciate.
        </p>
      </div>
      <div className="space-y-4">
        <button onClick={onStart} className="btn-primary w-full h-14 text-lg font-bold shadow-xl">
          Start Journaling
        </button>
        {hasHistory && (
          <button className="btn-secondary w-full h-14 font-bold" onClick={onViewHistory}>
            View History
          </button>
        )}
      </div>
    </div>
  </div>
  );
};

export default IntroScreen;
