// ============================================================
// Duct Masters — Business Configuration
// ============================================================

export interface BusinessHours {
  days: string;
  hours: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  stateCode: string;
  zip: string;
  country: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Business {
  name: string;
  alternateName: string;
  shortName: string;
  legalName: string;
  tagline: string;
  description: string;
  phone: string;
  phoneHref: string;
  phoneSecondary: string;
  whatsapp: string;
  email: string;
  website: string;
  owner: string;
  address: Address;
  coordinates: Coordinates;
  googleMapsUrl: string;
  socialMedia: Record<string, string>;
  license: string;
  yearEstablished: number;
  certifications: string[];
  hours: BusinessHours[];
  schemaType: string;
  serviceRadius: string;
  logo: string;
  logoWhite: string;
  ogImage: string;
  googleBusinessProfile: string;
}

export const business: Business = {
  name: 'Duct Masters',
  // Exact business name as listed on the Google Business Profile
  alternateName: 'DUCT MASTERS Air Conditioners Requisites Manufacturing',
  shortName: 'Duct Masters',
  legalName: 'DUCT MASTERS AIR CONDITIONERS REQUISITES MANUFACTURING - L.L.C',
  tagline: 'HVAC Duct Manufacturing & Sheet Metal Fabrication in Abu Dhabi',
  description:
    'Duct Masters is an Abu Dhabi-based HVAC duct manufacturing and sheet metal fabrication company located in Musaffah. We manufacture and supply air conditioning ducting products and custom metal fabrication solutions for commercial, industrial, construction, infrastructure, and HVAC projects across Abu Dhabi and the UAE.',
  phone: '+971 2 564 9566',
  phoneHref: 'tel:+97125649566',
  phoneSecondary: '+971 56 355 7931',
  whatsapp: 'https://wa.me/971563557931',
  email: 'info@ductmasters.ae',
  website: 'https://ductmasters.ae',
  owner: 'Duct Masters',
  address: {
    street: 'M-40, Musaffah',
    city: 'Abu Dhabi',
    state: 'Abu Dhabi',
    stateCode: 'AD',
    zip: '',
    country: 'United Arab Emirates',
  },
  coordinates: {
    // Matches the Google Business Profile pin
    lat: 24.3528127,
    lng: 54.4885329,
  },
  googleMapsUrl: 'https://maps.app.goo.gl/QZKr1kfig3qjU5om6',
  socialMedia: {
    facebook: '',
    instagram: '',
    twitter: '',
    linkedin: '',
    youtube: '',
  },
  license: 'UAE Trade License',
  yearEstablished: 2005,
  certifications: [],
  hours: [
    { days: 'Monday – Saturday', hours: '8:00 AM – 5:00 PM' },
    { days: 'Sunday', hours: 'Closed' },
  ],
  schemaType: 'HVACBusiness',
  serviceRadius: 'Abu Dhabi and across the UAE',
  logo: '/images/logo-transparent.png',
  logoWhite: '/images/logo-white.png',
  ogImage: '/images/og-image.jpg',
  // Canonical Google Maps listing URL (CID) for schema sameAs / hasMap
  googleBusinessProfile: 'https://www.google.com/maps?cid=5755622183265679677',
};

export function yearsInBusiness(): number {
  return new Date().getFullYear() - business.yearEstablished;
}
