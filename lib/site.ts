/**
 * Single source of truth for PromoLink's identity, contact details and
 * navigation. Everything here came from the company profile / task brief —
 * items marked TODO need sign-off or an asset from the client.
 */

export const site = {
  name: "PromoLink Print Concepts",
  legalName: "PromoLink Print Concepts Limited",
  /** Previously traded as: */
  formerName: "Promolink Media Concept",
  shortName: "PromoLink",
  tagline:
    "Touching the right spot in our clients' emotions is our push towards excellence in the delivery of our services.",
  description:
    "PromoLink Print Concepts Limited is a Lagos-based printing, corporate branding and promotional services company. Design, large-format and offset printing, signage, screen printing and branded merchandise — delivered end to end.",

  // TODO: point at the production domain once it is registered.
  url: "https://promolink.ng",

  phones: ["0803 430 2582", "0803 261 6222"],
  email: "promolinkmedia2010@gmail.com",
  whatsappNumber: "2348034302582",
  whatsappDisplay: "0803 430 2582",

  address: {
    street: "2nd Floor, Right Wing, Emmanuel Plaza, 23b Fatai Atere Way",
    area: "Matori, Mushin",
    city: "Lagos",
    country: "Nigeria",
    full: "2nd Floor, Right Wing, Emmanuel Plaza, 23b Fatai Atere Way, Matori, Mushin, Lagos, Nigeria",
  },

  /** Rough turnaround messaging from the company profile. TODO: confirm ranges. */
  turnaround: "Most jobs are printed and delivered within 24–72 hours of artwork approval.",

  // Real social handles can be added here once supplied by the company.
  socials: [] as Array<{
    label: string;
    href: string;
    icon: "facebook" | "instagram" | "linkedin" | "x";
  }>,

  /**
   * PRICING DISPLAY — flagged as an open decision in the brief.
   * "quote" : cards show "Request a Quote" (v1 default, nothing public)
   * "from"  : cards show "From ₦X" using each service's `priceFrom` value
   * Change this ONE value to switch the whole site.
   */
  pricingMode: "quote" as "quote" | "from",
} as const;

export const primaryNav = [
  { label: "All Products", href: "/all-products" },
  { label: "Hire a Designer", href: "/hire-a-designer" },
  { label: "Get a Quote", href: "/get-a-quote" },
  {
    label: "About Us",
    href: "/about",
    children: [
      { label: "Our Team", href: "/our-team" },
      { label: "FAQs", href: "/faqs" },
    ],
  },
  { label: "Blog", href: "/blog" },
];

export const footerNav = {
  getToKnow: [
    { label: "Our Team", href: "/our-team" },
    { label: "Contact Us", href: "/contact" },
    { label: "FAQs", href: "/faqs" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
  ],
  /** Mirrors Printhouse's "Frequently Ordered" column with PromoLink services. */
  frequentlyOrdered: [
    { label: "Business Card", href: "/services/business-card" },
    { label: "Letterhead", href: "/services/letterhead" },
    { label: "Large Format & Banner", href: "/services/banner" },
    { label: "Flyers & Pamphlets", href: "/services/pamphlets-flyers" },
    { label: "T-Shirt Printing", href: "/services/t-shirt-printing" },
    { label: "Stickers", href: "/services/sticker" },
  ],
};

export function whatsappLink(message?: string): string {
  const text =
    message ??
    `Hello ${site.shortName}, I'd like to get a quote for a print job.`;
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export function telLink(phone: string): string {
  return `tel:+234${phone.replace(/\D/g, "").replace(/^0/, "")}`;
}