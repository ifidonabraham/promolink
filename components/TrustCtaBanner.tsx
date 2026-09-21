import Link from "next/link";
import { ArrowRightIcon, CheckIcon, WhatsAppIcon } from "@/components/icons";
import { clients } from "@/lib/clients";
import { whatsappLink } from "@/lib/site";

/**
 * Mid-page CTA banner — the reference site's "You have come to the right place"
 * slot, restyled and reworded for PromoLink.
 */
export function TrustCtaBanner() {
  return (
    <section className="pm-section">
      <div className="pm-container">
        <div className="relative overflow-hidden rounded-3xl bg-brand px-6 py-12 text-white sm:px-10 lg:py-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full opacity-25 blur-3xl"
            style={{ background: "var(--brand-secondary)" }}
          />

          <div className="relative grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <p className="pm-eyebrow mb-3 text-brand-secondary">
                Who we are / What we do
              </p>
              <h2 className="text-2xl text-white sm:text-3xl">
                You have come to the right place.
              </h2>
              <p className="mt-4 max-w-2xl text-white/80">
                We design, print, brand and deliver for organisations of every
                size — from one-off stationery to full corporate roll-outs. Our
                team includes designers, print consultants, offset and digital
                print managers, signage fabricators, installers and a finishing
                and logistics crew, so a complex job still has a single point of
                contact.
              </p>

              <ul className="mt-6 grid list-none gap-2.5 p-0 text-sm sm:grid-cols-2">
                {[
                  `Working with ${clients.length}+ organisations`,
                  "Design support in-house",
                  "Local & national delivery",
                  "Installation and after-care",
                ].map((point) => (
                  <li key={point} className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 shrink-0 text-brand-secondary" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3 lg:items-end">
              <Link
                href="/get-a-quote"
                className="pm-btn pm-btn-secondary w-full lg:w-auto"
              >
                Request a Quote
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <Link
                href="/hire-a-designer"
                className="pm-btn pm-btn-outline w-full border-white/30 text-white hover:border-white hover:bg-white/10 lg:w-auto"
              >
                Hire a Designer
              </Link>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="pm-btn pm-btn-whatsapp w-full lg:w-auto shadow-lg"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Chat with us on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}