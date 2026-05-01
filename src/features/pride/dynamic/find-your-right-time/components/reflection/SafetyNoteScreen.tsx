import { motion } from "framer-motion";

interface Props {
  onContinue: () => void;
}

const SafetyNoteScreen = ({ onContinue }: Props) => (
  <div className="premium-card p-10 md:p-12 text-center space-y-10 w-full animate-fade-in">
    <div className="text-6xl animate-pulse">💛</div>
    
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">
        Your safety matters most.
      </h2>
      <p className="text-lg text-muted-foreground leading-relaxed justified-text">
        You don't have to come out until you feel ready—and it's okay if that time isn't now. Trust your instincts and prioritize your well-being.
      </p>
    </div>

    <button
      onClick={onContinue}
      className="btn-primary w-full h-14 text-lg font-bold shadow-lg"
    >
      Continue Reflection
    </button>
  </div>
);

export default SafetyNoteScreen;
