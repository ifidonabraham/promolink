import Link from "next/link";
import { AboutStrip } from "@/components/AboutStrip";
import { Carousel } from "@/components/Carousel";
import { ClientStrip } from "@/components/ClientStrip";
import { Hero } from "@/components/Hero";
import { ProcessSteps } from "@/components/ProcessSteps";
import { TeamGrid } from "@/components/TeamGrid";
import { Testimonials } from "@/components/Testimonials";
import { TrustCtaBanner } from "@/components/TrustCtaBanner";
import { ArrowRightIcon } from "@/components/icons";
import { categories, homepageCarouselItems } from "@/lib/catalog";
import { site } from "@/lib/site";
import { team } from "@/lib/team";

const eyebrows: Record<string, string> = {
  "designing-branding": "Design studio",
  "digital-printing": "Print production",
  signage: "Signage",
  "print-publishing": "Publishing",
  "promotional-items-printing": "Merchandise",
  "stands-displays": "Displays",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProcessSteps />

      {categories.map((category) => (
        <Carousel
          key={category.slug}
          id={`carousel-${category.slug}`}
          eyebrow={eyebrows[category.slug] ?? "Our services"}
          title={category.name}
          href={`/category/${category.slug}`}
          items={homepageCarouselItems(category)}
        />
      ))}

      <TrustCtaBanner />
      <ClientStrip />
      <AboutStrip />

      <Testimonials />

      <section className="pm-section transition-colors duration-300 dark:bg-slate-950">
        <div className="pm-container">
          <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="pm-eyebrow mb-2">Our people</p>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-[1.85rem] dark:text-white">
                Meet the people that make it happen
              </h2>
              <p className="mt-2 max-w-2xl text-base text-slate-600 dark:text-slate-400">
                Designers, print consultants, offset and digital print managers,
                signage fabricators, installers and a finishing and logistics team.
              </p>
            </div>
            <Link
              href="/our-team"
              className="group inline-flex items-center gap-1.5 text-sm font-bold text-brand transition hover:text-brand-strong"
            >
              <span>Meet the full team</span>
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </header>

          <TeamGrid members={team} compact />

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-brand-border/80 bg-brand-light p-6 transition-colors dark:border-slate-800 dark:bg-slate-900">
            <p className="max-w-2xl text-sm font-medium text-slate-700 dark:text-slate-300">
              Not sure which service you need? Tell us the outcome you want and we
              will suggest the route — {site.turnaround.toLowerCase()}
            </p>
            <Link
              href="/get-a-quote"
              className="pm-btn pm-btn-primary pm-btn-sm shadow-md transition-all hover:scale-105"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}