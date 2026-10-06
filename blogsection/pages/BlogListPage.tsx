import { Metadata } from "next";
import { supabase } from "../lib/supabase";
import { publishDueBlogs } from "../lib/schedule";
import BlogListClient from "../components/public/BlogListClient";
import type { Author } from "../lib/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Yoga Journal: Poses, Pranayama & Teacher Training | Sanskriti Yogpeeth Rishikesh",
  description:
    "Pose guides, pranayama breathwork, sound healing and Yoga Teacher Training advice from certified teachers at Sanskriti Yogpeeth in Rishikesh, India.",
  keywords: [
    "Best Yoga School in Rishikesh",
    "Yoga Teacher Training Rishikesh",
    "200 Hour Yoga TTC",
    "Ayurveda Course India",
    "Sound Healing Rishikesh",
    "Sanskriti Yogpeeth Blog",
  ],
  alternates: {
    canonical: "https://sanskritiyogpeeth.org/blog",
  },
  openGraph: {
    title: "Yoga Journal | Sanskriti Yogpeeth Rishikesh",
    description:
      "Pose guides, pranayama breathwork, sound healing and Yoga Teacher Training advice from certified teachers in Rishikesh.",
    url: "https://sanskritiyogpeeth.org/blog",
    siteName: "Sanskriti Yogpeeth Rishikesh",
    images: [
      {
        url: "https://sanskritiyogpeeth.org/blogs/wp-content/uploads/2024/12/1-1-scaled-e1778044999715.jpg",
        width: 1200,
        height: 630,
        alt: "Sanskriti Yogpeeth Yoga Journal",
      },
    ],
  },
};

export default async function BlogPage() {
  // Publish any post whose scheduled time has passed, so the queries below —
  // which filter on status = 'published' — include it.
  await publishDueBlogs();

  // 1. Fetch all published blogs from Supabase
  const { data: rawBlogs } = await supabase
    .from("blogs")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  // 2. Fetch authors to join photo/credentials
  const { data: usersData } = await supabase
    .from("users")
    .select("id, name, username, photo, title, yoga_alliance");

  const userMap: Record<string, Pick<Author, "photo" | "title" | "yoga_alliance">> = {};
  usersData?.forEach((u) => {
    if (u.name) userMap[u.name] = u;
    if (u.username) userMap[u.username] = u;
  });

  const blogs = (rawBlogs || []).map((b) => {
    const authorObj = userMap[b.author] || {};
    return {
      ...b,
      author_photo: authorObj.photo || null,
      author_title: authorObj.title || null,
      author_credentials: authorObj.yoga_alliance || null,
    };
  });

  // 3. Fetch categories with post count
  const { data: categoriesData } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  const categoryCountMap: Record<string, number> = {};
  rawBlogs?.forEach((b) => {
    if (b.category_id) categoryCountMap[String(b.category_id)] = (categoryCountMap[String(b.category_id)] || 0) + 1;
    if (b.category_name) categoryCountMap[b.category_name] = (categoryCountMap[b.category_name] || 0) + 1;
  });

  const categories = (categoriesData || [])
    .map((c) => ({
      ...c,
      post_count: categoryCountMap[String(c.id)] || categoryCountMap[c.name] || 0,
    }))
    .sort((a, b) => b.post_count - a.post_count);

  // 4. Fetch the 5 most viewed published blogs automatically for the popular blog section
  const { data: popularBlogs } = await supabase
    .from("blogs")
    .select(
      "id, title, slug, featured_image, short_description, category_name, author, published_at, views, popular"
    )
    .eq("status", "published")
    .order("views", { ascending: false, nullsFirst: false })
    .order("published_at", { ascending: false })
    .limit(5);

  // 5. Extract distinct tags
  const rawTags = (blogs || []).flatMap((b) => {
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
    <div className="min-h-screen bg-white text-[#2A1621]">
      <BlogListClient
        initialBlogs={blogs || []}
        categories={categories || []}
        popularBlogs={popularBlogs || []}
        popularTags={popularTags}
      />
    </div>
  );
}
