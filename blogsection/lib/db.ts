import mysql from "mysql2/promise";
import { getAdminCredentials, requireEnv } from "./env";

let pool: mysql.Pool | null = null;
let initialized = false;

export function getDbConfig() {
  return {
    host: requireEnv("MYSQL_HOST"),
    port: Number(process.env.MYSQL_PORT) || 3306,
    user: requireEnv("MYSQL_USER"),
    password: requireEnv("MYSQL_PASSWORD"),
    database: requireEnv("MYSQL_DATABASE"),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  };
}

export async function initDatabase() {
  if (initialized && pool) return pool;

  const config = getDbConfig();

  // 1. Connect without database to ensure database exists
  const rootConn = await mysql.createConnection({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
  });

  await rootConn.query(`CREATE DATABASE IF NOT EXISTS \`${config.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
  await rootConn.end();

  // 2. Create the connection pool with the database
  pool = mysql.createPool(config);

  // 3. Create tables if not exist
  await pool.query(`
    CREATE TABLE IF NOT EXISTS \`categories\` (
      \`id\` INT AUTO_INCREMENT PRIMARY KEY,
      \`name\` VARCHAR(150) NOT NULL,
      \`slug\` VARCHAR(150) NOT NULL UNIQUE,
      \`description\` TEXT DEFAULT NULL,
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
      \`faqs\` JSON DEFAULT NULL,
      \`meta_title\` VARCHAR(255) DEFAULT NULL,
      \`meta_description\` VARCHAR(500) DEFAULT NULL,
      \`meta_keywords\` VARCHAR(255) DEFAULT NULL,
      \`popular\` TINYINT(1) DEFAULT 0,
      \`author\` VARCHAR(100) DEFAULT 'Sanskriti Yogpeeth',
      \`published_at\` DATETIME DEFAULT CURRENT_TIMESTAMP,
      \`status\` ENUM('published', 'draft') DEFAULT 'published',
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
      \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  // Ensure blogs status supports 'scheduled' and add additional editor fields if missing
  try {
    await pool.query("ALTER TABLE `blogs` MODIFY COLUMN `status` VARCHAR(50) DEFAULT 'published'");
  } catch (e) {}

  const addColumnIfNotExists = async (table: string, col: string, def: string) => {
    try {
      const [existing] = await pool!.query(`SHOW COLUMNS FROM \`${table}\` LIKE ?`, [col]);
      if (Array.isArray(existing) && existing.length === 0) {
        await pool!.query(`ALTER TABLE \`${table}\` ADD COLUMN \`${col}\` ${def}`);
      }
    } catch (e) {}
  };

  await addColumnIfNotExists("blogs", "views", "INT DEFAULT 0");
  await addColumnIfNotExists("blogs", "seo_score", "INT DEFAULT 75");
  await addColumnIfNotExists("blogs", "tags", "TEXT DEFAULT NULL");
  await addColumnIfNotExists("blogs", "focus_keyword", "VARCHAR(255) DEFAULT NULL");
  await addColumnIfNotExists("blogs", "related_keywords", "VARCHAR(255) DEFAULT NULL");
  await addColumnIfNotExists("blogs", "tldr", "TEXT DEFAULT NULL");
  await addColumnIfNotExists("blogs", "key_takeaways", "TEXT DEFAULT NULL");
  await addColumnIfNotExists("blogs", "canonical_url", "VARCHAR(255) DEFAULT NULL");
  await addColumnIfNotExists("blogs", "conclusion", "TEXT DEFAULT NULL");
  await addColumnIfNotExists("blogs", "schema_type", "VARCHAR(50) DEFAULT 'post'");

  await addColumnIfNotExists("categories", "color", "VARCHAR(30) DEFAULT '#BF296A'");
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
  const [userRows] = await pool.query("SELECT COUNT(*) as count FROM `users` WHERE `username` = 'admin'");
  const userCount = (userRows as Array<{ count: number }>)[0]?.count || 0;
  if (userCount === 0) {
    const { password: defaultPass } = getAdminCredentials();
    await pool.query(
      "INSERT INTO `users` (`username`, `password`, `name`, `email`, `role`) VALUES (?, ?, ?, ?, ?)",
      ["admin", defaultPass, "Sanskriti Yogpeeth Admin", "admin@sanskritiyogpeeth.org", "admin"]
    );
  }

  // 4. Seed default categories if empty (matches user's screenshot)
  const [catRows] = await pool.query("SELECT COUNT(*) as count FROM `categories`");
  const catCount = (catRows as Array<{ count: number }>)[0]?.count || 0;

  if (catCount === 0) {
    const defaultCategories = [
      ["Yoga Teacher Training", "yoga-teacher-training"],
      ["Yoga Retreats & Rishikesh Travel", "yoga-retreats-rishikesh-travel"],
      ["Yoga Asanas", "yoga-asanas"],
      ["Pranayama & Meditation", "pranayama-meditation"],
      ["Mudras & Bandhas", "mudras-bandhas"],
      ["Yoga Therapy & Holistic Health", "yoga-therapy-holistic-health"],
      ["Yoga Philosophy & Spiritual Living", "yoga-philosophy-spiritual-living"],
    ];

    for (const [name, slug] of defaultCategories) {
      await pool.query("INSERT IGNORE INTO `categories` (`name`, `slug`) VALUES (?, ?)", [name, slug]);
    }
  }

  initialized = true;
  return pool;
}

export async function query<T = unknown>(sql: string, params: unknown[] = []): Promise<T> {
  const p = await initDatabase();
  const [rows] = await p.query(sql, params);
  return rows as T;
}
