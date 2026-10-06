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
    const ext = path.extname(originalName) || ".webp";
    const baseName = path
      .basename(originalName, ext)
      .toLowerCase()
      .replace(/[^a-z0-9_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const uniqueName = `siddhant-blog-${Date.now()}-${baseName.slice(0, 40)}${ext}`;

    // 1. Save to local storage inside blogsection/images folder
    const uploadDir = path.join(process.cwd(), "blogsection", "images");
    await fs.mkdir(uploadDir, { recursive: true });
    const filePath = path.join(uploadDir, uniqueName);
    await fs.writeFile(filePath, buffer);

    // 2. Also save to public/images for fast direct static serving
    try {
      const publicImagesDir = path.join(process.cwd(), "public", "images");
      await fs.mkdir(publicImagesDir, { recursive: true });
      await fs.writeFile(path.join(publicImagesDir, uniqueName), buffer);
    } catch {}

    const cleanUrl = `/images/${uniqueName}`;

    return NextResponse.json({
      success: true,
      message: "Image uploaded successfully!",
      url: cleanUrl,
      fileName: uniqueName,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ success: false, message: getErrorMessage(error, "Image upload failed.") }, { status: 500 });
  }
}
