import { NextRequest, NextResponse } from "next/server";
import { getErrorMessage, isDuplicateKeyError } from "../lib/errors";
import { getAdminSession } from "../lib/auth";
import { updateCategory, deleteCategory } from "../lib/db";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized. Please log in." }, { status: 401 });
    }
    if (session.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Forbidden: Only Admin can edit categories." },
        { status: 403 }
      );
    }

    const { id } = await params;
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

    await updateCategory(id, {
      name: name.trim(),
      slug: cleanSlug,
      description: description?.trim() || null,
      color: color || "#bf296a",
      parent_id: parent_id ? Number(parent_id) : null,
      meta_title: meta_title || null,
      meta_description: meta_description || null,
    });

    return NextResponse.json({ success: true, message: "Category updated successfully!" });
  } catch (error) {
    console.error("Error updating category:", error);
    if (isDuplicateKeyError(error)) {
      return NextResponse.json({ success: false, message: "A category with this slug already exists." }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: getErrorMessage(error, "Failed to update category") }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized. Please log in." }, { status: 401 });
    }
    if (session.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Forbidden: Only Admin can delete categories." },
        { status: 403 }
      );
    }

    const { id } = await params;
    await deleteCategory(id);

    return NextResponse.json({ success: true, message: "Category deleted successfully!" });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json({ success: false, message: getErrorMessage(error, "Failed to delete category") }, { status: 500 });
  }
}
