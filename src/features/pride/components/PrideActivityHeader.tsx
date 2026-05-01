import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
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

  return (
    <div className={cn("flex items-center gap-4 mb-10", className)}>
      <button
        onClick={handleBack}
        className="flex items-center justify-center w-11 h-11 rounded-xl bg-white backdrop-blur-sm text-[#64748B] hover:text-[#A855F7] hover:bg-white transition-all shadow-md hover:shadow-xl border border-gray-100"
        aria-label="Go back"
      >
        <ChevronLeft size={22} strokeWidth={2.5} />
      </button>
      <div>
        <h1 className="text-2xl font-bold text-gray-900 leading-tight">{title}</h1>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
    </div>
  );
};
