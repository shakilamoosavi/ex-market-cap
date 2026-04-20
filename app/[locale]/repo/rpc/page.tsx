'use client';

import React, { useState } from 'react';
import { DataGrid } from '@/components/DataGrid/DataGrid';
import { ButtonClickEvent, ColumnDef } from '@/components/DataGrid/types';
import { useLocale, useTranslations } from 'next-intl';

const data = [
  { rpc: 'https://mainnet.infura.io/v3/...', pro: false, action: null },
  { rpc: 'https://eth-mainnet.alchemyapi.io/v2/...', pro: true, action: null },
  { rpc: 'https://rpc.ankr.com/eth', pro: false, action: null },
  { rpc: 'https://cloudflare-eth.com', pro: false, action: null },
  { rpc: 'https://eth.llamarpc.com', pro: false, action: null },
  { rpc: 'https://rpc.flashbots.net', pro: true, action: null },
  { rpc: 'https://mainnet.eth.cloud.ava.do', pro: false, action: null },
  { rpc: 'https://api.mycryptoapi.com/eth', pro: true, action: null },
  { rpc: 'https://rpc.mevblocker.io', pro: false, action: null },
  { rpc: 'https://eth.rpc.blxrbdn.com', pro: true, action: null },
  { rpc: 'https://virginia.rpc.blxrbdn.com', pro: true, action: null },
  { rpc: 'https://uk.rpc.blxrbdn.com', pro: false, action: null },
];

export default function RPCPage() {
  const t = useTranslations("repo.rpc");
  const locale = useLocale();
  const [lastClick, setLastClick] = useState<ButtonClickEvent | null>(null);

  const columns: ColumnDef[] = [
    {
      key: 'rpc',
      label: 'RPC',
      sortable: true,
      format: 'text',
    },
    {
      key: 'pro',
      label: 'PRO',
      sortable: false,
      format: 'boolean',
    },
    {
      key: 'action',
      label: '',
      format: 'button',
      buttonLabel: t("addMetaMask"),
      linkUrl: `/${locale}/rpc/@@rpc@@`,
    },
  ];

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
