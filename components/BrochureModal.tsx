"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download } from "lucide-react";

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BROCHURE_PAGES = [
  { page: 1, title: "Cover & Overview", src: "/brochure/page-1.jpg" },
  { page: 2, title: "Conclave Structure & Verticals", src: "/brochure/page-2.jpg" },
  { page: 3, title: "Sponsors & Contact", src: "/brochure/page-3.jpg" },
];

export function BrochureModal({ isOpen, onClose }: BrochureModalProps) {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs p-3 sm:p-6 md:p-8 flex justify-center">
          {/* Transparent Backdrop (Clicking outside closes modal) */}
          <div
            className="fixed inset-0 cursor-pointer"
            onClick={onClose}
            aria-label="Close brochure overlay"
          />

          {/* Floating Top-Right Controls */}
          <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-2">
            <a
              href="/MCC 2026 Broucher.pdf"
              download="MCC 2026 Brochure.pdf"
              className="inline-flex items-center gap-1.5 rounded-full bg-navy-900/90 hover:bg-navy-950 text-gold px-3.5 py-2 text-xs font-bold uppercase tracking-wider shadow-lg border border-gold/40 backdrop-blur-md transition-all hover:scale-105"
              onClick={(e) => e.stopPropagation()}
            >
              <Download size={14} /> PDF
            </a>
            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-950/90 hover:bg-navy-900 text-white shadow-lg border border-white/20 backdrop-blur-md transition-all hover:scale-105 cursor-pointer"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>

          {/* Scrollable Transparent Brochure Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 15 }}
            transition={{ duration: 0.25 }}
            className="relative z-10 w-full max-w-3xl flex flex-col gap-6 sm:gap-8 my-auto py-6 sm:py-10"
            onClick={(e) => e.stopPropagation()}
          >
            {BROCHURE_PAGES.map((page) => (
              <div
                key={page.page}
                className="rounded-xl overflow-hidden shadow-2xl bg-white border border-white/20"
              >
                <img
                  src={page.src}
                  alt={`MCC 2026 Brochure Page ${page.page}`}
                  className="w-full h-auto object-contain block"
                  loading="eager"
                />
              </div>
            ))}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
