"use client";

import React, { Suspense } from "react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";

// ─── Fake Data ────────────────────────────────────────────────────────────────

const fakeResults = [
  {
    id: 1,
    title: "Next.js Documentation – The React Framework for Production",
    url: "https://nextjs.org/docs",
    displayUrl: "nextjs.org › docs",
    description:
      "Next.js gives you the best developer experience with all the features you need for production: hybrid static & server rendering, TypeScript support, smart bundling, route pre-fetching, and more.",
    date: "2024-03-10",
  },
  {
    id: 2,
    title: "React – A JavaScript library for building user interfaces",
    url: "https://react.dev",
    displayUrl: "react.dev",
    description:
      "React is the library for web and native user interfaces. Build user interfaces out of individual pieces called components written in JavaScript.",
    date: "2024-02-18",
  },
  {
    id: 3,
    title: "Tailwind CSS – Rapidly build modern websites",
    url: "https://tailwindcss.com/docs",
    displayUrl: "tailwindcss.com › docs",
    description:
      "A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.",
    date: "2024-01-25",
  },
  {
    id: 4,
    title: "TypeScript: JavaScript With Syntax For Types",
    url: "https://www.typescriptlang.org",
    displayUrl: "typescriptlang.org",
    description:
      "TypeScript extends JavaScript by adding types to the language. TypeScript speeds up your development experience by catching errors and providing fixes before you even run your code.",
    date: "2024-03-01",
  },
  {
    id: 5,
    title: "Vercel – Develop. Preview. Ship.",
    url: "https://vercel.com",
    displayUrl: "vercel.com",
    description:
      "Vercel is the platform for frontend developers, providing the speed and reliability innovators need to create at the moment of inspiration.",
    date: "2024-02-05",
  },
  {
    id: 6,
    title: "GitHub – Where the world builds software",
    url: "https://github.com",
    displayUrl: "github.com",
    description:
      "Millions of developers and companies build, ship, and maintain their software on GitHub.",
    date: "2024-03-15",
  },
  {
    id: 7,
    title: "MDN Web Docs – Resources for developers, by developers",
    url: "https://developer.mozilla.org",
    displayUrl: "developer.mozilla.org",
    description:
      "The MDN Web Docs site provides information about Open Web technologies including HTML, CSS, and APIs.",
    date: "2024-01-30",
  },
];

const fakeImages = [
  { id: 1,  src: "https://picsum.photos/seed/a/400/300", alt: "Image 1"  },
  { id: 2,  src: "https://picsum.photos/seed/b/400/300", alt: "Image 2"  },
  { id: 3,  src: "https://picsum.photos/seed/c/400/300", alt: "Image 3"  },
  { id: 4,  src: "https://picsum.photos/seed/d/400/300", alt: "Image 4"  },
  { id: 5,  src: "https://picsum.photos/seed/e/400/300", alt: "Image 5"  },
  { id: 6,  src: "https://picsum.photos/seed/f/400/300", alt: "Image 6"  },
  { id: 7,  src: "https://picsum.photos/seed/g/400/300", alt: "Image 7"  },
  { id: 8,  src: "https://picsum.photos/seed/h/400/300", alt: "Image 8"  },
  { id: 9,  src: "https://picsum.photos/seed/i/400/300", alt: "Image 9"  },
  { id: 10, src: "https://picsum.photos/seed/j/400/300", alt: "Image 10" },
  { id: 11, src: "https://picsum.photos/seed/k/400/300", alt: "Image 11" },
  { id: 12, src: "https://picsum.photos/seed/l/400/300", alt: "Image 12" },
];

const relatedSearches = [
  "next.js tutorial",
  "next.js vs react",
  "next.js app router",
  "next.js deployment",
  "next.js server components",
  "next.js examples",
  "next.js authentication",
  "next.js database",
];

type Tab = "all" | "images" | "news" | "videos";

// ─── Icons ────────────────────────────────────────────────────────────────────

