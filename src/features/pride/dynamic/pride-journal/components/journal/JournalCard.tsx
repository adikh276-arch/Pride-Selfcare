"use client";
import { useState } from "react";
import SparkleEffect from "./SparkleEffect";
import StickerPicker from "./StickerPicker";
import { cn } from "@/lib/utils";

const BG_CLASSES = [
  "bg-pride-red",
  "bg-pride-orange",
  "bg-pride-yellow",
  "bg-pride-green",
  "bg-pride-blue",
  "bg-pride-purple",
];

interface JournalCardProps {
  index: number;
  text: string;
  sticker: string | null;
  onStickerSelect?: (s: string) => void;
  flipped?: boolean;
  compact?: boolean;
  noSparkle?: boolean;
}

const JournalCard = ({ index, text, sticker, onStickerSelect, flipped = false, compact = false, noSparkle = false }: JournalCardProps) => {
  const [sparkle, setSparkle] = useState(false);
  const bg = BG_CLASSES[index % BG_CLASSES.length];

  const handleFlip = () => {
    if (flipped && !noSparkle) setSparkle(true);
  };

  useState(() => {
    if (flipped && !noSparkle) {
      setTimeout(() => setSparkle(true), 300);
    }
  });

  return (
    <div className="perspective-[1000px] w-full">
      <div
        className={cn(
          "relative journal-card overflow-hidden transition-all duration-500 rounded-[2rem] shadow-xl border border-white/10",
          bg,
          flipped ? "flipped" : "",
          compact ? "min-h-[140px]" : "min-h-[200px]"
        )}
        onAnimationEnd={handleFlip}
      >
        {!noSparkle && <SparkleEffect active={sparkle} />}
        {!flipped ? (
          <div className="journal-card-front flex items-center justify-center h-full bg-black/20 backdrop-blur-sm">
            <span className="text-4xl opacity-40 animate-pulse">📝</span>
          </div>
        ) : (
          <div className="journal-card-back absolute inset-0 p-8 flex flex-col justify-between bg-black/30 backdrop-blur-md">
            <p className="text-white text-lg font-bold leading-relaxed justified-text italic">
              <span className="opacity-40 mr-1">“</span>
              {text}
              <span className="opacity-40 ml-1">”</span>
            </p>
            <div className="flex justify-between items-end">
              {sticker && <span className="text-3xl drop-shadow-lg">{sticker}</span>}
              {onStickerSelect && <StickerPicker selected={sticker} onSelect={onStickerSelect} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JournalCard;
