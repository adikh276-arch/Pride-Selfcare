"use client";
const COLORS = [
  "bg-pride-red",
  "bg-pride-orange",
  "bg-pride-yellow",
  "bg-pride-green",
  "bg-pride-blue",
  "bg-pride-purple",
];

const ProgressBar = ({ current, total }: { current: number; total: number }) => {
  return (
    <div className="w-full text-center space-y-4">
      <p className="text-xs font-black uppercase tracking-widest text-muted-foreground opacity-60">
        Your Gratitude Journey • {current} / {total}
      </p>
      <div className="flex gap-2 justify-center">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-2.5 rounded-full transition-all duration-700 ease-[0.4,0,0.2,1] shadow-sm ${
              i < current 
                ? COLORS[i % COLORS.length] + " w-12 shadow-[0_0_10px_rgba(255,255,255,0.2)]" 
                : "bg-white/10 w-4"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
