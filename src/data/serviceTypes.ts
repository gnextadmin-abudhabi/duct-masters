// ============================================================
// Duct Masters — Service Types (11 fabrication services)
// ============================================================

export interface ProcessStep {
  title: string;
  description: string;
}

export interface PriceRange {
  label: string;
  min: number;
  max: number;
  unit?: string;
}

export interface ServiceType {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  image: string;
  icon: string;
  emergency: boolean;
  featured: boolean;
  process: ProcessStep[];
  priceRanges: PriceRange[];
  keywords: string[];
  relatedServices: string[];
}

export const serviceTypes: ServiceType[] = [
  {
    slug: 'sheet-metal-fabrication',
    name: 'Sheet Metal Fabrication',
    shortName: 'Sheet Metal',
    description:
      'Comprehensive sheet metal fabrication for HVAC, construction, industrial, commercial, and infrastructure projects. Services include cutting, forming, bending, shaping, joining, and finishing sheet metal components to exact project specifications.',
    image: '/images/gallery/workers-fabricating-sheet-metal.webp',
    icon: 'lucide:layout-panel-top',
    emergency: false,
    featured: true,
    process: [
      { title: 'Design Review', description: 'We review your drawings, CAD files, or specifications to plan the fabrication approach.' },
      { title: 'Material Selection', description: 'Appropriate gauge and grade of sheet metal is selected based on project requirements.' },
      { title: 'Cutting & Forming', description: 'Precision cutting, bending, and forming using laser cutters, CNC press brakes, and shears.' },
      { title: 'Assembly & Welding', description: 'Components are assembled, welded, and joined according to specifications.' },
      { title: 'Finishing & QC', description: 'Surface finishing, powder coating if required, and final quality inspection before delivery.' },
    ],
    priceRanges: [
      { label: 'Standard Fabrication', min: 500, max: 5000, unit: 'per project' },
      { label: 'Complex Assembly', min: 2000, max: 15000, unit: 'per project' },
      { label: 'Bulk Production', min: 10000, max: 100000, unit: 'per order' },
    ],
    keywords: ['sheet metal fabrication Abu Dhabi', 'metal fabrication Musaffah', 'sheet metal works UAE'],
    relatedServices: ['duct-fabrication', 'laser-cutting', 'cnc-forming', 'welding-services'],
  },
  {
    slug: 'duct-fabrication',
    name: 'HVAC Duct Manufacturing',
    shortName: 'Duct Fab',
    description:
      'Manufacturing and fabrication of HVAC duct systems for air conditioning and ventilation projects. This is one of our core services — custom ductwork for commercial, industrial, and infrastructure HVAC systems, built to SMACNA and project standards.',
    image: '/images/gallery/duct-manufacturing-workshop.webp',
    icon: 'lucide:air-vent',
    emergency: false,
    featured: true,
    process: [
      { title: 'Duct System Design', description: 'Review of HVAC design drawings to plan duct sizing, routing, and fabrication requirements.' },
      { title: 'Material Preparation', description: 'Galvanized iron (GI), stainless steel, or aluminum sheets are selected and prepared.' },
      { title: 'Duct Fabrication', description: 'Cutting, forming, and assembling duct sections using plasma cutting, CNC forming, and Pittsburgh seam locking.' },
      { title: 'Accessories & Fittings', description: 'Fabrication of elbows, reducers, take-offs, dampers, and other duct accessories.' },
      { title: 'Quality Inspection', description: 'Dimensional checks, leakage testing where required, and final QC before dispatch.' },
    ],
    priceRanges: [
      { label: 'Standard Ductwork', min: 1000, max: 10000, unit: 'per project' },
      { label: 'Large Commercial Systems', min: 5000, max: 50000, unit: 'per project' },
      { label: 'Custom Industrial Ducting', min: 10000, max: 100000, unit: 'per order' },
    ],
    keywords: ['HVAC duct manufacturing Abu Dhabi', 'AC duct fabrication', 'duct fabrication Musaffah', 'duct manufacturing UAE'],
    relatedServices: ['sheet-metal-fabrication', 'cnc-forming', 'design-engineering', 'supply-delivery', 'stainless-steel-duct-fabrication'],
  },
  {
    slug: 'laser-cutting',
    name: 'Laser Cutting Services',
    shortName: 'Laser Cut',
    description:
      'Precision laser cutting services for metal sheets and custom components. Suitable for industrial fabrication, HVAC accessories, construction components, and custom metal works. High-accuracy CNC fiber laser cutting with tight tolerances.',
    image: '/images/gallery/laser-machine-operator.webp',
    icon: 'lucide:scissors-line-dashed',
    emergency: false,
    featured: true,
    process: [
      { title: 'File Preparation', description: 'DXF or CAD files are reviewed and optimized for laser cutting paths.' },
      { title: 'Material Loading', description: 'Sheet metal is loaded onto the laser cutting bed.' },
      { title: 'CNC Laser Cutting', description: 'High-power fiber laser cuts the programmed shape with precision.' },
      { title: 'Part Sorting', description: 'Cut parts are sorted, labeled, and organized.' },
      { title: 'Quality Check', description: 'Dimensional verification and edge quality inspection.' },
    ],
    priceRanges: [
      { label: 'Small Batch Cutting', min: 200, max: 2000, unit: 'per job' },
      { label: 'Medium Production Run', min: 1000, max: 10000, unit: 'per batch' },
      { label: 'High Volume Order', min: 5000, max: 50000, unit: 'per order' },
    ],
    keywords: ['laser cutting Abu Dhabi', 'CNC laser cutting UAE', 'metal laser cutting Musaffah'],
    relatedServices: ['sheet-metal-fabrication', 'cnc-forming', 'custom-industrial-fabrication'],
  },
  {
    slug: 'cnc-forming',
    name: 'CNC Metal Forming',
    shortName: 'CNC Forming',
    description:
      'CNC metal forming and bending services for accurate metal shaping. Our CNC press brakes and forming equipment support duct fabrication, sheet metal fabrication, and customized industrial components with repeatable precision.',
    image: '/images/gallery/technician-operating-cnc-machine.webp',
    icon: 'lucide:fold-vertical',
    emergency: false,
    featured: false,
    process: [
      { title: 'Programming', description: 'CNC program is written based on part drawings and bend sequences.' },
      { title: 'Tooling Setup', description: 'Appropriate punch and die tooling is installed for the required bends.' },
      { title: 'CNC Bending', description: 'Automated bending operations with precise angle control and back-gauge positioning.' },
      { title: 'In-Process Inspection', description: 'Angle checks and dimensional verification during production.' },
      { title: 'Batch Completion', description: 'Completed parts are stacked, palletized, and staged for the next operation.' },
    ],
    priceRanges: [
      { label: 'Simple Forming Jobs', min: 300, max: 3000, unit: 'per batch' },
      { label: 'Complex Multi-Bend Parts', min: 1000, max: 8000, unit: 'per batch' },
      { label: 'Production Runs', min: 3000, max: 30000, unit: 'per order' },
    ],
    keywords: ['CNC forming Abu Dhabi', 'metal bending services', 'CNC press brake UAE'],
    relatedServices: ['sheet-metal-fabrication', 'laser-cutting', 'metal-rolling-punching'],
  },
  {
    slug: 'welding-services',
    name: 'Industrial Welding Services',
    shortName: 'Welding',
    description:
      'Industrial welding services for fabricated metal components, duct-related supports, frames, structures, and custom metal works. MIG, TIG, and arc welding capabilities for mild steel, stainless steel, and aluminum.',
    image: '/images/gallery/workers-fabricating-hvac-ducts.webp',
    icon: 'lucide:flame',
    emergency: false,
    featured: false,
    process: [
      { title: 'Joint Preparation', description: 'Surfaces are cleaned, beveled, and prepared for welding.' },
      { title: 'Tack Welding', description: 'Components are tacked together to hold alignment.' },
      { title: 'Full Welding', description: 'Welding is completed according to WPS (Welding Procedure Specification).' },
      { title: 'Post-Weld Treatment', description: 'Slag removal, grinding, and surface finishing as required.' },
      { title: 'Inspection', description: 'Visual and dimensional inspection of completed welds.' },
    ],
    priceRanges: [
      { label: 'Small Assembly', min: 150, max: 1500, unit: 'per assembly' },
      { label: 'Structural Welding', min: 1000, max: 10000, unit: 'per project' },
      { label: 'Production Welding', min: 5000, max: 50000, unit: 'per order' },
    ],
    keywords: ['welding services Musaffah', 'metal welding Abu Dhabi', 'industrial welding UAE'],
    relatedServices: ['sheet-metal-fabrication', 'custom-industrial-fabrication', 'duct-fabrication', 'stainless-steel-duct-fabrication'],
  },
  {
    slug: 'metal-rolling-punching',
    name: 'Metal Rolling & Punching',
    shortName: 'Roll & Punch',
    description:
      'Metal rolling and punching services for fabrication projects requiring shaped, perforated, or prepared metal sections. Plate rolling, section rolling, and CNC punching for HVAC components, structural sections, and custom profiles.',
    image: '/images/gallery/worker-operating-metal-machine.webp',
    icon: 'lucide:move-diagonal',
    emergency: false,
    featured: false,
    process: [
      { title: 'Material Preparation', description: 'Sheets or sections are cut to size for rolling or punching.' },
      { title: 'Machine Setup', description: 'Rollers or punch tooling is configured for the required profile.' },
      { title: 'Rolling / Punching', description: 'CNC-controlled rolling to radius or punching of hole patterns.' },
      { title: 'Dimensional Check', description: 'Radius and dimension verification against specifications.' },
      { title: 'Finishing', description: 'Deburring, edge finishing, and preparation for next fabrication stage.' },
    ],
    priceRanges: [
      { label: 'Small Batch', min: 200, max: 2500, unit: 'per batch' },
      { label: 'Medium Production', min: 1500, max: 12000, unit: 'per order' },
      { label: 'Large Volume', min: 5000, max: 50000, unit: 'per order' },
    ],
    keywords: ['metal rolling Abu Dhabi', 'punching services UAE', 'plate rolling Musaffah'],
    relatedServices: ['sheet-metal-fabrication', 'cnc-forming', 'duct-fabrication'],
  },
  {
    slug: 'custom-industrial-fabrication',
    name: 'Custom Industrial Fabrication',
    shortName: 'Custom Fab',
    description:
      'Custom fabrication solutions for contractors, HVAC companies, construction firms, and industrial clients requiring project-specific metal parts, assemblies, or structures. Turnkey fabrication from concept to delivery.',
    image: '/images/gallery/workers-fabricating-metal-components.webp',
    icon: 'lucide:cog',
    emergency: false,
    featured: false,
    process: [
      { title: 'Consultation', description: 'Discussion of project requirements, specifications, and timelines.' },
      { title: 'Design & Engineering', description: 'Detailed design or review of client-provided drawings.' },
      { title: 'Prototyping', description: 'Sample fabrication for client approval where required.' },
      { title: 'Production', description: 'Full-scale fabrication using appropriate processes and materials.' },
      { title: 'Delivery & Support', description: 'Finished products delivered with QC reports and ongoing support.' },
    ],
    priceRanges: [
      { label: 'Small Custom Job', min: 500, max: 5000, unit: 'per job' },
      { label: 'Medium Project', min: 3000, max: 30000, unit: 'per project' },
      { label: 'Large Contract', min: 15000, max: 150000, unit: 'per contract' },
    ],
    keywords: ['custom fabrication Abu Dhabi', 'industrial metal works', 'custom metal fabrication UAE'],
    relatedServices: ['sheet-metal-fabrication', 'welding-services', 'design-engineering', 'powder-coating-finishing'],
  },
  {
    slug: 'powder-coating-finishing',
    name: 'Powder Coating & Finishing',
    shortName: 'Powder Coat',
    description:
      'Powder coating and finishing services for fabricated metal products. Improves durability, appearance, corrosion resistance, and project-ready quality. Suitable for duct accessories, metal enclosures, structural components, and custom fabrications.',
    image: '/images/gallery/preparing-components.webp',
    icon: 'lucide:spray-can',
    emergency: false,
    featured: false,
    process: [
      { title: 'Surface Preparation', description: 'Cleaning, degreasing, and pre-treatment of metal surfaces.' },
      { title: 'Masking', description: 'Areas not to be coated are masked off.' },
      { title: 'Powder Application', description: 'Electrostatic powder coating application in spray booth.' },
      { title: 'Curing', description: 'Parts are baked in curing oven at controlled temperature.' },
      { title: 'Final Inspection', description: 'Coating thickness, adhesion, and appearance checks.' },
    ],
    priceRanges: [
      { label: 'Small Batch Finishing', min: 200, max: 2000, unit: 'per batch' },
      { label: 'Medium Volume', min: 1000, max: 10000, unit: 'per order' },
      { label: 'Large Production', min: 5000, max: 50000, unit: 'per order' },
    ],
    keywords: ['powder coating Abu Dhabi', 'metal finishing UAE', 'industrial coating Musaffah'],
    relatedServices: ['sheet-metal-fabrication', 'custom-industrial-fabrication', 'duct-fabrication'],
  },
  {
    slug: 'design-engineering',
    name: 'Duct System Design & Engineering',
    shortName: 'Design',
    description:
      'Duct system design and engineering support for HVAC duct manufacturing and project requirements. Includes technical coordination, fabrication planning, shop drawing preparation, and project-specific duct solutions.',
    image: '/images/gallery/engineers-reviewing-drawings.webp',
    icon: 'lucide:pencil-ruler',
    emergency: false,
    featured: false,
    process: [
      { title: 'Requirement Analysis', description: 'Review of HVAC design intent, airflow requirements, and space constraints.' },
      { title: 'Duct Layout Design', description: 'Duct routing, sizing, and layout with consideration for coordination.' },
      { title: 'Shop Drawings', description: 'Detailed fabrication drawings with dimensions, gauges, and joint details.' },
      { title: 'Material Take-off', description: 'Bill of materials and quantity schedules for procurement and production.' },
      { title: 'Production Handover', description: 'Complete drawing package and BOM released for manufacturing.' },
    ],
    priceRanges: [
      { label: 'Small System Design', min: 500, max: 3000, unit: 'per system' },
      { label: 'Medium Project', min: 2000, max: 10000, unit: 'per project' },
      { label: 'Large / Complex System', min: 5000, max: 30000, unit: 'per project' },
    ],
    keywords: ['duct design Abu Dhabi', 'HVAC engineering UAE', 'duct system design Musaffah'],
    relatedServices: ['duct-fabrication', 'supply-delivery', 'custom-industrial-fabrication'],
  },
  {
    slug: 'supply-delivery',
    name: 'Duct Supply & Installation',
    shortName: 'Supply',
    description:
      'Supply and delivery of manufactured ducting products and fabricated components for projects across Abu Dhabi and the UAE. Reliable logistics support with on-time delivery to project sites, including installation coordination where required.',
    image: '/images/gallery/technicians-working-on-duct-sections.webp',
    icon: 'lucide:truck',
    emergency: false,
    featured: false,
    process: [
      { title: 'Order Processing', description: 'Purchase order review and production scheduling.' },
      { title: 'Manufacturing', description: 'Duct fabrication per approved shop drawings and quantities.' },
      { title: 'QC & Packing', description: 'Quality inspection, labeling, and protective packing for transport.' },
      { title: 'Logistics', description: 'Delivery scheduling and route planning for project site.' },
      { title: 'Site Delivery', description: 'On-time delivery with delivery notes and documentation.' },
    ],
    priceRanges: [
      { label: 'Small Order', min: 500, max: 5000, unit: 'per order' },
      { label: 'Medium Supply Contract', min: 3000, max: 30000, unit: 'per contract' },
      { label: 'Large Project Supply', min: 10000, max: 150000, unit: 'per project' },
    ],
    keywords: ['duct supply Musaffah', 'duct installation Abu Dhabi', 'duct delivery UAE'],
    relatedServices: ['duct-fabrication', 'sheet-metal-fabrication', 'design-engineering'],
  },
  {
    slug: 'stainless-steel-duct-fabrication',
    name: 'Stainless Steel Duct Fabrication',
    shortName: 'SS Duct Fab',
    description:
      'Stainless steel duct fabrication for commercial kitchens, industrial ventilation, laboratory exhaust, and corrosive environment applications. We manufacture stainless steel ductwork in grades 304 and 316L with TIG welding for superior corrosion resistance, hygiene compliance, and long-term durability.',
    image: '/images/gallery/workers-fabricating-hvac-ducts.webp',
    icon: 'lucide:layers',
    emergency: false,
    featured: false,
    process: [
      { title: 'Specification Review', description: 'Review of project specs, material grade requirements (304/316L), and design drawings.' },
      { title: 'Material Preparation', description: 'Stainless steel sheets are selected, inspected, and prepared to required gauges and dimensions.' },
      { title: 'Precision Fabrication', description: 'Cutting, forming, and assembly of SS duct sections using plasma cutting, CNC press brakes, and TIG welding.' },
      { title: 'Weld Finishing', description: 'Weld passivation, pickling where required, and surface finishing for corrosion resistance and hygiene standards.' },
      { title: 'Inspection & QC', description: 'Dimensional checks, weld inspection, surface finish verification, and final QC before dispatch.' },
    ],
    priceRanges: [
      { label: 'Kitchen Exhaust Duty', min: 1500, max: 12000, unit: 'per system' },
      { label: 'Industrial SS Ductwork', min: 5000, max: 50000, unit: 'per project' },
      { label: 'Large Commercial Systems', min: 10000, max: 150000, unit: 'per order' },
    ],
    keywords: ['stainless steel duct fabrication Abu Dhabi', 'SS duct manufacturing UAE', 'kitchen exhaust duct Musaffah', 'stainless steel ductwork fabrication'],
    relatedServices: ['duct-fabrication', 'sheet-metal-fabrication', 'welding-services', 'powder-coating-finishing'],
  },
];

export function getServiceBySlug(slug: string): ServiceType | undefined {
  return serviceTypes.find((service) => service.slug === slug);
}

export function getServiceName(slug: string): string {
  const service = getServiceBySlug(slug);
  if (service) return service.name;
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function getEmergencyServices(): ServiceType[] {
  return serviceTypes.filter((service) => service.emergency);
}

export function getFeaturedServices(): ServiceType[] {
  return serviceTypes.filter((service) => service.featured);
}

export function getRelatedServices(slug: string): ServiceType[] {
  const service = getServiceBySlug(slug);
  if (!service) return [];
  return service.relatedServices
    .map((relatedSlug) => getServiceBySlug(relatedSlug))
    .filter((s): s is ServiceType => s !== undefined);
}
