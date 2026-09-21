import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { ProductCard } from "@/components/ProductCard";
import { ProcessSteps } from "@/components/ProcessSteps";
import { CheckIcon, PaletteIcon } from "@/components/icons";
import { allItems, getItem } from "@/lib/catalog";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hire a Designer",
  description:
    "No artwork? Hire PromoLink's in-house designers and we will create the layout, adapt your files and prepare everything for print.",
};

const designServices = [
  {
    title: "Logo & identity",
    body: "A new mark, or a tidy-up of the one you have — with colour, type and file formats for print and screen.",
  },
  {
    title: "Artwork for print",
    body: "Flyers, brochures, banners, roll-up stands, packaging, annual reports — laid out to press specification with bleed and colour profiles handled.",
  },
  {
    title: "Adaptation & resizing",
    body: "Already have artwork? We resize, reposition and re-export it for every format you order so nothing looks stretched.",
  },
  {
    title: "Brand collateral",
    body: "Stationery sets, PowerPoint templates, social banners and signage artwork that all speak the same visual language.",
  },
];

export default function HireADesignerPage() {
  const designExamples = ["logo-design", "business-card", "banner", "brochure"]
    .map((slug) => getItem(slug))
    .filter((item): item is NonNullable<ReturnType<typeof getItem>> => Boolean(item));

  return (
    <>
      <PageHeader
        title="Hire a Designer"
        intro="No finished artwork? Our studio can design it for you — or clean up what you already have so it prints properly the first time."
        crumbs={[{ label: "Hire a designer" }]}
      />

      <section className="pm-section">
        <div className="pm-container grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <div>
            <p className="pm-eyebrow mb-3">
              <PaletteIcon className="h-4 w-4" />
              In-house studio
            </p>
            <h2 className="text-2xl sm:text-3xl">
              Design support, from concept to press-ready
            </h2>
            <p className="mt-4 text-brand-muted">
              Specialist consultants from various design and print backgrounds are
              on hand to guide you through complex projects. Design and production
              sit under one roof at PromoLink, so what the studio creates is
              already built for the machine it will run on.
            </p>

            <ul className="mt-8 grid list-none gap-4 p-0 sm:grid-cols-2">
              {designServices.map((service) => (
                <li key={service.title} className="pm-card p-5">
                  <h3 className="text-base">{service.title}</h3>
                  <p className="mt-2 text-sm text-brand-muted">{service.body}</p>
                </li>
              ))}
            </ul>

            <div className="pm-card mt-6 p-5">
              <h3 className="text-base">What we need from you</h3>
              <ul className="mt-3 grid list-none gap-2 p-0 text-sm">
                {[
                  "A short brief — what the piece is for and where it will be seen",
                  "Your logo files if you have them (or we design one)",
                  "Any copy you want included",
                  "Sizes and quantities, or just say “same as last time”",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-2.5">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="pm-card p-6 lg:sticky lg:top-28">
            <h2 className="text-xl">Start a design request</h2>
            <p className="mt-2 text-sm text-brand-muted">
              Send the brief through the quote form and mention design support, or
              start the conversation on WhatsApp — whichever is quicker for you.
            </p>
            <div className="mt-5 grid gap-2.5">
              <Link href="/get-a-quote" className="pm-btn pm-btn-primary">
                Send a design brief
              </Link>
              <a
                href={whatsappLink(
                  "Hello PromoLink, I need design support for a print job."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="pm-btn pm-btn-secondary"
              >
                Chat on WhatsApp
              </a>
              <a
                href={`mailto:${site.email}`}
                className="pm-btn pm-btn-outline break-all"
              >
                {site.email}
              </a>
            </div>

            <p className="mt-4 text-xs text-brand-muted">
              TODO(decision): design-only work is quoted per brief. Turnaround for
              design is typically 2–5 working days depending on rounds of
              revision.
            </p>
          </aside>
        </div>
      </section>

      <ProcessSteps />

      <section className="pm-section border-t border-brand-border">
        <div className="pm-container">
          <h2 className="mb-6 text-2xl">Popular design-led jobs</h2>
          <p className="mb-6 text-sm text-brand-muted">
            {allItems.length} services available — these four are the ones clients
            most often ask our studio to lay out.
          </p>
          <ul className="grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {designExamples.map((item) => (
              <li key={item.slug}>
                <ProductCard item={item} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}