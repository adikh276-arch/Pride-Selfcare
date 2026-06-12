"use client";
interface ProgressBarProps {
  current: number;
  total: number;
}

const prideColors = [
  "bg-pride-red",
  "bg-pride-orange",
  "bg-pride-yellow",
  "bg-pride-green",
  "bg-pride-blue",
  "bg-pride-purple",
];

const ProgressBar = ({ current, total }: ProgressBarProps) => {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden flex shadow-inner border border-white/5 backdrop-blur-sm">
      {prideColors.map((color, i) => {
        const segmentWidth = 100 / prideColors.length;
        const filled = Math.min(Math.max(percentage - segmentWidth * i, 0), segmentWidth);
        const filledPercent = (filled / segmentWidth) * 100;

        return (
          <div key={i} className="h-full relative overflow-hidden" style={{ width: `${segmentWidth}%` }}>
            <div
              className={`h-full ${color} transition-all duration-700 ease-[0.4,0,0.2,1] shadow-[0_0_10px_rgba(255,255,255,0.2)]`}
              style={{ width: `${filledPercent}%` }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ProgressBar;
