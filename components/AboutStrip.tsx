import Link from "next/link";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";

/**
 * About / vision / mission block with crisp typography,
 * interactive card depth, and dark mode support.
 */
export function AboutStrip() {
  return (
    <section className="pm-section transition-colors duration-300 dark:bg-slate-950" id="about">
      <div className="pm-container grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-start">
        <div>
          <p className="pm-eyebrow mb-3">About PromoLink</p>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl dark:text-white">
            A leading printing services company, built for complex projects.
          </h2>

          <p className="mt-5 text-base leading-relaxed text-slate-600 dark:text-slate-300">
            PromoLink Print Concepts Limited is a premier printing powerhouse in Lagos that provides high-quality, customized printing solutions to businesses, organisations and individuals. With years of experience and a team of experts, we deliver print and branding services that meet the highest standards of quality, precision and timeliness.
          </p>

          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
            With our team there is a huge wealth of resource and experience for our clients to tap into. Specialist consultants from various design and print backgrounds are on hand to guide you through ordering complex projects — helping you find innovative ways to break through the competition and get your customer&apos;s attention.
          </p>

          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
            Our facility runs HD direct image (DI) printing, laminating and ID-card printing machines, large format printers, and precision finishing — alongside the offset, fabrication, and installation capacity that makes us a trusted partner throughout Nigeria.
          </p>

          <Link
            href="/about"
            className="group mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand transition-all hover:text-brand-strong"
          >
            <span>Read more about PromoLink</span>
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-5">
          <article className="pm-card group relative border-l-4 border-l-brand p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:border-l-brand dark:bg-slate-900">
            <p className="pm-eyebrow mb-2">Our vision</p>
            <p className="text-lg font-semibold leading-snug text-slate-900 dark:text-white">
              “To be globally recognized as a provider of high quality and top
              ranking printing, corporate branding and promotional services.”
            </p>
          </article>

          <article className="pm-card group relative border-l-4 border-l-amber-500 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:border-l-amber-500 dark:bg-slate-900">
            <p className="pm-eyebrow mb-2 text-amber-600 dark:text-amber-400">Our mission</p>
            <p className="text-lg font-semibold leading-snug text-slate-900 dark:text-white">
              “To provide exceptional printing services that exceed our
              clients&apos; expectations, build long-lasting relationships, and
              contribute to our clients&apos; success.”
            </p>
          </article>

          <article className="pm-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
            <p className="pm-eyebrow mb-3">Core Capabilities</p>
            <ul className="grid list-none gap-2.5 p-0 text-sm font-medium text-slate-700 dark:text-slate-300 sm:grid-cols-2">
              {[
                "Designing & Branding",
                "Large format & offset press",
                "Signage, internal & external",
                "Print & publishing",
                "Screen printing & promo merchandise",
                "Stands, displays & installations",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand/15 text-brand dark:bg-brand/20">
                    <CheckIcon className="h-3 w-3 stroke-[3]" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}