// ============================================================
// Duct Masters — SEO Content: FAQs & Reviews
// ============================================================

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Review {
  author: string;
  rating: number;
  text: string;
  date: string;
  service?: string;
  area?: string;
  source: string;
}

// ============================================================
// FAQ Generation
// ------------------------------------------------------------
// Max 5 FAQs per page, specific to the page: service questions
// first, then location questions, then one general question.
// Answers are plain text (rendered escaped and used in FAQPage
// schema), so do not put HTML in them.
// ============================================================

const MAX_FAQS = 5;

const quotationFaq: FaqItem = {
  question: 'How do I get a quotation?',
  answer:
    'Send your drawings, specifications, quantities, and material requirements. Call +971 2 564 9566 or email info@ductmasters.ae and we will reply with a detailed quotation.',
};

const licenceFaq: FaqItem = {
  question: 'Is Duct Masters a licensed manufacturer?',
  answer:
    'Yes. Duct Masters is registered in the UAE as DUCT MASTERS AIR CONDITIONERS REQUISITES MANUFACTURING - L.L.C and holds a UAE Trade License for air conditioner requisites manufacturing. We operate from our facility in M-40, Musaffah, Abu Dhabi.',
};

const materialsFaq: FaqItem = {
  question: 'What materials do you work with?',
  answer:
    'We fabricate with galvanized iron (GI), stainless steel, aluminum, and mild steel in various gauges. We can advise on the best material for HVAC ductwork, industrial applications, or structural components.',
};

