import Link from "next/link";
import Image from "next/image";
import { ServiceArtwork } from "@/components/ServiceArtwork";
import { priceLabel, serviceImage, type ServiceItem } from "@/lib/catalog";

/**
 * Product/service card — same anatomy as the reference site:
 * image, "MIN: X unit(s)" tag, name, price line, quote action.
 */
export function ProductCard({
  item,
  priority = false,
}: {
  item: ServiceItem;
  priority?: boolean;
}) {
  return (
    <article className="pm-card group flex h-full flex-col overflow-hidden transition hover:-translate-y-0.5 hover:shadow-float">
      <Link
        href={`/services/${item.slug}`}
        className="relative block aspect-[4/3] w-full overflow-hidden bg-brand-light"
        aria-label={item.name}
      >
        {serviceImage(item) ? (
          <Image
            src={serviceImage(item)!}
            alt={`${item.name} service example`}
            fill
            sizes="(max-width: 640px) 78vw, (max-width: 1024px) 46vw, 24vw"
            className="object-cover transition duration-700 group-hover:scale-[1.03]"
            priority={priority}
          />
        ) : (
          <ServiceArtwork item={item} className="h-full w-full transition duration-700 group-hover:scale-[1.03]" />
        )}

        {typeof item.minimumUnits === "number" ? (
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-brand-dark shadow-sm">
            MIN: {item.minimumUnits} unit{item.minimumUnits === 1 ? "" : "s"}
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <h3 className="text-[1.0625rem] leading-snug">
          <Link href={`/services/${item.slug}`} className="hover:text-brand">
            {item.name}
          </Link>
        </h3>
        <p className="text-sm text-brand-muted">{item.descriptor}</p>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-4">
          <span className="text-sm font-bold text-brand">{priceLabel(item)}</span>
          <Link
            href={`/get-a-quote?service=${item.slug}`}
            className="pm-btn pm-btn-outline pm-btn-sm"
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </article>
  );
}
