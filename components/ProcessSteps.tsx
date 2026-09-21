import {
  ChatIcon,
  PaletteIcon,
  TruckIcon,
  UploadIcon,
} from "@/components/icons";

const steps = [
  {
    title: "Select a Service",
    body: "Choose from designing & branding, digital printing (large format & offset), signage, print & publishing, promotional items, stands & displays.",
    Icon: PaletteIcon,
  },
  {
    title: "Upload Your Design",
    body: "Send us your artwork, or opt to hire our designers and let the studio create it for you.",
    Icon: UploadIcon,
  },
  {
    title: "Place Order or Get a Quote",
    body: "Complete the job by WhatsApp, phone or the quote form on this site — we confirm quantity, material and timing first.",
    Icon: ChatIcon,
  },
  {
    title: "We Print & Deliver",
    body: "Most items are printed and delivered within 24–72 hours. Urgent job? Call the line or chat with us on WhatsApp.",
    Icon: TruckIcon,
  },
];

/** The four-step "Seamless Prints & Delivery" strip with rich hover animations and dark mode. */
export function ProcessSteps() {
  return (
    <section className="pm-section border-b border-brand-border/80 bg-white transition-colors duration-300 dark:border-slate-800/80 dark:bg-[#0b0f17]">
      <div className="pm-container">
        <header className="mx-auto mb-12 max-w-2xl text-center">
          <p className="pm-eyebrow mb-3">How it works</p>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl dark:text-white">
            Seamless Prints &amp; Delivery
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
            Four steps from idea to delivery — with a specialist consultant on
            hand throughout.
          </p>
        </header>

        <ol className="grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ title, body, Icon }, index) => (
            <li
              key={title}
              className="pm-card group relative flex flex-col p-6 transition-all duration-300 hover:-translate-y-2 hover:border-brand/40 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:hover:border-red-500/40"
            >
              {/* Subtle accent line on top */}
              <div
                className="absolute inset-x-0 top-0 h-1 rounded-t-xl bg-gradient-to-r from-transparent via-brand to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden="true"
              />

              {/* Large Step Index with clear contrast */}
              <span className="absolute right-5 top-4 text-4xl font-black leading-none text-slate-200 transition-colors duration-300 group-hover:text-brand/20 dark:text-slate-800 dark:group-hover:text-red-500/20">
                0{index + 1}
              </span>

              {/* Icon Container with gradient & hover pulse */}
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-tr from-brand to-rose-600 text-white shadow-md shadow-brand/30 transition-transform duration-300 group-hover:scale-110">
                <Icon className="h-6 w-6" />
              </span>

              <h3 className="mt-5 text-lg font-bold text-slate-900 transition-colors group-hover:text-brand dark:text-white">
                {title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}