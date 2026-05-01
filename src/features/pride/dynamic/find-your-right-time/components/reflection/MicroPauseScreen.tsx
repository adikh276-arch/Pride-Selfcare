import { motion } from "framer-motion";

interface Props {
  onContinue: () => void;
}

const MicroPauseScreen = ({ onContinue }: Props) => (
  <div className="premium-card p-10 md:p-12 text-center space-y-10 w-full animate-fade-in">
    <div className="text-6xl animate-pulse">🕊️</div>
    
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">
        Take a breath.
      </h2>
      <p className="text-lg text-muted-foreground leading-relaxed">
        Your journey is unique, and your safety always comes first. Honor your pace.
      </p>
    </div>

    <button
      onClick={onContinue}
      className="btn-primary w-full h-14 text-lg font-bold shadow-lg"
    >
      Continue
    </button>
  </div>
);

export default MicroPauseScreen;
