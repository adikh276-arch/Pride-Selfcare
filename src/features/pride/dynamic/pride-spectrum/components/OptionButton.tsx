"use client";
import { cn } from "@/lib/utils";

interface OptionButtonProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

const OptionButton = ({ label, selected, onClick }: OptionButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full py-5 px-8 text-left font-bold transition-all duration-300 rounded-2xl",
        selected
          ? "premium-card border-pride-purple/40 ring-2 ring-pride-purple/20 text-pride-purple bg-pride-purple/5 shadow-lg"
          : "premium-card-interactive text-foreground/80 hover:text-foreground"
      )}
    >
      <div className="flex items-center justify-between w-full">
        <span className="text-lg">{label}</span>
        {selected && (
          <div className="w-6 h-6 rounded-full bg-pride-purple flex items-center justify-center shadow-md animate-in zoom-in duration-300">
            <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
      </div>
    </button>
  );
};

export default OptionButton;
