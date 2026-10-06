export const DEFAULT_BLOG_IMAGE = "/images/yoga-and-meditation-retreat-riverside.jpg";

/**
 * Converts any legacy blog image URL to a clean, SEO-friendly /images/filename URL.
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
    /^https?:\/\/(?:www\.)?(?:sanskritiyogpeeth\.org|siddhantschoolofyoga\.com)/i,
    ""
  );

  // Check if it's an external cloud storage URL with blog-images
  const legacyMatch = cleanUrl.match(
    /(?:storage\/v1\/object\/public\/)?blog-images\/([^?#]+)/i
  );
  if (legacyMatch && legacyMatch[1]) {
    return `/images/${legacyMatch[1]}`;
  }

  // If it's old /blog/images/filename or /blog/:slug/images/filename or /images/blog/filename
  const localMatch = cleanUrl.match(
    /(?:\/blog(?:\/[^/]+)?\/images|\/images\/blog)\/([^?#]+)/i
  );
  if (localMatch && localMatch[1]) {
    return `/images/${localMatch[1]}`;
  }

  return cleanUrl.startsWith("/") || cleanUrl.startsWith("http")
    ? cleanUrl
    : `/images/${cleanUrl}`;
}

/**
 * Replaces any legacy storage image URLs and old paths inside blog HTML content
 * with clean SEO-friendly local /images/filename paths.
 */
export function cleanHtmlImageUrls(
  html?: string | null,
  _blogSlug?: string | null
): string {
  if (!html) return "";

  // Replace legacy cloud storage URLs
  const regex =
    /https?:\/\/[a-z0-9.-]+\/storage\/v1\/object\/public\/blog-images\/([^"'\s>?#]+)(?:\?[^"'\s>]*)?/gi;

  let cleaned = html.replace(regex, (_match, filename) => {
    return `/images/${filename}`;
  });

  // Also replace /blog/images/... or /blog/:slug/images/... or /images/blog/... with /images/...
  cleaned = cleaned.replace(
    /(?:https?:\/\/(?:www\.)?(?:sanskritiyogpeeth\.org|siddhantschoolofyoga\.com))?(?:\/blog(?:\/[^/"'\s>]+)?\/images|\/images\/blog)\/([^"'\s>?#]+)/gi,
    (_match, filename) => `/images/${filename}`
  );

  return cleaned;
}
