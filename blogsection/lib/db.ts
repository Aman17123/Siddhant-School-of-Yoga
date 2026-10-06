import mysql from "mysql2/promise";
import { getAdminCredentials } from "./env";

let pool: mysql.Pool | null = null;
let initialized = false;

export function getDbConfig() {
  return {
    host: process.env.MYSQL_HOST || "127.0.0.1",
    port: Number(process.env.MYSQL_PORT) || 3306,
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD ?? "",
    database: process.env.MYSQL_DATABASE || "siddhant_school_of_yoga",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    dateStrings: true,
  };
}

export async function initDatabase(): Promise<mysql.Pool> {
  if (initialized && pool) return pool;

  const config = getDbConfig();

  // 1. Connect without database to ensure database exists
  try {
    const rootConn = await mysql.createConnection({
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.password,
    });

    await rootConn.query(
      `CREATE DATABASE IF NOT EXISTS \`${config.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
    );
    await rootConn.end();
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[MySQL] Could not ensure database exists:", message);
  }

  // 2. Create the connection pool with the database
  pool = mysql.createPool(config);

  // 3. Create tables if not exist
  await pool.query(`
    CREATE TABLE IF NOT EXISTS \`categories\` (
      \`id\` INT AUTO_INCREMENT PRIMARY KEY,
      \`name\` VARCHAR(150) NOT NULL,
      \`slug\` VARCHAR(150) NOT NULL UNIQUE,
      \`description\` TEXT DEFAULT NULL,
      \`color\` VARCHAR(30) DEFAULT '#bf296a',
      \`parent_id\` INT DEFAULT NULL,
      \`meta_title\` VARCHAR(255) DEFAULT NULL,
      \`meta_description\` VARCHAR(500) DEFAULT NULL,
      \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS \`blogs\` (
      \`id\` INT AUTO_INCREMENT PRIMARY KEY,
      \`title\` VARCHAR(255) NOT NULL,
      \`slug\` VARCHAR(255) NOT NULL UNIQUE,
      \`category_id\` INT DEFAULT NULL,
      \`category_name\` VARCHAR(150) DEFAULT NULL,
      \`featured_image\` VARCHAR(500) DEFAULT NULL,
      \`featured_image_alt\` VARCHAR(255) DEFAULT NULL,
      \`featured_image_title\` VARCHAR(255) DEFAULT NULL,
      \`short_description\` VARCHAR(500) DEFAULT NULL,
      \`content\` LONGTEXT DEFAULT NULL,
      \`faqs\` LONGTEXT DEFAULT NULL,
      \`meta_title\` VARCHAR(255) DEFAULT NULL,
      \`meta_description\` VARCHAR(500) DEFAULT NULL,
      \`meta_keywords\` VARCHAR(255) DEFAULT NULL,
      \`popular\` TINYINT(1) DEFAULT 0,
      \`author\` VARCHAR(100) DEFAULT 'Siddhant School of Yoga',
      \`published_at\` DATETIME DEFAULT CURRENT_TIMESTAMP,
      \`status\` VARCHAR(50) DEFAULT 'published',
      \`views\` INT DEFAULT 0,
      \`seo_score\` INT DEFAULT 75,
      \`tags\` LONGTEXT DEFAULT NULL,
      \`focus_keyword\` VARCHAR(255) DEFAULT NULL,
      \`related_keywords\` VARCHAR(255) DEFAULT NULL,
      \`tldr\` TEXT DEFAULT NULL,
      \`key_takeaways\` TEXT DEFAULT NULL,
      \`canonical_url\` VARCHAR(255) DEFAULT NULL,
      \`conclusion\` TEXT DEFAULT NULL,
      \`schema_type\` VARCHAR(50) DEFAULT 'post',
      \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      KEY \`idx_category\` (\`category_id\`),
      KEY \`idx_status\` (\`status\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS \`users\` (
      \`id\` INT AUTO_INCREMENT PRIMARY KEY,
      \`username\` VARCHAR(100) NOT NULL UNIQUE,
      \`password\` VARCHAR(255) NOT NULL,
      \`name\` VARCHAR(150) DEFAULT 'Administrator',
      \`email\` VARCHAR(150) DEFAULT NULL,
      \`role\` VARCHAR(50) DEFAULT 'admin',
      \`slug\` VARCHAR(150) DEFAULT NULL,
      \`photo\` VARCHAR(500) DEFAULT NULL,
      \`title\` VARCHAR(255) DEFAULT NULL,
      \`bio\` TEXT DEFAULT NULL,
      \`experience_years\` INT DEFAULT 0,
      \`instagram\` VARCHAR(255) DEFAULT NULL,
      \`youtube\` VARCHAR(255) DEFAULT NULL,
      \`yoga_alliance\` VARCHAR(255) DEFAULT NULL,
      \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS \`login_logs\` (
      \`id\` INT AUTO_INCREMENT PRIMARY KEY,
      \`username\` VARCHAR(100) NOT NULL,
      \`name\` VARCHAR(150) DEFAULT NULL,
      \`role\` VARCHAR(50) DEFAULT NULL,
      \`ip\` VARCHAR(64) DEFAULT NULL,
      \`user_agent\` TEXT DEFAULT NULL,
      \`status\` VARCHAR(20) DEFAULT 'success',
      \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  // Migration helper for new columns
  const addColumnIfNotExists = async (table: string, col: string, def: string) => {
    try {
      const [existing] = await (pool as any).query(`SHOW COLUMNS FROM \`${table}\` LIKE ?`, [col]);
      if (Array.isArray(existing) && existing.length === 0) {
        await pool!.query(`ALTER TABLE \`${table}\` ADD COLUMN \`${col}\` ${def}`);
      }
    } catch {}
  };

  await addColumnIfNotExists("blogs", "views", "INT DEFAULT 0");
  await addColumnIfNotExists("blogs", "seo_score", "INT DEFAULT 75");
  await addColumnIfNotExists("blogs", "tags", "LONGTEXT DEFAULT NULL");
  await addColumnIfNotExists("blogs", "focus_keyword", "VARCHAR(255) DEFAULT NULL");
  await addColumnIfNotExists("blogs", "related_keywords", "VARCHAR(255) DEFAULT NULL");
  await addColumnIfNotExists("blogs", "tldr", "TEXT DEFAULT NULL");
  await addColumnIfNotExists("blogs", "key_takeaways", "TEXT DEFAULT NULL");
  await addColumnIfNotExists("blogs", "canonical_url", "VARCHAR(255) DEFAULT NULL");
  await addColumnIfNotExists("blogs", "conclusion", "TEXT DEFAULT NULL");
  await addColumnIfNotExists("blogs", "schema_type", "VARCHAR(50) DEFAULT 'post'");

  await addColumnIfNotExists("categories", "color", "VARCHAR(30) DEFAULT '#bf296a'");
  await addColumnIfNotExists("categories", "parent_id", "INT DEFAULT NULL");
  await addColumnIfNotExists("categories", "meta_title", "VARCHAR(255) DEFAULT NULL");
  await addColumnIfNotExists("categories", "meta_description", "VARCHAR(500) DEFAULT NULL");

  await addColumnIfNotExists("users", "slug", "VARCHAR(150) DEFAULT NULL");
  await addColumnIfNotExists("users", "photo", "VARCHAR(500) DEFAULT NULL");
  await addColumnIfNotExists("users", "title", "VARCHAR(255) DEFAULT NULL");
  await addColumnIfNotExists("users", "bio", "TEXT DEFAULT NULL");
  await addColumnIfNotExists("users", "experience_years", "INT DEFAULT 0");
  await addColumnIfNotExists("users", "instagram", "VARCHAR(255) DEFAULT NULL");
  await addColumnIfNotExists("users", "youtube", "VARCHAR(255) DEFAULT NULL");
  await addColumnIfNotExists("users", "yoga_alliance", "VARCHAR(255) DEFAULT NULL");

  // Seed default admin user in users table if not exists
  const [userRows] = await (pool as any).query("SELECT COUNT(*) as count FROM `users` WHERE `username` = 'admin'");
  const userCount = (userRows as Array<{ count: number }>)[0]?.count || 0;
  if (userCount === 0) {
    const { password: defaultPass } = getAdminCredentials();
    await pool.query(
      "INSERT INTO `users` (`username`, `password`, `name`, `email`, `role`, `title`) VALUES (?, ?, ?, ?, ?, ?)",
      ["admin", defaultPass, "Siddhant School of Yoga Admin", "info@siddhantschoolofyoga.com", "admin", "Lead Teacher & Founder"]
    );
  }

  // Seed default categories if empty
  const [catRows] = await (pool as any).query("SELECT COUNT(*) as count FROM `categories`");
  const catCount = (catRows as Array<{ count: number }>)[0]?.count || 0;

  if (catCount === 0) {
    const defaultCategories = [
      ["Yoga Teacher Training", "yoga-teacher-training", "#bf296a", "Everything you need to know about becoming a certified yoga teacher in Rishikesh."],
      ["Yoga Retreats & Rishikesh Travel", "yoga-retreats-rishikesh-travel", "#5C6E4E", "Plan your yoga journey to the Yoga Capital of the World."],
      ["Yoga Asanas", "yoga-asanas", "#C9862A", "Step-by-step guides to yoga poses for beginners and advanced practitioners."],
      ["Pranayama & Meditation", "pranayama-meditation", "#4a5fa8", "Discover the power of breath and stillness."],
      ["Mudras & Bandhas", "mudras-bandhas", "#ac1c5b", "Explore the subtle art of hand gestures and energy locks in yoga."],
      ["Yoga Therapy & Holistic Health", "yoga-therapy-holistic-health", "#00897b", "Use yoga, Ayurveda and natural remedies to support your wellbeing."],
      ["Yoga Philosophy & Spiritual Living", "yoga-philosophy-spiritual-living", "#951248", "Go beyond the mat with the timeless wisdom of yoga."]
    ];

    for (const [name, slug, color, desc] of defaultCategories) {
      await pool.query(
        "INSERT IGNORE INTO `categories` (`name`, `slug`, `color`, `description`) VALUES (?, ?, ?, ?)",
        [name, slug, color, desc]
      );
    }
  }

  initialized = true;
  return pool;
}

