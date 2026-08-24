"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

/* ── Social SVG icons ─────────────────────────────────────────── */

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

/* ── Navigation links ──────────────────────────────────────────── */
const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Schedule", href: "/schedule" },
  { label: "Speakers", href: "/speakers" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "Organizers", href: "/organizers" },
  { label: "Venue", href: "/accommodation-venue" },
  { label: "Registration", href: "/registration" },
  { label: "Contact", href: "/contact" },
];

/* ── Mega menu tab content ─────────────────────────────────────── */
const MEGA_TABS = [
  {
    id: "about",
    label: "About",
    columns: [
      {
        heading: "The Conclave",
        links: [
          { label: "About MCC 2026", href: "/about" },
          { label: "Theme & Vision", href: "/about#theme" },
          { label: "Key Highlights", href: "/about#highlights" },
        ],
      },
      {
        heading: "Department",
        links: [
          { label: "Chemical Engineering, IIT Indore", href: "https://chemical.iiti.ac.in/" },
          { label: "IIT Indore Home", href: "https://www.iiti.ac.in/" },
        ],
      },
    ],
  },
  {
    id: "program",
    label: "Programme",
    columns: [
      {
        heading: "Verticals",
        links: [
          { label: "Industry Talks", href: "/schedule#talks" },
          { label: "Industry Matchmaking", href: "/schedule#matchmaking" },
          { label: "Student Innovation Expo", href: "/schedule#expo" },
          { label: "BIS Panel Discussion", href: "/schedule#panel" },
        ],
      },
      {
        heading: "Events",
        links: [
          { label: "Hands-on Workshops", href: "/schedule#workshops" },
          { label: "Annual Outlook Release", href: "/schedule#outlook" },
          { label: "Awards Programme", href: "/schedule#awards" },
          { label: "Full Schedule", href: "/schedule" },
        ],
      },
    ],
  },
  {
    id: "connect",
    label: "Connect",
    columns: [
      {
        heading: "Get Involved",
        links: [
          { label: "Register Now", href: "/registration" },
          { label: "Become a Sponsor", href: "/sponsors" },
          { label: "Organizing Committee", href: "/organizers" },
        ],
      },
      {
        heading: "Reach Us",
        links: [
          { label: "Contact Information", href: "/contact" },
          { label: "Venue & Directions", href: "/accommodation-venue" },
          { label: "Accommodation", href: "/accommodation-venue#accommodation" },
        ],
      },
    ],
  },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("about");

  const onScroll = useCallback(() => {
    setScrolled(window.scrollY > 60);
  }, []);

  useEffect(() => {
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  // Close mega menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";

  return (
    <header
      className={cn(
        "site-header transition-all duration-700 ease-in-out",
        scrolled && "scrolled",
        !isHome ? "header-inner" : "header-home"
      )}
    >
      <LayoutGroup id="header-nav-group">
        {/* ── Tier 1: Top utility bar ──────────────────────────────── */}
        <div className={cn(
          "top-bar flex w-full items-center justify-between px-4 transition-all duration-700 ease-in-out sm:px-6 lg:px-8",
          !isHome ? "py-1 text-xs" : "py-1.5 text-xs sm:text-sm"
        )}>
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/company/bis-chem-iiti/?viewAsMember=true"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-gold transition-colors"
            >
              <LinkedInIcon />
            </a>
            <a
              href="https://www.instagram.com/bis_chem_iiti/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-gold transition-colors"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://x.com/IITIOfficial?lang=en"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-gold transition-colors"
            >
              <TwitterIcon />
            </a>

            <span className="divider" />

            <a
              href="https://www.iiti.ac.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline hover:text-gold transition-colors"
            >
              IIT Indore
            </a>

            <span className="divider hidden sm:inline" />

            <a
              href="https://chemical.iiti.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline hover:text-gold transition-colors"
            >
              Chemical Engineering
            </a>
          </div>

          <div className="flex items-center gap-3">
            <div className="lang-toggle">
              <span className="lang-btn active">en</span>
            </div>
          </div>
        </div>

        {/* ── Tier 2: Logo + Title on Left, Pill Nav on Right (Single Line on All Pages) ── */}
        <div className="flex w-full items-center justify-between px-4 py-2 transition-all duration-700 ease-in-out sm:px-6 lg:px-8 sm:py-3">
          <Link href="/" className="flex items-center gap-2.5 transition-all duration-700 ease-in-out sm:gap-3.5 shrink-0" onClick={() => setMenuOpen(false)}>
            <Image
              src="/logos/iit-indore-logo.png"
              alt="IIT Indore emblem"
              width={120}
              height={90}
              unoptimized
              className="h-10 sm:h-12 lg:h-13 w-auto shrink-0 transition-all duration-700 ease-in-out object-contain"
              priority
            />
            <div className="h-8 sm:h-9 w-px bg-white/30 transition-all duration-700 ease-in-out" />
            <span className="flex min-w-0 flex-col leading-tight transition-all duration-700 ease-in-out">
              <span className="text-sm sm:text-base lg:text-lg font-bold tracking-wide text-white transition-all duration-700 ease-in-out whitespace-nowrap">
                Malwa Chemical Conclave 2026
              </span>
              <span className="text-[10px] sm:text-xs font-medium text-white/75 transition-all duration-700 ease-in-out whitespace-nowrap">
                Dept. of Chemical Engineering, IIT Indore
              </span>
            </span>
          </Link>

          {/* Right side: Pill Nav in exact same line */}
          <div className="flex items-center gap-3">
            <nav className="hidden lg:flex items-center">
              <div className="pill-nav pill-nav-compact transition-all duration-700 ease-in-out">
                {NAV_LINKS.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      data-active={active}
                      className="transition-all duration-700 ease-in-out"
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </nav>

            {/* Mobile hamburger */}
            <button
              type="button"
              aria-label="Toggle navigation menu"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm text-white lg:hidden"
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </LayoutGroup>

      {/* ── Mobile Navigation Drawer (Full-Screen / Slide-Down) ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden border-t border-white/10 bg-navy-950/98 backdrop-blur-xl overflow-hidden shadow-2xl"
          >
            <div className="mx-auto max-w-lg px-5 py-6 space-y-5">
              {/* Primary Navigation Links */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold/80 block px-3 mb-2">
                  Navigation Menu
                </span>
                <nav className="grid gap-1">
                  {NAV_LINKS.map((link) => {
                    const active = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className={cn(
                          "flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200",
                          active
                            ? "bg-gold text-white shadow-xs font-bold"
                            : "text-white/85 hover:bg-white/10 hover:text-white"
                        )}
                      >
                        <span>{link.label}</span>
                        <ChevronRight size={16} className={active ? "text-white" : "text-white/40"} />
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Quick Action: Register Button */}
              <div className="pt-2">
                <Link
                  href="/registration"
                  onClick={() => setMenuOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-gold py-3 text-sm font-bold text-white shadow-md hover:bg-gold-700 transition-colors uppercase tracking-wider"
                >
                  <span>Register as Delegate</span>
                  <ChevronRight size={16} />
                </Link>
              </div>

              {/* Department & External Institutional Links */}
              <div className="pt-3 border-t border-white/10 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/50 block px-3">
                  Institutional Portals
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs font-medium">
                  <a
                    href="https://www.iiti.ac.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md bg-white/5 p-2.5 text-center text-white/80 hover:bg-white/10 hover:text-gold transition-colors"
                  >
                    IIT Indore Official
                  </a>
                  <a
                    href="https://chemical.iiti.ac.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md bg-white/5 p-2.5 text-center text-white/80 hover:bg-white/10 hover:text-gold transition-colors"
                  >
                    Chemical Engg Dept
                  </a>
                </div>
              </div>

              {/* Social Media Footer in Drawer */}
              <div className="pt-2 flex items-center justify-center gap-6 text-white/70">
                <a
                  href="https://www.linkedin.com/company/bis-chem-iiti/?viewAsMember=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="hover:text-gold transition-colors p-1"
                >
                  <LinkedInIcon />
                </a>
                <a
                  href="https://www.instagram.com/bis_chem_iiti/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="hover:text-gold transition-colors p-1"
                >
                  <InstagramIcon />
                </a>
                <a
                  href="https://x.com/IITIOfficial?lang=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="hover:text-gold transition-colors p-1"
                >
                  <TwitterIcon />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
