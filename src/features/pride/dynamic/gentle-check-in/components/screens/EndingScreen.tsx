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
    <div className="space-y-8">
      <div className="text-5xl">💛</div>
      <p className="text-lg font-medium text-foreground leading-relaxed" style={{ textWrap: "balance" }}>
        {message}
      </p>
      <button
        onClick={() => navigate('/lgbtq-hub')}
        className="h-14 w-full rounded-full bg-primary text-primary-foreground font-medium text-base transition-all active:scale-95"
      >
        Back to Hub
      </button>
    </div>
  );
};

export default EndingScreen;
