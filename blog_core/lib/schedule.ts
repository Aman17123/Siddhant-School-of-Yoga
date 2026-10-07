import { publishDueblog as dbPublishDueblog } from "./db";

/**
 * Lazy publishing of due scheduled posts.
 * Promotes every due scheduled post to `published` in MySQL.
 */
export async function publishDueblog(): Promise<number> {
  return await dbPublishDueblog();
}