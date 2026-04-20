"use client";

import Logo from "@/components/Logo";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

// ─── Icons ────────────────────────────────────────────────────────────────────

const MicIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 1C10.34 1 9 2.34 9 4V12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12V4C15 2.34 13.66 1 12 1Z"
      stroke="#3AC479"
      strokeWidth="1.8"
    />
    <path
      d="M5 10V12C5 15.87 8.13 19 12 19C15.87 19 19 15.87 19 12V10"
      stroke="#3AC479"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M12 19V23M8 23H16"
      stroke="#3AC479"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const t = useTranslations();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/result?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div></div>
  );
}
