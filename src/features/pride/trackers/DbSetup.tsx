"use client";
import { useState } from "react";
// sql import removed
import { PrideActivityHeader } from "../components/PrideActivityHeader";
import { PrideFloatingOrbs } from "../components/PrideFloatingOrbs";

import { initTables } from "@/app/actions/db";

export default function DbSetup() {
  const [status, setStatus] = useState<string>("Ready to initialize tables...");
  const [loading, setLoading] = useState(false);

  const handleInit = async () => {
    setLoading(true);
    setStatus("Initializing...");
    try {
      await initTables();
      setStatus("✅ All tables created successfully (including Users table)!");
    } catch (err: any) {
      setStatus("❌ Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="activity-root bg-[#FDFCFE] py-8">
      <PrideFloatingOrbs />
      <div className="activity-container-sm">
        <PrideActivityHeader title="Database Setup" subtitle="Initialize Neon tables" />
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white space-y-6">
          <p className="text-gray-600 leading-relaxed">
            This tool will create all necessary tables in your Neon database for the Pride trackers and activities.
          </p>
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 font-mono text-sm break-all">
            {status}
          </div>
          <button
            onClick={handleInit}
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
          >
            {loading ? "Initializing..." : "Run Initialization"}
          </button>
        </div>
      </div>
    </div>
  );
}
