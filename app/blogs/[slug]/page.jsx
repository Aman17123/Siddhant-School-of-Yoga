import BlogDetailPage, { generateMetadata } from "@/blogsection/pages/BlogPostPage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";

export { generateMetadata };

export async function generateStaticParams() {
  try {
    const { getBlogs } = await import("@/blogsection/lib/db");
    const blogs = await getBlogs();
    return blogs.map((b) => ({
      slug: String(b.slug),
    }));
  } catch (e) {
    console.warn("Could not fetch blogs for generateStaticParams:", e);
    return [];
  }
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