export async function query<T = unknown[]>(sql: string, params: any = []): Promise<T> {
  const p = await initDatabase();
  const [rows] = await (p as any).query(sql, params);
  return rows as T;
}

export async function execute(sql: string, params: any = []): Promise<mysql.ResultSetHeader> {
  const p = await initDatabase();
  const [result] = await (p as any).query(sql, params);
  return result as mysql.ResultSetHeader;
}

function parseJsonField<T>(field: unknown, fallback: T): T {
  if (!field) return fallback;
  if (typeof field === "object") return field as T;
  if (typeof field === "string") {
    try {
      return JSON.parse(field) as T;
    } catch {
      return fallback;
    }
  }
  return fallback;
}

function normalizeBlogRow(row: Record<string, unknown>) {
  if (!row) return row;
  return {
    ...row,
    popular: Boolean(row.popular),
    faqs: parseJsonField(row.faqs, []),
    tags: parseJsonField(row.tags, []),
  };
}

// -------------------------------------------------------------
// Blog CRUD
// -------------------------------------------------------------

export async function publishDueBlogs(): Promise<number> {
  try {
    const result = await execute(
      "UPDATE `blogs` SET `status` = 'published', `updated_at` = NOW() WHERE `status` = 'scheduled' AND `published_at` <= NOW()"
    );
    return result.affectedRows || 0;
  } catch (e) {
    console.warn("[MySQL] publishDueBlogs warning:", e);
    return 0;
  }
}

