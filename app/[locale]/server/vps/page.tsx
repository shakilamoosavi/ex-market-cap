"use client";

import { useMemo } from "react";
import InfiniteScroll from "@/components/InfiniteScroll";
import { VPSCard } from "./vpscard";
import { useTranslations } from "next-intl";

export default function VPSPage() {
  const t = useTranslations("server.vps");
  const items = useMemo(() => {
    return Array.from({ length: 80 }).map((_, i) => ({
      id: crypto.randomUUID(),
      name: `UPS ${i + 1}`,
      cpu: "12 Core",
      ram: "Ram 4GB",
      storage: "H.DD 120GB",
      price: "120$",
    }));
  }, []);

  return (
    <div className="w-full py-10 px-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-8 text-gray-800">
        {t('title')}
      </h1>

      <InfiniteScroll items={items} perPage={9}>
        {(visible: any) => (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((v) => (
              <VPSCard key={v.id} {...v} />
            ))}
          </div>
        )}
      </InfiniteScroll>
    </div>
  );
}
