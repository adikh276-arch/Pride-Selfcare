import { useEffect, useState } from "react";
import { sql } from "@/lib/db";
import { Loader2 } from "lucide-react";
import type { HistoryEntry } from "./ExplorerFlow";

interface HistoryScreenProps {
  onBack: () => void;
}

import { PrideActivityHeader } from "@/features/pride/components/PrideActivityHeader";
import { PrideFloatingOrbs } from "@/features/pride/components/PrideFloatingOrbs";

const HistoryScreen = ({ onBack }: HistoryScreenProps) => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const userId = sessionStorage.getItem('user_id');
        if (!userId) throw new Error('No user session');

        const rows = await sql`
          SELECT data FROM pride_spectrum_entries 
          WHERE user_id = ${userId} 
          ORDER BY created_at DESC
        `;
        
        const dbEntries = rows.map(r => r.data as HistoryEntry);
        
        const local = JSON.parse(localStorage.getItem("spectrum-history") || "[]");
        const combined = [...dbEntries];
        local.forEach((le: HistoryEntry) => {
          if (!combined.some(db => db.date === le.date)) combined.push(le);
        });

        setHistory(combined.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      } catch (err) {
        console.error('Failed to fetch history:', err);
        const data = JSON.parse(localStorage.getItem("spectrum-history") || "[]");
        setHistory(data);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="activity-root">
      <PrideFloatingOrbs />
      
      <div className="activity-container-sm py-8 flex flex-col min-h-screen relative z-10">
        <PrideActivityHeader 
          title="Past Explorations" 
          subtitle="Your journey history"
          onBack={onBack}
          className="mb-8"
        />

        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <Loader2 className="animate-spin text-pride-purple" size={40} />
          </div>
        ) : history.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center premium-card p-12 text-center">
            <div className="text-5xl mb-4">🍃</div>
            <p className="text-muted-foreground text-lg">No past explorations yet. Complete the activity to see your history here.</p>
          </div>
        ) : (
          <div className="space-y-6 flex-1 overflow-y-auto max-h-[70vh] no-scrollbar pb-8 px-1">
            {history.map((entry, i) => (
              <div key={i} className="premium-card p-6 border-l-4 border-l-pride-purple">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-bold text-pride-purple">
                    {new Date(entry.date).toLocaleDateString("en-US", { 
                      month: "short", 
                      day: "numeric", 
                      year: "numeric"
                    })}
                  </p>
                  <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest opacity-60">
                    {new Date(entry.date).toLocaleTimeString("en-US", { 
                      hour: "2-digit", 
                      minute: "2-digit" 
                    })}
                  </p>
                </div>
                <div className="space-y-3">
                  {entry.result.map((line, j) => (
                    <div key={j} className="flex gap-3 items-start bg-black/5 p-4 rounded-xl">
                      <div className="w-1 h-1 rounded-full bg-pride-purple mt-2 flex-shrink-0" />
                      <p className="text-foreground/80 text-sm leading-relaxed justified-text">{line}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-auto pt-6 space-y-4">
          <button
            onClick={onBack}
            className="btn-primary w-full"
          >
            Back to Explorer
          </button>
          
          <div className="opacity-60">
            <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">
              <span>🔐</span>
              <span>Private & Secure History</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryScreen;
