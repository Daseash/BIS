import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Clean institutional section wrapper without AI blur blobs.
 */
export function GlassSection({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative py-12 sm:py-16", className)}>
      {children}
    </section>
  );
}

/**
 * Clean institutional white card with crisp 1px border and soft shadow.
 */
export function GlassCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "institutional-card rounded-lg border border-[#E5E7EB] bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-navy-500/40 hover:shadow-md",
        className
      )}
    >
      {children}
    </div>
  );
}

