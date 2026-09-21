import Link from "next/link";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";

/**
 * About / vision / mission block — copy taken from the PromoLink company
 * profile (pages 3 and 4).
 */
export function AboutStrip() {
  return (
    <section className="pm-section" id="about">
      <div className="pm-container grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
        <div>
          <p className="pm-eyebrow mb-3">About us</p>
          <h2 className="text-2xl sm:text-3xl">
            A leading printing services company, built for complex projects.
          </h2>

          <p className="mt-5 text-brand-muted">
            PromoLink Print Concepts Limited is a leading printing services
            company that provides high-quality, customised printing solutions to
            businesses, organisations and individuals. With years of experience
            and a team of experts, we provide design and printing services for
            clients both locally and nationally that meet the highest standards
            of quality, precision and timeliness.
          </p>

          <p className="mt-4 text-brand-muted">
            With our team there is a huge wealth of resource and experience for
            our clients to tap into. Specialist consultants from various design
            and print backgrounds are on hand to guide you through ordering
            complex projects — helping you find innovative ways to break through
            the competition and get your customer&apos;s attention. Our end-to-end
            solution means one point of contact for all your visual communication
            needs.
          </p>

          <p className="mt-4 text-brand-muted">
            Our facility runs HD cameras, direct image (DI) printing, laminating
            and ID-card printing machines, a passport printing machine, large
            format printers, projectors and projection screens — alongside the
            offset, finishing and fabrication capacity that makes us a trusted
            partner for trade printers, agencies and creatives throughout
            Nigeria.
          </p>

          <Link
            href="/about"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-strong"
          >
            Read more about PromoLink
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4">
          <article className="pm-card p-6">
            <p className="pm-eyebrow mb-2">Our vision</p>
            <p className="text-lg font-semibold leading-snug text-brand-dark">
              “To be globally recognized as a provider of high quality and top
              ranking printing, corporate branding and promotional services.”
            </p>
          </article>

          <article className="pm-card p-6">
            <p className="pm-eyebrow mb-2">Our mission</p>
            <p className="text-lg font-semibold leading-snug text-brand-dark">
              “To provide exceptional printing services that exceed our
              clients&apos; expectations, build long-lasting relationships, and
              contribute to our clients&apos; success.”
            </p>
          </article>

          <article className="pm-card p-6">
            <p className="pm-eyebrow mb-3">What we do</p>
            <ul className="grid list-none gap-2 p-0 text-sm">
              {[
                "Designing & Branding",
                "Digital printing — large format & offset",
                "Signage, internal & external",
                "Print & publishing",
                "Screen printing & promotional items",
                "Stands, displays & AV hire",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 shrink-0 text-brand-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}