"use client";

import { useEffect, useState } from "react";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from "@/components/icons";
import { testimonials, testimonialsPlaceholder } from "@/lib/testimonials";

/**
 * Testimonials carousel.
 *
 * The brief is explicit that quotes must not be invented, so while
 * lib/testimonials.ts is empty this renders an honest placeholder state
 * instead of fabricated praise. Add real entries to switch the carousel on.
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
      <section className="pm-section bg-brand-light">
        <div className="pm-container">
          <header className="mx-auto mb-8 max-w-2xl text-center">
            <p className="pm-eyebrow mb-3">Testimony from our clients</p>
            <h2 className="text-2xl sm:text-3xl">
              {testimonialsPlaceholder.heading}
            </h2>
            <p className="mt-3 text-brand-muted">{testimonialsPlaceholder.body}</p>
          </header>
          <p className="text-center">
            <a href="/get-a-quote" className="pm-btn pm-btn-outline">
              Ask us for references
            </a>
          </p>
        </div>
      </section>
    );
  }

  const current = testimonials[index];

  return (
    <section className="pm-section bg-brand-light">
      <div className="pm-container">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="pm-eyebrow mb-2">Testimony from our clients</p>
            <h2 className="text-2xl sm:text-3xl">What our clients say</h2>
          </div>
          {total > 1 ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIndex((prev) => (prev - 1 + total) % total)}
                aria-label="Previous testimonial"
                className="grid h-10 w-10 place-items-center rounded-full border border-brand-border bg-white transition hover:border-brand hover:text-brand"
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setIndex((prev) => (prev + 1) % total)}
                aria-label="Next testimonial"
                className="grid h-10 w-10 place-items-center rounded-full border border-brand-border bg-white transition hover:border-brand hover:text-brand"
              >
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>
          ) : null}
        </header>

        <figure className="pm-card mx-auto flex max-w-3xl flex-col gap-6 p-6 sm:flex-row sm:p-8">
          {current.image ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={current.image}
              alt={current.name}
              className="h-20 w-20 shrink-0 rounded-full object-cover"
            />
          ) : (
            <ImagePlaceholder
              variant="person"
              label={current.name}
              className="h-20 w-20 shrink-0 rounded-full"
            />
          )}
          <div>
            <div className="mb-3 flex gap-0.5 text-brand-secondary">
              {Array.from({ length: 5 }).map((_, starIndex) => (
                <StarIcon key={starIndex} className="h-4 w-4" />
              ))}
            </div>
            <blockquote className="text-base text-brand-dark">
              “{current.quote}”
            </blockquote>
            <figcaption className="mt-4 text-sm">
              <span className="font-semibold">{current.name}</span>
              <span className="block text-brand-muted">
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