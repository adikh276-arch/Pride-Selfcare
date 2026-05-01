import { motion } from "framer-motion";
import type { Answers } from "../../pages/Index";

interface Props {
  answers: Answers;
  onContinue: () => void;
}

const SuggestionsScreen = ({ answers, onContinue }: Props) => {
  const suggestions: { emoji: string; text: string }[] = [];

  if (answers.financial1 === "Dependent" || answers.financial2 === "No" || answers.financial2 === "Maybe") {
    suggestions.push({ emoji: "💰", text: "Build some financial stability" });
  }
  if (answers.family1 === "Unsupportive" || answers.family2 === "No" || answers.family2 === "Sometimes") {
    suggestions.push({ emoji: "🤝", text: "Share only with safe people" });
  }
  if (answers.emotional1 === "Not ready" || answers.emotional2 === "No" || answers.emotional2 === "Maybe") {
    suggestions.push({ emoji: "💛", text: "Take more time or talk to someone" });
  }
  if (answers.safety1 === "No" || answers.safety1 === "Somewhat" || answers.safety2 === "No" || answers.safety2 === "Maybe") {
    suggestions.push({ emoji: "🛡️", text: "Focus on creating a safe plan" });
  }

  if (suggestions.length === 0) {
    suggestions.push({ emoji: "✨", text: "You're in a great position — keep building your support network" });
  }

  return (
  <div className="flex flex-col items-center w-full space-y-8 animate-fade-in">
    <div className="text-center space-y-2">
      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">💡 Helpful Next Steps</p>
      <h2 className="text-3xl font-bold text-foreground">Actionable Guidance</h2>
    </div>

    <div className="w-full space-y-4">
      {suggestions.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="premium-card p-6 flex items-center gap-5 group hover:border-pride-blue/30 transition-all duration-300"
        >
          <div className="w-14 h-14 bg-black/5 rounded-2xl flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition-transform">
            {s.emoji}
          </div>
          <p className="text-lg font-bold text-foreground leading-snug">{s.text}</p>
        </motion.div>
      ))}
    </div>

    <button
      onClick={onContinue}
      className="btn-primary w-full h-14 text-lg font-bold shadow-lg mt-4"
    >
      Complete Reflection
    </button>
  </div>
  );
};

export default SuggestionsScreen;
