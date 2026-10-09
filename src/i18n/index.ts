// ============================================================
// i18n helpers — English at /, Arabic (UAE) mirrored at /ar/
// Arabic URLs keep the English slugs, so every page maps 1:1
// to its counterpart (language toggle + hreflang).
// ============================================================

import { ui } from './ui';

export type Lang = 'en' | 'ar';

export const LANGS: Lang[] = ['en', 'ar'];

/** BCP 47 tags for <html lang>, hreflang and the sitemap */
export const htmlLang: Record<Lang, string> = { en: 'en-AE', ar: 'ar-AE' };
export const ogLocale: Record<Lang, string> = { en: 'en_US', ar: 'ar_AE' };

/**
 * Set to false to keep the Arabic pages out of search results
 * (e.g. until a native speaker has reviewed the translation).
 */
export const AR_INDEXABLE = true;

const AR_PREFIX = '/ar';

export function getLang(url: URL): Lang {
  const p = url.pathname;
  return p === AR_PREFIX || p.startsWith(`${AR_PREFIX}/`) ? 'ar' : 'en';
}

/** Path without the /ar prefix ("/ar/contact/" → "/contact/") */
export function basePath(pathname: string): string {
  if (pathname === AR_PREFIX || pathname === `${AR_PREFIX}/`) return '/';
  return pathname.startsWith(`${AR_PREFIX}/`) ? pathname.slice(AR_PREFIX.length) : pathname;
}

/** Internal path for the given language. External links, anchors, tel: and mailto: pass through. */
export function localizePath(path: string, lang: Lang): string {
  if (lang === 'en' || !path.startsWith('/') || path.startsWith('//')) return path;
  if (path.startsWith('/lp/') || path.startsWith('/api/')) return path; // not mirrored
  return path === '/' ? `${AR_PREFIX}/` : `${AR_PREFIX}${basePath(path)}`;
}

/** The same page in the other language (used by the toggle) */
export function alternatePath(url: URL): string {
  const lang = getLang(url);
  const base = basePath(url.pathname);
  return lang === 'ar' ? base : localizePath(base, 'ar');
}

/** Both language versions of the current page, as absolute URLs (hreflang) */
export function languageUrls(url: URL, site: URL | undefined): Record<Lang, string> {
  const base = basePath(url.pathname);
  return {
    en: new URL(base, site).href,
    ar: new URL(localizePath(base, 'ar'), site).href,
  };
}

export function useTranslations(lang: Lang) {
  return ui[lang];
}

/** Pick the string for the current language */
export function tr<T>(lang: Lang, en: T, ar: T): T {
  return lang === 'ar' ? ar : en;
}

/** Dates — Arabic month names with Western digits, as is usual in UAE business */
export function formatDate(date: string | Date, lang: Lang, opts?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString(lang === 'ar' ? 'ar-AE-u-nu-latn' : 'en-US', opts ?? {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
