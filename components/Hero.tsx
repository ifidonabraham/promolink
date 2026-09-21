import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon, CheckIcon, ClockIcon, StarIcon } from "@/components/icons";
import { PromoBanner } from "@/components/PromoBanner";
import { clients } from "@/lib/clients";
import { site } from "@/lib/site";

/**
 * Homepage hero. Keeps the reference site's shape — big headline, sub-copy,
 * primary CTA plus a rotating promo slot — in PromoLink's own voice.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-light">
      <div className="pm-container relative grid items-center gap-10 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
        <div className="pm-reveal">
          <p className="pm-eyebrow mb-4">
            <StarIcon className="h-3.5 w-3.5" />
            Printing & publishing · Branding · Corporate promotion
          </p>

          <h1 className="text-[2rem] leading-[1.1] sm:text-[2.6rem] lg:text-[3.1rem]">
            Let our print products{" "}
            <span className="text-brand">stand you out.</span>
          </h1>

          <p className="mt-5 max-w-xl text-base text-brand-muted sm:text-lg">
            PromoLink Print Concepts designs, prints and delivers for businesses,
            organisations and individuals across Lagos and Nigeria — one point of
            contact from artwork to installation.
          </p>

          <ul className="mt-6 grid gap-2.5 text-sm font-medium sm:grid-cols-2">
            {[
              "Design support in-house",
              "Large format & offset",
              "Signage, stands & displays",
              "Promotional merchandise",
            ].map((point) => (
              <li key={point} className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 shrink-0 text-brand-accent" />
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/get-a-quote" className="pm-btn pm-btn-primary">
              Start Printing
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link href="/all-products" className="pm-btn pm-btn-outline">
              Browse all services
            </Link>
          </div>

          <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-brand-muted">
            <ClockIcon className="h-4 w-4 text-brand" />
            {site.turnaround}
          </p>
        </div>

        <div className="relative pm-reveal [animation-delay:120ms]">
          <div className="pm-card mx-auto w-full max-w-[30rem] overflow-hidden">
            <Image
              src="/brand/print-colour.jpg"
              alt="PromoLink company profile artwork showing branded print production in Lagos"
              width={748}
              height={1058}
              className="h-auto max-h-[30rem] w-full object-contain object-center"
              priority
            />
            <div className="flex items-center justify-between gap-3 px-4 py-3">
              <p className="text-sm font-semibold">Colour work off our presses</p>
              <Link
                href="/about"
                className="text-sm font-semibold text-brand hover:text-brand-strong"
              >
                About us →
              </Link>
            </div>
          </div>

          <div className="pm-card mt-4 flex items-center gap-3 p-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand text-white">
              <StarIcon className="h-5 w-5 text-brand-secondary" />
            </span>
            <div>
              <p className="text-sm font-semibold">
                Trusted by {clients.length}+ organisations
              </p>
              <p className="text-xs text-brand-muted">
                CITN, CIPM Nigeria, Guinea Insurance, Medbury and more
              </p>
            </div>
          </div>

          <PromoBanner />
        </div>
      </div>
    </section>
  );
}