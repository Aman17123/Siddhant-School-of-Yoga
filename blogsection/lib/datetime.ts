/**
 * Publish-date helpers shared by the server routes and the dashboard editor.
 *
 * Deliberately dependency-free: `schedule.ts` imports the Supabase client, which
 * throws at module load when env vars are missing, so the client bundle must not
 * reach this code through it.
 *
 * A scheduled post is a post with `status = 'scheduled'` and a future
 * `published_at`. `<input type="datetime-local">` has no timezone — its value is
 * a *local* wall-clock string — so it must be filled from local getters and
 * parsed back as local time. Slicing `toISOString()` (UTC) into the input showed
 * and re-saved the UTC wall clock, drifting every schedule by the admin's UTC
 * offset each time the post was reopened.
 */

export type PostStatus = "published" | "draft" | "scheduled";

function parseDate(value: string | null | undefined): Date | null {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

/**
 * Formats a stored timestamp for a `datetime-local` input.
 *
 * Uses the *local* getters so the value shown in the editor matches the instant
 * the admin picked, in their own timezone.
 */
export function toDateTimeLocal(value: string | null | undefined): string {
  const date = parseDate(value);
  if (!date) return "";
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
    `T${pad(date.getHours())}:${pad(date.getMinutes())}`
  );
}

/**
 * Converts a `datetime-local` value into the absolute ISO timestamp to store.
 *
 * `new Date()` already reads that string as local time; `.toISOString()` turns it
 * into the UTC instant. Returns null for an empty input, which callers treat as
 * "publish now".
 */
export function localInputToIso(value: string | null | undefined): string | null {
  const date = parseDate(value);
  return date ? date.toISOString() : null;
}

/** Human-readable local rendering of a stored schedule, for dashboard lists. */
export function formatScheduledAt(value: string | null | undefined): string {
  const date = parseDate(value);
  if (!date) return "";
  return date.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

interface PublishStateInput {
  /** Status the client asked for. Only "draft" is honoured verbatim. */
  requestedStatus?: string | null;
  /** Absolute timestamp (ISO) or a local `datetime-local` string. */
  publishedAt?: string | null;
  /** Injectable clock, so callers and tests share one "now". */
  now?: Date;
}

/**
 * Single source of truth for draft / scheduled / published.
 *
 * On the server this runs against the server clock, so a client in the wrong
 * timezone can neither publish a post early nor leave it stuck in "scheduled".
 *
 * - draft stays draft, whatever its date says
 * - no date means publish now
 * - a future date means scheduled
 * - a date that has already passed means published
 */
export function resolvePublishState(input: PublishStateInput): {
  status: PostStatus;
  published_at: string;
} {
  const now = input.now ?? new Date();
  const target = parseDate(input.publishedAt);

  if (input.requestedStatus === "draft") {
    return { status: "draft", published_at: (target ?? now).toISOString() };
  }

  if (!target) {
    return { status: "published", published_at: now.toISOString() };
  }

  return {
    status: target.getTime() > now.getTime() ? "scheduled" : "published",
    published_at: target.toISOString(),
  };
}