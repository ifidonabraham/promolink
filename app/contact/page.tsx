import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { TrustCtaBanner } from "@/components/TrustCtaBanner";
import {
  ClockIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  WhatsAppIcon,
} from "@/components/icons";
import { site, telLink, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact PromoLink Print Concepts Limited — 2nd Floor, Right Wing, Emmanuel Plaza, 23b Fatai Atere Way, Matori, Mushin, Lagos. Call 0803 430 2582 or 0803 261 6222.",
};

export default function ContactPage() {
  const mapQuery = encodeURIComponent(site.address.full);

  return (
    <>
      <PageHeader
        title="Contact Us"
        intro="Visit the office in Mushin, call either line, or start the conversation on WhatsApp. Quote requests get a written reply."
        crumbs={[{ label: "Contact us" }]}
      />

      <section className="pm-section">
        <div className="pm-container grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div className="grid gap-4">
            <div className="pm-card p-6">
              <h2 className="text-lg">We are within reach</h2>
              <ul className="mt-4 grid list-none gap-4 p-0 text-sm">
                <li className="flex items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-light text-brand">
                    <PinIcon className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block font-semibold text-brand-dark">
                      Office
                    </span>
                    <span className="text-brand-muted">{site.address.full}</span>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-light text-brand">
                    <PhoneIcon className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block font-semibold text-brand-dark">
                      Telephone
                    </span>
                    {site.phones.map((phone) => (
                      <a
                        key={phone}
                        href={telLink(phone)}
                        className="block text-brand-muted transition hover:text-brand"
                      >
                        {phone}
                      </a>
                    ))}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-light text-brand">
                    <MailIcon className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block font-semibold text-brand-dark">
                      Email
                    </span>
                    <a
                      href={`mailto:${site.email}`}
                      className="break-all text-brand-muted transition hover:text-brand"
                    >
                      {site.email}
                    </a>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-light text-brand">
                    <ClockIcon className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block font-semibold text-brand-dark">
                      Working hours
                    </span>
                    {/* TODO: confirm official opening hours — placeholder below. */}
                    <span className="text-brand-muted">
                      Monday – Friday, 8:30am – 5:30pm · Saturday by appointment
                    </span>
                  </span>
                </li>
              </ul>

              <div className="mt-5 grid gap-2.5">
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pm-btn pm-btn-whatsapp"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Chat on WhatsApp
                </a>
                <Link href="/get-a-quote" className="pm-btn pm-btn-outline">
                  Request a quote instead
                </Link>
              </div>
            </div>

            <div className="pm-card overflow-hidden">
              {/* Google Maps embed — no API key required. */}
              <iframe
                title={`Map to ${site.legalName}`}
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                className="h-64 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="pm-card p-6 sm:p-8">
            <h2 className="text-xl">Send us a message</h2>
            <p className="mt-2 text-sm text-brand-muted">
              The quote form is the fastest route — it asks for everything the
              production team needs to price the job, and it also lets you send the
              same details straight to WhatsApp.
            </p>
            <Link href="/get-a-quote" className="pm-btn pm-btn-primary mt-5">
              Open the quote form
            </Link>

            <div className="mt-8 grid gap-3 border-t border-brand-border pt-6 text-sm text-brand-muted">
              <p className="font-semibold text-brand-dark">
                For trade printers, agencies and creatives
              </p>
              <p>
                We handle overflow and white-label production for other print
                houses across Nigeria. Mention “trade” in your message and we will
                route you to the right desk.
              </p>
            </div>

            <div className="mt-8 grid gap-3 border-t border-brand-border pt-6 text-sm text-brand-muted">
              <p className="font-semibold text-brand-dark">Getting here</p>
              <p>
                Our office is on the second floor (right wing) of Emmanuel Plaza,
                off Fatai Atere Way in Matori, Mushin — a short drive from Mushin,
                Isolo, Ilupeju and Oshodi, with parking available on site.
              </p>
              {/* TODO: add public transport/landmark hints once confirmed with the client. */}
            </div>
          </div>
        </div>
      </section>

      <TrustCtaBanner />
    </>
  );
}