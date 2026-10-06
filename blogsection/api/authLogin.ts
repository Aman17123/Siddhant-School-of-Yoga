import { NextRequest, NextResponse } from "next/server";
import { getErrorMessage } from "../lib/errors";
import { setAdminSession, validateUserCredentials } from "../lib/auth";
import { safeRecordLoginLog } from "../lib/loginLogs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";
    const userAgent = req.headers.get("user-agent") || "Browser";

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "Username and password are required." },
        { status: 400 }
      );
    }

    const { valid, user } = await validateUserCredentials(username, password);

    if (!valid || !user) {
      // Record failed login activity
      await safeRecordLoginLog({
        username: String(username).trim(),
        name: "Unknown",
        role: "unknown",
        ip,
        user_agent: userAgent,
        status: "failed",
      });

      return NextResponse.json(
        { success: false, message: "Invalid username or password. Please try again." },
        { status: 401 }
      );
    }

    // Set cookie session with role
    await setAdminSession(user);

    // Record successful login activity
    await safeRecordLoginLog({
      username: user.username,
      name: user.name,
      role: user.role,
      ip,
      user_agent: userAgent,
      status: "success",
    });

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