const SearchIcon = ({
  size = 20,
  color = "currentColor",
}: {
  size?: number;
  color?: string;
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M21 21L16.514 16.506M19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const CloseIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M18 6L6 18M6 6L18 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const MicIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 1C10.34 1 9 2.34 9 4V12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12V4C15 2.34 13.66 1 12 1Z"
      stroke="#4285f4"
      strokeWidth="1.8"
    />
    <path
      d="M5 10V12C5 15.87 8.13 19 12 19C15.87 19 19 15.87 19 12V10"
      stroke="#4285f4"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M12 19V23M8 23H16"
      stroke="#4285f4"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const DotsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="5"  cy="5"  r="2" fill="#5f6368" />
    <circle cx="12" cy="5"  r="2" fill="#5f6368" />
    <circle cx="19" cy="5"  r="2" fill="#5f6368" />
    <circle cx="5"  cy="12" r="2" fill="#5f6368" />
    <circle cx="12" cy="12" r="2" fill="#5f6368" />
    <circle cx="19" cy="12" r="2" fill="#5f6368" />
    <circle cx="5"  cy="19" r="2" fill="#5f6368" />
    <circle cx="12" cy="19" r="2" fill="#5f6368" />
    <circle cx="19" cy="19" r="2" fill="#5f6368" />
  </svg>
);

// ─── Favicon ──────────────────────────────────────────────────────────────────

function FaviconIcon({ url }: { url: string }) {
  const domain = new URL(url).hostname;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=32`}
      alt={domain}
      width={18}
      height={18}
      className="rounded-sm"
    />
  );
}

// ─── Result Card ──────────────────────────────────────────────────────────────

function ResultCard({ result }: { result: (typeof fakeResults)[0] }) {
  return (
    <div className="mb-7 w-full max-w-[652px]">

      {/* Site info row */}
      <div className="flex items-center gap-2 mb-1">
        <div className="w-[26px] h-[26px] rounded-full bg-[#f1f3f4] flex items-center justify-center overflow-hidden shrink-0">
          <FaviconIcon url={result.url} />
        </div>
        <div className="flex flex-col leading-none min-w-0">
          <span className="text-[14px] text-[#202124] truncate">
            {new URL(result.url).hostname}
          </span>
          <span className="text-[12px] text-[#4d5156] truncate">
            {result.displayUrl}
          </span>
        </div>

        {/* 3-dot menu — ms-auto pushes to inline-end in both LTR and RTL */}
        <button className="ms-auto w-7 h-7 rounded-full hover:bg-[#f1f3f4] flex items-center justify-center shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="5"  r="1.8" fill="#70757a" />
            <circle cx="12" cy="12" r="1.8" fill="#70757a" />
            <circle cx="12" cy="19" r="1.8" fill="#70757a" />
          </svg>
        </button>
      </div>

      {/* Title */}
      <a
        href={result.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-[20px] leading-[1.3] text-[#1a0dab] hover:underline font-normal mb-1 break-words"
      >
        {result.title}
      </a>

      {/* Description — me-1 instead of mr-1 for RTL safety */}
      <p className="text-[14px] text-[#4d5156] leading-[1.58] break-words">
        <span className="text-[#70757a] me-1">{result.date} —</span>
        {result.description}
      </p>
    </div>
  );
}

// ─── Image Grid ───────────────────────────────────────────────────────────────

function ImageGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mb-8">
      {fakeImages.map((img) => (
        <div
          key={img.id}
          className="rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity bg-[#f1f3f4] aspect-[4/3]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.src}
            alt={img.alt}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}

// ─── Related Searches ─────────────────────────────────────────────────────────

function RelatedSearches() {
  const t = useTranslations("result");
  const router = useRouter();

  return (
    <div className="w-full max-w-[652px] mt-8 mb-6">
      <h3 className="text-[18px] font-normal text-[#202124] mb-3 pb-2 border-b border-[#ebebeb]">
        {t("relatedSearches")}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
        {relatedSearches.map((term) => (
          <button
            key={term}
            onClick={() =>
              router.push(`/result?q=${encodeURIComponent(term)}`)
            }
            // ✅ text-start instead of text-left
            className="flex items-center gap-3 px-3 py-3 text-[14px] text-[#202124] hover:bg-[#f8f9fa] transition-colors text-start border-b border-[#ebebeb] last:border-0"
          >
            {/* Search icon — always at inline-start */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              className="shrink-0 text-[#70757a]"
            >
              <path
                d="M21 21L16.514 16.506M19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>

            <span className="flex-1 truncate">{term}</span>

            {/* Arrow — rtl:rotate-180 flips it for RTL reading direction */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="shrink-0 text-[#70757a] rtl:rotate-180"
            >
              <path
                d="M7 17L17 7M17 7H7M17 7V17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Pagination ───────────────────────────────────────────────────────────────

function Pagination({
  page,
  setPage,
}: {
  page: number;
  setPage: (p: number) => void;
}) {
  const t = useTranslations("result");

  const getPages = () => {
    const total = 10;
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    if (page <= 4) return [1, 2, 3, 4, 5, 6, 7];
    if (page >= total - 3)
      return [
        total - 6,
        total - 5,
        total - 4,
        total - 3,
        total - 2,
        total - 1,
        total,
      ];
    return [page - 3, page - 2, page - 1, page, page + 1, page + 2, page + 3];
  };

  return (
    <div className="flex items-center justify-center gap-0 py-6 max-w-[652px]">

      {/* Brand — me-4 instead of mr-4 */}
      <div className="hidden sm:flex items-end me-4 select-none">
        {"X-MODULE".split("").map((ch, i) => (
          <span key={i} className="text-[#4285f4] text-3xl font-normal">
            {ch}
          </span>
        ))}
      </div>

      {/* Prev — arrow flips in RTL via rtl:rotate-180 */}
      {page > 1 && (
        <button
          onClick={() => setPage(page - 1)}
          className="flex flex-col items-center px-3 py-2 text-[#1a0dab] hover:underline"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            className="rtl:rotate-180"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="#4285f4"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-[13px]">{t("previous")}</span>
        </button>
      )}

      {/* Page numbers */}
      {getPages().map((p) => (
        <button
          key={p}
          onClick={() => setPage(p)}
          className="flex flex-col items-center px-3 py-2 min-w-[44px]"
        >
          <span
            className={`w-2 h-2 rounded-full mb-1 transition-colors ${
              p === page ? "bg-[#4285f4]" : "bg-transparent"
            }`}
          />
          <span
            className={`text-[13px] ${
              p === page
                ? "text-[#202124] font-medium"
                : "text-[#1a0dab] hover:underline"
            }`}
          >
            {p}
          </span>
        </button>
      ))}

      {/* Next — arrow flips in RTL via rtl:rotate-180 */}
      {page < 10 && (
        <button
          onClick={() => setPage(page + 1)}
          className="flex flex-col items-center px-3 py-2 text-[#1a0dab] hover:underline"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            className="rtl:rotate-180"
          >
            <path
              d="M9 18L15 12L9 6"
              stroke="#4285f4"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-[13px]">{t("next")}</span>
        </button>
      )}
    </div>
  );
}

// ─── Top Search Bar ───────────────────────────────────────────────────────────

function TopSearchBar({ defaultValue }: { defaultValue: string }) {
  const router = useRouter();
  const [value, setValue] = React.useState(defaultValue);
  const [focused, setFocused] = React.useState(false);

  React.useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    router.push(`/result?q=${encodeURIComponent(value.trim())}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 min-w-0 max-w-[584px]">
      <div
        className={`flex items-center rounded-full px-3 sm:px-4 h-[44px] gap-2 transition-all bg-white ${
          focused
            ? "shadow-[0_1px_6px_rgba(32,33,36,0.28)] border border-transparent"
            : "border border-[#dfe1e5] hover:shadow-[0_1px_6px_rgba(32,33,36,0.28)] hover:border-transparent"
        }`}
      >
        {/* Search icon — inline-start, hidden on mobile */}
        <div className="hidden sm:flex shrink-0 text-[#9aa0a6]">
          <SearchIcon size={18} color="#9aa0a6" />
        </div>

        {/* Input */}
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="flex-1 min-w-0 text-[16px] text-[#202124] outline-none bg-transparent placeholder:text-[#9aa0a6]"
          autoComplete="off"
        />

        {/* Clear button */}
        {value.length > 0 && (
          <button
            type="button"
            onClick={() => setValue("")}
            className="text-[#70757a] hover:text-[#202124] shrink-0"
          >
            <CloseIcon size={20} />
          </button>
        )}

        {/* Divider */}
        <div className="w-px h-[24px] bg-[#dfe1e5] shrink-0 hidden sm:block" />

        {/* Mic — desktop only */}
        <button type="button" className="shrink-0 hidden sm:flex">
          <MicIcon />
        </button>

        {/* Search submit — mobile only */}
        <button
          type="submit"
          className="shrink-0 flex sm:hidden text-[#4285f4]"
        >
          <SearchIcon size={18} color="#4285f4" />
        </button>
      </div>
    </form>
  );
}

