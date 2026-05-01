import { motion } from "framer-motion";
import { ArrowLeft, History } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  onStart: () => void;
  onViewHistory: () => void;
}

const WelcomeScreen = ({ onStart, onViewHistory }: Props) => {
  const navigate = useNavigate();
  return (
  <div className="premium-card p-10 md:p-12 text-center space-y-10 w-full animate-fade-in relative z-10">
    <div className="w-20 h-20 bg-pride-yellow/10 rounded-full flex items-center justify-center mx-auto text-5xl">
      🛡️
    </div>

    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-foreground">
        Finding Your Right Time
      </h1>
      <p className="text-lg text-muted-foreground leading-relaxed justified-text">
        A private space to reflect on your coming out journey. Explore what feels safe, comfortable, and right for you.
      </p>
      <div className="flex items-center justify-center gap-2 text-sm font-bold text-pride-yellow/80 uppercase tracking-widest pt-2">
        <span>Takes about 3–4 minutes</span>
      </div>
    </div>

    <div className="space-y-4 pt-4">
      <button
        onClick={onStart}
        className="btn-primary w-full h-14 text-lg font-bold shadow-lg"
      >
        Begin Reflection
      </button>
      <button
        onClick={onViewHistory}
        className="btn-secondary w-full h-14"
      >
        View Past Reflections
      </button>
    </div>
  </div>
  );
};

export default WelcomeScreen;
