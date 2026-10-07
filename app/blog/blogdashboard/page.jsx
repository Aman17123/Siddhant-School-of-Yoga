import BlogDashboardPage from "@/blogsection/pages/DashboardPage";
import BlogDashboardLayout, { metadata } from "@/blogsection/pages/DashboardLayout";

export { metadata };

export default function DashboardRoute() {
  return (
    <BlogDashboardLayout>
      <BlogDashboardPage />
    </BlogDashboardLayout>
  );
}
