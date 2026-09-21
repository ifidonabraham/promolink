"use client";

import { useEffect, useState } from "react";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from "@/components/icons";
import { testimonials, testimonialsPlaceholder } from "@/lib/testimonials";

/**
 * Testimonials carousel with dark mode support,
 * tactile controls, and high-clarity typography.
 */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;

  useEffect(() => {
    if (total < 2) return undefined;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, 7000);
    return () => window.clearInterval(id);
  }, [total]);

  if (total === 0) {
    return (
      <section className="pm-section bg-brand-light transition-colors duration-300 dark:bg-slate-950">
        <div className="pm-container">
          <header className="mx-auto mb-8 max-w-2xl text-center">
            <p className="pm-eyebrow mb-3">Testimony from our clients</p>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              {testimonialsPlaceholder.heading}
            </h2>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
              {testimonialsPlaceholder.body}
            </p>
          </header>
          <p className="text-center">
            <a
              href="/get-a-quote"
              className="pm-btn pm-btn-outline transition-all hover:scale-105"
            >
              Ask us for references
            </a>
          </p>
        </div>
      </section>
    );
  }

  const current = testimonials[index];

  return (
    <section className="pm-section bg-brand-light transition-colors duration-300 dark:bg-slate-950">
      <div className="pm-container">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="pm-eyebrow mb-2">Testimony from our clients</p>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              What our clients say
            </h2>
          </div>
          {total > 1 ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIndex((prev) => (prev - 1 + total) % total)}
                aria-label="Previous testimonial"
                className="grid h-10 w-10 place-items-center rounded-full border border-brand-border bg-white text-slate-700 transition hover:border-brand hover:text-brand hover:scale-105 active:scale-95 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-brand"
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setIndex((prev) => (prev + 1) % total)}
                aria-label="Next testimonial"
                className="grid h-10 w-10 place-items-center rounded-full border border-brand-border bg-white text-slate-700 transition hover:border-brand hover:text-brand hover:scale-105 active:scale-95 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-brand"
              >
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>
          ) : null}
        </header>

        <figure className="pm-card mx-auto flex max-w-3xl flex-col gap-6 p-6 transition-all duration-300 hover:shadow-xl sm:flex-row sm:p-8 dark:border-slate-800 dark:bg-slate-900">
          {current.image ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={current.image}
              alt={current.name}
              className="h-20 w-20 shrink-0 rounded-2xl object-cover shadow-md"
            />
          ) : (
            <ImagePlaceholder
              variant="person"
              label={current.name}
              className="h-20 w-20 shrink-0 rounded-2xl shadow-md"
            />
          )}
          <div>
            <div className="mb-3 flex gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, starIndex) => (
                <StarIcon key={starIndex} className="h-4 w-4" />
              ))}
            </div>
            <blockquote className="text-base font-normal leading-relaxed text-slate-800 dark:text-slate-200">
              “{current.quote}”
            </blockquote>
            <figcaption className="mt-4 text-sm">
              <span className="font-bold text-slate-900 dark:text-white">
                {current.name}
              </span>
              <span className="block text-xs text-slate-500 dark:text-slate-400">
                {current.role}
                {current.company ? `, ${current.company}` : ""}
              </span>
            </figcaption>
          </div>
        </figure>
      </div>
    </section>
  );
}