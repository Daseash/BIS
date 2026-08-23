"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

/* ── Social SVG icons (matching IITI exactly) ──────────────────── */

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.05c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M21.582 6.186c-.23-.86-.908-1.538-1.768-1.768C18.254 4 12 4 12 4s-6.254 0-7.814.418c-.86.23-1.538.908-1.768 1.768C2 7.746 2 12 2 12s0 4.254.418 5.814c.23.86.908 1.538 1.768 1.768C5.746 20 12 20 12 20s6.254 0 7.814-.418c.86-.23 1.538-.908 1.768-1.768C22 16.254 22 12 22 12s0-4.254-.418-5.814zM10 15.464V8.536L16 12l-6 3.464z" />
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
      {/* ── Tier 1: Top utility bar ──────────────────────────────── */}
      <div className={cn(
        "top-bar flex w-full items-center justify-between px-4 transition-all duration-700 ease-in-out sm:px-6 lg:px-8",
        !isHome ? "py-1 text-xs" : "py-1.5 text-xs sm:text-sm"
      )}>
        <div className="flex items-center gap-3">
          <a href="https://x.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <TwitterIcon />
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <InstagramIcon />
          </a>
          <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <YouTubeIcon />
          </a>

          <span className="divider" />

          <a href="https://www.iiti.ac.in/" target="_blank" rel="noopener noreferrer" className="hidden sm:inline">
            IIT Indore
          </a>
        </div>

        <div className="flex items-center gap-3">
          <div className="lang-toggle">
            <span className="lang-btn active">en</span>
          </div>
        </div>
      </div>

      {/* ── Tier 2: Logo + Title (and Pill Nav on inner pages) ─────── */}
      <div className={cn(
        "flex w-full items-center justify-between px-4 transition-all duration-700 ease-in-out sm:px-6 lg:px-8",
        !isHome ? "py-1.5 sm:py-2.5" : "py-2 sm:py-3.5"
      )}>
        <Link href="/" className="flex items-center gap-2.5 transition-all duration-700 ease-in-out sm:gap-3.5 shrink-0" onClick={() => setMenuOpen(false)}>
          <Image
            src="/logos/iit-indore-emblem.png"
            alt="IIT Indore emblem"
            width={88}
            height={66}
            className={cn(
              "w-auto shrink-0 transition-all duration-700 ease-in-out",
              !isHome ? "h-10 sm:h-12 lg:h-13" : "h-12 sm:h-15 lg:h-18"
            )}
            priority
          />
          <div className={cn(
            "w-px bg-white/30 transition-all duration-700 ease-in-out",
            !isHome ? "h-8 sm:h-9" : "h-10 sm:h-12"
          )} />
          <span className="flex min-w-0 flex-col leading-tight transition-all duration-700 ease-in-out">
            <span className={cn(
              "font-bold tracking-wide text-white transition-all duration-700 ease-in-out whitespace-nowrap",
              !isHome ? "text-sm sm:text-base lg:text-lg" : "text-base sm:text-xl lg:text-2xl"
            )}>
              Malwa Chemical Conclave 2026
            </span>
            <span className={cn(
              "font-medium text-white/75 transition-all duration-700 ease-in-out whitespace-nowrap",
              !isHome ? "text-[10px] sm:text-xs" : "text-xs sm:text-sm lg:text-base"
            )}>
              Dept. of Chemical Engineering, IIT Indore
            </span>
          </span>
        </Link>

        {/* Right side: Pill Nav in same line on Inner pages */}
        <div className="flex items-center gap-3">
          {!isHome && (
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
          )}

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

      {/* ── Tier 3: Pill navigation tabs (Only on Home page - 2nd Line) ─ */}
      {isHome && (
        <div className="hidden lg:flex w-full items-center justify-end px-4 pb-3.5 pt-1 transition-all duration-700 ease-in-out sm:px-6 lg:px-8">
          <nav className="flex items-center justify-end">
            <div className="pill-nav transition-all duration-700 ease-in-out">
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
        </div>
      )}

      {/* ── Mega menu (desktop dropdown + mobile full-screen) ────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="mega-menu open overflow-hidden"
          >
            <div className="mega-menu-panel mx-auto max-w-7xl">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {MEGA_TABS.find((t) => t.id === activeTab)?.columns.map((col) => (
                  <div key={col.heading} className="mega-col">
                    <h3>{col.heading}</h3>
                    <ul>
                      {col.links.map((link) => (
                        <li key={link.label}>
                          <a href={link.href}>{link.label}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="mega-menu-tabs">
              {MEGA_TABS.map((tab) => (
                <button
                  key={tab.id}
                  className={cn(activeTab === tab.id && "active")}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
              <Link href="/schedule" onClick={() => setMenuOpen(false)}>
                Full Schedule
              </Link>
              <Link href="/registration" onClick={() => setMenuOpen(false)}>
                Register
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
