"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRightIcon, SparklesIcon } from "@/components/icons";
import { promos } from "@/lib/promos";

/**
 * Rotating promo slot in the hero with dark mode,
 * hover elevation, and interactive pagination dots.
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
        className="group relative flex items-center justify-between gap-3 overflow-hidden rounded-2xl border border-amber-300/40 bg-gradient-to-r from-amber-100/80 via-brand-secondary/70 to-amber-100/80 px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md dark:border-slate-800 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 dark:text-white"
      >
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand text-white shadow-sm transition-transform duration-300 group-hover:scale-110">
            <SparklesIcon className="h-4 w-4" />
          </span>
          <div>
            <span className="block text-[0.68rem] font-bold uppercase tracking-[0.16em] text-brand">
              {promo.label}
            </span>
            <span className="font-bold">{promo.title}</span>
          </div>
        </div>

        <ArrowRightIcon className="h-4 w-4 shrink-0 text-brand transition-transform duration-300 group-hover:translate-x-1" />
      </Link>

      {total > 1 ? (
        <div className="mt-2.5 flex justify-center gap-1.5">
          {promos.map((entry, dotIndex) => (
            <button
              key={entry.id}
              type="button"
              onClick={() => setIndex(dotIndex)}
              aria-label={`Show promo ${dotIndex + 1} of ${total}`}
              aria-current={dotIndex === index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                dotIndex === index
                  ? "w-7 bg-brand"
                  : "w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}