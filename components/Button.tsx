"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";
import type { ReactNode, MouseEventHandler } from "react";

/**
 * Institutional button — rectangular with slight rounding (rounded-sm),
 * solid navy primary, gold outline secondary. Matches IIT Indore's
 * formal aesthetic, not consumer-app pill buttons.
 */

type Variant = "primary" | "outline";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 text-sm font-semibold transition-all duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-navy text-white hover:bg-navy-800",
  outline:
    "border border-gold text-navy hover:bg-gold-50",
};

function Arrow() {
  return (
    <ArrowRight
      size={16}
      className="transition-transform duration-200 group-hover:translate-x-1"
    />
  );
}

export function Button({
  href,
  variant = "primary",
  showArrow = true,
  className,
  children,
  type = "button",
  onClick,
  disabled,
}: {
  href?: string;
  variant?: Variant;
  showArrow?: boolean;
  className?: string;
  children: ReactNode;
  type?: "button" | "submit";
  onClick?: MouseEventHandler;
  disabled?: boolean;
}) {
  if (href) {
    return (
      <Link href={href} className={cn(base, variants[variant], className)}>
        {children}
        {showArrow && <Arrow />}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(base, variants[variant], className)}
    >
      {children}
      {showArrow && <Arrow />}
    </button>
  );
}
