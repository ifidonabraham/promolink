import type { Metadata } from "next";
import Link from "next/link";
import { FaqAccordion, type FaqEntry } from "@/components/FaqAccordion";
import { PageHeader } from "@/components/PageHeader";
import { TrustCtaBanner } from "@/components/TrustCtaBanner";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Answers to the questions we are asked most about ordering print, design support, turnaround times, delivery, payment and artwork files at PromoLink Print Concepts.",
};

const faqs: FaqEntry[] = [
  {
    question: "How do I place an order?",
    answer:
      "Send us the details through the quote form, call either of our lines, or message us on WhatsApp. We confirm material, size, quantity and timing, then send pricing for approval. Nothing goes to press until you say yes.",
  },
  {
    question: "Do you print if I don't have artwork?",
    answer:
      "Yes. Hire our designers and we will create the layout, adapt existing files or build something new. If you already have artwork, send it and our prepress team will check it resolves correctly at the size you need.",
  },
  {
    question: "How long do jobs take?",
    answer:
      `${site.turnaround} Complex work — light boxes, vehicle wraps, signage installation and corporate identity roll-outs — is scheduled with you at quote stage.`,
  },
  {
    question: "Can you deliver outside Lagos?",
    answer:
      "Yes. We print and deliver for clients locally and nationally. Delivery cost depends on size, weight and destination and is confirmed with the quote.",
  },
  {
    question: "Do you install signage, billboards and vehicle branding?",
    answer:
      "We do. Signage, light boxes, billboards and fleet branding are produced by us and installed by our field team, or delivered with installation guidance if you prefer to fit locally.",
  },
  {
    question: "What is the minimum quantity?",
    answer:
      "It depends on the item. Business cards, letterheads and flyers typically start around 100 units; T-shirts and promotional items from 10–25; signage, banners and displays have no minimum. Minimums are shown on each product page.",
  },
  {
    question: "How do I pay?",
    answer:
      "Bank transfer to our corporate account, or in person at our Mushin office. Note that this website does not take card payments — there is no online checkout. Payment terms for large projects are agreed at quote stage.",
  },
  {
    question: "Can I see a sample before the full run?",
    answer:
      "For merchandise and large-volume jobs, yes — a physical or digital proof is provided for approval before production. Colour on screen is indicative; printed colour can vary slightly with stock and finish.",
  },
];

export default function FaqsPage() {
  return (
    <>
      <PageHeader
        title="Frequently Asked Questions"
        intro="If the answer you need is not here, call us, WhatsApp us, or send the question through the quote form — a real person replies."
        crumbs={[{ label: "About us", href: "/about" }, { label: "FAQs" }]}
      />

      <section className="pm-section">
        <div className="pm-container grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-start">
          <FaqAccordion items={faqs} />

          <aside className="pm-card p-6 lg:sticky lg:top-28">
            <h2 className="text-lg">Still stuck?</h2>
            <p className="mt-2 text-sm text-brand-muted">
              Talk to a print consultant — we will tell you what will actually work
              for your budget and deadline.
            </p>
            <div className="mt-5 grid gap-2.5">
              <Link href="/get-a-quote" className="pm-btn pm-btn-primary">
                Get a Quote
              </Link>
              <Link href="/contact" className="pm-btn pm-btn-outline">
                Contact us
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <TrustCtaBanner />
    </>
  );
}