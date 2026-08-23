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
    <section className="border-b border-[#E5E7EB] bg-gradient-to-b from-[#001B3D] to-[#002F6C] text-white">
      <div className="mx-auto max-w-7xl px-4 pt-32 pb-12 sm:px-6 sm:pt-36 sm:pb-16 lg:px-8 lg:pt-40 lg:pb-16">
        <nav className="mb-4 flex items-center gap-2 text-xs text-white/70 sm:text-sm">
          <Link
            href="/"
            className="flex items-center gap-1.5 transition-colors hover:text-white"
          >
            <Home size={14} /> Home
          </Link>
          <ChevronRight size={12} className="text-white/40" />
          <span className="font-semibold text-gold-300">{title}</span>
        </nav>
        <div className="flex items-center gap-3">
          <div className="h-8 w-1.5 rounded-full bg-gold" />
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {title}
          </h1>
        </div>
        {subtitle && (
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/80 sm:text-base">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}

