"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";

// Section-wise Components matching blogection
import Sidebar from "../components/dashboard/Sidebar";
import DashboardOverview from "../components/dashboard/DashboardOverview";
import PostEditor from "../components/dashboard/PostEditor";
import CategoriesView from "../components/dashboard/CategoriesView";
import DeleteModals from "../components/dashboard/DeleteModals";
import Toast from "../components/dashboard/Toast";
import {
  Blog,
  Category,
  FaqItem,
  FaqRow,
  CurrentUser,
  SWATCH_COLORS,
  slugify,
  getInitials,
} from "../lib/types";
import { formatScheduledAt, localInputToIso, toDateTimeLocal } from "../lib/datetime";
import type { PostStatus } from "../lib/datetime";

type PostFormStatus = PostStatus;

export default function BlogDashboardPage() {
  const router = useRouter();

  // Navigation: "dashboard" | "editor" | "categories"
  const [view, setView] = useState<
    "dashboard" | "editor" | "categories"
  >("dashboard");
  const [authLoading, setAuthLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  // Data states
  const [blog, setblog] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [authors, setAuthors] = useState<string[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  // Filters & selection for posts table
  const [statusFilter, setStatusFilter] = useState<
    "all" | "published" | "scheduled" | "draft"
  >("all");
  const [catFilter, setCatFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // Toast
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Delete modals state
  const [postToDelete, setPostToDelete] = useState<Blog | null>(null);
  const [catToDelete, setCatToDelete] = useState<Category | null>(null);
  const [catMoveTarget, setCatMoveTarget] = useState<string>("");

  // Editor states
  const [saveState, setSaveState] = useState<
    "Saved" | "Unsaved changes" | "Saving..." | "All changes saved"
  >("Saved");
  const [activeEditorTab, setActiveEditorTab] = useState<
    "seo" | "social" | "faqs" | "ai" | "schema" | "adv"
  >("seo");
  const [quickCatOpen, setQuickCatOpen] = useState(false);
  const [quickCatName, setQuickCatName] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const rteRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Editor form state
  const [postForm, setPostForm] = useState({
    id: 0,
    title: "",
    slug: "",
    slugTouched: false,
    category_id: "",
    category_name: "",
    featured_image: "",
    featured_image_alt: "",
    short_description: "",
    content: "",
    faqs: [] as FaqItem[],
    focus_keyword: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    tldr: "",
    key_takeaways: "",
    schema_type: "post",
    canonical_url: "",
    conclusion: "",
    author: "Siddhant School of Yoga",
    published_at: "",
    status: "draft" as PostFormStatus,
    popular: false,
    views: 0,
    tags: ["yoga", "rishikesh"] as string[],
    newTag: "",
    og_title: "",
    og_desc: "",
  });

  // Category form state
  const [categoryForm, setCategoryForm] = useState({
    id: 0,
    name: "",
    slug: "",
    slugTouched: false,
    description: "",
    color: SWATCH_COLORS[0],
    meta_title: "",
    meta_description: "",
    isEditing: false,
  });
  const [catSearchQuery, setCatSearchQuery] = useState("");

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const getAuthHeaders = (extraHeaders?: Record<string, string>) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("blog_admin_token") : null;
    const headers: Record<string, string> = { ...extraHeaders };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
      headers["x-auth-token"] = token;
    }
    return headers;
  };

  // Declared before the auth effect below that invokes it, so it is never
  // referenced from the temporal dead zone.
  const loadData = async () => {
    setLoadingData(true);
    try {
      const headers = getAuthHeaders();
      const [bRes, cRes, aRes] = await Promise.all([
        fetch("/api/blog/posts", { headers, credentials: "include" }),
        fetch("/api/blog/categories", { headers, credentials: "include" }),
        fetch("/api/blog/authors", { headers, credentials: "include" }),
      ]);
      const bData = await bRes.json();
      const cData = await cRes.json();
      const aData = await aRes.json();

      if (bData.success) setblog(bData.blog || []);
      if (cData.success) setCategories(cData.categories || []);
      if (aData.success) setAuthors(aData.authors || []);
    } catch {
      showToast("Error loading data from database");
    } finally {
      setLoadingData(false);
    }
  };

  // Auth check
  useEffect(() => {
    async function checkAuth() {
      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("blog_admin_token") : null;
        const headers: Record<string, string> = {};
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
          headers["x-auth-token"] = token;
        }
        const res = await fetch("/api/auth/me", { headers });
        const data = await res.json();
        if (!res.ok || !data.authenticated) {
          router.replace("/blog/dashboard/login");
          return;
        }
        setCurrentUser(data.user);
        setAuthLoading(false);
        loadData();
      } catch {
        router.replace("/blog/dashboard/login");
      }
    }
    checkAuth();
  }, [router]);

  // Protect Admin-only views against URL / client manipulation.
  const ADMIN_ONLY_VIEWS = ["categories"];
  const lastRoleRef = useRef(currentUser?.role);
  if (currentUser?.role !== lastRoleRef.current) {
    lastRoleRef.current = currentUser?.role;
    if (currentUser && currentUser.role !== "admin" && ADMIN_ONLY_VIEWS.includes(view)) {
      setView("dashboard");
    }
  }

  const handleLogout = async () => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("blog_admin_token") : null;
      const headers: Record<string, string> = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
        headers["x-auth-token"] = token;
      }
      await fetch("/api/auth/logout", { method: "POST", headers });
      try { localStorage.removeItem("blog_admin_token"); } catch {}
      router.replace("/blog/dashboard/login");
    } catch {
      try { localStorage.removeItem("blog_admin_token"); } catch {}
      router.replace("/blog/dashboard/login");
    }
  };

  // Only Admin can access dashboard; all posts are visible
  const roleblog = blog;

  // Metrics calculation
  const stats = useMemo(() => {
    const published = roleblog.filter((b) => b.status === "published").length;
    const drafts = roleblog.filter((b) => b.status === "draft").length;
    const scheduled = roleblog.filter((b) => b.status === "scheduled").length;
    const totalViews = roleblog.reduce((acc, b) => acc + (b.views || 0), 0);
    return { published, drafts, scheduled, totalViews };
  }, [roleblog]);

  // Recently edited list (first 4 blog)
  const recentlyEdited = useMemo(() => {
    return roleblog.slice(0, 4);
  }, [roleblog]);

  // Filtered blog for table
  const filteredblog = useMemo(() => {
    return roleblog.filter((p) => {
      const matchesStatus = statusFilter === "all" || p.status === statusFilter;
      const matchesCat =
        !catFilter ||
        p.category_name === catFilter ||
        String(p.category_id) === catFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        (p.title || "").toLowerCase().includes(q) ||
        (p.slug || "").toLowerCase().includes(q) ||
        (p.author || "").toLowerCase().includes(q) ||
        (p.focus_keyword || "").toLowerCase().includes(q);

      return matchesStatus && matchesCat && matchesQuery;
    });
  }, [roleblog, statusFilter, catFilter, searchQuery]);

  // Handle open editor for write
  const openWritePost = () => {
    const defaultCat = categories[0];
    const defaultAuthor = currentUser?.name || "Siddhant School of Yoga";

    setPostForm({
      id: 0,
      title: "",
      slug: "",
      slugTouched: false,
      category_id: defaultCat ? String(defaultCat.id) : "",
      category_name: defaultCat ? defaultCat.name : "General",
      featured_image: "",
      featured_image_alt: "",
      short_description: "",
      content: "",
      faqs: [
        {
          q: "Can beginners do this practice daily?",
          a: "Yes. Start with slow rounds and listen to your breath and body cues.",
        },
        {
          q: "What is the best time to practise?",
          a: "Early morning on an empty stomach or 3 hours after a meal.",
        },
      ],
      focus_keyword: "",
      meta_title: "",
      meta_description: "",
      meta_keywords: "",
      tldr: "",
      key_takeaways: "",
      schema_type: "post",
      canonical_url: "",
      conclusion: "",
      author: defaultAuthor,
      published_at: "",
      status: "draft",
      popular: false,
      views: 0,
      tags: [],
      newTag: "",
      og_title: "",
      og_desc: "",
    });
    if (rteRef.current) rteRef.current.innerHTML = "";
    setSaveState("Saved");
    setView("editor");
  };

  // Handle open editor for existing blog
  const openEditPost = (b: Blog) => {
    let parsedFaqs: FaqItem[] = [];
    if (Array.isArray(b.faqs)) {
      parsedFaqs = b.faqs.map((f: FaqRow) => ({
        q: f.q || f.question || "",
        a: f.a || f.answer || "",
      }));
    } else if (typeof b.faqs === "string") {
      try {
        const raw = JSON.parse(b.faqs);
        if (Array.isArray(raw)) {
          parsedFaqs = raw.map((f: FaqRow) => ({
            q: f.q || f.question || "",
            a: f.a || f.answer || "",
          }));
        }
      } catch {}
    }

    let parsedTags: string[] = ["yoga", "rishikesh"];
    if (Array.isArray(b.tags)) {
      parsedTags = b.tags;
    } else if (typeof b.tags === "string") {
      try {
        parsedTags = JSON.parse(b.tags);
      } catch {
        parsedTags = b.tags
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      }
    }

    setPostForm({
      id: b.id,
      title: b.title || "",
      slug: b.slug || "",
      slugTouched: true,
      category_id: b.category_id ? String(b.category_id) : "",
      category_name: b.category_name || "General",
      featured_image: b.featured_image || "",
      featured_image_alt: b.featured_image_alt || "",
      short_description: b.short_description || "",
      content: b.content || "",
      faqs: parsedFaqs.length
        ? parsedFaqs
        : [
            {
              q: "Can beginners do this practice daily?",
              a: "Yes. Start with slow rounds and listen to your breath and body cues.",
            },
          ],
      focus_keyword: b.focus_keyword || "",
      meta_title: b.meta_title || b.title || "",
      meta_description: b.meta_description || b.short_description || "",
      meta_keywords: b.meta_keywords || "",
      tldr: b.tldr || "",
      key_takeaways: b.key_takeaways || "",
      schema_type: b.schema_type || "post",
      canonical_url: b.canonical_url || "",
      conclusion: b.conclusion || "",
      author: b.author || currentUser?.name || "Siddhant School of Yoga",
      // Local wall clock, not UTC — the input is a timezone-less datetime-local.
      published_at: toDateTimeLocal(b.published_at),
      status: b.status || "draft",
      popular: !!b.popular,
      views: b.views || 0,
      tags: parsedTags,
      newTag: "",
      og_title: "",
      og_desc: "",
    });

    if (rteRef.current) {
      rteRef.current.innerHTML = b.content || "";
    }
    setSaveState("Saved");
    setView("editor");
  };

  // Live word count for editor
  const wordCount = useMemo(() => {
    const raw = (postForm.content || "").replace(/<[^>]+>/g, " ").trim();
    const words = raw ? raw.split(/\s+/).filter(Boolean).length : 0;
    const mins = Math.max(1, Math.round(words / 220));
    return { words, mins };
  }, [postForm.content]);

  // Rich Text Editor formatting commands
  const handleRteCommand = (
    command: string,
    value: string | undefined = undefined,
  ) => {
    if (command === "createLink") {
      const url = prompt("Enter Link URL (e.g. https://...):");
      if (url) document.execCommand("createLink", false, url);
    } else {
      document.execCommand(command, false, value || "");
    }
    if (rteRef.current) {
      setPostForm((prev) => ({
        ...prev,
        content: rteRef.current?.innerHTML || "",
      }));
      setSaveState("Unsaved changes");
    }
  };

  // Save post handler (draft / published / scheduled)
  const handleSavePost = async (targetStatus?: "draft" | "published") => {
    if (!postForm.title.trim()) {
      showToast("Please add a title for your post");
      return;
    }

    setSaveState("Saving...");

    const cleanSlug = postForm.slug
      ? slugify(postForm.slug)
      : slugify(postForm.title);
    const selectedCat = categories.find(
      (c) => String(c.id) === String(postForm.category_id),
    );

    const contentHtml = rteRef.current
      ? rteRef.current.innerHTML
      : postForm.content;
    const payload = {
      ...postForm,
      slug: cleanSlug,
      content: contentHtml,
      category_name: selectedCat?.name || postForm.category_name || "General",
      // Only "draft" is sent verbatim; the server decides scheduled vs
      // published against its own clock, so a wrong client timezone can no
      // longer publish early or leave a post stuck as scheduled.
      status: targetStatus === "draft" ? "draft" : "published",
      // Resolved to an absolute instant here, in the browser's timezone.
      published_at: localInputToIso(postForm.published_at),
    };

    try {
      const url =
        postForm.id === 0
          ? "/api/blog/posts"
          : `/api/blog/posts/${postForm.id}`;
      const method = postForm.id === 0 ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: getAuthHeaders({ "Content-Type": "application/json" }),
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        const savedStatus: PostFormStatus = data.status || data.blog?.status || "draft";
        const savedId = Number(data.id || data.blog?.id || postForm.id);
        setPostForm((prev) => ({
          ...prev,
          id: savedId > 0 ? savedId : prev.id,
          status: savedStatus,
          slug: cleanSlug,
        }));
        setSaveState("All changes saved");
        showToast(
          savedStatus === "scheduled"
            ? `Post scheduled for ${formatScheduledAt(data.published_at || data.blog?.published_at)}`
            : savedStatus === "published"
              ? "Post published!"
              : "Draft saved!",
        );
        loadData();
      } else {
        setSaveState("Unsaved changes");
        showToast(data.message || "Failed to save post");
      }
    } catch {
      setSaveState("Unsaved changes");
      showToast("Server error while saving");
    }
  };

  // Image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const token = typeof window !== "undefined" ? localStorage.getItem("blog_admin_token") : null;
      const headers: Record<string, string> = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
        headers["x-auth-token"] = token;
      }
      const res = await fetch("/api/blog/upload", { method: "POST", body: fd, headers });
      const data = await res.json();
      if (res.ok && data.success && data.url) {
        setPostForm((prev) => ({
          ...prev,
          featured_image: data.url,
          featured_image_alt:
            prev.featured_image_alt ||
            file.name.replace(/\.[^/.]+$/, "").replace(/[-_]+/g, " "),
        }));
        setSaveState("Unsaved changes");
        showToast("Featured image uploaded!");
      } else {
        showToast(data.message || "Upload failed");
      }
    } catch {
      showToast("Failed to upload image");
    } finally {
      setUploadingImage(false);
      if (e.target) e.target.value = "";
    }
  };

  // Quick add category
  const handleQuickAddCat = async () => {
    const name = quickCatName.trim();
    if (!name) return;
    try {
      const slug = slugify(name);
      const res = await fetch("/api/blog/categories", {
        method: "POST",
        headers: getAuthHeaders({ "Content-Type": "application/json" }),
        credentials: "include",
        body: JSON.stringify({ name, slug, color: SWATCH_COLORS[0] }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast(`Category “${name}” added`);
        setQuickCatName("");
        setQuickCatOpen(false);
        loadData();
        const newCatId = data.id || data.category?.id;
        setPostForm((prev) => ({
          ...prev,
          category_id: String(newCatId || prev.category_id),
          category_name: name,
        }));
      } else {
        showToast(data.message || "Could not add category");
      }
    } catch {
      showToast("Error adding category");
    }
  };

  // Tags management
  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const val = postForm.newTag.trim().replace(/,$/, "").toLowerCase();
      if (val && !postForm.tags.includes(val)) {
        setPostForm((prev) => ({
          ...prev,
          tags: [...prev.tags, val],
          newTag: "",
        }));
        setSaveState("Unsaved changes");
      }
    }
  };

  const handleRemoveTag = (idx: number) => {
    setPostForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== idx),
    }));
    setSaveState("Unsaved changes");
  };

  // FAQs management
  const handleAddFaq = () => {
    setPostForm((prev) => ({
      ...prev,
      faqs: [...(Array.isArray(prev.faqs) ? prev.faqs : []), { q: "", a: "" }],
    }));
    setSaveState("Unsaved changes");
  };

  const handleFaqChange = (index: number, key: "q" | "a", val: string) => {
    setPostForm((prev) => {
      const copy = Array.isArray(prev.faqs) ? [...prev.faqs] : [];
      if (!copy[index]) copy[index] = { q: "", a: "" };
      copy[index][key] = val;
      return { ...prev, faqs: copy };
    });
    setSaveState("Unsaved changes");
  };

  const handleMoveFaq = (index: number, dir: -1 | 1) => {
    setPostForm((prev) => {
      const copy = Array.isArray(prev.faqs) ? [...prev.faqs] : [];
      const target = index + dir;
      if (target < 0 || target >= copy.length) return prev;
      const temp = copy[index];
      copy[index] = copy[target];
      copy[target] = temp;
      return { ...prev, faqs: copy };
    });
    setSaveState("Unsaved changes");
  };

  const handleRemoveFaq = (index: number) => {
    setPostForm((prev) => ({
      ...prev,
      faqs: (Array.isArray(prev.faqs) ? prev.faqs : []).filter(
        (_, i) => i !== index,
      ),
    }));
    setSaveState("Unsaved changes");
  };

  // Bulk actions
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredblog.map((b) => b.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((x) => x !== id));
    }
  };

  const handleBulkDraft = async () => {
    if (!selectedIds.length) {
      showToast("Select posts first");
      return;
    }
    try {
      // PATCH, not PUT: PUT rebuilds the whole row from the body, so sending only
      // a title and status would blank content, images, tags and views.
      const results = await Promise.all(
        selectedIds.map((id) =>
          fetch(`/api/blog/posts/${id}`, {
            method: "PATCH",
            headers: getAuthHeaders({ "Content-Type": "application/json" }),
            credentials: "include",
            body: JSON.stringify({ status: "draft" }),
          }).then((res) =>
            res.json().then((data) => ({ ok: res.ok && data.success, data })),
          ),
        ),
      );

      const failed = results.filter((r) => !r.ok).length;
      const moved = results.length - failed;

      if (moved > 0) {
        showToast(
          `${moved} post${moved === 1 ? "" : "s"} moved to draft`,
        );
      }
      if (failed > 0) {
        const reason = results.find((r) => !r.ok)?.data?.message;
        showToast(
          reason
            ? `${failed} post${failed === 1 ? "" : "s"} could not be moved: ${reason}`
            : `${failed} post${failed === 1 ? "" : "s"} could not be moved to draft`,
        );
      }

      setSelectedIds([]);
      loadData();
    } catch {
      showToast("Error updating posts");
    }
  };

  const handleBulkDelete = async () => {
    if (!selectedIds.length) {
      showToast("Select posts first");
      return;
    }
    if (confirm(`Delete ${selectedIds.length} post(s) permanently?`)) {
      try {
        await Promise.all(
          selectedIds.map((id) =>
            fetch(`/api/blog/posts/${id}`, {
              method: "DELETE",
              headers: getAuthHeaders(),
              credentials: "include",
            }),
          ),
        );
        showToast(`${selectedIds.length} post(s) deleted`);
        setSelectedIds([]);
        loadData();
      } catch {
        showToast("Error deleting posts");
      }
    }
  };

  // Delete single post
  const confirmDeletePost = async () => {
    if (!postToDelete) return;
    try {
      const res = await fetch(`/api/blog/posts/${postToDelete.id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
        credentials: "include",
      });
      if (res.ok) {
        showToast("Post deleted");
        setPostToDelete(null);
        loadData();
      } else {
        showToast("Delete failed");
      }
    } catch {
      showToast("Error deleting post");
    }
  };

  // Category management handlers
  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryForm.name.trim()) {
      showToast("Give the category a name");
      return;
    }

    const cleanSlug = categoryForm.slug
      ? slugify(categoryForm.slug)
      : slugify(categoryForm.name);
    const payload = {
      name: categoryForm.name.trim(),
      slug: cleanSlug,
      description: categoryForm.description,
      color: categoryForm.color,
      parent_id: null,
      meta_title: categoryForm.meta_title,
      meta_description: categoryForm.meta_description,
    };

    try {
      const url = categoryForm.isEditing
        ? `/api/blog/categories/${categoryForm.id}`
        : "/api/blog/categories";
      const method = categoryForm.isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: getAuthHeaders({ "Content-Type": "application/json" }),
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast(
          categoryForm.isEditing ? "Category updated" : "Category added",
        );
        resetCategoryForm();
        loadData();
      } else {
        showToast(data.message || "Failed to save category");
      }
    } catch {
      showToast("Error saving category");
    }
  };

  const resetCategoryForm = () => {
    setCategoryForm({
      id: 0,
      name: "",
      slug: "",
      slugTouched: false,
      description: "",
      color: SWATCH_COLORS[0],
      meta_title: "",
      meta_description: "",
      isEditing: false,
    });
  };

  const handleEditCategory = (c: Category) => {
    setCategoryForm({
      id: c.id,
      name: c.name,
      slug: c.slug,
      slugTouched: true,
      description: c.description || "",
      color: c.color || SWATCH_COLORS[0],
      meta_title: c.meta_title || "",
      meta_description: c.meta_description || "",
      isEditing: true,
    });
  };

  const confirmDeleteCategory = async () => {
    if (!catToDelete) return;
    try {
      const deleteUrl = catMoveTarget
        ? `/api/blog/categories/${catToDelete.id}?moveToCategoryId=${encodeURIComponent(catMoveTarget)}`
        : `/api/blog/categories/${catToDelete.id}`;
      const res = await fetch(deleteUrl, {
        method: "DELETE",
        headers: getAuthHeaders(),
        credentials: "include",
      });
      if (res.ok) {
        showToast("Category deleted");
        setCatToDelete(null);
        setCatMoveTarget("");
        loadData();
      } else {
        showToast("Delete category failed");
      }
    } catch {
      showToast("Error deleting category");
    }
  };

  if (authLoading || !currentUser) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#16271e] text-white font-sans">
        <div className="text-center flex flex-col items-center gap-4">
          <div className="bg-white px-6 py-3 rounded-xl shadow-2xl border border-white/20">
            <img
              src="/logo/siddhant-logo.svg"
              alt="Siddhant School of Yoga"
              className="h-10 w-auto object-contain"
            />
          </div>
          <p className="text-body-sm text-[#FAF6F0]/80 font-medium font-figtree">
            Loading Blog Admin...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#2A1621] font-sans antialiased">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* ===================== SIDEBAR ===================== */}
        <Sidebar
          view={view}
          setView={setView}
          openWritePost={openWritePost}
          blogCount={roleblog.length}
          categoriesCount={categories.length}
          currentUser={currentUser}
          onLogout={handleLogout}
        />

        {/* ===================== MAIN CONTENT AREA ===================== */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
          {/* VIEW 1: DASHBOARD */}
          {view === "dashboard" && (
            <DashboardOverview
              currentUser={currentUser}
              openWritePost={openWritePost}
              stats={stats}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              recentlyEdited={recentlyEdited}
              openEditPost={openEditPost}
              blog={blog}
              filteredblog={filteredblog}
              categories={categories}
              catFilter={catFilter}
              setCatFilter={setCatFilter}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedIds={selectedIds}
              handleSelectAll={handleSelectAll}
              handleSelectRow={handleSelectRow}
              setPostToDelete={setPostToDelete}
              handleBulkDraft={handleBulkDraft}
              handleBulkDelete={handleBulkDelete}
            />
          )}

          {/* VIEW 2: EDITOR */}
          {view === "editor" && (
            <PostEditor
              currentUser={currentUser}
              authors={authors}
              postForm={postForm}
              setPostForm={setPostForm}
              saveState={saveState}
              setSaveState={setSaveState}
              setView={setView}
              activeEditorTab={activeEditorTab}
              setActiveEditorTab={setActiveEditorTab}
              wordCount={wordCount}
              rteRef={rteRef}
              fileInputRef={fileInputRef}
              categories={categories}
              handleRteCommand={handleRteCommand}
              handleSavePost={handleSavePost}
              handleFaqChange={handleFaqChange}
              handleMoveFaq={handleMoveFaq}
              handleRemoveFaq={handleRemoveFaq}
              handleAddFaq={handleAddFaq}
              handleImageUpload={handleImageUpload}
              uploadingImage={uploadingImage}
              handleAddTag={handleAddTag}
              handleRemoveTag={handleRemoveTag}
              quickCatOpen={quickCatOpen}
              setQuickCatOpen={setQuickCatOpen}
              quickCatName={quickCatName}
              setQuickCatName={setQuickCatName}
              handleQuickAddCat={handleQuickAddCat}
            />
          )}

          {/* VIEW 3: CATEGORIES (ADMIN ONLY) */}
          {view === "categories" && currentUser?.role === "admin" && (
            <CategoriesView
              categories={categories}
              categoryForm={categoryForm}
              setCategoryForm={setCategoryForm}
              handleCategorySubmit={handleCategorySubmit}
              resetCategoryForm={resetCategoryForm}
              handleEditCategory={handleEditCategory}
              setCatToDelete={setCatToDelete}
              catSearchQuery={catSearchQuery}
              setCatSearchQuery={setCatSearchQuery}
              blog={blog}
              setCatFilter={setCatFilter}
              setView={setView}
            />
          )}

        </main>

        {/* ===================== DELETE MODALS ===================== */}
        <DeleteModals
          postToDelete={postToDelete}
          setPostToDelete={setPostToDelete}
          confirmDeletePost={confirmDeletePost}
          catToDelete={catToDelete}
          setCatToDelete={setCatToDelete}
          catMoveTarget={catMoveTarget}
          setCatMoveTarget={setCatMoveTarget}
          categories={categories}
          confirmDeleteCategory={confirmDeleteCategory}
        />

        {/* ===================== TOAST NOTIFICATION ===================== */}
        <Toast toastMsg={toastMsg} />
      </div>
    </div>
  );
}
