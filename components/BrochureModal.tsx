"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Download, FileText } from "lucide-react";

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
  const [currentPage, setCurrentPage] = useState(0);

  // Close on Escape key press
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

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
          {/* Backdrop (Clicking anywhere closes modal) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-navy-950/85 backdrop-blur-md cursor-pointer"
            aria-label="Close modal overlay"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative z-10 flex flex-col max-h-[92vh] w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Toolbar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-navy-950 text-white border-b border-navy-800 shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/20 text-gold">
                  <FileText size={18} />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                    MCC 2026 Brochure
                  </h3>
                  <p className="text-[11px] text-gray-300">
                    Page {currentPage + 1} of {BROCHURE_PAGES.length} &bull; {BROCHURE_PAGES[currentPage].title}
                  </p>
                </div>
              </div>

              {/* Actions: Page Switchers + Download + Close */}
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Page Navigation Buttons */}
                <div className="flex items-center bg-white/10 rounded-lg p-1">
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentPage((prev) => (prev > 0 ? prev - 1 : BROCHURE_PAGES.length - 1))
                    }
                    className="p-1 sm:p-1.5 text-gray-300 hover:text-white hover:bg-white/15 rounded transition-colors"
                    title="Previous page"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <span className="px-2 text-xs font-mono font-medium text-white">
                    {currentPage + 1}/{BROCHURE_PAGES.length}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentPage((prev) => (prev < BROCHURE_PAGES.length - 1 ? prev + 1 : 0))
                    }
                    className="p-1 sm:p-1.5 text-gray-300 hover:text-white hover:bg-white/15 rounded transition-colors"
                    title="Next page"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>

                {/* PDF Download link */}
                <a
                  href="/MCC 2026 Broucher.pdf"
                  download="MCC 2026 Brochure.pdf"
                  className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-gold px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-navy-950 shadow-sm hover:bg-gold-400 transition-colors"
                >
                  <Download size={14} /> PDF
                </a>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg p-1.5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Main Viewer Area (Scrollable & responsive) */}
            <div
              className="relative flex-1 overflow-y-auto bg-gray-100 p-2 sm:p-6 flex items-center justify-center cursor-pointer"
              onClick={onClose}
              title="Click anywhere to close"
            >
              <div
                className="relative max-w-full rounded-lg shadow-md overflow-hidden bg-white cursor-default"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={BROCHURE_PAGES[currentPage].src}
                  alt={`MCC 2026 Brochure Page ${currentPage + 1}`}
                  className="w-full h-auto max-h-[75vh] object-contain select-none"
                  loading="eager"
                />
              </div>
            </div>

            {/* Bottom Footer Page Selector */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 bg-white border-t border-gray-200 text-xs text-gray-600 shrink-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                {BROCHURE_PAGES.map((p, idx) => (
                  <button
                    key={p.page}
                    type="button"
                    onClick={() => setCurrentPage(idx)}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                      currentPage === idx
                        ? "bg-navy-900 text-white shadow-xs"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Page {p.page}
                  </button>
                ))}
              </div>

              <span className="text-[11px] text-gray-400 hidden sm:inline">
                Click outside or press <kbd className="px-1.5 py-0.5 rounded bg-gray-100 border text-gray-700 font-mono text-[10px]">Esc</kbd> to close
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
