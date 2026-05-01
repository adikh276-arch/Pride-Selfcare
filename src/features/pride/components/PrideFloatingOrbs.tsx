import React from "react";

interface PrideFloatingOrbsProps {
  variant?: "pride" | "trans";
}

export const PrideFloatingOrbs: React.FC<PrideFloatingOrbsProps> = ({ variant = "pride" }) => {
  const colors = variant === "trans" 
    ? [
        "bg-[#55cdfc]/20",
        "bg-[#f7a8b8]/20",
        "bg-white/15",
        "bg-[#55cdfc]/10",
        "bg-[#f7a8b8]/10"
      ]
    : [
        "bg-pride-purple/15",
        "bg-pride-red/10",
        "bg-pride-blue/15",
        "bg-pride-yellow/10",
        "bg-pride-green/10"
      ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className={`absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full ${colors[0]} blur-[120px] animate-pulse duration-[10s]`} />
      <div className={`absolute bottom-[-15%] right-[-5%] w-[50vw] h-[50vw] rounded-full ${colors[1]} blur-[140px] animate-pulse duration-[12s]`} />
      <div className={`absolute top-[20%] right-[-10%] w-[30vw] h-[30vw] rounded-full ${colors[2]} blur-[100px] animate-pulse duration-[8s]`} />
      <div className={`absolute bottom-[10%] left-[-5%] w-[35vw] h-[35vw] rounded-full ${colors[3]} blur-[110px] animate-pulse duration-[15s]`} />
      <div className={`absolute top-[40%] left-[20%] w-[20vw] h-[20vw] rounded-full ${colors[4]} blur-[80px] animate-pulse duration-[9s]`} />
    </div>
  );
};
