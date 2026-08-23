import Link from "next/link";
import { Megaphone } from "lucide-react";

// Clone of iiti.ac.in's .announcement-section: a bullhorn pill followed by a
// continuously scrolling marquee of announcement links. The track is rendered
// twice so the loop is seamless.
const ANNOUNCEMENTS: { label: string; href: string }[] = [
  { label: "Registrations opening soon — Malwa Chemical Conclave 2026", href: "/registration" },
  { label: "Conclave dates: October 12–13, 2026 at IIT Indore", href: "/schedule" },
  { label: "Call for Student Innovation Expo entries", href: "/about" },
  { label: "Sponsorship opportunities now open", href: "/sponsors" },
];

export function AnnouncementTicker() {
  return (
    <section className="border-y border-white/20 bg-white/10 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold text-white">
          <Megaphone size={18} />
        </div>

        <div className="group relative flex-1 overflow-hidden">
          <div className="flex w-max animate-marquee gap-10 group-hover:[animation-play-state:paused]">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 gap-10" aria-hidden={copy === 1}>
                {ANNOUNCEMENTS.map((a) => (
                  <Link
                    key={a.label}
                    href={a.href}
                    className="whitespace-nowrap text-sm text-white/80 transition-colors hover:text-white sm:text-base"
                  >
                    {a.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
