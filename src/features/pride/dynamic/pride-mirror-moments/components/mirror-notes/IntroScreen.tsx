import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface IntroScreenProps {
  onStart: () => void;
  onBack?: () => void;
}

const IntroScreen = ({ onStart, onBack }: IntroScreenProps) => {
  return (
    <div className="premium-card p-10 md:p-12 text-center w-full space-y-10 animate-fade-in relative z-10">
      <div className="w-24 h-24 bg-pride-blue/10 rounded-full flex items-center justify-center mx-auto text-6xl shadow-inner">
        🪞
      </div>

      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-foreground">
          Mirror Moments
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed justified-text">
          Sometimes we notice our flaws easily but forget to acknowledge our strengths.
          This activity invites you to leave small notes of appreciation for yourself.
        </p>
      </div>

      <div className="relative w-52 h-64 mx-auto my-6">
        <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-pride-blue/20 to-pride-purple/10 border-4 border-white/40 shadow-2xl backdrop-blur-md overflow-hidden">
          <div className="absolute inset-0 bg-white/10 flex items-center justify-center text-8xl opacity-10 blur-sm">
            ✨
          </div>
        </div>
        {/* Decorative sticky notes */}
        {[
          { color: "bg-pride-red/80", rotate: -8, top: "15%", left: "-18%" },
          { color: "bg-pride-yellow/80", rotate: 6, top: "40%", right: "-22%" },
          { color: "bg-pride-blue/80", rotate: -4, bottom: "12%", left: "-12%" },
        ].map((note, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.2, type: "spring" }}
            className={`absolute w-16 h-16 ${note.color} rounded-xl shadow-lg border border-white/20`}
            style={{
              rotate: `${note.rotate}deg`,
              top: note.top,
              bottom: note.bottom,
              left: note.left,
              right: note.right,
            }}
          />
        ))}
      </div>

      <Button variant="pride" size="lg" onClick={onStart} className="w-full h-14 text-lg font-bold shadow-xl">
        Start Appreciating
      </Button>
    </div>
  );
};

export default IntroScreen;
