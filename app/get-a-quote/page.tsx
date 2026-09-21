import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { QuoteForm } from "@/components/QuoteForm";
import { ClockIcon, MailIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { allItems } from "@/lib/catalog";
import { site, telLink, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get a Quote",
  description:
    "Request a print, branding or signage quote from PromoLink Print Concepts. Tell us what you need and our team responds with pricing and turnaround.",
};

type PageProps = {
  searchParams: Promise<{ service?: string; promo?: string }>;
};

export default async function GetAQuotePage({ searchParams }: PageProps) {
  const { service, promo } = await searchParams;

  const initialSlugs =
    service && allItems.some((item) => item.slug === service) ? [service] : [];

  return (
    <>
      <PageHeader
        title="Get a Quote"
        intro="Fill this in once and our team comes back with pricing, timing and the next step. Prefer to talk? Use WhatsApp or call us — both are answered during working hours."
        crumbs={[{ label: "Get a quote" }]}
      />

      <section className="pm-section">
        <div className="pm-container grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-start">
          <div>
            {promo ? (
              <p className="mb-4 rounded-2xl bg-brand-secondary px-4 py-3 text-sm font-semibold text-brand-dark">
                Promo applied: quote this job against the current promotion
                (reference: {promo}).
              </p>
            ) : null}

            {initialSlugs.length > 0 ? (
              <p className="mb-4 rounded-2xl bg-brand-light px-4 py-3 text-sm text-brand-muted">
                Pre-selected:{" "}
                <span className="font-semibold text-brand-dark">
                  {allItems.find((item) => item.slug === initialSlugs[0])?.name}
                </span>
              </p>
            ) : null}

            <QuoteForm initialSlugs={initialSlugs} />
          </div>

          <aside className="grid gap-4 lg:sticky lg:top-28">
            <div className="pm-card p-5">
              <h2 className="text-base">Talk to a human</h2>
              <ul className="mt-3 grid list-none gap-3 p-0 text-sm">
                {site.phones.map((phone) => (
                  <li key={phone}>
                    <a
                      href={telLink(phone)}
                      className="flex items-center gap-2.5 font-semibold text-brand-dark transition hover:text-brand"
                    >
                      <PhoneIcon className="h-4 w-4 text-brand" />
                      {phone}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="flex items-start gap-2.5 break-all text-brand-muted transition hover:text-brand"
                  >
                    <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    {site.email}
                  </a>
                </li>
                <li>
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pm-btn pm-btn-whatsapp pm-btn-sm mt-1"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    Chat on WhatsApp
                  </a>
                </li>
              </ul>
            </div>

            <div className="pm-card p-5">
              <h2 className="flex items-center gap-2 text-base">
                <ClockIcon className="h-4 w-4 text-brand" />
                Turnaround
              </h2>
              <p className="mt-2 text-sm text-brand-muted">{site.turnaround}</p>
              <p className="mt-3 text-sm text-brand-muted">
                Complex jobs — light boxes, vehicle wraps, corporate identity
                roll-outs — are scheduled with you at quote stage.
              </p>
            </div>

            <div className="pm-card p-5">
              <h2 className="text-base">Where we are</h2>
              <p className="mt-2 text-sm text-brand-muted">{site.address.full}</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}