"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Download, FileText, Sparkles } from "lucide-react";

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BROCHURE_PAGES = [
  { page: 1, title: "Conclave Overview & Vision", subtitle: "Cover & Introduction", src: "/brochure/page-1.jpg" },
  { page: 2, title: "Structure, Verticals & Events", subtitle: "Keynotes & Workshops", src: "/brochure/page-2.jpg" },
  { page: 3, title: "Leadership, Advisory & Partners", subtitle: "Sponsors & Contact", src: "/brochure/page-3.jpg" },
];

export function BrochureModal({ isOpen, onClose }: BrochureModalProps) {
  const [currentPage, setCurrentPage] = useState(0);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        setCurrentPage((prev) => (prev > 0 ? prev - 1 : BROCHURE_PAGES.length - 1));
      }
      if (e.key === "ArrowRight") {
        setCurrentPage((prev) => (prev < BROCHURE_PAGES.length - 1 ? prev + 1 : 0));
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : BROCHURE_PAGES.length - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < BROCHURE_PAGES.length - 1 ? prev + 1 : 0));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 md:p-6">
          {/* Backdrop (Clicking backdrop dismisses modal) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#000E20]/90 backdrop-blur-md cursor-pointer"
            aria-label="Close modal overlay"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="relative z-10 flex flex-col max-h-[94vh] w-full max-w-5xl bg-[#001B3D] rounded-2xl shadow-2xl overflow-hidden border border-white/15"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Top Institutional Header ────────────────────── */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#001B3D] text-white border-b border-gold/25 shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold/15 text-gold border border-gold/30 shrink-0">
                  <FileText size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="hidden sm:inline-block rounded bg-gold/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold-300 border border-gold/30">
                      MCC 2026
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                      Malwa Chemical Conclave Brochure
                    </h3>
                  </div>
                  <p className="text-[11px] sm:text-xs text-gray-300">
                    Page {currentPage + 1} of {BROCHURE_PAGES.length} &bull; <span className="text-gold-200">{BROCHURE_PAGES[currentPage].title}</span>
                  </p>
                </div>
              </div>

              {/* Right Action Tools: Download + Close */}
              <div className="flex items-center gap-2 sm:gap-3">
                <a
                  href="/MCC 2026 Broucher.pdf"
                  download="MCC 2026 Brochure.pdf"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-gold hover:bg-gold-400 text-navy-950 px-3 py-1.5 text-xs font-bold uppercase tracking-wider shadow-sm transition-all transform hover:scale-102"
                >
                  <Download size={14} />
                  <span className="hidden sm:inline">Download</span> PDF
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg p-1.5 text-gray-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X size={22} />
                </button>
              </div>
            </div>

            {/* ── Main High-Resolution Document Canvas ──────────── */}
            <div
              className="relative flex-1 overflow-y-auto bg-[#0a192f] p-2 sm:p-5 md:p-6 flex items-center justify-center select-none cursor-pointer group"
              onClick={onClose}
              title="Click outside to close"
            >
              {/* Floating Side Arrow: Previous */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-navy-950/80 hover:bg-navy-900 text-white shadow-xl border border-white/20 backdrop-blur-sm transition-all duration-200 transform hover:scale-110 active:scale-95 cursor-pointer opacity-85 hover:opacity-100"
                aria-label="Previous page"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Document Image Container */}
              <div
                className="relative max-w-full rounded-xl shadow-2xl overflow-hidden bg-white border border-white/10 cursor-default"
                onClick={(e) => e.stopPropagation()}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentPage}
                    src={BROCHURE_PAGES[currentPage].src}
                    alt={`MCC 2026 Brochure — ${BROCHURE_PAGES[currentPage].title}`}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-auto max-h-[68vh] sm:max-h-[74vh] object-contain shadow-inner"
                    loading="eager"
                  />
                </AnimatePresence>
              </div>

              {/* Floating Side Arrow: Next */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-navy-950/80 hover:bg-navy-900 text-white shadow-xl border border-white/20 backdrop-blur-sm transition-all duration-200 transform hover:scale-110 active:scale-95 cursor-pointer opacity-85 hover:opacity-100"
                aria-label="Next page"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* ── Institutional Bottom Footer & Tab Switcher ──── */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 px-4 sm:px-6 py-3 bg-[#00142D] border-t border-white/10 text-xs shrink-0">
              {/* Page Pill Tabs */}
              <div className="flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto justify-center sm:justify-start">
                {BROCHURE_PAGES.map((p, idx) => (
                  <button
                    key={p.page}
                    type="button"
                    onClick={() => setCurrentPage(idx)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      currentPage === idx
                        ? "bg-navy-900 text-gold border border-gold/40 shadow-xs"
                        : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10"
                    }`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${currentPage === idx ? "bg-gold" : "bg-gray-500"}`} />
                    <span>Page {p.page}</span>
                    <span className="hidden md:inline text-[11px] text-gray-400">&bull; {p.subtitle}</span>
                  </button>
                ))}
              </div>

              {/* Keyboard Navigation Tip */}
              <div className="flex items-center gap-2 text-[11px] text-gray-400">
                <span className="hidden lg:inline">
                  Navigate with <kbd className="px-1 py-0.5 rounded bg-white/10 border border-white/15 text-gray-200 font-mono text-[10px]">←</kbd> <kbd className="px-1 py-0.5 rounded bg-white/10 border border-white/15 text-gray-200 font-mono text-[10px]">→</kbd> keys
                </span>
                <span className="hidden sm:inline text-gray-500">&bull;</span>
                <span>Click outside to close</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
