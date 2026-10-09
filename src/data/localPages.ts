// ============================================================
// Duct Masters — Local (service × location) landing pages
// ------------------------------------------------------------
// Registry of the root-level pages in src/pages/*-*.astro.
// Used to build internal links (service hubs, area pages and
// sibling local pages) and to generate each page's title,
// meta description and H1. Add an entry here whenever a new
// local page file is created, or it will not be linked.
// The Arabic mirrors (/ar/<slug>/) are generated from this
// registry by src/pages/ar/[local].astro.
// ============================================================

import { business } from './business';
import { getServiceBySlug } from './serviceTypes';
import { getAreaBySlug } from './serviceAreas';
import type { Lang } from '../i18n';
import { getArea, getService, getBusiness } from '../i18n/localize';

export interface LocalPage {
  /** URL path, with leading and trailing slash */
  path: string;
  serviceSlug: string;
  /** null = the emirate-wide "… Abu Dhabi" page */
  areaSlug: string | null;
}

/** Keyword label each URL targets (may differ from the service's display name). */
const serviceLabels: Record<string, string> = {
  'sheet-metal-fabrication': 'Sheet Metal Fabrication',
  'duct-fabrication': 'HVAC Duct Manufacturing',
  'laser-cutting': 'Laser Cutting Services',
  'cnc-forming': 'CNC Metal Forming',
  'welding-services': 'Industrial Welding Services',
  'metal-rolling-punching': 'Metal Rolling & Punching',
  'custom-industrial-fabrication': 'Custom Metal Fabrication',
  'powder-coating-finishing': 'Powder Coating & Finishing',
  'design-engineering': 'Duct System Design',
  'supply-delivery': 'Duct Supply & Installation',
  'stainless-steel-duct-fabrication': 'Stainless Steel Duct Fabrication',
};

/** One-line value proposition per service, used in meta descriptions. */
const serviceBenefits: Record<string, string> = {
  'sheet-metal-fabrication': 'Cutting, bending, welding and finishing to your drawings',
  'duct-fabrication': 'Custom GI and stainless ductwork built to SMACNA',
  'laser-cutting': 'High-accuracy CNC fiber laser cutting for sheets and parts',
  'cnc-forming': 'CNC press brake forming with repeatable precision',
  'welding-services': 'MIG, TIG and arc welding for frames, supports and parts',
  'metal-rolling-punching': 'Plate rolling, section rolling and CNC punching',
  'custom-industrial-fabrication': 'Project-specific metal parts and assemblies',
  'powder-coating-finishing': 'Durable, corrosion-resistant finishes for metal parts',
  'design-engineering': 'Shop drawings and fabrication planning for ductwork',
  'supply-delivery': 'Manufactured ductwork delivered on time to site',
  'stainless-steel-duct-fabrication': 'Grade 304 and 316L ductwork with TIG-welded joints',
};

/** Arabic keyword labels (how each service is searched for in Arabic in the UAE). */
const serviceLabelsAr: Record<string, string> = {
  'sheet-metal-fabrication': 'تشكيل الصفائح المعدنية',
  'duct-fabrication': 'تصنيع مجاري التكييف',
  'laser-cutting': 'خدمات القص بالليزر',
  'cnc-forming': 'تشكيل المعادن بماكينات CNC',
  'welding-services': 'خدمات اللحام الصناعي',
  'metal-rolling-punching': 'درفلة وتخريم المعادن',
  'custom-industrial-fabrication': 'تصنيع المعادن حسب الطلب',
  'powder-coating-finishing': 'الطلاء بالبودرة والتشطيب',
  'design-engineering': 'تصميم أنظمة مجاري الهواء',
  'supply-delivery': 'توريد وتركيب مجاري الهواء',
  'stainless-steel-duct-fabrication': 'تصنيع مجاري الستانلس ستيل',
};

const serviceBenefitsAr: Record<string, string> = {
  'sheet-metal-fabrication': 'قص وثني ولحام وتشطيب وفق رسوماتكم',
  'duct-fabrication': 'مجاري هواء من الحديد المجلفن (GI) والستانلس ستيل حسب الطلب وفق معايير SMACNA',
  'laser-cutting': 'قص دقيق بالليزر الليفي بماكينات CNC للصفائح والقطع',
  'cnc-forming': 'ثني بمكابس CNC بدقة ثابتة ومتكررة',
  'welding-services': 'لحام MIG وTIG واللحام بالقوس للهياكل والدعامات والقطع',
  'metal-rolling-punching': 'درفلة الألواح والمقاطع والتخريم بماكينات CNC',
  'custom-industrial-fabrication': 'قطع وتجميعات معدنية مصممة خصيصاً لكل مشروع',
  'powder-coating-finishing': 'تشطيبات متينة مقاومة للتآكل للقطع المعدنية',
  'design-engineering': 'رسومات تنفيذية وتخطيط تصنيع مجاري الهواء',
  'supply-delivery': 'مجاري هواء مصنّعة تُسلَّم إلى الموقع في موعدها',
  'stainless-steel-duct-fabrication': 'مجاري هواء من الستانلس ستيل 304 و316L بوصلات ملحومة بتقنية TIG',
};

