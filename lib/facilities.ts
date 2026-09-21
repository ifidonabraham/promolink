/**
 * Equipment listed in the "Our Facilities" page of the company profile.
 * Photos marked with a path were extracted from that PDF; the pairing with the
 * machinery names is a best-effort match and needs confirming — see the note at
 * the bottom of this file.
 */
export type Facility = {
  slug: string;
  name: string;
  image: string | null;
};

export const facilities: Facility[] = [
  {
    slug: "large-format-printer",
    name: "Large Format Machine",
    image: "/facilities/large-format-printer.png",
  },
  {
    slug: "digital-press",
    name: "Direct Image (DI) Printer",
    image: "/facilities/digital-press.png",
  },
  {
    slug: "laminating-machine",
    name: "Laminating Machine",
    image: "/facilities/laminating-machine.png",
  },
  {
    slug: "hd-camera",
    name: "HD Camera",
    image: "/facilities/hd-camera.png",
  },
  {
    slug: "id-card-printer",
    name: "ID Card Printing Machine",
    image: "/facilities/id-card-printer.png",
  },
  {
    slug: "passport-printer",
    name: "Passport Printing Machine",
    image: "/facilities/passport-printer.png",
  },
  {
    slug: "projector",
    name: "Projector",
    image: "/facilities/projector.png",
  },
  {
    slug: "projector-screen",
    name: "Projector Screen",
    image: "/facilities/projector-screen.png",
  },
];

/**
 * Machinery photos were extracted directly from page 3 of the company profile
 * with explicit equipment titles.
 */
export const facilitiesNeedVerification = false;