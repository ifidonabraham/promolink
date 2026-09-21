import type { ServiceItem } from "@/lib/catalog";

const ink = "#17202a";
const terracotta = "#d95a43";
const cream = "#f0d9b8";
const cyan = "#2d9fbd";
const green = "#75ae39";

export function ServiceArtwork({ item, className = "" }: { item: ServiceItem; className?: string }) {
  const slug = item.slug;
  const kind = slug === "letterhead" ? "letterhead" :
    slug === "business-card" ? "business-card" :
    slug === "corporate-identity-package" ? "identity" :
    slug === "billboard" ? "billboard" :
    slug === "banner" ? "banner" :
    slug === "sticker" ? "sticker" :
    slug === "car-branding" ? "car" :
    slug === "logo-design" ? "logo" :
    slug.includes("t-shirt") || slug.includes("cap") || slug.includes("promotional") || slug.includes("screen") ? "merch" :
    slug.includes("magazine") || slug.includes("brochure") || slug.includes("report") || slug.includes("booklet") || slug.includes("pamphlet") || slug.includes("calendar") ? "publication" :
    slug.includes("sign") || slug.includes("light-box") || slug.includes("metal") || slug === "awards" ? "signage" : "production";

  return (
    <svg viewBox="0 0 800 600" role="img" aria-label={`${item.name} sample artwork`} className={className} preserveAspectRatio="xMidYMid slice">
      <rect width="800" height="600" fill="#fffdf9" />
      <path d="M0 0h180L0 180zM800 600H620l180-180z" fill={cream} opacity=".72" />
      <path d="M0 0h105L0 105zM800 600H695l105-105z" fill={terracotta} opacity=".78" />
      <path d="M0 600V450l150 150zM800 0V150L650 0z" fill={cyan} opacity=".18" />
      <ArtworkContent kind={kind} item={item} />
      <text x="42" y="552" fill={ink} fontFamily="Georgia, serif" fontSize="17" letterSpacing="3">PROMOLINK PRINT CONCEPTS</text>
      <text x="758" y="552" fill={terracotta} textAnchor="end" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="700">LAGOS / NIGERIA</text>
    </svg>
  );
}

function ArtworkContent({ kind, item }: { kind: string; item: ServiceItem }) {
  if (kind === "letterhead") return <Letterhead />;
  if (kind === "business-card") return <BusinessCard />;
  if (kind === "identity") return <Identity />;
  if (kind === "billboard") return <Billboard />;
  if (kind === "banner") return <Banner />;
  if (kind === "sticker") return <Sticker />;
  if (kind === "car") return <CarBranding />;
  if (kind === "logo") return <LogoBoard />;
  if (kind === "merch") return <Merch />;
  if (kind === "publication") return <Publication />;
  if (kind === "signage") return <Signage />;
  return <Production item={item} />;
}

function Letterhead() {
  return <>
    <rect x="102" y="78" width="596" height="394" rx="5" fill="white" stroke="#ded4cc" strokeWidth="3" />
    <rect x="102" y="78" width="596" height="34" fill={terracotta} />
    <text x="138" y="165" fill={terracotta} fontFamily="Georgia, serif" fontSize="31" fontWeight="700">PROMOLINK</text>
    <text x="140" y="190" fill={ink} fontFamily="Arial, sans-serif" fontSize="11" letterSpacing="3">PRINT CONCEPTS LIMITED</text>
    <path d="M138 212h520" stroke={cream} strokeWidth="5" />
    <text x="138" y="248" fill={ink} fontFamily="Arial, sans-serif" fontSize="13">2nd Floor, Right Wing, Emmanuel Plaza</text>
    <text x="138" y="270" fill={ink} fontFamily="Arial, sans-serif" fontSize="13">23b Fatai Atere Way, Matori, Mushin, Lagos</text>
    <text x="138" y="334" fill="#777" fontFamily="Georgia, serif" fontSize="16">Professional print correspondence</text>
    <path d="M138 363h345M138 383h410M138 403h280" stroke="#c8c0ba" strokeWidth="5" />
    <circle cx="632" cy="178" r="38" fill={cyan} opacity=".22" /><circle cx="632" cy="178" r="20" fill={green} opacity=".8" />
  </>;
}

