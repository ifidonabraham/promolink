import Link from "next/link";
import { Logo } from "@/components/Logo";
import { MailIcon, PhoneIcon, PinIcon, socialIcon } from "@/components/icons";
import { categories } from "@/lib/catalog";
import { footerNav, site, telLink } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-brand-border bg-brand-light">
      <div className="pm-container grid gap-10 py-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.3fr] lg:py-16">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-brand-muted">
            {site.legalName} — design, print, branding and corporate promotion
            from the heart of Lagos. Previously trading as {site.formerName}.
          </p>
          <p className="pm-script mt-4 text-lg leading-snug text-brand-dark">“{site.tagline}”</p>
        </div>

        <FooterColumn title="Get to know PromoLink" links={footerNav.getToKnow} />
        <FooterColumn title="Legal" links={footerNav.legal} />

        <nav aria-labelledby="footer-services">
          <h2
            id="footer-services"
            className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-brand-dark"
          >
            Popular Services
          </h2>
          <ul className="grid gap-2.5">
            {footerNav.frequentlyOrdered.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-brand-muted transition hover:text-brand"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/all-products"
                className="text-sm font-semibold text-brand transition hover:text-brand-strong"
              >
                All categories →
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-brand-dark">
            We are within reach
          </h2>
          <ul className="grid gap-3 text-sm text-brand-muted">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="flex items-start gap-2.5 break-all transition hover:text-brand"
              >
                <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                {site.email}
              </a>
            </li>
            <li className="flex flex-wrap items-start gap-x-2 gap-y-1">
              <span className="mt-0.5 flex items-center gap-2.5">
                <PhoneIcon className="h-4 w-4 shrink-0 text-brand" />
              </span>
              {site.phones.map((phone, index) => (
                <span key={phone} className="flex items-center gap-2">
                  {index > 0 ? <span className="text-brand-border">,</span> : null}
                  <a href={telLink(phone)} className="transition hover:text-brand">
                    {phone}
                  </a>
                </span>
              ))}
            </li>
            <li className="flex items-start gap-2.5">
              <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              <span>
                {site.address.street}, {site.address.area}, {site.address.city},{" "}
                {site.address.country}
              </span>
            </li>
          </ul>

          <ul className="mt-5 flex flex-wrap items-center gap-2.5">
            {site.socials.map((social) => {
              const Icon = socialIcon(social.icon);
              return (
                <li key={social.label}>
                  {/* TODO: replace "#" with PromoLink's real social profile URLs. */}
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className="grid h-9 w-9 place-items-center rounded-full border border-brand-border bg-white text-brand-dark transition hover:border-brand hover:text-brand"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-border">
        <div className="pm-container flex flex-col items-center justify-between gap-2 py-5 text-xs text-brand-muted sm:flex-row">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            {categories.slice(0, 3).map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="transition hover:text-brand"
              >
                {category.name}
              </Link>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  const id = title.toLowerCase().replace(/[^a-z]+/g, "-");
  return (
    <nav aria-labelledby={id}>
      <h2
        id={id}
        className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-brand-dark"
      >
        {title}
      </h2>
      <ul className="grid gap-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-brand-muted transition hover:text-brand"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}