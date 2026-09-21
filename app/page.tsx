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

      <section className="pm-section">
        <div className="pm-container">
          <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="pm-eyebrow mb-2">Our people</p>
              <h2 className="text-2xl sm:text-[1.75rem]">
                Meet the people that make it happen
              </h2>
              <p className="mt-2 max-w-2xl text-brand-muted">
                Designers, print consultants, offset and digital print managers,
                signage fabricators, installers and a finishing and logistics team.
              </p>
            </div>
            <Link
              href="/our-team"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-strong"
            >
              Meet the full team
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </header>

          <TeamGrid members={team} compact />

          <div className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl bg-brand-light p-5">
            <p className="text-sm text-brand-muted">
              Not sure which service you need? Tell us the outcome you want and we
              will suggest the route — {site.turnaround.toLowerCase()}
            </p>
            <Link href="/get-a-quote" className="pm-btn pm-btn-primary pm-btn-sm">
              Get a Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}