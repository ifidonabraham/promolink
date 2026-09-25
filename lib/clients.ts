/** PromoLink clients and the supplied organization websites. */

export type Client = {
  name: string;
  /** Short form for the narrow logo strip on mobile. */
  short: string;
  logo: string | null;
  href: string;
};

export const clients: Client[] = [
  {
    name: "Chartered Institute of Taxation of Nigeria (CITN)",
    short: "CITN",
    logo: "/clients/citn.png",
    href: "https://portal.citn.org/",
  },
  {
    name: "Medbury Medical Services",
    short: "Medbury Medical",
    logo: "/clients/medbury-medical.png",
    href: "https://medburymedicals.com/",
  },
  {
    name: "Chartered Institute of Personnel Management of Nigeria",
    short: "CIPM Nigeria",
    logo: "/clients/cipm.png",
    href: "https://cipmnigeria.org/",
  },
  {
    name: "Guinea Insurance Plc",
    short: "Guinea Insurance",
    logo: "/clients/guinea-insurance.png",
    href: "https://www.guineainsurance.com/",
  },
  {
    name: "Tiger Shipping",
    short: "Tiger Shipping",
    logo: "/clients/tiger-shipping.png",
    href: "https://www.tigershipping.com/",
  },
  {
    name: "Pampers Private School",
    short: "Pampers Private School",
    logo: "/clients/pampers-private-school.png",
    href: "https://pampersprivateschool.org/",
  },
  {
    name: "SMADAC Securities",
    short: "SMADAC Securities",
    logo: "/clients/smadac-securities.png",
    href: "https://www.sm.smadacsecuritiesltd.com/about-background.php",
  },
  {
    name: "PEERS Consulting",
    short: "PEERS Consulting",
    logo: "/clients/peers-consulting.png",
    href: "https://peersconsulting.com.ng/about-us/",
  },
];

/** Count of clients that still need a logo file (see ClientStrip). */
export const clientsAwaitingLogo = clients.filter((client) => !client.logo).length;
