'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ConnectButton } from '@rainbow-me/rainbowkit';

type Wallet = {
  id: string;
  name: string;
  icon: React.ReactNode;
  downloads: {
    ios?: string;
    android?: string;
    extension?: string;
  };
};

const MOCK_WALLETS: Wallet[] = [
  {
    id: 'metamask',
    name: 'MetaMask',
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10">
        <path fill="#E17726" d="M32.96 3.08l-11.31 8.4 2.09-4.97z"/>
        <path fill="#E27625" d="M7.03 3.08l11.21 8.47-1.99-5.04zM28.15 27.87l-3 4.6 6.42 1.77 1.84-6.29zM3.61 28.05l1.83 6.29 6.42-1.77-3-4.6z"/>
        <path fill="#E27625" d="M11.49 17.51l-1.78 2.69 6.37.29-.21-6.85zM28.5 17.51l-4.42-4-0.14 6.98 6.37-.29zM11.86 32.47l3.83-1.87-3.3-2.58zM24.3 30.6l3.83 1.87-.53-4.45z"/>
        <path fill="#D5BFB2" d="M28.13 32.47l-3.83-1.87.31 2.48-.03 1.03zM11.86 32.47l3.55 1.64-.02-1.03.29-2.48z"/>
        <path fill="#233447" d="M15.47 24.57l-3.18-.94 2.25-1.03zM24.52 24.57l.93-1.97 2.26 1.03z"/>
        <path fill="#CC6228" d="M11.86 32.47l.55-4.6-3.55.1zM27.58 27.87l.55 4.6 3-4.5zM30.28 20.2l-6.37.29.59 3.28.93-1.97 2.26 1.03zM12.29 22.63l2.25-1.03.93 1.97.59-3.28-6.37-.29z"/>
        <path fill="#E27525" d="M9.69 20.2l2.69 5.25-.09-2.62zM27.59 22.83l-.11 2.62 2.69-5.25zM16.06 20.49l-.59 3.28.74 3.83.17-5.03zM23.91 20.49l-.32 2.07.15 5.04.75-3.83z"/>
        <path fill="#F5841F" d="M24.52 24.57l-.75 3.83.54.37 3.3-2.58.11-2.62zM12.29 22.63l.09 2.62 3.3 2.58.54-.37-.74-3.83z"/>
        <path fill="#C0AC9D" d="M24.58 34.11l.03-1.03-.28-.24h-8.68l-.26.24.02 1.03-3.55-1.64 1.24 1.02 2.52 1.74h8.82l2.52-1.74 1.24-1.02z"/>
        <path fill="#161616" d="M24.47 30.6l-.54-.37h-7.88l-.54.37-.29 2.48.26-.24h8.68l.28.24z"/>
        <path fill="#763E1A" d="M33.51 12.32l.95-4.57-1.42-4.23-10.73 7.97 4.13 3.5 5.84 1.7 1.29-1.5-.56-.4.89-.82-.68-.53.89-.68zM5.54 7.75l.95 4.57-.58.43.89.68-.68.53.89.82-.56.4 1.29 1.5 5.84-1.7 4.13-3.5L6.96 3.52z"/>
        <path fill="#F5841F" d="M31.98 19.41l-5.84-1.7 1.78 2.69-2.69 5.25 3.54-.05h5.29zM13.85 17.71l-5.84 1.7-2.06 6.19h5.29l3.53.05-2.69-5.25zM23.91 20.49l.37-6.52 1.72-4.65h-7.62l1.7 4.65.38 6.52.14 2.09.01 5.02h7.88l.01-5.02z"/>
      </svg>
    ),
    downloads: {
      ios: 'https://apps.apple.com/app/metamask',
      android: 'https://play.google.com/store/apps/details?id=io.metamask',
      extension: 'https://metamask.io/download/',
    },
  },
  {
    id: 'trust',
    name: 'Trust Wallet',
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10">
        <defs>
          <linearGradient id="trustGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3375BB"/>
            <stop offset="100%" stopColor="#3375BB"/>
          </linearGradient>
        </defs>
        <path fill="url(#trustGradient)" d="M20 4L6 10v10c0 8.84 6.05 17.12 14 19 7.95-1.88 14-10.16 14-19V10L20 4zm0 3.18l11 5.09v7.73c0 7.29-4.96 14.08-11 15.82-6.04-1.74-11-8.53-11-15.82v-7.73l11-5.09z"/>
        <path fill="#3375BB" d="M20 12l-6 3.5v7c0 4.42 3.02 8.56 6 9.5 2.98-.94 6-5.08 6-9.5v-7L20 12z"/>
      </svg>
    ),
    downloads: {
      ios: 'https://apps.apple.com/app/trust-wallet',
      android: 'https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp',
      extension: 'https://trustwallet.com/browser-extension',
    },
  },
  {
    id: 'coinbase',
    name: 'Coinbase Wallet',
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10">
        <rect width="40" height="40" rx="8" fill="#0052FF"/>
        <rect x="14" y="14" width="12" height="12" rx="2" fill="white"/>
      </svg>
    ),
    downloads: {
      ios: 'https://apps.apple.com/app/coinbase-wallet',
      android: 'https://play.google.com/store/apps/details?id=org.toshi',
      extension: 'https://www.coinbase.com/wallet/downloads',
    },
  },
  {
    id: 'rainbow',
    name: 'Rainbow',
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10">
        <defs>
          <linearGradient id="rainbowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF4D4D"/>
            <stop offset="25%" stopColor="#FFB84D"/>
            <stop offset="50%" stopColor="#4DFF88"/>
            <stop offset="75%" stopColor="#4D9FFF"/>
            <stop offset="100%" stopColor="#B84DFF"/>
          </linearGradient>
        </defs>
        <circle cx="20" cy="20" r="16" fill="url(#rainbowGradient)"/>
        <circle cx="20" cy="20" r="10" fill="white"/>
      </svg>
    ),
    downloads: {
      ios: 'https://apps.apple.com/app/rainbow-ethereum-wallet',
      android: 'https://play.google.com/store/apps/details?id=me.rainbow',
    },
  },
  {
    id: 'phantom',
    name: 'Phantom',
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10">
        <defs>
          <linearGradient id="phantomGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#AB9FF2"/>
            <stop offset="100%" stopColor="#4E44CE"/>
          </linearGradient>
        </defs>
        <rect width="40" height="40" rx="8" fill="url(#phantomGradient)"/>
        <path fill="white" d="M20 8c-6.63 0-12 5.37-12 12v8c0 2.21 1.79 4 4 4h16c2.21 0 4-1.79 4-4v-8c0-6.63-5.37-12-12-12zm-4 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm8 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
      </svg>
    ),
    downloads: {
      ios: 'https://apps.apple.com/app/phantom-solana-wallet',
      android: 'https://play.google.com/store/apps/details?id=app.phantom',
      extension: 'https://phantom.app/download',
    },
  },
];

