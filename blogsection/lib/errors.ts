import type { AppError } from "./types";

/**
 * Narrow an unknown thrown value to an `AppError` so callers can read
 * `message` / `code` off it without resorting to `any`.
 */
export function toAppError(error: unknown): AppError {
  if (error instanceof Error) return error as AppError;
  return new Error(typeof error === "string" && error ? error : "Unknown error");
}

/** Readable message from an unknown thrown value, with a safe fallback. */
export function getErrorMessage(error: unknown, fallback = "Something went wrong"): string {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error) return error;
  return fallback;
}

/**
 * MySQL driver error code, e.g. "ER_DUP_ENTRY", 1062, or "23505" for unique-key violation.
 */
export function getErrorCode(error: unknown): string | undefined {
  if (error && typeof error === "object") {
    const err = error as Record<string, unknown>;
    if (typeof err.code === "string") return err.code;
    if (typeof err.errno === "number") return String(err.errno);
    if (typeof err.sqlState === "string") return err.sqlState;
  }
  return undefined;
}

export function isDuplicateKeyError(error: unknown): boolean {
  if (error && typeof error === "object") {
    const err = error as Record<string, unknown>;
    if (err.code === "ER_DUP_ENTRY" || err.errno === 1062 || err.code === "23505") {
      return true;
    }
  }
  return false;
}