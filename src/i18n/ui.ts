// ============================================================
// Shared UI strings (header, footer, breadcrumbs, common CTAs).
// Page-specific copy lives with its page component.
// Arabic follows src/i18n/glossary.md.
// ============================================================

const en = {
  langName: 'English',
  switchTo: 'العربية', // label of the toggle: the *other* language
  switchToLabel: 'عرض الموقع باللغة العربية',
  logoAlt: 'Duct Masters Logo',
  nav: {
    services: 'Services',
    areas: 'Service Areas',
    industries: 'Industries',
    about: 'About',
    contact: 'Contact',
    blog: 'Blog',
  },
  header: {
    whatsapp: 'WhatsApp',
    contactTitle: 'Email / Contact',
    contactLabel: 'Contact Duct Masters',
    location: 'Location',
    locationLabel: 'Duct Masters location on Google Maps',
    call: 'Call',
    callLabel: (phone: string) => `Call ${phone}`,
    chatWhatsapp: 'Chat on WhatsApp',
    toggleMenu: 'Toggle menu',
  },
  footer: {
    about: (tagline: string, year: number) =>
      `${tagline}. Established ${year}, serving contractors and projects across the UAE from our facility in Musaffah, Abu Dhabi.`,
    callToday: 'Call us today',
    mapTitle: 'Duct Masters location — M-40, Musaffah, Abu Dhabi',
    directions: 'Get Directions',
    servicesHeading: 'Fabrication Services',
    areasHeading: 'Industrial Zones',
    companyHeading: 'Company',
    contactHeading: 'Contact',
    aboutUs: 'About Us',
    services: 'Services',
    areas: 'Areas',
    industries: 'Industries',
    blog: 'Blog',
    contact: 'Contact',
    chatWhatsapp: 'Chat on WhatsApp',
    rights: 'All rights reserved.',
    keyword: 'HVAC Duct Manufacturing Abu Dhabi',
    poweredBy: 'Powered by gnext.ae',
  },
  breadcrumbs: {
    label: 'Breadcrumb',
    home: 'Home',
  },
};

type Strings = typeof en;

const ar: Strings = {
  langName: 'العربية',
  switchTo: 'English',
  switchToLabel: 'View the site in English',
  logoAlt: 'شعار دكت ماسترز',
  nav: {
    services: 'الخدمات',
    areas: 'مناطق الخدمة',
    industries: 'القطاعات',
    about: 'من نحن',
    contact: 'اتصل بنا',
    blog: 'المدونة',
  },
  header: {
    whatsapp: 'واتساب',
    contactTitle: 'البريد الإلكتروني / التواصل',
    contactLabel: 'تواصل مع دكت ماسترز',
    location: 'الموقع',
    locationLabel: 'موقع دكت ماسترز على خرائط جوجل',
    call: 'اتصل',
    callLabel: (phone: string) => `اتصل على ${phone}`,
    chatWhatsapp: 'تواصل عبر واتساب',
    toggleMenu: 'فتح القائمة',
  },
  footer: {
    about: (_tagline: string, year: number) =>
      `تصنيع مجاري التكييف وتشكيل الصفائح المعدنية في أبوظبي. تأسست عام ${year}، ونخدم المقاولين والمشاريع في جميع أنحاء الإمارات من منشأتنا في مصفح، أبوظبي.`,
    callToday: 'اتصل بنا اليوم',
    mapTitle: 'موقع دكت ماسترز — M-40، مصفح، أبوظبي',
    directions: 'احصل على الاتجاهات',
    servicesHeading: 'خدمات التصنيع',
    areasHeading: 'المناطق الصناعية',
    companyHeading: 'الشركة',
    contactHeading: 'معلومات الاتصال',
    aboutUs: 'من نحن',
    services: 'الخدمات',
    areas: 'المناطق',
    industries: 'القطاعات',
    blog: 'المدونة',
    contact: 'اتصل بنا',
    chatWhatsapp: 'تواصل عبر واتساب',
    rights: 'جميع الحقوق محفوظة.',
    keyword: 'تصنيع مجاري التكييف في أبوظبي',
    poweredBy: 'تطوير gnext.ae',
  },
  breadcrumbs: {
    label: 'مسار التنقل',
    home: 'الرئيسية',
  },
};

export const ui: Record<'en' | 'ar', Strings> = { en, ar };
