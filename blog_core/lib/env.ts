/**
 * Fail-fast accessors for required environment variables with sensible local defaults.
 */

function describeEnv(name: string): string {
  return (
    `\n\nMissing required environment variable: ${name}\n` +
    `Set it in .env.local (development) or .env.production (production).\n`
  );
}

/** Read a required env var with an optional fallback. */
export function requireEnv(name: string, fallback?: string): string {
  const raw = process.env[name];
  const value = typeof raw === "string" ? raw.trim() : "";
  if (!value && typeof fallback === "undefined") {
    throw new Error(`Missing required environment variable: ${name}.${describeEnv(name)}`);
  }
  return value || (fallback ?? "");
}

/** Secret used to sign blog-admin session tokens. */
export function getAdminJwtSecret(): string {
  return (
    process.env.ADMIN_JWT_SECRET ||
    "siddhant_school_of_yoga_jwt_secret_key_2026_default_fallback"
  );
}

/** Master admin login, used when no matching row exists in the users table. */
export function getAdminCredentials(): { username: string; password: string } {
  return {
    username: process.env.ADMIN_USERNAME || "admin",
    password: process.env.ADMIN_PASSWORD || "admin@123",
  };
}