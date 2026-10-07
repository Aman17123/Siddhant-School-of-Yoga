export const DEFAULT_BLOG_IMAGE = "/blog/images/yoga-and-meditation-retreat-riverside.jpg";

/**
 * Strips any legacy prefixes like "siddhant-blog-<timestamp>-" or "siddhant-blog-"
 * so image URLs remain clean and concise (e.g. warrior-1-pose.jpg).
 */
export function cleanImageFilename(filename: string): string {
  if (!filename) return "";
  return filename
    .replace(/^siddhant-blog-\d+-/i, "")
    .replace(/^siddhant-blog-/i, "");
}

/**
 * Converts any legacy blog image URL to a clean, SEO-friendly /blog/images/<filename> URL.
 */
export function toCleanBlogImageUrl(
  url?: string | null,
  _blogSlug?: string | null
): string {
  if (!url || !url.trim()) return DEFAULT_BLOG_IMAGE;

  // Filter out any known dead/broken image references
  if (
    url.includes("retreat-banner.webp") ||
    url.includes("courses/breadcumb/") ||
    url.includes("logo1.webp")
  ) {
    return DEFAULT_BLOG_IMAGE;
  }

  // Strip domain if present
  let cleanUrl = url.replace(
    /^https?:\/\/(?:www\.)?(?:sanskritiyogpeeth\.org|siddhantschoolofyoga\.com|localhost(?::\d+)?)/i,
    ""
  );

  // Check if it's an external cloud storage URL with blog-images
  const legacyMatch = cleanUrl.match(
    /(?:storage\/v1\/object\/public\/)?blog-images\/([^?#]+)/i
  );
  if (legacyMatch && legacyMatch[1]) {
    return `/blog/images/${cleanImageFilename(legacyMatch[1])}`;
  }

  // If it's already /blog/images/filename or /blog/:slug/images/filename or /images/blog/filename
  const localMatch = cleanUrl.match(
    /(?:\/blog(?:\/[^/]+)?\/images|\/images\/blog|\/blog\/images)\/([^?#]+)/i
  );
  if (localMatch && localMatch[1]) {
    return `/blog/images/${cleanImageFilename(localMatch[1])}`;
  }

  // If it's /images/filename (including uploaded blog images or retreat photos)
  const imagesMatch = cleanUrl.match(/^\/images\/([^?#]+)/i);
  if (imagesMatch && imagesMatch[1]) {
    return `/blog/images/${cleanImageFilename(imagesMatch[1])}`;
  }

  // If external third-party URL (e.g. unsplash), keep it
  if (cleanUrl.startsWith("http://") || cleanUrl.startsWith("https://")) {
    return cleanUrl;
  }

  const bareFilename = cleanUrl.replace(/^\/+/, "");
  return `/blog/images/${cleanImageFilename(bareFilename)}`;
}

/**
 * Replaces any legacy storage image URLs and old paths inside blog HTML content
 * with clean SEO-friendly local /blog/images/<filename> paths.
 */
export function cleanHtmlImageUrls(
  html?: string | null,
  _blogSlug?: string | null
): string {
  if (!html) return "";

  // 1. Replace legacy cloud storage URLs
  const storageRegex =
    /https?:\/\/[a-z0-9.-]+\/storage\/v1\/object\/public\/blog-images\/([^"'\s>?#]+)(?:\?[^"'\s>]*)?/gi;

  let cleaned = html.replace(storageRegex, (_match, filename) => {
    return `/blog/images/${cleanImageFilename(filename)}`;
  });

  // 2. Replace any domain prefixes or legacy paths for blog images (/blog/slug/images, /images/blog, etc.)
  cleaned = cleaned.replace(
    /(?:https?:\/\/(?:www\.)?(?:sanskritiyogpeeth\.org|siddhantschoolofyoga\.com|localhost(?::\d+)?))?(?:\/blog(?:\/[^/"'\s>]+)?\/images|\/images\/blog|\/blog\/images)\/([^"'\s>?#]+)/gi,
    (_match, filename) => `/blog/images/${cleanImageFilename(filename)}`
  );

  // 3. Replace local /images/ paths that refer to blog images
  cleaned = cleaned.replace(
    /(?:https?:\/\/(?:www\.)?(?:sanskritiyogpeeth\.org|siddhantschoolofyoga\.com|localhost(?::\d+)?))?\/images\/([^"'\s>?#]+\.(?:jpe?g|png|webp|gif|svg|avif))/gi,
    (_match, filename) => `/blog/images/${cleanImageFilename(filename)}`
  );

  return cleaned;
}