const serviceFaqs: Record<string, FaqItem[]> = {
  'sheet-metal-fabrication': [
    {
      question: 'What sheet metal fabrication services do you offer in Abu Dhabi?',
      answer:
        'We offer complete sheet metal fabrication including cutting, bending, forming, welding, assembly, and finishing. Our services cover HVAC duct components, industrial parts, construction materials, and custom metal works for projects across Abu Dhabi.',
    },
    {
      question: 'What thickness of sheet metal can you fabricate?',
      answer:
        'We handle sheet metal from 0.5mm to 6mm thickness in galvanized iron, stainless steel, and aluminum. For thicker materials or special requirements, contact us to discuss your project specifications.',
    },
    {
      question: 'Do you work from customer drawings?',
      answer:
        'Yes. We accept drawings in PDF, DWG, DXF, and other standard CAD formats. Our engineering team can also assist with developing fabrication drawings from your concept or requirements.',
    },
  ],
  'duct-fabrication': [
    {
      question: 'What is HVAC duct manufacturing?',
      answer:
        'HVAC duct manufacturing is the fabrication of air distribution ductwork for heating, ventilation, and air conditioning systems. At Duct Masters, we manufacture rectangular, round, and oval ducts in galvanized iron, stainless steel, and aluminum, including all required fittings and accessories.',
    },
    {
      question: 'What standards do your ducts meet?',
      answer:
        'Our duct fabrication follows SMACNA (Sheet Metal and Air Conditioning Contractors\' National Association) standards and project-specific specifications. We ensure proper gauge selection, reinforcement, sealing, and dimensional accuracy.',
    },
    {
      question: 'What types of ductwork do you manufacture?',
      answer:
        'We manufacture all common types: rectangular ductwork, spiral/round ducts, oval ducts, and custom-shaped ducts. We also produce elbows, reducers, take-offs, volume control dampers, fire dampers, access doors, and other duct accessories.',
    },
    {
      question: 'Can you handle large commercial ductwork orders?',
      answer:
        'Yes. We regularly supply ductwork for commercial buildings, industrial facilities, hospitals, hotels, and infrastructure projects. We can scale production to meet project schedules and quantities.',
    },
  ],
  'laser-cutting': [
    {
      question: 'What materials can your laser cutter handle?',
      answer:
        'Our fiber laser cutting machine handles mild steel, stainless steel, galvanized iron, and aluminum sheets. Maximum cutting thickness varies by material — contact us with your specific requirements.',
    },
    {
      question: 'What file formats do you accept for laser cutting?',
      answer:
        'We accept DXF, DWG, AI, and PDF files for laser cutting jobs. Files should include the cutting profile with dimensions. Our team can also assist with file preparation and nesting optimization to reduce material waste.',
    },
  ],
  'stainless-steel-duct-fabrication': [
    {
      question: 'What grades of stainless steel do you use for duct fabrication?',
      answer:
        'We fabricate stainless steel ductwork primarily in grades 304 and 316L. Grade 304 is suitable for most commercial kitchen exhaust and general industrial applications. Grade 316L offers enhanced corrosion resistance for chemical environments, coastal installations, and laboratory exhaust systems.',
    },
    {
      question: 'What applications require stainless steel ductwork?',
      answer:
        'Stainless steel ductwork is essential for commercial kitchen exhaust hoods, laboratory fume extraction, industrial process ventilation, corrosive chemical environments, and any application where hygiene, corrosion resistance, or high-temperature performance is required. It is also commonly specified for luxury developments and hospitals in the UAE.',
    },
    {
      question: 'Do you use TIG welding for stainless steel ducts?',
      answer:
        'Yes. We use TIG (Tungsten Inert Gas) welding for all stainless steel duct fabrication. TIG welding produces clean, precise welds with minimal spatter, ensuring corrosion resistance is maintained at all joints. Weld passivation and pickling are performed where project specifications require it.',
    },
    {
      question: 'What is the difference between GI and stainless steel ductwork?',
      answer:
        'Galvanized iron (GI) ductwork is the standard for general HVAC air distribution and is cost-effective for most commercial applications. Stainless steel ductwork provides superior corrosion resistance, hygiene, and high-temperature tolerance — making it the required choice for kitchen exhaust, laboratory, and industrial process applications. We manufacture both and can advise on the right material for your project.',
    },
  ],
  'cnc-forming': [
    {
      question: 'What does CNC metal forming involve?',
      answer:
        'CNC metal forming bends and shapes sheet metal on CNC press brakes. Each part is programmed from your drawing and bend sequence, the right punch and die tooling is set up, and angles are checked during production for repeatable accuracy.',
    },
    {
      question: 'Can you form parts for HVAC ductwork and industrial components?',
      answer:
        'Yes. Our CNC press brakes support duct fabrication, sheet metal fabrication, and customized industrial components, from single parts to batch production runs.',
    },
    {
      question: 'What information do you need to quote CNC forming?',
      answer:
        'Send the part drawing with dimensions, material type and thickness, bend angles, and quantity. DXF, DWG, and PDF drawings are accepted.',
    },
  ],
  'welding-services': [
    {
      question: 'Which welding processes do you offer?',
      answer:
        'We provide MIG, TIG, and arc welding for mild steel, stainless steel, and aluminum. Work is completed according to the welding procedure specification (WPS), followed by grinding, finishing, and visual and dimensional inspection.',
    },
    {
      question: 'What do you weld for HVAC and industrial projects?',
      answer:
        'We weld fabricated metal components, duct-related supports, frames, structures, and custom metal works for contractors and industrial clients.',
    },
    {
      question: 'Can welded parts be powder coated after fabrication?',
      answer:
        'Yes. Welded components can be finished and powder coated at the same Musaffah facility, so parts leave ready for installation.',
    },
  ],
  'metal-rolling-punching': [
    {
      question: 'What metal rolling and punching work do you do?',
      answer:
        'We offer plate rolling, section rolling, and CNC punching for HVAC components, structural sections, and custom profiles, including rolled radii and punched hole patterns.',
    },
    {
      question: 'How do you check rolled and punched parts?',
      answer:
        'Every batch is checked for radius and dimensions against your specification, then deburred and edge-finished before it moves to the next fabrication stage.',
    },
    {
      question: 'Can rolled or punched sections be welded and finished in-house?',
      answer:
        'Yes. Rolled and punched parts can continue straight to welding, assembly, and powder coating in the same facility.',
    },
  ],
  'custom-industrial-fabrication': [
    {
      question: 'What is custom industrial fabrication?',
      answer:
        'It is the fabrication of project-specific metal parts, assemblies, or structures to your drawings or requirements, from consultation and design through production and delivery.',
    },
    {
      question: 'Can you make a prototype before full production?',
      answer:
        'Yes. Where required we fabricate a sample for your approval before starting full-scale production.',
    },
    {
      question: 'Who uses your custom fabrication service?',
      answer:
        'Contractors, HVAC companies, construction firms, and industrial clients who need metal parts or assemblies that are not available off the shelf.',
    },
  ],
  'powder-coating-finishing': [
    {
      question: 'Why powder coat fabricated metal parts?',
      answer:
        'Powder coating improves durability, corrosion resistance, and appearance, giving fabricated parts a project-ready finish.',
    },
    {
      question: 'What is your powder coating process?',
      answer:
        'Surfaces are cleaned, degreased, and pre-treated, areas that stay uncoated are masked, powder is applied electrostatically in a spray booth, and parts are cured in an oven. Coating thickness, adhesion, and appearance are then inspected.',
    },
    {
      question: 'Which products can you powder coat?',
      answer:
        'Duct accessories, metal enclosures, structural components, and custom fabrications made in our facility or supplied by you.',
    },
  ],
  'design-engineering': [
    {
      question: 'What does your duct design and engineering service include?',
      answer:
        'We review HVAC design intent, plan duct routing and sizing, prepare shop drawings with dimensions, gauges, and joint details, and produce material take-offs for procurement and production.',
    },
    {
      question: 'Can you prepare shop drawings from our design drawings?',
      answer:
        'Yes. We prepare fabrication shop drawings from your design intent, or work directly from your approved drawings, whichever the project requires.',
    },
    {
      question: 'Do you coordinate design with manufacturing?',
      answer:
        'Yes. The completed drawing package and bill of materials are released straight to our own production team, which avoids hand-over gaps between design and fabrication.',
    },
  ],
  'supply-delivery': [
    {
      question: 'Do you deliver ductwork to project sites?',
      answer:
        'Yes. We manufacture ductwork to approved shop drawings, then inspect, label, and pack it for transport and deliver it to site with delivery notes and documentation.',
    },
    {
      question: 'Can deliveries be phased to match the project programme?',
      answer:
        'Yes. Delivery scheduling and route planning are arranged around your site programme, so ductwork arrives when each area is ready.',
    },
    {
      question: 'Do you install ductwork?',
      answer:
        'Our focus is manufacturing and supply. Installation coordination with your MEP or HVAC contractor is available where required.',
    },
  ],
};

