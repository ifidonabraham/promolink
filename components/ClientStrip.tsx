import Image from "next/image";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { clients } from "@/lib/clients";

/**
 * "Our Clients" logo strip. TODO: swap each placeholder for the real client
 * logo file — see lib/clients.ts.
 */
export function ClientStrip() {
  return (
    <section className="border-y border-brand-border bg-white py-10">
      <div className="pm-container">
        <h2 className="mb-6 text-center text-xs font-bold uppercase tracking-[0.18em] text-brand-muted">
          Organisations we print for
        </h2>

        <ul className="grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-3 lg:grid-cols-4">
          {clients.map((client) => (
            <li
              key={client.name}
              className="flex min-h-20 items-center justify-center rounded-xl border border-brand-border bg-white px-3 py-4 transition hover:border-brand/40 hover:shadow-card"
            >
              {client.logo ? (
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={200}
                  height={100}
                  className="max-h-14 w-auto object-contain"
                />
              ) : (
                <span className="text-center">
                  <ImagePlaceholder
                    variant="client"
                    label={client.short}
                    className="mx-auto mb-2 h-9 w-9 rounded-lg"
                  />
                  <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-brand-muted">
                    {client.short}
                  </span>
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}