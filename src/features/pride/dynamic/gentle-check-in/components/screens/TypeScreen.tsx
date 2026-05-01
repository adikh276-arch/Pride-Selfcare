import { Check } from "lucide-react";
import type { CheckinData } from "../ComfortCheckin";

interface Props {
  data: CheckinData;
  setData: React.Dispatch<React.SetStateAction<CheckinData>>;
  onNext: () => void;
}

const options = [
  "I feel uncomfortable in my body",
  "I feel uncomfortable in a social situation",
  "I feel both",
  "I'm not sure what I'm feeling",
];

const TypeScreen = ({ data, setData, onNext }: Props) => (
  <div className="premium-card p-8 md:p-10 space-y-8">
    <h1 className="text-2xl font-bold text-foreground leading-tight">
      What feels uncomfortable right now?
    </h1>
    <div className="space-y-3">
      {options.map((opt) => {
        const selected = data.type === opt;
        return (
          <button
            key={opt}
            onClick={() => setData((d) => ({ ...d, type: opt }))}
            className={`w-full p-5 rounded-2xl text-left text-lg font-semibold transition-all duration-300 ${
              selected 
                ? "premium-card border-pride-purple/40 ring-2 ring-pride-purple/20 text-pride-purple bg-pride-purple/5 shadow-lg" 
                : "premium-card-interactive text-foreground/80 hover:text-foreground"
            }`}
          >
            <span className="flex items-center justify-between">
              {opt}
              {selected && (
                <div className="w-6 h-6 rounded-full bg-pride-purple flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </span>
          </button>
        );
      })}
    </div>
    <button
      onClick={onNext}
      disabled={!data.type}
      className="btn-primary w-full h-14 text-lg font-bold shadow-lg mt-4 disabled:opacity-40"
    >
      Continue
    </button>
  </div>
);

export default TypeScreen;
