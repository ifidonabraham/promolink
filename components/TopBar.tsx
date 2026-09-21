import { MailIcon, PhoneIcon } from "@/components/icons";
import { site, telLink } from "@/lib/site";

/** Slim top call bar that sits above the sticky nav. */
export function TopBar() {
  return (
    <div className="bg-brand-secondary text-brand-dark transition-colors duration-300 dark:bg-brand-dark dark:text-white">
      <div className="pm-container flex flex-wrap items-center justify-between gap-1 py-2 text-xs sm:text-[0.8125rem]">
        <p className="flex items-center gap-2">
          <PhoneIcon className="h-4 w-4 text-brand dark:text-brand-secondary" />
          <span className="hidden sm:inline">Call us:</span>
          {site.phones.map((phone, index) => (
            <span key={phone} className="flex items-center gap-2">
              {index > 0 ? <span className="opacity-40">|</span> : null}
              <a
                href={telLink(phone)}
                className="font-medium transition hover:text-brand-secondary"
              >
                {phone}
              </a>
            </span>
          ))}
        </p>
        <p className="flex items-center gap-4">
          <a
            href={`mailto:${site.email}`}
            className="hidden items-center gap-1.5 transition hover:text-brand-secondary sm:flex"
          >
            <MailIcon className="h-4 w-4" />
            {site.email}
          </a>
          <span className="hidden opacity-70 lg:inline">{site.turnaround}</span>
        </p>
      </div>
    </div>
  );
}
