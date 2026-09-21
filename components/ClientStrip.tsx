import Image from "next/image";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { clients } from "@/lib/clients";

/**
 * "Our Clients" logo strip with smooth hover scale,
 * elevation, and dark mode support.
 */
export function ClientStrip() {
  return (
    <section className="border-y border-brand-border/80 bg-white py-12 transition-colors duration-300 dark:border-slate-800 dark:bg-[#0b0f17]">
      <div className="pm-container">
        <div className="mb-8 text-center">
          <p className="pm-eyebrow mb-2">Corporate Trust</p>
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            Organisations we design &amp; print for across Nigeria
          </h2>
        </div>

        <ul className="grid list-none grid-cols-2 gap-3.5 p-0 sm:grid-cols-3 lg:grid-cols-4">
          {clients.map((client) => (
            <li
              key={client.name}
              className="group flex min-h-24 items-center justify-center rounded-2xl border border-brand-border/80 bg-slate-50/50 px-4 py-5 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-brand/50 hover:bg-white hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-red-500/50 dark:hover:bg-slate-900"
            >
              {client.logo ? (
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={200}
                  height={100}
                  className="max-h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="text-center">
                  <ImagePlaceholder
                    variant="client"
                    label={client.short}
                    className="mx-auto mb-2.5 h-10 w-10 rounded-xl transition-transform duration-300 group-hover:scale-110 shadow-sm"
                  />
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-700 transition-colors group-hover:text-brand dark:text-slate-300 dark:group-hover:text-red-400">
                    {client.short}
                  </span>
                  <span className="block text-[10px] text-slate-400 dark:text-slate-500 line-clamp-1">
                    {client.name}
                  </span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}