export async function getBlogs(filter?: {
  search?: string;
  category?: string;
  status?: string;
  limit?: number;
}): Promise<Record<string, unknown>[]> {
  await publishDueBlogs();
  const whereClauses: string[] = [];
  const params: unknown[] = [];

  if (filter?.search) {
    const s = `%${filter.search}%`;
    whereClauses.push(
      "(`title` LIKE ? OR `short_description` LIKE ? OR `author` LIKE ? OR `focus_keyword` LIKE ?)"
    );
    params.push(s, s, s, s);
  }

  if (filter?.category && filter.category !== "all") {
    if (!isNaN(Number(filter.category))) {
      whereClauses.push("(`category_id` = ? OR `category_name` = ?)");
      params.push(Number(filter.category), filter.category);
    } else {
      whereClauses.push("`category_name` = ?");
      params.push(filter.category);
    }
  }

  if (filter?.status && filter.status !== "all") {
    whereClauses.push("`status` = ?");
    params.push(filter.status);
  }

  let sql = "SELECT * FROM `blogs`";
  if (whereClauses.length > 0) {
    sql += " WHERE " + whereClauses.join(" AND ");
  }
  sql += " ORDER BY `id` DESC";

  if (filter?.limit && filter.limit > 0) {
    sql += ` LIMIT ${Number(filter.limit)}`;
  }

  const rows = await query<Record<string, unknown>[]>(sql, params);
  return rows.map(normalizeBlogRow);
}

