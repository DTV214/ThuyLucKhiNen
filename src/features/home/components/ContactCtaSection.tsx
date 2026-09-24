import { ContactPrompt } from "@/features/core/components/ContactPrompt";
import { Reveal } from "@/components/motion/Reveal";

/** Keeps the lead CTA lightweight and presents the hotline without a dead form route. */
export function ContactCtaSection() {
  return (
    <section id="bao-gia" className="mx-auto max-w-7xl px-gutter py-20"><Reveal><div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-primary-container p-7 text-on-primary shadow-2xl sm:p-12"><div aria-hidden="true" className="absolute -bottom-24 -right-20 size-80 rounded-full bg-secondary/25 blur-3xl" /><div className="relative max-w-3xl"><span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-label-sm font-semibold backdrop-blur-sm">Hỗ trợ nhanh 24/7</span><h2 className="mt-4 text-headline-lg font-bold">Bạn cần tư vấn kỹ thuật hoặc báo giá thiết bị thủy lực?</h2><p className="mt-4 text-body-lg leading-7 text-on-primary/90">Gửi thông số kỹ thuật hoặc mã thiết bị. Kỹ sư CTY ThanhDanh-VMC sẽ phản hồi phương án và báo giá chi tiết.</p><ContactPrompt label="Xem số hotline tư vấn" className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-secondary-container px-5 py-3 text-label-md font-semibold text-on-secondary-container shadow-lg transition-colors hover:bg-secondary-fixed" /></div></div></Reveal></section>
  );
}
