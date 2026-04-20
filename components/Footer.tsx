import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer")
  return (
    <footer className="w-full p-4 bg-zinc-100 dark:bg-zinc-800 text-center text-xs text-zinc-600 dark:text-zinc-300 mt-auto">
      {t("copyright")}
    </footer>
  );
}
