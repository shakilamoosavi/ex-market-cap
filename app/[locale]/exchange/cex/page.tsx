'use client';

import React, { useState } from 'react';
import { DataGrid } from '@/components/DataGrid/DataGrid';
import { ButtonClickEvent, ColumnDef } from '@/components/DataGrid/types';
import { useLocale, useTranslations } from 'next-intl';



const data = [
  { name: 'Binance', proofOfreserve: 125655.23, action: null },
  { name: 'Coinbase', proofOfreserve: 98432.10, action: null },
  { name: 'Kraken', proofOfreserve: 54210.75, action: null },
  { name: 'OKX', proofOfreserve: 210000.00, action: null },
  { name: 'Bybit', proofOfreserve: 73891.50, action: null },
  { name: 'KuCoin', proofOfreserve: 41230.99, action: null },
  { name: 'Bitfinex', proofOfreserve: 88750.00, action: null },
  { name: 'Huobi', proofOfreserve: 31540.60, action: null },
  { name: 'Gate.io', proofOfreserve: 19870.45, action: null },
  { name: 'MEXC', proofOfreserve: 62100.30, action: null },
  { name: 'Deribit', proofOfreserve: 47300.00, action: null },
  { name: 'Bitget', proofOfreserve: 55900.80, action: null },
];

export default function CexPage() {
  const t = useTranslations("exchange.cex");
  const locale = useLocale();
  const columns: ColumnDef[] = [
    {
      key: 'name',
      label: t("name"),
      sortable: true,
      format: 'text',
    },
    {
      key: 'proofOfreserve',
      label: t('proofOfreserve'),
      sortable: true,
      format: 'money',
      decimalPlace: 2,
    },
    {
      key: 'action',
      label: '',
      format: 'button',
      buttonLabel: t('detail'),
      linkUrl: `/${locale}/exchange/cex/@@name@@`
    },
  ];
  const [lastClick, setLastClick] = useState<ButtonClickEvent | null>(null);


  return (
    <div className="max-w-4xl w-full mx-auto mt-1 md:mt-5 px-3">
      <div className="mb-2 md:mb-6">
        <h1 className="text-[1.5rem] font-bold text-[#332d87] m-0">
          {t("title")}
        </h1>
        <p className="text-[.9rem] text-[#6b7280] mt-3">
          {t("subtitle")}
        </p>
      </div>

      <DataGrid
        columnList={columns}
        dataList={data}
        pageSize={5}
      />
    </div>
  );
}
