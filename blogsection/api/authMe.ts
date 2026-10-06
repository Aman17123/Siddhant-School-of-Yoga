import { NextResponse } from "next/server";
import { getAdminSession } from "../lib/auth";
import { getAuthorByUsername } from "../lib/db";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  try {
    const user = await getAuthorByUsername(session.username);

    const userData = user
      ? {
          id: user.id,
          username: user.username,
          name: user.name,
          email: user.email,
          role: user.role,
        }
      : { username: session.username, name: session.name || "Admin", role: session.role };

    return NextResponse.json({ authenticated: true, user: userData });
  } catch (error) {
    return NextResponse.json({
      authenticated: true,
      user: { username: session.username, name: session.name || "Admin", role: session.role },
    });
  }
}
