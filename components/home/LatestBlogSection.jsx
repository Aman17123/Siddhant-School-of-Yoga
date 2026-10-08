"use client";

import { useEffect, useMemo, useState } from "react";
import BlogHeroSlider from "@/blog_core/components/public/BlogHeroSlider";

const MAX_POSTS = 5;

// Newest first by publish date (same concept as the blog sidebar "Latest Posts"),
// then capped at the 5 most recent.
function pickLatest(posts) {
  return [...(posts || [])]
    .filter((p) => p && p.slug)
    .sort((a, b) => {
      const aTime = new Date(a.published_at || a.created_at || 0).getTime() || 0;
      const bTime = new Date(b.published_at || b.created_at || 0).getTime() || 0;
      return bTime - aTime;
    })
    .slice(0, MAX_POSTS);
}

export default function LatestBlogSection({ initialPosts = [] }) {
  const [posts, setPosts] = useState(initialPosts);

  // Client-side fetch to keep live posts synced with Hostinger MySQL
  // (same endpoint the blog list page uses).
  useEffect(() => {
    fetch("/api/blog/posts?status=published")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.success && Array.isArray(data.blog) && data.blog.length > 0) {
          setPosts(data.blog);
        }
      })
      .catch(() => {});
  }, []);

  const slides = useMemo(() => pickLatest(posts), [posts]);

  if (slides.length === 0) return null;

  return (
    <section
      className="py-12 md:py-16 border-t border-[#e3dac9]/60 bg-[#fdfbf7] overflow-hidden font-figtree"
      aria-labelledby="latest-posts-heading"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <span className="block text-xs font-semibold tracking-[0.08em] uppercase text-[#b85c00] mb-2 font-figtree">
            Featured Highlights
          </span>
          <h2
            id="latest-posts-heading"
            className="font-belleza font-normal tracking-wide text-2xl sm:text-3xl lg:text-[38px] leading-[1.2] text-[#1e2422]"
          >
            Latest Posts
          </h2>
          <p className="mt-2 font-figtree text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl mx-auto">
            Explore practical yoga guides, authentic sadhana insights, and spiritual wisdom from the masters at Siddhant School of Yoga.
          </p>
        </div>

        <BlogHeroSlider slides={slides} />
      </div>
    </section>
  );
}
