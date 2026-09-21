import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { ProductCard } from "@/components/ProductCard";
import { QuoteListButton } from "@/components/QuoteList";
import { ServiceArtwork } from "@/components/ServiceArtwork";
import Image from "next/image";
import { TrustCtaBanner } from "@/components/TrustCtaBanner";
import { CheckIcon, ClockIcon, WhatsAppIcon } from "@/components/icons";
import {
  allItems,
  getCategory,
  getItem,
  leadTimeLabel,
  priceLabel,
  serviceImage,
} from "@/lib/catalog";
import { whatsappLink } from "@/lib/site";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getItem(slug);

  if (!item) return { title: "Service not found" };

  return {
    title: item.name,
    description: item.descriptor,
    alternates: { canonical: `/services/${item.slug}` },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const item = getItem(slug);

  if (!item) notFound();

  const category = getCategory(item.category);
  const leadTime = leadTimeLabel(item);
  const related = (category?.items ?? []).filter((entry) => entry.slug !== item.slug);

  return (
    <>
      <PageHeader
        title={item.name}
        crumbs={[
          { label: "All products", href: "/all-products" },
          category
            ? { label: category.name, href: `/category/${category.slug}` }
            : { label: "Services" },
          { label: item.name },
        ]}
      />

      <section className="pm-section">
        <div className="pm-container grid gap-10 lg:grid-cols-[1.05fr_1fr]">
          <div className="pm-card overflow-hidden">
            {serviceImage(item) ? (
              <Image
                src={serviceImage(item)!}
                alt={`${item.name} service example`}
                width={1200}
                height={900}
                className="aspect-[4/3] w-full object-cover"
                priority
              />
            ) : (
              <ServiceArtwork item={item} className="aspect-[4/3] w-full" />
            )}
          </div>

          <div>
            <p className="text-base text-brand-muted">{item.descriptor}</p>
            <p className="mt-4 text-brand-muted">{item.details}</p>

            <ul className="mt-6 grid list-none gap-2.5 p-0">
              {item.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-2.5 text-sm">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
                  {highlight}
                </li>
              ))}
            </ul>

            <dl className="mt-6 grid gap-x-6 gap-y-3 rounded-2xl bg-brand-light p-5 text-sm sm:grid-cols-2">
              <div>
                <dt className="font-semibold text-brand-dark">Minimum order</dt>
                <dd className="text-brand-muted">
                  {typeof item.minimumUnits === "number"
                    ? `${item.minimumUnits} unit(s)`
                    : "No minimum — talk to us"}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-brand-dark">Typical turnaround</dt>
                <dd className="flex items-center gap-1.5 text-brand-muted">
                  <ClockIcon className="h-4 w-4 text-brand" />
                  {leadTime ?? "Confirmed on quote"}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-brand-dark">Category</dt>
                <dd className="text-brand-muted">
                  {category ? (
                    <Link
                      href={`/category/${category.slug}`}
                      className="transition hover:text-brand"
                    >
                      {category.name}
                    </Link>
                  ) : (
                    "—"
                  )}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-brand-dark">Pricing</dt>
                <dd className="text-brand-muted">{priceLabel(item)}</dd>
              </div>
            </dl>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href={`/get-a-quote?service=${item.slug}`}
                className="pm-btn pm-btn-primary"
              >
                Get a Quote
              </Link>
              <QuoteListButton slug={item.slug} />
              <a
                href={whatsappLink(
                  `Hello PromoLink, I would like a quote for ${item.name}.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="pm-btn pm-btn-ghost"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="border-t border-brand-border bg-white py-12">
          <div className="pm-container">
            <h2 className="mb-6 text-2xl">
              More in {category?.name ?? "this category"}
            </h2>
            <ul className="grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((entry) => (
                <li key={entry.slug}>
                  <ProductCard item={entry} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <TrustCtaBanner />
    </>
  );
}