// ============================================================
// Shared JSON-LD builders
// The business entity is defined once (homepage, @id /#business)
// and every other page references it by @id.
// ============================================================

import { business } from '../data/business';
import { serviceAreas } from '../data/serviceAreas';

export const BUSINESS_ID = `${business.website}/#business`;
export const WEBSITE_ID = `${business.website}/#website`;

export const businessRef = () => ({ '@id': BUSINESS_ID });

const sameAs = () =>
  [
    business.googleBusinessProfile,
    ...Object.values(business.socialMedia),
  ].filter(Boolean);

export const postalAddress = () => ({
  '@type': 'PostalAddress',
  streetAddress: business.address.street,
  addressLocality: business.address.city,
  addressRegion: business.address.state,
  addressCountry: 'AE',
});

export const areaServedList = (areas = serviceAreas) =>
  areas.map((area) => ({
    '@type': 'City',
    name: area.name,
    containedInPlace: { '@type': 'AdministrativeArea', name: area.county },
  }));

/** Full business node — emitted once on the homepage. */
export const businessEntity = () => ({
  '@type': business.schemaType,
  '@id': BUSINESS_ID,
  name: business.name,
  alternateName: business.alternateName,
  legalName: business.legalName,
  url: `${business.website}/`,
  logo: new URL(business.logo, business.website).href,
  image: new URL(business.ogImage, business.website).href,
  telephone: business.phone,
  email: business.email,
  description: business.description,
  foundingDate: `${business.yearEstablished}`,
  priceRange: 'On quotation',
  address: postalAddress(),
  geo: {
    '@type': 'GeoCoordinates',
    latitude: business.coordinates.lat,
    longitude: business.coordinates.lng,
  },
  hasMap: business.googleBusinessProfile,
  sameAs: sameAs(),
  contactPoint: [
    { '@type': 'ContactPoint', telephone: business.phone, contactType: 'sales', areaServed: 'AE', availableLanguage: ['English', 'Arabic'] },
    { '@type': 'ContactPoint', telephone: business.phoneSecondary, contactType: 'customer service', areaServed: 'AE', availableLanguage: ['English', 'Arabic'] },
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '17:00',
    },
  ],
  areaServed: areaServedList(),
});

/** Service node that points to the business by @id. */
export const serviceSchema = (opts: {
  url: string;
  name: string;
  serviceType: string;
  description: string;
  image?: string;
  areaServed: unknown;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${new URL(opts.url, business.website).href}#service`,
  name: opts.name,
  serviceType: opts.serviceType,
  description: opts.description,
  url: new URL(opts.url, business.website).href,
  ...(opts.image ? { image: new URL(opts.image, business.website).href } : {}),
  provider: businessRef(),
  areaServed: opts.areaServed,
});
