import BlogDashboardPage from "@/blogsection/pages/DashboardPage";
import BlogDashboardLayout, { metadata } from "@/blogsection/pages/DashboardLayout";

export const dynamic = "force-dynamic";
export { metadata };

export default function DashboardRoute() {
  return (
    <BlogDashboardLayout>
      <BlogDashboardPage />
    </BlogDashboardLayout>
  );
}