export async function getBlogByIdOrSlug(idOrSlug: string | number): Promise<Record<string, unknown> | null> {
  await publishDueBlogs();
  const isNumeric = typeof idOrSlug === "number" || /^\d+$/.test(String(idOrSlug));
  const sql = isNumeric
    ? "SELECT * FROM `blogs` WHERE `id` = ? LIMIT 1"
    : "SELECT * FROM `blogs` WHERE `slug` = ? LIMIT 1";

  const rows = await query<Record<string, unknown>[]>(sql, [idOrSlug]);
  if (!rows || rows.length === 0) return null;
  return normalizeBlogRow(rows[0]);
}

export async function createBlog(data: Record<string, unknown>): Promise<{ id: number; slug: string }> {
  const faqsStr = typeof data.faqs === "object" ? JSON.stringify(data.faqs) : String(data.faqs || "[]");
  const tagsStr = typeof data.tags === "object" ? JSON.stringify(data.tags) : String(data.tags || "[]");

  const fields = [
    "title", "slug", "category_id", "category_name", "featured_image", "featured_image_alt",
    "featured_image_title", "short_description", "content", "faqs", "meta_title", "meta_description",
    "meta_keywords", "popular", "author", "published_at", "status", "views", "seo_score", "tags",
    "focus_keyword", "related_keywords", "tldr", "key_takeaways", "canonical_url", "conclusion", "schema_type"
  ];

  const values = [
    data.title,
    data.slug,
    data.category_id ? Number(data.category_id) : null,
    data.category_name || "General",
    data.featured_image || null,
    data.featured_image_alt || null,
    data.featured_image_title || null,
    data.short_description || null,
    data.content || "",
    faqsStr,
    data.meta_title || null,
    data.meta_description || null,
    data.meta_keywords || null,
    data.popular ? 1 : 0,
    data.author || "Siddhant School of Yoga",
    data.published_at || new Date().toISOString().slice(0, 19).replace("T", " "),
    data.status || "published",
    Number(data.views) || 0,
    Number(data.seo_score) || 75,
    tagsStr,
    data.focus_keyword || null,
    data.related_keywords || null,
    data.tldr || null,
    data.key_takeaways || null,
    data.canonical_url || null,
    data.conclusion || null,
    data.schema_type || "post",
  ];

  const placeholders = fields.map(() => "?").join(", ");
  const sql = `INSERT INTO \`blogs\` (\`${fields.join("`, `")}\`) VALUES (${placeholders})`;

  const res = await execute(sql, values);
  return { id: res.insertId, slug: String(data.slug) };
}

export async function updateBlog(id: number | string, data: Record<string, unknown>): Promise<boolean> {
  const setClauses: string[] = [];
  const params: unknown[] = [];

  for (const [key, value] of Object.entries(data)) {
    if (key === "id" || key === "created_at" || key === "updated_at") continue;

    if (key === "faqs" || key === "tags") {
      setClauses.push(`\`${key}\` = ?`);
      params.push(typeof value === "object" ? JSON.stringify(value) : String(value || "[]"));
    } else if (key === "popular") {
      setClauses.push("`popular` = ?");
      params.push(value ? 1 : 0);
    } else {
      setClauses.push(`\`${key}\` = ?`);
      params.push(value);
    }
  }

  if (setClauses.length === 0) return true;

  params.push(id);
  const sql = `UPDATE \`blogs\` SET ${setClauses.join(", ")}, \`updated_at\` = NOW() WHERE \`id\` = ?`;
  const res = await execute(sql, params);
  return res.affectedRows > 0;
}

export async function deleteBlog(id: number | string): Promise<boolean> {
  const res = await execute("DELETE FROM `blogs` WHERE `id` = ?", [id]);
  return res.affectedRows > 0;
}