function BusinessCard() {
  return <>
    <rect x="115" y="118" width="570" height="205" rx="12" fill={terracotta} transform="rotate(-5 400 220)" />
    <path d="M115 265h570v58H115z" fill={ink} transform="rotate(-5 400 220)" />
    <text x="164" y="195" fill="white" fontFamily="Georgia, serif" fontSize="32" fontWeight="700" transform="rotate(-5 164 195)">PROMOLINK</text>
    <text x="166" y="220" fill={cream} fontFamily="Arial, sans-serif" fontSize="11" letterSpacing="3" transform="rotate(-5 166 220)">PRINT CONCEPTS</text>
    <text x="176" y="285" fill="white" fontFamily="Arial, sans-serif" fontSize="14" transform="rotate(-5 176 285)">0803 430 2582  |  Lagos, Nigeria</text>
    <rect x="176" y="350" width="448" height="130" rx="10" fill="white" stroke={cream} strokeWidth="3" />
    <text x="204" y="400" fill={ink} fontFamily="Arial, sans-serif" fontSize="22" fontWeight="700">CHRIS A. ADENIYI</text>
    <text x="204" y="426" fill={terracotta} fontFamily="Arial, sans-serif" fontSize="14">Executive Chairman</text>
    <text x="204" y="455" fill="#777" fontFamily="Arial, sans-serif" fontSize="12">promolinkmedia2010@gmail.com</text>
  </>;
}

function Identity() {
  return <>
    <rect x="128" y="94" width="544" height="390" rx="6" fill="white" stroke="#ddd2cb" strokeWidth="3" />
    <rect x="128" y="94" width="170" height="390" fill={ink} />
    <text x="163" y="212" fill="white" fontFamily="Georgia, serif" fontSize="27" fontWeight="700" transform="rotate(-90 163 212)">IDENTITY SYSTEM</text>
    <circle cx="214" cy="388" r="42" fill={terracotta} /><path d="M193 388h42M214 367v42" stroke="white" strokeWidth="8" />
    <text x="340" y="155" fill={terracotta} fontFamily="Georgia, serif" fontSize="29" fontWeight="700">PROMOLINK</text>
    <text x="340" y="183" fill="#777" fontFamily="Arial, sans-serif" fontSize="12" letterSpacing="2">CORPORATE BRAND GUIDELINES</text>
    <rect x="340" y="220" width="98" height="98" fill={terracotta} /><rect x="458" y="220" width="98" height="98" fill={cyan} /><rect x="576" y="220" width="58" height="98" fill={green} />
    <text x="340" y="366" fill={ink} fontFamily="Arial, sans-serif" fontSize="14">Logo suite  •  stationery</text>
    <text x="340" y="390" fill={ink} fontFamily="Arial, sans-serif" fontSize="14">signage  •  merchandise</text>
    <path d="M340 427h290" stroke={cream} strokeWidth="12" />
  </>;
}

function Billboard() {
  return <><rect x="85" y="160" width="630" height="235" fill={ink} stroke={terracotta} strokeWidth="15" /><path d="M85 160h630v55H85z" fill={terracotta} /><text x="125" y="205" fill="white" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="700" letterSpacing="4">PROMOLINK PRINT CONCEPTS</text><text x="125" y="294" fill="white" fontFamily="Georgia, serif" fontSize="54" fontWeight="700">MAKE YOUR BRAND</text><text x="125" y="350" fill={cream} fontFamily="Georgia, serif" fontSize="54" fontWeight="700">IMPOSSIBLE TO MISS</text><circle cx="646" cy="303" r="48" fill={cyan} /><text x="646" y="310" fill="white" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="700">LAGOS</text><path d="M200 395v80M600 395v80" stroke={ink} strokeWidth="12" /></>;
}

function Banner() { return <><path d="M210 500V114h270v386" fill="white" stroke="#d5cac1" strokeWidth="4" /><path d="M210 114h270v82H210z" fill={terracotta} /><text x="250" y="168" fill="white" fontFamily="Arial, sans-serif" fontSize="21" fontWeight="700">PROMOLINK</text><text x="255" y="250" fill={ink} fontFamily="Georgia, serif" fontSize="38" fontWeight="700">PRINT.</text><text x="255" y="294" fill={cyan} fontFamily="Georgia, serif" fontSize="38" fontWeight="700">BRAND.</text><text x="255" y="338" fill={green} fontFamily="Georgia, serif" fontSize="38" fontWeight="700">PROMOTE.</text><path d="M255 382h160M255 406h118" stroke={cream} strokeWidth="9" /><path d="M210 500h-25M480 500h25" stroke={ink} strokeWidth="8" /></>; }

