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
 * MySQL driver error code, e.g. "23505" for a unique-key violation.
 * API routes branch on this to return friendly conflict messages.
 */
export function getErrorCode(error: unknown): string | undefined {
  if (error && typeof error === "object" && "code" in error) {
    const code = (error as { code?: unknown }).code;
    if (typeof code === "string") return code;
  }
  return undefined;
}