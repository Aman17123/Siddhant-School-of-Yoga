"use client";

import React from "react";
import Link from "next/link";
import { Blog, Category, CurrentUser } from "./types";
import { formatScheduledAt } from "../../lib/datetime";

interface DashboardOverviewProps {
  currentUser: CurrentUser;
  openWritePost: () => void;
  stats: {
    published: number;
    drafts: number;
    scheduled: number;
    totalViews: number;
  };
  statusFilter: "all" | "published" | "scheduled" | "draft";
  setStatusFilter: (filter: "all" | "published" | "scheduled" | "draft") => void;
  recentlyEdited: Blog[];
  openEditPost: (blog: Blog) => void;
  blog: Blog[];
  filteredblog: Blog[];
  categories: Category[];
  catFilter: string;
  setCatFilter: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedIds: number[];
  handleSelectAll: (checked: boolean) => void;
  handleSelectRow: (id: number, checked: boolean) => void;
  setPostToDelete: (blog: Blog) => void;
  handleBulkDraft: () => void;
  handleBulkDelete: () => void;
}

// Subscribing is pointless here — this is a static client/server split, not a
// changing store — but useSyncExternalStore needs a stable function identity.
const subscribeNever = () => () => {};

export default function DashboardOverview({
  currentUser,
  openWritePost,
  stats,
  statusFilter,
  setStatusFilter,
  recentlyEdited,
  openEditPost,
  blog,
  filteredblog,
  categories,
  catFilter,
  setCatFilter,
  searchQuery,
  setSearchQuery,
  selectedIds,
  handleSelectAll,
  handleSelectRow,
  setPostToDelete,
  handleBulkDraft,
  handleBulkDelete,
}: DashboardOverviewProps) {
  // A scheduled post needs its time visible, not just the day.
  //
  // The server renders dates in UTC and the browser in its own timezone, so the
  // pre-hydration markup must use UTC or React reports a mismatch. `hasHydrated`
  // is false for the server render and the hydration pass, then true — reading it
  // through useSyncExternalStore is how a component learns it is on the client
  // without touching a ref during render.
  const hasHydrated = React.useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false,
  );

  const formatListDate = (value: string | null | undefined) => {
    if (!value) return "Draft";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Draft";
    return hasHydrated
      ? formatScheduledAt(value)
      : date.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
          timeZone: "UTC",
        });
  };

  return (
    <div className="max-w-[1320px] mx-auto w-full">
      <div className="flex flex-wrap justify-between items-end gap-4 mb-7">
        <div>
          <h1 className="font-display text-section font-bold text-[#2A1621] leading-tight">
            Namaste, {currentUser?.name?.split(" ")[0] || "Admin"}
          </h1>
          <p className="text-body-sm text-[#6B5862] mt-1">Here’s how your yoga journal is doing this month.</p>
        </div>
        <button
          onClick={openWritePost}
          className="px-4 py-2 rounded-lg text-body-sm font-semibold bg-gradient-to-r from-[#1c3b2b] to-[#14291e] text-white hover:from-[#234b37] hover:to-[#1c3b2b] shadow-sm hover:shadow-md transition-all cursor-pointer"
        >
          Write a post
        </button>
      </div>

      {/* Stats: one joined strip, each cell links to a filtered list */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#e6ded2] border border-[#e6ded2] rounded-xl overflow-hidden mb-7 shadow-xs">
        <button
          type="button"
          className={`p-4 sm:p-5 text-left transition-colors cursor-pointer ${
            statusFilter === "published" ? "bg-[#1c3b2b]/10" : "bg-white hover:bg-[#FAF6F0]/60"
          }`}
          onClick={() => {
            setStatusFilter("published");
            document.getElementById("posts")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <p className="text-label font-bold text-[#6B5862] uppercase tracking-wider">Published</p>
          <strong className="block text-section font-bold tabular-nums mt-1 text-[#2A1621] font-display">
            {stats.published}
          </strong>
        </button>

        <button
          type="button"
          className={`p-4 sm:p-5 text-left transition-colors cursor-pointer ${
            statusFilter === "draft" ? "bg-[#1c3b2b]/10" : "bg-white hover:bg-[#FAF6F0]/60"
          }`}
          onClick={() => {
            setStatusFilter("draft");
            document.getElementById("posts")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <p className="text-label font-bold text-[#6B5862] uppercase tracking-wider">Drafts</p>
          <strong className="block text-section font-bold tabular-nums mt-1 text-[#2A1621] font-display">
            {stats.drafts}
          </strong>
        </button>

        <button
          type="button"
          className={`p-4 sm:p-5 text-left transition-colors cursor-pointer ${
            statusFilter === "scheduled" ? "bg-[#1c3b2b]/10" : "bg-white hover:bg-[#FAF6F0]/60"
          }`}
          onClick={() => {
            setStatusFilter("scheduled");
            document.getElementById("posts")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <p className="text-label font-bold text-[#6B5862] uppercase tracking-wider">Scheduled</p>
          <strong className="block text-section font-bold tabular-nums mt-1 text-[#2A1621] font-display">
            {stats.scheduled}
          </strong>
        </button>

        <div className="bg-white p-4 sm:p-5 text-left">
          <p className="text-label font-bold text-[#6B5862] uppercase tracking-wider">Views (30 days)</p>
          <strong className="block text-section font-bold tabular-nums mt-1 text-[#2A1621] font-display">
            {stats.totalViews.toLocaleString()}
          </strong>
        </div>
      </div>

      {/* Recently edited panel */}
      <section className="bg-white border border-[#e6ded2] rounded-xl shadow-xs overflow-hidden mb-9">
        <h2 className="px-4 py-3 border-b border-[#e6ded2] font-bold text-body-sm text-[#2A1621] flex justify-between items-center bg-[#FAF6F0]/60">
          <span>Recently edited</span>
          <a
            href="#posts"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("posts")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-label font-semibold text-[#1c3b2b] hover:underline"
          >
            See all
          </a>
        </h2>

        {recentlyEdited.length === 0 ? (
          <div className="p-8 text-center text-body-sm text-[#6B5862]/70 font-medium">
            No articles written yet. Click &ldquo;Write a post&rdquo; to begin!
          </div>
        ) : (
          recentlyEdited.map((p) => {
            const badgeCls =
              p.status === "published"
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : p.status === "scheduled"
                ? "bg-amber-50 text-amber-700 border-amber-200"
                : "bg-[#FAF6F0] text-[#6B5862] border-[#e6ded2]";
            const badgeText =
              p.status === "published"
                ? "Published"
                : p.status === "scheduled"
                ? "Scheduled"
                : "Draft";

            return (
              <div key={p.id} className="flex items-center gap-3.5 px-4 py-3 border-b border-[#e6ded2] last:border-b-0 text-body-sm hover:bg-[#FAF6F0]/30 transition-colors">
                <a
                  className="flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-[#2A1621] hover:text-[#1c3b2b] transition-colors"
                  href="#edit"
                  onClick={(e) => {
                    e.preventDefault();
                    openEditPost(p);
                  }}
                >
                  <b className="font-bold">{p.title}</b>
                </a>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-label text-[#6B5862] flex items-center gap-1 font-mono">
                    <svg className="w-3.5 h-3.5 text-[#1c3b2b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {(Number(p.views) || 0).toLocaleString()}
                  </span>
                  <span className={`text-label font-bold px-2.5 py-0.5 rounded-full border ${badgeCls}`}>
                    {badgeText}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </section>

      {/* ============ ALL POSTS ============ */}
      <div className="flex flex-wrap justify-between items-end gap-4 mb-4 mt-10" id="posts">
        <h2 className="font-display text-subsection font-bold text-[#2A1621]">All posts</h2>
      </div>

      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <div className="flex border-b border-[#e6ded2]" role="tablist" aria-label="Filter by status">
          <button
            className={`px-3.5 py-2 font-bold text-label uppercase tracking-wider transition-colors cursor-pointer relative ${
              statusFilter === "all"
                ? "text-[#1c3b2b] after:absolute after:left-0 after:right-0 after:-bottom-[1px] after:h-0.5 after:bg-[#1c3b2b]"
                : "text-[#6B5862] hover:text-[#1c3b2b]"
            }`}
            onClick={() => setStatusFilter("all")}
          >
            All ({blog.length})
          </button>
          <button
            className={`px-3.5 py-2 font-bold text-label uppercase tracking-wider transition-colors cursor-pointer relative ${
              statusFilter === "published"
                ? "text-[#1c3b2b] after:absolute after:left-0 after:right-0 after:-bottom-[1px] after:h-0.5 after:bg-[#1c3b2b]"
                : "text-[#6B5862] hover:text-[#1c3b2b]"
            }`}
            onClick={() => setStatusFilter("published")}
          >
            Published ({stats.published})
          </button>
          <button
            className={`px-3.5 py-2 font-bold text-label uppercase tracking-wider transition-colors cursor-pointer relative ${
              statusFilter === "scheduled"
                ? "text-[#1c3b2b] after:absolute after:left-0 after:right-0 after:-bottom-[1px] after:h-0.5 after:bg-[#1c3b2b]"
                : "text-[#6B5862] hover:text-[#1c3b2b]"
            }`}
            onClick={() => setStatusFilter("scheduled")}
          >
            Scheduled ({stats.scheduled})
          </button>
          <button
            className={`px-3.5 py-2 font-bold text-label uppercase tracking-wider transition-colors cursor-pointer relative ${
              statusFilter === "draft"
                ? "text-[#1c3b2b] after:absolute after:left-0 after:right-0 after:-bottom-[1px] after:h-0.5 after:bg-[#1c3b2b]"
                : "text-[#6B5862] hover:text-[#1c3b2b]"
            }`}
            onClick={() => setStatusFilter("draft")}
          >
            Drafts ({stats.drafts})
          </button>
        </div>

        <div className="flex gap-2.5 items-center flex-wrap">
          <select
            className="w-44 px-3 py-1.5 bg-white border border-[#e6ded2] rounded-lg text-body-sm text-[#2A1621] focus:outline-none focus:ring-2 focus:ring-[#1c3b2b]/20 focus:border-[#1c3b2b]"
            value={catFilter}
            onChange={(e) => setCatFilter(e.target.value)}
            aria-label="Category"
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>

          <input
            className="w-56 px-3 py-1.5 bg-white border border-[#e6ded2] rounded-lg text-body-sm text-[#2A1621] placeholder:text-[#6B5862]/50 focus:outline-none focus:ring-2 focus:ring-[#1c3b2b]/20 focus:border-[#1c3b2b]"
            type="search"
            placeholder="Search title or keyword"
            aria-label="Search posts"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white border border-[#e6ded2] rounded-xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-body-sm border-collapse">
            <thead>
              <tr>
                <th className="w-9 px-4 py-3 bg-[#FAF6F0]/60 border-b border-[#e6ded2]">
                  <input
                    type="checkbox"
                    className="rounded border-[#e6ded2] text-[#1c3b2b] focus:ring-[#1c3b2b]"
                    checked={
                      filteredblog.length > 0 &&
                      selectedIds.length === filteredblog.length
                    }
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    aria-label="Select all"
                  />
                </th>
                <th className="px-4 py-3 text-label uppercase tracking-wider font-bold text-[#6B5862] bg-[#FAF6F0]/60 border-b border-[#e6ded2]">Title</th>
                <th className="px-4 py-3 text-label uppercase tracking-wider font-bold text-[#6B5862] bg-[#FAF6F0]/60 border-b border-[#e6ded2]">Author</th>
                <th className="px-4 py-3 text-label uppercase tracking-wider font-bold text-[#6B5862] bg-[#FAF6F0]/60 border-b border-[#e6ded2]">Category</th>
                <th className="px-4 py-3 text-label uppercase tracking-wider font-bold text-[#6B5862] bg-[#FAF6F0]/60 border-b border-[#e6ded2]">Views</th>
                <th className="px-4 py-3 text-label uppercase tracking-wider font-bold text-[#6B5862] bg-[#FAF6F0]/60 border-b border-[#e6ded2]">Status</th>
                <th className="px-4 py-3 text-label uppercase tracking-wider font-bold text-[#6B5862] bg-[#FAF6F0]/60 border-b border-[#e6ded2]">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredblog.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-body-sm text-[#6B5862]/70 font-medium">
                    No posts match these filters.{" "}
                    <button
                      onClick={openWritePost}
                      className="text-[#1c3b2b] font-bold hover:underline cursor-pointer"
                    >
                      Write a post
                    </button>
                  </td>
                </tr>
              ) : (
                filteredblog.map((p) => {
                  const badgeCls =
                    p.status === "published"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : p.status === "scheduled"
                      ? "bg-amber-50 text-amber-700 border-amber-200"
                      : "bg-[#FAF6F0] text-[#6B5862] border-[#e6ded2]";
                  const badgeText =
                    p.status === "published"
                      ? "Published"
                      : p.status === "scheduled"
                      ? "Scheduled"
                      : "Draft";

                  // Scheduled rows show "5 Oct 2026, 6:00 pm" so the time is verifiable at a
                  // glance; the rest keep the plain date.
                  const dateStr = formatListDate(p.published_at);

                  const canDeletePost = true;

                  return (
                    <tr key={p.id} className="hover:bg-[#FAF6F0]/30 transition-colors">
                      <td className="px-4 py-3.5 border-b border-[#e6ded2] align-middle">
                        <input
                          type="checkbox"
                          className="rounded border-[#e6ded2] text-[#1c3b2b] focus:ring-[#1c3b2b]"
                          checked={selectedIds.includes(p.id)}
                          onChange={(e) => handleSelectRow(p.id, e.target.checked)}
                          aria-label={`Select ${p.title}`}
                        />
                      </td>
                      <td className="px-4 py-3.5 border-b border-[#e6ded2] align-middle">
                        <a
                          href="#edit"
                          onClick={(e) => {
                            e.preventDefault();
                            openEditPost(p);
                          }}
                          className="font-bold block text-[#2A1621] hover:text-[#1c3b2b] transition-colors"
                        >
                          {p.title}
                        </a>
                        <div className="text-label text-[#6B5862]/70 font-mono mt-0.5">/blog/{p.slug}</div>
                        <div className="flex gap-2.5 text-label mt-1">
                          <button
                            onClick={() => openEditPost(p)}
                            className="font-semibold text-[#1c3b2b] hover:underline cursor-pointer"
                          >
                            Edit
                          </button>
                          {canDeletePost && (
                            <button
                              onClick={() => setPostToDelete(p)}
                              className="font-semibold text-red-600 hover:underline cursor-pointer"
                            >
                              Delete
                            </button>
                          )}
                          <a
                            href={`/blog/${p.slug}/`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-teal-700 hover:underline"
                          >
                            View
                          </a>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 border-b border-[#e6ded2] align-middle text-label font-semibold text-[#2A1621]">
                        <span className="bg-[#FAF6F0] px-2 py-0.5 rounded border border-[#e6ded2] inline-block">
                          {p.author || "Admin"}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 border-b border-[#e6ded2] align-middle text-body-sm text-[#6B5862]">
                        {p.category_name || "General"}
                      </td>
                      <td className="px-4 py-3.5 border-b border-[#e6ded2] align-middle text-label font-semibold">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FAF6F0] border border-[#e6ded2] text-[#2A1621] font-mono">
                          <svg className="w-3.5 h-3.5 text-[#1c3b2b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          {(Number(p.views) || 0).toLocaleString()}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 border-b border-[#e6ded2] align-middle">
                        <span className={`text-label font-bold px-2.5 py-0.5 rounded-full border ${badgeCls}`}>
                          {badgeText}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 border-b border-[#e6ded2] align-middle text-label text-[#6B5862]/80">
                        {dateStr}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center px-4 py-3 text-label text-[#6B5862] border-t border-[#e6ded2] bg-[#FAF6F0]/50">
          <span>
            {filteredblog.length} of {blog.length} posts
          </span>
          <div className="flex gap-2">
            <button
              className="px-3.5 py-1.5 rounded-lg text-label font-semibold bg-white border border-[#e6ded2] text-[#2A1621] hover:bg-[#FAF6F0] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              onClick={handleBulkDraft}
              disabled={!selectedIds.length}
            >
              Move to draft
            </button>
            <button
              className="px-3.5 py-1.5 rounded-lg text-label font-semibold bg-white border border-red-200 text-red-600 hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              onClick={handleBulkDelete}
              disabled={!selectedIds.length}
            >
              Delete selected
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
