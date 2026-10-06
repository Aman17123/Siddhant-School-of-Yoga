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
  blogs: Blog[];
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
  blogs,
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
            Each category gets its own page at /blog/category/… with its own SEO
            title and description.
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
                Name
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
                    slug: prev.slugTouched ? prev.slug : slugify(val),
                  }));
                }}
              />
            </div>

            <div>
              <label
                className="block font-bold text-label uppercase tracking-wider text-[#2A1621] mb-1.5"
                htmlFor="catSlug"
              >
                URL
              </label>
              <div className="flex items-center border border-[#e6ded2] rounded-lg bg-white px-3 focus-within:ring-2 focus-within:ring-[#1c3b2b]/20 focus-within:border-[#1c3b2b] transition-all">
                <span className="text-label text-[#6B5862]/70 select-none font-mono">
                  /blog/category/
                </span>
                <input
                  id="catSlug"
                  placeholder="yoga-poses"
                  className="border-0 p-2.5 flex-1 text-body-sm font-mono text-[#2A1621] focus:outline-none bg-transparent"
                  value={categoryForm.slug}
                  onChange={(e) =>
                    setCategoryForm((prev) => ({
                      ...prev,
                      slug: e.target.value,
                      slugTouched: true,
                    }))
                  }
                />
              </div>
              <p className="text-label text-[#6B5862]/80 mt-1.5 leading-normal">
                Created from the name. Changing it later breaks old links, so
                add a redirect if you do.
              </p>
            </div>

            <div>
              <label
                className="block font-bold text-label uppercase tracking-wider text-[#2A1621] mb-1.5"
                htmlFor="catDesc"
              >
                Description
              </label>
              <textarea
                className="w-full px-3.5 py-2.5 bg-white border border-[#e6ded2] rounded-lg text-body-sm text-[#2A1621] placeholder:text-[#6B5862]/50 focus:outline-none focus:ring-2 focus:ring-[#1c3b2b]/20 focus:border-[#1c3b2b] transition-all"
                id="catDesc"
                rows={3}
                placeholder="Shown at the top of the category page. Two or three sentences help it rank."
                value={categoryForm.description}
                onChange={(e) =>
                  setCategoryForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </div>

            <div>
              <p className="block font-bold text-label uppercase tracking-wider text-[#2A1621] mb-1.5">
                Colour
              </p>
              <div
                className="flex gap-2 flex-wrap mt-1"
                role="radiogroup"
                aria-label="Category colour"
              >
                {SWATCH_COLORS.map((c, i) => (
                  <label
                    key={i}
                    style={{ background: c }}
                    className={`w-7 h-7 rounded-full cursor-pointer relative transition-transform hover:scale-110 flex items-center justify-center ${
                      categoryForm.color === c
                        ? "ring-2 ring-white ring-offset-2 ring-offset-[#2A1621]"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="catColor"
                      className="sr-only"
                      value={c}
                      checked={categoryForm.color === c}
                      onChange={() =>
                        setCategoryForm((prev) => ({ ...prev, color: c }))
                      }
                      aria-label={`Colour ${i + 1}`}
                    />
                  </label>
                ))}
              </div>
            </div>

            <p className="font-extrabold text-label uppercase tracking-wider text-[#6B5862] pt-2">
              Search appearance
            </p>
            <div>
              <label
                className="block font-bold text-label uppercase tracking-wider text-[#2A1621] mb-1.5"
                htmlFor="catMetaTitle"
              >
                SEO title
              </label>
              <input
                className="w-full px-3.5 py-2.5 bg-white border border-[#e6ded2] rounded-lg text-body-sm text-[#2A1621] placeholder:text-[#6B5862]/50 focus:outline-none focus:ring-2 focus:ring-[#1c3b2b]/20 focus:border-[#1c3b2b] transition-all"
                id="catMetaTitle"
                placeholder="Yoga Poses: Step-by-Step Asana Guides"
                value={categoryForm.meta_title}
                onChange={(e) =>
                  setCategoryForm((prev) => ({
                    ...prev,
                    meta_title: e.target.value,
                  }))
                }
              />
              <div className="flex items-center gap-3 mt-1.5">
                <div className="flex-1 h-1.5 bg-[#FAF6F0] rounded-full overflow-hidden">
                  <i
                    className="block h-full transition-all duration-200"
                    style={{
                      width: `${Math.min(100, (categoryForm.meta_title.length / 60) * 100)}%`,
                      background:
                        categoryForm.meta_title.length === 0
                          ? "#DFCBA6"
                          : categoryForm.meta_title.length < 30
                            ? "#C9862A"
                            : categoryForm.meta_title.length <= 60
                              ? "#1c3b2b"
                              : "#b8455a",
                    }}
                  />
                </div>
                <span className="text-label font-semibold text-[#6B5862] tabular-nums">
                  {categoryForm.meta_title.length} / 30–60
                </span>
              </div>
            </div>

            <div>
              <label
                className="block font-bold text-label uppercase tracking-wider text-[#2A1621] mb-1.5"
                htmlFor="catMetaDesc"
              >
                Meta description
              </label>
              <textarea
                className="w-full px-3.5 py-2.5 bg-white border border-[#e6ded2] rounded-lg text-body-sm text-[#2A1621] placeholder:text-[#6B5862]/50 focus:outline-none focus:ring-2 focus:ring-[#1c3b2b]/20 focus:border-[#1c3b2b] transition-all"
                id="catMetaDesc"
                rows={3}
                placeholder="Illustrated guides to yoga poses with benefits, alignment cues and safety tips."
                value={categoryForm.meta_description}
                onChange={(e) =>
                  setCategoryForm((prev) => ({
                    ...prev,
                    meta_description: e.target.value,
                  }))
                }
              />
              <div className="flex items-center gap-3 mt-1.5">
                <div className="flex-1 h-1.5 bg-[#FAF6F0] rounded-full overflow-hidden">
                  <i
                    className="block h-full transition-all duration-200"
                    style={{
                      width: `${Math.min(100, (categoryForm.meta_description.length / 160) * 100)}%`,
                      background:
                        categoryForm.meta_description.length === 0
                          ? "#DFCBA6"
                          : categoryForm.meta_description.length < 120
                            ? "#C9862A"
                            : categoryForm.meta_description.length <= 160
                              ? "#1c3b2b"
                              : "#b8455a",
                    }}
                  />
                </div>
                <span className="text-label font-semibold text-[#6B5862] tabular-nums">
                  {categoryForm.meta_description.length} / 120–160
                </span>
              </div>
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
                  <th className="px-4 py-3 text-label uppercase tracking-wider font-bold text-[#6B5862] bg-[#FAF6F0]/60 border-b border-[#e6ded2]">
                    URL
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
                      c.slug
                        .toLowerCase()
                        .includes(catSearchQuery.toLowerCase()),
                  )
                  .map((c) => {
                    const seoOk = Boolean(c.meta_title && c.meta_description);
                    const count =
                      c.blog_count ??
                      blogs.filter(
                        (b) =>
                          b.category_id === c.id || b.category_name === c.name,
                      ).length;

                    return (
                      <tr
                        key={c.id}
                        className="hover:bg-[#FAF6F0]/40 transition-colors"
                      >
                        <td className="px-4 py-3.5 border-b border-[#e6ded2] align-middle">
                          <span className="flex items-center gap-2 font-bold text-[#2A1621]">
                            <span
                              className="w-2.5 h-2.5 rounded-full inline-block shrink-0"
                              style={{ background: c.color || "#1c3b2b" }}
                            />
                            {c.name}
                          </span>
                          <div
                            className={`text-label font-semibold mt-0.5 ${seoOk ? "text-emerald-700" : "text-amber-700"}`}
                          >
                            {seoOk
                              ? "SEO title and description set"
                              : "Missing SEO title or description"}
                          </div>
                        </td>
                        <td className="px-4 py-3.5 border-b border-[#e6ded2] align-middle text-label text-[#6B5862] font-mono">
                          /blog/category/{c.slug}
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
