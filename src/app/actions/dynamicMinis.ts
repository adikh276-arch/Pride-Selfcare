"use server";
import { sql } from "@/lib/db";

const ALLOWED_TABLES = [
  'find_your_right_time_entries',
  'gentle_check_in_entries',
  'identity_exploration_entries',
  'identity_reflection_entries',
  'identity_journey_entries',
  'pride_journal_entries',
  'pride_mirror_moments_entries',
  'pride_spectrum_entries'
];

export async function saveDynamicMiniEntry(tableName: string, userId: string, data: any) {
  if (!ALLOWED_TABLES.includes(tableName)) {
    return { success: false, error: "Invalid table name" };
  }

  try {
    if (tableName === 'identity_journey_entries') {
      // Special case for identity journey (has unique constraint)
      await sql`
        INSERT INTO identity_journey_entries (user_id, data, updated_at)
        VALUES (${userId}, ${JSON.stringify(data)}::jsonb, NOW())
        ON CONFLICT (user_id, (data->>'week_start')) 
        DO UPDATE SET data = ${JSON.stringify(data)}::jsonb, updated_at = NOW()
      `;
    } else {
      // Generic case using sql string for table name is tricky in postgres tagged templates, 
      // so we use a switch or direct string construction safely since we validated tableName
      await sql.query(`
        INSERT INTO ${tableName} (user_id, data, updated_at)
        VALUES ($1, $2::jsonb, NOW())
      `, [userId, JSON.stringify(data)]);
    }
    
    return { success: true };
  } catch (err) {
    console.error(`Failed to save entry to ${tableName}:`, err);
    return { success: false, error: "Database error" };
  }
}

export async function getDynamicMiniHistory(tableName: string, userId: string) {
  if (!ALLOWED_TABLES.includes(tableName)) {
    return { success: false, error: "Invalid table name" };
  }

  try {
    const rows = await sql.query(`
      SELECT * FROM ${tableName} 
      WHERE user_id = $1 
      ORDER BY created_at DESC 
      LIMIT 30
    `, [userId]);
    
    return { success: true, data: JSON.parse(JSON.stringify(rows.rows || rows)) };
  } catch (err) {
    console.error(`Failed to fetch history for ${tableName}:`, err);
    return { success: false, error: "Database error" };
  }
}

export async function deleteDynamicMiniEntry(tableName: string, id: string, userId: string) {
  if (!ALLOWED_TABLES.includes(tableName)) {
    return { success: false, error: "Invalid table name" };
  }

  try {
    await sql.query(`
      DELETE FROM ${tableName} 
      WHERE id = $1 AND user_id = $2
    `, [id, userId]);
    
    return { success: true };
  } catch (err) {
    console.error(`Failed to delete entry from ${tableName}:`, err);
    return { success: false, error: "Database error" };
  }
}
