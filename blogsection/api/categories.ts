import { NextRequest, NextResponse } from "next/server";
import { getErrorMessage, isDuplicateKeyError } from "../lib/errors";
import { getAdminSession } from "../lib/auth";
import { getCategories, createCategory } from "../lib/db";

export async function GET() {
  try {
    const categoryList = await getCategories();
    return NextResponse.json({ success: true, categories: categoryList });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { success: false, message: getErrorMessage(error, "Failed to fetch categories") },
      { status: 500 }
    );
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

    const newCat = await createCategory({
      name: name.trim(),
      slug: cleanSlug,
      description: description?.trim() || null,
      color: color || "#bf296a",
      parent_id: parent_id ? Number(parent_id) : null,
      meta_title: meta_title || null,
      meta_description: meta_description || null,
    });

    return NextResponse.json({
      success: true,
      message: "Category added successfully!",
      id: newCat.id,
      category: newCat,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    if (isDuplicateKeyError(error)) {
      return NextResponse.json(
        { success: false, message: "A category with this slug already exists." },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: getErrorMessage(error, "Failed to create category") },
      { status: 500 }
    );
  }
}
