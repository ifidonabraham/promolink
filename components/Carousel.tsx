"use client";

import Link from "next/link";
import { useRef } from "react";
import { ProductCard } from "@/components/ProductCard";
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import type { ServiceItem } from "@/lib/catalog";

/**
 * Horizontally scrollable product rail with the reference site's section
 * pattern: title + "See more" link + left/right arrow controls.
 */
export function Carousel({
  title,
  eyebrow,
  href,
  items,
  id,
}: {
  title: string;
  eyebrow?: string;
  href: string;
  items: ServiceItem[];
  id?: string;
}) {
  const railRef = useRef<HTMLUListElement>(null);

  function nudge(direction: -1 | 1) {
    const rail = railRef.current;
    if (!rail) return;
    const step = Math.max(rail.clientWidth * 0.8, 260);
    rail.scrollBy({ left: direction * step, behavior: "smooth" });
  }

  return (
    <section className="pm-section" aria-labelledby={id ?? `${href}-heading`}>
      <div className="pm-container">
        <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            {eyebrow ? <p className="pm-eyebrow mb-2">{eyebrow}</p> : null}
            <h2 id={id ?? `${href}-heading`} className="text-2xl sm:text-[1.75rem]">
              {title}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={href}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-strong"
            >
              See more
              <ArrowRightIcon className="h-4 w-4" />
            </Link>

            <div className="hidden items-center gap-2 sm:flex">
              <button
                type="button"
                onClick={() => nudge(-1)}
                aria-label={`Scroll ${title} left`}
                className="grid h-10 w-10 place-items-center rounded-full border border-brand-border bg-white text-brand-dark transition hover:border-brand hover:text-brand"
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => nudge(1)}
                aria-label={`Scroll ${title} right`}
                className="grid h-10 w-10 place-items-center rounded-full border border-brand-border bg-white text-brand-dark transition hover:border-brand hover:text-brand"
              >
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </header>
      </div>

      <div className="pm-container">
        <ul ref={railRef} className="pm-rail list-none p-0">
          {items.map((item) => (
            <li key={item.slug} className="py-1">
              <ProductCard item={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
