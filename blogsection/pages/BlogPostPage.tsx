import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { supabase } from "../lib/supabase";
import { publishDueBlogs } from "../lib/schedule";
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
    await publishDueBlogs();
    const { data: post } = await supabase
      .from("blogs")
      .select("title, meta_title, meta_description, short_description, featured_image, meta_keywords, tags, published_at")
      .eq("slug", slug)
      .eq("status", "published")
      .single();

    if (!post) {
      return {
        title: "Article Not Found | Sanskriti Yogpeeth",
        description: "The requested blog article could not be found.",
      };
    }

    const pageTitle = post.meta_title || `${post.title} | Sanskriti Yogpeeth`;
    const pageDesc = post.meta_description || post.short_description?.slice(0, 160) || "Yoga, Meditation and Teacher Training in Rishikesh";
    const keywords = parseList(post.meta_keywords || post.tags);
    const rawImage = toCleanBlogImageUrl(post.featured_image, slug);
    const ogImageUrl = rawImage.startsWith("http")
      ? rawImage
      : `https://sanskritiyogpeeth.org${rawImage.startsWith("/") ? "" : "/"}${rawImage}`;

    return {
      title: pageTitle,
      description: pageDesc,
      keywords: keywords.length > 0 ? keywords : undefined,
      alternates: {
        canonical: `https://sanskritiyogpeeth.org/blog/${slug}`,
      },
      openGraph: {
        title: pageTitle,
        description: pageDesc,
        url: `https://sanskritiyogpeeth.org/blog/${slug}`,
        siteName: "Sanskriti Yogpeeth Rishikesh",
        type: "article",
        publishedTime: post.published_at ? new Date(post.published_at).toISOString() : undefined,
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: post.title,
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
      title: "Yoga Blog | Sanskriti Yogpeeth",
      description: "Yoga and Wellness insights from Sanskriti Yogpeeth Rishikesh",
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

  // A post whose scheduled time has just passed must be live here too.
  await publishDueBlogs();

  // 1. Fetch post from Supabase
  const { data: blogData } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!blogData) {
    notFound();
  }

  // Fetch author details safely
  let authorObj: AuthorProfile = {};
  if (blogData.author) {
    try {
      const cleanAuthor = String(blogData.author).trim();
      const { data: u } = await supabase
        .from("users")
        .select("photo, title, bio, yoga_alliance, instagram, youtube")
        .or(`name.eq."${cleanAuthor}",username.eq."${cleanAuthor}"`)
        .limit(1)
        .maybeSingle();
      if (u) authorObj = u;
    } catch (e) {
      // author fetch fallback
    }
  }

  const post = {
    ...blogData,
    author_photo: authorObj.photo || null,
    author_title: authorObj.title || null,
    author_bio: authorObj.bio || null,
    author_credentials: authorObj.yoga_alliance || null,
    author_instagram: authorObj.instagram || null,
    author_youtube: authorObj.youtube || null,
  };

  // 2. Increment view count in background
  try {
    await supabase
      .from("blogs")
      .update({ views: (post.views || 0) + 1 })
      .eq("id", post.id);
  } catch (e) {}

  // 3. Fetch related posts
  let finalRelated: RelatedPost[] = [];
  try {
    const { data: relatedPosts } = await supabase
      .from("blogs")
      .select("id, title, slug, category_name, featured_image, short_description, published_at, created_at, author")
      .eq("status", "published")
      .eq("category_id", post.category_id || 0)
      .neq("id", post.id)
      .order("published_at", { ascending: false })
      .limit(3);

    finalRelated = relatedPosts || [];
    if (finalRelated.length < 3) {
      const { data: fallback } = await supabase
        .from("blogs")
        .select("id, title, slug, category_name, featured_image, short_description, published_at, created_at, author")
        .eq("status", "published")
        .neq("id", post.id)
        .order("published_at", { ascending: false })
        .limit(3 - finalRelated.length);
      finalRelated = [...finalRelated, ...(fallback || [])];
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
    : `https://sanskritiyogpeeth.org${rawFeatured.startsWith("/") ? "" : "/"}${rawFeatured}`;

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
      name: post.author || "Sanskriti Yogpeeth",
      jobTitle: post.author_title || "Yoga Master",
    },
    publisher: {
      "@type": "Organization",
      name: "Sanskriti Yogpeeth Rishikesh",
      logo: {
        "@type": "ImageObject",
        url: "https://sanskritiyogpeeth.org/images/branding/logo1.webp",
      },
    },
    mainEntityOfPage: `https://sanskritiyogpeeth.org/blog/${post.slug}`,
  };

  return (
    <>
      <article className="bg-white text-[#2A1621] font-sans antialiased leading-relaxed min-h-screen">
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
            <nav className="flex flex-wrap items-center gap-2 text-body-sm text-[#6B5862] mb-4 font-medium" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-[#BF296A] transition-colors">Home</Link>
              <span className="text-[#6B5862]/50">/</span>
              <Link href="/blog" className="hover:text-[#BF296A] transition-colors">Blog</Link>
              <span className="text-[#6B5862]/50">/</span>
              <span className="text-[#BF296A] font-bold">{post.category_name || "General"}</span>
            </nav>

            <h1 className="font-display text-section font-bold text-[#2A1621] leading-[1.15] tracking-[-0.01em] mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-4 text-body-sm text-[#6B5862] pb-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <img
                  src={post.author_photo || "/images/branding/logo1.webp"}
                  alt={post.author || "Author"}
                  className="w-10 h-10 rounded-full object-cover border border-gray-100 shadow-xs"
                />
                <div className="text-label">
                  <b className="text-[#2A1621] block text-body-sm">{post.author || "Sanskriti Yogpeeth"}</b>
                  <span className="text-[#6B5862]">
                    {post.author_title || "Yoga School Faculty"}
                    {post.author_credentials && ` (${post.author_credentials})`}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-label text-[#6B5862]">
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
              className="w-full h-auto max-h-[520px] object-cover rounded-2xl shadow-md border border-gray-100/50"
            />
            {post.featured_image_title && (
              <figcaption className="text-label text-[#6B5862] text-center mt-2.5 italic">
                {post.featured_image_title}
              </figcaption>
            )}
          </figure>

          {/* Quick Overview (TL;DR) Card */}
          {post.short_description && (
            <aside className="bg-[#FDF9FB] border-l-4 border-[#BF296A] rounded-r-xl p-5 sm:p-6 mb-8 shadow-xs">
              <b className="font-display text-card font-bold text-[#951248] block mb-1.5">
                Quick Overview
              </b>
              <p className="text-body-sm text-[#6B5862] leading-relaxed font-sans text-justify">{post.short_description}</p>
            </aside>
          )}

          {/* Prose Content */}
          <div
            className="text-[#2A1621] [&>p]:text-body [&>p]:text-justify [&>p]:font-medium [&>p]:mb-6 [&>h1]:font-display [&>h1]:font-bold [&>h1]:text-display [&>h1]:leading-[1.15] [&>h1]:text-[#2A1621] [&>h1]:mt-10 [&>h1]:mb-4 [&>h2]:font-display [&>h2]:font-semibold [&>h2]:text-section [&>h2]:leading-[1.2] [&>h2]:tracking-[-0.01em] [&>h2]:text-[#2A1621] [&>h2]:mt-10 [&>h2]:mb-4 [&>h3]:font-display [&>h3]:font-semibold [&>h3]:text-subsection [&>h3]:leading-[1.28] [&>h3]:text-[#2A1621] [&>h3]:mt-8 [&>h3]:mb-3 [&>h4]:font-display [&>h4]:font-semibold [&>h4]:text-card [&>h4]:leading-[1.32] [&>h4]:text-[#2A1621] [&>h4]:mt-6 [&>h4]:mb-2 [&>h5]:font-display [&>h5]:font-semibold [&>h5]:text-body [&>h5]:leading-[1.4] [&>h5]:text-[#2A1621] [&>h5]:mt-4 [&>h5]:mb-2 [&>h6]:font-display [&>h6]:font-semibold [&>h6]:text-body-sm [&>h6]:leading-[1.4] [&>h6]:text-[#2A1621] [&>h6]:mt-3 [&>h6]:mb-1 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>blockquote]:border-l-4 [&>blockquote]:border-[#BF296A] [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:my-6 [&>blockquote]:bg-[#FDF9FB] [&>blockquote]:py-3 [&>blockquote]:rounded-r-lg [&>img]:rounded-xl [&>img]:my-6 [&>img]:shadow-md [&>a]:text-[#BF296A] [&>a]:font-bold [&>a]:underline hover:[&>a]:text-[#951248] [&>table]:block [&>table]:w-full [&>table]:max-w-full [&>table]:overflow-x-auto [&>table]:my-7 [&>table]:border-collapse [&>table]:text-body-sm [&>table]:whitespace-nowrap [&>table>thead>tr>th]:bg-[#FDF9FB] [&>table>thead>tr>th]:border [&>table>thead>tr>th]:border-gray-100 [&>table>thead>tr>th]:px-3 [&>table>thead>tr>th]:py-2.5 [&>table>thead>tr>th]:text-left [&>table>thead>tr>th]:font-display [&>table>thead>tr>th]:font-bold [&>table>thead>tr>th]:text-[#2A1621] [&>table>tbody>tr>td]:border [&>table>tbody>tr>td]:border-gray-100 [&>table>tbody>tr>td]:px-3 [&>table>tbody>tr>td]:py-2.5 [&>table>tbody>tr>td]:align-top [&>table>tbody>tr>td]:text-[#2A1621] [&>table>tbody>tr>td]:font-medium [&>table>tbody>tr:nth-child(even)]:bg-[#FFFBFD] [&>table>tbody>tr>th]:border [&>table>tbody>tr>th]:border-gray-100 [&>table>tbody>tr>th]:bg-[#FDF9FB] [&>table>tbody>tr>th]:px-3 [&>table>tbody>tr>th]:py-2.5 [&>table>tbody>tr>th]:text-left [&>table>tbody>tr>th]:font-bold"
            id="prose"
            dangerouslySetInnerHTML={{ __html: cleanHtmlImageUrls(post.content, post.slug) }}
          />

          {/* Conclusion */}
          {conclusion && (
            <section
              id="conclusion"
              className="mt-12 pt-8 border-t border-gray-100"
            >
              <h2 className="font-display font-semibold text-section leading-[1.2] tracking-[-0.01em] text-[#2A1621] mb-4">
                Conclusion
              </h2>
              {conclusion
                .split(/\n\s*\n/)
                .map((para, i) => para.trim())
                .filter(Boolean)
                .map((para, i) => (
                  <p
                    key={i}
                    className="text-body font-medium text-justify text-[#2A1621] mb-6 last:mb-0 whitespace-pre-line"
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
            <div className="mt-10 pt-6 border-t border-gray-100 flex flex-wrap items-center gap-2">
              <b className="text-label font-bold uppercase tracking-wider text-[#6B5862] mr-2">Related Topics:</b>
              <div className="flex flex-wrap gap-2">
                {postTags.map((tag: string, idx: number) => (
                  <Link
                    key={idx}
                    href={`/blog`}
                    className="text-label font-semibold px-3 py-1 rounded-full bg-[#FDF9FB] text-[#6B5862] hover:bg-[#FDF9FB] hover:text-[#BF296A] border border-gray-100 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* AUTHOR BOX */}
          <div className="mt-12 p-6 sm:p-8 bg-[#FDF9FB] border border-gray-100 rounded-2xl flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-xs">
            <img
              src={post.author_photo || "/images/branding/logo1.webp"}
              alt={post.author || "Author"}
              className="w-20 h-20 rounded-full object-cover shrink-0 shadow-md border-2 border-[#BF296A]/20"
            />
            <div>
              <h3 className="font-display font-bold text-card text-[#2A1621]">{post.author || "Sanskriti Yogpeeth"}</h3>
              <p className="text-label font-bold text-[#BF296A] uppercase tracking-wider mt-0.5">
                {post.author_title || "Yoga Master & Ashram Guide"}
                {post.author_credentials && ` • ${post.author_credentials}`}
              </p>
              <p className="text-body-sm text-[#6B5862] mt-2.5 leading-relaxed font-sans">
                {post.author_bio ||
                  "Dedicated to sharing traditional yogic sadhana, Vedic philosophy, and authentic Himalayan spiritual practices at Sanskriti Yogpeeth in Rishikesh, India."}
              </p>
              <div className="mt-3.5">
                <Link
                  href="/yoga-teachers-in-rishikesh"
                  className="text-label font-bold text-[#BF296A] hover:text-[#951248] hover:underline"
                >
                  Meet our teachers &amp; gurus →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Left column: Sticky Aside. lg:order-first keeps the article first on mobile. */}
        <aside className="space-y-8 sticky top-14 rounded-[32px] lg:order-first">
          {/* <TrainWithUsCard /> */}

  {/* <ExploreOurProgram /> */}
  <TableOfContent />
      
          <div className="flex flex-col gap-2.5">
            <b className="text-label font-bold uppercase tracking-wider text-[#6B5862]">Share Article</b>
            <ShareButtons title={post.title} slug={post.slug} /> 
          </div>
        </aside>
      </div>

      {/* 4. RELATED ARTICLES */}
      {finalRelated.length > 0 && (
        <section className="bg-[#FDF9FB]/60 border-t border-gray-100 py-14 mt-16">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-display font-semibold text-section leading-[1.2] tracking-[-0.01em] text-[#2A1621]">Related articles</h2>
              <Link href="/blog" className="text-label font-bold text-[#BF296A] hover:underline">
                View all articles →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {finalRelated.map((rel) => (
                <article key={rel.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-1 transition-all p-5 flex flex-col">
                  <Link
                    href={`/blog/${rel.slug}`}
                    tabIndex={-1}
                    aria-hidden="true"
                    className="block aspect-[16/10] overflow-hidden rounded-xl mb-4 bg-slate-100"
                  >
                    <img
                      src={toCleanBlogImageUrl(rel.featured_image, rel.slug)}
                      alt={rel.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </Link>
                  <span className="text-label font-bold uppercase tracking-wider text-[#BF296A] mb-1.5 block">
                    {rel.category_name}
                  </span>
                  <h3 className="font-display font-bold text-card text-[#2A1621] hover:text-[#BF296A] transition-colors leading-snug mb-2 flex-1">
                    <Link href={`/blog/${rel.slug}`}>{rel.title}</Link>
                  </h3>
                  <p className="text-label text-[#6B5862] line-clamp-2 leading-relaxed mb-4">
                    {rel.short_description}
                  </p>
                  <p className="text-label font-semibold text-[#6B5862]/70 mt-auto pt-3 border-t border-gray-100/50">
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
