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
import FallbackImage from "../components/public/FallbackImage";

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
        canonical: `https://www.siddhantschoolofyoga.com/blog/${slug}`,
      },
      openGraph: {
        title: pageTitle,
        description: pageDesc,
        url: `https://www.siddhantschoolofyoga.com/blog/${slug}`,
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
  try {
    const reqHeaders = await headers();
    if (post.id && reqHeaders.get("x-blog-view") === "1") {
      incrementBlogViews(post.id as number);
    }
  } catch {}

  // 3. Fetch related posts from MySQL
  let finalRelated: RelatedPost[] = [];
  try {
    const relatedPosts = await query<Record<string, unknown>[]>(
      "SELECT id, title, slug, category_name, featured_image, short_description, published_at, created_at, author FROM `blog` WHERE `status` = 'published' AND `category_id` = ? AND `id` != ? ORDER BY `published_at` DESC LIMIT 3",
      [post.category_id || 0, post.id]
    );

    finalRelated = (relatedPosts || []) as unknown as RelatedPost[];
    if (finalRelated.length < 3) {
      const fallback = await query<Record<string, unknown>[]>(
        "SELECT id, title, slug, category_name, featured_image, short_description, published_at, created_at, author FROM `blog` WHERE `status` = 'published' AND `id` != ? ORDER BY `published_at` DESC LIMIT ?",
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
    mainEntityOfPage: `https://www.siddhantschoolofyoga.com/blog/${post.slug}`,
  };

  return (
    <>
      <article className="bg-[#f4efe6] text-[#1e2422] font-figtree antialiased leading-relaxed min-h-screen">
      <ReadingProgress />

      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 3. POST LAYOUT: ASIDE / TOC (left) | HEAD + HERO + PROSE (right) */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10 lg:gap-12 items-start pt-10 sm:pt-14 pb-16">

        {/* Right column: Post head, hero image and article content wrapped in website theme card */}
        <div className="min-w-0 max-w-4xl w-full bg-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm border border-[#e3dac9]/70">
          {/* 1. POST HEAD */}
          <header className="pb-6">
            <nav className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-stone-600 mb-4 font-figtree font-medium" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-[#1c3b2b] transition-colors">Home</Link>
              <span className="text-stone-400">/</span>
              <Link href="/blog" className="hover:text-[#1c3b2b] transition-colors">blog</Link>
              <span className="text-stone-400">/</span>
              <span className="text-[#1c3b2b] font-semibold">{post.category_name || "General"}</span>
            </nav>

            <h1 className="font-belleza text-2xl sm:text-3xl lg:text-[42px] font-normal tracking-wide text-[#1e2422] leading-[1.2] mb-6 drop-shadow-2xs">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-stone-600 pb-6 border-b border-[#e3dac9]/60 font-figtree">
              <div className="flex items-center gap-3">
                <FallbackImage
                  src={post.author_photo || "/images/acharya-siddhant.jpg"}
                  alt={post.author || "Author"}
                  fallbackSrc="/logo/siddhant-logo.svg"
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
            <FallbackImage
              src={toCleanBlogImageUrl(post.featured_image, post.slug)}
              alt={post.featured_image_alt || post.title}
              fallbackSrc="/blog/images/yoga-and-meditation-retreat-riverside.jpg"
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
            className="text-[#1e2422] font-figtree [&_p]:font-figtree [&_p]:text-base sm:[&_p]:text-[17px] [&_p]:text-stone-700 [&_p]:leading-[1.8] [&_p]:font-medium [&_p]:text-justify [&_p]:mb-6 [&_h1]:font-belleza [&_h1]:font-normal [&_h1]:tracking-wide [&_h1]:text-2xl sm:[&_h1]:text-3xl lg:[&_h1]:text-[38px] [&_h1]:leading-[1.25] [&_h1]:text-[#1e2422] [&_h1]:mt-10 [&_h1]:mb-4 [&_h2]:font-belleza [&_h2]:font-normal [&_h2]:tracking-wide [&_h2]:text-xl sm:[&_h2]:text-2xl lg:[&_h2]:text-[30px] [&_h2]:leading-[1.3] [&_h2]:text-[#1e2422] [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:font-belleza [&_h3]:font-normal [&_h3]:tracking-wide [&_h3]:text-lg sm:[&_h3]:text-xl lg:[&_h3]:text-[24px] [&_h3]:leading-[1.35] [&_h3]:text-[#1c3b2b] [&_h3]:mt-8 [&_h3]:mb-3 [&_h4]:font-belleza [&_h4]:font-normal [&_h4]:tracking-wide [&_h4]:text-base sm:[&_h4]:text-lg lg:[&_h4]:text-[20px] [&_h4]:leading-[1.4] [&_h4]:text-[#1e2422] [&_h4]:mt-6 [&_h4]:mb-2 [&_h5]:font-figtree [&_h5]:font-semibold [&_h5]:text-base [&_h5]:leading-[1.4] [&_h5]:text-[#1e2422] [&_h5]:mt-4 [&_h5]:mb-2 [&_h6]:font-figtree [&_h6]:font-semibold [&_h6]:text-sm [&_h6]:leading-[1.4] [&_h6]:text-[#1e2422] [&_h6]:mt-3 [&_h6]:mb-1 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_ul_li]:font-figtree [&_ul_li]:text-stone-700 [&_ul_li]:leading-[1.8] [&_ul_li]:mb-2 [&_ol_li]:font-figtree [&_ol_li]:text-stone-700 [&_ol_li]:leading-[1.8] [&_ol_li]:mb-2 [&_blockquote]:border-l-4 [&_blockquote]:border-[#1c3b2b] [&_blockquote]:pl-5 [&_blockquote]:pr-4 [&_blockquote]:py-3.5 [&_blockquote]:italic [&_blockquote]:my-6 [&_blockquote]:bg-[#f4efe6]/70 [&_blockquote]:text-stone-800 [&_blockquote]:font-figtree [&_blockquote]:text-base [&_blockquote]:leading-relaxed [&_blockquote]:rounded-r-xl [&_img]:rounded-2xl [&_img]:my-6 [&_img]:shadow-sm [&_img]:border [&_img]:border-[#e3dac9]/60 [&_a]:text-[#1c3b2b] [&_a]:font-semibold [&_a]:underline [&_a]:decoration-[#1c3b2b]/40 [&_a]:underline-offset-2 hover:[&_a]:text-[#142b1e] [&_a]:transition-colors [&_table]:block [&_table]:w-full [&_table]:max-w-full [&_table]:overflow-x-auto [&_table]:my-7 [&_table]:border-collapse [&_table]:text-sm [&_table]:whitespace-nowrap [&_th]:bg-[#f4efe6] [&_th]:border [&_th]:border-[#e3dac9] [&_th]:px-3.5 [&_th]:py-3 [&_th]:text-left [&_th]:font-belleza [&_th]:font-normal [&_th]:text-[#1e2422] [&_th]:tracking-wide [&_td]:border [&_td]:border-[#e3dac9] [&_td]:px-3.5 [&_td]:py-2.5 [&_td]:align-top [&_td]:text-stone-700 [&_td]:font-figtree [&_tr:nth-child(even)]:bg-[#fdfbf7]"
            id="prose"
            dangerouslySetInnerHTML={{ __html: cleanHtmlImageUrls(post.content, post.slug) }}
          />

          <style dangerouslySetInnerHTML={{ __html: `
            /* Website Theme & Typography Enforcement: Wipe out foreign Docs/Word blues */
            #prose h1, #prose h1 *,
            #prose h2, #prose h2 *,
            #prose h4, #prose h4 *,
            #prose h5, #prose h5 *,
            #prose h6, #prose h6 * {
              font-family: var(--font-belleza), "Belleza", Georgia, serif !important;
              color: #1e2422 !important;
            }
            #prose h3, #prose h3 * {
              font-family: var(--font-belleza), "Belleza", Georgia, serif !important;
              color: #1c3b2b !important;
            }
            #prose p, #prose p *:not(a),
            #prose li, #prose li *:not(a),
            #prose td, #prose figcaption {
              font-family: var(--font-figtree), "Figtree", sans-serif !important;
            }
            #prose a {
              color: #1c3b2b !important;
            }
            #prose a:hover {
              color: #142b1e !important;
            }
            #prose table th {
              font-family: var(--font-belleza), "Belleza", serif !important;
              background-color: #f4efe6 !important;
              color: #1e2422 !important;
              border-color: #e3dac9 !important;
            }
            #prose table td {
              border-color: #e3dac9 !important;
            }
            #prose blockquote {
              border-left-color: #1c3b2b !important;
              background-color: rgba(244, 239, 230, 0.7) !important;
              color: #1e2422 !important;
            }
            /* MS Word Style Image Floats, Wraps & Layouts - Support Custom Height & Width */
            #prose img {
              max-width: 100%;
            }
            #prose img:not([style*="height"]):not([height]) {
              height: auto;
            }
            #prose img[style*="height"],
            #prose img[height] {
              object-fit: cover;
            }
            #prose img[style*="float: right"],
            #prose img[style*="float:right"],
            #prose img[data-align="right"] {
              float: right !important;
              margin: 8px 0 20px 24px !important;
              display: inline-block !important;
            }
            #prose img[style*="float: left"],
            #prose img[style*="float:left"],
            #prose img[data-align="left"] {
              float: left !important;
              margin: 8px 24px 20px 0 !important;
              display: inline-block !important;
            }
            #prose img[style*="display: inline-block"],
            #prose img[style*="display:inline-block"],
            #prose img[data-align="inline"] {
              display: inline-block !important;
              vertical-align: top !important;
              margin: 8px 12px 16px 0 !important;
            }
            #prose img[data-align="center"] {
              display: block !important;
              margin: 24px auto !important;
              clear: both !important;
            }
            #prose::after {
              content: "";
              display: table;
              clear: both;
            }
            @media (max-width: 640px) {
              #prose img {
                float: none !important;
                display: block !important;
                width: 100% !important;
                max-width: 100% !important;
                height: auto !important;
                margin: 20px auto !important;
              }
            }
          `}} />

          {/* Conclusion */}
          {conclusion && (
            <section
              id="conclusion"
              className="mt-12 pt-8 border-t border-[#e3dac9]/60"
              style={{ scrollMarginTop: "116px" }}
            >
              <h2 id="conclusion-heading" className="font-belleza font-normal tracking-wide text-2xl sm:text-3xl text-[#1e2422] leading-[1.2] mb-4">
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
                    href={`/blog`}
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
            <FallbackImage
              src={post.author_photo || "/images/acharya-siddhant.jpg"}
              alt={post.author || "Author"}
              fallbackSrc="/logo/siddhant-logo.svg"
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
                    href={`/blog/${rel.slug}`}
                    tabIndex={-1}
                    aria-hidden="true"
                    className="block aspect-[16/10] overflow-hidden rounded-xl mb-4 bg-stone-100"
                  >
                    <FallbackImage
                      src={toCleanBlogImageUrl(rel.featured_image, rel.slug)}
                      alt={rel.title}
                      fallbackSrc="/blog/images/yoga-and-meditation-retreat-riverside.jpg"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </Link>
                  <span className="font-figtree text-xs font-semibold tracking-wider uppercase text-[#b85c00] mb-1.5 block">
                    {rel.category_name}
                  </span>
                  <h3 className="font-belleza font-normal text-xl text-[#1e2422] hover:text-[#1c3b2b] transition-colors leading-snug mb-2 flex-1">
                    <Link href={`/blog/${rel.slug}`}>{rel.title}</Link>
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
