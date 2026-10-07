import BlogListPage, { metadata } from "@/blog_core/pages/BlogListPage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";

export { metadata };

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen relative selection:bg-[#1c3b2b]/30 selection:text-[#142b1e]">
      <Navbar />
      <main className="flex-grow min-h-screen bg-white">
        <BlogListPage />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
