import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone, ExternalLink } from "lucide-react";

const QUICK_LINKS = [
  { label: "About", href: "/about" },
  { label: "Schedule", href: "/schedule" },
  { label: "Invited Speakers", href: "/speakers" },
  { label: "Registration", href: "/registration" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "Organizers", href: "/organizers" },
  { label: "Contact", href: "/contact" },
];

const DEPT_LINKS = [
  { label: "IIT Indore Home", href: "https://www.iiti.ac.in/", external: true },
  { label: "Dept. of Chemical Engineering", href: "https://www.iiti.ac.in/academics", external: true },
  { label: "Bureau of Indian Standards", href: "https://www.bis.gov.in/", external: true },
];

export function Footer() {
  return (
    <footer className="border-t-2 border-gold bg-navy-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        {/* Column 1: Logo + event info */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3">
            <Image
              src="/logos/iit-indore-emblem.png"
              alt="IIT Indore emblem"
              width={40}
              height={30}
              className="h-8 w-auto brightness-0 invert"
            />
            <Image
              src="/logos/chemical-engineering-logo.png"
              alt="IIT Indore Chemical Engineering logo"
              width={32}
              height={32}
              className="h-8 w-8 brightness-0 invert"
            />
          </div>
          <p className="mt-4 text-sm font-semibold text-gold">
            Malwa Chemical Conclave 2026
          </p>
          <p className="mt-2 text-sm leading-relaxed text-white/60">
            An initiative of the BIS Student Chapter, Department of Chemical
            Engineering, IIT Indore, in association with the Bureau of Indian
            Standards.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-gold">
            Quick Links
          </p>
          <ul className="mt-4 space-y-2">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Affiliations */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-gold">
            Affiliations
          </p>
          <ul className="mt-4 space-y-2">
            {DEPT_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-white/60 transition-colors hover:text-white"
                >
                  {link.label}
                  {link.external && <ExternalLink size={12} />}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-gold">
            Contact
          </p>
          <ul className="mt-4 space-y-3 text-sm text-white/60">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-gold" />
              <span>
                Department of Chemical Engineering, IIT Indore, Simrol, 453552,
                Indore–Khandwa Road, Indore, MP
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="shrink-0 text-gold" />
              <a
                href="mailto:chemenggoffice@iiti.ac.in"
                className="transition-colors hover:text-white"
              >
                chemenggoffice@iiti.ac.in
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="shrink-0 text-gold" />
              <span>+91 731 2438 700</span>
            </li>
          </ul>

          {/* Social row */}
          <div className="mt-5 flex gap-2">
            {["Facebook", "Twitter", "Instagram", "YouTube"].map((label) => (
              <a
                key={label}
                href="#"
                className="rounded-sm border border-white/15 px-3 py-1.5 text-xs font-medium text-white/50 transition-colors hover:border-gold hover:text-gold"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/40 sm:px-6 lg:px-8">
        &copy; 2026 Department of Chemical Engineering, IIT Indore. All rights
        reserved.
      </div>
    </footer>
  );
}
