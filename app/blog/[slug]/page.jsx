import BlogDetailPage, { generateMetadata } from "@/blog_core/pages/BlogPostPage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";

export { generateMetadata };

export async function generateStaticParams() {
  try {
    const db = await import("@/blog_core/lib/db");
    const fn = db.getblog;
    if (typeof fn === "function") {
      const posts = await fn();
      if (Array.isArray(posts) && posts.length > 0) {
        return posts.map((b) => ({
          slug: String(b.slug),
        }));
      }
    }
  } catch (e) {
    console.warn("Could not fetch blog posts for generateStaticParams:", e);
  }
  return [{ slug: "benefits-of-daily-yoga" }];
}

export default async function BlogDetailPageWrapper(props) {
  return (
    <div className="flex flex-col min-h-screen relative selection:bg-[#1c3b2b]/30 selection:text-[#142b1e]">
      <Navbar />
      <main className="flex-grow min-h-screen bg-white">
        <BlogDetailPage {...props} />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}

