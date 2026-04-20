"use client";
import { useTranslations } from "next-intl";
import React from "react";

// Helper: Generate Google-style pagination page numbers
function getPaginationPages(current: number, total: number) {
  const pages: (number | "...")[] = [];
  const delta = 2;

  pages.push(1);

  let start = Math.max(2, current - delta);
  let end = Math.min(total - 1, current + delta);

  if (start > 2) pages.push("...");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < total - 1) pages.push("...");
  if (total > 1) pages.push(total);

  return pages;
}

interface Props {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  className?: string;
}

export default function Pagination({page, totalPages, onChange, className = ""}: Props) {
  const t = useTranslations("components.pagination")
  return (
    <div className={`flex items-center justify-center mt-10 select-none ${className}`}>
      <div className="flex items-center gap-1">

        {/* Prev */}
        <button
          disabled={page === 1}
          onClick={() => onChange(Math.max(1, page - 1))}
          className={`px-3 py-2 text-sm rounded-full transition border 
            ${
              page === 1
                ? "border-gray-200 text-gray-300 cursor-not-allowed"
                : "border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
        >
          ‹ {t('prev')}
        </button>

        {/* Pages */}
        <div className="hidden sm:flex items-center gap-1 mx-2">
          {getPaginationPages(page, totalPages).map((p, i) =>
            p === "..." ? (
              <span key={i} className="px-2 text-gray-400">…</span>
            ) : (
              <button
                key={p}
                onClick={() => onChange(p)}
                className={`w-9 h-9 rounded-full text-sm flex items-center justify-center transition
                  ${
                    p === page
                      ? "bg-blue-600 text-white shadow-sm font-semibold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                {p}
              </button>
            )
          )}
        </div>

        {/* Mobile: page / total */}
        <span className="sm:hidden mx-3 text-gray-600 text-sm">
          {page} / {totalPages}
        </span>

        {/* Next */}
        <button
          disabled={page === totalPages}
          onClick={() => onChange(Math.min(totalPages, page + 1))}
          className={`px-3 py-2 text-sm rounded-full transition border 
            ${
              page === totalPages
                ? "border-gray-200 text-gray-300 cursor-not-allowed"
                : "border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
        >
          {t('next')} ›
        </button>
      </div>
    </div>
  );
}