// ─── Knowledge Panel ─────────────────────────────────────────────────────────

function KnowledgePanel({ query }: { query: string }) {
  const t = useTranslations("result");

  return (
    <aside className="w-full lg:w-[350px] xl:w-[380px] shrink-0">
      <div className="border border-[#dadce0] rounded-2xl p-5 bg-white">

        {/* Title */}
        <h2 className="text-[22px] font-normal text-[#202124] mb-0.5 leading-tight">
          {query}
        </h2>
        <p className="text-[14px] text-[#70757a] mb-3">{t("searchTopic")}</p>

        {/* Image */}
        <div className="w-full h-[140px] bg-gradient-to-br from-[#e8f0fe] to-[#c5d5fb] rounded-xl mb-3 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://picsum.photos/seed/panel/400/200"
            alt="panel"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Description */}
        <p className="text-[14px] text-[#3c4043] leading-[1.58] mb-3">
          {t("panelDescription")}
        </p>

        {/* Source */}
        <div className="border-t border-[#ebebeb] pt-3">
          <p className="text-[12px] text-[#70757a]">{t("sourceInfo")}</p>
        </div>

        {/* Info rows — no directional margins needed here (gap handles spacing) */}
        <div className="mt-3 space-y-2">
          {[
            { label: "Type",     value: "Web Framework"           },
            { label: "Created",  value: "2016"                    },
            { label: "Language", value: "JavaScript / TypeScript" },
          ].map((row) => (
            <div key={row.label} className="flex gap-2 text-[14px]">
              <span className="text-[#70757a] w-20 shrink-0">{row.label}</span>
              <span className="text-[#202124]">{row.value}</span>
            </div>
          ))}
        </div>

      </div>
    </aside>
  );
}

