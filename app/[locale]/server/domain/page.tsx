"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ColumnDef } from "@/components/DataGrid/types";
import { DataGrid } from "@/components/DataGrid/DataGrid";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";

export default function DomainSearchPage() {
  const t = useTranslations("server.domain");

  const [domain, setDomain] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [showGrid, setShowGrid] = useState(false);

  const columns: ColumnDef[] = [
    {
      key: "domain",
      label: t("domain"),
      sortable: true,
      format: "text",
    },
    {
      key: "price",
      label: t("price"),
      sortable: true,
      format: "money",
      decimalPlace: 2,
    },
    {
      key: "action",
      label: "",
      format: "button",
      buttonLabel: t("buy"),
    },
  ];

  const EXTENSIONS = [".com", ".net", ".org", ".ir", ".dev", ".co", ".io"];

  // تابع ساخت mock مشابه ورودی
  const generateMockData = (keyword: string) => {
    const randomPrice = () => (Math.random() * 15 + 5).toFixed(2);

    const variations = [
      `${keyword}`,
      `${keyword}site`,
      `${keyword}web`,
      `my${keyword}`,
      `${keyword}online`,
      `${keyword}-shop`,
      `${keyword}hub`,
      `${keyword}store`,
      `${keyword}-app`,
      `${keyword}plus`,
      `${keyword}center`,
      `real-${keyword}`,
      `${keyword}24`,
    ];

    // ترکیب نام‌ها با پسوندها
    const results = variations.flatMap(name =>
      EXTENSIONS.map(ext => ({
        domain: `${name}${ext}`,
        price: Number(randomPrice()),
      }))
    );

    // 12 مورد اول کافی است
    return results.slice(0, 12);
  };

  const handleSearch = () => {
    if (!domain) return;

    const result = generateMockData(domain.toLowerCase());
    setData(result);
    setShowGrid(true);
  };

  const handleButtonClick = (item: any) => {
    console.log("Buy clicked:", item);
  };

  return (
    <div className="max-w-4xl w-full mx-auto mt-1 md:mt-5 px-3">
      <div className="mb-2 md:mb-6">
        <h1 className="text-[1.5rem] font-bold text-[#332d87] m-0">
          {t("title")}
        </h1>
      </div>

      <div className="flex gap-3 mb-6">
        <div className="flex-[3]">
          <CustomInput
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            label={t("enterDomain")}
          />
        </div>

        <div className="flex-[1]">
          <CustomButton 
            btnType="info" 
            onClick={handleSearch}
            disabled={!domain}
            type="button"
          >
            {t("search")}
          </CustomButton>
        </div>
      </div>

      {showGrid && (
        <DataGrid
          columnList={columns}
          dataList={data}
          pageSize={5}
          onButtonClick={handleButtonClick}
        />
      )}
    </div>
  );
}
