"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FileText, ExternalLink } from "lucide-react";
import { BrochureModal } from "@/components/BrochureModal";

export function AboutHeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      // Strictly enforce muted property for full browser autoplay compliance
      videoRef.current.muted = true;
      videoRef.current.defaultMuted = true;
      videoRef.current.play().catch(() => {
        // Fallback catch if browser enforces user interaction
      });
    }
  }, []);

  return (
    <>
      <section className="relative w-full h-[65vh] sm:h-[80vh] lg:h-[90vh] min-h-[420px] overflow-hidden bg-navy-950 border-b border-[#002F6C] shadow-xl">
        {/* ── Smooth Horizontal Slide-in / Reveal Animation (Right to Left) ── */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-full"
        >
          <video
            ref={videoRef}
            src="/video.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            style={{
              transform: "translate3d(0, 0, 0)",
              WebkitTransform: "translate3d(0, 0, 0)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              willChange: "transform",
            }}
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          />

          {/* Cinematic gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-navy-950/30 pointer-events-none" />

          {/* ── Down-Right Corner Link / Button for MCC 2026 Brochure ── */}
          <div className="absolute bottom-5 right-5 sm:bottom-8 sm:right-8 z-20 pointer-events-auto">
            <button
              type="button"
              onClick={() => setIsBrochureOpen(true)}
              className="group flex items-center gap-3 rounded-xl bg-white/95 hover:bg-white text-navy-950 px-4 py-2.5 sm:px-5 sm:py-3 shadow-xl hover:shadow-2xl backdrop-blur-md border border-white/80 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-900 text-gold transition-colors group-hover:bg-navy">
                <FileText size={18} />
              </div>
              <div className="text-left">
                <span className="block text-xs sm:text-sm font-bold tracking-tight text-navy-950 group-hover:text-navy">
                  MCC 2026 Brochure
                </span>
                <span className="block text-[11px] text-gray-500 font-medium">
                  Click to view brochure
                </span>
              </div>
              <ExternalLink size={14} className="text-gray-400 group-hover:text-navy ml-1 transition-colors" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* Lightbox Pop-up Modal */}
      <BrochureModal
        isOpen={isBrochureOpen}
        onClose={() => setIsBrochureOpen(false)}
      />
    </>
  );
}
