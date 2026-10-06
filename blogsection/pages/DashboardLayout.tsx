import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Admin Dashboard | Sanskriti Yogpeeth",
  description: "Manage blog posts, categories, and articles for Sanskriti Yogpeeth, Rishikesh.",
  robots: "noindex, nofollow",
};

export default function BlogDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
