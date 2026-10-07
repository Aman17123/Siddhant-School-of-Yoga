import { NextRequest, NextResponse } from "next/server";
import { getErrorMessage } from "../lib/errors";
import { getAdminSession } from "../lib/auth";
import fs from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized. Please log in." }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ success: false, message: "No image file provided." }, { status: 400 });
    }

    const allowedMime = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
    if (!allowedMime.includes(file.type)) {
      return NextResponse.json({ success: false, message: "Only image files (JPG, PNG, WebP, GIF, SVG) are allowed." }, { status: 400 });
    }

    // Limit size to 10MB
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ success: false, message: "Image size must be less than 10MB." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const originalName = file.name || "image.webp";
    const ext = (path.extname(originalName) || ".webp").toLowerCase();
    const cleanBase = path
      .basename(originalName, ext)
      .toLowerCase()
      .replace(/^siddhant-blog-\d+-/i, "")
      .replace(/^siddhant-blog-/i, "")
      .replace(/[^a-z0-9_-]+/g, "-")
      .replace(/^-+|-+$/g, "") || "image";

    const uploadDir = path.join(process.cwd(), "blogsection", "images");
    const publicBlogImagesDir = path.join(process.cwd(), "public", "blog", "images");
    const publicImagesDir = path.join(process.cwd(), "public", "images");

    await fs.mkdir(uploadDir, { recursive: true });
    await fs.mkdir(publicBlogImagesDir, { recursive: true });
    await fs.mkdir(publicImagesDir, { recursive: true });

    let cleanName = `${cleanBase}${ext}`;
    let counter = 1;
    let filePath = path.join(uploadDir, cleanName);

    while (true) {
      try {
        await fs.access(filePath);
        cleanName = `${cleanBase}-${counter}${ext}`;
        filePath = path.join(uploadDir, cleanName);
        counter++;
      } catch {
        break;
      }
    }

    // Save to local storage inside blogsection/images folder
    await fs.writeFile(filePath, buffer);

    // Save to public/blog/images for direct static serving
    try {
      await fs.writeFile(path.join(publicBlogImagesDir, cleanName), buffer);
    } catch {}

    // Save to public/images for fallback compatibility
    try {
      await fs.writeFile(path.join(publicImagesDir, cleanName), buffer);
    } catch {}

    const cleanUrl = `/blog/images/${cleanName}`;

    return NextResponse.json({
      success: true,
      message: "Image uploaded successfully!",
      url: cleanUrl,
      fileName: cleanName,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ success: false, message: getErrorMessage(error, "Image upload failed.") }, { status: 500 });
  }
}
