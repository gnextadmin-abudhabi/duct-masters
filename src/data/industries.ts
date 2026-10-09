// ============================================================
// Duct Masters — Industries served (8)
// Single source for /industries/ and /industries/<slug>/.
// Arabic copy: src/i18n/data/industries.ar.ts
// ============================================================

export interface Industry {
  slug: string;
  /** Full name (detail page) */
  name: string;
  /** Short name for the index cards */
  shortName: string;
  icon: string;
  /** One-line summary for the index cards */
  summary: string;
  description: string;
  /** Service slugs (src/data/serviceTypes.ts) */
  services: string[];
  whyDuctMasters: string;
}

export const industries: Industry[] = [
  {
    slug: 'hvac-contractors',
    name: 'HVAC Contractors',
    shortName: 'HVAC Contractors',
    icon: 'lucide:air-vent',
    summary: 'Duct manufacturing and fabrication services for HVAC contractors across Abu Dhabi.',
    description: 'Duct Masters partners with HVAC contractors across Abu Dhabi and the UAE, providing reliable duct manufacturing, sheet metal fabrication, and custom metal works to support air conditioning and ventilation projects of all sizes.',
    services: ['duct-fabrication', 'sheet-metal-fabrication', 'supply-delivery', 'design-engineering'],
    whyDuctMasters: 'We understand the HVAC contractor workflow — from shop drawings to site delivery. Our Musaffah facility is equipped to handle project-scale duct manufacturing with the quality and lead times contractors depend on.',
  },
  {
    slug: 'mep-contractors',
    name: 'MEP Contractors',
    shortName: 'MEP Contractors',
    icon: 'lucide:cog',
    summary: 'Coordinated fabrication supporting mechanical, electrical, and plumbing projects.',
    description: 'Supporting MEP contractors with HVAC duct manufacturing, sheet metal fabrication, and custom metal components. Duct Masters provides coordinated fabrication services that integrate with mechanical, electrical, and plumbing project requirements across Abu Dhabi.',
    services: ['duct-fabrication', 'sheet-metal-fabrication', 'custom-industrial-fabrication', 'supply-delivery'],
    whyDuctMasters: 'MEP projects require coordinated delivery across multiple trades. We work to your schedule, providing ductwork and fabricated components that match your specifications and arrive when you need them.',
  },
  {
    slug: 'construction-companies',
    name: 'Construction Companies',
    shortName: 'Construction Companies',
    icon: 'lucide:building-2',
    summary: 'HVAC ductwork and fabricated metal components for construction projects.',
    description: 'Duct Masters supplies construction companies with HVAC ductwork, sheet metal components, and custom fabricated products for commercial, residential, and infrastructure projects across Abu Dhabi and the UAE.',
    services: ['duct-fabrication', 'sheet-metal-fabrication', 'metal-rolling-punching', 'supply-delivery'],
    whyDuctMasters: 'Construction projects demand reliability. We deliver manufactured ductwork and metal components on schedule, to specification, with the quality documentation your project requires.',
  },
  {
    slug: 'industrial-facilities',
    name: 'Industrial Facilities',
    shortName: 'Industrial Facilities',
    icon: 'lucide:factory',
    summary: 'Heavy-duty ductwork and industrial-grade fabricated components.',
    description: 'Custom metal fabrication and HVAC duct manufacturing for industrial facilities — factories, processing plants, warehouses, and production units. Duct Masters provides heavy-duty ductwork and industrial-grade fabricated components.',
    services: ['duct-fabrication', 'welding-services', 'custom-industrial-fabrication', 'powder-coating-finishing'],
    whyDuctMasters: 'Industrial environments demand robust fabrication. We work with thicker gauges, stainless steel, and industrial coatings to ensure durability in demanding conditions.',
  },
  {
    slug: 'commercial-buildings',
    name: 'Commercial Buildings',
    shortName: 'Commercial Buildings',
    icon: 'lucide:building',
    summary: 'Quality ductwork for offices, retail, hotels, hospitals, and mixed-use developments.',
    description: 'HVAC duct manufacturing and sheet metal fabrication for commercial buildings — offices, retail, hotels, hospitals, and mixed-use developments. Duct Masters provides high-quality ductwork that meets commercial building standards.',
    services: ['duct-fabrication', 'sheet-metal-fabrication', 'design-engineering', 'supply-delivery'],
    whyDuctMasters: 'Commercial buildings require consistent quality across large volumes of ductwork. Our CNC-equipped facility delivers uniform, precision-manufactured products at commercial scale.',
  },
  {
    slug: 'warehouses-logistics-facilities',
    name: 'Warehouses & Logistics Facilities',
    shortName: 'Warehouses & Logistics',
    icon: 'lucide:warehouse',
    summary: 'Large-volume ductwork and ventilation for distribution centers.',
    description: 'Duct Masters provides HVAC duct manufacturing and metal fabrication for warehouses, distribution centers, and logistics facilities. Large-volume ductwork, industrial ventilation systems, and custom metal components.',
    services: ['duct-fabrication', 'sheet-metal-fabrication', 'supply-delivery', 'welding-services'],
    whyDuctMasters: 'Warehouse and logistics projects require efficient, cost-effective ductwork solutions. We provide volume manufacturing with competitive pricing and reliable delivery.',
  },
  {
    slug: 'factories-manufacturing-units',
    name: 'Factories & Manufacturing Units',
    shortName: 'Factories & Manufacturing',
    icon: 'lucide:wrench',
    summary: 'Custom fabrication for process ventilation and industrial duct systems.',
    description: 'Custom industrial fabrication and HVAC duct systems for factories and manufacturing units in Abu Dhabi and the UAE. Dust extraction ductwork, process ventilation, and custom metal fabrications.',
    services: ['duct-fabrication', 'custom-industrial-fabrication', 'welding-services', 'powder-coating-finishing'],
    whyDuctMasters: 'Manufacturing facilities have unique requirements — from process exhaust to dust collection. We fabricate to your specifications using the right materials and finishes for your operating environment.',
  },
  {
    slug: 'infrastructure-projects',
    name: 'Infrastructure Projects',
    shortName: 'Infrastructure Projects',
    icon: 'lucide:landmark',
    summary: 'Project-scale fabrication for airports, metro, tunnels, and public facilities.',
    description: 'Supporting UAE infrastructure projects with HVAC duct manufacturing, sheet metal fabrication, and custom metal components. Duct Masters provides project-scale fabrication for airports, metro stations, tunnels, and public facilities.',
    services: ['duct-fabrication', 'sheet-metal-fabrication', 'custom-industrial-fabrication', 'design-engineering'],
    whyDuctMasters: 'Infrastructure projects demand the highest standards of quality and documentation. We provide full traceability, material certifications, and QC documentation for every order.',
  },
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
