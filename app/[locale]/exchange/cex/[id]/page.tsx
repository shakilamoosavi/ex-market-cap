"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import OverviewTab from "./tabs/overview";
import AssetTab from "./tabs/asset";
import AnnouncementTab from "./tabs/announcement";
import NewsTab from "./tabs/news";
import NewlistingTab from "./tabs/newlisting";
import MarketTab from "./tabs/market";


export default function CexDetailPage() {
  const t = useTranslations("exchange.cex.details")
  const tabs = ["overview", "asset", "announcement", "news", "newlisting", "market"];
  const [activeTab, setActiveTab] = useState("overview");

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab />;
      case "asset":
        return <AssetTab />;
      case "announcement":
        return <AnnouncementTab />;
      case "news":
        return <NewsTab />;
      case "newlisting":
        return <NewlistingTab />;
      case "market":
        return <MarketTab />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl w-full mx-auto px-4 py-6">

      <div className="flex gap-5 border-b border-gray-200 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`p-2 text-sm font-medium transition hover:bg-[#865df612]
              ${activeTab === tab ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"}
            `}
          >
            {t(tab)}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {renderTabContent()}
      </div>

    </div>
  );
}
