"use client";

import { useEffect, useMemo, useState } from "react";
import usePagination from "@/hooks/usePagination";
import Pagination from "@/components/Pagination";

export default function NewsListing() {
  // ------------------------------------------------
  // Mock data (title, url, endDate)
  // ------------------------------------------------
  const data = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => ({
      id: crypto.randomUUID(),
      title: `Sample News Item ${i + 1}`,
      url: `https://example.com/news/${i + 1}`,
      endDate: new Date(Date.now() + (i + 1) * 3600 * 1000).toISOString(), // expires hourly
    }));
  }, []);

  // ------------------------------------------------
  // Pagination
  // ------------------------------------------------
  const perPage = 10;
  const { page, totalPages, goTo, startIndex, endIndex } = usePagination(
    data.length,
    perPage
  );

  const paginated = data.slice(startIndex, endIndex);

  // ------------------------------------------------
  // Re-render every second for countdown
  // ------------------------------------------------
  const [, forceRender] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      forceRender((x) => x + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // ------------------------------------------------
  // Countdown formatter (only shows non-zero units)
  // ------------------------------------------------
  const formatRemaining = (endDate: string) => {
    const now = new Date();
    const end = new Date(endDate);

    const diff = end.getTime() - now.getTime();

    if (diff <= 0) return "Expired";

    const sec = Math.floor(diff / 1000);
    const d = Math.floor(sec / 86400);
    const h = Math.floor((sec % 86400) / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;

    const parts: string[] = [];

    if (d > 0) parts.push(`${d} day${d > 1 ? "s" : ""}`);
    if (h > 0) parts.push(`${h} hour${h > 1 ? "s" : ""}`);
    if (m > 0) parts.push(`${m} minute${m > 1 ? "s" : ""}`);
    if (s > 0) parts.push(`${s} second${s > 1 ? "s" : ""}`);

    return parts.join(" and ");
  };

  return (
    <div className="w-full mt-10">

      {/* List */}
      <div className="flex flex-col gap-4">
        {paginated.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="
              group 
              p-4 
              rounded-xl 
              border 
              border-gray-200 
              bg-white 
              transition-all 
              hover:bg-gray-50 
              hover:shadow-sm
            "
          >
            {/* TITLE */}
            <h3
              className="
                text-lg 
                font-medium 
                text-[#1a0dab] 
                group-hover:text-blue-800
                transition-colors
              "
            >
              {item.title}
            </h3>

            {/* COUNTDOWN under the title */}
            <div className="text-xs text-gray-500 mt-1">
              {formatRemaining(item.endDate)}
            </div>
          </a>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6">
        <Pagination page={page} totalPages={totalPages} onChange={goTo} />
      </div>
    </div>
  );
}
