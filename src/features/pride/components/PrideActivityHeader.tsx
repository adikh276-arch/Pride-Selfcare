import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface PrideActivityHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  className?: string;
}

export const PrideActivityHeader: React.FC<PrideActivityHeaderProps> = ({ 
  title, 
  subtitle, 
  onBack,
  className 
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate("/lgbtq-hub");
    }
  };

  const handleExit = () => {
    navigate("/lgbtq-hub");
  };

  return (
    <div className={cn("flex items-center justify-between mb-12 relative z-50", className)}>
      <div className="flex items-center gap-6">
        <button
          onClick={handleBack}
          className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md text-foreground hover:text-pride-purple hover:bg-white/20 transition-all shadow-lg border border-white/10 group"
          aria-label="Go back"
        >
          <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
        </button>
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-foreground tracking-tight leading-none">{title}</h1>
          {subtitle && <p className="text-base text-muted-foreground font-medium">{subtitle}</p>}
        </div>
      </div>

      <button
        onClick={handleExit}
        className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md text-foreground hover:text-pride-red hover:bg-white/20 transition-all shadow-lg border border-white/10 group"
        aria-label="Exit activity"
      >
        <X size={24} className="group-hover:rotate-90 transition-transform duration-500" />
      </button>
    </div>
  );
};
