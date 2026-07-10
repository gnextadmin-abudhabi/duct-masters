// ============================================================
// Duct Masters — Service Areas (10 industrial areas)
// ============================================================

export interface ServiceArea {
  slug: string;
  name: string;
  county: string;
  state: string;
  zipCodes: string[];
  population: number;
  lat: number;
  lng: number;
  description: string;
  featured: boolean;
  nearby: string[];
}

export const serviceAreas: ServiceArea[] = [
  {
    slug: 'musaffah',
    name: 'Musaffah',
    county: 'Abu Dhabi',
    state: 'AD',
    zipCodes: [],
    population: 150000,
    lat: 24.3489,
    lng: 54.4917,
    description:
      'Duct Masters is based in Musaffah, the industrial heart of Abu Dhabi. We provide HVAC duct manufacturing and sheet metal fabrication to businesses throughout the Musaffah industrial zone.',
    featured: true,
    nearby: ['musaffah-m40', 'icad', 'abu-dhabi-industrial-city', 'saadiyat-island', 'reem-island'],
  },
  {
    slug: 'musaffah-m40',
    name: 'Musaffah M-40',
    county: 'Abu Dhabi',
    state: 'AD',
    zipCodes: [],
    population: 50000,
    lat: 24.3561,
    lng: 54.4954,
    description:
      'Our facility is located in M-40, Musaffah — a key industrial zone in Abu Dhabi. We serve neighboring businesses with HVAC duct manufacturing and custom metal fabrication.',
    featured: true,
    nearby: ['musaffah', 'icad'],
  },
  {
    slug: 'icad',
    name: 'ICAD',
    county: 'Abu Dhabi',
    state: 'AD',
    zipCodes: [],
    population: 40000,
    lat: 24.3321,
    lng: 54.5254,
    description:
      'ICAD (Industrial City of Abu Dhabi) is a major industrial hub. Duct Masters supplies HVAC ducts and fabricated metal components to factories and facilities in ICAD.',
    featured: true,
    nearby: ['musaffah', 'musaffah-m40', 'abu-dhabi-industrial-city'],
  },
  {
    slug: 'abu-dhabi-industrial-city',
    name: 'Abu Dhabi Industrial City',
    county: 'Abu Dhabi',
    state: 'AD',
    zipCodes: [],
    population: 60000,
    lat: 24.3236,
    lng: 54.5333,
    description:
      'Duct Masters provides HVAC duct manufacturing, laser cutting, CNC forming, and full metal fabrication services to projects across Abu Dhabi Industrial City.',
    featured: true,
    nearby: ['musaffah', 'icad', 'mafraq-industrial-area', 'reem-island'],
  },
  {
    slug: 'mafraq-industrial-area',
    name: 'Mafraq Industrial Area',
    county: 'Abu Dhabi',
    state: 'AD',
    zipCodes: [],
    population: 30000,
    lat: 24.3117,
    lng: 54.5639,
    description:
      'Industrial metal fabrication and HVAC duct manufacturing services for facilities in the Mafraq Industrial Area, a growing industrial zone in Abu Dhabi.',
    featured: false,
    nearby: ['musaffah', 'icad', 'abu-dhabi-industrial-city'],
  },
  {
    slug: 'kizad',
    name: 'KIZAD',
    county: 'Abu Dhabi',
    state: 'AD',
    zipCodes: [],
    population: 50000,
    lat: 24.8289,
    lng: 54.6839,
    description:
      'KIZAD (Khalifa Industrial Zone Abu Dhabi) is one of the largest industrial zones in the region. Duct Masters supplies HVAC ductwork and fabricated metal products to industrial tenants and projects within KIZAD.',
    featured: true,
    nearby: ['icad', 'abu-dhabi-industrial-city'],
  },
  {
    slug: 'al-ain-industrial-area',
    name: 'Al Ain Industrial Area',
    county: 'Abu Dhabi',
    state: 'AD',
    zipCodes: [],
    population: 80000,
    lat: 24.2075,
    lng: 55.7447,
    description:
      'Duct Masters delivers HVAC duct systems and fabricated metal products to commercial and industrial projects in the Al Ain Industrial Area.',
    featured: false,
    nearby: [],
  },
  {
    slug: 'ruwais-al-dhafra-industrial-region',
    name: 'Ruwais / Al Dhafra Industrial Region',
    county: 'Abu Dhabi',
    state: 'AD',
    zipCodes: [],
    population: 60000,
    lat: 24.1289,
    lng: 53.8867,
    description:
      'Industrial duct fabrication and metal works for oil, gas, and infrastructure projects across the Ruwais and Al Dhafra industrial region. Duct Masters provides reliable supply and delivery to this key industrial zone.',
    featured: false,
    nearby: ['musaffah'],
  },
  {
    slug: 'saadiyat-island',
    name: 'Saadiyat Island',
    county: 'Abu Dhabi',
    state: 'AD',
    zipCodes: [],
    population: 35000,
    lat: 24.5450,
    lng: 54.4111,
    description:
      'Duct Masters provides HVAC duct manufacturing and custom metal fabrication to commercial, hospitality, and cultural projects on Saadiyat Island — home to luxury resorts, museums, and premium residential developments in Abu Dhabi.',
    featured: true,
    nearby: ['musaffah', 'reem-island'],
  },
  {
    slug: 'reem-island',
    name: 'Reem Island',
    county: 'Abu Dhabi',
    state: 'AD',
    zipCodes: [],
    population: 200000,
    lat: 24.4949,
    lng: 54.4034,
    description:
      'Duct Masters supplies HVAC duct systems and fabricated metal components to residential, commercial, and mixed-use developments on Reem Island — one of Abu Dhabi\u2019s largest and fastest-growing urban communities.',
    featured: true,
    nearby: ['musaffah', 'saadiyat-island', 'abu-dhabi-industrial-city'],
  },
];

export function getAreaBySlug(slug: string): ServiceArea | undefined {
  return serviceAreas.find((area) => area.slug === slug);
}

export function getNearbyAreas(slug: string): ServiceArea[] {
  const area = getAreaBySlug(slug);
  if (!area) return [];
  return area.nearby
    .map((nearbySlug) => getAreaBySlug(nearbySlug))
    .filter((a): a is ServiceArea => a !== undefined);
}

export function getAreaName(slug: string): string {
  const area = getAreaBySlug(slug);
  if (area) return area.name;
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function getFeaturedAreas(): ServiceArea[] {
  return serviceAreas.filter((area) => area.featured);
}

export function getCounties(): string[] {
  return [...new Set(serviceAreas.map((area) => area.county))];
}