import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  onDone: () => void;
}

const messages = [
  "You showed up for yourself today, and that takes real courage.",
  "You deserve gentleness — especially from yourself.",
  "Whatever you're carrying, you don't have to carry it perfectly.",
  "You are so much more than this moment — and this moment will pass.",
  "The fact that you paused to check in says something beautiful about you.",
];

const EndingScreen = ({ onDone }: Props) => {
  const navigate = useNavigate();
  const message = useMemo(() => messages[Math.floor(Math.random() * messages.length)], []);

  return (
  <div className="premium-card p-10 md:p-12 text-center space-y-10">
    <div className="text-6xl animate-bounce">🌈</div>
    <p className="text-xl font-bold text-foreground leading-relaxed">
      {message}
    </p>
    <button
      onClick={() => navigate('/lgbtq-hub')}
      className="btn-primary w-full h-14 text-lg font-bold shadow-lg"
    >
      Back to Hub
    </button>
  </div>
  );
};

export default EndingScreen;
