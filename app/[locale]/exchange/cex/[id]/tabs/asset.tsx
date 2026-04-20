"use client";

import { DataGrid } from "@/components/DataGrid/DataGrid";
import { ColumnDef } from "@/components/DataGrid/types";
import { useTranslations } from "next-intl";

export default function AssetTab() {
  const t = useTranslations("exchange.cex.details.tabs.asset")
  const columns: ColumnDef[] = [
    {
      key: "type",
      label: t("type"),
      sortable: true,
      format: "text"
     },
    {
      key: "spot",
      label: "",
      format: "button",
      buttonLabel: t("spot"),
      buttonType: "info",
    },
    { 
      key: "futures",
      label: "",
      format: "button", 
      buttonLabel: t("futures"),
      buttonType: "cancel",
    },
    { 
      key: "orderbook", 
      label: "", 
      format: "button", 
      buttonLabel: t("orderBook"),
      buttonType: "submit"
     },
  ];

  const coins = ["BTC", "ETH", "BNB", "SOL", "XRP", "ADA", "DOGE", "DOT", "AVAX"];

  const mockData = coins.map((c) => ({
    type: c,
    spot: c,
    futures: c,
    orderbook: c,
  }));

  const handleAction = (row: any, col: string) => {
    console.log(col, "clicked for", row.type);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4"> {t("title")} </h2>

      <DataGrid
        columnList={columns}
        dataList={mockData}
        pageSize={5}
        onButtonClick={(event) => handleAction(event.row, event.columnKey)}
      />
    </div>
  );
}
