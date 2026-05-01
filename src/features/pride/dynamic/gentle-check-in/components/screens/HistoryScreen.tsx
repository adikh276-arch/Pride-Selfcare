import { motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { sql } from "@/lib/db";
import type { CheckinEntry } from "../ComfortCheckin";

interface Props {
  onBack: () => void;
}

const STORAGE_KEY = "rightnow-checkin-entries";

const HistoryScreen = ({ onBack }: Props) => {
  const [entries, setEntries] = useState<CheckinEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const userId = sessionStorage.getItem('user_id');
        if (!userId) throw new Error('No user session');

        const rows = await sql`
          SELECT data FROM gentle_check_in_entries 
          WHERE user_id = ${userId} 
          ORDER BY created_at DESC
        `;
        
        const dbEntries = rows.map(r => r.data as CheckinEntry);
        
        // Merge with local storage for transition
        const localEntries = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        
        const combined = [...dbEntries];
        localEntries.forEach((le: CheckinEntry) => {
          if (!combined.some(db => db.id === le.id || db.date === le.date)) {
            combined.push(le);
          }
        });

        setEntries(combined.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      } catch (err) {
        console.error('Failed to fetch from DB, using localStorage:', err);
        const localEntries = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        setEntries(localEntries);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  return (
    <div className="w-full space-y-6 max-h-[75vh] overflow-y-auto no-scrollbar pb-8 px-1">
      {loading ? (
        <div className="py-20 flex justify-center">
          <Loader2 className="animate-spin text-pride-purple" size={40} />
        </div>
      ) : entries.length === 0 ? (
        <div className="premium-card p-12 text-center text-muted-foreground text-lg">
          No check-ins yet. Take a moment for yourself!
        </div>
      ) : (
        <div className="space-y-6">
          {entries.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="premium-card p-6 border-l-4 border-l-pride-green space-y-3"
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-pride-green">
                  {new Date(entry.date).toLocaleDateString("en-US", { 
                    month: "short", 
                    day: "numeric", 
                    year: "numeric"
                  })}
                </span>
                <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest opacity-60">
                  {new Date(entry.date).toLocaleTimeString("en-US", { 
                    hour: "2-digit", 
                    minute: "2-digit" 
                  })}
                </span>
              </div>
              
              <div className="space-y-1">
                <p className="text-lg font-bold text-foreground">{entry.type}</p>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 flex-1 bg-black/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-pride-green opacity-60 transition-all duration-1000" 
                      style={{ width: `${(parseInt(entry.intensity) || 0) * 20}%` }} 
                    />
                  </div>
                  <span className="text-xs font-bold text-muted-foreground">{entry.intensity}</span>
                </div>
              </div>

              {entry.note && (
                <div className="bg-black/5 p-4 rounded-xl">
                  <p className="text-sm text-foreground/80 italic leading-relaxed justified-text">
                    "{entry.note}"
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryScreen;
