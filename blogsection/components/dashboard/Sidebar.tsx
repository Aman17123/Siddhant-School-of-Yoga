"use client";

import React from "react";
import Link from "next/link";
import { CurrentUser, getInitials } from "./types";

interface SidebarProps {
  view: "dashboard" | "editor" | "categories" | "authors" | "logs";
  setView: (view: "dashboard" | "editor" | "categories" | "authors" | "logs") => void;
  openWritePost: () => void;
  blogsCount: number;
  categoriesCount: number;
  authorsCount: number;
  currentUser: CurrentUser;
  onLogout: () => void;
}

export default function Sidebar({
  view,
  setView,
  openWritePost,
  blogsCount,
  categoriesCount,
  authorsCount,
  currentUser,
  onLogout,
}: SidebarProps) {
  const role = currentUser?.role || "author";
  const isAdmin = role === "admin";
  const isEditor = role === "editor";
  const isAuthor = role === "author";

  const roleLabel = isAdmin ? "Admin" : isEditor ? "Editor" : "Author";
  const roleBadgeCls = isAdmin
    ? "bg-amber-400/20 text-amber-300 border-amber-400/40"
    : isEditor
    ? "bg-[#BF296A]/30 text-[#f5a3cb] border-[#BF296A]/50"
    : "bg-teal-400/20 text-teal-300 border-teal-400/40";

  return (
    <aside className="w-full lg:w-[250px] shrink-0 bg-gradient-to-b from-[#241711] to-[#170d09] text-white p-4 lg:p-5 flex flex-col lg:sticky lg:top-0 lg:h-screen z-30 border-b lg:border-b-0 lg:border-r border-[#BF296A]/25 shadow-xl">
      {/* Brand Header */}
      <div className="flex flex-col items-center pb-4 mb-4 border-b border-white/10 px-1">
        <button
          onClick={() => setView("dashboard")}
          className="flex items-center justify-center bg-white rounded-xl py-2 px-3.5 shadow-md border border-[#BF296A]/20 w-full hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 cursor-pointer"
          title="Sanskriti Yogpeeth Dashboard"
        >
          <img
            src="/images/branding/logo1.webp"
            alt="Sanskriti Yogpeeth Rishikesh"
            className="h-9 w-auto object-contain block"
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 flex-1" aria-label="Dashboard Navigation">
        {/* Dashboard Overview */}
        <button
          onClick={() => setView("dashboard")}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-body-sm transition-all duration-150 text-left w-full cursor-pointer ${
            view === "dashboard"
              ? "bg-gradient-to-r from-[#BF296A] to-[#951248] text-white font-bold shadow-md shadow-[#BF296A]/30"
              : "text-white/75 hover:bg-[#BF296A]/20 hover:text-white hover:translate-x-0.5 font-medium"
          }`}
        >
          <svg className="w-[18px] h-[18px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12l9-8 9 8M5 10v10h14V10" />
          </svg>
          <span>Dashboard</span>
        </button>

        {/* All Posts */}
        <button
          onClick={() => {
            setView("dashboard");
            setTimeout(() => {
              document.getElementById("posts")?.scrollIntoView({ behavior: "smooth" });
            }, 100);
          }}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-body-sm text-white/75 hover:bg-[#BF296A]/20 hover:text-white hover:translate-x-0.5 font-medium transition-all duration-150 text-left w-full cursor-pointer"
        >
          <svg className="w-[18px] h-[18px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 6h16M4 12h16M4 18h10" />
          </svg>
          <span>{isAuthor ? "My posts" : "All posts"}</span>
          <em className="ml-auto text-label font-bold bg-white/15 px-2 py-0.5 rounded-full not-italic text-white">
            {blogsCount}
          </em>
        </button>

        {/* Write a Post */}
        <button
          onClick={openWritePost}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-body-sm transition-all duration-150 text-left w-full cursor-pointer ${
            view === "editor"
              ? "bg-gradient-to-r from-[#BF296A] to-[#951248] text-white font-bold shadow-md shadow-[#BF296A]/30"
              : "text-white/75 hover:bg-[#BF296A]/20 hover:text-white hover:translate-x-0.5 font-medium"
          }`}
        >
          <svg className="w-[18px] h-[18px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          <span>Write a post</span>
        </button>

        {/* Categories: ADMIN ONLY */}
        {isAdmin && (
          <button
            onClick={() => setView("categories")}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-body-sm transition-all duration-150 text-left w-full cursor-pointer ${
              view === "categories"
                ? "bg-gradient-to-r from-[#BF296A] to-[#951248] text-white font-bold shadow-md shadow-[#BF296A]/30"
                : "text-white/75 hover:bg-[#BF296A]/20 hover:text-white hover:translate-x-0.5 font-medium"
            }`}
          >
            <svg className="w-[18px] h-[18px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />
            </svg>
            <span>Categories</span>
            <em className="ml-auto text-label font-bold bg-white/15 px-2 py-0.5 rounded-full not-italic text-white">
              {categoriesCount}
            </em>
          </button>
        )}

        {/* Authors Management: ADMIN ONLY */}
        {isAdmin && (
          <button
            onClick={() => setView("authors")}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-body-sm transition-all duration-150 text-left w-full cursor-pointer ${
              view === "authors"
                ? "bg-gradient-to-r from-[#BF296A] to-[#951248] text-white font-bold shadow-md shadow-[#BF296A]/30"
                : "text-white/75 hover:bg-[#BF296A]/20 hover:text-white hover:translate-x-0.5 font-medium"
            }`}
          >
            <svg className="w-[18px] h-[18px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11a4 4 0 100-8 4 4 0 000 8zM2 21a7 7 0 0114 0M16 3.5a4 4 0 010 7.5M22 21a7 7 0 00-4-6.3" />
            </svg>
            <span>Authors & Users</span>
            <em className="ml-auto text-label font-bold bg-white/15 px-2 py-0.5 rounded-full not-italic text-white">
              {authorsCount}
            </em>
          </button>
        )}

        {/* Login Activity Logs: ADMIN ONLY */}
        {isAdmin && (
          <button
            onClick={() => setView("logs")}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-body-sm transition-all duration-150 text-left w-full cursor-pointer ${
              view === "logs"
                ? "bg-gradient-to-r from-[#BF296A] to-[#951248] text-white font-bold shadow-md shadow-[#BF296A]/30"
                : "text-white/75 hover:bg-[#BF296A]/20 hover:text-white hover:translate-x-0.5 font-medium"
            }`}
          >
            <svg className="w-[18px] h-[18px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>Login Activity</span>
          </button>
        )}
      </nav>

      {/* User Info & Footer */}
      <div className="border-t border-[#BF296A]/25 bg-white/5 rounded-xl p-3.5 mt-auto">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <b className="flex items-center gap-2 text-white text-body-sm font-bold min-w-0">
            <span className="w-7 h-7 rounded-full bg-gradient-to-br from-[#BF296A] to-[#951248] inline-flex items-center justify-center text-label font-bold text-white shrink-0 shadow-sm">
              {getInitials(currentUser?.name || "User")}
            </span>
            <span className="truncate">{currentUser?.name || "Admin"}</span>
          </b>
          <span className={`text-label uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full border shrink-0 ${roleBadgeCls}`}>
            {roleLabel}
          </span>
        </div>

        <div className="text-label text-white/50 font-mono pl-9 truncate mb-2">
          @{currentUser?.username || "admin"}
        </div>

        <div className="flex items-center gap-3 text-[#e2c1cf] text-label font-semibold pl-1">
          <Link href="/blog" target="_blank" className="hover:text-white transition-colors underline">
            View blog
          </Link>
          <span>·</span>
          <button onClick={onLogout} className="hover:text-white transition-colors cursor-pointer">
            Sign out
          </button>
        </div>
      </div>
    </aside>
  );
}
