import { NextResponse } from "next/server";
import { getAdminSession } from "../lib/auth";
import { query } from "../lib/db";
import { getErrorMessage } from "../lib/errors";

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Admin session required." },
        { status: 401 }
      );
    }

    // Deduped byline suggestions = SELECT DISTINCT author FROM blog ∪ users.name
    // Self-cleaning: if a wrong name is corrected, it disappears automatically once no post uses it.
    let authors: string[] = [];
    try {
      const rows = await query<Array<{ author_name: string }>>(
        `SELECT DISTINCT TRIM(\`author\`) AS author_name 
         FROM \`blog\` 
         WHERE \`author\` IS NOT NULL AND TRIM(\`author\`) != ''
         UNION
         SELECT DISTINCT TRIM(\`name\`) AS author_name 
         FROM \`users\` 
         WHERE \`name\` IS NOT NULL AND TRIM(\`name\`) != ''`
      );

      const set = new Set<string>();
      set.add("Siddhant School of Yoga");
      if (rows && Array.isArray(rows)) {
        for (const row of rows) {
          if (row.author_name && row.author_name.trim()) {
            set.add(row.author_name.trim());
          }
        }
      }

      authors = Array.from(set).sort((a, b) => {
        if (a === "Siddhant School of Yoga") return -1;
        if (b === "Siddhant School of Yoga") return 1;
        return a.localeCompare(b);
      });
    } catch (dbErr) {
      console.error("Error querying author bylines:", dbErr);
      authors = ["Siddhant School of Yoga"];
    }

    return NextResponse.json({ success: true, authors });
  } catch (error) {
    console.error("Error in authors API:", error);
    return NextResponse.json(
      { success: false, message: getErrorMessage(error, "Failed to fetch authors") },
      { status: 500 }
    );
  }
}
