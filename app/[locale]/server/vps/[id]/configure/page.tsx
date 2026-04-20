"use client";

import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import Dropdown from "@/components/Dropdown";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useState } from "react";
import QRCode from "react-qr-code";

const PAYMENT_METHODS = [
  { 
    symbol: "USDT", 
    balance: 1250.50, 
    network: "TRC20",
    address: "TXYZabcd1234567890ABCDEFGHIJKLMNOP"
  },
  { 
    symbol: "USDC", 
    balance: 890.25, 
    network: "ERC20",
    address: "0x1234567890abcdef1234567890abcdef12345678"
  },
  { 
    symbol: "BUSD", 
    balance: 0, 
    network: "BEP20",
    address: "0xabcdef1234567890abcdef1234567890abcdef12"
  }
];

const methodStyles = {
  USDT: { bg: "bg-green-100", text: "text-green-700", border: "border-green-500" },
  USDC: { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-500" },
  BUSD: { bg: "bg-yellow-100", text: "text-yellow-700", border: "border-yellow-500" }
};

export default function ConfigureVPSPage() {
  const t = useTranslations("server.vps.configure");
  const { id } = useParams();

  const [step, setStep] = useState<number>(1);
  const [period, setPeriod] = useState("monthly");
  const [rootPass, setRootPass] = useState("");
  const [os, setOs] = useState("ubuntu-22");
  const [support, setSupport] = useState("basic");
  const [location, setLocation] = useState("");
  const [disk, setDisk] = useState("none");
  const [paymentMethod, setPaymentMethod] = useState("USDT");
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState<{ rootPass?: string; location?: string }>({});

  const plan = {
    name: `VPS Plan ${id}`,
    cpu: "4 vCores",
    ram: "8GB RAM",
    storage: "160GB SSD",
    bandwidth: "1Gbps BW",
    backup: "Daily Backup",
    priceMonthly: 29.99,
  };

  const supportLevelList = [
    { value: "basic",      label: t("levels.basic"),      price: 0     },
    { value: "pro",        label: t("levels.pro"),        price: 9.99  },
    { value: "enterprise", label: t("levels.enterprise"), price: 24.99 },
  ];

  const locationList = [
    { value: "usa", label: "USA — Virginia",        price: 0    },
    { value: "ger", label: "Germany — Falkenstein", price: 2.99 },
    { value: "ca",  label: "Canada — Beauharnois",  price: 0    },
  ];

  const OSList = [
    { value: "ubuntu-22",    label: "Ubuntu 22.04",        price: 0     },
    { value: "debian-12",    label: "Debian 12",           price: 0     },
    { value: "windows-2022", label: "Windows Server 2022", price: 12.00 },
  ];

  const periodList = [
    { value: "monthly", label: t("monthly") + " – $" + plan.priceMonthly,                   price: 0                               },
    { value: "yearly",  label: t("yearly")  + " – $" + (plan.priceMonthly * 12).toFixed(2), price: -(plan.priceMonthly * 12 * 0.1) },
  ];

  const diskList = [
    { value: "none",  label: t("noNeed"),     price: 0    },
    { value: "50gb",  label: "50GB – $5.00",  price: 5.00 },
    { value: "100gb", label: "100GB – $9.00", price: 9.00 },
  ];

  const osPrice        = OSList.find((o) => o.value === os)?.price ?? 0;
  const diskPrice      = diskList.find((d) => d.value === disk)?.price ?? 0;
  const supportPrice   = supportLevelList.find((s) => s.value === support)?.price ?? 0;
  const locationPrice  = locationList.find((l) => l.value === location)?.price ?? 0;
  const periodDiscount = periodList.find((p) => p.value === period)?.price ?? 0;

  const monthly = plan.priceMonthly + diskPrice + supportPrice + locationPrice + periodDiscount;
  const tax     = monthly * 0.09;
  const total   = monthly + tax;

  const selectedLocation = locationList.find((l) => l.value === location);
  const selectedOs       = OSList.find((o) => o.value === os);
  const selectedDisk     = diskList.find((d) => d.value === disk);
  const selectedSupport  = supportLevelList.find((s) => s.value === support);
  const selectedCrypto   = PAYMENT_METHODS.find((m) => m.symbol === paymentMethod);

  function handleContinue() {
    const newErrors: { rootPass?: string; location?: string } = {};
    if (!rootPass) newErrors.rootPass = t("required");
    if (!location) newErrors.location = t("required");
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setErrors({});
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleCryptoOrder() {
    setShowModal(true);
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>
          <p className="text-gray-500 text-sm mt-2">{t("subtitle")}</p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-10">
          {[
            { num: 1, label: t("serverConfig"), sublabel: t("configureYourServer") },
            { num: 2, label: t("pay"),          sublabel: t("chooseCryptoMethod")  },
          ].map((s, i) => (
            <div key={s.num} className="flex items-center">
              {/* Step Card */}
              <div className="flex items-center gap-3 group">
                {/* Circle */}
                <div className={`relative w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 shadow-sm
                  ${step > s.num
                    ? "bg-green-500 text-white shadow-green-200 shadow-md"
                    : step === s.num
                    ? "bg-blue-600 text-white shadow-blue-200 shadow-md ring-4 ring-blue-100"
                    : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {step > s.num ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : s.num}
                </div>

                {/* Labels */}
                <div className="text-right hidden sm:block">
                  <p className={`text-sm font-semibold transition-colors duration-500 ${
                    step === s.num ? "text-blue-600" : step > s.num ? "text-green-600" : "text-gray-400"
                  }`}>
                    {s.label}
                  </p>
                  <p className={`text-xs transition-colors duration-500 ${
                    step === s.num ? "text-blue-400" : "text-gray-400"
                  }`}>
                    {s.sublabel}
                  </p>
                </div>
              </div>

              {/* Connector */}
              {i < 1 && (
                <div className="mx-5 flex items-center px-3" style={{ width: "80px" }}>
                  <div className="relative w-full rounded-full overflow-hidden" style={{ height: "3px", backgroundColor: "#e5e7eb" }}>
                    <div
                      className="absolute top-0 left-0 h-full rounded-full transition-all duration-500"
                      style={{ width: step > 1 ? "100%" : "0%", backgroundColor: step > 1 ? "#22c55e" : "#3b82f6" }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="lg:flex lg:flex-row-reverse gap-6 items-start">

          {/* Summary Column */}
          <div className="hidden lg:block w-full lg:w-1/3 mb-6 lg:mb-0">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden lg:sticky lg:top-6">

              <div className="bg-gray-800 text-white text-center py-3 font-semibold text-sm">
                {t("orderSummary")}
              </div>

              <div className="p-5 space-y-4">
                <div>
                  <p className="font-bold text-gray-900">{plan.name}</p>
                </div>

                <div className="bg-gray-50 rounded p-3 space-y-1 text-xs text-gray-600 mb-5">
                  <p>{plan.cpu}</p>
                  <p>{plan.ram}</p>
                  <p>{plan.storage}</p>
                  <p>{plan.backup}</p>
                  <p>{plan.bandwidth}</p>
                </div>

                <div className="border-t border-gray-100 pt-4 space-y-2">
                  <Row label={plan.name} value={`$${plan.priceMonthly.toFixed(2)}`} />
                  {selectedLocation && (
                    <Row label={selectedLocation.label} value={locationPrice > 0 ? `+$${locationPrice.toFixed(2)}` : t("free")} />
                  )}
                  {selectedOs && (
                    <Row label={selectedOs.label} value={osPrice > 0 ? `+$${osPrice.toFixed(2)}` : t("free")} />
                  )}
                  {selectedDisk && disk !== "none" && (
                    <Row label={selectedDisk.label} value={`+$${diskPrice.toFixed(2)}`} />
                  )}
                  {selectedSupport && (
                    <Row label={selectedSupport.label} value={supportPrice > 0 ? `+$${supportPrice.toFixed(2)}` : t("free")} />
                  )}
                </div>

                <div className="border-t border-gray-100 pt-4 space-y-2">
                  <Row label={t("billingPeriod")} value={`$${monthly.toFixed(2)}`} />
                  <Row label={`${t("tax")} (9%)`} value={`$${tax.toFixed(2)}`} />
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
                    <span className="text-sm font-semibold text-gray-600">{t("total")}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{t("payable")}</p>
                </div>
              </div>

              <div className="p-5 pt-0 space-y-2">
                {step === 1 ? (
                  <CustomButton btnType="info" className="w-full" onClick={handleContinue}>
                    {t("continue")}
                  </CustomButton>
                ) : (
                  <>
                    <CustomButton btnType="submit" className="w-full" onClick={handleCryptoOrder}>
                      {t('pay')}
                    </CustomButton>
                    <CustomButton
                      onClick={() => setStep(1)}
                      btnType="link"
                      className="w-full"
                    >
                      {t('back')}
                    </CustomButton>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="w-full lg:w-2/3 space-y-6">

            {step === 1 && (
              <>
                <div className="bg-gray-50 rounded-lg p-5 border border-gray-200 mb-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{plan.name}</h3>
                    </div>
                    <div className="flex gap-2 text-xs text-gray-600 flex-wrap justify-end">
                      <span>{plan.cpu}</span><span>•</span>
                      <span>{plan.ram}</span><span>•</span>
                      <span>{plan.storage}</span><span>•</span>
                      <span>{plan.backup}</span><span>•</span>
                      <span>{plan.bandwidth}</span>
                    </div>
                  </div>
                </div>

                <Section title={t("period")}>
                  <Dropdown dataList={periodList} value={period} onChange={setPeriod} />
                </Section>

                <Section title={t("serverConfig")}>
                  <Field label={`* ${t("rootPassword")}`} error={errors.rootPass}>
                    <CustomInput
                      type="password"
                      value={rootPass}
                      onChange={(e) => {
                        setRootPass(e.target.value);
                        if (e.target.value) setErrors((p) => ({ ...p, rootPass: undefined }));
                      }}
                    />
                  </Field>
                </Section>

                <Section title={t("configurableOptions")}>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label={t("location")}>
                      <Dropdown dataList={locationList} value={location} onChange={(val) => { setLocation(val); if (val) setErrors((p) => ({ ...p, location: undefined })); }} />
                    </Field>
                    <Field label={t("OS")}>
                      <Dropdown dataList={OSList} value={os} onChange={setOs} />
                    </Field>
                    <Field label={t("extraDisk")}>
                      <Dropdown dataList={diskList} value={disk} onChange={setDisk} />
                    </Field>
                    <Field label={t("level")}>
                      <Dropdown dataList={supportLevelList} value={support} onChange={setSupport} />
                    </Field>
                  </div>
                </Section>

                <Section title={t("additionalInfo")}>
                  <Field label={`* ${t("dataCenter")}`} error={errors.location}>
                    <Dropdown dataList={locationList} value={location} onChange={(val) => { setLocation(val); if (val) setErrors((p) => ({ ...p, location: undefined })); }} />
                  </Field>
                </Section>
              </>
            )}

            {step === 2 && (
              <Section title={t('cryptoPayType')}>
                <p className="text-xs text-gray-500 mb-4">
                  {t('selectCrypto')}
                </p>
                <div className="space-y-3">
                  {PAYMENT_METHODS.map((method) => {
                    const style = methodStyles[method.symbol as keyof typeof methodStyles];
                    return (
                      <label
                        key={method.symbol}
                        className={`flex items-center justify-between gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          paymentMethod === method.symbol
                            ? `${style.border} bg-gradient-to-l from-transparent to-${style.bg.replace('bg-', '')}/20`
                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={method.symbol}
                          checked={paymentMethod === method.symbol}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="sr-only"
                        />
                        
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                            paymentMethod === method.symbol ? style.border.replace('border-', 'border-') : "border-gray-300"
                          }`}>
                            {paymentMethod === method.symbol && (
                              <div className={`w-2 h-2 rounded-full ${style.bg.replace('bg-', 'bg-')}`} />
                            )}
                          </div>
                          
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${style.bg} ${style.text}`}>
                            {method.symbol[0]}
                          </div>
                          
                          <div>
                            <p className="text-sm font-bold text-gray-800">{method.symbol}</p>
                            <p className="text-xs text-gray-500">{method.network}</p>
                          </div>
                        </div>

                        <div className="text-left">
                          <p className="text-xs text-gray-400">{t('balance')}</p>
                          <p className={`text-sm font-bold ${method.balance > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                            ${method.balance.toFixed(2)}
                          </p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </Section>
            )}

            <div className="lg:hidden p-5 pt-0 space-y-2">
              {step === 1 ? (
                <CustomButton btnType="info" className="w-full" onClick={handleContinue}>
                  {t("continue")}
                </CustomButton>
              ) : (
                <>
                  <CustomButton btnType="submit" className="w-full" onClick={handleCryptoOrder}>
                    {t('pay')}
                  </CustomButton>
                  <CustomButton
                    onClick={() => setStep(1)}
                    btnType="link"
                    className="w-full"
                  >
                    {t('back')}
                  </CustomButton>
                </>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showModal && selectedCrypto && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
            
            {/* Header */}
            <div className={`${methodStyles[selectedCrypto.symbol as keyof typeof methodStyles].bg} p-6 text-center relative`}>
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className={`w-16 h-16 mx-auto rounded-full ${methodStyles[selectedCrypto.symbol as keyof typeof methodStyles].bg} flex items-center justify-center text-2xl font-bold ${methodStyles[selectedCrypto.symbol as keyof typeof methodStyles].text} border-4 border-white shadow-lg`}>
                {selectedCrypto.symbol[0]}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mt-3">{selectedCrypto.symbol}</h3>
              <p className="text-sm text-gray-600">{selectedCrypto.network}</p>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">
              
              {/* Amount */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 text-center border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">{t('payableAmount')}</p>
                <p className="text-3xl font-bold text-gray-900">${total.toFixed(2)}</p>
              </div>

              {/* QR Code */}
              <div className="bg-white p-4 rounded-xl border-2 border-dashed border-gray-300 flex justify-center">
                <QRCode value={selectedCrypto.address} size={200} />
              </div>

              {/* Address */}
              <div>
                <p className="text-xs text-gray-500 mb-2">{t('walletAddress')}</p>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 flex items-center gap-2">
                  <button
                    onClick={() => copyToClipboard(selectedCrypto.address)}
                    className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition-colors"
                  >
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                  <p className="text-xs text-gray-700 font-mono break-all flex-1 leading-relaxed">
                    {selectedCrypto.address}
                  </p>
                </div>
              </div>

              {/* Warning */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2">
                <svg className="w-5 h-5 text-amber-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-xs text-amber-800">
                  {t('networkWarning', { network: selectedCrypto.network })}
                </p>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 mb-3">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-px bg-gray-200" />
        <h2 className="text-sm font-semibold text-blue-600 whitespace-nowrap">{title}</h2>
        <div className="flex-1 h-px bg-gray-200" />
      </div>
      {children}
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="block text-xs text-gray-600 font-medium">{label}</label>
      {children}
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="text-gray-500">{value}</span>
      <span className="text-gray-700">{label}</span>
    </div>
  );
}
