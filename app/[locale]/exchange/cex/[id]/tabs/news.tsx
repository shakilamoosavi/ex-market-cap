"use client";

import React, { useMemo } from "react";
import Pagination from "@/components/Pagination";
import usePagination from "@/hooks/usePagination";
import FormattedDate from "@/components/FormattedDate";

export default function NewsTab() {
  const newsData = useMemo(() => {
    const headlineTemplates = [
      "Market reacts to major crypto movements — update {n}",
      "Institutional investors increase exposure — analysis {n}",
      "Experts discuss upcoming regulatory shifts — report {n}",
      "Trading volume spikes across major exchanges — news {n}",
      "Blockchain networks hit new activity highs — insight {n}",
    ];

    const snippetTemplates = [
      "Analysts are monitoring rapid market developments as key assets continue to show increased volatility. Early data suggests growing institutional demand...",
      "Following several macroeconomic catalysts, traders expect elevated price swings. Experts highlight shifting liquidity and technical indicators...",
      "Despite fluctuations, investor sentiment remains cautiously optimistic. Recent activity shows expanding adoption across blockchains...",
    ];

    const data = Array.from({ length: 80 }).map((_, i) => {
      const title =
        headlineTemplates[i % headlineTemplates.length].replace("{n}", `${i + 1}`);
      const snippet = snippetTemplates[i % snippetTemplates.length];

      return {
        id: crypto.randomUUID(),
        title,
        snippet,
        url: `https://example.com/news/${i + 1}`,
        publishedAt: new Date(Date.now() - i * 3600 * 1000).toISOString(),
        thumbnail: `https://picsum.photos/300/200?random=${i + 1}`,
      };
    });

    return data;
  }, []);

  const perPage = 10;
  const { page, totalPages, goTo, startIndex, endIndex } =
    usePagination(newsData.length, perPage);

  const paginated = newsData.slice(startIndex, endIndex);

  return (
    <div className="w-full mt-8">
      <div className="flex flex-col gap-4">
        {paginated.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="
              group 
              flex 
              gap-4 
              p-4 
              rounded-xl 
              border 
              border-gray-200 
              bg-white 
              transition-all 
              duration-200
              hover:bg-gray-50 
              hover:shadow-sm
            "
          >
            {/* Thumbnail - hidden on mobile */}
            <div className="hidden sm:block w-32 h-20 flex-shrink-0 rounded-md overflow-hidden bg-gray-200">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
              />
            </div>

            <div className="flex flex-col">
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

              <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                {item.snippet}
              </p>

              <div className="text-xs text-gray-500 mt-2">
                <FormattedDate iso={item.publishedAt} />
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-6">
        <Pagination page={page} totalPages={totalPages} onChange={goTo} />
      </div>
    </div>
  );
}
