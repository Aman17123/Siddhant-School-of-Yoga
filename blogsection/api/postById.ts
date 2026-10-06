import { NextRequest, NextResponse } from "next/server";
import { getErrorCode, getErrorMessage } from "../lib/errors";
import { supabase } from "../lib/supabase";
import { hasConclusionColumn, noteConclusionError } from "../lib/blogColumns";

function withoutConclusion(row: Record<string, unknown>) {
  const { conclusion: _dropped, ...rest } = row;
  return rest;
}
import { getAdminSession } from "../lib/auth";
import { resolvePublishState } from "../lib/datetime";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const isNumeric = /^\d+$/.test(id);

    let query = supabase.from("blogs").select("*");
    if (isNumeric) {
      query = query.eq("id", id);
    } else {
      query = query.eq("slug", id);
    }

    const { data: blog, error } = await query.single();

    if (error || !blog) {
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
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized. Please log in." }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    // Check existing post for permission check
    const { data: existingBlog, error: fetchErr } = await supabase
      .from("blogs")
      .select("id, author")
      .eq("id", id)
      .single();

    if (fetchErr || !existingBlog) {
      return NextResponse.json({ success: false, message: "Blog post not found" }, { status: 404 });
    }

    // Role-based editing rules:
    // 1. Author can ONLY edit their own posts
    // 2. Editor can edit anyone's posts
    // 3. Admin can edit anyone's posts
    if (session.role === "author") {
      const isOwner =
        existingBlog.author === session.username ||
        existingBlog.author === session.name ||
        (session.name && existingBlog.author?.toLowerCase() === session.name.toLowerCase());

      if (!isOwner) {
        return NextResponse.json(
          { success: false, message: "Forbidden: Authors can only edit their own blog posts." },
          { status: 403 }
        );
      }
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

    // A click on "Update" must not silently un-schedule a future post, and a
    // date that has already passed must go live — both decided server-side.
    const publishState = resolvePublishState({
      requestedStatus: status,
      publishedAt: published_at,
    });

    // If role is author, lock author name to prevent impersonation
    const finalAuthor =
      session.role === "author"
        ? existingBlog.author
        : author?.trim() || existingBlog.author || "Sanskriti Yogpeeth";

    const updateRow: Record<string, unknown> = {
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
      published_at: publishState.published_at,
      status: publishState.status,
      views: Number(views) || 0,
      seo_score: Number(seo_score) || 75,
      tags: formattedTags,
      focus_keyword: focus_keyword || null,
      related_keywords: related_keywords || null,
      tldr: tldr || null,
      key_takeaways: key_takeaways || null,
      canonical_url: canonical_url || null,
      conclusion: conclusion || null,
      schema_type: schema_type || "post",
      updated_at: new Date().toISOString(),
    };

    const runUpdate = async (row: Record<string, unknown>) =>
      await supabase.from("blogs").update(row).eq("id", id);

    let { error } = await runUpdate(
      hasConclusionColumn() ? updateRow : withoutConclusion(updateRow),
    );

    // Column not present yet on this database — retry without it.
    if (error && hasConclusionColumn() && noteConclusionError(error)) {
      ({ error } = await runUpdate(withoutConclusion(updateRow)));
    }

    if (error) {
      if (getErrorCode(error) === "23505") {
        return NextResponse.json({ success: false, message: "A blog with this URL Slug already exists. Please choose a unique slug." }, { status: 400 });
      }
      throw error;
    }

    return NextResponse.json({
      success: true,
      status: publishState.status,
      published_at: publishState.published_at,
      message:
        publishState.status === "scheduled"
          ? "Blog scheduled successfully!"
          : publishState.status === "draft"
            ? "Draft saved successfully!"
            : "Blog updated successfully!",
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json({ success: false, message: getErrorMessage(error, "Failed to update blog") }, { status: 500 });
  }
}

// Partial update. Unlike PUT (which fully replaces the row and wipes content,
// views and status when they are omitted) this only touches whitelisted fields,
// so small changes like "mark as most popular" and "move to draft" are safe to
// call from the dashboard without resending the whole post.
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized. Please log in." }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    const wantsStatus = typeof body?.status !== "undefined";
    const wantsPopular = typeof body?.popular !== "undefined";

    if (!wantsStatus && !wantsPopular) {
      return NextResponse.json(
        { success: false, message: "No updatable fields provided." },
        { status: 400 }
      );
    }

    const { data: existingBlog, error: fetchErr } = await supabase
      .from("blogs")
      .select("id, author, published_at")
      .eq("id", id)
      .single();

    if (fetchErr || !existingBlog) {
      return NextResponse.json({ success: false, message: "Blog post not found" }, { status: 404 });
    }

    // Authors may only change these fields on their own posts
    if (session.role === "author") {
      const isOwner =
        existingBlog.author === session.username ||
        existingBlog.author === session.name ||
        (session.name && existingBlog.author?.toLowerCase() === session.name.toLowerCase());

      if (!isOwner) {
        return NextResponse.json(
          { success: false, message: "Forbidden: Authors can only update their own blog posts." },
          { status: 403 }
        );
      }
    }

    const updates: Record<string, unknown> = {};
    if (wantsPopular) {
      updates.popular = Boolean(body.popular);
    }

    let newStatus: string | undefined;
    if (wantsStatus) {
      // Same derivation as PUT, so moving a scheduled post back to draft cannot
      // resurrect a future publish date, and publishing a draft respects the
      // date already on the row instead of blanking it.
      const publishState = resolvePublishState({
        requestedStatus: body.status === "draft" ? "draft" : "published",
        publishedAt: body.published_at ?? existingBlog.published_at,
      });
      updates.status = publishState.status;
      updates.published_at = publishState.published_at;
      newStatus = publishState.status;
    }

    const { error } = await supabase.from("blogs").update(updates).eq("id", id);

    if (error) {
      throw error;
    }

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
    console.error("Error updating blog:", error);
    return NextResponse.json({ success: false, message: getErrorMessage(error, "Failed to update blog") }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized. Please log in." }, { status: 401 });
    }

    const { id } = await params;

    const { data: existingBlog, error: fetchErr } = await supabase
      .from("blogs")
      .select("id, author")
      .eq("id", id)
      .single();

    if (fetchErr || !existingBlog) {
      return NextResponse.json({ success: false, message: "Blog post not found" }, { status: 404 });
    }

    // Role-based deletion rules:
    // 1. Author can ONLY delete their own posts
    // 2. Editor cannot delete other authors' posts (Admin only)
    if (session.role === "author") {
      const isOwner =
        existingBlog.author === session.username ||
        existingBlog.author === session.name ||
        (session.name && existingBlog.author?.toLowerCase() === session.name.toLowerCase());

      if (!isOwner) {
        return NextResponse.json(
          { success: false, message: "Forbidden: Authors can only delete their own blog posts." },
          { status: 403 }
        );
      }
    } else if (session.role === "editor") {
      const isOwner =
        existingBlog.author === session.username ||
        existingBlog.author === session.name;

      if (!isOwner) {
        return NextResponse.json(
          { success: false, message: "Forbidden: Editors cannot delete other teachers' posts. Only Admin can delete posts." },
          { status: 403 }
        );
      }
    }

    const { error } = await supabase.from("blogs").delete().eq("id", id);
    if (error) throw error;

    return NextResponse.json({ success: true, message: "Blog post deleted successfully!" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ success: false, message: getErrorMessage(error, "Failed to delete blog") }, { status: 500 });
  }
}
