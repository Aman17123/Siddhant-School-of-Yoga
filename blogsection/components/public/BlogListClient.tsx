"use client";

import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import TrainWithUsCard from "./TrainWithUsCard";
import LatestBlogs from "./LatestBlogs";
import CourseInfiniteCarousel from "./CourseInfiniteCarousel";
import { COURSES } from "@/content/courses";
import ThemeButton from "@/components/shared/ThemeButton";
import BlogHeroSlider, { type HeroSlide } from "./BlogHeroSlider";
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
  tags?: string;
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
      const matchesSearch =
        !q ||
        blog.title.toLowerCase().includes(q) ||
        blog.short_description?.toLowerCase().includes(q) ||
        blog.category_name?.toLowerCase().includes(q) ||
        blog.author?.toLowerCase().includes(q) ||
        blog.tags?.toLowerCase().includes(q);

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
    <div className="bg-white text-[#2A1621] font-sans antialiased min-h-screen">
      <main>
        

        {/* 1. HERO SECTION WITH BREADCRUMB */}
        <section className="relative flex min-h-[32vh] sm:min-h-[34vh] md:min-h-[36vh] lg:min-h-[38vh] items-end overflow-hidden">
          {/* Background Image with Dark Overlay */}
          <div className="absolute inset-0">
            <Image
              src="/images/courses/breadcumb/sanskriti-yogpeeth-in-rishikesh.webp"
              alt="Sanskriti Yogpeeth Blog"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/35" />
          </div>

          {/* Main Left-Aligned Container */}
          <div className="relative z-10 mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8 pb-8 sm:pb-10 md:pb-12 pt-16">
            <nav aria-label="breadcrumb" className="bw-nav max-w-4xl text-left flex flex-col gap-2.5 sm:gap-3">
              {/* Breadcrumb List */}
              <ol className="breadcrumb-list flex flex-wrap items-center gap-2 text-body font-medium text-white/85" aria-label="Page location">
                <li className="breadcrumb-item">
                  <Link href="/" title="Sanskriti Yogpeeth" className="transition-colors hover:text-white">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="text-white/50 text-label select-none">›</li>
                <li className="breadcrumb-item active text-white font-semibold" aria-current="page">
                  Blog
                </li>
              </ol>

              {/* Breadcrumb Heading */}
              <h1 className="breadcrumb-heading text-left font-display font-bold text-display leading-[1.1] sm:leading-[1.15] text-white/95 drop-shadow-md">
                Yoga Blog & Articles
              </h1>
            </nav>
          </div>
        </section>

        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* 2. BLOG INTRO */}
          <div className="pt-10 sm:pt-12 pb-6 text-center">
            <span className="inline-flex items-center gap-1.5 text-body-sm font-bold uppercase tracking-widest text-[#BF296A] mb-2">
              Our Yoga Blogs
            </span>
            <h2 className="font-display font-semibold text-section leading-[1.15] text-[#2A1621] tracking-[-0.01em]">
              Yoga Blog: Teacher Training, Pranayama & Rishikesh Guides
            </h2>
            <p className="mt-3 text-body text-[#6B5862] leading-relaxed">
              Practical yoga tips, TTC insights, and life in Rishikesh — from the teachers at Sanskriti Yogpeeth.
            </p>
          </div>
        </div>

        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* 3. CATEGORY BAR */}
        <nav className="py-4 flex gap-2 overflow-x-auto border-b border-gray-100 scrollbar-none" aria-label="Categories">
          <button
            onClick={() => {
              setSelectedCat("all");
            }}
            className={`px-4 py-2 rounded-full text-label font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCat === "all"
                ? "bg-gradient-to-r from-[#BF296A] to-[#951248] text-white shadow-xs"
                : "bg-[#FDF9FB] text-[#6B5862] hover:bg-[#FDF9FB] hover:text-[#BF296A] border border-gray-100"
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
                className={`px-4 py-2 rounded-full text-label font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? "bg-gradient-to-r from-[#BF296A] to-[#951248] text-white shadow-xs"
                    : "bg-[#FDF9FB] text-[#6B5862] hover:bg-[#FDF9FB] hover:text-[#BF296A] border border-gray-100"
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
              <div className="text-center py-16 bg-[#FDF9FB] rounded-2xl border border-gray-100 p-8">
                <h3 className="font-display text-card font-bold text-[#2A1621]">No articles found.</h3>
                <p className="text-label text-[#6B5862] mt-1">Try clearing your search or picking another category.</p>
                <button
                  onClick={() => {
                    setSelectedCat("all");
                    setSearchQuery("");
                  }}
                  className="mt-4 px-4 py-2 bg-[#BF296A] text-white text-label font-bold rounded-lg cursor-pointer hover:bg-[#951248]"
                >
                  Show all blogs
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredBlogs.map((blog) => (
                  <article
                    key={blog.id}
                    className="bg-[#FDF9FB] border border-gray-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-1 transition-all flex flex-col"
                  >
                    
                    <Link
                      href={`/blog/${blog.slug}`}
                      className="block aspect-[16/10] overflow-hidden bg-slate-100"
                    >
                      <img
                        src={toCleanBlogImageUrl(blog.featured_image, blog.slug)}
                        alt={blog.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </Link>
                    <div className="flex flex-col flex-1 px-5 pt-4 pb-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-label font-bold uppercase tracking-wider text-[#BF296A]">
                          {blog.category_name}
                        </span>
                        <span className="text-label font-medium text-[#6B5862]/80">
                          {formatDate(blog.published_at || blog.created_at)}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-card text-[#2A1621] hover:text-[#BF296A] transition-colors leading-snug mb-2 flex-1 line-clamp-2">
                        <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                      </h3>
                      <p className="text-body-sm text-[#6B5862] line-clamp-2 leading-relaxed mb-4">
                        {blog.short_description}
                      </p>
                      <div className="text-label font-semibold text-[#6B5862]/80 mt-auto pt-3 border-t border-[#f0e4e8] flex items-center justify-between">
                        <Link
                          href={`/blog/${blog.slug}`}
                          className="inline-flex items-center px-3.5 py-1.5 rounded-full border border-[#BF296A]/30 text-[#BF296A] hover:bg-[#BF296A] hover:text-white transition-all duration-300 font-bold tracking-wide group/btn"
                        >
                          Read More 
                          <svg className="w-3.5 h-3.5 ml-1.5 transform group-hover/btn:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </Link>
                        <span className="pl-4"> {blog.author}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            
          </section>

          {/* Right Sidebar */}
          <aside className="space-y-8 sticky top-18 rounded-[32px] border border-[#BF296A]/20">

            <LatestBlogs posts={initialBlogs} />

            

            {/* <TrainWithUsCard /> */}

            {/* Topics */}
            {/* {popularTags.length > 0 && (
              <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs">
                <h2 className="font-display text-card font-bold text-[#2A1621] mb-3">Popular Topics</h2>
                <div className="flex flex-wrap gap-1.5">
                  {popularTags.slice(0, 10).map((tag, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSearchQuery(tag)}
                      className="text-label font-medium px-2.5 py-1 rounded-full bg-[#FDF9FB] text-[#6B5862] hover:bg-[#FDF9FB] hover:text-[#BF296A] border border-gray-100 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </section>
            )} */}

            {/* Newsletter */}
            {/* <div className="bg-[#FDF9FB] border border-gray-100 rounded-2xl p-6 shadow-xs">
              <h3 className="font-serif text-body font-bold text-[#2A1621] mb-1">Weekly Ashram Notes</h3>
              <p className="text-label text-[#6B5862] leading-relaxed mb-3">
                One practical posture tip and one yogic quote every Sunday morning. No spam.
              </p>
              {subscribed ? (
                <div className="text-label font-bold text-[#C9862A] bg-[#FDF9FB] p-2.5 rounded-lg border border-[#C9862A]/30">
                  Dhanyavaad! You are subscribed.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <input
                    type="email"
                    required
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-100 rounded-lg text-label text-[#2A1621] focus:outline-none focus:border-[#BF296A]"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 bg-[#BF296A] hover:bg-[#951248] text-white text-label font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div> */}
          </aside>
        </div>
        </div>

        {/* 5. POPULAR BLOGS / EDITORIAL SHOWCASE */}
        {heroSlides.length > 0 && (
          <section
            className="py-8 sm:py-10 lg:py-12 border-t border-[#EFE3E9]/70 bg-[#FFF8FA] overflow-hidden"
            aria-labelledby="popular-blogs-heading"
          >
            <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-4 sm:mb-6">
                <h2
                  id="popular-blogs-heading"
                  className="font-display font-semibold text-display leading-[1.15] text-[#2A1621] tracking-[-0.01em]"
                >
                  Popular Blogs
                </h2>
                <p className="mt-2 text-body text-[#6B5862] leading-relaxed ">
                  Explore practical yoga guides, timeless practices, and insights to support your journey toward a healthier, more balanced life.
                </p>
              </div>

              <BlogHeroSlider slides={heroSlides} />
            </div>
          </section>
        )}
        

        {/* infinite scrolling courses  */}
        <CourseInfiniteCarousel />
      </main>
    </div>
  );
}
