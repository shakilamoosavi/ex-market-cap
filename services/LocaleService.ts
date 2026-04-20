export type Lang = 'fa' | 'ar' | 'en';

export const LANGS: { code: Lang; label: string; dir: 'rtl' | 'ltr' }[] = [
  { code: 'en', label: 'English', dir: 'ltr' },
  { code: 'fa', label: 'Farsi', dir: 'rtl' },
  { code: 'ar', label: 'Arabic', dir: 'rtl' },
];

export const CURRENCIES: { code: string; symbol: string; name: string }[] = [
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
  { code: 'IRR', symbol: '﷼', name: 'Iranian Rial' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
];

/**
 * Return the current language code.
 * Priority: localStorage 'lang' -> <html lang> -> navigator.language -> 'en'
 */
export function getLang(): Lang {
  if (typeof window === 'undefined') return 'fa';

  try {
    const ls = localStorage.getItem('lang');
    if (ls === 'fa' || ls === 'ar' || ls === 'en') return ls as Lang;

    const htmlLang = document.documentElement.lang;
    if (htmlLang === 'fa' || htmlLang === 'ar' || htmlLang === 'en') return htmlLang as Lang;

    const nav = (navigator.language || (navigator as any).userLanguage || '').toString();
    const primary = nav.split('-')[0];
    if (primary === 'fa' || primary === 'ar' || primary === 'en') return primary as Lang;
  } catch (err) {
    // ignore and fallthrough to default
  }

  return 'en';
}

export function isRtl(lang?: string): boolean {
  const raw = lang || getLang();
  const primary = raw.split ? raw.split('-')[0] : String(raw);
  const entry = LANGS.find(x => x.code === (primary as Lang));
  return entry ? entry.dir === 'rtl' : false;
}

export function getDir(lang?: string): 'rtl' | 'ltr' {
  const raw = lang || getLang();
  const primary = raw.split ? raw.split('-')[0] : String(raw);
  return LANGS.find(x => x.code === (primary as Lang))?.dir ?? 'ltr';
}

/**
 * Set language globally for client. Updates localStorage and document attributes.
 */
export function setLang(lang: Lang) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = getDir(lang);
  } catch (err) {
    // ignore storage errors
  }
}

export function getCurrencies() {
  return CURRENCIES;
}

export function normalizeLang(raw?: string): Lang | undefined {
  if (!raw) return undefined;
  const primary = raw.split ? raw.split('-')[0] : String(raw);
  if (primary === 'fa' || primary === 'ar' || primary === 'en') return primary as Lang;
  return undefined;
}

export default {
  getLang,
  setLang,
  isRtl,
  getDir,
  normalizeLang,
  LANGS,
  getCurrencies,
};
