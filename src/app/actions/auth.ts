"use server";
import { sql } from "@/lib/db";

export async function ensureUserInDb(userId: string) {
  try {
    await sql`INSERT INTO users (id, updated_at) VALUES (${userId}, NOW()) ON CONFLICT (id) DO NOTHING`;
    return { success: true };
  } catch (err) {
    console.error("Failed to ensure user in DB:", err);
    return { success: false, error: err };
  }
}
