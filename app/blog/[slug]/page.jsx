import { redirect } from "next/navigation";

export async function generateStaticParams() {
  try {
    const { getBlogs } = await import("@/blogsection/lib/db");
    const blogs = await getBlogs();
    return blogs.map((b) => ({
      slug: String(b.slug),
    }));
  } catch (e) {
    return [];
  }
}

export default async function BlogSlugRedirect({ params }) {
  const { slug } = await params;
  redirect(`/blogs/${slug}`);
}
