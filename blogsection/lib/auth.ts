import crypto from "crypto";
import { cookies } from "next/headers";
import { supabase } from "./supabase";
import { getAdminCredentials, getAdminJwtSecret } from "./env";

const COOKIE_NAME = "blog_admin_token";

export interface AdminSession {
  username: string;
  role: "admin" | "editor" | "author";
  name?: string;
  id?: number;
  exp: number;
}

export interface ValidatedUser {
  id: number;
  username: string;
  name: string;
  role: "admin" | "editor" | "author";
  email?: string;
}

export function createToken(
  user: { username: string; role?: "admin" | "editor" | "author"; name?: string; id?: number } | string
): string {
  const exp = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60; // 7 days

  let payloadObj: {
    username: string;
    role: "admin" | "editor" | "author";
    name?: string;
    id?: number;
    exp: number;
  };

  if (typeof user === "string") {
    payloadObj = {
      username: user.trim(),
      role: "admin",
      exp,
    };
  } else {
    payloadObj = {
      username: user.username.trim(),
      role: user.role || "author",
      name: user.name,
      id: user.id,
      exp,
    };
  }

  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const payload = Buffer.from(JSON.stringify(payloadObj)).toString("base64url");
  const signature = crypto.createHmac("sha256", getAdminJwtSecret()).update(`${header}.${payload}`).digest("base64url");
  return `${header}.${payload}.${signature}`;
}

export function verifyToken(token: string): AdminSession | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const [header, payload, signature] = parts;
    const expectedSig = crypto.createHmac("sha256", getAdminJwtSecret()).update(`${header}.${payload}`).digest("base64url");
    if (signature !== expectedSig) return null;

    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf-8"));
    if (data.exp && data.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    return data as AdminSession;
  } catch {
    return null;
  }
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function setAdminSession(
  user: { username: string; role?: "admin" | "editor" | "author"; name?: string; id?: number } | string
) {
  const token = createToken(user);
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
  return token;
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function validateUserCredentials(
  username: string,
  password: string
): Promise<{ valid: boolean; user?: ValidatedUser }> {
  const trimmedUser = username.trim();
  const trimmedPass = password.trim();

  // 1. Try querying Supabase users table
  try {
    let { data: user, error } = await supabase
      .from("users")
      .select("id, username, password, name, email, role")
      .eq("username", trimmedUser)
      .single();

    if (error || !user) {
      // Try case-insensitive matching
      const { data: ilikeUser } = await supabase
        .from("users")
        .select("id, username, password, name, email, role")
        .ilike("username", trimmedUser)
        .limit(1);

      if (ilikeUser && ilikeUser[0]) {
        user = ilikeUser[0];
        error = null;
      }
    }

    if (!error && user) {
      if (user.password === trimmedPass) {
        return {
          valid: true,
          user: {
            id: user.id,
            username: user.username,
            name: user.name || user.username,
            role: (user.role as "admin" | "editor" | "author") || "author",
            email: user.email || "",
          },
        };
      }
    }
  } catch (err) {
    console.error("Supabase user check error:", err);
  }

  // 2. Fallback to master admin env credentials
  const { username: expectedUser, password: expectedPass } = getAdminCredentials();

  if (trimmedUser.toLowerCase() === expectedUser.toLowerCase() && trimmedPass === expectedPass) {
    return {
      valid: true,
      user: {
        id: 1,
        username: expectedUser,
        name: "Admin",
        role: "admin",
        email: "admin@sanskritiyogpeeth.org",
      },
    };
  }

  return { valid: false };
}

export async function validateAdminCredentials(username: string, password: string): Promise<boolean> {
  const res = await validateUserCredentials(username, password);
  return res.valid;
}
