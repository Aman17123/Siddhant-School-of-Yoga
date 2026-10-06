/**
 * Converts a raw Supabase or legacy blog image URL to a clean, SEO-friendly /images/filename URL.
 * Example input:
 *   https://ccetpexjjszobqipnlxt.supabase.co/storage/v1/object/public/blog-images/sanskriti-blog-123.jpg
 * Output:
 *   /images/sanskriti-blog-123.jpg
 */
export function toCleanBlogImageUrl(
  url?: string | null,
  _blogSlug?: string | null
): string {
  if (!url) return "/images/banners/retreat-banner.webp";

  // Check if it's a Supabase storage URL
  const supabaseMatch = url.match(
    /supabase\.co\/storage\/v1\/object\/public\/blog-images\/([^?#]+)/i
  );
  if (supabaseMatch && supabaseMatch[1]) {
    return `/images/${supabaseMatch[1]}`;
  }

  // If it's old /blog/images/filename or /blog/:slug/images/filename or /images/blog/filename
  const localMatch = url.match(
    /(?:\/blog(?:\/[^/]+)?\/images|\/images\/blog)\/([^?#]+)/i
  );
  if (localMatch && localMatch[1]) {
    return `/images/${localMatch[1]}`;
  }

  return url;
}

/**
 * Replaces all raw Supabase storage image URLs and legacy paths inside blog HTML content
 * with clean SEO-friendly local /images/filename paths.
 */
export function cleanHtmlImageUrls(
  html?: string | null,
  _blogSlug?: string | null
): string {
  if (!html) return "";

  // Replace Supabase storage URLs
  const regex =
    /https?:\/\/[a-z0-9.-]*supabase\.co\/storage\/v1\/object\/public\/blog-images\/([^"'\s>?#]+)(?:\?[^"'\s>]*)?/gi;

  let cleaned = html.replace(regex, (_match, filename) => {
    return `/images/${filename}`;
  });

  // Also replace /blog/images/... or /blog/:slug/images/... or /images/blog/... with /images/...
  cleaned = cleaned.replace(
    /(?:https?:\/\/sanskritiyogpeeth\.org)?(?:\/blog(?:\/[^/"'\s>]+)?\/images|\/images\/blog)\/([^"'\s>?#]+)/gi,
    (_match, filename) => `/images/${filename}`
  );

  return cleaned;
}

