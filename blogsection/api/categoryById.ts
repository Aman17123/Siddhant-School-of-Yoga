import { NextRequest, NextResponse } from "next/server";
import { getErrorMessage } from "../lib/errors";
import { supabase } from "../lib/supabase";
import { getAdminSession } from "../lib/auth";

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

    const { error } = await supabase
      .from("categories")
      .update({
        name: name.trim(),
        slug: cleanSlug,
        description: description?.trim() || null,
        color: color || "#BF296A",
        parent_id: parent_id ? Number(parent_id) : null,
        meta_title: meta_title || null,
        meta_description: meta_description || null,
      })
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({ success: true, message: "Category updated successfully!" });
  } catch (error) {
    console.error("Error updating category:", error);
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

    // Unlink category on blogs before delete
    await supabase.from("blogs").update({ category_id: null }).eq("category_id", id);

    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) throw error;

    return NextResponse.json({ success: true, message: "Category deleted successfully!" });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json({ success: false, message: getErrorMessage(error, "Failed to delete category") }, { status: 500 });
  }
}
