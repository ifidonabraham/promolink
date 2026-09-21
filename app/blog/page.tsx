import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { ArrowRightIcon } from "@/components/icons";
import { categories } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Print tips, material guidance and turnaround planning from the PromoLink Print Concepts studio in Lagos.",
};

/**
 * TODO(content): no editorial posts have been supplied yet, so this page does
 * not invent any. Add real posts (title, slug, date, excerpt, body) and swap the
 * grid below for the list — the route is already wired into the nav.
 */
const plannedTopics = [
  {
    title: "Choosing the right paper stock for business cards",
    summary:
      "GSM, lamination and finish — what actually survives a Lagos pocket, and when a heavyweight card is worth the extra naira.",
  },
  {
    title: "Large format artwork files: the five checks before you print",
    summary:
      "Resolution at final size, bleed, colour profile, outlined fonts and safe margins — the checklist our prepress team runs on every banner.",
  },
  {
    title: "Planning brand merchandise for a conference",
    summary:
      "Lead times, quantities and the items that still look good six months after the event.",
  },
  {
    title: "Beating deadline week without paying for a reprint",
    summary:
      "How to schedule design, proofing and delivery so the programme does not slip.",
  },
];

export default function BlogPage() {
  return (
    <>
      <PageHeader
        title="From the studio"
        intro="Practical print guidance for Nigerian brands and event teams. Long-form posts are on the way — in the meantime, here is what our team is writing about, and where to find the service you need today."
        crumbs={[{ label: "Blog" }]}
      />

      <section className="pm-section">
        <div className="pm-container">
          <h2 className="text-2xl">In the pipeline</h2>
          <p className="mt-2 text-sm text-brand-muted">
            {/* TODO(content): replace with published posts once written/approved. */}
            Draft titles only — nothing here is published yet.
          </p>

          <ul className="mt-6 grid list-none gap-5 p-0 sm:grid-cols-2">
            {plannedTopics.map((topic) => (
              <li key={topic.title} className="pm-card p-6">
                <p className="pm-eyebrow mb-2">Coming soon</p>
                <h3 className="text-lg">{topic.title}</h3>
                <p className="mt-2 text-sm text-brand-muted">{topic.summary}</p>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <h2 className="text-2xl">Meanwhile, browse what we print</h2>
            <ul className="mt-5 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
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
        </div>
      </section>
    </>
  );
}