"use client";

import { PhoneCall, X } from "lucide-react";
import { useState } from "react";
import { companyInfo } from "@/features/core/data/company-info";

type ContactPromptProps = Readonly<{
  label?: string;
  className?: string;
}>;

/** Avoids invoking a browser phone-app picker while clearly presenting the sales hotline. */
export function ContactPrompt({ label = "Liên hệ", className = "" }: ContactPromptProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)} className={className}>
        <PhoneCall aria-hidden="true" className="size-4" /> {label}
      </button>
      {isOpen ? <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/45 p-4" role="presentation" onMouseDown={() => setIsOpen(false)}>
        <section role="dialog" aria-modal="true" aria-labelledby="contact-prompt-title" className="w-full max-w-md rounded-2xl bg-surface p-6 shadow-2xl" onMouseDown={(event) => event.stopPropagation()}>
          <div className="flex items-start justify-between gap-4"><div><span className="flex size-11 items-center justify-center rounded-xl bg-primary-fixed text-primary"><PhoneCall className="size-5" /></span><h2 id="contact-prompt-title" className="mt-4 text-headline-sm font-bold text-on-surface">Liên hệ tư vấn nhanh</h2></div><button type="button" onClick={() => setIsOpen(false)} className="inline-flex size-9 items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container" aria-label="Đóng thông báo"><X className="size-5" /></button></div>
          <p className="mt-3 text-body-md leading-6 text-on-surface-variant">Vui lòng gọi CTY ThanhDanh-VMC theo số hotline dưới đây để được kiểm tra mã hàng, tồn kho và báo giá.</p>
          <p className="mt-5 rounded-xl bg-primary/5 px-4 py-3 text-center text-headline-sm font-bold text-primary">{companyInfo.phoneDisplay}</p>
          <button type="button" onClick={() => setIsOpen(false)} className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-primary-container px-4 py-3 text-label-md font-semibold text-on-primary-container transition hover:bg-primary">Tôi đã hiểu</button>
        </section>
      </div> : null}
    </>
  );
}
