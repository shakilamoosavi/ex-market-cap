"use client";
import { useState } from "react";

export default function usePagination(
  totalItems: number,
  perPage: number = 10
) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(totalItems / perPage);

  const next = () => setPage((p) => Math.min(p + 1, totalPages));
  const prev = () => setPage((p) => Math.max(p - 1, 1));
  const goTo = (p: number) =>
    setPage(Math.min(Math.max(p, 1), totalPages));

  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;

  return {
    page,
    totalPages,
    next,
    prev,
    goTo,
    startIndex,
    endIndex,
  };
}
