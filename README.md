# PromoLink Print Concepts — website

Marketing and service-catalogue website for **PromoLink Print Concepts Limited**
(formerly Promolink Media Concept), Lagos: printing, corporate branding,
signage and promotional services.

Built with **Next.js 15 (App Router) · React 19 · Tailwind CSS v4 · TypeScript**,
deployable to **Vercel**. v1 is intentionally **quote-driven** — there is no
online checkout; every conversion path is the quote form, WhatsApp or a phone
call.

---

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm start            # serve the production build
```

Node 20+ recommended (developed on Node 22).

---

## Project structure

```
app/
  layout.tsx                    Header / footer / newsletter / floating WhatsApp, fonts, metadata
  page.tsx                      Home: hero, 4-step process, category carousels, clients, about, team
  globals.css                   Brand tokens (CSS variables) + Tailwind v4 theme mapping + pm-* utilities
  all-products/                 Full catalogue grid
  category/[slug]/              One category, with sibling-category sidebar
  services/[slug]/              Service detail: highlights, min order, turnaround, quote actions
  get-a-quote/                  Quote request form (+ ?service= and ?promo= deep links)
  hire-a-designer/              Design-support landing page
  about/  our-team/             Company story, facilities, leadership bios
  contact/  faqs/  blog/        Contact + map, FAQ accordion, blog placeholder
  privacy-policy/  terms-and-conditions/
  not-found.tsx  sitemap.ts  robots.ts
  api/quote/  api/subscribe/    Route handlers that save leads (Supabase, if configured)
components/                     Header, TopBar, MobileMenu, SearchPanel, Hero, PromoBanner,
                                ProcessSteps, Carousel, ProductCard, Testimonials, ClientStrip,
                                AboutStrip, TeamGrid, TrustCtaBanner, NewsletterBar, Footer,
                                QuoteForm, QuoteList, FloatingWhatsApp, ImagePlaceholder, icons
lib/
  site.ts                       Identity, contacts, nav, WhatsApp/tel helpers, PRICING MODE FLAG
  catalog.ts                    6 categories, 24 services (single source of truth)
  team.ts  clients.ts  facilities.ts  promos.ts  testimonials.ts  leads.ts
public/                         brand/ clients/ facilities/ team/ — assets from the company profile
docs/                           Profile text extract + the asset-to-source mapping
reference/                      printhouse.ng layout study (NOT imported by the app; safe to delete)
```

## 1. Brand palette — replace one block

The official PromoLink palette has **not** been supplied yet, so
`app/globals.css` ships with a deliberate, neutral placeholder palette exposed as
CSS variables:

```css
:root {
  --brand-primary: #16324f;         /* TODO(brand) */
  --brand-primary-strong: #0e2338;  /* TODO(brand) */
  --brand-secondary: #e0a325;       /* TODO(brand) */
  --brand-accent: #1f8a94;          /* TODO(brand) */
  --brand-dark: #0a121c;            /* TODO(brand) */
  --brand-light: #f5f7fa;           /* TODO(brand) */
}
```

Swap **only those hex values**. Every component consumes them through Tailwind
utilities (`bg-brand`, `text-brand-secondary`, …) or the `pm-*` classes, so the
whole site re-skins without touching a component.

## 2. Pricing display — one flag

`lib/site.ts`:

```ts
pricingMode: "quote" as "quote" | "from",
```

* `"quote"` (current default) — cards show **“Request a Quote”**, no public pricing.
* `"from"` — cards show **“From ₦X”**, using each service's `priceFrom` value in
  `lib/catalog.ts` (currently `null`, so set those first).

This is the decision point flagged in the brief; flip the one value once the call
is made.

## 3. Everything waiting on client assets

Search the codebase for **`TODO`** — every placeholder is tagged. **Already wired
from the company profile PDF**: the homepage hero artwork, all 8 facility photos,
all 4 leadership headshots, the authentic PromoLink logo (light & dark versions),
and all 8 client logos.

Still outstanding:

| Where | What is needed |
| --- | --- |
| `lib/catalog.ts` | Additional individual product photography beyond existing samples |
| `lib/testimonials.ts` | **empty on purpose** — real quotes only, none invented |
| `lib/promos.ts` | real current promotions |
| `lib/site.ts` | real social handles, confirmed turnaround, production domain |
| `app/contact` | confirmed opening hours |
| `components/NewsletterBar.tsx`, `lib/leads.ts` | wire up Supabase before launch |

Drop new images in `public/` (e.g. `public/services/business-card.jpg`) and set
the matching `image` path — the branded `ImagePlaceholder` SVG only renders while
a field is `null`. Everything extracted from the PDF is kept in `_pdf_extract/`
(gitignored) if you want to mine it for more service photography.

## 4. Optional Supabase persistence

The site works without a backend. To persist leads, create two tables and add the
env vars below.

```sql
create table public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  organisation text,
  email text not null,
  phone text not null,
  services text[] default '{}',
  quantity text,
  deadline text,
  details text,
  source text,
  created_at timestamptz not null default now()
);

create table public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

-- The site writes with the service-role key, so RLS can stay closed to anon.
alter table public.quote_requests enable row level security;
alter table public.newsletter_subscribers enable row level security;
```

```
SUPABASE_URL=https://<project>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
NEXT_PUBLIC_SITE_URL=https://promolink.ng
```

## 5. Quote list (the cart slot)

There is no e-commerce, so the header cart icon is a **quote list**: services you
tick are remembered in `localStorage` and pre-selected in the quote form. See
`components/QuoteList.tsx`.

---

## Client details wired into the build

* **Office** — 2nd Floor, Right Wing, Emmanuel Plaza, 23b Fatai Atere Way,
  Matori, Mushin, Lagos
* **Phone** — 0803 430 2582 · 0803 261 6222
* **Email** — promolinkmedia2010@gmail.com
* **WhatsApp** — +234 803 430 2582 (floating button, header icon, quote form)
* **Clients** — CITN · Medbury Medical Services · CIPM Nigeria · Guinea Insurance
  Plc · Tiger Shipping · Pampers Private School · SMADAC Securities · PEERS
  Consulting
* **Leadership** — Chris' A. Adeniyi (Executive Chairman) · Odelusi Banke
  (Business Development Executive) · Adeyemi Abiona (Head of Operations) ·
  Ebenezer Adekusibe (Finance & Client Accounts)

## Deploying to Vercel

1. Push the repository to GitHub/GitLab/Bitbucket.
2. Import it in Vercel — the framework is detected automatically.
3. Add the environment variables from `.env.example` (only the Supabase ones are
   needed to persist leads; the site runs fine without them).
4. Deploy. `sitemap.xml` and `robots.txt` are generated from `lib/site.ts`, so
   update `site.url` once the production domain is live.

---

## What was reproduced from the reference site

The information architecture and interaction pattern (sticky header with call
bar, hero with promo slot, 4-step process strip, category carousels with arrow
navigation, product-card anatomy, testimonial carousel, client-logo strip,
mid-page CTA banner, newsletter bar, multi-column footer, floating WhatsApp
button) follow the printhouse.ng pattern the brief asked for. **No copy, code,
colour, logo or image asset was taken from that site** — the palette is a
placeholder, all copy is PromoLink's own, and imagery is either the branded
placeholder SVG or `TODO`-tagged for replacement.
