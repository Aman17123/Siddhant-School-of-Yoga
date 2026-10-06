import { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogByIdOrSlug, incrementBlogViews, query } from "../lib/db";
import ShareButtons from "../components/public/ShareButtons";
import ReadingProgress from "../components/public/ReadingProgress";
import TrainWithUsCard from "../components/public/TrainWithUsCard";
import FaqAccordion from "../components/public/FaqAccordion";
import TableOfContent from "../pages/TableOfContent";
import type { Author, Blog, FaqRow } from "../lib/types";
import { toCleanBlogImageUrl, cleanHtmlImageUrls } from "../lib/imageUtils";
import CourseInfiniteCarousel from "../components/public/CourseInfiniteCarousel";

type AuthorProfile = Pick<
  Author,
  "photo" | "title" | "bio" | "yoga_alliance" | "instagram" | "youtube"
>;

type RelatedPost = Pick<
  Blog,
  | "id"
  | "title"
  | "slug"
  | "category_name"
  | "featured_image"
  | "short_description"
  | "published_at"
  | "created_at"
  | "author"
>;

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface Props {
  params: Promise<{ slug: string }>;
}

function parseList(val: unknown): string[] {
  if (!val) return [];
  if (Array.isArray(val)) {
    return val.map((x) => String(x).trim()).filter(Boolean);
  }
  if (typeof val === "string") {
    const trimmed = val.trim();
    if (!trimmed) return [];
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed.map((x) => String(x).trim()).filter(Boolean);
      }
    } catch {
      // not json, split comma
    }
    return trimmed
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean);
  }
  return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = await getBlogByIdOrSlug(slug);

    if (!post || post.status !== "published") {
      return {
        title: "Article Not Found | Siddhant School of Yoga",
        description: "The requested blog article could not be found.",
      };
    }

    const pageTitle = (post.meta_title as string) || `${post.title} | Siddhant School of Yoga`;
    const pageDesc =
      (post.meta_description as string) ||
      (post.short_description as string)?.slice(0, 160) ||
      "Yoga, Meditation and Teacher Training in Rishikesh";
    const keywords = parseList(post.meta_keywords || post.tags);
    const rawImage = toCleanBlogImageUrl(post.featured_image as string, slug);
    const ogImageUrl = rawImage.startsWith("http")
      ? rawImage
      : `https://www.siddhantschoolofyoga.com${rawImage.startsWith("/") ? "" : "/"}${rawImage}`;

    return {
      title: pageTitle,
      description: pageDesc,
      keywords: keywords.length > 0 ? keywords : undefined,
      alternates: {
        canonical: `https://www.siddhantschoolofyoga.com/blogs/${slug}`,
      },
      openGraph: {
        title: pageTitle,
        description: pageDesc,
        url: `https://www.siddhantschoolofyoga.com/blogs/${slug}`,
        siteName: "Siddhant School of Yoga Rishikesh",
        type: "article",
        publishedTime: post.published_at ? new Date(String(post.published_at)).toISOString() : undefined,
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: String(post.title || ""),
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: pageTitle,
        description: pageDesc,
        images: [ogImageUrl],
      },
    };
  } catch (e) {
    return {
      title: "Yoga Blog | Siddhant School of Yoga",
      description: "Yoga and Wellness insights from Siddhant School of Yoga Rishikesh",
    };
  }
}

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;

  // 1. Fetch post from MySQL
  const blogData = await getBlogByIdOrSlug(slug);

  if (!blogData || blogData.status !== "published") {
    notFound();
  }

  // Fetch author details safely
  let authorObj: AuthorProfile = {};
  if (blogData.author) {
    try {
      const cleanAuthor = String(blogData.author).trim();
      const rows = await query<Record<string, unknown>[]>(
        "SELECT photo, title, bio, yoga_alliance, instagram, youtube FROM `users` WHERE `name` = ? OR `username` = ? LIMIT 1",
        [cleanAuthor, cleanAuthor]
      );
      if (rows && rows.length > 0) {
        authorObj = rows[0] as unknown as AuthorProfile;
      }
    } catch (e) {}
  }

  const post: any = {
    ...blogData,
    author_photo: authorObj.photo || null,
    author_title: authorObj.title || null,
    author_bio: authorObj.bio || null,
    author_credentials: authorObj.yoga_alliance || null,
    author_instagram: authorObj.instagram || null,
    author_youtube: authorObj.youtube || null,
  };

  // 2. Increment view count only when x-blog-view header is present from proxy (session-based)
  const reqHeaders = await headers();
  if (post.id && reqHeaders.get("x-blog-view") === "1") {
    incrementBlogViews(post.id as number);
  }

  // 3. Fetch related posts from MySQL
  let finalRelated: RelatedPost[] = [];
  try {
    const relatedPosts = await query<Record<string, unknown>[]>(
      "SELECT id, title, slug, category_name, featured_image, short_description, published_at, created_at, author FROM `blogs` WHERE `status` = 'published' AND `category_id` = ? AND `id` != ? ORDER BY `published_at` DESC LIMIT 3",
      [post.category_id || 0, post.id]
    );

    finalRelated = (relatedPosts || []) as unknown as RelatedPost[];
    if (finalRelated.length < 3) {
      const fallback = await query<Record<string, unknown>[]>(
        "SELECT id, title, slug, category_name, featured_image, short_description, published_at, created_at, author FROM `blogs` WHERE `status` = 'published' AND `id` != ? ORDER BY `published_at` DESC LIMIT ?",
        [post.id, 3 - finalRelated.length]
      );
      finalRelated = [...finalRelated, ...((fallback || []) as unknown as RelatedPost[])];
    }
  } catch (e) {}

  // 4. Parse tags and FAQs safely
  const postTags = parseList(post.tags);
  const conclusion: string =
    typeof post.conclusion === "string" ? String(post.conclusion).trim() : "";

  let postFaqs: { q: string; a: string }[] = [];
  if (Array.isArray(post.faqs)) {
    postFaqs = post.faqs.filter((f: FaqRow) => f && (f.q || f.question) && (f.a || f.answer));
  } else if (typeof post.faqs === "string") {
    try {
      const parsed = JSON.parse(post.faqs);
      if (Array.isArray(parsed)) {
        postFaqs = parsed.filter((f: FaqRow) => f && (f.q || f.question) && (f.a || f.answer));
      }
    } catch {}
  }

  const rawFeatured = toCleanBlogImageUrl(post.featured_image, post.slug);
  const postFeaturedUrl = rawFeatured.startsWith("http")
    ? rawFeatured
    : `https://www.siddhantschoolofyoga.com${rawFeatured.startsWith("/") ? "" : "/"}${rawFeatured}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.short_description || post.meta_description,
    image: [postFeaturedUrl],
    datePublished: post.published_at ? new Date(post.published_at).toISOString() : new Date(post.created_at).toISOString(),
    dateModified: post.updated_at ? new Date(post.updated_at).toISOString() : new Date().toISOString(),
    author: {
      "@type": "Person",
      name: post.author || "Siddhant School of Yoga",
      jobTitle: post.author_title || "Yoga Master",
    },
    publisher: {
      "@type": "Organization",
      name: "Siddhant School of Yoga Rishikesh",
      logo: {
        "@type": "ImageObject",
        url: "https://www.siddhantschoolofyoga.com/logo/siddhant-logo.svg",
      },
    },
    mainEntityOfPage: `https://www.siddhantschoolofyoga.com/blogs/${post.slug}`,
  };

  return (
    <>
      <article className="bg-white text-[#1e2422] font-figtree antialiased leading-relaxed min-h-screen">
      <ReadingProgress />

      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 3. POST LAYOUT: ASIDE / TOC (left) | HEAD + HERO + PROSE (right) */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10 lg:gap-12 items-start pt-10 sm:pt-14 pb-6">

        {/* Right column: Post head, hero image and article content */}
        <div className="min-w-0 max-w-4xl w-full">
          {/* 1. POST HEAD */}
          <header className="pb-6">
            <nav className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-stone-600 mb-4 font-figtree font-medium" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-[#1c3b2b] transition-colors">Home</Link>
              <span className="text-stone-400">/</span>
              <Link href="/blog" className="hover:text-[#1c3b2b] transition-colors">Blogs</Link>
              <span className="text-stone-400">/</span>
              <span className="text-[#1c3b2b] font-semibold">{post.category_name || "General"}</span>
            </nav>

            <h1 className="font-belleza text-2xl sm:text-3xl lg:text-[42px] font-normal tracking-wide text-[#1e2422] leading-[1.2] mb-6 drop-shadow-2xs">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-stone-600 pb-6 border-b border-[#e3dac9]/60 font-figtree">
              <div className="flex items-center gap-3">
                <img
                  src={post.author_photo || "/images/acharya-siddhant.jpg"}
                  alt={post.author || "Author"}
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (img.src.endsWith("/logo/siddhant-logo.svg")) return;
                    img.src = "/logo/siddhant-logo.svg";
                  }}
                  className="w-10 h-10 rounded-full object-cover border border-[#e3dac9] shadow-xs"
                />
                <div>
                  <b className="text-[#1e2422] block font-semibold">{post.author || "Siddhant School of Yoga"}</b>
                  <span className="text-stone-500 text-xs">
                    {post.author_title || "Yoga Master"}
                    {post.author_credentials && ` (${post.author_credentials})`}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-stone-500">
                <time dateTime={post.published_at || post.created_at}>
                  {formatDate(post.published_at || post.created_at)}
                </time>
                <span>•</span>
                <span>👁️ {post.views || 1} reads</span>
              </div>
            </div>
          </header>

          {/* 2. POST HERO IMAGE */}
          <figure className="mb-10">
            <img
              src={toCleanBlogImageUrl(post.featured_image, post.slug)}
              alt={post.featured_image_alt || post.title}
              onError={(e) => {
                const img = e.currentTarget;
                if (img.src.endsWith("/images/yoga-and-meditation-retreat-riverside.jpg")) return;
                img.src = "/images/yoga-and-meditation-retreat-riverside.jpg";
              }}
              className="w-full h-auto max-h-[520px] object-cover rounded-2xl shadow-md border border-[#e3dac9]/60"
            />
            {post.featured_image_title && (
              <figcaption className="text-xs font-figtree text-stone-500 text-center mt-2.5 italic">
                {post.featured_image_title}
              </figcaption>
            )}
          </figure>

          {/* Quick Overview (TL;DR) Card */}
          {post.short_description && (
            <aside className="bg-[#f4efe6] border-l-4 border-[#1c3b2b] rounded-r-2xl p-5 sm:p-6 mb-8 shadow-xs">
              <span className="block text-sm font-figtree font-semibold tracking-[0.08em] uppercase text-[#b85c00] mb-1.5">
                Quick Overview
              </span>
              <p className="font-figtree text-sm sm:text-base text-stone-700 leading-relaxed text-justify font-medium">
                {post.short_description}
              </p>
            </aside>
          )}

          {/* Prose Content */}
          <div
            className="text-[#1e2422] [&>p]:font-figtree [&>p]:text-base sm:[&>p]:text-[17px] [&>p]:text-stone-700 [&>p]:leading-[1.8] [&>p]:font-medium [&>p]:text-justify [&>p]:mb-6 [&>h1]:font-belleza [&>h1]:font-normal [&>h1]:tracking-wide [&>h1]:text-2xl sm:[&>h1]:text-3xl lg:[&>h1]:text-[38px] [&>h1]:leading-[1.25] [&>h1]:text-[#1e2422] [&>h1]:mt-10 [&>h1]:mb-4 [&>h2]:font-belleza [&>h2]:font-normal [&>h2]:tracking-wide [&>h2]:text-xl sm:[&>h2]:text-2xl lg:[&>h2]:text-[30px] [&>h2]:leading-[1.3] [&>h2]:text-[#1e2422] [&>h2]:mt-10 [&>h2]:mb-4 [&>h3]:font-belleza [&>h3]:font-normal [&>h3]:tracking-wide [&>h3]:text-lg sm:[&>h3]:text-xl lg:[&>h3]:text-[24px] [&>h3]:leading-[1.35] [&>h3]:text-[#1c3b2b] [&>h3]:mt-8 [&>h3]:mb-3 [&>h4]:font-belleza [&>h4]:font-normal [&>h4]:tracking-wide [&>h4]:text-base sm:[&>h4]:text-lg lg:[&>h4]:text-[20px] [&>h4]:leading-[1.4] [&>h4]:text-[#1e2422] [&>h4]:mt-6 [&>h4]:mb-2 [&>h5]:font-figtree [&>h5]:font-semibold [&>h5]:text-base [&>h5]:leading-[1.4] [&>h5]:text-[#1e2422] [&>h5]:mt-4 [&>h5]:mb-2 [&>h6]:font-figtree [&>h6]:font-semibold [&>h6]:text-sm [&>h6]:leading-[1.4] [&>h6]:text-[#1e2422] [&>h6]:mt-3 [&>h6]:mb-1 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>ul>li]:font-figtree [&>ul>li]:text-stone-700 [&>ul>li]:leading-[1.8] [&>ul>li]:mb-2 [&>ol>li]:font-figtree [&>ol>li]:text-stone-700 [&>ol>li]:leading-[1.8] [&>ol>li]:mb-2 [&>blockquote]:border-l-4 [&>blockquote]:border-[#1c3b2b] [&>blockquote]:pl-5 [&>blockquote]:pr-4 [&>blockquote]:py-3.5 [&>blockquote]:italic [&>blockquote]:my-6 [&>blockquote]:bg-[#f4efe6]/70 [&>blockquote]:text-stone-800 [&>blockquote]:font-figtree [&>blockquote]:text-base [&>blockquote]:leading-relaxed [&>blockquote]:rounded-r-xl [&>img]:rounded-2xl [&>img]:my-6 [&>img]:shadow-sm [&>img]:border [&>img]:border-[#e3dac9]/60 [&>a]:text-[#1c3b2b] [&>a]:font-semibold [&>a]:underline [&>a]:decoration-[#1c3b2b]/40 [&>a]:underline-offset-2 hover:[&>a]:text-[#142b1e] [&>a]:transition-colors [&>table]:block [&>table]:w-full [&>table]:max-w-full [&>table]:overflow-x-auto [&>table]:my-7 [&>table]:border-collapse [&>table]:text-sm [&>table]:whitespace-nowrap [&>table>thead>tr>th]:bg-[#f4efe6] [&>table>thead>tr>th]:border [&>table>thead>tr>th]:border-[#e3dac9] [&>table>thead>tr>th]:px-3.5 [&>table>thead>tr>th]:py-3 [&>table>thead>tr>th]:text-left [&>table>thead>tr>th]:font-belleza [&>table>thead>tr>th]:font-normal [&>table>thead>tr>th]:text-[#1e2422] [&>table>thead>tr>th]:tracking-wide [&>table>tbody>tr>td]:border [&>table>tbody>tr>td]:border-[#e3dac9] [&>table>tbody>tr>td]:px-3.5 [&>table>tbody>tr>td]:py-2.5 [&>table>tbody>tr>td]:align-top [&>table>tbody>tr>td]:text-stone-700 [&>table>tbody>tr>td]:font-figtree [&>table>tbody>tr:nth-child(even)]:bg-[#fdfbf7] [&>table>tbody>tr>th]:border [&>table>tbody>tr>th]:border-[#e3dac9] [&>table>tbody>tr>th]:bg-[#f4efe6] [&>table>tbody>tr>th]:px-3.5 [&>table>tbody>tr>th]:py-2.5 [&>table>tbody>tr>th]:text-left [&>table>tbody>tr>th]:font-belleza [&>table>tbody>tr>th]:font-normal [&>table>tbody>tr>th]:text-[#1e2422]"
            id="prose"
            dangerouslySetInnerHTML={{ __html: cleanHtmlImageUrls(post.content, post.slug) }}
          />

          {/* Conclusion */}
          {conclusion && (
            <section
              id="conclusion"
              className="mt-12 pt-8 border-t border-[#e3dac9]/60"
            >
              <h2 className="font-belleza font-normal tracking-wide text-2xl sm:text-3xl text-[#1e2422] leading-[1.2] mb-4">
                Conclusion
              </h2>
              {conclusion
                .split(/\n\s*\n/)
                .map((para, i) => para.trim())
                .filter(Boolean)
                .map((para, i) => (
                  <p
                    key={i}
                    className="font-figtree text-base sm:text-[17px] font-medium text-justify text-stone-700 leading-[1.8] mb-6 last:mb-0 whitespace-pre-line"
                  >
                    {para}
                  </p>
                ))}
            </section>
          )}

          {/* FAQs section */}
          {postFaqs.length > 0 && <FaqAccordion faqs={postFaqs} />}

          {/* Tags */}
          {postTags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-[#e3dac9]/60 flex flex-wrap items-center gap-2">
              <b className="font-figtree text-xs font-semibold uppercase tracking-wider text-stone-500 mr-2">Related Topics:</b>
              <div className="flex flex-wrap gap-2">
                {postTags.map((tag: string, idx: number) => (
                  <Link
                    key={idx}
                    href={`/blogs`}
                    className="text-xs font-figtree font-semibold px-3 py-1 rounded-full bg-[#f4efe6] text-[#1c3b2b] hover:bg-[#1c3b2b] hover:text-white border border-[#1c3b2b]/30 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* AUTHOR BOX */}
          <div className="mt-12 p-6 sm:p-8 bg-[#fdfbf7] border border-[#e3dac9] rounded-2xl flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-xs">
            <img
              src={post.author_photo || "/images/acharya-siddhant.jpg"}
              alt={post.author || "Author"}
              onError={(e) => {
                const img = e.currentTarget;
                if (img.src.endsWith("/logo/siddhant-logo.svg")) return;
                img.src = "/logo/siddhant-logo.svg";
              }}
              className="w-20 h-20 rounded-full object-cover shrink-0 shadow-sm border-2 border-[#1c3b2b]/30"
            />
            <div>
              <h3 className="font-belleza font-normal tracking-wide text-2xl text-[#1e2422]">{post.author || "Siddhant School of Yoga"}</h3>
              <p className="font-figtree text-xs font-semibold text-[#b85c00] uppercase tracking-wider mt-1">
                {post.author_title || "Yoga Master & Ashram Guide"}
                {post.author_credentials && ` • ${post.author_credentials}`}
              </p>
              <p className="font-figtree text-sm sm:text-base text-stone-700 mt-2.5 leading-relaxed font-medium">
                {post.author_bio ||
                  "Dedicated to sharing traditional yogic sadhana, Vedic philosophy, and authentic Himalayan spiritual practices at Siddhant School of Yoga in Rishikesh, India."}
              </p>
              <div className="mt-4">
                <Link
                  href="/teacher"
                  className="font-figtree text-xs sm:text-sm font-semibold text-[#1c3b2b] hover:text-[#142b1e] hover:underline"
                >
                  Meet our teachers &amp; gurus →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Left column: Sticky Aside. lg:order-first keeps the article first on mobile. */}
        <aside className="space-y-8 sticky top-20 rounded-[32px] lg:order-first">
          <TableOfContent />
      
          <div className="flex flex-col gap-2.5">
            <b className="font-figtree text-xs font-semibold uppercase tracking-wider text-stone-500">Share Article</b>
            <ShareButtons title={post.title} slug={post.slug} /> 
          </div>
        </aside>
      </div>

      {/* 4. RELATED ARTICLES */}
      {finalRelated.length > 0 && (
        <section className="bg-[#f4efe6]/50 border-t border-[#e3dac9]/60 py-14 mt-16">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-belleza font-normal tracking-wide text-2xl sm:text-3xl text-[#1e2422]">Related articles</h2>
              <Link href="/blog" className="font-figtree text-xs sm:text-sm font-semibold text-[#1c3b2b] hover:text-[#142b1e] hover:underline">
                View all articles →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {finalRelated.map((rel) => (
                <article key={rel.id} className="bg-[#fdfbf7] border border-[#e3dac9] rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-1 transition-all p-5 flex flex-col">
                  <Link
                    href={`/blogs/${rel.slug}`}
                    tabIndex={-1}
                    aria-hidden="true"
                    className="block aspect-[16/10] overflow-hidden rounded-xl mb-4 bg-stone-100"
                  >
                    <img
                      src={toCleanBlogImageUrl(rel.featured_image, rel.slug)}
                      alt={rel.title}
                      onError={(e) => {
                        const img = e.currentTarget;
                        if (img.src.endsWith("/images/yoga-and-meditation-retreat-riverside.jpg")) return;
                        img.src = "/images/yoga-and-meditation-retreat-riverside.jpg";
                      }}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </Link>
                  <span className="font-figtree text-xs font-semibold tracking-wider uppercase text-[#b85c00] mb-1.5 block">
                    {rel.category_name}
                  </span>
                  <h3 className="font-belleza font-normal text-xl text-[#1e2422] hover:text-[#1c3b2b] transition-colors leading-snug mb-2 flex-1">
                    <Link href={`/blogs/${rel.slug}`}>{rel.title}</Link>
                  </h3>
                  <p className="font-figtree text-sm text-stone-600 line-clamp-2 leading-relaxed mb-4">
                    {rel.short_description}
                  </p>
                  <p className="font-figtree text-xs font-semibold text-stone-500 mt-auto pt-3 border-t border-[#e3dac9]/40">
                    {formatDate(rel.published_at || rel.created_at)}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>

    <CourseInfiniteCarousel />
  </>
  );
}
