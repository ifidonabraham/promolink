import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AboutStrip } from "@/components/AboutStrip";
import { ClientStrip } from "@/components/ClientStrip";
import { PageHeader } from "@/components/PageHeader";
import { TeamGrid } from "@/components/TeamGrid";
import { TrustCtaBanner } from "@/components/TrustCtaBanner";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";
import { facilities } from "@/lib/facilities";
import { site } from "@/lib/site";
import { team } from "@/lib/team";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "PromoLink Print Concepts Limited — a Lagos-based printing services company providing high-quality, customised print, branding and corporate promotion, locally and nationally.",
};

const photographed = facilities.filter((facility) => facility.image);

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About PromoLink Print Concepts Limited"
        intro={site.tagline}
        crumbs={[{ label: "About us" }]}
      />

      <AboutStrip />

      <section className="pm-section border-y border-brand-border bg-white">
        <div className="pm-container grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div>
            <p className="pm-eyebrow mb-3">Our facilities</p>
            <h2 className="text-2xl sm:text-3xl">
              A facility built for complex jobs
            </h2>
            <p className="mt-4 text-brand-muted">
              Our state-of-the-art printing facility is equipped with the latest
              technology and machinery, ensuring efficient and high-quality
              production. Design, large format, offset, finishing, signage
              fabrication and installation all happen under one roof — which is
              why agencies, trade printers and creatives across Nigeria trust us
              with their overflow work.
            </p>

            <ul className="mt-6 grid list-none gap-3 p-0 sm:grid-cols-2">
              {[
                "Direct Image (DI) high-speed color presses",
                "Wide-format indoor & outdoor printing",
                "Thermal & cold heavy-duty lamination",
                "High-resolution digital photography studio",
                "Automated PVC ID card & passport printers",
                "Industrial projectors & presentation screens",
              ].map((cap) => (
                <li
                  key={cap}
                  className="flex items-start gap-2.5 rounded-xl border border-brand-border px-4 py-3 text-sm"
                >
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
                  {cap}
                </li>
              ))}
            </ul>
          </div>

          {/* Photos extracted from the company profile. TODO(verify): confirm
              which photo belongs to which machine. */}
          <ul className="grid list-none grid-cols-2 gap-4 p-0 sm:grid-cols-3">
            {photographed.map((facility) => (
              <li key={facility.slug} className="pm-card overflow-hidden">
                {facility.image ? (
                  <Image
                    src={facility.image}
                    alt={facility.name}
                    width={500}
                    height={500}
                    className="aspect-square w-full object-contain p-2"
                  />
                ) : null}
                <p className="border-t border-brand-border px-3 py-2 text-center text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-brand-muted">
                  {facility.name}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ClientStrip />

      <section className="pm-section">
        <div className="pm-container">
          <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="pm-eyebrow mb-2">Our people</p>
              <h2 className="text-2xl sm:text-[1.75rem]">
                Meet the people that make it happen
              </h2>
            </div>
            <Link
              href="/our-team"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-strong"
            >
              Full team profiles
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </header>
          <TeamGrid members={team} compact />
        </div>
      </section>

      <TrustCtaBanner />
    </>
  );
}