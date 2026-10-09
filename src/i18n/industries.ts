// Localized views of src/data/industries.ts (Arabic merged over English).

import { industries, getIndustryBySlug, type Industry } from '../data/industries';
import { industriesAr } from './data/industries.ar';
import type { Lang } from './index';

// Fail the build if an industry has no Arabic copy
for (const i of industries) {
  if (!industriesAr[i.slug]) {
    throw new Error(`Missing Arabic copy for industry "${i.slug}" (src/i18n/data/industries.ar.ts)`);
  }
}

export function localizeIndustry(industry: Industry, lang: Lang): Industry {
  const ar = lang === 'ar' ? industriesAr[industry.slug] : undefined;
  return ar ? { ...industry, ...ar } : industry;
}

export const getIndustries = (lang: Lang) => industries.map((i) => localizeIndustry(i, lang));

export function getIndustry(slug: string, lang: Lang): Industry | undefined {
  const i = getIndustryBySlug(slug);
  return i && localizeIndustry(i, lang);
}

/**
 * Industry name as it reads after "for" — "hvac contractors" in English,
 * the genitive form with «لـ» attached in Arabic («لمقاولي التكييف», «للمنشآت الصناعية»).
 */
export function forIndustry(industry: Industry, lang: Lang): string {
  if (lang !== 'ar') return `for ${industry.name.toLowerCase()}`;
  const word = industriesAr[industry.slug]?.audience ?? industry.name;
  return word.startsWith('ال') ? `لل${word.slice(2)}` : `ل${word}`;
}

/** Arabic genitive/accusative form of the name (no preposition); English name otherwise */
export function industryAudience(industry: Industry, lang: Lang): string {
  return lang === 'ar' ? industriesAr[industry.slug]?.audience ?? industry.name : industry.name;
}
