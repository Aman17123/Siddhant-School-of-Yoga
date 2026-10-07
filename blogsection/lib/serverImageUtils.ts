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
 * Searches a directory for a file matching either the exact clean name
 * or a legacy name ending with the clean name.
 */
async function findImageFile(dir: string, targetName: string): Promise<string | null> {
  try {
    const exact = path.join(dir, targetName);
    const stat = await fs.stat(exact);
    if (stat.isFile()) return exact;
  } catch {}

  try {
    const files = await fs.readdir(dir);
    const targetLower = targetName.toLowerCase();
    const match = files.find((f) => {
      const lower = f.toLowerCase();
      if (lower === targetLower) return true;
      if (lower.endsWith(`-${targetLower}`)) return true;
      // Strip any "siddhant-blog-<timestamp>-" prefix
      const stripped = lower.replace(/^siddhant-blog-\d+-/i, "").replace(/^siddhant-blog-/i, "");
      return stripped === targetLower;
    });
    if (match) {
      return path.join(dir, match);
    }
  } catch {}

  return null;
}

/**
 * Serves an image file from public/blog/images, blogsection/images, or public/images.
 */
export async function proxyBlogImage(filename: string) {
  let decoded = filename;
  try {
    decoded = decodeURIComponent(filename);
  } catch {}

  // Sanitize filename to prevent directory traversal
  const cleanName = path.basename(decoded).replace(/[^a-zA-Z0-9._-]/g, "");
  if (!cleanName) {
    return new NextResponse("Invalid image filename", { status: 400 });
  }

  const ext = path.extname(cleanName).toLowerCase();
  const contentType = MIME_MAP[ext] || "image/jpeg";

  const searchDirs = [
    path.join(process.cwd(), "public", "blog", "images"),
    path.join(process.cwd(), "blogsection", "images"),
    path.join(process.cwd(), "public", "images"),
  ];

  for (const dir of searchDirs) {
    const foundPath = await findImageFile(dir, cleanName);
    if (foundPath) {
      try {
        const fileBuffer = await fs.readFile(foundPath);
        return new NextResponse(fileBuffer, {
          status: 200,
          headers: {
            "Content-Type": contentType,
            "Cache-Control": "public, max-age=31536000, immutable",
            "X-Content-Type-Options": "nosniff",
          },
        });
      } catch {}
    }
  }

  // Fallback for legacy filenames that might be requested
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
