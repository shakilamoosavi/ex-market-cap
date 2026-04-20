"use client";

import { useFormattedDate } from "@/utils/useFormattedDate";

export default function FormattedDate({ iso }: { iso: string }) {
  const { formatPublishedAt } = useFormattedDate();
  return <span>{formatPublishedAt(iso)}</span>;
}
