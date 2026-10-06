import { NextRequest, NextResponse } from "next/server";
import { getErrorMessage } from "../lib/errors";
import { getAdminSession } from "../lib/auth";
import { getLoginLogs, clearLoginLogs } from "../lib/loginLogs";

export async function GET(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized. Please log in." }, { status: 401 });
    }

    if (session.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Forbidden: Only Admin can access login activity logs." },
        { status: 403 }
      );
    }

    const logs = await getLoginLogs();
    return NextResponse.json({ success: true, logs });
  } catch (error) {
    console.error("Error fetching login logs:", error);
    return NextResponse.json(
      { success: false, message: getErrorMessage(error, "Failed to fetch login logs.") },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Forbidden: Only Admin can clear activity logs." },
        { status: 403 }
      );
    }

    const success = await clearLoginLogs();
    return NextResponse.json({ success, message: "Login activity history cleared successfully." });
  } catch (error) {
    console.error("Error clearing login logs:", error);
    return NextResponse.json(
      { success: false, message: getErrorMessage(error, "Failed to clear logs.") },
      { status: 500 }
    );
  }
}
