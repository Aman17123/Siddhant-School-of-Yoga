import { NextRequest, NextResponse } from "next/server";
import { getErrorMessage } from "../lib/errors";
import { supabase } from "../lib/supabase";
import { getAdminSession } from "../lib/auth";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { data: author, error } = await supabase
      .from("users")
      .select("id, username, name, email, role, slug, photo, title, bio, experience_years, instagram, youtube, yoga_alliance, created_at")
      .eq("id", id)
      .single();

    if (error || !author) {
      return NextResponse.json({ success: false, message: "Author not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, author });
  } catch (error) {
    console.error("Error fetching author:", error);
    return NextResponse.json({ success: false, message: getErrorMessage(error, "Failed to fetch author") }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized. Please log in." }, { status: 401 });
    }

    if (session.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Forbidden: Only Admin can update authors or change passwords." },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = await req.json();
    const {
      name,
      username,
      email,
      role = "author",
      slug,
      photo,
      title,
      bio,
      experience_years = 0,
      instagram,
      youtube,
      yoga_alliance,
      password,
    } = body;

    if (!name || !name.trim()) {
      return NextResponse.json({ success: false, message: "Author full name is required." }, { status: 400 });
    }

    const cleanSlug = (slug || name)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const updatePayload: Record<string, string | number | null> = {
      name: name.trim(),
      email: email ? email.trim().toLowerCase() : null,
      role: role || "author",
      slug: cleanSlug,
      photo: photo || null,
      title: title?.trim() || null,
      bio: bio?.trim() || null,
      experience_years: Number(experience_years) || 0,
      instagram: instagram?.trim() || null,
      youtube: youtube?.trim() || null,
      yoga_alliance: yoga_alliance?.trim() || null,
      updated_at: new Date().toISOString(),
    };

    if (username && username.trim()) {
      updatePayload.username = username
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
    }

    // Only Admin can change password
    if (password && password.trim()) {
      updatePayload.password = password.trim();
    }

    const { error } = await supabase.from("users").update(updatePayload).eq("id", id);
    if (error) throw error;

    return NextResponse.json({ success: true, message: "Author details & credentials updated successfully!" });
  } catch (error) {
    console.error("Error updating author:", error);
    return NextResponse.json({ success: false, message: getErrorMessage(error, "Failed to update author") }, { status: 500 });
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
        { success: false, message: "Forbidden: Only Admin can delete authors." },
        { status: 403 }
      );
    }

    const { id } = await params;
    const { searchParams } = new URL(req.url);
    const moveToAuthor = searchParams.get("moveToAuthor");

    // Get author details to find their name
    const { data: author } = await supabase.from("users").select("name, username").eq("id", id).single();

    if (author) {
      const targetAuthor = moveToAuthor || "Sanskriti Yogpeeth";
      await supabase.from("blogs").update({ author: targetAuthor }).or(`author.eq.${author.name},author.eq.${author.username}`);
    }

    const { error } = await supabase.from("users").delete().eq("id", id);
    if (error) throw error;

    return NextResponse.json({ success: true, message: "Author deleted successfully!" });
  } catch (error) {
    console.error("Error deleting author:", error);
    return NextResponse.json({ success: false, message: getErrorMessage(error, "Failed to delete author") }, { status: 500 });
  }
}
