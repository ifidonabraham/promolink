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

/** The four-step "Seamless Prints & Delivery" strip from the reference site. */
export function ProcessSteps() {
  return (
    <section className="pm-section border-b border-brand-border bg-white">
      <div className="pm-container">
        <header className="mx-auto mb-10 max-w-2xl text-center">
          <p className="pm-eyebrow mb-3">How it works</p>
          <h2 className="text-2xl sm:text-3xl">Seamless Prints &amp; Delivery</h2>
          <p className="mt-3 text-brand-muted">
            Four steps from idea to delivery — with a specialist consultant on
            hand throughout.
          </p>
        </header>

        <ol className="grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ title, body, Icon }, index) => (
            <li key={title} className="pm-card relative p-6">
              <span className="absolute right-5 top-5 text-4xl font-bold leading-none text-brand-light">
                {index + 1}
              </span>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand text-white">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-lg">{title}</h3>
              <p className="mt-2 text-sm text-brand-muted">{body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}