function Sticker() { return <><circle cx="255" cy="284" r="128" fill={terracotta} /><circle cx="255" cy="284" r="101" fill="white" /><path d="M216 280l30-45 30 45-30 46z" fill={cyan} /><text x="255" y="356" fill={ink} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="700">MADE IN LAGOS</text><circle cx="560" cy="240" r="92" fill={green} /><circle cx="560" cy="240" r="70" fill="white" /><text x="560" y="234" fill={terracotta} textAnchor="middle" fontFamily="Georgia, serif" fontSize="22" fontWeight="700">PROMO</text><text x="560" y="260" fill={ink} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="15" fontWeight="700">LINK</text><path d="M436 410h200" stroke={cream} strokeWidth="18" /></>; }

function CarBranding() { return <><path d="M165 372h72l50-104c8-18 24-28 44-28h169c22 0 39 10 50 29l44 103h22c19 0 34 15 34 34v28H130v-28c0-19 16-34 35-34z" fill={cyan} stroke={ink} strokeWidth="8" /><path d="M306 252h172l31 80H266z" fill="#c9edf1" stroke={ink} strokeWidth="5" /><circle cx="236" cy="438" r="38" fill={ink} /><circle cx="236" cy="438" r="17" fill="white" /><circle cx="568" cy="438" r="38" fill={ink} /><circle cx="568" cy="438" r="17" fill="white" /><text x="396" y="381" fill="white" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="27" fontWeight="700">PROMOLINK</text><text x="396" y="408" fill={cream} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="13" letterSpacing="2">PRINT • BRAND • DELIVER</text></>; }

function LogoBoard() { return <><rect x="130" y="130" width="540" height="320" rx="8" fill={terracotta} /><text x="400" y="270" fill="white" textAnchor="middle" fontFamily="Georgia, serif" fontSize="62" fontWeight="700">PROMOLINK</text><text x="400" y="310" fill={cream} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="16" letterSpacing="6">PRINT CONCEPTS</text><path d="M260 360h280" stroke={cyan} strokeWidth="16" /></>; }

function Merch() { return <><path d="M190 183l82-43h256l82 43-56 92-49-29v190H295V246l-49 29z" fill={terracotta} stroke={ink} strokeWidth="7" /><path d="M350 142h100v72H350z" fill={cream} /><text x="400" y="306" fill="white" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="27" fontWeight="700">PROMOLINK</text><text x="400" y="337" fill={cream} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="13" letterSpacing="3">TEAM LAGOS</text><path d="M300 393h200" stroke={cyan} strokeWidth="12" /></>; }

function Publication() { return <><rect x="210" y="120" width="270" height="350" fill={terracotta} transform="rotate(-7 345 295)" /><rect x="330" y="140" width="270" height="350" fill={ink} transform="rotate(7 465 315)" /><text x="346" y="260" fill="white" fontFamily="Georgia, serif" fontSize="31" fontWeight="700" transform="rotate(7 346 260)">LAGOS</text><text x="348" y="300" fill={cream} fontFamily="Georgia, serif" fontSize="31" fontWeight="700" transform="rotate(7 348 300)">BRANDS</text><path d="M374 350h135" stroke={cyan} strokeWidth="15" transform="rotate(7 374 350)" /></>; }

function Signage() { return <><rect x="160" y="125" width="480" height="270" fill={ink} stroke={terracotta} strokeWidth="14" /><text x="400" y="240" fill="white" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="35" fontWeight="700">YOUR OFFICE</text><text x="400" y="288" fill={cyan} textAnchor="middle" fontFamily="Georgia, serif" fontSize="28">STARTS HERE</text><path d="M270 350h260" stroke={cream} strokeWidth="10" /><path d="M285 395v80M515 395v80" stroke={ink} strokeWidth="10" /></>; }

function Production({ item }: { item: ServiceItem }) { return <><rect x="124" y="126" width="552" height="334" rx="10" fill="white" stroke="#ddd2cb" strokeWidth="4" /><rect x="124" y="126" width="552" height="62" fill={terracotta} /><text x="156" y="166" fill="white" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="700">PROMOLINK / PRODUCTION</text><text x="156" y="270" fill={ink} fontFamily="Georgia, serif" fontSize="34" fontWeight="700">{item.name}</text><text x="156" y="310" fill="#777" fontFamily="Arial, sans-serif" fontSize="16">Designed, produced and delivered in Lagos.</text><path d="M156 365h380M156 393h280" stroke={cream} strokeWidth="12" /></>; }
