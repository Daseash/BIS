"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

// Clone of iiti.ac.in's .impact-section counters, which start at 0 and
// count up when scrolled into view.
export function CountUpStat({
  value,
  suffix = "",
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }

    const duration = 1200;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // ease-out so it decelerates into the final number
      setDisplay(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center md:text-left">
      <p className="text-4xl font-semibold text-navy-900 sm:text-5xl">
        {display}
        {suffix}
      </p>
      <p className="mt-2 text-sm text-gray-500 sm:text-base">{label}</p>
    </div>
  );
}
