/**
 * `blog.conclusion` was added after the table was first created, so an older
 * database (or one where the migration has not been run yet) does not have the
 * column. PostgREST fails the whole query in that case, which would break the
 * whole post list / save flow.
 *
 * These helpers let the API degrade gracefully: try with the column, and if
 * Postgres reports it as missing, remember that for the process lifetime and
 * retry without it. Once the column is added (and the PostgREST schema cache is
 * reloaded) the first successful query flips the flag back on.
 */
let conclusionAvailable: boolean | null = null;

export function hasConclusionColumn(): boolean {
  return conclusionAvailable !== false;
}

function matches(error: unknown): boolean {
  const message = String((error as { message?: string })?.message ?? error);
  // Postgres reports a missing column as `column "conclusion" does not exist`
  // (42703), while PostgREST reports `Could not find the 'conclusion' column of
  // 'blog' in the schema cache` (PGRST204). Both must fall back.
  if (/blog\.conclusion/i.test(message)) return true;
  if (!/\bconclusion\b/i.test(message)) return false;
  return /does not exist|schema cache|unknown column|42703|PGRST204/i.test(message);
}

/** Returns true when the error was an "unknown column" for `conclusion`. */
export function noteConclusionError(error: unknown): boolean {
  if (!matches(error)) return false;
  conclusionAvailable = false;
  console.warn(
    "[blog] blog.conclusion is missing in the database — falling back to " +
      "the old column set. Run: ALTER TABLE blog ADD COLUMN IF NOT EXISTS conclusion TEXT;",
  );
  return true;
}

export function noteConclusionOk(): void {
  conclusionAvailable = true;
}