const benefitFor = (serviceSlug: string, lang: Lang): string | undefined =>
  (lang === 'ar' ? serviceBenefitsAr : serviceBenefits)[serviceSlug];

export const localPages: LocalPage[] = [
  { path: '/sheet-metal-fabrication-abu-dhabi/', serviceSlug: 'sheet-metal-fabrication', areaSlug: null },
  { path: '/sheet-metal-fabrication-musaffah/', serviceSlug: 'sheet-metal-fabrication', areaSlug: 'musaffah' },
  { path: '/sheet-metal-fabrication-icad/', serviceSlug: 'sheet-metal-fabrication', areaSlug: 'icad' },
  { path: '/sheet-metal-fabrication-abu-dhabi-industrial-city/', serviceSlug: 'sheet-metal-fabrication', areaSlug: 'abu-dhabi-industrial-city' },
  { path: '/sheet-metal-fabrication-kizad/', serviceSlug: 'sheet-metal-fabrication', areaSlug: 'kizad' },
  { path: '/sheet-metal-fabrication-saadiyat-island/', serviceSlug: 'sheet-metal-fabrication', areaSlug: 'saadiyat-island' },
  { path: '/sheet-metal-fabrication-reem-island/', serviceSlug: 'sheet-metal-fabrication', areaSlug: 'reem-island' },

  { path: '/hvac-duct-manufacturing-abu-dhabi/', serviceSlug: 'duct-fabrication', areaSlug: null },
  { path: '/hvac-duct-manufacturing-musaffah/', serviceSlug: 'duct-fabrication', areaSlug: 'musaffah' },
  { path: '/hvac-duct-manufacturing-icad/', serviceSlug: 'duct-fabrication', areaSlug: 'icad' },
  { path: '/hvac-duct-manufacturing-abu-dhabi-industrial-city/', serviceSlug: 'duct-fabrication', areaSlug: 'abu-dhabi-industrial-city' },
  { path: '/hvac-duct-manufacturing-kizad/', serviceSlug: 'duct-fabrication', areaSlug: 'kizad' },
  { path: '/hvac-duct-manufacturing-al-ain-industrial-area/', serviceSlug: 'duct-fabrication', areaSlug: 'al-ain-industrial-area' },
  { path: '/hvac-duct-manufacturing-saadiyat-island/', serviceSlug: 'duct-fabrication', areaSlug: 'saadiyat-island' },
  { path: '/hvac-duct-manufacturing-reem-island/', serviceSlug: 'duct-fabrication', areaSlug: 'reem-island' },

  { path: '/stainless-steel-duct-fabrication-abu-dhabi/', serviceSlug: 'stainless-steel-duct-fabrication', areaSlug: null },
  { path: '/stainless-steel-duct-fabrication-musaffah/', serviceSlug: 'stainless-steel-duct-fabrication', areaSlug: 'musaffah' },
  { path: '/stainless-steel-duct-fabrication-icad/', serviceSlug: 'stainless-steel-duct-fabrication', areaSlug: 'icad' },
  { path: '/stainless-steel-duct-fabrication-abu-dhabi-industrial-city/', serviceSlug: 'stainless-steel-duct-fabrication', areaSlug: 'abu-dhabi-industrial-city' },
  { path: '/stainless-steel-duct-fabrication-saadiyat-island/', serviceSlug: 'stainless-steel-duct-fabrication', areaSlug: 'saadiyat-island' },
  { path: '/stainless-steel-duct-fabrication-reem-island/', serviceSlug: 'stainless-steel-duct-fabrication', areaSlug: 'reem-island' },

  { path: '/laser-cutting-services-abu-dhabi/', serviceSlug: 'laser-cutting', areaSlug: null },
  { path: '/laser-cutting-services-musaffah/', serviceSlug: 'laser-cutting', areaSlug: 'musaffah' },
  { path: '/laser-cutting-services-icad/', serviceSlug: 'laser-cutting', areaSlug: 'icad' },
  { path: '/laser-cutting-services-saadiyat-island/', serviceSlug: 'laser-cutting', areaSlug: 'saadiyat-island' },
  { path: '/laser-cutting-services-reem-island/', serviceSlug: 'laser-cutting', areaSlug: 'reem-island' },

  { path: '/cnc-metal-forming-abu-dhabi/', serviceSlug: 'cnc-forming', areaSlug: null },
  { path: '/cnc-metal-forming-musaffah/', serviceSlug: 'cnc-forming', areaSlug: 'musaffah' },
  { path: '/cnc-metal-forming-icad/', serviceSlug: 'cnc-forming', areaSlug: 'icad' },

  { path: '/industrial-welding-services-abu-dhabi/', serviceSlug: 'welding-services', areaSlug: null },
  { path: '/industrial-welding-services-musaffah/', serviceSlug: 'welding-services', areaSlug: 'musaffah' },
  { path: '/industrial-welding-services-abu-dhabi-industrial-city/', serviceSlug: 'welding-services', areaSlug: 'abu-dhabi-industrial-city' },

  { path: '/custom-metal-fabrication-abu-dhabi/', serviceSlug: 'custom-industrial-fabrication', areaSlug: null },
  { path: '/custom-metal-fabrication-musaffah/', serviceSlug: 'custom-industrial-fabrication', areaSlug: 'musaffah' },
  { path: '/custom-metal-fabrication-icad/', serviceSlug: 'custom-industrial-fabrication', areaSlug: 'icad' },

  { path: '/powder-coating-finishing-abu-dhabi/', serviceSlug: 'powder-coating-finishing', areaSlug: null },
  { path: '/powder-coating-finishing-musaffah/', serviceSlug: 'powder-coating-finishing', areaSlug: 'musaffah' },

  { path: '/duct-supply-installation-abu-dhabi/', serviceSlug: 'supply-delivery', areaSlug: null },
  { path: '/duct-supply-installation-musaffah/', serviceSlug: 'supply-delivery', areaSlug: 'musaffah' },

  { path: '/metal-rolling-punching-abu-dhabi/', serviceSlug: 'metal-rolling-punching', areaSlug: null },
  { path: '/duct-system-design-abu-dhabi/', serviceSlug: 'design-engineering', areaSlug: null },
];

