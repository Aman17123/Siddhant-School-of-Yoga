import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COOKIE_NAME, verifyToken } from "@/blog_core/lib/token";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Part C: View count tracking for blog single articles (/blog/:slug)
  if (
    pathname.startsWith("/blog/") &&
    !pathname.startsWith("/blog/dashboard") &&
    !pathname.startsWith("/blog/blogdashboard") &&
    !pathname.startsWith("/blog/images")
  ) {
    const slug = pathname.replace(/^\/blog\/?/, "").split("/")[0]?.trim();
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
  const isDashboardRoute =
    pathname.startsWith("/blog/dashboard") ||
    pathname.startsWith("/blog/blogdashboard");
  const isApiRoute = pathname.startsWith("/api/blog") || pathname === "/api/auth/me";

  if (isDashboardRoute || isApiRoute) {
    // Allow login page without authentication
    const isLoginPage =
      pathname === "/blog/dashboard/login" ||
      pathname.startsWith("/blog/dashboard/login/") ||
      pathname === "/blog/blogdashboard/login" ||
      pathname.startsWith("/blog/blogdashboard/login/");

    if (isLoginPage) {
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

      const loginUrl = new URL("/blog/dashboard/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export default proxy;

export const config = {
  matcher: [
    "/blog/dashboard/:path*",
    "/blog/blogdashboard/:path*",
    "/api/blog/:path*",
    "/api/auth/me",
    "/blog/:slug",
  ],
};
