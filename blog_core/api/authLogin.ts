import { NextRequest, NextResponse } from "next/server";
import { getErrorMessage } from "../lib/errors";
import { setAdminSession, validateUserCredentials } from "../lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "Username and password are required." },
        { status: 400 }
      );
    }

    const { valid, user } = await validateUserCredentials(username, password);

    if (!valid || !user) {
      return NextResponse.json(
        { success: false, message: "Invalid username or password. Please try again." },
        { status: 401 }
      );
    }

    // Set cookie session with role
    await setAdminSession(user);

    return NextResponse.json({
      success: true,
      message: "Login successful!",
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login route error:", error);
    return NextResponse.json(
      { success: false, message: getErrorMessage(error, "Internal server error") },
      { status: 500 }
    );
  }
}
