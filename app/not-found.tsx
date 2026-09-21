import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { ArrowRightIcon } from "@/components/icons";
import { categories } from "@/lib/catalog";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <>
      <PageHeader
        title="We could not find that page"
        intro="The link may be out of date. Try one of the routes below, or tell us what you need and we will point you to it."
      />

      <section className="pm-section">
        <div className="pm-container grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div>
            <h2 className="text-xl">Browse our services</h2>
            <ul className="mt-5 grid list-none gap-3 p-0 sm:grid-cols-2">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/category/${category.slug}`}
                    className="flex items-center justify-between gap-3 rounded-xl border border-brand-border px-4 py-3 text-sm font-semibold transition hover:border-brand hover:text-brand"
                  >
                    {category.name}
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <aside className="pm-card p-6">
            <h2 className="text-lg">Talk to us instead</h2>
            <p className="mt-2 text-sm text-brand-muted">
              Call {site.phones[0]} or send a quote request and we will come back
              with pricing and timing.
            </p>
            <div className="mt-5 grid gap-2.5">
              <Link href="/get-a-quote" className="pm-btn pm-btn-primary">
                Get a Quote
              </Link>
              <Link href="/all-products" className="pm-btn pm-btn-outline">
                See all products
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}