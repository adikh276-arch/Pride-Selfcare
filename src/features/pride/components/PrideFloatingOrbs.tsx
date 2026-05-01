import React from "react";

interface PrideFloatingOrbsProps {
  variant?: "pride" | "trans";
}

export const PrideFloatingOrbs: React.FC<PrideFloatingOrbsProps> = ({ variant = "pride" }) => {
  const colors = variant === "trans" 
    ? {
        one: "bg-[#55cdfc]/20",
        two: "bg-[#f7a8b8]/20",
        three: "bg-white/10"
      }
    : {
        one: "bg-purple-200/30",
        two: "bg-pink-100/30",
        three: "bg-blue-100/20"
      };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div className={`absolute top-[10%] left-[5%] w-64 h-64 rounded-full ${colors.one} blur-3xl animate-float-orb`} />
      <div className={`absolute bottom-[15%] right-[5%] w-80 h-80 rounded-full ${colors.two} blur-3xl animate-float-orb-reverse`} />
      <div className={`absolute top-[40%] right-[15%] w-48 h-48 rounded-full ${colors.three} blur-3xl animate-float-orb`} style={{ animationDelay: '2s' }} />
    </div>
  );
};
