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
}: DeleteModalsProps) {
  return (
    <>
      {/* ===================== DELETE POST MODAL ===================== */}
      {postToDelete && (
        <div className="fixed inset-0 bg-[#16271e]/70 backdrop-blur-xs flex items-center justify-center z-50 p-4 font-figtree" role="dialog" aria-modal="true">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl border border-[#e3dac9] animate-fade-up">
            <h2 className="font-belleza text-2xl text-[#1e2422]">Delete this post?</h2>
            <p className="font-figtree text-sm text-stone-600 mt-2 leading-relaxed">
              <b className="text-[#1e2422] font-semibold">{postToDelete.title}</b> and its content will be removed permanently.
            </p>
            <div className="flex justify-end gap-2.5 mt-6 font-figtree">
              <button
                className="px-4 py-2 rounded-lg text-sm font-semibold bg-white border border-[#e3dac9] text-[#1e2422] hover:bg-[#f4efe6] transition-colors cursor-pointer"
                onClick={() => setPostToDelete(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg text-sm font-semibold bg-red-600 hover:bg-red-700 text-white transition-colors shadow-sm cursor-pointer"
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
        <div className="fixed inset-0 bg-[#16271e]/70 backdrop-blur-xs flex items-center justify-center z-50 p-4 font-figtree" role="dialog" aria-modal="true">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl border border-[#e3dac9] animate-fade-up">
            <h2 className="font-belleza text-2xl text-[#1e2422]">Delete “{catToDelete.name}”?</h2>
            <p className="font-figtree text-sm text-stone-600 mt-2 leading-relaxed">
              Are you sure you want to remove this category? Its posts can be moved to another category.
            </p>
            <div className="mt-4 font-figtree">
              <label className="block text-xs font-semibold text-[#1e2422] uppercase tracking-wider mb-1.5" htmlFor="moveToCat">
                Move its posts to
              </label>
              <select
                className="w-full px-3.5 py-2.5 bg-white border border-[#e3dac9] rounded-lg text-sm text-[#1e2422] focus:outline-none focus:ring-2 focus:ring-[#1c3b2b]/20 focus:border-[#1c3b2b]"
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
            <div className="flex justify-end gap-2.5 mt-6 font-figtree">
              <button
                className="px-4 py-2 rounded-lg text-sm font-semibold bg-white border border-[#e3dac9] text-[#1e2422] hover:bg-[#f4efe6] transition-colors cursor-pointer"
                onClick={() => setCatToDelete(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg text-sm font-semibold bg-red-600 hover:bg-red-700 text-white transition-colors shadow-sm cursor-pointer"
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
