import { motion } from "framer-motion";
import { Save, History, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface Props {
  onSave: () => void;
  onViewHistory: () => void;
  onGoHome: () => void;
}

const ClosingScreen = ({ onSave, onViewHistory, onGoHome }: Props) => {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onSave();
    setSaved(true);
  };

  return (
  <div className="premium-card p-10 md:p-12 text-center space-y-10 w-full animate-fade-in">
    <div className="text-6xl animate-bounce">🌸</div>
    
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">
        Honor Your Pace.
      </h2>
      <p className="text-lg text-muted-foreground leading-relaxed justified-text">
        There's no single "right" time to come out. The only right time is the one that feels safe, comfortable, and authentic to you.
      </p>
    </div>

    <div className="w-full space-y-4">
      <button
        onClick={handleSave}
        disabled={saved}
        className="btn-primary w-full h-14 text-lg font-bold shadow-lg flex items-center justify-center gap-3 disabled:opacity-60"
      >
        <Save size={20} />
        {saved ? "Reflection Saved ✓" : "Save My Reflection"}
      </button>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={onViewHistory}
          className="btn-secondary w-full h-14 flex items-center justify-center gap-2"
        >
          <History size={18} />
          History
        </button>

        <button
          onClick={() => navigate('/lgbtq-hub')}
          className="btn-secondary w-full h-14 flex items-center justify-center gap-2"
        >
          <Home size={18} />
          Hub
        </button>
      </div>
    </div>
  </div>
  );
};

export default ClosingScreen;
