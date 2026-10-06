import { NextRequest, NextResponse } from "next/server";
import { getErrorCode, getErrorMessage } from "../lib/errors";
import { supabase } from "../lib/supabase";
import { getAdminSession } from "../lib/auth";

export async function GET() {
  try {
    const { data: categories, error } = await supabase
      .from("categories")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      throw error;
    }

    // Calculate blog count per category
    const { data: blogs } = await supabase.from("blogs").select("category_id, category_name");
    const counts: Record<string, number> = {};
    blogs?.forEach((b) => {
      if (b.category_id) counts[String(b.category_id)] = (counts[String(b.category_id)] || 0) + 1;
      if (b.category_name) counts[b.category_name] = (counts[b.category_name] || 0) + 1;
    });

    const categoryList = (categories || []).map((c) => ({
      ...c,
      blog_count: counts[String(c.id)] || counts[c.name] || 0,
    }));

    return NextResponse.json({ success: true, categories: categoryList });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ success: false, message: getErrorMessage(error, "Failed to fetch categories") }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized. Please log in." }, { status: 401 });
    }

    if (session.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Forbidden: Only Admin can add categories." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { name, slug, description, color, parent_id, meta_title, meta_description } = body;

    if (!name || !name.trim()) {
      return NextResponse.json({ success: false, message: "Category name is required." }, { status: 400 });
    }

    const cleanSlug = (slug || name)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const { data, error } = await supabase
      .from("categories")
      .insert({
        name: name.trim(),
        slug: cleanSlug,
        description: description?.trim() || null,
        color: color || "#BF296A",
        parent_id: parent_id ? Number(parent_id) : null,
        meta_title: meta_title || null,
        meta_description: meta_description || null,
      })
      .select()
      .single();

    if (error) {
      if (getErrorCode(error) === "23505") {
        return NextResponse.json({ success: false, message: "A category with this slug already exists." }, { status: 400 });
      }
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: "Category added successfully!",
      id: data.id,
      category: data,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json({ success: false, message: getErrorMessage(error, "Failed to create category") }, { status: 500 });
  }
}