const placeFaqs = (place: string): FaqItem[] => [
  {
    question: `Do you deliver to ${place}?`,
    answer: `Yes. ${place} is within our regular delivery area from our M-40, Musaffah facility. Contact us to schedule deliveries around your project programme.`,
  },
  {
    question: `Do you charge extra for delivery to ${place}?`,
    answer: `Delivery charges depend on order size, distance, and logistics requirements. For large project orders, delivery is typically included. Ask us for a delivery quotation for ${place}.`,
  },
];

/**
 * @param service  service slug (service hub, Abu Dhabi and combo pages)
 * @param place    location name (Abu Dhabi, combo and area pages)
 */
export function generateFaqs(service?: string, place?: string): FaqItem[] {
  const specific = service ? serviceFaqs[service] ?? [] : [];
  const local = place ? placeFaqs(place) : [];

  let faqs: FaqItem[];
  if (service && place) {
    // Local landing page: 2 service questions + 2 location questions + quotation
    faqs = [...specific.slice(0, 2), ...local, quotationFaq];
  } else if (service) {
    // Service hub: service questions, then quotation
    faqs = [...specific.slice(0, 4), quotationFaq];
  } else if (place) {
    // Area page: location questions + general company questions
    faqs = [...local, licenceFaq, materialsFaq, quotationFaq];
  } else {
    faqs = [licenceFaq, materialsFaq, quotationFaq];
  }
  return faqs.slice(0, MAX_FAQS);
}

// ============================================================
// Reviews
// ============================================================
// NOTE: Per client instructions, reviews should only be populated
// with verified client-provided content. Current reviews are empty
// pending client submission. The review section will not render
// until reviews are added.
// ============================================================

export const reviews: Review[] = [];

export function getReviewsForPage(
  service?: string,
  area?: string,
  limit: number = 6,
): Review[] {
  let filtered = [...reviews];

  if (service && area) {
    const both = filtered.filter((r) => r.service === service && r.area === area);
    if (both.length >= 2) return both.slice(0, limit);
  }

  if (service) {
    const byService = filtered.filter((r) => r.service === service);
    if (byService.length >= 2) return byService.slice(0, limit);
  }

  if (area) {
    const byArea = filtered.filter((r) => r.area === area);
    if (byArea.length >= 2) return byArea.slice(0, limit);
  }

  return filtered
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}

export function getAggregateRating(): {
  ratingValue: string;
  reviewCount: number;
  bestRating: number;
  worstRating: number;
} {
  if (reviews.length === 0) {
    return { ratingValue: '0', reviewCount: 0, bestRating: 5, worstRating: 1 };
  }

  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  const avg = sum / reviews.length;

  return {
    ratingValue: avg.toFixed(1),
    reviewCount: reviews.length,
    bestRating: 5,
    worstRating: 1,
  };
}
