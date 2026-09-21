import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { ProductCard } from "@/components/ProductCard";
import { TrustCtaBanner } from "@/components/TrustCtaBanner";
import { allItems, categories } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "All products & services",
  description:
    "Every PromoLink Print Concepts service in one place — designing & branding, digital printing (large format & offset), signage, print & publishing, promotional items, stands & displays.",
};

export default function AllProductsPage() {
  return (
    <>
      <PageHeader
        title="Our Products"
        intro="Browse the full PromoLink catalogue. Every item can be ordered with finished artwork or with design support from our studio."
        crumbs={[{ label: "All products" }]}
      >
        <nav aria-label="Categories" className="mt-6">
          <ul className="flex list-none flex-wrap gap-2 p-0">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/category/${category.slug}`}
                  className="inline-flex items-center rounded-full border border-brand-border bg-white px-3.5 py-2 text-sm font-medium text-brand-dark transition hover:border-brand hover:text-brand"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </PageHeader>

      <section className="pm-section">
        <div className="pm-container">
          <p className="mb-6 text-sm text-brand-muted">
            {allItems.length} services across {categories.length} categories
          </p>

          <ul className="grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {allItems.map((item, index) => (
              <li key={item.slug}>
                <ProductCard item={item} priority={index < 4} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <TrustCtaBanner />
    </>
  );
}