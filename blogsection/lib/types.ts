export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  parent_id?: number | null;
  meta_title?: string;
  meta_description?: string;
  blog_count?: number;
}

export interface FaqItem {
  id?: string;
  q: string;
  a: string;
}

/**
 * FAQ row as persisted in the database. Legacy rows use `question`/`answer`
 * while newer ones use `q`/`a`, so readers must accept both shapes.
 */
export interface FaqRow {
  q?: string | null;
  a?: string | null;
  question?: string | null;
  answer?: string | null;
}

/**
 * Error shape produced by the MySQL driver. `code` is the SQLSTATE-ish driver
 * error code (e.g. "23505" for a unique-key violation), which the API routes
 * branch on to return friendly conflict messages.
 */
export type AppError = Error & { code?: string };

/** The logged-in dashboard user, as returned by /api/auth/me. */
export interface CurrentUser {
  id: number;
  name: string;
  username: string;
  role: "admin" | "editor" | "author";
}

export interface Author {
  id: number;
  username: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "author";
  slug?: string;
  photo?: string;
  title?: string;
  bio?: string;
  experience_years?: number;
  instagram?: string;
  youtube?: string;
  yoga_alliance?: string;
  blog_count?: number;
}

export interface Blog {
  id: number;
  title: string;
  slug: string;
  category_id?: number | null;
  category_name?: string;
  featured_image?: string;
  featured_image_alt?: string;
  featured_image_title?: string;
  short_description?: string;
  content?: string;
  faqs?: FaqItem[] | string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  popular?: number | boolean;
  author?: string;
  published_at?: string;
  status: "published" | "draft" | "scheduled";
  views?: number;
  seo_score?: number;
  tags?: string[] | string;
  focus_keyword?: string;
  related_keywords?: string;
  tldr?: string;
  key_takeaways?: string;
  canonical_url?: string;
  conclusion?: string;
  schema_type?: string;
  created_at?: string;
  updated_at?: string;
}

export interface PostFormState {
  id: number;
  title: string;
  slug: string;
  slugTouched: boolean;
  category_id: string;
  category_name: string;
  featured_image: string;
  featured_image_alt: string;
  short_description: string;
  content: string;
  faqs: FaqItem[];
  focus_keyword: string;
  related_keywords: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  tldr: string;
  key_takeaways: string;
  schema_type: string;
  canonical_url: string;
  conclusion: string;
  author: string;
  published_at: string;
  status: "draft" | "published" | "scheduled";
  popular: boolean;
  views: number;
  seo_score: number;
  tags: string[];
  newTag: string;
  og_title: string;
  og_desc: string;
}

export interface CategoryFormState {
  id: number;
  name: string;
  slug: string;
  slugTouched: boolean;
  color: string;
  description: string;
  parent_id: string;
  meta_title: string;
  meta_description: string;
  isEditing: boolean;
}

export interface AuthorFormState {
  id: number;
  username: string;
  name: string;
  slug: string;
  slugTouched: boolean;
  email: string;
  role: "admin" | "editor" | "author";
  title: string;
  bio: string;
  experience_years: number;
  instagram: string;
  youtube: string;
  yoga_alliance: string;
  photo: string;
  password: string;
}

export const SWATCH_COLORS = ["#BF296A", "#00897b", "#c98a17", "#b8455a", "#4a5fa8", "#55636f"];

export const slugify = (text: string) => {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s-]+/g, "-");
};

export const getInitials = (name: string) => {
  return name
    .replace(/^Dr\.?\s+/i, "")
    .replace(/^Yogi\s+/i, "")
    .replace(/^Acharya\s+/i, "")
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
};
