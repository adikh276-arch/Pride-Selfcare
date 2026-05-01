import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  onStart: () => void;
  onViewHistory: () => void;
}

const WelcomeScreen = ({ onStart, onViewHistory }: Props) => {
  const navigate = useNavigate();
  return (
  <div className="premium-card p-10 md:p-12 text-center space-y-10">
    <div className="w-20 h-20 bg-pride-green/10 rounded-full flex items-center justify-center mx-auto text-5xl">
      🌿
    </div>

    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-foreground">
        Right Now Check-In
      </h1>
      <p className="text-lg text-muted-foreground leading-relaxed justified-text">
        Take a moment to notice how you feel right now.
        There's no pressure—just a safe space to breathe and reflect.
      </p>
    </div>

    <div className="space-y-4 pt-4">
      <button
        onClick={onStart}
        className="btn-primary w-full h-14 text-lg font-bold"
      >
        Begin Check-In
      </button>
      <button
        onClick={onViewHistory}
        className="btn-secondary w-full h-14"
      >
        Past Entries
      </button>
    </div>
  </div>
  );
};

export default WelcomeScreen;
