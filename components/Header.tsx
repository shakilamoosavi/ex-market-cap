"use client";
import UserDropdown from "./UserDropdown";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useCurrency } from "./CurrencyProvider";
import type { CurrencyCode } from "./CurrencyProvider";
import { useAuth } from "./auth/AuthProvider";
import React, { useState, useRef, useEffect } from "react";
import { Bars3Icon, ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "./Logo";

const currencies = [
  { code: "usd", label: "USD" },
  { code: "irr", label: "IRR" },
];

const languages = [
  { code: "en", label: "EN" },
  { code: "fa", label: "FA" },
  { code: "ar", label: "AR" },
];

const navItems = [
  { key: "exchange", label: "Exchange", children: ["Cex", "Dex", "Bridge", "Broker"] },
  { key: "asset", label: "Asset", children: ["Crypto", "Energy", "Metal"] },
  { key: "announcement", label: "Announcement", children: [] },
  { key: "repo", label: "Repo", children: ["AI", "Wallet", "Rpc", "Developer"] },
  { key: "server", label: "Server", children: ["Domain", "Host", "VPS", "Server", "Monitoring", "Tools"] },
  { key: "staking", label: "Staking", children: ["Crypto", "Fiat", "Metal"] },
  { key: "orders", label: "Orders", children: [] },
  { key: "fullnode", label: "FullNode", children: [] },
  { key: "events", label: "Events", children: [] },
  { key: "faq", label: "FAQ", children: [] },
  { key: "contact", label: "Contact", children: ["About", "Contact"] },
];

export default function Header() {
  const [langOpen, setLangOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [mobileOpenSubmenu, setMobileOpenSubmenu] = useState<string | null>(null);

  const desktopLangRef = useRef<HTMLDivElement>(null);
  const desktopCurrencyRef = useRef<HTMLDivElement>(null);
  const mobileLangRef = useRef<HTMLDivElement>(null);
  const mobileCurrencyRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("header");
  const { currency, setCurrency, convertFromUSD } = useCurrency();
  const { user, logout } = useAuth();
  const searchParams = useSearchParams();

  const isRTL = locale.startsWith("ar") || locale.startsWith("fa");

  // Helper to check if menu item is active
  const isActive = (itemKey: string) => {
    const pathWithoutLocale = pathname.replace(/^\/(en-US|fa-IR|ar-AE|en|fa|ar)/, "");
    return pathWithoutLocale.startsWith(`/${itemKey}`);
  };

  // Helper to check if submenu child is active
  const isChildActive = (itemKey: string, child: string) => {
    const pathWithoutLocale = pathname.replace(/^\/(en-US|fa-IR|ar-AE|en|fa|ar)/, "");
    return pathWithoutLocale === `/${itemKey}/${slugify(child)}`;
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (desktopLangRef.current && !desktopLangRef.current.contains(target)) setLangOpen(false);
      if (desktopCurrencyRef.current && !desktopCurrencyRef.current.contains(target)) setCurrencyOpen(false);
      if (mobileLangRef.current && !mobileLangRef.current.contains(target)) setLangOpen(false);
      if (mobileCurrencyRef.current && !mobileCurrencyRef.current.contains(target)) setCurrencyOpen(false);
      if (navRef.current && !navRef.current.contains(target)) setOpenSubmenu(null);
    }
    document.addEventListener("mousedown", handleClickOutside, true);
    return () => document.removeEventListener("mousedown", handleClickOutside, true);
  }, []);

  function getQueryString() {
    if (!searchParams) return "";
    const entries = Array.from(searchParams.entries());
    if (entries.length === 0) return "";
    return "?" + entries.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join("&");
  }

  function slugify(str: string) {
    return str.toLowerCase().replace(/\s+/g, "-");
  }

  function changeLang(code: string) {
    const newPath = pathname.replace(/^\/(en-US|fa-IR|ar-AE|en|fa|ar)/, "");
    router.replace(`/${code}${newPath}${getQueryString()}`);
    setLangOpen(false);
    setMenuOpen(false);
  }

  return (
    <header className="fixed top-0 start-0 w-full z-[100] bg-white dark:bg-zinc-900 shadow-md transition-colors duration-200">
      {/* Top bar */}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 h-14">
        {/* Logo */}
        <Link href={`/${locale}/`} className="flex items-center shrink-0">
          <Logo/>
        </Link>

        {/* Desktop nav */}
        <nav ref={navRef} className="hidden lg:flex items-center gap-1 mx-4 flex-1 justify-center">
          {navItems.map((item) => {
            const active = isActive(item.key);
            return (
              <div key={item.key} className="relative">
                {item.children.length > 0 ? (
                  <>
                    <button
                      className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded transition-colors whitespace-nowrap ${
                        active
                          ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                          : "text-zinc-700 dark:text-zinc-200 hover:text-blue-600 dark:hover:text-blue-400"
                      }`}
                      onClick={() => setOpenSubmenu(openSubmenu === item.key ? null : item.key)}
                    >
                      {item.label}
                      <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform duration-200 ${openSubmenu === item.key ? "rotate-180" : ""}`} />
                    </button>
                    {openSubmenu === item.key && (
                      <ul className="absolute top-full mt-1 start-0 bg-white dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700 rounded-lg shadow-lg py-1 min-w-[140px] z-[100]">
                        {item.children.map((child) => {
                          const childActive = isChildActive(item.key, child);
                          return (
                            <li key={child}>
                              <Link
                                href={`/${locale}/${item.key}/${slugify(child)}`}
                                className={`block px-4 py-2 text-sm whitespace-nowrap ${
                                  childActive
                                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium"
                                    : "text-zinc-600 dark:text-zinc-300 hover:bg-blue-50 dark:hover:bg-zinc-700 hover:text-blue-600"
                                }`}
                                onClick={() => setOpenSubmenu(null)}
                              >
                                {child}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    href={`/${locale}/${item.key}`}
                    className={`block px-3 py-2 text-sm font-medium rounded transition-colors whitespace-nowrap ${
                      active
                        ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                        : "text-zinc-700 dark:text-zinc-200 hover:text-blue-600 dark:hover:text-blue-400"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        {/* Desktop controls */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          {/* Language */}
          <div className="relative" ref={desktopLangRef}>
            <button
              className="flex items-center gap-1.5 border border-gray-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 rounded-md px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition hover:border-blue-400"
              onClick={() => { setLangOpen((v) => !v); setCurrencyOpen(false); }}
            >
              <img src={`/assets/images/flags/${locale.split("-")[0].toUpperCase()}.png`} alt={locale} className="w-4 h-4 rounded-full" />
              <span className="font-medium uppercase">{locale.split("-")[0]}</span>
              <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`} />
            </button>
            <ul
              className={`absolute end-0 mt-1.5 w-28 bg-white dark:bg-zinc-800 shadow-lg border border-gray-100 dark:border-zinc-700 rounded-lg py-1 z-[100] transition-all duration-150 origin-top ${
                langOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
              }`}
              role="listbox"
            >
              {languages.map((l) => (
                <li
                  key={l.code}
                  className={`flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-blue-50 dark:hover:bg-zinc-700 ${
                    locale.startsWith(l.code) ? "font-bold text-blue-600" : "text-zinc-700 dark:text-zinc-200"
                  }`}
                  onMouseDown={() => changeLang(l.code)}
                >
                  <img src={`/assets/images/flags/${l.code}.png`} alt={l.label} className="w-4 h-4 rounded-full" />
                  <span>{l.label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Currency */}
          <div className="relative" ref={desktopCurrencyRef}>
            <button
              className="flex items-center gap-1.5 border border-gray-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 rounded-md px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition hover:border-blue-400"
              onClick={() => { setCurrencyOpen((v) => !v); setLangOpen(false); }}
            >
              <span className="font-medium">{currency?.toUpperCase()}</span>
              <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform duration-200 ${currencyOpen ? "rotate-180" : ""}`} />
            </button>
            <ul
              className={`absolute end-0 mt-1.5 w-24 bg-white dark:bg-zinc-800 shadow-lg border border-gray-100 dark:border-zinc-700 rounded-lg py-1 z-[100] transition-all duration-150 origin-top ${
                currencyOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
              }`}
              role="listbox"
            >
              {currencies.map((c) => (
                <li
                  key={c.code}
                  className={`px-3 py-2 text-sm cursor-pointer hover:bg-blue-50 dark:hover:bg-zinc-700 ${
                    currency === c.code ? "font-bold text-blue-600" : "text-zinc-700 dark:text-zinc-200"
                  }`}
                  onMouseDown={() => { setCurrency(c.code as CurrencyCode); setCurrencyOpen(false); }}
                >
                  {c.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
        >
          <Bars3Icon className="w-6 h-6 text-zinc-700 dark:text-zinc-200" />
        </button>
      </div>

      {/* Mobile drawer overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-[100] transition-opacity duration-300 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        style={{ backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: menuOpen ? "blur(2px)" : "none" }}
        onMouseDown={(e) => { if (e.target === e.currentTarget) setMenuOpen(false); }}
      >
        {/* Drawer panel */}
        <div
          className={`absolute top-0 h-full w-72 max-w-[85vw] bg-white dark:bg-zinc-900 shadow-xl flex flex-col transition-transform duration-300 ease-in-out ${
            isRTL ? "right-0" : "left-0"
          } ${
            menuOpen
              ? "translate-x-0"
              : isRTL
              ? "translate-x-full"
              : "-translate-x-full"
          }`}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between px-4 h-14 border-b border-gray-100 dark:border-zinc-700 shrink-0">
            <Link href={`/${locale}/`} onClick={() => setMenuOpen(false)}>
              <Logo/>
            </Link>
            <button
              className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <XMarkIcon className="w-5 h-5 text-zinc-700 dark:text-zinc-200" />
            </button>
          </div>

          {/* Drawer nav */}
          <nav className="flex-1 overflow-y-auto py-3">
            {navItems.map((item) => {
              const active = isActive(item.key);
              return (
                <div key={item.key}>
                  {item.children.length > 0 ? (
                    <>
                      <button
                        className={`w-full flex items-center justify-between px-5 py-2.5 text-sm font-medium transition-colors ${
                          active
                            ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                            : "text-zinc-700 dark:text-zinc-200 hover:bg-blue-50 dark:hover:bg-zinc-800"
                        }`}
                        onClick={() => setMobileOpenSubmenu(mobileOpenSubmenu === item.key ? null : item.key)}
                      >
                        {item.label}
                        <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${mobileOpenSubmenu === item.key ? "rotate-180" : ""}`} />
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          mobileOpenSubmenu === item.key ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="bg-gray-50 dark:bg-zinc-800/50">
                          {item.children.map((child) => {
                            const childActive = isChildActive(item.key, child);
                            return (
                              <Link
                                key={child}
                                href={`/${locale}/${item.key}/${slugify(child)}`}
                                className={`block px-8 py-2 text-sm transition-colors ${
                                  childActive
                                    ? "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 font-medium"
                                    : "text-zinc-500 dark:text-zinc-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-zinc-700"
                                }`}
                                onClick={() => setMenuOpen(false)}
                              >
                                {child}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={`/${locale}/${item.key}`}
                      className={`block px-5 py-2.5 text-sm font-medium transition-colors ${
                        active
                          ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                          : "text-zinc-700 dark:text-zinc-200 hover:bg-blue-50 dark:hover:bg-zinc-800 hover:text-blue-600"
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Drawer footer: lang + currency */}
          <div className="shrink-0 border-t border-gray-100 dark:border-zinc-700 p-4 flex items-center gap-3">
            {/* Mobile Language */}
            <div className="relative flex-1" ref={mobileLangRef}>
              <button
                className="w-full flex items-center justify-between gap-1.5 border border-gray-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 rounded-md px-2.5 py-1.5 text-sm"
                onClick={() => { setLangOpen((v) => !v); setCurrencyOpen(false); }}
              >
                <div className="flex items-center gap-1.5">
                  <img src={`/assets/images/flags/${locale.split("-")[0].toUpperCase()}.png`} alt={locale} className="w-4 h-4 rounded-full" />
                  <span className="uppercase">{locale.split("-")[0]}</span>
                </div>
                <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`} />
              </button>
              {langOpen && (
                <ul className="absolute bottom-full mb-1 start-0 w-full bg-white dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700 rounded-lg shadow-lg py-1 z-[100]">
                  {languages.map((l) => (
                    <li
                      key={l.code}
                      className={`flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-blue-50 dark:hover:bg-zinc-700 ${
                        locale.startsWith(l.code) ? "font-bold text-blue-600" : "text-zinc-700 dark:text-zinc-200"
                      }`}
                      onMouseDown={() => changeLang(l.code)}
                    >
                      <img src={`/assets/images/flags/${l.code}.png`} alt={l.label} className="w-4 h-4 rounded-full" />
                      <span>{l.label}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Mobile Currency */}
            <div className="relative flex-1" ref={mobileCurrencyRef}>
              <button
                className="w-full flex items-center justify-between gap-1.5 border border-gray-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 rounded-md px-2.5 py-1.5 text-sm"
                onClick={() => { setCurrencyOpen((v) => !v); setLangOpen(false); }}
              >
                <span className="font-medium">{currency?.toUpperCase()}</span>
                <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform duration-200 ${currencyOpen ? "rotate-180" : ""}`} />
              </button>
              {currencyOpen && (
                <ul className="absolute bottom-full mb-1 start-0 w-full bg-white dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700 rounded-lg shadow-lg py-1 z-[100]">
                  {currencies.map((c) => (
                    <li
                      key={c.code}
                      className={`px-3 py-2 text-sm cursor-pointer hover:bg-blue-50 dark:hover:bg-zinc-700 ${
                        currency === c.code ? "font-bold text-blue-600" : "text-zinc-700 dark:text-zinc-200"
                      }`}
                      onMouseDown={() => { setCurrency(c.code as CurrencyCode); setCurrencyOpen(false); setMenuOpen(false); }}
                    >
                      {c.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
