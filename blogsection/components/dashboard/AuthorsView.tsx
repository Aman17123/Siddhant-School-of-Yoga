"use client";

import React from "react";
import { Author, Blog, AuthorFormState, slugify, getInitials } from "./types";

interface AuthorsViewProps {
  authors: Author[];
  filteredAuthors: Author[];
  authorRoleFilter: string;
  setAuthorRoleFilter: (role: string) => void;
  openAuthorDrawer: (author?: Author) => void;
  closeAuthorDrawer: () => void;
  authorDrawerOpen: boolean;
  authorForm: AuthorFormState;
  setAuthorForm: React.Dispatch<React.SetStateAction<AuthorFormState>>;
  handleAuthorSubmit: (e: React.FormEvent) => void;
  handleAuthorPhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  uploadingAuthorPhoto: boolean;
  authorPhotoInputRef: React.RefObject<HTMLInputElement | null>;
  setAuthorToDelete: (author: Author) => void;
  blogs: Blog[];
}

export default function AuthorsView({
  authors,
  filteredAuthors,
  authorRoleFilter,
  setAuthorRoleFilter,
  openAuthorDrawer,
  closeAuthorDrawer,
  authorDrawerOpen,
  authorForm,
  setAuthorForm,
  handleAuthorSubmit,
  handleAuthorPhotoUpload,
  uploadingAuthorPhoto,
  authorPhotoInputRef,
  setAuthorToDelete,
  blogs,
}: AuthorsViewProps) {
  return (
    <>
      <div className="max-w-[1320px] mx-auto w-full">
        <div className="flex flex-wrap justify-between items-end gap-4 mb-7">
          <div>
            <h1 className="font-display text-section font-bold text-[#2A1621] leading-tight">
              Authors
            </h1>
            <p className="text-body-sm text-[#6B5862] mt-1">
              Teachers who write for the blog. Real credentials and bios help Google and AI search trust health content.
            </p>
          </div>
          <button
            className="px-4 py-2 rounded-lg text-body-sm font-semibold bg-gradient-to-r from-[#BF296A] to-[#951248] text-white hover:from-[#a71d58] hover:to-[#800e3d] shadow-sm hover:shadow-md transition-all cursor-pointer"
            onClick={() => openAuthorDrawer()}
          >
            Add author
          </button>
        </div>

        <section className="bg-white border border-[#e6ded2] rounded-xl shadow-xs overflow-hidden">
          <div className="px-4 py-3 border-b border-[#e6ded2] font-bold text-body-sm text-[#2A1621] flex justify-between items-center bg-[#FAF6F0]/60">
            <span>{authors.length} Authors</span>
            <select
              className="w-auto px-3 py-1.5 bg-white border border-[#e6ded2] rounded-lg text-body-sm text-[#2A1621] focus:outline-none focus:ring-2 focus:ring-[#BF296A]/20 focus:border-[#BF296A]"
              value={authorRoleFilter}
              onChange={(e) => setAuthorRoleFilter(e.target.value)}
              aria-label="Filter by role"
            >
              <option value="">All roles</option>
              <option value="admin">Admins</option>
              <option value="editor">Editors</option>
              <option value="author">Authors</option>
            </select>
          </div>

          <div id="authorRows">
            {filteredAuthors.length === 0 ? (
              <p className="text-center py-12 text-body-sm text-[#6B5862]/70 font-medium">No authors match this filter.</p>
            ) : (
              filteredAuthors.map((a) => {
                const postCount =
                  a.blog_count ??
                  blogs.filter((b) => b.author === a.name || b.author === a.username).length;

                const checks = [
                  { label: "Photo", ok: Boolean(a.photo) },
                  { label: "Credentials", ok: Boolean(a.title) },
                  { label: "Bio", ok: (a.bio || "").trim().split(/\s+/).filter(Boolean).length >= 10 },
                  { label: "Profiles", ok: Boolean(a.instagram || a.youtube || a.yoga_alliance) },
                ];

                return (
                  <div key={a.id} className="grid grid-cols-[48px_minmax(0,1fr)_auto] md:grid-cols-[56px_minmax(0,1fr)_auto_auto_auto] gap-3 md:gap-5 items-center p-4 md:p-5 border-b border-[#e6ded2] last:border-b-0 hover:bg-[#FAF6F0]/30 transition-colors">
                    <span className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover bg-gradient-to-br from-[#BF296A] to-[#951248] text-white flex items-center justify-center font-bold text-lead overflow-hidden shrink-0 shadow-xs">
                      {a.photo ? (
                        <img src={a.photo} alt={a.name} className="w-full h-full object-cover" />
                      ) : (
                        getInitials(a.name)
                      )}
                    </span>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-body text-[#2A1621]">{a.name}</h3>
                        <span className="text-label font-mono text-[#6B5862]/80 bg-[#FAF6F0] px-2 py-0.5 rounded border border-[#e6ded2]">
                          @{a.username}
                        </span>
                      </div>
                      <p className="text-label font-semibold text-[#BF296A]">{a.title || "Add credentials"}</p>
                      <p className="text-label text-[#6B5862]/80 font-mono mt-0.5">{a.email}</p>
                      <div className="flex gap-1.5 flex-wrap mt-1.5" title="Profile completeness for E-E-A-T">
                        {checks.map((chk, i) => (
                          <span
                            key={i}
                            className={`text-label px-2 py-0.5 rounded-full font-medium ${
                              chk.ok
                                ? "bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200"
                                : "bg-[#FAF6F0] text-[#6B5862]/70 border border-[#e6ded2]"
                            }`}
                          >
                            {chk.ok ? "✓" : "○"} {chk.label}
                          </span>
                        ))}
                      </div>
                    </div>

                    <span
                      className={`text-label font-bold px-2.5 py-0.5 rounded-full border capitalize hidden sm:inline-block ${
                        a.role === "admin"
                          ? "bg-[#2A1621] text-white border-[#2A1621]"
                          : a.role === "editor"
                          ? "bg-[#BF296A]/10 text-[#BF296A] border-[#BF296A]/25"
                          : "bg-teal-50 text-teal-700 border-teal-200"
                      }`}
                    >
                      {a.role}
                    </span>

                    <div className="text-right text-label text-[#6B5862] whitespace-nowrap hidden md:block">
                      <b className="block text-body text-[#2A1621] font-bold">{postCount}</b>posts
                    </div>

                    <div className="flex gap-1">
                      <button
                        className="text-label font-bold px-2 py-1 rounded text-[#BF296A] hover:bg-[#BF296A]/10 cursor-pointer transition-colors"
                        onClick={() => openAuthorDrawer(a)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-label font-bold px-2 py-1 rounded text-red-600 hover:bg-red-50 cursor-pointer transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        onClick={() => setAuthorToDelete(a)}
                        disabled={authors.length === 1}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        <p className="text-label text-[#6B5862]/80 mt-4 leading-normal">
          <strong className="text-[#2A1621]">Roles:</strong> Admins manage everything. Editors can publish and edit anyone’s posts. Authors can write and publish only their own posts.
        </p>
      </div>

      <aside
        className={`fixed top-0 right-0 bottom-0 w-full max-w-[520px] bg-white z-[75] transition-transform duration-300 ease-out flex flex-col shadow-2xl ${
          authorDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawerTitle"
      >
        <div className="flex justify-between items-center px-5 py-4 border-b border-[#e6ded2] bg-[#FAF6F0]">
          <h2 id="drawerTitle" className="font-display text-card font-bold text-[#2A1621]">
            {authorForm.id === 0 ? "Add author" : `Edit ${authorForm.name}`}
          </h2>
          <button
            type="button"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#6B5862] hover:bg-[#e6ded2]/50 hover:text-[#2A1621] cursor-pointer transition-colors"
            onClick={closeAuthorDrawer}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form className="flex-1 overflow-y-auto p-5 space-y-4" id="authorForm" onSubmit={handleAuthorSubmit}>
          <div className="flex items-center gap-4">
            <span className="w-16 h-16 rounded-full object-cover bg-gradient-to-br from-[#BF296A] to-[#951248] text-white flex items-center justify-center font-bold text-card overflow-hidden shrink-0 shadow-sm">
              {authorForm.photo ? (
                <img src={authorForm.photo} alt={authorForm.name} className="w-full h-full object-cover" />
              ) : (
                getInitials(authorForm.name || "?")
              )}
            </span>
            <div>
              <label
                className="px-3.5 py-1.5 rounded-lg text-label font-bold bg-white border border-[#e6ded2] text-[#2A1621] hover:bg-[#FAF6F0] transition-colors cursor-pointer inline-block"
                htmlFor="aPhoto"
              >
                {uploadingAuthorPhoto ? "Uploading..." : "Upload photo"}
              </label>
              <input
                ref={authorPhotoInputRef}
                type="file"
                id="aPhoto"
                accept="image/*"
                className="hidden"
                onChange={handleAuthorPhotoUpload}
              />
              <p className="text-label text-[#6B5862]/70 mt-1">Square, at least 400 × 400 px. A real face builds trust.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block font-bold text-label uppercase tracking-wider text-[#2A1621] mb-1.5" htmlFor="aName">
                Full name
              </label>
              <input
                className="w-full px-3.5 py-2.5 bg-white border border-[#e6ded2] rounded-lg text-body-sm text-[#2A1621] placeholder:text-[#6B5862]/50 focus:outline-none focus:ring-2 focus:ring-[#BF296A]/20 focus:border-[#BF296A] transition-all"
                id="aName"
                required
                placeholder="Yogi Ravi Bisht"
                value={authorForm.name}
                onChange={(e) => {
                  const val = e.target.value;
                  setAuthorForm((prev) => ({
                    ...prev,
                    name: val,
                    slug: prev.slugTouched ? prev.slug : slugify(val),
                  }));
                }}
              />
            </div>
            <div>
              <label className="block font-bold text-label uppercase tracking-wider text-[#2A1621] mb-1.5" htmlFor="aSlug">
                Profile URL
              </label>
              <div className="flex items-center border border-[#e6ded2] rounded-lg bg-white px-3 focus-within:ring-2 focus-within:ring-[#BF296A]/20 focus-within:border-[#BF296A] transition-all">
                <span className="text-label text-[#6B5862]/70 select-none font-mono">/author/</span>
                <input
                  id="aSlug"
                  placeholder="yogi-ravi"
                  className="border-0 p-2.5 flex-1 text-body-sm font-mono text-[#2A1621] focus:outline-none bg-transparent"
                  value={authorForm.slug}
                  onChange={(e) =>
                    setAuthorForm((prev) => ({
                      ...prev,
                      slug: e.target.value,
                      slugTouched: true,
                    }))
                  }
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-label uppercase tracking-wider text-[#2A1621] mb-1.5" htmlFor="aEmail">
                Email
              </label>
              <input
                className="w-full px-3.5 py-2.5 bg-white border border-[#e6ded2] rounded-lg text-body-sm text-[#2A1621] placeholder:text-[#6B5862]/50 focus:outline-none focus:ring-2 focus:ring-[#BF296A]/20 focus:border-[#BF296A] transition-all"
                id="aEmail"
                type="email"
                required
                placeholder="ravi@sanskritiyogpeeth.org"
                value={authorForm.email}
                onChange={(e) =>
                  setAuthorForm((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="block font-bold text-label uppercase tracking-wider text-[#2A1621] mb-1.5" htmlFor="aRole">
                Role
              </label>
              <select
                className="w-full px-3.5 py-2.5 bg-white border border-[#e6ded2] rounded-lg text-body-sm text-[#2A1621] focus:outline-none focus:ring-2 focus:ring-[#BF296A]/20 focus:border-[#BF296A] transition-all"
                id="aRole"
                value={authorForm.role}
                onChange={(e) =>
                  setAuthorForm((prev) => ({
                    ...prev,
                    role: e.target.value as "admin" | "editor" | "author",
                  }))
                }
              >
                <option value="author">Author</option>
                <option value="editor">Editor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          {/* Dashboard Login Credentials Box (Admin Managed) */}
          <div className="bg-[#FAF6F0] p-4 rounded-xl border border-[#e6ded2] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-label uppercase tracking-wider font-extrabold text-[#BF296A] flex items-center gap-1.5">
                🔑 Dashboard Login Credentials
              </span>
              <span className="text-label font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300">
                Admin Managed
              </span>
            </div>
            <p className="text-label text-[#6B5862]">
              Admin creates and manages the username and password here for this teacher/editor.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-label uppercase tracking-wider text-[#2A1621] mb-1.5" htmlFor="aUsername">
                  Login Username *
                </label>
                <input
                  className="w-full px-3.5 py-2.5 bg-white border border-[#e6ded2] rounded-lg text-body-sm font-mono text-[#2A1621] placeholder:text-[#6B5862]/50 focus:outline-none focus:ring-2 focus:ring-[#BF296A]/20 focus:border-[#BF296A] transition-all"
                  id="aUsername"
                  required
                  placeholder="e.g. yogi-jagjeet"
                  value={authorForm.username || ""}
                  onChange={(e) =>
                    setAuthorForm((prev) => ({
                      ...prev,
                      username: e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""),
                    }))
                  }
                />
              </div>

              <div>
                <label className="block font-bold text-label uppercase tracking-wider text-[#2A1621] mb-1.5" htmlFor="aPassword">
                  {authorForm.id === 0 ? "Login Password *" : "Change Password"}
                </label>
                <input
                  className="w-full px-3.5 py-2.5 bg-white border border-[#e6ded2] rounded-lg text-body-sm text-[#2A1621] placeholder:text-[#6B5862]/50 focus:outline-none focus:ring-2 focus:ring-[#BF296A]/20 focus:border-[#BF296A] transition-all"
                  id="aPassword"
                  type="text"
                  required={authorForm.id === 0}
                  placeholder={authorForm.id === 0 ? "e.g. author@123" : "Leave blank to keep existing"}
                  value={authorForm.password || ""}
                  onChange={(e) =>
                    setAuthorForm((prev) => ({ ...prev, password: e.target.value }))
                  }
                />
              </div>
            </div>
          </div>

          <p className="font-extrabold text-label uppercase tracking-wider text-[#6B5862] pt-2">Shown on posts (E-E-A-T)</p>
          <div>
            <label className="block font-bold text-label uppercase tracking-wider text-[#2A1621] mb-1.5" htmlFor="aTitle">
              Title and credentials
            </label>
            <input
              className="w-full px-3.5 py-2.5 bg-white border border-[#e6ded2] rounded-lg text-body-sm text-[#2A1621] placeholder:text-[#6B5862]/50 focus:outline-none focus:ring-2 focus:ring-[#BF296A]/20 focus:border-[#BF296A] transition-all"
              id="aTitle"
              placeholder="Lead Ashtanga Master · E-RYT 500"
              value={authorForm.title}
              onChange={(e) =>
                setAuthorForm((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>

          <div>
            <label className="block font-bold text-label uppercase tracking-wider text-[#2A1621] mb-1.5" htmlFor="aBio">
              Bio
            </label>
            <textarea
              className="w-full px-3.5 py-2.5 bg-white border border-[#e6ded2] rounded-lg text-body-sm text-[#2A1621] placeholder:text-[#6B5862]/50 focus:outline-none focus:ring-2 focus:ring-[#BF296A]/20 focus:border-[#BF296A] transition-all"
              id="aBio"
              rows={4}
              placeholder="Years of practice, lineage, where you trained and what you teach."
              value={authorForm.bio}
              onChange={(e) =>
                setAuthorForm((prev) => ({ ...prev, bio: e.target.value }))
              }
            />
            <p className="text-label text-[#6B5862]/70 mt-1">
              {authorForm.bio.trim() ? authorForm.bio.trim().split(/\s+/).length : 0} words. 40–80 works well in the author box.
            </p>
          </div>

          <div>
            <label className="block font-bold text-label uppercase tracking-wider text-[#2A1621] mb-1.5" htmlFor="aExp">
              Years teaching
            </label>
            <input
              className="w-28 px-3.5 py-2.5 bg-white border border-[#e6ded2] rounded-lg text-body-sm text-[#2A1621] focus:outline-none focus:ring-2 focus:ring-[#BF296A]/20 focus:border-[#BF296A] transition-all"
              id="aExp"
              type="number"
              min={0}
              value={authorForm.experience_years}
              onChange={(e) =>
                setAuthorForm((prev) => ({
                  ...prev,
                  experience_years: Number(e.target.value),
                }))
              }
            />
          </div>

          <p className="font-extrabold text-label uppercase tracking-wider text-[#6B5862] pt-2">Profiles (added to schema as “sameAs”)</p>
          <div>
            <label className="block font-bold text-label uppercase tracking-wider text-[#2A1621] mb-1.5" htmlFor="aInsta">
              Instagram
            </label>
            <input
              className="w-full px-3.5 py-2.5 bg-white border border-[#e6ded2] rounded-lg text-body-sm text-[#2A1621] placeholder:text-[#6B5862]/50 focus:outline-none focus:ring-2 focus:ring-[#BF296A]/20 focus:border-[#BF296A] transition-all"
              id="aInsta"
              placeholder="https://instagram.com/…"
              value={authorForm.instagram}
              onChange={(e) =>
                setAuthorForm((prev) => ({ ...prev, instagram: e.target.value }))
              }
            />
          </div>

          <div>
            <label className="block font-bold text-label uppercase tracking-wider text-[#2A1621] mb-1.5" htmlFor="aYt">
              YouTube
            </label>
            <input
              className="w-full px-3.5 py-2.5 bg-white border border-[#e6ded2] rounded-lg text-body-sm text-[#2A1621] placeholder:text-[#6B5862]/50 focus:outline-none focus:ring-2 focus:ring-[#BF296A]/20 focus:border-[#BF296A] transition-all"
              id="aYt"
              placeholder="https://youtube.com/@…"
              value={authorForm.youtube}
              onChange={(e) =>
                setAuthorForm((prev) => ({ ...prev, youtube: e.target.value }))
              }
            />
          </div>

          <div>
            <label className="block font-bold text-label uppercase tracking-wider text-[#2A1621] mb-1.5" htmlFor="aYa">
              Yoga Alliance profile
            </label>
            <input
              className="w-full px-3.5 py-2.5 bg-white border border-[#e6ded2] rounded-lg text-body-sm text-[#2A1621] placeholder:text-[#6B5862]/50 focus:outline-none focus:ring-2 focus:ring-[#BF296A]/20 focus:border-[#BF296A] transition-all"
              id="aYa"
              placeholder="https://www.yogaalliance.org/…"
              value={authorForm.yoga_alliance}
              onChange={(e) =>
                setAuthorForm((prev) => ({ ...prev, yoga_alliance: e.target.value }))
              }
            />
          </div>

        </form>

        <div className="flex justify-between items-center px-5 py-3.5 border-t border-[#e6ded2] bg-[#FAF6F0]">
          {authorForm.id !== 0 && authors.length > 1 && (
            <button
              type="button"
              className="px-3.5 py-1.5 rounded-lg text-label font-bold text-red-600 hover:bg-red-50 transition-colors cursor-pointer border border-red-200"
              onClick={() => {
                const target = authors.find((x) => x.id === authorForm.id);
                if (target) {
                  closeAuthorDrawer();
                  setAuthorToDelete(target);
                }
              }}
            >
              Delete author
            </button>
          )}
          <span />
          <div className="flex gap-2">
            <button
              type="button"
              className="px-4 py-2 rounded-lg text-body-sm font-semibold bg-white border border-[#e6ded2] text-[#2A1621] hover:bg-[#FAF6F0] transition-colors cursor-pointer"
              onClick={closeAuthorDrawer}
            >
              Cancel
            </button>
            <button
              type="submit"
              form="authorForm"
              className="px-4 py-2 rounded-lg text-body-sm font-semibold bg-gradient-to-r from-[#BF296A] to-[#951248] text-white hover:from-[#a71d58] hover:to-[#800e3d] shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              {authorForm.id === 0 ? "Add author" : "Save changes"}
            </button>
          </div>
        </div>
      </aside>
      <div
        className={`fixed inset-0 bg-[#241711]/50 backdrop-blur-xs transition-opacity duration-200 z-[70] ${
          authorDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeAuthorDrawer}
      />
    </>
  );
}
