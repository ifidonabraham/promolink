import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { ProductCard } from "@/components/ProductCard";
import { TrustCtaBanner } from "@/components/TrustCtaBanner";
import { categories, getCategory } from "@/lib/catalog";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);

  if (!category) return { title: "Category not found" };

  return {
    title: category.name,
    description: category.tagline,
    alternates: { canonical: `/category/${category.slug}` },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategory(slug);

  if (!category) notFound();

  const siblings = categories.filter((c) => c.slug !== category.slug);

  return (
    <>
      <PageHeader
        title={category.name}
        intro={category.tagline}
        crumbs={[{ label: "All products", href: "/all-products" }, { label: category.name }]}
      >
        <p className="mt-4 text-sm font-semibold text-brand">
          {category.items.length} service{category.items.length === 1 ? "" : "s"} in
          this category
        </p>
      </PageHeader>

      <section className="pm-section">
        <div className="pm-container grid gap-8 lg:grid-cols-[1fr_16rem]">
          <ul className="grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 xl:grid-cols-3">
            {category.items.map((item, index) => (
              <li key={item.slug}>
                <ProductCard item={item} priority={index < 3} />
              </li>
            ))}
          </ul>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="pm-card p-5">
              <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-brand-muted">
                Other categories
              </h2>
              <ul className="mt-3 grid list-none gap-2 p-0">
                {siblings.map((sibling) => (
                  <li key={sibling.slug}>
                    <Link
                      href={`/category/${sibling.slug}`}
                      className="text-sm font-medium text-brand-dark transition hover:text-brand"
                    >
                      {sibling.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pm-card mt-4 p-5">
              <h2 className="text-base">Need artwork?</h2>
              <p className="mt-2 text-sm text-brand-muted">
                Our designers can build the layout, or adapt files you already
                have, before anything goes to press.
              </p>
              <Link href="/hire-a-designer" className="pm-btn pm-btn-outline pm-btn-sm mt-4">
                Hire a Designer
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <TrustCtaBanner />
    </>
  );
}