"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

const IMAGES = [
  { src: "/hero-1.jpeg", alt: "Group photo — Malwa Chemical Conclave 2026" },
  { src: "/hero-2.jpeg", alt: "Campus photo — IIT Indore" },
  // Add more images here later
];

const INTERVAL_MS = 5000;

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((i) => (i + 1) % IMAGES.length);
  }, []);

  useEffect(() => {
    if (paused || IMAGES.length <= 1) return;
    const id = setInterval(next, INTERVAL_MS);
    return () => clearInterval(id);
  }, [next, paused]);

  return (
    <div
      className="hero-media"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {IMAGES.map((img, i) => (
        <Image
          key={img.src}
          src={img.src}
          alt={img.alt}
          fill
          priority={i === 0}
          sizes="100vw"
          className={cn(
            "hero-media transition-opacity duration-1000 ease-in-out",
            i === current ? "opacity-100" : "opacity-0"
          )}
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      ))}

      {/* Dot indicators */}
      {IMAGES.length > 1 && (
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to image ${i + 1}`}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === current
                  ? "w-8 bg-gold"
                  : "w-2 bg-white/50 hover:bg-white/80"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
