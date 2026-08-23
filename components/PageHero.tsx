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


