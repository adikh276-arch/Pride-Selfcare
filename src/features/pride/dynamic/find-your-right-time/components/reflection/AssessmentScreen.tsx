import { motion } from "framer-motion";

interface Props {
  step: number;
  totalSteps: number;
  q1: string;
  q1Options: string[];
  q1Answer?: string;
  onQ1: (value: string) => void;
  q2: string;
  q2Options: string[];
  q2Answer?: string;
  onQ2: (value: string) => void;
  onNext: () => void;
  bgColor: "lavender" | "pink" | "blue" | "peach" | "mint";
}

const colorMap: Record<string, string> = {
  lavender: "bg-lavender",
  pink: "bg-pink",
  blue: "bg-blue",
  peach: "bg-peach",
  mint: "bg-mint",
};

const activeColorMap: Record<string, string> = {
  lavender: "bg-lavender ring-2 ring-primary/30",
  pink: "bg-pink ring-2 ring-primary/30",
  blue: "bg-blue ring-2 ring-primary/30",
  peach: "bg-peach ring-2 ring-primary/30",
  mint: "bg-mint ring-2 ring-primary/30",
};

const ProgressDots = ({ step, total }: { step: number; total: number }) => (
  <div className="flex gap-3 justify-center py-6">
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        className={`h-2 rounded-full transition-all duration-500 ${
          i < step ? "w-8 bg-pride-purple shadow-[0_0_10px_rgba(168,85,247,0.4)]" : "w-2 bg-pride-purple/10"
        }`}
      />
    ))}
  </div>
);

const OptionButton = ({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`w-full py-5 px-6 rounded-2xl text-left font-bold transition-all duration-300 ${
      selected 
        ? "premium-card border-pride-purple/40 ring-2 ring-pride-purple/20 text-pride-purple bg-pride-purple/5 shadow-lg" 
        : "premium-card-interactive text-foreground/80 hover:text-foreground"
    }`}
  >
    {label}
  </button>
);

const AssessmentScreen = ({
  step,
  totalSteps,
  q1,
  q1Options,
  q1Answer,
  onQ1,
  q2,
  q2Options,
  q2Answer,
  onQ2,
  onNext,
}: Props) => {
  const canContinue = q1Answer && q2Answer;

  return (
    <div className="flex flex-col items-center w-full space-y-8 animate-fade-in">
      <ProgressDots step={step} total={totalSteps} />

      <div className="premium-card p-8 w-full space-y-6">
        <p className="text-xl font-bold text-foreground leading-tight">
          {q1}
        </p>
        <div className="space-y-3">
          {q1Options.map((opt) => (
            <OptionButton
              key={opt}
              label={opt}
              selected={q1Answer === opt}
              onClick={() => onQ1(opt)}
            />
          ))}
        </div>
      </div>

      {q1Answer && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="premium-card p-8 w-full space-y-6"
        >
          <p className="text-xl font-bold text-foreground leading-tight">
            {q2}
          </p>
          <div className="space-y-3">
            {q2Options.map((opt) => (
              <OptionButton
                key={opt}
                label={opt}
                selected={q2Answer === opt}
                onClick={() => onQ2(opt)}
              />
            ))}
          </div>
        </motion.div>
      )}

      {canContinue && (
        <button
          onClick={onNext}
          className="btn-primary w-full h-14 text-lg font-bold shadow-lg mt-4"
        >
          Continue
        </button>
      )}
    </div>
  );
};

export default AssessmentScreen;
