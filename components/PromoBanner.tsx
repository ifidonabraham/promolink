"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRightIcon } from "@/components/icons";
import { promos } from "@/lib/promos";

/**
 * Rotating promo slot in the hero (the reference site's "Order Now" banner).
 * Cycles through lib/promos.ts every 6 seconds; pauses nowhere and stays
 * keyboard-accessible because each slide is a plain link.
 */
export function PromoBanner() {
  const [index, setIndex] = useState(0);
  const total = promos.length;

  useEffect(() => {
    if (total < 2) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, 6000);
    return () => window.clearInterval(id);
  }, [total]);

  if (total === 0) return null;

  const promo = promos[index];

  return (
    <div className="mt-4">
      <Link
        href={promo.href}
        className="flex items-center justify-between gap-3 rounded-2xl bg-brand-secondary px-4 py-3 text-sm font-semibold text-brand-dark transition hover:brightness-95"
      >
        <span>
          <span className="block text-[0.65rem] font-bold uppercase tracking-[0.16em] opacity-70">
            {promo.label}
          </span>
          {promo.title}
        </span>
        <ArrowRightIcon className="h-5 w-5 shrink-0" />
      </Link>

      {total > 1 ? (
        <div className="mt-2 flex justify-center gap-1.5">
          {promos.map((entry, dotIndex) => (
            <button
              key={entry.id}
              type="button"
              onClick={() => setIndex(dotIndex)}
              aria-label={`Show promo ${dotIndex + 1} of ${total}`}
              aria-current={dotIndex === index}
              className={`h-1.5 rounded-full transition-all ${
                dotIndex === index ? "w-6 bg-brand" : "w-1.5 bg-brand-border"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}