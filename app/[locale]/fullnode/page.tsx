"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";

const MENU_ITEMS = [
  {
    id: "bitcoin",
    label: "Bit Coin",
    icon: "₿",
    color: "orange",
    subItems: [
      { id: "overview", label: "overview", href: "/fullnode/bitcoin/overview" },
      { id: "install", label: "install", href: "/fullnode/bitcoin/install" },
      { id: "developer", label: "developer", href: "/fullnode/bitcoin/developer" },
      { id: "pricing", label: "pricing", href: "/fullnode/bitcoin/pricing" },
    ],
  },
  {
    id: "doge",
    label: "Doge",
    icon: "Ð",
    color: "yellow",
    subItems: [
      { id: "overview", label: "overview", href: "/fullnode/doge/overview" },
      { id: "install", label: "install", href: "/fullnode/doge/install" },
      { id: "developer", label: "developer", href: "/fullnode/doge/developer" },
      { id: "pricing", label: "pricing", href: "/fullnode/doge/pricing" },
    ],
  },
  {
    id: "ethereum",
    label: "Ethereum",
    icon: "Ξ",
    color: "blue",
    subItems: [
      { id: "overview", label: "overview", href: "/fullnode/ethereum/overview" },
      { id: "install", label: "install", href: "/fullnode/ethereum/install" },
      { id: "developer", label: "developer", href: "/fullnode/ethereum/developer" },
      { id: "pricing", label: "pricing", href: "/fullnode/ethereum/pricing" },
    ],
  },
  {
    id: "binance-smart",
    label: "Binance smart",
    icon: "BNB",
    color: "yellow",
    subItems: [
      { id: "overview", label: "overview", href: "/fullnode/binance-smart/overview" },
      { id: "install", label: "install", href: "/fullnode/binance-smart/install" },
      { id: "developer", label: "developer", href: "/fullnode/binance-smart/developer" },
      { id: "pricing", label: "pricing", href: "/fullnode/binance-smart/pricing" },
    ],
  },
  {
    id: "tron",
    label: "Tron",
    icon: "TRX",
    color: "red",
    subItems: [
      { id: "overview", label: "overview", href: "/fullnode/tron/overview" },
      { id: "install", label: "install", href: "/fullnode/tron/install" },
      { id: "developer", label: "developer", href: "/fullnode/tron/developer" },
      { id: "pricing", label: "pricing", href: "/fullnode/tron/pricing" },
    ],
  },
  {
    id: "polygon",
    label: "Polygon",
    icon: "MATIC",
    color: "purple",
    subItems: [
      { id: "overview", label: "overview", href: "/fullnode/polygon/overview" },
      { id: "install", label: "install", href: "/fullnode/polygon/install" },
      { id: "developer", label: "developer", href: "/fullnode/polygon/developer" },
      { id: "pricing", label: "pricing", href: "/fullnode/polygon/pricing" },
    ],
  },
];

const colorStyles = {
  orange: {
    bg: "bg-slate-700",
    hover: "hover:bg-slate-800",
    text: "text-slate-600",
    border: "border-slate-300",
    light: "bg-slate-100",
    gradient: "from-slate-700 to-slate-800",
    accent: "text-amber-600",
    iconBg: "bg-amber-50",
  },
  green: {
    bg: "bg-slate-700",
    hover: "hover:bg-slate-800",
    text: "text-slate-600",
    border: "border-slate-300",
    light: "bg-slate-100",
    gradient: "from-slate-700 to-slate-800",
    accent: "text-emerald-600",
    iconBg: "bg-emerald-50",
  },
  blue: {
    bg: "bg-slate-700",
    hover: "hover:bg-slate-800",
    text: "text-slate-600",
    border: "border-slate-300",
    light: "bg-slate-100",
    gradient: "from-slate-700 to-slate-800",
    accent: "text-blue-600",
    iconBg: "bg-blue-50",
  },
  red: {
    bg: "bg-slate-700",
    hover: "hover:bg-slate-800",
    text: "text-slate-600",
    border: "border-slate-300",
    light: "bg-slate-100",
    gradient: "from-slate-700 to-slate-800",
    accent: "text-rose-600",
    iconBg: "bg-rose-50",
  },
  yellow: {
    bg: "bg-slate-700",
    hover: "hover:bg-slate-800",
    text: "text-slate-600",
    border: "border-slate-300",
    light: "bg-slate-100",
    gradient: "from-slate-700 to-slate-800",
    accent: "text-yellow-600",
    iconBg: "bg-yellow-50",
  },
  purple: {
    bg: "bg-slate-700",
    hover: "hover:bg-slate-800",
    text: "text-slate-600",
    border: "border-slate-300",
    light: "bg-slate-100",
    gradient: "from-slate-700 to-slate-800",
    accent: "text-violet-600",
    iconBg: "bg-violet-50",
  },
};