export const getLocalPage = (serviceSlug: string, areaSlug: string | null) =>
  localPages.find((p) => p.serviceSlug === serviceSlug && p.areaSlug === areaSlug);

export const getLocalPagesForService = (serviceSlug: string) =>
  localPages.filter((p) => p.serviceSlug === serviceSlug);

export const getLocalPagesForArea = (areaSlug: string) =>
  localPages.filter((p) => p.areaSlug === areaSlug);

export const serviceLabel = (serviceSlug: string, lang: Lang = 'en') =>
  lang === 'ar'
    ? serviceLabelsAr[serviceSlug] ?? getService(serviceSlug, 'ar')?.name ?? serviceSlug
    : serviceLabels[serviceSlug] ?? getServiceBySlug(serviceSlug)?.name ?? serviceSlug;

export const placeName = (areaSlug: string | null, lang: Lang = 'en') => {
  if (lang === 'ar') return areaSlug ? getArea(areaSlug, 'ar')?.name ?? areaSlug : 'أبوظبي';
  return areaSlug ? getAreaBySlug(areaSlug)?.name ?? areaSlug : 'Abu Dhabi';
};

/** Link text for a local page, e.g. "Laser Cutting Services in ICAD". */
export const localPageLabel = (page: LocalPage, lang: Lang = 'en') =>
  lang === 'ar'
    ? `${serviceLabel(page.serviceSlug, 'ar')} في ${placeName(page.areaSlug, 'ar')}`
    : `${serviceLabel(page.serviceSlug)} in ${placeName(page.areaSlug)}`;

const MAX_TITLE = 60;
const MAX_DESCRIPTION = 150;

/** First candidate that fits, else the shortest one. */
const pick = (candidates: string[], max: number) =>
  candidates.find((c) => c.length <= max) ??
  candidates.reduce((a, b) => (a.length <= b.length ? a : b));

const brandAr = () => getBusiness('ar').name;

/** Title tag, kept to 60 characters. The brand is appended only when it fits. */
export const localTitle = (serviceSlug: string, areaSlug: string | null, lang: Lang = 'en') => {
  const label = serviceLabel(serviceSlug, lang);
  const place = placeName(areaSlug, lang);
  if (lang === 'ar') {
    return pick(
      [
        // Dropping «في» reads as broken Arabic, so drop the brand first
        `${label} في ${place} | ${brandAr()}`,
        `${label} في ${place}`,
        `${label} ${place}`,
      ],
      MAX_TITLE,
    );
  }
  return pick(
    [
      `${label} in ${place} | ${business.name}`,
      `${label} ${place} | ${business.name}`,
      `${label} in ${place}`,
      `${label} ${place}`,
    ],
    MAX_TITLE,
  );
};

