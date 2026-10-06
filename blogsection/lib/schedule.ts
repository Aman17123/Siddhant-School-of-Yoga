import { publishDueBlogs as dbPublishDueBlogs } from "./db";

/**
 * Lazy publishing of due scheduled posts.
 * Promotes every due scheduled post to `published` in MySQL.
 */
export async function publishDueBlogs(): Promise<number> {
  return await dbPublishDueBlogs();
}