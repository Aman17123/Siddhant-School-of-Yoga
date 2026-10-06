import { supabase } from "./supabase";

/**
 * Lazy publishing of due scheduled posts.
 *
 * Nothing used to promote a `scheduled` post to `published`, and every public
 * query filters on `status = 'published'`, so a scheduled post stayed invisible
 * forever once its date passed. Rather than depend on a cron schedule (which
 * needs host-specific config), the promotion runs on read: the first person to
 * look at the blog after the scheduled time publishes it.
 */

/** At most one promotion write per process per minute. */
const THROTTLE_MS = 60_000;
let lastRunAt = 0;

/**
 * Promotes every due scheduled post to `published`.
 *
 * Called from the public blog reads and from the dashboard list. Never throws: a
 * promotion failure must not take down the page being read.
 *
 * Returns the number of posts published.
 */
export async function publishDueBlogs(): Promise<number> {
  if (Date.now() - lastRunAt < THROTTLE_MS) return 0;
  lastRunAt = Date.now();

  try {
    const nowIso = new Date().toISOString();
    const { data, error } = await supabase
      .from("blogs")
      .update({ status: "published", updated_at: nowIso })
      .eq("status", "scheduled")
      .lte("published_at", nowIso)
      .select("id");

    if (error) {
      console.warn("[blog] could not publish due scheduled posts:", error.message);
      return 0;
    }

    const published = data?.length ?? 0;
    if (published > 0) {
      console.log(`[blog] published ${published} due scheduled post(s)`);
    }
    return published;
  } catch (error) {
    console.warn("[blog] could not publish due scheduled posts:", error);
    return 0;
  }
}