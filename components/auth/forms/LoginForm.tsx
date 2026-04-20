"use client";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useAuth } from "../AuthProvider";
import { LoginService } from "../../../services/LoginService";
import { useEffect } from "react";
import CustomInput from "../../CustomInput";
import CustomButton from "../../CustomButton";
import Logo from "../../Logo";
import PasswordInput from "../../PasswordInput";



export function LoginForm() {
  const t = useTranslations("auth.login");
  const router = useRouter();
  const locale = useLocale();
  const { login, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const loginService = new LoginService();
  const [email, setEmail] = useState("");
  const [passwrod, setPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [showSnack, setShowSnack] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setStatus(null);
    try {
      const result = await loginService.login(email, passwrod);
      // Save JWT in localStorage for BaseService
      if (typeof window !== 'undefined' && result.token) {
        localStorage.setItem('jwt', result.token);
      }
      login(result.user, result.token); // Save user in context and set cookie
      router.replace(`/${locale}`);
    } catch (err: any) {
      if (err?.status === 401) {
        logout();
        router.replace(`/${locale}/login`);
      }
      setStatus(err?.message || t("errors.loginFailed"));
      setShowSnack(true);
    } finally {
      setLoading(false);
    }
  };

  // Hide snack after 3 seconds
  useEffect(() => {
    if (showSnack) {
      const timer = setTimeout(() => setShowSnack(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showSnack]);

  
  
  return (
    <div className="mx-auto w-full max-w-md rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
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
      <div className="space-y-4">
        <div className="mb-3">
          <CustomInput
            type="email"
            label={t('email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // disabled={step === "verify"}
          />
        </div>
        <div className="mb-3">
          <PasswordInput
            label={t('password')}
            value={passwrod}
            onChange={(e) => setPassword(e)}
            // disabled={step === "verify"}
          />
        </div>
        <div>
          <CustomButton 
            btnType="info" 
            onClick={handleLogin}
            // disabled={isLoading}
            type="button"
          >
            {t('login')}
          </CustomButton>
        </div>
        {/* Snack message for errors */}
        {showSnack && status && (
          <div className="fixed left-1/2 top-6 z-50 -translate-x-1/2 rounded bg-red-600 px-6 py-3 text-white shadow-lg animate-fade-in">
            {status}
          </div>
        )}
      </div>

      {/* Register and Forgot Password links */}
      <div className="mt-6 flex justify-between">
        <button
          type="button"
          className="text-sm text-blue-600 hover:underline"
          onClick={() => router.push(`/${locale}/register`)}
        >
          {t("registerLink", { defaultValue: "Register" })}
        </button>
        <button
          type="button"
          className="text-sm text-blue-600 hover:underline"
          onClick={() => router.push(`/${locale}/forgot-password`)}
        >
          {t("forgotPasswordLink", { defaultValue: "Forgot password?" })}
        </button>
      </div>
    </div>
  );
}
