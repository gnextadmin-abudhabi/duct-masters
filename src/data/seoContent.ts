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
// ============================================================

export function generateFaqs(service?: string, area?: string): FaqItem[] {
  const universal: FaqItem[] = [
    {
      question: 'Is Duct Masters a licensed manufacturer?',
      answer:
        'Yes. Duct Masters is a legally registered company in the UAE (DUCT MASTERS AIR CONDITIONERS REQUISITES MANUFACTURING - L.L.C) and holds a UAE Trade License for air conditioner requisites manufacturing. We operate from our facility in M-40, Musaffah, Abu Dhabi.',
    },
    {
      question: 'What areas does Duct Masters serve?',
      answer:
        'We serve Abu Dhabi and across the UAE, with our main facility located in Musaffah. Our service areas include Musaffah, ICAD, Abu Dhabi City, Mohammed Bin Zayed City, Khalifa City, and industrial zones throughout the emirate. Visit our <a href="/areas/">service areas page</a> for a complete list.',
    },
    {
      question: 'Do you provide quotations for fabrication projects?',
      answer:
        'Yes, we provide detailed quotations based on your project drawings, specifications, quantities, and material requirements. Contact us at +971 02 564 9566 or email info@ductmasters.ae with your project details.',
    },
    {
      question: 'What materials do you work with?',
      answer:
        'We fabricate with galvanized iron (GI), stainless steel, aluminum, and mild steel in various gauges. Material selection depends on your project requirements — we can advise on the best option for HVAC ductwork, industrial applications, or structural components.',
    },
    {
      question: 'What is your production capacity?',
      answer:
        'Our Musaffah facility is equipped for medium to large-scale production. We handle individual custom jobs, batch production, and large project supply contracts. Contact us to discuss your specific volume requirements and delivery timeline.',
    },
  ];

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
  };

  const areaFaqs: FaqItem[] = area
    ? [
        {
          question: `Do you deliver ductwork to ${area}?`,
          answer: `Yes. ${area} is within our regular delivery area. We provide duct supply and delivery services to ${area} and surrounding locations. Contact us for delivery scheduling and logistics.`,
        },
        {
          question: `Do you charge extra for delivery to ${area}?`,
          answer: `Delivery charges depend on order size, distance, and logistics requirements. For large project orders, delivery is typically included. Contact us for a delivery quotation specific to ${area}.`,
        },
      ]
    : [];

  const specific = service && serviceFaqs[service] ? serviceFaqs[service] : [];
  return [...universal, ...specific, ...areaFaqs];
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
