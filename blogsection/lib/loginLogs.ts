import { supabase } from "./supabase";

export interface LoginLogEntry {
  id: string;
  username: string;
  name: string;
  role: string;
  ip: string;
  user_agent: string;
  status: "success" | "failed";
  created_at: string;
}

/** Nullable shape of a raw `login_logs` row as returned by Supabase. */
interface LoginLogRow {
  id?: unknown;
  username?: string | null;
  name?: string | null;
  role?: string | null;
  ip?: string | null;
  user_agent?: string | null;
  status?: string | null;
  created_at?: string | null;
}

const TABLE = "login_logs";
const MAX_FETCH = 100;

function toEntry(row: LoginLogRow): LoginLogEntry {
  return {
    id: String(row.id),
    username: row.username || "",
    name: row.name || row.username || "",
    role: row.role || "",
    ip: row.ip || "127.0.0.1",
    user_agent: row.user_agent || "Browser",
    status: row.status === "failed" ? "failed" : "success",
    created_at: row.created_at || new Date().toISOString(),
  };
}

/**
 * Append a login attempt to the Supabase `login_logs` table.
 *
 * Throws if the insert fails so the caller can report it — previously the
 * error was swallowed by an empty catch, which made a missing table look
 * like a working audit trail.
 */
export async function recordLoginLog(
  entry: Omit<LoginLogEntry, "id" | "created_at"> & { id?: string; created_at?: string }
): Promise<LoginLogEntry> {
  const logItem: LoginLogEntry = {
    id: entry.id || `log_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    username: entry.username || "unknown",
    name: entry.name || entry.username || "Unknown",
    role: entry.role || "unknown",
    ip: entry.ip || "127.0.0.1",
    user_agent: entry.user_agent || "Browser",
    status: entry.status || "success",
    created_at: entry.created_at || new Date().toISOString(),
  };

  const { error } = await supabase.from(TABLE).insert([
    {
      username: logItem.username,
      name: logItem.name,
      role: logItem.role,
      ip: logItem.ip,
      user_agent: logItem.user_agent,
      status: logItem.status,
      created_at: logItem.created_at,
    },
  ]);

  if (error) {
    throw new Error(`Failed to record login log: ${error.message}`);
  }

  return logItem;
}

/** Most recent login attempts, newest first. */
export async function getLoginLogs(): Promise<LoginLogEntry[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("created_at", { ascending: false })
    .limit(MAX_FETCH);

  if (error) {
    throw new Error(`Failed to fetch login logs: ${error.message}`);
  }

  if (!Array.isArray(data)) return [];
  return (data as LoginLogRow[]).map(toEntry);
}

/** Delete every login log row. */
export async function clearLoginLogs(): Promise<boolean> {
  const { error } = await supabase.from(TABLE).delete().gte("id", 0);
  if (error) {
    throw new Error(`Failed to clear login logs: ${error.message}`);
  }
  return true;
}

/**
 * Fire-and-forget variant for the login path.
 *
 * A broken or missing audit log must never stop someone from signing in, so
 * failures are logged server-side and swallowed here. Use `recordLoginLog`
 * directly wherever a write failure genuinely matters.
 */
export async function safeRecordLoginLog(
  entry: Omit<LoginLogEntry, "id" | "created_at"> & { id?: string; created_at?: string }
): Promise<void> {
  try {
    await recordLoginLog(entry);
  } catch (err) {
    console.error("Login log write failed:", err);
  }
}