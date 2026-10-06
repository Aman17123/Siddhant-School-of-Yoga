import { NextRequest, NextResponse } from "next/server";
import { getErrorCode, getErrorMessage } from "../lib/errors";
import { supabase } from "../lib/supabase";
import { getAdminSession } from "../lib/auth";
import {
  hasConclusionColumn,
  noteConclusionError,
  noteConclusionOk,
} from "../lib/blogColumns";
import { publishDueBlogs } from "../lib/schedule";
import { resolvePublishState } from "../lib/datetime";

const POST_FIELDS =
  "id, title, slug, category_id, category_name, featured_image, featured_image_alt, featured_image_title, short_description, content, faqs, meta_title, meta_description, meta_keywords, popular, author, published_at, status, views, seo_score, tags, focus_keyword, related_keywords, tldr, key_takeaways, canonical_url, conclusion, schema_type, created_at, updated_at";

const POST_FIELDS_LEGACY = POST_FIELDS.replace(", conclusion", "");

function withoutConclusion(row: Record<string, unknown>) {
  const { conclusion: _dropped, ...rest } = row;
  return rest;
}

export async function GET(req: NextRequest) {
  try {
    // Promote due scheduled posts first, otherwise the dashboard shows posts
    // as "Scheduled" with a date that has already passed.
    await publishDueBlogs();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.trim();
    const category = searchParams.get("category")?.trim();
    const status = searchParams.get("status")?.trim();

    const run = async (fields: string) => {
      let query = supabase.from("blogs").select(fields);

      if (search) {
        query = query.or(`title.ilike.%${search}%,short_description.ilike.%${search}%,author.ilike.%${search}%,focus_keyword.ilike.%${search}%`);
      }

      if (category && category !== "all") {
        if (!isNaN(Number(category))) {
          query = query.or(`category_id.eq.${category},category_name.eq.${category}`);
        } else {
          query = query.eq("category_name", category);
        }
      }

      if (status && status !== "all") {
        query = query.eq("status", status);
      }

      return await query.order("id", { ascending: false });
    };

    let { data: blogs, error } = await run(
      hasConclusionColumn() ? POST_FIELDS : POST_FIELDS_LEGACY,
    );

    // Column not present yet on this database — retry without it.
    if (error && hasConclusionColumn() && noteConclusionError(error)) {
      ({ data: blogs, error } = await run(POST_FIELDS_LEGACY));
    }
    if (error) throw error;
    if (!error) noteConclusionOk();

    return NextResponse.json({ success: true, blogs: blogs || [] });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ success: false, message: getErrorMessage(error, "Failed to fetch blogs") }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized. Please log in." }, { status: 401 });
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

    // Draft / scheduled / published is decided here, against the server clock,
    // so a client in the wrong timezone cannot publish a post early.
    const publishState = resolvePublishState({
      requestedStatus: status,
      publishedAt: published_at,
    });

    const finalAuthor =
      session.role === "author"
        ? (session.name || session.username)
        : (author?.trim() || session.name || "Sanskriti Yogpeeth");

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
    };

    // Retry without `conclusion` when the database has not been migrated yet.
    const insertRow = hasConclusionColumn() ? row : withoutConclusion(row);

    let { data, error } = await supabase
      .from("blogs")
      .insert(insertRow)
      .select()
      .single();

    if (error && hasConclusionColumn() && noteConclusionError(error)) {
      ({ data, error } = await supabase
        .from("blogs")
        .insert(withoutConclusion(row))
        .select()
        .single());
    }

    if (error) {
      if (getErrorCode(error) === "23505") {
        return NextResponse.json({ success: false, message: "A blog with this URL Slug already exists. Please choose a unique slug." }, { status: 400 });
      }
      throw error;
    }

    return NextResponse.json({
      success: true,
      message:
        publishState.status === "scheduled"
          ? "Blog post scheduled successfully!"
          : publishState.status === "draft"
            ? "Blog draft saved successfully!"
            : "Blog post published successfully!",
      id: data.id,
      slug: cleanSlug,
      status: publishState.status,
      published_at: publishState.published_at,
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json({ success: false, message: getErrorMessage(error, "Failed to create blog post") }, { status: 500 });
  }
}
