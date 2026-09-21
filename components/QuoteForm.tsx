"use client";

import { useMemo, useState } from "react";
import { CheckIcon, WhatsAppIcon } from "@/components/icons";
import { useQuoteList } from "@/components/QuoteList";
import { allItems, categories } from "@/lib/catalog";
import { site, whatsappLink } from "@/lib/site";

type FormState = {
  name: string;
  organisation: string;
  email: string;
  phone: string;
  quantity: string;
  deadline: string;
  details: string;
};

const emptyForm: FormState = {
  name: "",
  organisation: "",
  email: "",
  phone: "",
  quantity: "",
  deadline: "",
  details: "",
};

export function QuoteForm({ initialSlugs = [] }: { initialSlugs?: string[] }) {
  const { slugs, clear } = useQuoteList();
  const preselected = initialSlugs.length > 0 ? initialSlugs : slugs;

  const [selected, setSelected] = useState<string[]>(preselected);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const selectedNames = useMemo(
    () =>
      selected
        .map((slug) => allItems.find((item) => item.slug === slug)?.name)
        .filter((name): name is string => Boolean(name)),
    [selected]
  );

  function toggleService(slug: string) {
    setSelected((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }

  function update<K extends keyof FormState>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const summary = [
    `Quote request from ${form.name || "—"}`,
    form.organisation ? `Organisation: ${form.organisation}` : null,
    selectedNames.length ? `Services: ${selectedNames.join(", ")}` : null,
    form.quantity ? `Quantity: ${form.quantity}` : null,
    form.deadline ? `Needed by: ${form.deadline}` : null,
    form.email ? `Email: ${form.email}` : null,
    form.phone ? `Phone: ${form.phone}` : null,
    form.details ? `Details: ${form.details}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, services: selected }),
      });
      if (response.ok) {
        setStatus("sent");
        clear();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="pm-card flex flex-col items-start gap-3 p-8">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-brand text-white">
          <CheckIcon className="h-6 w-6" />
        </span>
        <h2 className="text-xl">Quote request received</h2>
        <p className="text-brand-muted">
          Thank you, {form.name || "friend"}. A member of the PromoLink team will
          come back to you with pricing and timing. If it is urgent, call{" "}
          {site.phones[0]} or send the same details on WhatsApp for a faster reply.
        </p>
        <a
          href={whatsappLink(summary)}
          target="_blank"
          rel="noopener noreferrer"
          className="pm-btn pm-btn-secondary"
        >
          <WhatsAppIcon className="h-4 w-4" />
          Send on WhatsApp too
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="pm-card grid gap-6 p-6 sm:p-8">
      <fieldset className="grid gap-4 border-0 p-0">
        <legend className="mb-1 text-sm font-bold uppercase tracking-[0.14em] text-brand-muted">
          1. Who is asking
        </legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name" required>
            <input
              required
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className={inputClass}
              autoComplete="name"
            />
          </Field>
          <Field label="Organisation">
            <input
              value={form.organisation}
              onChange={(e) => update("organisation", e.target.value)}
              className={inputClass}
              autoComplete="organization"
            />
          </Field>
          <Field label="Email" required>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className={inputClass}
              autoComplete="email"
            />
          </Field>
          <Field label="Phone / WhatsApp" required>
            <input
              required
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className={inputClass}
              autoComplete="tel"
            />
          </Field>
        </div>
      </fieldset>

      <fieldset className="grid gap-3 border-0 p-0">
        <legend className="mb-1 text-sm font-bold uppercase tracking-[0.14em] text-brand-muted">
          2. What do you need printed
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {categories.map((category) => (
            <div
              key={category.slug}
              className="rounded-xl border border-brand-border p-3"
            >
              <p className="mb-2 text-sm font-semibold">{category.name}</p>
              <ul className="grid list-none gap-1.5 p-0">
                {category.items.map((item) => (
                  <li key={item.slug}>
                    <label className="flex cursor-pointer items-center gap-2 text-sm text-brand-muted">
                      <input
                        type="checkbox"
                        checked={selected.includes(item.slug)}
                        onChange={() => toggleService(item.slug)}
                        className="h-4 w-4 accent-[var(--brand-primary)]"
                      />
                      {item.name}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </fieldset>

      <fieldset className="grid gap-4 border-0 p-0">
        <legend className="mb-1 text-sm font-bold uppercase tracking-[0.14em] text-brand-muted">
          3. The details
        </legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Quantity">
            <input
              value={form.quantity}
              onChange={(e) => update("quantity", e.target.value)}
              className={inputClass}
              placeholder="e.g. 500 copies"
            />
          </Field>
          <Field label="Needed by">
            <input
              value={form.deadline}
              onChange={(e) => update("deadline", e.target.value)}
              className={inputClass}
              placeholder="e.g. 12 March"
            />
          </Field>
        </div>
        <Field label="Anything else we should know">
          <textarea
            rows={4}
            value={form.details}
            onChange={(e) => update("details", e.target.value)}
            className={inputClass}
            placeholder="Sizes, materials, delivery address, whether you need design support…"
          />
        </Field>
      </fieldset>

      {status === "error" ? (
        <p className="rounded-xl bg-brand-light p-3 text-sm text-brand-strong">
          Something went wrong sending that. Please try again, or send the
          details straight to {site.email}.
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={status === "sending"}
          className="pm-btn pm-btn-primary disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send quote request"}
        </button>
        <a
          href={whatsappLink(summary)}
          target="_blank"
          rel="noopener noreferrer"
          className="pm-btn pm-btn-outline"
        >
          <WhatsAppIcon className="h-4 w-4" />
          Send on WhatsApp
        </a>
      </div>

      <p className="text-xs text-brand-muted">
        TODO: artwork upload is not live yet — describe the files in the notes and
        we will send a secure link, or use the WhatsApp button.
      </p>
    </form>
  );
}

const inputClass =
  "w-full rounded-xl border border-brand-border bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-brand";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-sm font-medium text-brand-dark">
        {label}
        {required ? <span className="text-brand-secondary"> *</span> : null}
      </span>
      {children}
    </label>
  );
}