/**
 * Promotional slots.
 *
 * TODO(content): the copy below is placeholder wording for the rotating promo
 * banner in the hero. Replace with the current PromoLink promotions (and expiry
 * dates) — the component rotates through whatever is in this list.
 */
export type Promo = {
  id: string;
  label: string;
  title: string;
  href: string;
};

export const promos: Promo[] = [
  {
    id: "bulk-merch",
    label: "Seasonal promo",
    title: "Bulk T-shirt & flyer runs — ask for this month's promo rates",
    href: "/get-a-quote?promo=bulk",
  },
  {
    id: "corporate-gifting",
    label: "Year-end",
    title: "Corporate gifting: calendars, mugs, diaries and branded sets",
    href: "/get-a-quote?promo=gifting",
  },
  {
    id: "identity-package",
    label: "New business?",
    title: "Logo + full stationery package from our in-house studio",
    href: "/get-a-quote?promo=identity",
  },
];