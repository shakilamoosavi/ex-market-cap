"use client";
import { useTranslations } from "next-intl";
import { RegisterForm } from "../../../../components/auth/forms/RegisterForm";

export default function RegisterPage() {
  const t = useTranslations("auth.register");
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-12">
      <RegisterForm />
    </section>
  );
}
