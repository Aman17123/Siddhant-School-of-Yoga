import { NextRequest, NextResponse } from "next/server";
import { getErrorMessage, isDuplicateKeyError } from "../lib/errors";
import { getAdminSession } from "../lib/auth";
import { resolvePublishState } from "../lib/datetime";
import { getblog, createBlog } from "../lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.trim();
    const category = searchParams.get("category")?.trim();
    const status = searchParams.get("status")?.trim();

    const blog = await getblog({
      search,
      category,
      status,
    });

    return NextResponse.json({ success: true, blog: blog || [] });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { success: false, message: getErrorMessage(error, "Failed to fetch blog") },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ success: false, message: "Unauthorized. Only admin can add blog." }, { status: 401 });
    }

    const body = await req.json();
    const {
      title,
      slug,
      category_id,
      category_name,
      featured_image,
      featured_image_alt,
      featured_image_title,
      short_description,
      content,
      faqs,
      meta_title,
      meta_description,
      meta_keywords,
      popular,
      author,
      published_at,
      status,
      views,
      tags,
      focus_keyword,
      tldr,
      key_takeaways,
      canonical_url,
      conclusion,
      schema_type,
    } = body;

    if (!title || !title.trim()) {
      return NextResponse.json({ success: false, message: "Blog title is required." }, { status: 400 });
    }

    const cleanSlug = (slug || title)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const formattedFaqs = Array.isArray(faqs) ? faqs : (faqs ? JSON.parse(faqs) : []);
    const formattedTags = Array.isArray(tags) ? tags : (tags ? JSON.parse(tags) : []);

    const publishState = resolvePublishState({
      requestedStatus: status,
      publishedAt: published_at,
    });

    const finalAuthor = author?.trim() || session.name || "Siddhant School of Yoga";

    const row = {
      title: title.trim(),
      slug: cleanSlug,
      category_id: category_id ? Number(category_id) : null,
      category_name: category_name || "General",
      featured_image: featured_image || null,
      featured_image_alt: featured_image_alt || title.trim(),
      featured_image_title: featured_image_title || title.trim(),
      short_description: short_description || null,
      content: content || "",
      faqs: formattedFaqs,
      meta_title: meta_title || null,
      meta_description: meta_description || null,
      meta_keywords: meta_keywords || null,
      popular: Boolean(popular),
      author: finalAuthor,
      published_at: publishState.published_at.replace("Z", "").replace("T", " ").split(".")[0],
      status: publishState.status,
      views: Number(views) || 0,
      tags: formattedTags,
      focus_keyword: focus_keyword || null,
      tldr: tldr || null,
      key_takeaways: key_takeaways || null,
      canonical_url: canonical_url || null,
      conclusion: conclusion || null,
      schema_type: schema_type || "post",
    };

    const result = await createBlog(row);

    return NextResponse.json({
      success: true,
      message:
        publishState.status === "scheduled"
          ? "Blog post scheduled successfully!"
          : publishState.status === "draft"
            ? "Blog draft saved successfully!"
            : "Blog post published successfully!",
      id: result.id,
      slug: cleanSlug,
      status: publishState.status,
      published_at: publishState.published_at.replace("Z", "").replace("T", " ").split(".")[0],
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    if (isDuplicateKeyError(error)) {
      return NextResponse.json(
        { success: false, message: "A blog with this URL Slug already exists. Please choose a unique slug." },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: getErrorMessage(error, "Failed to create blog post") },
      { status: 500 }
    );
  }
}
