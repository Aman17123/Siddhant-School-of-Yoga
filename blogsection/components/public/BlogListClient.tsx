"use client";

import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import LatestBlogs from "./LatestBlogs";
import BlogHeroSlider, { type HeroSlide } from "./BlogHeroSlider";
import SidebarTtcCourses from "./SidebarTtcCourses";
import { toCleanBlogImageUrl } from "@/blogsection/lib/imageUtils";

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
  initialBlogs: Blog[];
  categories: Category[];
  popularBlogs: Blog[];
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
  initialBlogs,
  categories,
  popularBlogs,
  popularTags,
}: Props) {
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Featured hero slides: Top 5 most viewed blogs automatically
  const heroSlides = useMemo<HeroSlide[]>(() => {
    if (popularBlogs && popularBlogs.length > 0) return popularBlogs.slice(0, 5);
    return [...initialBlogs]
      .sort((a, b) => (Number(b.views) || 0) - (Number(a.views) || 0))
      .slice(0, 5);
  }, [popularBlogs, initialBlogs]);

  // Filter blogs
  const filteredBlogs = useMemo(() => {
    return initialBlogs.filter((blog) => {
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
  }, [initialBlogs, selectedCat, searchQuery, categories]);

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
              src="/images/hero-bg.webp"
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
                  Blogs
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
              Our Yoga Blogs
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
        <nav className="py-4 flex gap-2 overflow-x-auto border-b border-[#e3dac9]/60 scrollbar-none" aria-label="Categories">
          <button
            onClick={() => {
              setSelectedCat("all");
            }}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-figtree font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCat === "all"
                ? "bg-[#1c3b2b] text-white shadow-xs"
                : "bg-[#f4efe6] text-stone-700 hover:bg-[#1c3b2b] hover:text-white border border-[#1c3b2b]/30"
            }`}
          >
            All Blogs ({initialBlogs.length})
          </button>
          {categories.map((cat) => {
            const count = initialBlogs.filter(
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
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-figtree font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#1c3b2b] text-white shadow-xs"
                    : "bg-[#f4efe6] text-stone-700 hover:bg-[#1c3b2b] hover:text-white border border-[#1c3b2b]/30"
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </nav>

        {/* 4. MAIN FEED + SIDEBAR */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 items-start py-8">
          {/* Left Feed */}
          <section aria-labelledby="latest-heading">
            {filteredBlogs.length === 0 ? (
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
                  Show all blogs
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-6 sm:gap-7">
                {filteredBlogs.map((blog) => (
                  <article
                    key={blog.id}
                    className="group bg-white border border-[#e3dac9] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col md:flex-row font-figtree"
                  >
                    {/* Item Image on Left */}
                    <div className="relative md:w-[310px] lg:w-[330px] shrink-0 aspect-[16/10] md:aspect-auto overflow-hidden bg-stone-100">
                      <Link href={`/blogs/${blog.slug}`} className="block w-full h-full relative">
                        <img
                          src={toCleanBlogImageUrl(blog.featured_image, blog.slug)}
                          alt={blog.title}
                          onError={(e) => {
                            const img = e.currentTarget;
                            if (img.src.endsWith("/blog/images/yoga-and-meditation-retreat-riverside.jpg")) return;
                            img.src = "/blog/images/yoga-and-meditation-retreat-riverside.jpg";
                          }}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </Link>
                      {/* Category Label in Top-Left */}
                      <span className="absolute top-3 left-3 bg-[#b32025] text-white text-[11px] font-semibold px-2.5 py-1 rounded-xs shadow-xs uppercase tracking-wider">
                        {blog.category_name || "Yoga"}
                      </span>
                    </div>

                    {/* Item Content on Right */}
                    <div className="flex flex-col flex-1 p-5 sm:p-6 justify-between">
                      <div>
                        {/* Title */}
                        <h3 className="font-belleza font-bold text-xl sm:text-[22px] leading-snug text-[#1e2422] group-hover:text-[#b32025] transition-colors mb-2.5 line-clamp-2">
                          <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
                        </h3>

                        {/* Post Meta */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-stone-500 mb-3 font-figtree">
                          <span className="font-semibold text-stone-700">
                            {blog.author || "Acharya Siddhant"}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {formatDate(blog.published_at || blog.created_at)}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                            </svg>
                            0
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            {blog.views || 0}
                          </span>
                        </div>

                        {/* Summary Description */}
                        <p className="font-figtree text-sm text-stone-600 line-clamp-3 leading-relaxed mb-4">
                          {blog.short_description}
                        </p>
                      </div>

                      {/* Know More Button */}
                      <div>
                        <Link
                          href={`/blogs/${blog.slug}`}
                          className="inline-flex items-center justify-center px-5 py-2 bg-[#b32025] hover:bg-[#8f181c] text-white font-figtree text-xs sm:text-sm font-semibold rounded-xs transition-colors shadow-xs"
                        >
                          Know More
                        </Link>
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
            <LatestBlogs posts={initialBlogs} />
          </aside>
        </div>
        </div>

        {/* POPULAR BLOGS AT BOTTOM */}
        {heroSlides.length > 0 && (
          <section
            className="py-12 md:py-16 border-t border-[#e3dac9]/60 bg-[#fdfbf7] overflow-hidden font-figtree"
            aria-labelledby="popular-blogs-heading"
          >
            <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-6 sm:mb-8">
                <span className="block text-xs font-semibold tracking-[0.08em] uppercase text-[#b85c00] mb-2 font-figtree">
                  Featured Highlights
                </span>
                <h2
                  id="popular-blogs-heading"
                  className="font-belleza font-normal tracking-wide text-2xl sm:text-3xl lg:text-[38px] leading-[1.2] text-[#1e2422]"
                >
                  Popular Yoga Blogs
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