export default function WalletPage() {
  const t = useTranslations('repo.wallet');
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const [expandedWalletId, setExpandedWalletId] = useState<string | null>(null);

  const handleWalletClick = (wallet: Wallet) => {
    // Desktop: open modal
    if (window.innerWidth >= 768) {
      setSelectedWallet(wallet);
    } else {
      // Mobile: toggle accordion
      setExpandedWalletId(expandedWalletId === wallet.id ? null : wallet.id);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
        <p className="text-gray-600">{t('subtitle')}</p>
      </div>

      {/* Connect Wallet Button */}
      <div className="mb-12 flex justify-center">
        <div className="scale-150">
          <ConnectButton />
        </div>
      </div>

      {/* Wallet List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {MOCK_WALLETS.map((wallet) => (
          <div key={wallet.id}>
            <div
              className="border rounded-lg p-6 cursor-pointer transition-all border-gray-200 hover:border-blue-400 hover:shadow-md"
              onClick={() => handleWalletClick(wallet)}
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">{wallet.icon}</div>
                <h3 className="text-xl font-semibold">{wallet.name}</h3>
              </div>
            </div>

            {/* Mobile Accordion with Animation */}
            <div
              className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                expandedWalletId === wallet.id ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 space-y-2">
                {wallet.downloads.ios && (
                  <a
                    href={wallet.downloads.ios}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center gap-3 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition text-sm"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    <span>{t('ios')}</span>
                  </a>
                )}

                {wallet.downloads.android && (
                  <a
                    href={wallet.downloads.android}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center gap-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24a11.5 11.5 0 0 0-8.94 0L5.65 5.67c-.19-.28-.54-.37-.83-.22-.3.16-.42.54-.26.85l1.84 3.18C4.8 11.16 3.5 13.84 3.5 16.5h17c0-2.66-1.3-5.34-2.9-7.02zM7 14.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm10 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
                    </svg>
                    <span>{t('android')}</span>
                  </a>
                )}

                {wallet.downloads.extension && (
                  <a
                    href={wallet.downloads.extension}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center gap-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 11.5v-3h-4v3H9v-4c0-.55.45-1 1-1h4v-3l3.5 3.5-3.5 3.5z"/>
                    </svg>
                    <span>{t('extension')}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Modal */}
      {selectedWallet && (
        <div
          className="hidden md:flex fixed inset-0 bg-black/60 backdrop-blur-sm items-center justify-center z-50 p-4"
          onClick={() => setSelectedWallet(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 text-center relative">
              <button
                onClick={() => setSelectedWallet(null)}
                className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/60 hover:bg-white/80 flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="w-16 h-16 mx-auto rounded-full bg-white flex items-center justify-center shadow-md">
                {selectedWallet.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mt-3">{selectedWallet.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{t('downloadFor')}</p>
            </div>

            {/* Download Buttons */}
            <div className="p-6 space-y-3">
              {selectedWallet.downloads.ios && (
                <a
                  href={selectedWallet.downloads.ios}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center gap-3 px-5 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition font-medium"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <span>{t('ios')}</span>
                </a>
              )}

              {selectedWallet.downloads.android && (
                <a
                  href={selectedWallet.downloads.android}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center gap-3 px-5 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition font-medium"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24a11.5 11.5 0 0 0-8.94 0L5.65 5.67c-.19-.28-.54-.37-.83-.22-.3.16-.42.54-.26.85l1.84 3.18C4.8 11.16 3.5 13.84 3.5 16.5h17c0-2.66-1.3-5.34-2.9-7.02zM7 14.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm10 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
                  </svg>
                  <span>{t('android')}</span>
                </a>
              )}

              {selectedWallet.downloads.extension && (
                <a
                  href={selectedWallet.downloads.extension}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center gap-3 px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 11.5v-3h-4v3H9v-4c0-.55.45-1 1-1h4v-3l3.5 3.5-3.5 3.5z"/>
                  </svg>
                  <span>{t('extension')}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
