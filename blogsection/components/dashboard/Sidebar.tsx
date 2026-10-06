"use client";

import React from "react";
import Link from "next/link";
import { CurrentUser, getInitials } from "./types";

interface SidebarProps {
  view: "dashboard" | "editor" | "categories";
  setView: (view: "dashboard" | "editor" | "categories") => void;
  openWritePost: () => void;
  blogsCount: number;
  categoriesCount: number;
  currentUser: CurrentUser;
  onLogout: () => void;
}

export default function Sidebar({
  view,
  setView,
  openWritePost,
  blogsCount,
  categoriesCount,
  currentUser,
  onLogout,
}: SidebarProps) {
  return (
    <aside className="w-full lg:w-[250px] shrink-0 bg-[#16271e] text-white p-4 lg:p-5 flex flex-col lg:sticky lg:top-0 lg:h-screen z-30 border-b lg:border-b-0 lg:border-r border-[#1c3b2b] shadow-xl font-figtree">
      {/* Brand Header */}
      <div className="flex flex-col items-center pb-4 mb-4 border-b border-white/10 px-1">
        <button
          onClick={() => setView("dashboard")}
          className="flex items-center justify-center bg-white rounded-xl py-2 px-3.5 shadow-md border border-[#1c3b2b]/20 w-full hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 cursor-pointer"
          title="Siddhant School of Yoga Dashboard"
        >
          <img
            src="/logo/siddhant-logo.svg"
            alt="Siddhant School of Yoga Rishikesh"
            className="h-10 w-auto object-contain block"
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 flex-1 font-figtree" aria-label="Dashboard Navigation">
        {/* Dashboard Overview */}
        <button
          onClick={() => setView("dashboard")}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 text-left w-full cursor-pointer ${
            view === "dashboard"
              ? "bg-[#1c3b2b] text-white font-semibold shadow-md border border-[#4c7c65]/40"
              : "text-white/80 hover:bg-[#1c3b2b]/40 hover:text-white hover:translate-x-0.5 font-medium"
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
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/80 hover:bg-[#1c3b2b]/40 hover:text-white hover:translate-x-0.5 font-medium transition-all duration-150 text-left w-full cursor-pointer"
        >
          <svg className="w-[18px] h-[18px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 6h16M4 12h16M4 18h10" />
          </svg>
          <span>All posts</span>
          <em className="ml-auto text-xs font-bold bg-white/15 px-2 py-0.5 rounded-full not-italic text-white">
            {blogsCount}
          </em>
        </button>

        {/* Write a Post */}
        <button
          onClick={openWritePost}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 text-left w-full cursor-pointer ${
            view === "editor"
              ? "bg-[#b85c00] text-white font-semibold shadow-md"
              : "text-white/80 hover:bg-[#1c3b2b]/40 hover:text-white hover:translate-x-0.5 font-medium"
          }`}
        >
          <svg className="w-[18px] h-[18px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          <span>Write a post</span>
        </button>

        {/* Categories */}
        <button
          onClick={() => setView("categories")}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 text-left w-full cursor-pointer ${
            view === "categories"
              ? "bg-[#1c3b2b] text-white font-semibold shadow-md border border-[#4c7c65]/40"
              : "text-white/80 hover:bg-[#1c3b2b]/40 hover:text-white hover:translate-x-0.5 font-medium"
          }`}
        >
          <svg className="w-[18px] h-[18px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />
          </svg>
          <span>Categories</span>
          <em className="ml-auto text-xs font-bold bg-white/15 px-2 py-0.5 rounded-full not-italic text-white">
            {categoriesCount}
          </em>
        </button>

      </nav>

      {/* User Info & Footer */}
      <div className="border-t border-white/10 bg-white/5 rounded-xl p-3.5 mt-auto font-figtree">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <b className="flex items-center gap-2 text-white text-sm font-bold min-w-0">
            <span className="w-7 h-7 rounded-full bg-[#1c3b2b] border border-[#4c7c65]/50 inline-flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-sm">
              {getInitials(currentUser?.name || "Admin")}
            </span>
            <span className="truncate">{currentUser?.name || "Admin"}</span>
          </b>
          <span className="text-xs uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full border shrink-0 bg-amber-400/20 text-amber-300 border-amber-400/40">
            Admin
          </span>
        </div>

        <div className="text-xs text-white/50 font-mono pl-9 truncate mb-2">
          @{currentUser?.username || "admin"}
        </div>

        <div className="flex items-center gap-3 text-white/70 text-xs font-semibold pl-1">
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