// ─── Main Result Content ──────────────────────────────────────────────────────

function ResultContent() {
  const t = useTranslations("result");
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [activeTab, setActiveTab] = React.useState<Tab>("all");
  const [page, setPage] = React.useState(1);

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    {
      key: "all",
      label: t("tabs.all"),
      icon: <SearchIcon size={14} />,
    },
    {
      key: "images",
      label: t("tabs.images"),
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
          <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="2" />
          <path d="M21 15L16 10L5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      key: "news",
      label: t("tabs.news"),
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M19 20H5C3.9 20 3 19.1 3 18V6C3 4.9 3.9 4 5 4H15L21 10V18C21 19.1 20.1 20 19 20Z" stroke="currentColor" strokeWidth="2" />
          <path d="M15 4V10H21M7 13H17M7 17H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      key: "videos",
      label: t("tabs.videos"),
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M15 10L19.553 7.724C20.173 7.414 21 7.86 21 8.553V15.447C21 16.14 20.173 16.586 19.553 16.276L15 14V10Z" stroke="currentColor" strokeWidth="2" />
          <rect x="3" y="6" width="13" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
  ];

  const footerLinks = [
    t("footer.about"),
    t("footer.advertising"),
    t("footer.business"),
    t("footer.howSearch"),
    t("footer.privacy"),
    t("footer.terms"),
    t("footer.settings"),
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* ════ HEADER ════ */}
      <header className="sticky top-0 z-20 bg-white border-b border-[#ebebeb]">

        {/* Top row */}
        <div className="flex items-center gap-2 sm:gap-4 px-3 sm:px-6 pt-3 pb-2 max-w-[1200px] mx-auto">

          {/* Logo */}
          <a href="/" className="shrink-0 hidden sm:block">
            <span className="text-[22px] font-normal tracking-tight select-none">
              {"X-MODULE".split("").map((ch, i) => (
                <span key={i} className="text-[#4285f4]">{ch}</span>
              ))}
            </span>
          </a>

          {/* Search bar */}
          <TopSearchBar defaultValue={query} />

          {/* Right icons — ms-auto pushes to inline-end in both LTR and RTL */}
          <div className="flex items-center gap-1 sm:gap-2 ms-auto shrink-0">
            <button className="w-9 h-9 rounded-full hover:bg-[#f1f3f4] hidden sm:flex items-center justify-center">
              <DotsIcon />
            </button>
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1a73e8] flex items-center justify-center text-white text-[13px] font-medium cursor-pointer select-none">
              U
            </div>
          </div>
        </div>

        {/* Tabs row */}
        <div className="flex items-center overflow-x-auto scrollbar-none px-3 sm:px-6 max-w-[1200px] mx-auto">
          {/* Spacer to align tabs under search bar on desktop */}
          {/* <div className="hidden sm:block w-[160px] shrink-0" /> */}

          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1.5 px-3 py-2.5 text-[13px] border-b-[3px] whitespace-nowrap transition-colors shrink-0 ${
                activeTab === tab.key
                  ? "border-[#1a73e8] text-[#1a73e8] font-medium"
                  : "border-transparent text-[#70757a] hover:text-[#202124] hover:bg-[#f8f9fa]"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* ════ BODY ════ */}
      <main className="flex-1 px-3 sm:px-6 pt-3 max-w-[1200px] mx-auto w-full">
        {query ? (
          <>
            {/* Result count — ps- (padding-inline-start) instead of pl- */}
            <div className="sm:ps-[160px]">
              <p className="text-[13px] text-[#70757a] mb-4">
                {t("resultCount", {
                  count: (fakeResults.length * page * 1230).toLocaleString(),
                  seconds: `0.${page}2`,
                })}
              </p>
            </div>

            {/* ── ALL TAB ── */}
            {activeTab === "all" && (
              <div className="flex gap-8">

                {/* Results column — ps- instead of pl- */}
                <div className="flex-1 min-w-0 sm:ps-[160px]">
                  {fakeResults.map((result) => (
                    <ResultCard key={result.id} result={result} />
                  ))}
                  <RelatedSearches />
                  <Pagination page={page} setPage={setPage} />
                </div>

                {/* Knowledge panel */}
                <div className="hidden lg:block">
                  <KnowledgePanel query={query} />
                </div>

              </div>
            )}

            {/* ── IMAGES TAB ── */}
            {activeTab === "images" && (
              <div>
                <p className="text-[13px] text-[#70757a] mb-3">
                  {t("showingImages")} <strong>{query}</strong>
                </p>
                <ImageGrid />
              </div>
            )}

            {/* ── NEWS TAB ── */}
            {activeTab === "news" && (
              // ✅ ps- instead of pl-
              <div className="sm:ps-[160px]">
                <div className="max-w-[652px] divide-y divide-[#ebebeb]">
                  {fakeResults.slice(0, 5).map((r) => (
                    <div
                      key={r.id}
                      className="flex gap-3 py-4 hover:bg-[#f8f9fa] cursor-pointer rounded-lg px-2 -mx-2 transition-colors"
                    >
                      {/* Thumbnail */}
                      <div className="w-[92px] h-[68px] rounded-lg overflow-hidden bg-[#f1f3f4] shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`https://picsum.photos/seed/${r.id}n/200/150`}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] text-[#70757a] mb-1 truncate">
                          {r.displayUrl}
                        </p>
                        <p className="text-[16px] text-[#202124] font-medium leading-snug line-clamp-2">
                          {r.title}
                        </p>
                        <p className="text-[12px] text-[#70757a] mt-1">
                          {r.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── VIDEOS TAB ── */}
            {activeTab === "videos" && (
              // ✅ ps- instead of pl-
              <div className="sm:ps-[160px]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[652px]">
                  {fakeResults.slice(0, 6).map((r) => (
                    <div
                      key={r.id}
                      className="rounded-xl overflow-hidden border border-[#dadce0] hover:shadow-md cursor-pointer transition-shadow"
                    >
                      {/* Thumbnail */}
                      <div className="relative w-full aspect-video bg-[#0d0d0d] overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`https://picsum.photos/seed/${r.id}v/400/225`}
                          alt=""
                          className="w-full h-full object-cover opacity-80"
                        />
                        {/* Play button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-black/60 flex items-center justify-center">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                              <path d="M8 5V19L19 12L8 5Z" />
                            </svg>
                          </div>
                        </div>
                        {/* Duration badge — end-2 instead of right-2 */}
                        <div className="absolute bottom-2 end-2 bg-black/70 text-white text-[11px] px-1.5 py-0.5 rounded">
                          {Math.floor(Math.random() * 20) + 1}:
                          {String(Math.floor(Math.random() * 60)).padStart(2, "0")}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-3 flex gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#f1f3f4] overflow-hidden shrink-0 mt-0.5">
                          <FaviconIcon url={r.url} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[14px] text-[#202124] font-medium leading-snug line-clamp-2">
                            {r.title}
                          </p>
                          <p className="text-[12px] text-[#70757a] mt-1 truncate">
                            {r.displayUrl}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </>
        ) : (

          /* ── No Query ── */
          <div className="flex flex-col items-center justify-center mt-32 text-[#70757a]">
            <SearchIcon size={56} color="#dadce0" />
            <p className="mt-4 text-[16px]">{t("noQuery")}</p>
          </div>
        )}
      </main>

      {/* ════ FOOTER ════ */}
      <footer className="mt-16 bg-[#f2f2f2]">

        {/* Location bar */}
        <div className="px-4 sm:px-8 py-3 border-b border-[#dadce0] text-[14px] text-[#70757a] flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
              fill="#70757a"
            />
          </svg>
          <span>Country/Region</span>
        </div>

        {/* Links */}
        <div className="px-4 sm:px-8 py-3 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-[#70757a]">
          {footerLinks.map((item) => (
            <a key={item} href="#" className="hover:underline">
              {item}
            </a>
          ))}
        </div>
      </footer>

    </div>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#4285f4] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ResultContent />
    </Suspense>
  );
}
