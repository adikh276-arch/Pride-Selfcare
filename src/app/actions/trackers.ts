"use server";
import { sql } from "@/lib/db";

export async function saveMoodEntry(userId: string, value: number, label: string, note: string) {
  try {
    await sql`
      INSERT INTO mood_entries (user_id, value, label, note)
      VALUES (${userId}, ${value}, ${label}, ${note})
    `;
    return { success: true };
  } catch (err) {
    console.error("Failed to save mood:", err);
    return { success: false, error: "Database error" };
  }
}

export async function getTrackerHistory(tableName: string, userId: string) {
  // Use a switch or specific queries to avoid SQL injection on table name
  try {
    let rows: any[] = [];
    if (tableName === 'mood_entries') {
      rows = await sql`SELECT * FROM mood_entries WHERE user_id = ${userId} ORDER BY created_at DESC LIMIT 30`;
    } else if (tableName === 'sleep_entries') {
      rows = await sql`SELECT * FROM sleep_entries WHERE user_id = ${userId} ORDER BY created_at DESC LIMIT 30`;
    } else if (tableName === 'vibe_entries') {
      rows = await sql`SELECT * FROM vibe_entries WHERE user_id = ${userId} ORDER BY created_at DESC LIMIT 30`;
    } else if (tableName === 'gratitude_entries') {
      rows = await sql`SELECT * FROM gratitude_entries WHERE user_id = ${userId} ORDER BY created_at DESC LIMIT 30`;
    } else if (tableName === 'daily_care_entries') {
      rows = await sql`SELECT * FROM daily_care_entries WHERE user_id = ${userId} ORDER BY created_at DESC LIMIT 30`;
    }
    
    // Ensure all returned rows are perfectly serializable
    return { success: true, data: JSON.parse(JSON.stringify(rows)) };
  } catch (err) {
    console.error("Failed to fetch tracker history:", err);
    return { success: false, error: "Database error" };
  }
}

// Reusable action for other trackers
export async function saveGenericTrackerEntry(tableName: string, userId: string, data: any) {
  try {
    if (tableName === 'sleep_entries') {
       await sql`INSERT INTO sleep_entries (user_id, bedtime, waketime, quality, date) VALUES (${userId}, ${data.bedtime}, ${data.waketime}, ${data.quality}, ${data.date})`;
    } else if (tableName === 'vibe_entries') {
       await sql`INSERT INTO vibe_entries (user_id, vibe, reflections) VALUES (${userId}, ${data.vibe}, ${JSON.stringify(data.reflections)})`;
    } else if (tableName === 'gratitude_entries') {
       await sql`INSERT INTO gratitude_entries (user_id, items, mood_emoji) VALUES (${userId}, ${data.items}, ${data.mood_emoji})`;
    } else if (tableName === 'daily_care_entries') {
       await sql`INSERT INTO daily_care_entries (user_id, activities, duration, mood) VALUES (${userId}, ${data.activities}, ${data.duration}, ${data.mood})`;
    }
    return { success: true };
  } catch (err) {
    console.error("Failed to save tracker entry:", err);
    return { success: false, error: "Database error" };
  }
}