export async function incrementBlogViews(id: number | string): Promise<void> {
  try {
    await execute("UPDATE `blogs` SET `views` = `views` + 1 WHERE `id` = ?", [id]);
  } catch {}
}

// -------------------------------------------------------------
// Categories CRUD
// -------------------------------------------------------------

export async function getCategories(): Promise<Record<string, unknown>[]> {
  const categories = await query<Record<string, unknown>[]>(
    "SELECT * FROM `categories` ORDER BY `id` ASC"
  );

  const blogCounts = await query<Array<{ category_id: number; category_name: string; count: number }>>(
    "SELECT `category_id`, `category_name`, COUNT(*) as count FROM `blogs` GROUP BY `category_id`, `category_name`"
  );

  const countMap: Record<string, number> = {};
  blogCounts.forEach((b) => {
    if (b.category_id) countMap[String(b.category_id)] = (countMap[String(b.category_id)] || 0) + Number(b.count);
    if (b.category_name) countMap[b.category_name] = (countMap[b.category_name] || 0) + Number(b.count);
  });

  return categories.map((c) => ({
    ...c,
    blog_count: countMap[String(c.id)] || countMap[String(c.name)] || 0,
  }));
}

export async function createCategory(data: {
  name: string;
  slug: string;
  description?: string | null;
  color?: string | null;
  parent_id?: number | null;
  meta_title?: string | null;
  meta_description?: string | null;
}): Promise<Record<string, unknown>> {
  const res = await execute(
    `INSERT INTO \`categories\` (\`name\`, \`slug\`, \`description\`, \`color\`, \`parent_id\`, \`meta_title\`, \`meta_description\`)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      data.name.trim(),
      data.slug.trim(),
      data.description?.trim() || null,
      data.color || "#bf296a",
      data.parent_id ? Number(data.parent_id) : null,
      data.meta_title || null,
      data.meta_description || null,
    ]
  );
  return { id: res.insertId, ...data };
}

export async function updateCategory(id: number | string, data: Record<string, unknown>): Promise<boolean> {
  const fields = ["name", "slug", "description", "color", "parent_id", "meta_title", "meta_description"];
  const setClauses: string[] = [];
  const params: unknown[] = [];

  for (const f of fields) {
    if (f in data) {
      setClauses.push(`\`${f}\` = ?`);
      params.push(data[f]);
    }
  }

  if (setClauses.length === 0) return true;
  params.push(id);

  const res = await execute(
    `UPDATE \`categories\` SET ${setClauses.join(", ")} WHERE \`id\` = ?`,
    params
  );
  return res.affectedRows > 0;
}

export async function deleteCategory(id: number | string): Promise<boolean> {
  await execute("UPDATE `blogs` SET `category_id` = NULL WHERE `category_id` = ?", [id]);
  const res = await execute("DELETE FROM `categories` WHERE `id` = ?", [id]);
  return res.affectedRows > 0;
}

// -------------------------------------------------------------
// Authors / Users CRUD
// -------------------------------------------------------------

export async function getAuthors(role?: string): Promise<Record<string, unknown>[]> {
  let sql = `SELECT \`id\`, \`username\`, \`name\`, \`email\`, \`role\`, \`slug\`, \`photo\`,
                    \`title\`, \`bio\`, \`experience_years\`, \`instagram\`, \`youtube\`,
                    \`yoga_alliance\`, \`created_at\` FROM \`users\``;
  const params: unknown[] = [];

  if (role && role !== "all") {
    sql += " WHERE `role` = ?";
    params.push(role);
  }
  sql += " ORDER BY `id` ASC";

  const authors = await query<Record<string, unknown>[]>(sql, params);

  const blogCounts = await query<Array<{ author: string; count: number }>>(
    "SELECT `author`, COUNT(*) as count FROM `blogs` GROUP BY `author`"
  );
  const counts: Record<string, number> = {};
  blogCounts.forEach((b) => {
    if (b.author) counts[b.author] = Number(b.count);
  });

  return authors.map((a) => ({
    ...a,
    blog_count: counts[String(a.name)] || counts[String(a.username)] || 0,
  }));
}

