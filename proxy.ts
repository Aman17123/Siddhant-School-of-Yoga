import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COOKIE_NAME, verifyToken } from "@/blogsection/lib/token";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Part C: View count tracking for blog single articles (/blogs/:slug)
  if (pathname.startsWith("/blogs/")) {
    const slug = pathname.replace(/^\/blogs\/?/, "").split("/")[0]?.trim();
    if (slug) {
      const rawCookie = request.cookies.get("blog_views")?.value || "";
      const viewedSlugs = rawCookie ? rawCookie.split("|").filter(Boolean) : [];

      if (!viewedSlugs.includes(slug)) {
        // Forward x-blog-view: 1 header to Server Component
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set("x-blog-view", "1");

        const response = NextResponse.next({
          request: {
            headers: requestHeaders,
          },
        });

        // Append slug to session cookie capped at 50 entries (no maxAge/expires -> browser close deletes)
        const updatedSlugs = [...viewedSlugs, slug].slice(-50);
        response.cookies.set({
          name: "blog_views",
          value: updatedSlugs.join("|"),
          httpOnly: true,
          sameSite: "lax",
          path: "/",
        });

        return response;
      }
    }
    return NextResponse.next();
  }

  // Part A: Strictly admin-only protection for Dashboard and Blog APIs
  const isDashboardRoute = pathname.startsWith("/blog/blogdashboard");
  const isApiRoute = pathname.startsWith("/api/blog") || pathname === "/api/auth/me";

  if (isDashboardRoute || isApiRoute) {
    // Allow login page without authentication
    if (pathname === "/blog/blogdashboard/login" || pathname.startsWith("/blog/blogdashboard/login/")) {
      return NextResponse.next();
    }

    const token = request.cookies.get(COOKIE_NAME)?.value;
    const session = token ? verifyToken(token) : null;

    if (!session || session.role !== "admin") {
      if (isApiRoute) {
        return NextResponse.json(
          {
            success: false,
            authenticated: false,
            message: "Unauthorized. Admin session required.",
          },
          { status: 401 }
        );
      }

      const loginUrl = new URL("/blog/blogdashboard/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export default proxy;

export const config = {
  matcher: [
    "/blog/blogdashboard/:path*",
    "/api/blog/:path*",
    "/api/auth/me",
    "/blogs/:slug",
  ],
};
