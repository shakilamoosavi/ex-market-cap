import { useLocale, useTranslations } from "next-intl";

export function useFormattedDate() {
  const t = useTranslations("utils.date"); // namespace: date
  const locale = useLocale();

  function formatPublishedAt(iso: string) {
    const now = new Date();
    const pub = new Date(iso);

    const nowUTC = new Date(now.toISOString());
    const pubUTC = new Date(pub.toISOString());

    const diffMs = nowUTC.getTime() - pubUTC.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    const timePart = pubUTC.toISOString().substring(11, 16);

    // Today / Yesterday via translations
    if (diffDays === 0) {
      return `${t("today")} ${t("at")} ${timePart}`;
    }

    if (diffDays === 1) {
      return `${t("yesterday")} ${t("at")} ${timePart}`;
    }

    // Full date (auto locale formatting)
    const formattedDate = new Intl.DateTimeFormat(locale === "fa" ? "fa-IR" : locale, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(pubUTC);

    return `${formattedDate} ${t("at")} ${timePart}`;
  }

  return { formatPublishedAt };
}
