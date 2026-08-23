import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import type { ReactNode } from "react";

export function PageHero({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/20 bg-navy-950/90">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 left-1/3 -z-10 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-1/4 -z-10 h-64 w-64 rounded-full bg-navy-400/10 blur-3xl"
      />
      <div className="mx-auto max-w-7xl px-4 pt-36 pb-12 sm:px-6 sm:pt-40 sm:pb-16 lg:px-8 lg:pt-44 lg:pb-20">
        <nav className="mb-4 flex items-center gap-2 text-sm text-white/50 sm:text-base">
          <Link href="/" className="flex items-center gap-1.5 transition-colors hover:text-white">
            <Home size={16} /> Home
          </Link>
          <ChevronRight size={14} />
          <span className="font-medium text-gold">{title}</span>
        </nav>
        <h1 className="text-4xl font-light tracking-tight text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-base text-white/60 sm:text-lg">{subtitle}</p>
        )}
        {children}
      </div>
    </section>
  );
}
