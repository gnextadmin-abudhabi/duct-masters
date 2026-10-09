// ============================================================
// Localized views of the English data files. Arabic fields are
// merged over the English entries; English is the fallback.
// ============================================================

import { business, type Business } from '../data/business';
import { serviceTypes, getServiceBySlug, type ServiceType } from '../data/serviceTypes';
import { serviceAreas, getAreaBySlug, type ServiceArea } from '../data/serviceAreas';
import { servicesAr, unitAr } from './data/services.ar';
import { areasAr } from './data/areas.ar';
import type { Lang } from './index';

// Fail the build if a service or area has no Arabic copy
for (const s of serviceTypes) {
  const ar = servicesAr[s.slug];
  if (!ar || ar.process.length !== s.process.length || ar.priceLabels.length !== s.priceRanges.length) {
    throw new Error(`Missing or incomplete Arabic copy for service "${s.slug}" (src/i18n/data/services.ar.ts)`);
  }
}
for (const a of serviceAreas) {
  if (!areasAr[a.slug]) throw new Error(`Missing Arabic copy for area "${a.slug}" (src/i18n/data/areas.ar.ts)`);
}

const businessAr: Partial<Business> = {
  name: 'دكت ماسترز',
  tagline: 'تصنيع مجاري التكييف وتشكيل الصفائح المعدنية في أبوظبي',
  description:
    'دكت ماسترز شركة متخصصة في تصنيع مجاري التكييف وتشكيل الصفائح المعدنية، مقرها مصفح في أبوظبي. نصنّع ونورّد منتجات مجاري هواء التكييف وحلول الأعمال المعدنية حسب الطلب للمشاريع التجارية والصناعية والإنشائية ومشاريع البنية التحتية والتكييف في أبوظبي وجميع أنحاء الإمارات.',
  address: {
    ...business.address,
    street: 'M-40، مصفح',
    city: 'أبوظبي',
    state: 'أبوظبي',
    country: 'الإمارات العربية المتحدة',
  },
  license: 'رخصة تجارية إماراتية',
  hours: [
    { days: 'الاثنين – السبت', hours: '8:00 ص – 5:00 م' },
    { days: 'الأحد', hours: 'مغلق' },
  ],
  serviceRadius: 'أبوظبي وجميع أنحاء الإمارات',
};

/** Business details for display. Keep `business` itself for phones, links and schema IDs. */
export function getBusiness(lang: Lang): Business {
  return lang === 'ar' ? { ...business, ...businessAr } : business;
}

export function localizeService(service: ServiceType, lang: Lang): ServiceType {
  const ar = lang === 'ar' ? servicesAr[service.slug] : undefined;
  if (!ar) return service;
  return {
    ...service,
    name: ar.name,
    shortName: ar.shortName,
    description: ar.description,
    process: service.process.map((step, i) => ar.process[i] ?? step),
    priceRanges: service.priceRanges.map((p, i) => ({
      ...p,
      label: ar.priceLabels[i] ?? p.label,
      unit: p.unit ? unitAr[p.unit] ?? p.unit : p.unit,
    })),
  };
}

export function localizeArea(area: ServiceArea, lang: Lang): ServiceArea {
  const ar = lang === 'ar' ? areasAr[area.slug] : undefined;
  return ar ? { ...area, ...ar } : area;
}

export const getServices = (lang: Lang) => serviceTypes.map((s) => localizeService(s, lang));
export const getAreas = (lang: Lang) => serviceAreas.map((a) => localizeArea(a, lang));

export function getService(slug: string, lang: Lang): ServiceType | undefined {
  const s = getServiceBySlug(slug);
  return s && localizeService(s, lang);
}

export function getArea(slug: string, lang: Lang): ServiceArea | undefined {
  const a = getAreaBySlug(slug);
  return a && localizeArea(a, lang);
}

/** Related services in the given language */
export function getRelated(slug: string, lang: Lang): ServiceType[] {
  const s = getServiceBySlug(slug);
  if (!s) return [];
  return s.relatedServices
    .map((r) => getService(r, lang))
    .filter((x): x is ServiceType => x !== undefined);
}

/** Currency label — "AED 1,000" / "1,000 درهم" */
export function formatAed(amount: number, lang: Lang): string {
  const n = amount.toLocaleString('en-US');
  return lang === 'ar' ? `${n} درهم` : `AED ${n}`;
}
