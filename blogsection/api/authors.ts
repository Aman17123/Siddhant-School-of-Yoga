import { NextRequest, NextResponse } from "next/server";
import { getErrorCode, getErrorMessage } from "../lib/errors";
import { supabase } from "../lib/supabase";
import { getAdminSession } from "../lib/auth";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const role = searchParams.get("role");

    let query = supabase
      .from("users")
      .select("id, username, name, email, role, slug, photo, title, bio, experience_years, instagram, youtube, yoga_alliance, created_at");

    if (role && role !== "all") {
      query = query.eq("role", role);
    }

    query = query.order("id", { ascending: true });

    const { data: authors, error } = await query;
    if (error) throw error;

    // Get blog count per author
    const { data: blogs } = await supabase.from("blogs").select("author");
    const counts: Record<string, number> = {};
    blogs?.forEach((b) => {
      if (b.author) {
        counts[b.author] = (counts[b.author] || 0) + 1;
      }
    });

    const authorList = (authors || []).map((a) => ({
      ...a,
      blog_count: counts[a.name] || counts[a.username] || 0,
    }));

    return NextResponse.json({ success: true, authors: authorList });
  } catch (error) {
    console.error("Error fetching authors:", error);
    return NextResponse.json({ success: false, message: getErrorMessage(error, "Failed to fetch authors") }, { status: 500 });
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
        { success: false, message: "Forbidden: Only Admin can add new authors or editors." },
        { status: 403 }
      );
    }

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

    if (!email || !email.trim()) {
      return NextResponse.json({ success: false, message: "Email is required." }, { status: 400 });
    }

    const cleanSlug = (slug || name)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const cleanUsername = (username || cleanSlug)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9_-]+/g, "-")
      .replace(/^-+|-+$/g, "") || `user-${Date.now()}`;

    const userPass = password && password.trim() ? password.trim() : "author@123";

    // Check if email or username already used
    const { data: existing } = await supabase
      .from("users")
      .select("id, email, username")
      .or(`email.eq.${email.trim().toLowerCase()},username.eq.${cleanUsername}`)
      .limit(1);

    if (existing && existing.length > 0) {
      if (existing[0].email === email.trim().toLowerCase()) {
        return NextResponse.json({ success: false, message: "Another user is already using this email." }, { status: 400 });
      }
      return NextResponse.json({ success: false, message: `Username "${cleanUsername}" is already taken.` }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("users")
      .insert({
        username: cleanUsername,
        password: userPass,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        role: role || "author",
        slug: cleanSlug,
        photo: photo || null,
        title: title?.trim() || null,
        bio: bio?.trim() || null,
        experience_years: Number(experience_years) || 0,
        instagram: instagram?.trim() || null,
        youtube: youtube?.trim() || null,
        yoga_alliance: yoga_alliance?.trim() || null,
      })
      .select()
      .single();

    if (error) {
      if (getErrorCode(error) === "23505") {
        return NextResponse.json({ success: false, message: "A user with this username or email already exists." }, { status: 400 });
      }
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: `${role.charAt(0).toUpperCase() + role.slice(1)} account created successfully!`,
      id: data.id,
      username: cleanUsername,
    });
  } catch (error) {
    console.error("Error creating author:", error);
    return NextResponse.json({ success: false, message: getErrorMessage(error, "Failed to create author") }, { status: 500 });
  }
}
