import { site, whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "@/components/icons";

/**
 * Persistent bottom-right WhatsApp button — same placement/behaviour as the
 * reference site (pinned across scroll, never hidden on mobile).
 */
export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-[#062b14] shadow-float transition hover:brightness-105"
      aria-label={`Chat with ${site.shortName} on WhatsApp`}
    >
      <WhatsAppIcon className="h-5 w-5" />
      <span className="hidden sm:inline">Chat on WhatsApp</span>
    </a>
  );
}