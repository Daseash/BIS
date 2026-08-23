import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Glass theme wrapper used only on About and Invited Speakers, per request.
 * Soft blurred color blobs sit behind frosted (backdrop-blur) cards so the
 * translucency actually reads — glass on a flat white page has nothing to
 * show through.
 */
export function GlassSection({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("relative isolate overflow-hidden", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 -z-10 h-72 w-72 rounded-full bg-navy-200/50 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/3 -z-10 h-80 w-80 rounded-full bg-navy-100 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/3 -z-10 h-64 w-64 rounded-full bg-navy-50 blur-3xl"
      />
      {children}
    </div>
  );
}

export function GlassCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "group rounded-2xl border border-white/60 bg-white/60 shadow-[0_8px_30px_rgba(0,74,173,0.1)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:bg-white/85 hover:shadow-[0_12px_40px_rgba(0,74,173,0.18)]",
        className
      )}
    >
      {children}
    </div>
  );
}
