import BlogDashboardPage from "@/blog_core/pages/DashboardPage";
import BlogDashboardLayout, { metadata } from "@/blog_core/pages/DashboardLayout";

export { metadata };

export default function DashboardRoute() {
  return (
    <BlogDashboardLayout>
      <BlogDashboardPage />
    </BlogDashboardLayout>
  );
}
