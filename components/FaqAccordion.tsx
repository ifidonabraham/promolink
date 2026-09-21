"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@/components/icons";

export type FaqEntry = {
  question: string;
  answer: string;
};

/** Accordion used on /faqs and anywhere else an FAQ block is needed. */
export function FaqAccordion({ items }: { items: FaqEntry[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="grid list-none gap-3 p-0">
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <li key={item.question} className="pm-card overflow-hidden">
            <h3 className="m-0">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold"
              >
                {item.question}
                <ChevronDownIcon
                  className={`h-5 w-5 shrink-0 text-brand transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </h3>
            {isOpen ? (
              <div className="border-t border-brand-border px-5 py-4 text-sm text-brand-muted">
                {item.answer}
              </div>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}