"use client";

import React from "react";
import {
  Category,
  Blog,
  CategoryFormState,
  SWATCH_COLORS,
  slugify,
} from "./types";

interface CategoriesViewProps {
  categories: Category[];
  categoryForm: CategoryFormState;
  setCategoryForm: React.Dispatch<React.SetStateAction<CategoryFormState>>;
  handleCategorySubmit: (e: React.FormEvent) => void;
  resetCategoryForm: () => void;
  handleEditCategory: (c: Category) => void;
  setCatToDelete: (c: Category) => void;
  catSearchQuery: string;
  setCatSearchQuery: (query: string) => void;
  blog: Blog[];
  setCatFilter: (cat: string) => void;
  setView: (view: "dashboard" | "editor" | "categories") => void;
}

export default function CategoriesView({
  categories,
  categoryForm,
  setCategoryForm,
  handleCategorySubmit,
  resetCategoryForm,
  handleEditCategory,
  setCatToDelete,
  catSearchQuery,
  setCatSearchQuery,
  blog,
  setCatFilter,
  setView,
}: CategoriesViewProps) {
  return (
    <div className="max-w-[1320px] mx-auto w-full">
      <div className="flex flex-wrap justify-between items-end gap-4 mb-7">
        <div>
          <h1 className="font-display text-section font-bold text-[#2A1621] leading-tight">
            Categories
          </h1>
          <p className="text-body-sm text-[#6B5862] mt-1">
            Manage your blog categories.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.35fr] gap-6 items-start">
        {/* ===== Add / edit form ===== */}
        <section className="bg-white border border-[#e6ded2] rounded-xl shadow-xs overflow-hidden">
          <h2 className="px-4 py-3 border-b border-[#e6ded2] font-bold text-body-sm text-[#2A1621] flex justify-between items-center bg-[#FAF6F0]/60">
            {categoryForm.isEditing
              ? `Edit “${categoryForm.name}”`
              : "Add a category"}
          </h2>
          <form onSubmit={handleCategorySubmit} className="p-5 space-y-4">
            <div>
              <label
                className="block font-bold text-label uppercase tracking-wider text-[#2A1621] mb-1.5"
                htmlFor="catName"
              >
                Category Name
              </label>
              <input
                className="w-full px-3.5 py-2.5 bg-white border border-[#e6ded2] rounded-lg text-body-sm text-[#2A1621] placeholder:text-[#6B5862]/50 focus:outline-none focus:ring-2 focus:ring-[#1c3b2b]/20 focus:border-[#1c3b2b] transition-all"
                id="catName"
                required
                placeholder="e.g. Yoga Poses (Asanas)"
                value={categoryForm.name}
                onChange={(e) => {
                  const val = e.target.value;
                  setCategoryForm((prev) => ({
                    ...prev,
                    name: val,
                    slug: slugify(val),
                  }));
                }}
              />
            </div>

            <div className="flex justify-end gap-2.5 pt-4 border-t border-[#e6ded2]">
              {categoryForm.isEditing && (
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg text-body-sm font-semibold bg-white border border-[#e6ded2] text-[#2A1621] hover:bg-[#FAF6F0] transition-colors cursor-pointer"
                  onClick={resetCategoryForm}
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="px-4 py-2 rounded-lg text-body-sm font-semibold bg-gradient-to-r from-[#1c3b2b] to-[#14291e] text-white hover:from-[#234b37] hover:to-[#1c3b2b] shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                {categoryForm.isEditing ? "Save changes" : "Add category"}
              </button>
            </div>
          </form>
        </section>

        {/* ===== Categories Table ===== */}
        <section className="bg-white border border-[#e6ded2] rounded-xl shadow-xs overflow-hidden">
          <div className="px-4 py-3 border-b border-[#e6ded2] font-bold text-body-sm text-[#2A1621] flex justify-between items-center bg-[#FAF6F0]/60">
            <span>{categories.length} Categories</span>
            <input
              className="w-48 px-3 py-1.5 bg-white border border-[#e6ded2] rounded-lg text-body-sm text-[#2A1621] placeholder:text-[#6B5862]/50 focus:outline-none focus:ring-2 focus:ring-[#1c3b2b]/20 focus:border-[#1c3b2b]"
              type="search"
              placeholder="Search categories"
              value={catSearchQuery}
              onChange={(e) => setCatSearchQuery(e.target.value)}
              aria-label="Search categories"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-body-sm border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-label uppercase tracking-wider font-bold text-[#6B5862] bg-[#FAF6F0]/60 border-b border-[#e6ded2]">
                    Name
                  </th>
                  <th className="px-4 py-3 text-label uppercase tracking-wider font-bold text-[#6B5862] bg-[#FAF6F0]/60 border-b border-[#e6ded2] text-right">
                    Posts
                  </th>
                  <th className="px-4 py-3 text-label uppercase tracking-wider font-bold text-[#6B5862] bg-[#FAF6F0]/60 border-b border-[#e6ded2] text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories
                  .filter(
                    (c) =>
                      c.name
                        .toLowerCase()
                        .includes(catSearchQuery.toLowerCase()) ||
                      (c.slug &&
                        c.slug
                          .toLowerCase()
                          .includes(catSearchQuery.toLowerCase())),
                  )
                  .map((c) => {
                    const count =
                      c.blog_count ??
                      blog.filter(
                        (b) =>
                          b.category_id === c.id || b.category_name === c.name,
                      ).length;

                    return (
                      <tr
                        key={c.id}
                        className="hover:bg-[#FAF6F0]/40 transition-colors"
                      >
                        <td className="px-4 py-3.5 border-b border-[#e6ded2] align-middle">
                          <span className="font-bold text-[#2A1621] text-sm">
                            {c.name}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 border-b border-[#e6ded2] align-middle text-right">
                          <button
                            onClick={() => {
                              setCatFilter(c.name);
                              setView("dashboard");
                            }}
                            className="font-bold text-body-sm text-[#1c3b2b] hover:underline cursor-pointer"
                          >
                            {count}
                          </button>
                        </td>
                        <td className="px-4 py-3.5 border-b border-[#e6ded2] align-middle text-right whitespace-nowrap">
                          <button
                            className="text-label font-bold px-2 py-1 rounded text-[#1c3b2b] hover:bg-[#1c3b2b]/10 cursor-pointer transition-colors"
                            onClick={() => handleEditCategory(c)}
                          >
                            Edit
                          </button>
                          <button
                            className="text-label font-bold px-2 py-1 rounded text-red-600 hover:bg-red-50 cursor-pointer transition-colors"
                            onClick={() => setCatToDelete(c)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
