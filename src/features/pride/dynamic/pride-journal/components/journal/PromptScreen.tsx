import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ProgressBar from "./ProgressBar";

interface PromptScreenProps {
  prompt: string;
  hints: string[];
  current: number;
  total: number;
  isLast: boolean;
  onSubmit: (text: string) => void;
  onBack: () => void;
}

const PromptScreen = ({ prompt, hints, current, total, isLast, onSubmit, onBack }: PromptScreenProps) => {
  const [text, setText] = useState("");

  return (
  <div className="flex flex-col space-y-8 pt-4 animate-fade-in relative z-10">
    <ProgressBar current={current} total={total} />

    <div className="premium-card p-10 md:p-12 space-y-10 shadow-2xl">
      <div className="space-y-4">
        <p className="text-[10px] font-black uppercase tracking-widest text-pride-purple opacity-60">Reflection {current} of {total}</p>
        <h2 className="text-3xl font-bold text-foreground leading-tight">{prompt}</h2>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Tap into your feelings here..."
        className="w-full min-h-[220px] p-6 rounded-2xl bg-white/5 border border-border text-foreground text-xl leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-pride-purple/40 transition-all placeholder:text-muted-foreground/30"
        autoFocus
      />

      <div className="space-y-4">
        <p className="text-xs font-black uppercase tracking-widest text-muted-foreground opacity-60 px-1">Reflection Ideas:</p>
        <div className="grid gap-3">
          {hints.map((h, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setText(h)}
              className="text-left text-sm text-foreground/80 hover:text-foreground italic bg-black/5 hover:bg-black/10 px-5 py-4 rounded-xl border border-white/5 hover:border-white/10 transition-all duration-300 group"
            >
              <span className="opacity-40 group-hover:opacity-100 transition-opacity">“</span>
              {h}
              <span className="opacity-40 group-hover:opacity-100 transition-opacity">”</span>
            </button>
          ))}
        </div>
      </div>
    </div>

    <button
      className="btn-primary w-full h-14 text-lg font-bold shadow-2xl shadow-pride-purple/20 disabled:opacity-40"
      disabled={!text.trim()}
      onClick={() => onSubmit(text.trim())}
    >
      {isLast ? "Finish Journal" : "Next Reflection"}
    </button>
  </div>
  );
};

export default PromptScreen;