/** H1 — states what and where, without the brand suffix. */
export const localHeading = (serviceSlug: string, areaSlug: string | null, lang: Lang = 'en') =>
  lang === 'ar'
    ? `${serviceLabel(serviceSlug, 'ar')} في ${placeName(areaSlug, 'ar')}`
    : `${serviceLabel(serviceSlug)} in ${placeName(areaSlug)}`;

/** Meta description, kept to 150 characters. */
export const localDescription = (serviceSlug: string, areaSlug: string | null, lang: Lang = 'en') => {
  const label = serviceLabel(serviceSlug, lang);
  const place = placeName(areaSlug, lang);
  const benefit = benefitFor(serviceSlug, lang) ?? '';
  if (lang === 'ar') {
    // Avoid "في مصفح من مصنعنا في M-40 بمصفح"
    const factory = areaSlug?.startsWith('musaffah') ? 'من مصنعنا في M-40' : 'من مصنعنا في M-40 بمصفح';
    return pick(
      [
        `${label} في ${place} ${factory}. ${benefit}. اتصل على ${business.phone}.`,
        `${label} في ${place} ${factory}. ${benefit}.`,
        `${label} في ${place}. ${benefit}. اتصل على ${business.phone}.`,
        `${label} في ${place}. ${benefit}.`,
      ],
      MAX_DESCRIPTION,
    );
  }
  // Avoid "in Musaffah from our M-40 Musaffah factory"
  const factory = place.startsWith('Musaffah') ? 'our M-40 factory' : 'our M-40 Musaffah factory';
  return pick(
    [
      `${label} in ${place} from ${factory}. ${benefit}. Call ${business.phone}.`,
      `${label} in ${place} from ${factory}. ${benefit}.`,
      `${label} in ${place}. ${benefit}. Call ${business.phone}.`,
      `${label} in ${place}. ${benefit}.`,
    ],
    MAX_DESCRIPTION,
  );
};

/** Service hub (/services/<slug>/) title and description. */
export const hubTitle = (serviceSlug: string, lang: Lang = 'en') => {
  if (lang === 'ar') {
    const name = getService(serviceSlug, 'ar')?.name ?? serviceLabel(serviceSlug, 'ar');
    return pick([`${name} | ${brandAr()} الإمارات`, `${name} | ${brandAr()}`, name], MAX_TITLE);
  }
  const name = getServiceBySlug(serviceSlug)?.name ?? serviceLabel(serviceSlug);
  return pick([`${name} | ${business.name} UAE`, `${name} | ${business.name}`, name], MAX_TITLE);
};

export const hubDescription = (serviceSlug: string, lang: Lang = 'en') => {
  const benefit = benefitFor(serviceSlug, lang) ?? '';
  if (lang === 'ar') {
    const name = getService(serviceSlug, 'ar')?.name ?? serviceLabel(serviceSlug, 'ar');
    return pick(
      [
        `${name} من ${brandAr()} في M-40 مصفح. ${benefit}. نخدم أبوظبي وجميع أنحاء الإمارات.`,
        `${name} من ${brandAr()} في M-40 مصفح. ${benefit}.`,
        `${name}. ${benefit}.`,
      ],
      MAX_DESCRIPTION,
    );
  }
  const name = getServiceBySlug(serviceSlug)?.name ?? serviceLabel(serviceSlug);
  return pick(
    [
      `${name} by ${business.name}, M-40 Musaffah. ${benefit}. Serving Abu Dhabi and the UAE.`,
      `${name} by ${business.name}, M-40 Musaffah. ${benefit}.`,
      `${name}. ${benefit}.`,
    ],
    MAX_DESCRIPTION,
  );
};

/** Hero lead sentence for a local page (visible copy, no phone number). */
export const localLead = (serviceSlug: string, areaSlug: string | null, lang: Lang = 'en') => {
  const place = placeName(areaSlug, lang);
  const benefit = benefitFor(serviceSlug, lang) ?? serviceLabel(serviceSlug, lang);
  if (lang === 'ar') {
    const origin = areaSlug?.startsWith('musaffah') ? 'هنا في M-40' : 'في منشأتنا في M-40 بمصفح';
    return `${benefit}، ننفّذها ${origin} ونسلّمها إلى المشاريع في ${place}.`;
  }
  const origin = place.startsWith('Musaffah') ? 'right here in M-40' : 'at our M-40 Musaffah facility';
  return `${benefit}, made ${origin} and delivered to projects in ${place}.`;
};