export default function FullNodePage() {
  const t = useTranslations("fullnode");
  const [openMenu, setOpenMenu] = useState<string | null>("bitcoin");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = (id: string) => {
    setOpenMenu(openMenu === id ? null : id);
  };

  return (
    <div className="min-h-screen -mt-4 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-0 left-0 h-screen bg-white border-r border-gray-200 shadow-xl z-50 transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          } w-72`}
        >
          {/* Header - آبی شیک و حرفه‌ای */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
                {t("fullNode")}
            </h2>
            <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="lg:hidden text-white hover:text-blue-100"
            >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
          </div>


          {/* Menu Items */}
          <nav className="p-4 overflow-y-auto h-[calc(100vh-4rem)]">
            <div className="space-y-1.5">
              {MENU_ITEMS.map((item) => {
                const style = colorStyles[item.color as keyof typeof colorStyles];
                const isOpen = openMenu === item.id;

                return (
                  <div key={item.id} className="group">
                    {/* Main Menu Button - آبی برای active */}
                    <button
                      onClick={() => toggleMenu(item.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
                        isOpen
                          ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md"
                          : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm ${
                            isOpen
                              ? "bg-white/15 text-white"
                              : `${style.iconBg} ${style.accent}`
                          }`}
                        >
                          {item.icon}
                        </div>
                        <span className="font-medium text-sm">{item.label}</span>
                      </div>
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-white/70" : "text-gray-400"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Submenu */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        isOpen ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="ml-4 pl-4 border-l border-gray-200 space-y-0.5 py-1">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.id}
                            href={subItem.href}
                            className="block px-3 py-2 rounded-lg text-sm text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-all duration-150"
                          >
                            {t(subItem.label)}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </nav>
        </aside>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          {/* Top Bar */}
          <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
            <div className="h-16 px-6 flex items-center justify-between">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-sm font-medium text-gray-600">{t("allNodesOnline")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="hidden p-6 lg:p-8">
            {/* Hero Section */}
            <div className="mb-8">
              <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 lg:p-12 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
                
                <div className="relative z-10">
                  <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                    {t("welcomeToFullNode")}
                  </h1>
                  <p className="text-gray-300 text-lg max-w-2xl">
                    {t("fullNodeDescription")}
                  </p>
                  
                  <div className="mt-8 flex flex-wrap gap-4">
                    <button className="px-6 py-3 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl">
                      {t("getStarted")}
                    </button>
                    <button className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/20">
                      {t("documentation")}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { label: "activeNodes", value: "24", icon: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01", color: "blue" },
                { label: "totalRequests", value: "1.2M", icon: "M13 10V3L4 14h7v7l9-11h-7z", color: "green" },
                { label: "uptime", value: "99.9%", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", color: "purple" },
                { label: "avgResponse", value: "45ms", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", color: "orange" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-${stat.color}-50 flex items-center justify-center`}>
                      <svg className={`w-6 h-6 text-${stat.color}-600`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                      </svg>
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-500">{t(stat.label)}</p>
                </div>
              ))}
            </div>

            {/* Blockchain Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MENU_ITEMS.map((item) => {
                const style = colorStyles[item.color as keyof typeof colorStyles];
                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1"
                  >
                    <div className={`h-2 bg-gradient-to-r ${style.gradient}`} />
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${style.gradient} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{item.label}</h3>
                          <p className="text-sm text-gray-500">{t("fullNodeService")}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-6">
                        {item.subItems.slice(0, 3).map((sub) => (
                          <div key={sub.id} className="flex items-center gap-2 text-sm text-gray-600">
                            <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{t(sub.label)}</span>
                          </div>
                        ))}
                      </div>

                      <Link
                        href={item.subItems[0].href}
                        className={`block w-full text-center px-4 py-3 rounded-lg bg-gradient-to-r ${style.gradient} text-white font-semibold hover:shadow-lg transition-all`}
                      >
                        {t("explore")}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
