/**
 * Testimonials.
 * TODO: the brief says NOT to invent quotes — this file is intentionally empty
 * of fabricated praise. The section renders an honest "collecting" state until
 * real PromoLink testimonials (quote + name + title/company + photo) are
 * supplied. Add them here and the carousel switches on automatically.
 */

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  image: string | null;
};

export const testimonials: Testimonial[] = [];

/** Shown while no testimonials are supplied. */
export const testimonialsPlaceholder = {
  heading: "What our clients say",
  body: "We are collecting written testimonials from the organisations we print for. In the meantime, references are available on request — just ask us when you send a quote request.",
} as const;