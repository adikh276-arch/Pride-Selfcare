"use client";
import type { CheckinData } from "../ComfortCheckin";

interface Props {
  data: CheckinData;
  setData: React.Dispatch<React.SetStateAction<CheckinData>>;
  onSave: () => void;
}

const NoteScreen = ({ data, setData, onSave }: Props) => (
  <div className="premium-card p-8 md:p-10 space-y-8">
    <h1 className="text-2xl font-bold text-foreground leading-tight">
      Would you like to add a small note?
    </h1>
    <textarea
      value={data.note}
      onChange={(e) => setData((d) => ({ ...d, note: e.target.value }))}
      placeholder="Anything you want to note... (optional)"
      rows={5}
      className="w-full p-6 rounded-2xl bg-white/50 border border-border text-foreground placeholder:text-muted-foreground/40 text-lg outline-none resize-none leading-relaxed focus:ring-2 focus:ring-pride-purple/30 transition-all"
    />
    <button
      onClick={onSave}
      className="btn-primary w-full h-14 text-lg font-bold shadow-lg"
    >
      Save Check-In
    </button>
  </div>
);

export default NoteScreen;
