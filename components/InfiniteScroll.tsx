"use client";

import { useEffect, useState } from "react";

export default function InfiniteScroll({ items, perPage = 8, children }) {
  const [visibleCount, setVisibleCount] = useState(perPage);

  const visibleItems = items.slice(0, visibleCount);

  function loadMore() {
    setVisibleCount((prev) => prev + perPage);
  }

  // Auto-load on scroll near bottom
  useEffect(() => {
    function handleScroll() {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;

      if (nearBottom) loadMore();
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full">
      <div className="grid gap-6">{children(visibleItems)}</div>

      {visibleCount < items.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={loadMore}
            className="
              px-5 py-2 
              bg-gray-100 
              hover:bg-gray-200 
              text-gray-800 
              rounded-lg 
              text-sm
              transition
            "
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
}
