"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ColumnDef } from "@/components/DataGrid/types";
import { DataGrid } from "@/components/DataGrid/DataGrid";
import { useTranslations } from "next-intl";

type StakingType = "crypto" | "fiat" | "metal";

interface StakingAsset {
  asset: string;
  min: number;  // joda shod
  max: number;  // joda shod
  income: string;
}

const MOCK_DATA: Record<StakingType, StakingAsset[]> = {
  crypto: [
    { asset: "Bitcoin", min: 0.001, max: 10, income: "4.5%" },
    { asset: "Ethereum", min: 0.01, max: 50, income: "5.2%" },
    { asset: "Binance Coin", min: 0.1, max: 100, income: "6.8%" },
    { asset: "Solana", min: 1, max: 500, income: "7.1%" },
    { asset: "Cardano", min: 10, max: 10000, income: "4.9%" },
    { asset: "Polkadot", min: 1, max: 1000, income: "12.5%" },
    { asset: "Avalanche", min: 0.5, max: 200, income: "8.3%" },
    { asset: "Polygon", min: 5, max: 5000, income: "6.2%" },
  ],
  fiat: [
    { asset: "USD", min: 100, max: 100000, income: "3.5%" },
    { asset: "EUR", min: 100, max: 100000, income: "3.2%" },
    { asset: "GBP", min: 100, max: 100000, income: "3.8%" },
    { asset: "JPY", min: 10000, max: 10000000, income: "2.1%" },
    { asset: "CHF", min: 100, max: 100000, income: "2.8%" },
    { asset: "AUD", min: 100, max: 100000, income: "4.2%" },
  ],
  metal: [
    { asset: "Gold", min: 1, max: 100, income: "2.5%" },
    { asset: "Silver", min: 10, max: 1000, income: "3.1%" },
    { asset: "Platinum", min: 1, max: 50, income: "2.8%" },
    { asset: "Palladium", min: 1, max: 50, income: "3.3%" },
    { asset: "Copper", min: 50, max: 5000, income: "1.9%" },
    { asset: "Aluminum", min: 100, max: 10000, income: "1.5%" },
  ],
};

export default function StakingPage() {
  const t = useTranslations("staking");
  const params = useParams();
  const type = params?.type as StakingType;
  const [data, setData] = useState<StakingAsset[]>([]);

  useEffect(() => {
    if (type && MOCK_DATA[type]) {
      setData(MOCK_DATA[type]);
    } else {
      setData([]);
    }
  }, [type]);

  const columns: ColumnDef[] = [
    {
      key: "asset",
      label: t("columns.asset"),
      sortable: true,
      format: "text",
    },
    {
      key: "invesrment",
      label: t("columns.invesrment"),
      sortable: false,
      format: "text",
      dataFunction: (item: StakingAsset) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>{item.min}</span>
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              strokeLinecap="round" 
              strokeLinejoin="round"
              style={{ color: '#666' }}
            >
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
            <span>{item.max}</span>
          </div>
        );
      },
    },
    {
      key: "income",
      label: t("columns.income"),
      sortable: true,
      format: "text",
    },
    {
      key: "action",
      label: "",
      format: "button",
      buttonLabel: t("buttons.buy"),
    },
  ];

  const handleButtonClick = (item: StakingAsset) => {
    console.log("Buy clicked:", item);
  };

  if (!type || !MOCK_DATA[type]) {
    return (
      <div className="max-w-5xl w-full mx-auto mt-5 px-3">
        <p className="text-red-500">{t("errors.invalidType")}</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl w-full mx-auto mt-5 px-3">
      <div className="mb-6">
        <h1 className="text-[1.5rem] font-bold text-[#332d87] m-0 capitalize">
          {t(`types.${type}`)} {t("title")}
        </h1>
        <p className="text-gray-600 mt-2">{t("subtitle")}</p>
      </div>

      <DataGrid
        columnList={columns}
        dataList={data}
        pageSize={8}
        onButtonClick={handleButtonClick}
      />
    </div>
  );
}
