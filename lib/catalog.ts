import { site } from "@/lib/site";

/** A single printable service / product. */
export type ServiceItem = {
  slug: string;
  name: string;
  /** Category slug this item belongs to. */
  category: string;
  /** One-line descriptor used on cards. */
  descriptor: string;
  /**
   * Public path to the artwork for this service.
   * `null` renders the branded placeholder — every null carries a
   * "TODO: swap placeholder image" note next to it in this file.
   */
  image: string | null;
  /** Minimum order quantity, if the service has one. */
  minimumUnits?: number;
  /** Typical turnaround in days, shown on the detail page. */
  leadTimeDays?: [number, number];
  /** Only surfaced when site.pricingMode === "from". */
  priceFrom?: number | null;
  /** Short bullet list for the detail page. */
  highlights: string[];
  /** Longer copy for the service detail page. */
  details: string;
};

export type ServiceCategory = {
  slug: string;
  name: string;
  tagline: string;
  image: string | null;
  items: ServiceItem[];
};

const serviceImages: Record<string, string> = {
  "logo-design": "/services/logo-design.jpg",
  "corporate-identity-package": "/services/corporate-identity-package.jpg",
  letterhead: "/services/letterhead.jpg",
  "business-card": "/services/business-card.jpg",
  billboard: "/services/billboard.jpg",
  "car-branding": "/services/car-wrapping.jpg",
  banner: "/services/large-format-banner.jpg",
  sticker: "/services/sticker-pinterest.jpg",
  "door-table-sign": "/services/door-table-sign.jpg",
  "metal-mica-work": "/services/metal-work.jpg",
  "light-box": "/services/light-box.jpg",
  awards: "/services/awards.jpg",
  "directional-signage": "/services/directional-office-signage.jpg",
  brochure: "https://i.pinimg.com/736x/d0/f1/8e/d0f18eb6392b1cd752c2dab46242033c.jpg",
  magazine: "/services/magazine.jpg",
  "annual-report": "https://i.pinimg.com/736x/48/89/47/488947e730101fd00ac98ab2247c7440.jpg",
  "year-book-booklet": "https://i.pinimg.com/736x/57/84/f3/5784f3f81b1994614cd6a15414e31b2c.jpg",
  "pamphlets-flyers": "https://i.pinimg.com/736x/ae/5f/1c/ae5f1c51ead0d44fd761ef137fa53673.jpg",
  "t-shirt-printing": "/services/tshirt.jpg",
  "cap-bag-branding": "https://i.pinimg.com/736x/74/00/0e/74000e8d688807ae3351b7fd73da02c5.jpg",
  "screen-printing": "https://i.pinimg.com/736x/8c/02/33/8c0233d4017ee69510a46b9fabf8d302.jpg",
  "promotional-items": "https://i.pinimg.com/736x/ef/b5/59/efb55900bd95b6aff37ad61f59ae888b.jpg",
  "acrylic-display": "https://i.pinimg.com/736x/2c/fc/6c/2cfc6c7243e554bbad1f548390ca557a.jpg",
  "projector-rental": "https://i.pinimg.com/736x/2c/fc/6c/2cfc6c7243e554bbad1f548390ca557a.jpg",
  calendar: "/services/calendar.jpg",
};

export function serviceImage(item: Pick<ServiceItem, "slug" | "image">): string | null {
  return item.image ?? serviceImages[item.slug] ?? null;
}

