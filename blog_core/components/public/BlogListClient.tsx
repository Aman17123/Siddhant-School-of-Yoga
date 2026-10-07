"use client";

import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import LatestPosts from "./LatestPosts";
import BlogHeroSlider, { type HeroSlide } from "./BlogHeroSlider";
import SidebarTtcCourses from "./SidebarTtcCourses";
import { toCleanBlogImageUrl } from "@/blog_core/lib/imageUtils";

interface Category {
  id: number;
  name: string;
  slug: string;
  color?: string;
  description?: string;
}

interface Blog {
  id: number;
  title: string;
  slug: string;
  category_id?: number;
  category_name?: string;
  featured_image?: string;
  short_description?: string;
  content?: string;
  popular?: number | boolean;
  author?: string;
  published_at?: string;
  created_at?: string;
  views?: number;
  tags?: string | string[];
}

interface Props {
  initialblog: Blog[];
  categories: Category[];
  popularblog: Blog[];
  popularTags: string[];
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


export default function BlogListClient({
  initialblog,
  categories,
  popularblog,
  popularTags,
}: Props) {
  const [blog, setblog] = useState<Blog[]>(initialblog);
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Client-side fetch to keep live posts synced with Hostinger MySQL
  useEffect(() => {
    fetch("/api/blog/posts?status=published")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.success && Array.isArray(data.blog) && data.blog.length > 0) {
          setblog(data.blog);
        }
      })
      .catch(() => {});
  }, []);

  // Featured hero slides: Top 5 most viewed blog automatically
  const heroSlides = useMemo<HeroSlide[]>(() => {
    if (popularblog && popularblog.length > 0) return popularblog.slice(0, 5);
    return [...blog]
      .sort((a, b) => (Number(b.views) || 0) - (Number(a.views) || 0))
      .slice(0, 5);
  }, [popularblog, blog]);

  // Filter blog
  const filteredblog = useMemo(() => {
    return blog.filter((blog) => {
      const matchesCat =
        selectedCat === "all" ||
        blog.category_name?.toLowerCase() === selectedCat.toLowerCase() ||
        categories.find((c) => c.slug === selectedCat)?.name.toLowerCase() ===
          blog.category_name?.toLowerCase();

      const q = searchQuery.toLowerCase().trim();
      const tagsString = Array.isArray(blog.tags)
        ? blog.tags.join(" ")
        : (blog.tags as string | undefined) || "";
      const matchesSearch =
        !q ||
        blog.title.toLowerCase().includes(q) ||
        blog.short_description?.toLowerCase().includes(q) ||
        blog.category_name?.toLowerCase().includes(q) ||
        blog.author?.toLowerCase().includes(q) ||
        tagsString.toLowerCase().includes(q);

      return matchesCat && matchesSearch;
    });
  }, [blog, selectedCat, searchQuery, categories]);

  // const handleSubscribe = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (email) {
  //     setSubscribed(true);
  //     setEmail("");
  //   }
  // };




  return (
    <div className="bg-white text-[#1e2422] font-figtree antialiased min-h-screen">
      <main>
        {/* 1. HERO SECTION WITH BREADCRUMB */}
        <section className="relative flex min-h-[32vh] sm:min-h-[34vh] md:min-h-[36vh] lg:min-h-[38vh] items-end overflow-hidden">
          {/* Background Image with Dark Overlay */}
          <div className="absolute inset-0">
            <Image
              src="/images/blog-hero.webp"
              alt="Siddhant School of Yoga Blog"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/35" />
          </div>

          {/* Main Left-Aligned Container */}
          <div className="relative z-10 mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8 pb-8 sm:pb-10 md:pb-12 pt-16">
            <nav aria-label="breadcrumb" className="bw-nav max-w-4xl text-left flex flex-col gap-2.5 sm:gap-3 font-figtree">
              {/* Breadcrumb List */}
              <ol className="breadcrumb-list flex flex-wrap items-center gap-2 text-sm font-medium text-white/85" aria-label="Page location">
                <li className="breadcrumb-item">
                  <Link href="/" title="Siddhant School of Yoga" className="transition-colors hover:text-white">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="text-white/50 select-none">›</li>
                <li className="breadcrumb-item active text-white font-semibold" aria-current="page">
                  blog
                </li>
              </ol>

              {/* Breadcrumb Heading */}
              <h1 className="breadcrumb-heading text-left font-belleza font-normal tracking-wide text-3xl sm:text-4xl lg:text-[44px] leading-[1.15] text-white drop-shadow-md">
                Yoga Blog &amp; Articles
              </h1>
            </nav>
          </div>
        </section>

        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 font-figtree">
          {/* 2. BLOG INTRO */}
          <div className="pt-10 sm:pt-12 pb-6 text-center">
            <span className="block text-xs font-semibold tracking-[0.08em] uppercase text-[#b85c00] mb-2 font-figtree">
              Our Yoga blog
            </span>
            <h2 className="font-belleza font-normal tracking-wide text-2xl sm:text-3xl lg:text-[38px] leading-[1.2] text-[#1e2422]">
              Yoga Blog: Teacher Training, Pranayama &amp; Rishikesh Guides
            </h2>
            <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl mx-auto font-figtree">
              Practical yoga tips, authentic sadhana insights, and spiritual life in Rishikesh — from the masters at Siddhant School of Yoga.
            </p>
          </div>
        </div>

        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 font-figtree">
        {/* 3. CATEGORY BAR */}
        <nav className="py-4 flex gap-2.5 overflow-x-auto border-b border-[#e3dac9]/70 scrollbar-none items-center" aria-label="Categories">
          <button
            onClick={() => {
              setSelectedCat("all");
            }}
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-figtree font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCat === "all"
                ? "bg-[#1c3b2b] text-white shadow-xs"
                : "bg-[#fdfbf7] text-stone-700 hover:bg-[#1c3b2b] hover:text-white border border-[#e3dac9]"
            }`}
          >
            All blog ({blog.length})
          </button>
          {categories.map((cat) => {
            const count = blog.filter(
              (b) => b.category_name?.toLowerCase() === cat.name.toLowerCase()
            ).length;
            const isSelected =
              selectedCat.toLowerCase() === cat.name.toLowerCase() ||
              selectedCat.toLowerCase() === cat.slug.toLowerCase();

            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCat(cat.name);
                }}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-figtree font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#1c3b2b] text-white shadow-xs"
                    : "bg-[#fdfbf7] text-stone-700 hover:bg-[#1c3b2b] hover:text-white border border-[#e3dac9]"
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </nav>

        {/* 4. MAIN FEED + SIDEBAR */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-10 items-start py-8">
          {/* Left Feed */}
          <section aria-labelledby="latest-heading">
            {filteredblog.length === 0 ? (
              <div className="text-center py-16 bg-[#fdfbf7] rounded-2xl border border-[#e3dac9] p-8">
                <h3 className="font-belleza font-normal text-2xl text-[#1e2422]">No articles found.</h3>
                <p className="font-figtree text-sm text-stone-500 mt-1">Try clearing your search or picking another category.</p>
                <button
                  onClick={() => {
                    setSelectedCat("all");
                    setSearchQuery("");
                  }}
                  className="mt-4 px-5 py-2.5 bg-[#1c3b2b] hover:bg-[#142b1e] text-white font-figtree text-xs sm:text-sm font-semibold rounded-full cursor-pointer transition-colors"
                >
                  Show all blog
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-6 sm:gap-7">
                {filteredblog.map((blog) => (
                  <article
                    key={blog.id}
                    className="group bg-white border border-[#e3dac9] hover:border-[#1c3b2b]/40 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row font-figtree"
                  >
                    {/* Item Image on Left */}
                    <div className="relative md:w-[310px] lg:w-[330px] shrink-0 aspect-[16/10] md:aspect-auto min-h-[210px] overflow-hidden bg-stone-100">
                      <a href={`/blog/${blog.slug}/`} className="block w-full h-full relative">
                        <img
                          src={toCleanBlogImageUrl(blog.featured_image, blog.slug)}
                          alt={blog.title}
                          onError={(e) => {
                            const img = e.currentTarget;
                            if (!img.src.includes("yoga-and-meditation-retreat-riverside.jpg")) {
                              img.src = "/blog/images/yoga-and-meditation-retreat-riverside.jpg";
                            } else if (!img.src.includes("/images/yoga-and-meditation-retreat-riverside.jpg")) {
                              img.src = "/images/yoga-and-meditation-retreat-riverside.jpg";
                            }
                          }}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </a>
                      {/* Category Label in Top-Left */}
                      <span className="absolute top-3 left-3 bg-[#1c3b2b]/90 backdrop-blur-md text-white text-[10.5px] font-semibold px-3 py-1 rounded-full shadow-xs uppercase tracking-wider">
                        {blog.category_name || "Yoga"}
                      </span>
                    </div>

                    {/* Item Content on Right */}
                    <div className="flex flex-col flex-1 p-5 sm:p-6 justify-between">
                      <div>
                        {/* Title */}
                        <h3 className="font-belleza font-bold text-xl sm:text-[22px] leading-snug text-[#1e2422] group-hover:text-[#1c3b2b] transition-colors mb-2.5 line-clamp-2">
                          <a href={`/blog/${blog.slug}/`}>{blog.title}</a>
                        </h3>

                        {/* Post Meta */}
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-stone-500 mb-3 font-figtree">
                          <span className="font-semibold text-stone-800 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1c3b2b]"></span>
                            {blog.author || "Acharya Siddhant"}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1.5 text-stone-500">
                            <svg className="w-3.5 h-3.5 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {formatDate(blog.published_at || blog.created_at)}
                          </span>
                        </div>

                        {/* Summary Description */}
                        <p className="font-figtree text-sm text-stone-600 line-clamp-2 sm:line-clamp-3 leading-relaxed mb-4">
                          {blog.short_description}
                        </p>
                      </div>

                      {/* Bottom Action Row */}
                      <div className="pt-3 border-t border-[#f4efe6] flex items-center justify-between mt-auto">
                        <a
                          href={`/blog/${blog.slug}/`}
                          className="inline-flex items-center gap-2 px-5 py-2 bg-[#1c3b2b] hover:bg-[#14291e] text-white font-figtree text-xs sm:text-sm font-semibold rounded-lg transition-all shadow-xs hover:shadow-md group/btn"
                        >
                          <span>Know More</span>
                          <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </a>
                        <span className="text-[11px] font-medium text-stone-400 uppercase tracking-wider hidden sm:inline-block font-figtree">
                          Yoga Guide
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          {/* Right Sidebar: Yoga TTC Courses & Latest Posts */}
          <aside className="space-y-6 sticky top-20">
            <SidebarTtcCourses />
            <LatestPosts posts={blog} />
          </aside>
        </div>
        </div>

        {/* POPULAR blog AT BOTTOM */}
        {heroSlides.length > 0 && (
          <section
            className="py-12 md:py-16 border-t border-[#e3dac9]/60 bg-[#fdfbf7] overflow-hidden font-figtree"
            aria-labelledby="popular-blog-heading"
          >
            <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-6 sm:mb-8">
                <span className="block text-xs font-semibold tracking-[0.08em] uppercase text-[#b85c00] mb-2 font-figtree">
                  Featured Highlights
                </span>
                <h2
                  id="popular-blog-heading"
                  className="font-belleza font-normal tracking-wide text-2xl sm:text-3xl lg:text-[38px] leading-[1.2] text-[#1e2422]"
                >
                  Popular Yoga blog
                </h2>
                <p className="mt-2 font-figtree text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl mx-auto">
                  Explore practical yoga guides, authentic sadhana insights, and spiritual wisdom from the masters at Siddhant School of Yoga.
                </p>
              </div>

              <BlogHeroSlider slides={heroSlides} />
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
