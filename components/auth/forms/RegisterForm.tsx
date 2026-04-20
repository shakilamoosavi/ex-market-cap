"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useAuth } from "../AuthProvider";
import PasswordInput from "../../PasswordInput";
import CustomInput from "../../CustomInput";
import AgeRestrictedDatePicker from "@/components/AgeRestrictedDatePicker";
import Logo from "../../Logo";
import CustomRadioButton from "@/components/CustomRadioButton";
import CustomButton from "@/components/CustomButton";


const DatePicker = dynamic(() => import("react-multi-date-picker"), { ssr: false });

const initialForm = {
  firstName: "",
  lastName: "",
  birthdate: "",
  gender: "",
  email: "",
  password: "",
  repeatPassword: "",
};

export function RegisterForm() {
  const t = useTranslations("auth.register");
  const router = useRouter();
  const locale = useLocale();
  const { register } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<string | null>(null);
  const [birthdateValue, setBirthdateValue] = useState<DateObject | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [repeatPasswordError, setRepeatPasswordError] = useState<string | null>(null);
  const isFaLocale = locale === "fa" || locale === "fa-IR";

  const genderOptions = [
    { key: "male", text: t("fields.genderOptions.male") },
    { key: "female", text: t("fields.genderOptions.female") },
    { key: "other", text: t("fields.genderOptions.other") },
  ];

  const handleChange = (field: keyof typeof initialForm) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.firstName || !form.email) {
      setStatus(t("errors.required"));
      return;
    }
    // Password validation is handled in PasswordInput
    if (form.password !== form.repeatPassword) {
      setStatus(t("errors.passwordsDontMatch"));
      return;
    }
    // Convert birthdate (Jalali or Gregorian) to ISO string if selected
    let birthdateStr = "";
    if (birthdateValue) {
      const date = birthdateValue.toDate(); // always Gregorian JS Date
      birthdateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    }
    const submitForm = {
      ...form,
      birthdate: birthdateStr,
    };
    await register(submitForm);
    router.replace(`/${locale}`);
  };

  return (
    <div className="mx-auto w-full max-w-lg rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="text-center mb-10">
        <div className="mx-auto w-[80] mb-3">
          <svg viewBox="0 0 75 75" xmlns="http://www.w3.org/2000/svg">
              <rect x="5" y="15" width="65" height="45" rx="4" fill="none" stroke="#4285f4" stroke-width="3"></rect>
              <polyline points="5,15 37.5,42 70,15" fill="none" stroke="#0e75f1" stroke-width="3"></polyline>
              <line x1="5" y1="60" x2="25" y2="40" stroke="#5d85b4" stroke-width="3"></line>
              <line x1="70" y1="60" x2="50" y2="40" stroke="#676d73" stroke-width="3"></line>
          </svg>
        </div>
        <Logo/>
        <h1 className="text-3xl mt-5 mb-3 font-semibold text-black dark:text-white">{t("title")}</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{t("subtitle")}</p>
      </div>
      <div className="grid gap-4">

        {/* First + Last Name in one row */}
        <div className="grid gap-4 sm:grid-cols-2">
          <CustomInput
            type="text"
            label={t("fields.firstName")}
            value={form.firstName}
            onChange={handleChange("firstName")}
          />
          <CustomInput
            type="text"
            value={form.lastName}
            label={t("fields.lastName")}
            onChange={handleChange("lastName")}
          />
        </div>

        {/* Email single row */}
        <div>
          <CustomInput
            type="email"
            label={t("fields.email")}
            value={form.email}
            onChange={handleChange("email")}
          />
        </div>

        {/* Password single row */}
        <div>
          <PasswordInput
            value={form.password}
            onChange={val => setForm(prev => ({ ...prev, password: val }))}
            showValidationConditions="true"
            showValidationStatus="true"
            label={t("fields.password")}
            onError={setPasswordError}
          />
          {passwordError && (
            <p className="mt-1 text-xs text-red-500">{passwordError}</p>
          )}
        </div>

        {/* Repeat password single row */}
        <div>
          <PasswordInput
            value={form.repeatPassword}
            onChange={val => setForm(prev => ({ ...prev, repeatPassword: val }))}
            label={t("fields.repeatPassword")}
            onError={setRepeatPasswordError}
          />
          {repeatPasswordError && (
            <p className="mt-1 text-xs text-red-500">{repeatPasswordError}</p>
          )}
        </div>

        {/* DatePicker single row */}
        <div>
          <AgeRestrictedDatePicker
            minAge={18}
            onChange={val => setForm(prev => ({ ...prev, birthdate: val }))}
          />
        </div>

        <div>
          <CustomRadioButton
            label={t("fields.gender")}
            dataList={genderOptions}
            value={form?.gender}
            onChange={val => setForm(prev => ({ ...prev, gender: val }))}
          />
        </div>

        <div>
          
        </div>
      </div>

      {status && <p className="mt-4 text-sm text-red-500">{status}</p>}
      <CustomButton
        btnType="info"
        onClick={handleSubmit} >
        {t("submit")}
      </CustomButton>
    </div>
  );
}
