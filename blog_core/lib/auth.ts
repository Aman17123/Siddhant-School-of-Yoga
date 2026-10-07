import { cookies } from "next/headers";
import { query } from "./db";
import { getAdminCredentials } from "./env";
import {
  COOKIE_NAME,
  createToken,
  verifyToken,
  type AdminSession,
} from "./token";

export { COOKIE_NAME, createToken, verifyToken, type AdminSession };

export interface ValidatedUser {
  id: number;
  username: string;
  name: string;
  role: "admin";
  email?: string;
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function setAdminSession(
  user: { username: string; role?: string; name?: string; id?: number } | string
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

  // 1. Check MySQL users table - only Admin role is permitted
  try {
    const rows = await query<Array<{
      id: number;
      username: string;
      password: string;
      name: string;
      email: string;
      role: string;
    }>>(
      "SELECT id, username, password, name, email, role FROM `users` WHERE (`username` = ? OR LOWER(`username`) = LOWER(?)) AND `role` = 'admin' LIMIT 1",
      [trimmedUser, trimmedUser]
    );

    if (rows && rows.length > 0) {
      const user = rows[0];
      if (user.password === trimmedPass) {
        return {
          valid: true,
          user: {
            id: user.id,
            username: user.username,
            name: user.name || user.username,
            role: "admin",
            email: user.email || "",
          },
        };
      }
    }
  } catch (err) {
    console.error("[MySQL] User check error:", err);
  }

  // 2. Fallback to master admin env credentials
  const { username: expectedUser, password: expectedPass } = getAdminCredentials();

  if (trimmedUser.toLowerCase() === expectedUser.toLowerCase() && trimmedPass === expectedPass) {
    return {
      valid: true,
      user: {
        id: 1,
        username: expectedUser,
        name: "Administrator",
        role: "admin",
        email: "info@siddhantschoolofyoga.com",
      },
    };
  }

  return { valid: false };
}

export async function validateAdminCredentials(username: string, password: string): Promise<boolean> {
  const res = await validateUserCredentials(username, password);
  return res.valid;
}
