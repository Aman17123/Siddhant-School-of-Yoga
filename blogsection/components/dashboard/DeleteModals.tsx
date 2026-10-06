"use client";

import React from "react";
import { Blog, Category, Author } from "./types";

interface DeleteModalsProps {
  postToDelete: Blog | null;
  setPostToDelete: (blog: Blog | null) => void;
  confirmDeletePost: () => void;
  catToDelete: Category | null;
  setCatToDelete: (category: Category | null) => void;
  catMoveTarget: string;
  setCatMoveTarget: (target: string) => void;
  categories: Category[];
  confirmDeleteCategory: () => void;
  authorToDelete: Author | null;
  setAuthorToDelete: (author: Author | null) => void;
  authorMoveTarget: string;
  setAuthorMoveTarget: (target: string) => void;
  authors: Author[];
  confirmDeleteAuthor: () => void;
}

export default function DeleteModals({
  postToDelete,
  setPostToDelete,
  confirmDeletePost,
  catToDelete,
  setCatToDelete,
  catMoveTarget,
  setCatMoveTarget,
  categories,
  confirmDeleteCategory,
  authorToDelete,
  setAuthorToDelete,
  authorMoveTarget,
  setAuthorMoveTarget,
  authors,
  confirmDeleteAuthor,
}: DeleteModalsProps) {
  return (
    <>
      {/* ===================== DELETE AUTHOR MODAL ===================== */}
      {authorToDelete && (
        <div className="fixed inset-0 bg-[#241711]/60 backdrop-blur-xs flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true">
          <div className="bg-white rounded-xl w-full max-w-lg p-6 shadow-2xl border border-[#e6ded2] animate-fade-up">
            <h2 className="font-display text-card font-bold text-[#2A1621]">Delete “{authorToDelete.name}”?</h2>
            <p className="text-body-sm text-[#6B5862] mt-2 leading-relaxed">
              Are you sure you want to remove this author? You can reassign their published articles to another instructor.
            </p>
            <div className="mt-4">
              <label className="block text-label font-bold text-[#2A1621] uppercase tracking-wider mb-1.5" htmlFor="authorMoveSelect">
                Give their posts to
              </label>
              <select
                className="w-full px-3.5 py-2.5 bg-white border border-[#e6ded2] rounded-lg text-body-sm text-[#2A1621] focus:outline-none focus:ring-2 focus:ring-[#BF296A]/20 focus:border-[#BF296A]"
                id="authorMoveSelect"
                value={authorMoveTarget}
                onChange={(e) => setAuthorMoveTarget(e.target.value)}
              >
                <option value="Sanskriti Yogpeeth Admin">Sanskriti Yogpeeth Admin</option>
                {authors
                  .filter((a) => a.id !== authorToDelete.id)
                  .map((a) => (
                    <option key={a.id} value={a.name}>
                      {a.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="flex justify-end gap-2.5 mt-6">
              <button
                className="px-4 py-2 rounded-lg text-body-sm font-semibold bg-white border border-[#e6ded2] text-[#2A1621] hover:bg-[#FAF6F0] transition-colors cursor-pointer"
                onClick={() => setAuthorToDelete(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg text-body-sm font-semibold bg-red-600 hover:bg-red-700 text-white transition-colors shadow-sm cursor-pointer"
                onClick={confirmDeleteAuthor}
              >
                Delete author
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== DELETE POST MODAL ===================== */}
      {postToDelete && (
        <div className="fixed inset-0 bg-[#241711]/60 backdrop-blur-xs flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true">
          <div className="bg-white rounded-xl w-full max-w-lg p-6 shadow-2xl border border-[#e6ded2] animate-fade-up">
            <h2 className="font-display text-card font-bold text-[#2A1621]">Delete this post?</h2>
            <p className="text-body-sm text-[#6B5862] mt-2 leading-relaxed">
              <b className="text-[#2A1621] font-bold">{postToDelete.title}</b> and its FAQs will be removed permanently. Its URL will show a 404, so add a redirect if it gets traffic.
            </p>
            <div className="flex justify-end gap-2.5 mt-6">
              <button
                className="px-4 py-2 rounded-lg text-body-sm font-semibold bg-white border border-[#e6ded2] text-[#2A1621] hover:bg-[#FAF6F0] transition-colors cursor-pointer"
                onClick={() => setPostToDelete(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg text-body-sm font-semibold bg-red-600 hover:bg-red-700 text-white transition-colors shadow-sm cursor-pointer"
                onClick={confirmDeletePost}
              >
                Delete post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== DELETE CATEGORY MODAL ===================== */}
      {catToDelete && (
        <div className="fixed inset-0 bg-[#241711]/60 backdrop-blur-xs flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true">
          <div className="bg-white rounded-xl w-full max-w-lg p-6 shadow-2xl border border-[#e6ded2] animate-fade-up">
            <h2 className="font-display text-card font-bold text-[#2A1621]">Delete “{catToDelete.name}”?</h2>
            <p className="text-body-sm text-[#6B5862] mt-2 leading-relaxed">
              Are you sure you want to remove this category? Its posts can be moved to another category.
            </p>
            <div className="mt-4">
              <label className="block text-label font-bold text-[#2A1621] uppercase tracking-wider mb-1.5" htmlFor="moveToCat">
                Move its posts to
              </label>
              <select
                className="w-full px-3.5 py-2.5 bg-white border border-[#e6ded2] rounded-lg text-body-sm text-[#2A1621] focus:outline-none focus:ring-2 focus:ring-[#BF296A]/20 focus:border-[#BF296A]"
                id="moveToCat"
                value={catMoveTarget}
                onChange={(e) => setCatMoveTarget(e.target.value)}
              >
                <option value="">Uncategorised</option>
                {categories
                  .filter((c) => c.id !== catToDelete.id)
                  .map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="flex justify-end gap-2.5 mt-6">
              <button
                className="px-4 py-2 rounded-lg text-body-sm font-semibold bg-white border border-[#e6ded2] text-[#2A1621] hover:bg-[#FAF6F0] transition-colors cursor-pointer"
                onClick={() => setCatToDelete(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg text-body-sm font-semibold bg-red-600 hover:bg-red-700 text-white transition-colors shadow-sm cursor-pointer"
                onClick={confirmDeleteCategory}
              >
                Delete category
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
