import { Metadata } from "next";
import { getBlogs, getCategories, getAuthors, query } from "../lib/db";
import BlogListClient from "../components/public/BlogListClient";
import type { Author } from "../lib/types";

export const metadata: Metadata = {
  title: "Yoga Journal: Poses, Pranayama & Teacher Training | Siddhant School of Yoga",
  description:
    "Pose guides, pranayama breathwork, philosophy and Yoga Teacher Training advice from certified teachers at Siddhant School of Yoga in Rishikesh, India.",
  keywords: [
    "Best Yoga School in Rishikesh",
    "Yoga Teacher Training Rishikesh",
    "200 Hour Yoga TTC",
    "Kundalini Yoga TTC",
    "Yoga Retreats Rishikesh",
    "Siddhant School of Yoga Blog",
  ],
  alternates: {
    canonical: "https://www.siddhantschoolofyoga.com/blog",
  },
  openGraph: {
    title: "Yoga Journal | Siddhant School of Yoga Rishikesh",
    description:
      "Pose guides, pranayama breathwork, and Yoga Teacher Training advice from certified teachers in Rishikesh.",
    url: "https://www.siddhantschoolofyoga.com/blog",
    siteName: "Siddhant School of Yoga Rishikesh",
  },
};

export default async function BlogPage() {
  // 1. Fetch all published blogs from MySQL
  let rawBlogs: Record<string, unknown>[] = [];
  let usersData: Record<string, unknown>[] = [];
  let categories: Record<string, unknown>[] = [];
  let popularBlogs: Record<string, unknown>[] = [];

  try {
    rawBlogs = await getBlogs({ status: "published" });
    usersData = await getAuthors();
    categories = await getCategories();
    popularBlogs = await query<Record<string, unknown>[]>(
      "SELECT id, title, slug, featured_image, short_description, category_name, author, published_at, views, popular FROM `blogs` WHERE `status` = 'published' ORDER BY `views` DESC, `published_at` DESC LIMIT 5"
    );
  } catch (err) {
    console.error("[MySQL] Blog list fetch warning (ensure MySQL is running):", err);
  }

  // 2. Map authors
  const userMap: Record<string, Pick<Author, "photo" | "title" | "yoga_alliance">> = {};
  usersData.forEach((u) => {
    if (u.name) userMap[String(u.name)] = u as unknown as Pick<Author, "photo" | "title" | "yoga_alliance">;
    if (u.username) userMap[String(u.username)] = u as unknown as Pick<Author, "photo" | "title" | "yoga_alliance">;
  });

  const blogs = rawBlogs.map((b: any) => {
    const authorObj = userMap[String(b.author)] || {};
    return {
      ...b,
      author_photo: authorObj.photo || null,
      author_title: authorObj.title || null,
      author_credentials: authorObj.yoga_alliance || null,
    };
  });

  // 3. Extract distinct tags
  const rawTags = (blogs || []).flatMap((b: any) => {
    if (Array.isArray(b.tags)) return b.tags;
    if (typeof b.tags === "string") {
      try {
        const parsed = JSON.parse(b.tags);
        if (Array.isArray(parsed)) return parsed;
      } catch {}
      return b.tags.split(",").map((t: string) => t.trim()).filter(Boolean);
    }
    return [];
  });
  const popularTags = Array.from(new Set(rawTags)).filter((t) => t.length > 2 && t.length < 35).slice(0, 10);

  return (
    <div className="min-h-screen bg-white text-[#1e2422] font-figtree">
      <BlogListClient
        initialBlogs={blogs as any || []}
        categories={categories as any || []}
        popularBlogs={popularBlogs as any || []}
        popularTags={popularTags}
      />
    </div>
  );
}
