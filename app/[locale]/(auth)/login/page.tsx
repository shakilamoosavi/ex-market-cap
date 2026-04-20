"use client";
import { useTranslations } from "next-intl";
import { LoginForm } from "../../../../components/auth/forms/LoginForm";

export default function LoginPage() {
  const t = useTranslations("auth.login");
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-12">
      <LoginForm />
    </section>
  );
}