export const categories: ServiceCategory[] = [
  {
    slug: "designing-branding",
    name: "Designing & Branding",
    tagline:
      "Identity systems, stationery and corporate collateral designed in-house by our specialist consultants.",
    image: null, // TODO: swap placeholder image
    items: [
      {
        slug: "logo-design",
        name: "Logo Design",
        category: "designing-branding",
        descriptor:
          "Original mark and logotype with colour, type and clear-space rules.",
        image: null, // TODO: swap placeholder image
        minimumUnits: 1,
        leadTimeDays: [3, 7],
        priceFrom: null,
        highlights: [
          "Concepts, revisions and final artwork files",
          "Full colour and mono lockups",
          "Delivered as vector and web-ready PNG",
        ],
        details:
          "Our design team builds your logo from the ground up — research, concepts, refinement and final artwork. You receive an editable source file plus print- and screen-ready exports so every future job stays on brand.",
      },
      {
        slug: "letterhead",
        name: "Letterhead",
        category: "designing-branding",
        descriptor:
          "Offset-printed A4 letterheads on quality bond paper, branded to spec.",
        image: null, // TODO: swap placeholder image
        minimumUnits: 100,
        leadTimeDays: [2, 4],
        priceFrom: null,
        highlights: [
          "A4 (210 x 297mm)",
          "Offset or digital print",
          "Runs from 100 copies",
        ],
        details:
          "Branded letterheads that carry your identity through every correspondence. Printed on bond paper with crisp type reproduction, available in single- or double-sided runs.",
      },
      {
        slug: "business-card",
        name: "Business Card",
        category: "designing-branding",
        descriptor:
          "Premium cards in a range of stocks and finishes that make the first impression count.",
        image: null, // TODO: swap placeholder image
        minimumUnits: 100,
        leadTimeDays: [1, 3],
        priceFrom: null,
        highlights: [
          "Standard size 85 x 55mm",
          "Matte, gloss and laminated finishes",
          "Spot UV and rounded-corner options",
        ],
        details:
          "From everyday 300gsm cards to heavyweight laminated stocks, we produce cards that hold their shape and colour. Send finished artwork or let our designers lay it out for you.",
      },
      {
        slug: "corporate-identity-package",
        name: "Corporate Identity Package",
        category: "designing-branding",
        descriptor:
          "Complete brand roll-out: logo, stationery, signage specs and brand guidelines.",
        image: null, // TODO: swap placeholder image
        minimumUnits: 1,
        leadTimeDays: [7, 14],
        priceFrom: null,
        highlights: [
          "Logo suite and brand guidelines",
          "Full stationery set",
          "Signage and merchandise specifications",
        ],
        details:
          "A single engagement that covers the whole identity: mark, typography, colour, stationery, vehicle and signage specifications, and a guideline document your team can hand to any supplier.",
      },
    ],
  },

  {
    slug: "digital-printing",
    name: "Digital Printing — Large Format & Offset",
    tagline:
      "Wide-format and offset output for billboards, banners, vehicle wraps and signage components.",
    image: null, // TODO: swap placeholder image
    items: [
      {
        slug: "billboard",
        name: "Billboard",
        category: "digital-printing",
        descriptor:
          "Large-format outdoor billboard printing sized and finished for the site it runs on.",
        image: null, // TODO: swap placeholder image
        minimumUnits: 1,
        leadTimeDays: [3, 7],
        priceFrom: null,
        highlights: [
          "Weather-resistant outdoor media",
          "Site survey and installation support",
          "Flex, mesh and vinyl options",
        ],
        details:
          "Outdoor advertising printed for the site it will live on — we advise on material, resolution and bleed before printing, and can arrange installation through our field team.",
      },
      {
        slug: "banner",
        name: "Large Format & Banner",
        category: "digital-printing",
        descriptor:
          "Roll-up stands, backdrop banners and large-format prints for events and offices.",
        image: null, // TODO: swap placeholder image
        minimumUnits: 1,
        leadTimeDays: [1, 3],
        priceFrom: null,
        highlights: [
          "Roll-up stand and retractable frames",
          "Indoor vinyl, canvas and fabric",
          "Eyelets and hemming available",
        ],
        details:
          "Event backdrops, roll-up stands, step-and-repeat and building banners. We print, finish and, where needed, supply the frame so the piece is ready to stand up on site.",
      },
      {
        slug: "sticker",
        name: "Sticker",
        category: "digital-printing",
        descriptor:
          "Die-cut, sheet and roll stickers in any shape, gloss or matte finish.",
        image: null, // TODO: swap placeholder image
        minimumUnits: 50,
        leadTimeDays: [1, 3],
        priceFrom: null,
        highlights: [
          "Die-cut to your outline",
          "Indoor and outdoor adhesives",
          "Gloss or matte lamination",
        ],
        details:
          "Product labels, window decals and promotional stickers. Cut to any contour, laminated for durability, and supplied on sheets or rolls.",
      },
      {
        slug: "car-branding",
        name: "Car Branding",
        category: "digital-printing",
        descriptor:
          "Full and partial vehicle wraps, fleet decals and removable signage.",
        image: null, // TODO: swap placeholder image
        minimumUnits: 1,
        leadTimeDays: [2, 5],
        priceFrom: null,
        highlights: [
          "Full wrap and partial branding",
          "Fleet numbering and decals",
          "Removable and permanent vinyl",
        ],
        details:
          "Turn your vehicles into moving media. We template each model, print on cast vinyl and fit either in our facility or on your site for fleet work.",
      },
      {
        slug: "door-table-sign",
        name: "Door Number, Door Sign & Table Sign",
        category: "digital-printing",
        descriptor:
          "Room numbers, door plaques and table signage for offices and venues.",
        image: null, // TODO: swap placeholder image
        minimumUnits: 1,
        leadTimeDays: [2, 5],
        priceFrom: null,
        highlights: [
          "Acrylic, metal and PVC substrates",
          "Etched or printed lettering",
          "Desk and wall-mount fixings",
        ],
        details:
          "Directional clarity for offices, hotels and event venues — door numbers, name plaques, table numbers and desk plates produced on acrylic, PVC or brushed metal.",
      },
      {
        slug: "metal-mica-work",
        name: "Metal & Mica Work",
        category: "digital-printing",
        descriptor:
          "Fabrication and finishing in metal and mica for signage and fittings.",
        image: null, // TODO: swap placeholder image
        minimumUnits: 1,
        leadTimeDays: [3, 7],
        priceFrom: null,
        highlights: [
          "Metal lettering and panels",
          "Mica and acrylic fabrication",
          "Cut, formed and finished in-house",
        ],
        details:
          "Where a printed sign is not enough, our workshop cuts, forms and finishes metal and mica components — raised letters, panels and custom fittings.",
      },
    ],
  },

  {
    slug: "signage",
    name: "Signage — Internal & External",
    tagline:
      "Illuminated, recognition and directional signage produced and installed by our team.",
    image: null, // TODO: swap placeholder image
    items: [
      {
        slug: "light-box",
        name: "Light Box",
        category: "signage",
        descriptor:
          "Illuminated light boxes, channel letters and backlit fascias.",
        image: null, // TODO: swap placeholder image
        minimumUnits: 1,
        leadTimeDays: [5, 10],
        priceFrom: null,
        highlights: [
          "LED illumination",
          "Single and double sided",
          "Wall, hanging and projecting mounts",
        ],
        details:
          "Day-and-night visibility with LED light boxes built for local power conditions — low-draw, serviceable and sealed against the weather.",
      },
      {
        slug: "awards",
        name: "Awards",
        category: "signage",
        descriptor:
          "Trophies, plaques and crystal or acrylic awards, engraved and finished to order.",
        image: null, // TODO: swap placeholder image
        minimumUnits: 1,
        leadTimeDays: [3, 7],
        priceFrom: null,
        highlights: [
          "Crystal, acrylic, wood and metal",
          "Laser engraving",
          "Presentation boxes available",
        ],
        details:
          "Recognition pieces for award nights, long-service and commemorative events — designed to your event theme and engraved with names, dates and logos.",
      },
      {
        slug: "directional-signage",
        name: "Directional & Office Signage",
        category: "signage",
        descriptor:
          "Wayfinding, floor directories, reception and statutory safety signage.",
        image: null, // TODO: swap placeholder image
        minimumUnits: 1,
        leadTimeDays: [3, 10],
        priceFrom: null,
        highlights: [
          "Wayfinding and directory panels",
          "Reception and fascia signage",
          "Safety and statutory signs",
        ],
        details:
          "A consistent wayfinding system across your building — directories, overhead directionals, reception branding and statutory safety signage.",
      },
    ],
  },

  {
    slug: "print-publishing",
    name: "Print & Publishing",
    tagline:
      "Books, reports and periodicals printed and bound to publishing standards.",
    image: null, // TODO: swap placeholder image
    items: [
      {
        slug: "magazine",
        name: "Magazine",
        category: "print-publishing",
        descriptor:
          "Perfect-bound and saddle-stitched magazines on quality coated stock.",
        image: null, // TODO: swap placeholder image
        minimumUnits: 100,
        leadTimeDays: [5, 10],
        priceFrom: null,
        highlights: [
          "Saddle stitch or perfect bound",
          "Coated and uncoated stocks",
          "Colour-managed proofing",
        ],
        details:
          "Editorial work printed to publishing standards — colour-matched covers, stitched or glued spines, and proofing before the press run.",
      },
      {
        slug: "brochure",
        name: "Brochure",
        category: "print-publishing",
        descriptor:
          "Bi-fold, tri-fold and multi-page brochures that present your offer clearly.",
        image: null, // TODO: swap placeholder image
        minimumUnits: 100,
        leadTimeDays: [2, 5],
        priceFrom: null,
        highlights: [
          "Folded, stitched or bound formats",
          "Gloss, matte and soft-touch",
          "Design support available",
        ],
        details:
          "Company profiles, product brochures and service catalogues — folded, stitched or bound, with an in-house design option if you need the layout built too.",
      },
      {
        slug: "annual-report",
        name: "Annual Report",
        category: "print-publishing",
        descriptor:
          "Board-ready annual reports with tight colour control and finishing.",
        image: null, // TODO: swap placeholder image
        minimumUnits: 50,
        leadTimeDays: [5, 12],
        priceFrom: null,
        highlights: [
          "Perfect bound and case bound",
          "Spot UV, foil and emboss",
          "Confidential handling",
        ],
        details:
          "Financial publications demand accuracy and consistency. We print and finish annual reports with proofed colour, secure handling and delivery to deadline.",
      },
      {
        slug: "year-book-booklet",
        name: "Year Book & Booklet",
        category: "print-publishing",
        descriptor:
          "School yearbooks, commemorative booklets and programme brochures.",
        image: null, // TODO: swap placeholder image
        minimumUnits: 50,
        leadTimeDays: [5, 12],
        priceFrom: null,
        highlights: [
          "Saddle stitched, perfect bound or spiral",
          "Photo-heavy layouts",
          "Low and high volume runs",
        ],
        details:
          "Commemorative and institutional books — from alumni yearbooks to event programmes — produced with the binding and cover finish the occasion deserves.",
      },
      {
        slug: "pamphlets-flyers",
        name: "Pamphlets & Flyers",
        category: "print-publishing",
        descriptor:
          "High-volume flyers, handbills and handouts at campaign speed.",
        image: null, // TODO: swap placeholder image
        minimumUnits: 100,
        leadTimeDays: [1, 3],
        priceFrom: null,
        highlights: [
          "A5, A4 and custom sizes",
          "Offset runs for bulk volume",
          "Same-week turnaround",
        ],
        details:
          "Campaign flyers, handbills, church and event handouts. Designed for fast, economical bulk printing without losing colour quality.",
      },
      {
        slug: "calendar",
        name: "Calendar (Table, Wall & Agenda)",
        category: "print-publishing",
        descriptor:
          "Customised table, wall and agenda calendars for corporate gifting.",
        image: null, // TODO: swap placeholder image
        minimumUnits: 25,
        leadTimeDays: [5, 10],
        priceFrom: null,
        highlights: [
          "Table, wall and diary formats",
          "Wire-bound options",
          "Bulk corporate runs",
        ],
        details:
          "A promotional staple — branded wall calendars, desk calendars and agenda planners produced annually for organisations across Lagos and beyond.",
      },
    ],
  },

  {
    slug: "promotional-items-printing",
    name: "T-Shirt & Screen Printing / Promotional Items",
    tagline:
      "Corporate, school, NGO and government merchandise printed in-house.",
    image: null, // TODO: swap placeholder image
    items: [
      {
        slug: "t-shirt-printing",
        name: "T-Shirt Printing",
        category: "promotional-items-printing",
        descriptor:
          "Screen-printed and heat-pressed tees for corporate, school, NGO and government use.",
        image: null, // TODO: swap placeholder image
        minimumUnits: 10,
        leadTimeDays: [3, 7],
        priceFrom: null,
        highlights: [
          "Screen print, DTF and heat transfer",
          "Cotton and dry-fit fabrics",
          "Sizes S to 4XL",
        ],
        details:
          "Campaign tees, staff uniforms and event merchandise — printed or pressed with your artwork, with fabric and size grading chosen for Nigerian conditions.",
      },
      {
        slug: "cap-bag-branding",
        name: "Cap & Bag Branding",
        category: "promotional-items-printing",
        descriptor:
          "Branded caps, tote bags and conference bags with embroidery or print.",
        image: null, // TODO: swap placeholder image
        minimumUnits: 25,
        leadTimeDays: [3, 7],
        priceFrom: null,
        highlights: [
          "Embroidery and screen print",
          "Tote, conference and laptop bags",
          "Sample-first approval",
        ],
        details:
          "Headwear and carry goods branded with embroidery or print — popular for conferences, schools and staff gifting.",
      },
      {
        slug: "screen-printing",
        name: "Screen Printing — Mouse Pad, Flash Drive, Key Holder, ID Card, Pen",
        category: "promotional-items-printing",
        descriptor:
          "Pad printing and screen printing across small-format promotional items.",
        image: null, // TODO: swap placeholder image
        minimumUnits: 25,
        leadTimeDays: [3, 7],
        priceFrom: null,
        highlights: [
          "Mouse pads, flash drives, key holders",
          "Branded pens and ID cards",
          "Crisp multi-colour registration",
        ],
        details:
          "Small items carry brands a long way. We pad- and screen-print pens, flash drives, key holders, mouse pads and ID cards with durable, sharp registration.",
      },
      {
        slug: "promotional-items",
        name: "Promotional Items — Badge, Mug, Lash, Umbrella, Keyholder, Pen, Flag",
        category: "promotional-items-printing",
        descriptor:
          "Everyday branded giveaway items for launches, campaigns and year-end gifting.",
        image: null, // TODO: swap placeholder image
        minimumUnits: 25,
        leadTimeDays: [3, 10],
        priceFrom: null,
        highlights: [
          "Badges, mugs, lanyards, umbrellas",
          "Flags and desk items",
          "Sourcing and branding end to end",
        ],
        details:
          "Sourced, branded and delivered as one order — badges, mugs, lanyards, umbrellas, pens and flags, chosen to fit your budget per item.",
      },
    ],
  },

  {
    slug: "stands-displays",
    name: "Stand & Displays",
    tagline:
      "Exhibition stands, acrylic displays and audiovisual hire for events and offices.",
    image: null, // TODO: swap placeholder image
    items: [
      {
        slug: "acrylic-display",
        name: "Acrylic Display",
        category: "stands-displays",
        descriptor:
          "Acrylic display units, holders and plinths cut and polished to size.",
        image: null, // TODO: swap placeholder image
        minimumUnits: 1,
        leadTimeDays: [3, 7],
        priceFrom: null,
        highlights: [
          "Brochure holders and plinths",
          "Cut, polished and assembled in-house",
          "Freestanding and wall-mounted",
        ],
        details:
          "Clear and coloured acrylic displays built to your dimensions — counter holders, plinths, showcase boxes and reception display units.",
      },
      {
        slug: "projector-rental",
        name: "Projector & Projector Screen Rental",
        category: "stands-displays",
        descriptor:
          "Projectors, screens and on-site support for conferences, training and events.",
        image: null, // TODO: swap placeholder image
        minimumUnits: 1,
        leadTimeDays: [1, 3],
        priceFrom: null,
        highlights: [
          "Projector and screen hire",
          "On-site setup and support",
          "Conference and training packages",
        ],
        details:
          "Audiovisual support for your event — projector, screen and mounting supplied, installed and supported by our team for the duration of the programme.",
      },
    ],
  },

  // TODO(scope decision): the company profile also lists "Videography &
  // Photography" and "Promotional Gifts Items" as service groups. They are not
  // in the agreed v1 catalogue, so they are not rendered yet. Add a category
  // object here (same shape) to bring either of them into the site.
];

export const allItems: ServiceItem[] = categories.flatMap((c) => c.items);

export function getCategory(slug: string): ServiceCategory | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getItem(slug: string): ServiceItem | undefined {
  return allItems.find((i) => i.slug === slug);
}

/** Homepage carousels show a trimmed version of each category, like Printhouse. */
export function homepageCarouselItems(
  category: ServiceCategory
): ServiceItem[] {
  return category.items.slice(0, 6);
}

export function priceLabel(item: ServiceItem): string {
  if (site.pricingMode === "from" && item.priceFrom != null) {
    // \u20A6 is the Naira sign (₦) — escaped so the file stays encoding-safe.
    return `From \u20A6${item.priceFrom.toLocaleString("en-NG")}`;
  }
  return "Request a Quote";
}

export function leadTimeLabel(item: ServiceItem): string | null {
  if (!item.leadTimeDays) return null;
  const [min, max] = item.leadTimeDays;
  return min === max
    ? `${min} day${min === 1 ? "" : "s"}`
    : `${min}–${max} days`;
}
