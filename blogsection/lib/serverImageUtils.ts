import { NextResponse } from "next/server";
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
 * Serves an image file from local blogsection/images or public/images.
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
  } catch {}

  // 2. Check public/images directory
  try {
    const publicPath = path.join(process.cwd(), "public", "images", cleanName);
    const stat = await fs.stat(publicPath);
    if (stat.isFile()) {
      const fileBuffer = await fs.readFile(publicPath);
      return new NextResponse(fileBuffer, {
        status: 200,
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=31536000, immutable",
          "X-Content-Type-Options": "nosniff",
        },
      });
    }
  } catch {}

  // 3. Fallback for legacy filenames that might be requested
  if (cleanName.includes("retreat-banner") || cleanName.includes("sanskriti")) {
    try {
      const fallbackPath = path.join(process.cwd(), "public", "images", "yoga-and-meditation-retreat-riverside.jpg");
      const fileBuffer = await fs.readFile(fallbackPath);
      return new NextResponse(fileBuffer, {
        status: 200,
        headers: {
          "Content-Type": "image/jpeg",
          "Cache-Control": "public, max-age=86400",
          "X-Content-Type-Options": "nosniff",
        },
      });
    } catch {}
  }

  return new NextResponse("Image not found", { status: 404 });
}
