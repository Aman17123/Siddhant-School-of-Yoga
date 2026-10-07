import crypto from "crypto";
import { getAdminJwtSecret } from "./env";

export const COOKIE_NAME = "blog_admin_token";

export interface AdminSession {
  username: string;
  role: "admin";
  name?: string;
  id?: number;
  exp: number;
}

function safeBase64UrlDecode(str: string): string {
  try {
    return Buffer.from(str, "base64url").toString("utf-8");
  } catch {
    let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) {
      base64 += "=";
    }
    return Buffer.from(base64, "base64").toString("utf-8");
  }
}

export function createToken(
  user: { username?: string; role?: string; name?: string; id?: number } | string
): string {
  const exp = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60; // 7 days

  let username = "";
  let name: string | undefined;
  let id: number | undefined;

  if (typeof user === "string") {
    username = user.trim();
  } else if (user && typeof user === "object") {
    username = (user.username || user.name || "").trim();
    name = user.name;
    id = user.id;
  }

  if (!username) {
    username = "admin";
  }

  const payloadObj = {
    username,
    role: "admin" as const,
    name,
    id,
    exp,
  };

  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const payload = Buffer.from(JSON.stringify(payloadObj)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", getAdminJwtSecret())
    .update(`${header}.${payload}`)
    .digest("base64url");
  return `${header}.${payload}.${signature}`;
}

export function verifyToken(token?: string | null): AdminSession | null {
  if (!token || typeof token !== "string") return null;

  try {
    let cleanToken = token.trim();
    // Strip surrounding quotes if present from cookie serialization
    if (cleanToken.startsWith('"') && cleanToken.endsWith('"')) {
      cleanToken = cleanToken.slice(1, -1);
    }
    if (cleanToken.includes("%")) {
      try {
        cleanToken = decodeURIComponent(cleanToken);
      } catch {}
    }

    const parts = cleanToken.split(".");
    if (parts.length !== 3) return null;
    const [header, payload, signature] = parts;
    const expectedSig = crypto
      .createHmac("sha256", getAdminJwtSecret())
      .update(`${header}.${payload}`)
      .digest("base64url");

    if (signature !== expectedSig) return null;

    const jsonStr = safeBase64UrlDecode(payload);
    const data = JSON.parse(jsonStr);

    if (!data || typeof data !== "object") return null;

    // Must be unexpired
    if (!data.exp || typeof data.exp !== "number" || data.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    // Must strictly be admin role
    if (data.role !== "admin") {
      return null;
    }

    // Must have a valid username
    if (!data.username || typeof data.username !== "string") {
      return null;
    }

    return {
      username: data.username.trim(),
      role: "admin",
      name: data.name,
      id: data.id,
      exp: data.exp,
    };
  } catch {
    return null;
  }
}
