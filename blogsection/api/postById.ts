import { NextRequest, NextResponse } from "next/server";
import { getErrorMessage, isDuplicateKeyError } from "../lib/errors";
import { getAdminSession } from "../lib/auth";
import { resolvePublishState } from "../lib/datetime";
import { getBlogByIdOrSlug, updateBlog, deleteBlog } from "../lib/db";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const blog = await getBlogByIdOrSlug(id);

    if (!blog) {
      return NextResponse.json({ success: false, message: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, blog });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json({ success: false, message: getErrorMessage(error, "Failed to fetch blog") }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getAdminSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ success: false, message: "Unauthorized. Only admin can edit blogs." }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    const existingBlog = await getBlogByIdOrSlug(id);
    if (!existingBlog) {
      return NextResponse.json({ success: false, message: "Blog post not found" }, { status: 404 });
    }

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
      seo_score,
      tags,
      focus_keyword,
      related_keywords,
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

    const finalAuthor = author?.trim() || (existingBlog.author as string) || session.name || "Siddhant School of Yoga";

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
      views: typeof views !== "undefined" ? Number(views) : Number(existingBlog.views) || 0,
      seo_score: Number(seo_score) || 75,
      tags: formattedTags,
      focus_keyword: focus_keyword || null,
      related_keywords: related_keywords || null,
      tldr: tldr || null,
      key_takeaways: key_takeaways || null,
      canonical_url: canonical_url || null,
      conclusion: conclusion || null,
      schema_type: schema_type || "post",
    };

    await updateBlog(id, row);

    return NextResponse.json({
      success: true,
      message: "Blog post updated successfully!",
      slug: cleanSlug,
      status: publishState.status,
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    if (isDuplicateKeyError(error)) {
      return NextResponse.json(
        { success: false, message: "A blog with this URL Slug already exists. Please choose a unique slug." },
        { status: 400 }
      );
    }
    return NextResponse.json({ success: false, message: getErrorMessage(error, "Failed to update blog post") }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getAdminSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ success: false, message: "Unauthorized. Only admin can update blogs." }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    const wantsStatus = typeof body?.status !== "undefined";
    const wantsPopular = typeof body?.popular !== "undefined";

    if (!wantsStatus && !wantsPopular) {
      return NextResponse.json({ success: false, message: "No updatable fields provided." }, { status: 400 });
    }

    const existingBlog = await getBlogByIdOrSlug(id);
    if (!existingBlog) {
      return NextResponse.json({ success: false, message: "Blog post not found" }, { status: 404 });
    }

    const updates: Record<string, unknown> = {};
    if (wantsPopular) {
      updates.popular = Boolean(body.popular);
    }

    let newStatus: string | undefined;
    if (wantsStatus) {
      const publishState = resolvePublishState({
        requestedStatus: body.status === "draft" ? "draft" : "published",
        publishedAt: body.published_at ?? existingBlog.published_at,
      });
      updates.status = publishState.status;
      updates.published_at = publishState.published_at.replace("Z", "").replace("T", " ").split(".")[0];
      newStatus = publishState.status;
    }

    await updateBlog(id, updates);

    return NextResponse.json({
      success: true,
      message:
        newStatus === "scheduled"
          ? "Blog is scheduled and will publish automatically."
          : newStatus === "draft"
            ? "Blog moved to draft."
            : "Blog updated successfully!",
      status: newStatus,
    });
  } catch (error) {
    console.error("Error patching blog:", error);
    return NextResponse.json({ success: false, message: getErrorMessage(error, "Failed to update blog") }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getAdminSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ success: false, message: "Unauthorized. Only admin can delete blogs." }, { status: 401 });
    }

    const { id } = await params;
    const existingBlog = await getBlogByIdOrSlug(id);
    if (!existingBlog) {
      return NextResponse.json({ success: false, message: "Blog post not found" }, { status: 404 });
    }

    await deleteBlog(id);
    return NextResponse.json({ success: true, message: "Blog post deleted successfully!" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ success: false, message: getErrorMessage(error, "Failed to delete blog") }, { status: 500 });
  }
}
