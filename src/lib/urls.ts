import { localizePath, type Lang } from '../i18n';

export const serviceUrl = (serviceSlug: string, lang: Lang = 'en') => localizePath(`/services/${serviceSlug}/`, lang);
export const areaUrl = (areaSlug: string, lang: Lang = 'en') => localizePath(`/areas/${areaSlug}/`, lang);
export const contactUrl = (lang: Lang = 'en') => localizePath('/contact/', lang);
export const aboutUrl = (lang: Lang = 'en') => localizePath('/about/', lang);
export const blogUrl = (slug?: string, lang: Lang = 'en') =>
  localizePath(slug ? `/blog/${slug}/` : '/blog/', lang);
