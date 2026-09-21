/**
 * PromoLink clients, listed in the company profile.
 * TODO: replace the name-only placeholders with the supplied client logo files
 * (drop them in /public/clients/ and set `logo`).
 */

export type Client = {
  name: string;
  /** Short form for the narrow logo strip on mobile. */
  short: string;
  logo: string | null;
};

export const clients: Client[] = [
  {
    name: "Chartered Institute of Taxation of Nigeria (CITN)",
    short: "CITN",
    logo: "/clients/citn.png",
  },
  {
    name: "Medbury Medical Services",
    short: "Medbury Medical",
    logo: "/clients/medbury-medical.png",
  },
  {
    name: "Chartered Institute of Personnel Management of Nigeria",
    short: "CIPM Nigeria",
    logo: "/clients/cipm.png",
  },
  {
    name: "Guinea Insurance Plc",
    short: "Guinea Insurance",
    logo: "/clients/guinea-insurance.png",
  },
  {
    name: "Tiger Shipping",
    short: "Tiger Shipping",
    logo: "/clients/tiger-shipping.png",
  },
  {
    name: "Pampers Private School",
    short: "Pampers Private School",
    logo: "/clients/pampers-private-school.png",
  },
  {
    name: "SMADAC Securities",
    short: "SMADAC Securities",
    logo: "/clients/smadac-securities.png",
  },
  {
    name: "PEERS Consulting",
    short: "PEERS Consulting",
    logo: "/clients/peers-consulting.png",
  },
];

/** Count of clients that still need a logo file (see ClientStrip). */
export const clientsAwaitingLogo = clients.filter((client) => !client.logo).length;
