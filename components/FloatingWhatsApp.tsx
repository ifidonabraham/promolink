import { site, whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "@/components/icons";

/**
 * Persistent bottom-right WhatsApp button — animated pulsing beacon,
 * signature WhatsApp green gradient, and hover lift.
 */
export function FloatingWhatsApp() {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center">
      {/* Pulsing Beacon Ring */}
      <span className="pointer-events-none absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping opacity-60" />

      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#25D366] to-[#1eb757] px-4 py-3.5 text-sm font-bold text-white shadow-[0_10px_30px_rgba(37,211,102,0.45)] transition-all duration-300 hover:scale-105 hover:shadow-[0_14px_38px_rgba(37,211,102,0.6)] active:scale-95 border border-white/25"
        aria-label={`Chat with ${site.shortName} on WhatsApp`}
      >
        <span className="relative flex h-5 w-5">
          <WhatsAppIcon className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
        </span>
        <span className="hidden sm:inline tracking-wide">Chat on WhatsApp</span>

        {/* Live indicator dot */}
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400 border-2 border-white" />
        </span>
      </a>
    </div>
  );
}