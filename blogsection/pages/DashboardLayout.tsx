import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Admin Dashboard | Siddhant School of Yoga",
  description: "Manage blog posts, categories, and articles for Siddhant School of Yoga, Rishikesh.",
  robots: "noindex, nofollow",
};

export default function BlogDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
