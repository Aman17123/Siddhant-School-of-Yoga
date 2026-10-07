"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LegacyDashboardRoute() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/blog/dashboard");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdfbf7] font-sans text-stone-600">
      <p>Redirecting to blog dashboard...</p>
    </div>
  );
}
