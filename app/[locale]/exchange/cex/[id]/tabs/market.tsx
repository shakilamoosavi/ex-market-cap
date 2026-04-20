"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { ColumnDef } from "@/components/DataGrid/types";
import { DataGrid } from "@/components/DataGrid/DataGrid";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";

const MOCK_PAIRS = [
  { symbol: "BTC/USDT" },
  { symbol: "ETH/USDT" },
  { symbol: "BNB/USDT" },
  { symbol: "SOL/USDT" },
  { symbol: "XRP/USDT" },
  { symbol: "DOGE/USDT" },
  { symbol: "ADA/USDT" },
  { symbol: "AVAX/USDT" },
  { symbol: "MATIC/USDT" },
  { symbol: "LINK/USDT" },
  { symbol: "DOT/USDT" },
  { symbol: "LTC/USDT" },
  { symbol: "UNI/USDT" },
  { symbol: "ATOM/USDT" },
  { symbol: "TRX/USDT" },
];

export default function MarketTabPage() {
  const t = useTranslations("exchange.cex.details.tabs.market")

  const [query, setQuery] = useState("");
  const [data, setData] = useState<any[]>(MOCK_PAIRS);

  const columns: ColumnDef[] = [
    {
      key: "symbol",
      label: t("pair"),
      sortable: true,
      format: "text",
    },
  ];

  const handleSearch = () => {
    const q = query.trim().toLowerCase();
    const result = q
      ? MOCK_PAIRS.filter(p => p.symbol.toLowerCase().includes(q))
      : MOCK_PAIRS;
    setData(result);
  };

  return (
    <div className="max-w-5xl w-full mx-auto mt-1 md:mt-5 px-3">
      <div className="mb-2 md:mb-6">
        <h1 className="text-[1.5rem] font-bold text-[#332d87] m-0">
          {t("title")}
        </h1>
      </div>

      <div className="flex gap-3 mb-6">
        <div className="flex-[3]">
          <CustomInput
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            label={t("searchPlaceholder")}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="uppercase"
          />
        </div>

        <div className="flex-[1]">
          <CustomButton
            btnType="info"
            onClick={handleSearch}
            type="button"
          >
            {t("search")}
          </CustomButton>
        </div>
      </div>

      <DataGrid
        columnList={columns}
        dataList={data}
        pageSize={8}
      />
    </div>
  );
}
