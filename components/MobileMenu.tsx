"use client";

import Link from "next/link";
import { CloseIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { primaryNav, site, telLink, whatsappLink } from "@/lib/site";

/** Slide-over navigation for phones and tablets. */
export function MobileMenu({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] lg:hidden">
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 h-full w-full bg-slate-950/60 backdrop-blur-sm"
      />

      <div className="absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col bg-white shadow-2xl transition-colors duration-300 dark:bg-slate-950">
        <div className="flex items-center justify-between border-b border-brand-border px-5 py-4 dark:border-slate-800">
          <Logo href="/" />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="grid h-9 w-9 place-items-center rounded-full border border-brand-border text-brand-dark transition hover:border-brand hover:text-brand dark:border-slate-800 dark:text-slate-200"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-5">
          <ul className="grid gap-1">
            {primaryNav.map((entry) => (
              <li key={entry.href}>
                <Link
                  href={entry.href}
                  onClick={onClose}
                  className={`block rounded-xl px-3 py-3 text-base font-semibold transition ${
                    pathname.startsWith(entry.href)
                      ? "bg-brand-light text-brand"
                      : "text-brand-dark hover:bg-brand-light"
                  }`}
                >
                  {entry.label}
                </Link>

                {entry.children?.length ? (
                  <ul className="ml-3 grid gap-0.5 border-l border-brand-border pl-3">
                    {entry.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={onClose}
                          className="block rounded-lg px-3 py-2.5 text-sm font-medium text-brand-muted transition hover:bg-brand-light hover:text-brand"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>

          <div className="mt-6 grid gap-2 border-t border-brand-border pt-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-muted">
              Talk to us
            </p>
            {site.phones.map((phone) => (
              <a
                key={phone}
                href={telLink(phone)}
                className="flex items-center gap-2.5 text-sm font-semibold text-brand-dark"
              >
                <PhoneIcon className="h-4 w-4 text-brand" />
                {phone}
              </a>
            ))}
            <a
              href={`mailto:${site.email}`}
              className="break-all text-sm text-brand-muted"
            >
              {site.email}
            </a>
            <p className="text-sm text-brand-muted">{site.address.full}</p>
          </div>
        </nav>

        <div className="grid gap-2.5 border-t border-brand-border px-5 py-4 dark:border-slate-800">
          <Link href="/get-a-quote" onClick={onClose} className="pm-btn pm-btn-primary shadow-md">
            Get a Quote
          </Link>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="pm-btn pm-btn-whatsapp"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}