"use server";
import { sql } from "@/lib/db";

export const initTables = async () => {
  try {
    // 0. Users Table (Identity source of truth)
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `;

    // 1. Daily Care Entries
    await sql`
      CREATE TABLE IF NOT EXISTS daily_care_entries (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id TEXT NOT NULL,
        activities TEXT[] NOT NULL,
        duration TEXT NOT NULL,
        mood TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;
    
    // 2. Mood Entries
    await sql`
      CREATE TABLE IF NOT EXISTS mood_entries (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id TEXT NOT NULL,
        value INTEGER NOT NULL,
        label TEXT NOT NULL,
        note TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;
    
    // 3. Sleep Entries
    await sql`
      CREATE TABLE IF NOT EXISTS sleep_entries (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id TEXT NOT NULL,
        bedtime TEXT NOT NULL,
        waketime TEXT NOT NULL,
        quality INTEGER NOT NULL,
        date DATE NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;
    
    // 4. Gratitude Entries
    await sql`
      CREATE TABLE IF NOT EXISTS gratitude_entries (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id TEXT NOT NULL,
        items TEXT[] NOT NULL,
        mood_emoji TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;
    
    // 5. Vibe Entries
    await sql`
      CREATE TABLE IF NOT EXISTS vibe_entries (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id TEXT NOT NULL,
        vibe TEXT NOT NULL,
        reflections JSONB NOT NULL DEFAULT '[]'::jsonb,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;

    // Execution Plan Tables
    const planTables = [
      'find_your_right_time_entries',
      'gentle_check_in_entries',
      'identity_exploration_entries',
      'identity_reflection_entries',
      'identity_journey_entries',
      'pride_journal_entries',
      'pride_mirror_moments_entries',
      'pride_spectrum_entries'
    ];

    for (const table of planTables) {
      await sql.query(`
        CREATE TABLE IF NOT EXISTS ${table} (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id TEXT NOT NULL,
          data JSONB NOT NULL DEFAULT '{}'::jsonb,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        );
      `);
    }

    // Add unique index for identity_journey_entries to support ON CONFLICT
    await sql`
      CREATE UNIQUE INDEX IF NOT EXISTS idx_identity_journey_user_week 
      ON identity_journey_entries (user_id, (data->>'week_start'));
    `;

    return { success: true };
  } catch (err) {
    console.error("Database initialization failed:", err);
    return { success: false, error: err };
  }
};
