"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { companyInfo } from "@/features/core/data/company-info";

/** Persistent, lightweight shortcuts for Zalo consultation and returning to the document top. */
export function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setShowBackToTop(window.scrollY > 320);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 sm:bottom-7 sm:right-7">
      {showBackToTop ? <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="inline-flex size-12 items-center justify-center rounded-full border border-outline-variant/30 bg-surface text-primary shadow-lg transition hover:-translate-y-0.5 hover:bg-surface-container" aria-label="Quay lên đầu trang"><ArrowUp className="size-5" /></button> : null}
      <a href={companyInfo.zaloHref} target="_blank" rel="noreferrer" className="inline-flex size-14 items-center justify-center rounded-full bg-[#0068ff] text-[11px] font-black tracking-tight text-white shadow-lg shadow-blue-600/30 transition hover:-translate-y-0.5 hover:bg-[#0058d8]" aria-label="Kết bạn Zalo với CTY ThanhDanh-VMC" title="Kết bạn Zalo">Zalo</a>
    </div>
  );
}
