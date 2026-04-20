"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ColumnDef } from "@/components/DataGrid/types";
import { DataGrid } from "@/components/DataGrid/DataGrid";
import { useTranslations } from "next-intl";

type AssetType = "crypto" | "energy" | "metal";

const MOCK_DATA: Record<AssetType, Array<{ asset: string; price: number }>> = {
  crypto: [
    { asset: "Bitcoin", price: 94250.12 },
    { asset: "Ethereum", price: 3210.45 },
    { asset: "Binance Coin", price: 612.8 },
    { asset: "Solana", price: 178.55 },
    { asset: "Ripple", price: 0.5923 },
    { asset: "Cardano", price: 0.4581 },
    { asset: "Avalanche", price: 38.92 },
    { asset: "Polkadot", price: 7.21 },
  ],
  energy: [
    { asset: "Crude Oil (WTI)", price: 78.45 },
    { asset: "Brent Crude", price: 82.3 },
    { asset: "Natural Gas", price: 2.87 },
    { asset: "Heating Oil", price: 2.45 },
    { asset: "Gasoline", price: 2.34 },
    { asset: "Coal", price: 145.6 },
  ],
  metal: [
    { asset: "Gold", price: 2340.5 },
    { asset: "Silver", price: 28.75 },
    { asset: "Platinum", price: 1050.2 },
    { asset: "Palladium", price: 980.4 },
    { asset: "Copper", price: 4.23 },
    { asset: "Aluminum", price: 2.45 },
    { asset: "Nickel", price: 18.9 },
  ],
};

export default function AssetPage() {
  const t = useTranslations("asset");
  const params = useParams();
  const type = params?.type as AssetType;
  const [data, setData] = useState<any[]>([]);

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
      key: "price",
      label: t("columns.price"),
      sortable: true,
      format: "money",
      decimalPlace: 2,
    },
    {
      key: "action",
      label: "",
      format: "button",
      buttonLabel: t("buttons.monitor"),
    },
  ];

  const handleButtonClick = (item: any) => {
    console.log("Monitor clicked:", item);
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
