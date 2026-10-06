import Link from "next/link";
import { toCleanBlogImageUrl } from "@/blogsection/lib/imageUtils";

interface LatestBlog {
  id?: number;
  title?: string | null;
  slug?: string | null;
  featured_image?: string | null;
  published_at?: string | null;
  created_at?: string | null;
}

const FALLBACK_IMAGE = "/images/banners/retreat-banner.webp";
const MAX_POSTS = 5;

function formatDate(dateStr?: string | null) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Newest first by publish date, then capped at the 5 most recent.
function pickLatest(posts: LatestBlog[]): LatestBlog[] {
  return [...posts]
    .filter((p) => p && p.slug)
    .sort((a, b) => {
      const aTime = new Date(a.published_at || a.created_at || 0).getTime() || 0;
      const bTime = new Date(b.published_at || b.created_at || 0).getTime() || 0;
      return bTime - aTime;
    })
    .slice(0, MAX_POSTS);
}

export default function LatestBlogs({ posts }: { posts: LatestBlog[] }) {
  const latest = pickLatest(posts || []);

  return (
    <section className="px-5 py-4 bg-[#FDF9FB] rounded-[32px] border border-gray-100">
      <h2 className="font-display text-subsection font-bold text-[#2A1621] mb-3">
        Latest Posts
      </h2>

      {latest.length === 0 ? (
        <p className="text-body-sm text-[#6B5862] py-6 text-center">No posts published yet.</p>
      ) : (
        <div className="flex flex-col">
          {latest.map((post, index) => (
            <article
              key={post.id ?? post.slug}
              className="relative flex group bg-white border border-gray-100 rounded-xl mb-3 last:mb-0 shadow-xs hover:shadow-md transition-shadow overflow-hidden"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="relative w-[90px] sm:w-[110px] shrink-0 self-stretch"
              >
                <img
                  src={toCleanBlogImageUrl(post.featured_image, post.slug)}
                  alt={post.title || ""}
                  loading="lazy"
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (img.src.endsWith(FALLBACK_IMAGE)) return;
                    img.src = FALLBACK_IMAGE;
                  }}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500"
                />
                {/* Right side fade into white background */}
                <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-r from-transparent to-white pointer-events-none" />
              </Link>
              <div className="flex flex-col flex-1 py-3 px-2 sm:px-3 z-10 justify-center">
                <h3 className="font-display font-semibold text-body-sm leading-[1.4] text-[#2A1621] group-hover:text-[#BF296A] transition-colors line-clamp-3 mb-1.5">
                  <Link href={`/blog/${post.slug}`}>{post.title || "Untitled post"}</Link>
                </h3>
                <p className="text-label text-[#6B5862] font-medium opacity-80 mt-auto">
                  {formatDate(post.published_at || post.created_at)}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
