/**
 * Fail-fast accessors for required environment variables.
 *
 * These deliberately have NO hardcoded fallbacks. A committed default for
 * ADMIN_JWT_SECRET would let anyone forge a blog-admin session, and a
 * hardcoded Supabase URL/key would silently point production at the wrong
 * project. Missing configuration must stop the app loudly instead.
 */

function describeEnv(name: string): string {
  return (
    `\n\nMissing required environment variable: ${name}\n` +
    `Set it in .env.local (development) or .env.production (production) — ` +
    `on Hostinger set it in the Node app's Environment Variables section.\n` +
    `Note: NEXT_PUBLIC_* values are inlined at BUILD time, so they must be ` +
    `present when running "next build", not only at runtime.`
  );
}

/** Read a required env var, throwing an actionable error if it is absent. */
export function requireEnv(name: string): string {
  const raw = process.env[name];
  const value = typeof raw === "string" ? raw.trim() : "";
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}.${describeEnv(name)}`);
  }
  return value;
}

/**
 * Read the first non-empty env var from `names`, preserving precedence.
 * Throws only when none of them are set.
 */
export function requireFirstEnv(names: string[]): string {
  for (const name of names) {
    const raw = process.env[name];
    const value = typeof raw === "string" ? raw.trim() : "";
    if (value) return value;
  }
  throw new Error(
    `Missing required environment variable: one of ${names.join(", ")} is required.${describeEnv(
      names.join(" / ")
    )}`
  );
}

/** Supabase project URL (no trailing slash). */
export function getSupabaseUrl(): string {
  return requireEnv("NEXT_PUBLIC_SUPABASE_URL").replace(/\/+$/, "");
}

/**
 * Supabase API key, highest privilege first.
 * Service role bypasses RLS; the publishable/anon keys do not.
 */
export function getSupabaseKey(): string {
  return requireFirstEnv([
    "SUPABASE_SERVICE_ROLE_KEY",
    "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  ]);
}

/** Secret used to sign blog-admin session tokens. Must be long and random. */
export function getAdminJwtSecret(): string {
  return requireEnv("ADMIN_JWT_SECRET");
}

/** Master admin login, used when no matching row exists in the users table. */
export function getAdminCredentials(): { username: string; password: string } {
  return {
    username: requireEnv("ADMIN_USERNAME"),
    password: requireEnv("ADMIN_PASSWORD"),
  };
}