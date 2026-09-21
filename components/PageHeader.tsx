import Link from "next/link";
import { ChevronRightIcon } from "@/components/icons";

/** Breadcrumb + page title band used on every inner page. */
export function PageHeader({
  title,
  intro,
  crumbs,
  children,
}: {
  title: string;
  intro?: string;
  crumbs?: { label: string; href?: string }[];
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b border-brand-border bg-brand-light">
      <div className="pm-container py-8 lg:py-10">
        {crumbs?.length ? (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex list-none flex-wrap items-center gap-1.5 p-0 text-xs text-brand-muted">
              <li>
                <Link href="/" className="transition hover:text-brand">
                  Home
                </Link>
              </li>
              {crumbs.map((crumb, index) => (
                <li key={`${crumb.label}-${index}`} className="flex items-center gap-1.5">
                  <ChevronRightIcon className="h-3.5 w-3.5 text-brand-border" />
                  {crumb.href ? (
                    <Link href={crumb.href} className="transition hover:text-brand">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="font-medium text-brand-dark">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <h1 className="text-[1.75rem] sm:text-[2.25rem]">{title}</h1>
        {intro ? (
          <p className="mt-3 max-w-3xl text-brand-muted">{intro}</p>
        ) : null}
        {children}
      </div>
    </section>
  );
}