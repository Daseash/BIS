"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

const HERO_SLIDES = [
  {
    src: "/hero-slide-1.png",
    alt: "Malwa Chemical Conclave 2026 — Inaugural Cover Slide",
  },
  {
    src: "/hero-slide-2.jpg",
    alt: "Malwa Chemical Conclave 2026 — Academic and Industry Conference",
  },
  {
    src: "/hero-2.jpeg",
    alt: "Malwa Chemical Conclave — IIT Indore Campus & Conclave Group",
  },
];

const INTERVAL_MS = 3000;

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    if (HERO_SLIDES.length <= 1) return;
    const timer = setInterval(nextSlide, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {HERO_SLIDES.map((slide, index) => (
        <div
          key={slide.src}
          className={cn(
            "absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out",
            index === current ? "opacity-100 z-1" : "opacity-0 z-0 pointer-events-none"
          )}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            unoptimized
            sizes="100vw"
            className="h-full w-full object-cover object-center"
          />
        </div>
      ))}

      {/* Hero overlay gradient */}
      <div className="hero-overlay z-2" />
    </div>
  );
}
