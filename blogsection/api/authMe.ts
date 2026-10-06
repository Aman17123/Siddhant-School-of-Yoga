import { NextResponse } from "next/server";
import { getAdminSession } from "../lib/auth";
import { supabase } from "../lib/supabase";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  try {
    const { data: user, error } = await supabase
      .from("users")
      .select("id, username, name, email, role")
      .eq("username", session.username)
      .single();

    const userData = (!error && user)
      ? user
      : { username: session.username, name: "Admin", role: session.role };

    return NextResponse.json({ authenticated: true, user: userData });
  } catch (error) {
    return NextResponse.json({
      authenticated: true,
      user: { username: session.username, name: "Admin", role: session.role },
    });
  }
}
