import { NextResponse } from "next/server";
import { getSupabaseUrl } from "./env";
import fs from "fs/promises";
import path from "path";

const MIME_MAP: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
};

/**
 * Serves an image file:
 * 1. Checks local blogsection/images folder first.
 * 2. If not found locally, falls back to Supabase blog-images bucket.
 */
export async function proxyBlogImage(filename: string) {
  // Sanitize filename to prevent directory traversal
  const cleanName = filename.replace(/[^a-zA-Z0-9._-]/g, "");
  if (!cleanName) {
    return new NextResponse("Invalid image filename", { status: 400 });
  }

  const ext = path.extname(cleanName).toLowerCase();
  const contentType = MIME_MAP[ext] || "image/jpeg";

  // 1. Check local blogsection/images directory
  try {
    const localPath = path.join(process.cwd(), "blogsection", "images", cleanName);
    const stat = await fs.stat(localPath);
    if (stat.isFile()) {
      const fileBuffer = await fs.readFile(localPath);
      return new NextResponse(fileBuffer, {
        status: 200,
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=31536000, immutable",
          "X-Content-Type-Options": "nosniff",
        },
      });
    }
  } catch {
    // Local file does not exist, try cloud storage
  }

  // 2. Fallback to Supabase Storage
  let targetUrl: string;
  try {
    targetUrl = `${getSupabaseUrl()}/storage/v1/object/public/blog-images/${cleanName}`;
  } catch {
    return new NextResponse("Image not found", { status: 404 });
  }

  try {
    const res = await fetch(targetUrl, {
      next: { revalidate: 86400 * 30 }, // 30 days cache
    });

    if (!res.ok) {
      return new NextResponse("Image not found", { status: 404 });
    }

    const fetchedType = res.headers.get("content-type") || contentType;
    const arrayBuffer = await res.arrayBuffer();

    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": fetchedType,
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Error proxying blog image:", error);
    return new NextResponse("Image not found", { status: 404 });
  }
}