export async function getAuthorById(id: number | string): Promise<Record<string, unknown> | null> {
  const rows = await query<Record<string, unknown>[]>(
    `SELECT \`id\`, \`username\`, \`name\`, \`email\`, \`role\`, \`slug\`, \`photo\`,
            \`title\`, \`bio\`, \`experience_years\`, \`instagram\`, \`youtube\`,
            \`yoga_alliance\`, \`created_at\` FROM \`users\` WHERE \`id\` = ? LIMIT 1`,
    [id]
  );
  return rows[0] || null;
}

export async function getAuthorByUsername(username: string): Promise<Record<string, unknown> | null> {
  const rows = await query<Record<string, unknown>[]>(
    `SELECT \`id\`, \`username\`, \`password\`, \`name\`, \`email\`, \`role\`
     FROM \`users\` WHERE \`username\` = ? LIMIT 1`,
    [username]
  );
  return rows[0] || null;
}

export async function createAuthor(data: Record<string, unknown>): Promise<{ id: number }> {
  const res = await execute(
    `INSERT INTO \`users\` (\`username\`, \`password\`, \`name\`, \`email\`, \`role\`, \`slug\`,
                           \`photo\`, \`title\`, \`bio\`, \`experience_years\`, \`instagram\`,
                           \`youtube\`, \`yoga_alliance\`)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.username,
      data.password || "author@123",
      data.name,
      data.email,
      data.role || "author",
      data.slug || null,
      data.photo || null,
      data.title || null,
      data.bio || null,
      Number(data.experience_years) || 0,
      data.instagram || null,
      data.youtube || null,
      data.yoga_alliance || null,
    ]
  );
  return { id: res.insertId };
}

export async function updateAuthor(id: number | string, data: Record<string, unknown>): Promise<boolean> {
  const setClauses: string[] = [];
  const params: unknown[] = [];

  const allowed = [
    "name", "email", "role", "slug", "photo", "title", "bio",
    "experience_years", "instagram", "youtube", "yoga_alliance", "username", "password"
  ];

  for (const key of allowed) {
    if (key in data) {
      setClauses.push(`\`${key}\` = ?`);
      params.push(data[key]);
    }
  }

  if (setClauses.length === 0) return true;
  params.push(id);

  const res = await execute(
    `UPDATE \`users\` SET ${setClauses.join(", ")}, \`updated_at\` = NOW() WHERE \`id\` = ?`,
    params
  );
  return res.affectedRows > 0;
}

export async function deleteAuthor(id: number | string, moveToAuthor?: string): Promise<boolean> {
  const author = await getAuthorById(id);
  if (author) {
    const target = moveToAuthor || "Siddhant School of Yoga";
    await execute(
      "UPDATE `blogs` SET `author` = ? WHERE `author` = ? OR `author` = ?",
      [target, author.name, author.username]
    );
  }
  const res = await execute("DELETE FROM `users` WHERE `id` = ?", [id]);
  return res.affectedRows > 0;
}

// -------------------------------------------------------------
// Login Activity Logs
// -------------------------------------------------------------

export async function recordLoginLog(entry: {
  username: string;
  name?: string;
  role?: string;
  ip?: string;
  user_agent?: string;
  status?: string;
}): Promise<void> {
  await execute(
    `INSERT INTO \`login_logs\` (\`username\`, \`name\`, \`role\`, \`ip\`, \`user_agent\`, \`status\`)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      entry.username || "unknown",
      entry.name || entry.username || "Unknown",
      entry.role || "unknown",
      entry.ip || "127.0.0.1",
      entry.user_agent || "Browser",
      entry.status || "success",
    ]
  );
}

export async function safeRecordLoginLog(entry: {
  username: string;
  name?: string;
  role?: string;
  ip?: string;
  user_agent?: string;
  status?: string;
}): Promise<void> {
  try {
    await recordLoginLog(entry);
  } catch (err) {
    console.error("[MySQL] Login log write failed:", err);
  }
}

export async function getLoginLogs(): Promise<Record<string, unknown>[]> {
  return await query<Record<string, unknown>[]>(
    "SELECT * FROM `login_logs` ORDER BY `id` DESC LIMIT 100"
  );
}

export async function clearLoginLogs(): Promise<boolean> {
  await execute("DELETE FROM `login_logs`");
  return true;
}
