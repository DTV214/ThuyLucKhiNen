"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BadgeCheck, ClipboardList, Factory, Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";

const slides = [
  { image: "https://res.cloudinary.com/dratbz8bh/image/upload/v1789982956/BannerThanhDanhVMC.png_ucputl.png", eyebrow: "Nhà phân phối B2B thiết bị công nghiệp", title: "Thiết bị Thủy lực & Khí nén Chính hãng", description: "CTY ThanhDanh-VMC cung cấp đa dạng mã hàng, hỗ trợ doanh nghiệp tìm đúng thiết bị và nhận báo giá nhanh.", primaryLabel: "Xem danh mục sản phẩm", primaryHref: "#danh-muc", secondaryLabel: "Liên hệ tư vấn", secondaryHref: "/lien-he" },
  { image: "https://res.cloudinary.com/dratbz8bh/image/upload/v1789983021/Banner2_qdn6ld.jpg", eyebrow: "Hàng sẵn kho, giao toàn quốc", title: "Nguồn hàng ổn định cho mọi nhu cầu bảo trì và sản xuất", description: "Tối ưu thời gian dừng máy với thiết bị sẵn kho, chứng từ CO/CQ minh bạch và giao hàng tốc hành.", primaryLabel: "Khám phá sản phẩm", primaryHref: "/san-pham", secondaryLabel: "Liên hệ ngay", secondaryHref: "/lien-he" },
  { image: "https://res.cloudinary.com/dratbz8bh/image/upload/v1789983021/Banner1_cpn9yz.jpg", eyebrow: "Hỗ trợ tìm mã tương đương", title: "Tư vấn đúng mã, đúng thông số, đúng hệ thống", description: "Đội ngũ kỹ sư hỗ trợ đối chiếu mã hàng và lựa chọn phương án thay thế phù hợp trước khi bạn đặt mua.", primaryLabel: "Xem lợi thế phân phối", primaryHref: "#loi-the", secondaryLabel: "Liên hệ tư vấn", secondaryHref: "/lien-he" },
] as const;

const metrics = [["500+", "Dự án hoàn thành"], ["15 năm", "Kinh nghiệm kỹ thuật"], ["24/7", "Hỗ trợ bảo trì"]] as const;

/** Lightweight carousel; replace duplicate campaign assets as more Cloudinary banners become available. */
export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => setActiveIndex((index) => (index + 1) % slides.length), 6500);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  const activeSlide = slides[activeIndex];
  const goToPrevious = () => setActiveIndex((index) => (index - 1 + slides.length) % slides.length);
  const goToNext = () => setActiveIndex((index) => (index + 1) % slides.length);

  return (
    <section className="relative isolate min-h-[650px] overflow-hidden bg-primary text-on-primary sm:min-h-[680px]">
      {/* Banner carousel background with gradients that preserve text contrast. */}
      <div aria-hidden="true" className="absolute inset-0">
        <Image key={activeSlide.image} src={activeSlide.image} alt="" fill priority={activeIndex === 0} sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 via-45% to-primary/35" />
        <div className="absolute inset-0 bg-gradient-to-tr from-secondary/65 via-transparent to-secondary-container/20" />
        <div className="absolute inset-0 opacity-15 [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>

      <div className="relative mx-auto flex min-h-[650px] max-w-7xl items-center px-gutter py-16 sm:min-h-[680px] sm:py-24">
        <div className="max-w-3xl" aria-live="polite">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-label-sm font-medium backdrop-blur-sm"><BadgeCheck className="size-4 text-secondary-fixed" /> {activeSlide.eyebrow}</span>
          <h1 className="mt-6 min-h-36 text-4xl font-bold leading-tight tracking-tight sm:min-h-44 sm:text-5xl lg:min-h-56 lg:text-6xl">{activeSlide.title}</h1>
          <p className="mt-6 min-h-21 max-w-2xl text-body-lg leading-7 text-on-primary/90 sm:text-lg">{activeSlide.description}</p>
          <div className="mt-8 flex flex-wrap gap-4"><Link href={activeSlide.primaryHref} className="inline-flex items-center gap-2 rounded-xl bg-secondary-container px-6 py-3 text-label-md font-semibold text-on-secondary-container shadow-lg transition hover:bg-secondary-fixed">{activeSlide.primaryLabel} <ArrowRight className="size-4" /></Link><Link href={activeSlide.secondaryHref} className="inline-flex items-center gap-2 rounded-xl border border-white/45 bg-white/5 px-6 py-3 text-label-md font-semibold backdrop-blur-sm transition hover:bg-white/15"><ClipboardList className="size-4" /> {activeSlide.secondaryLabel}</Link></div>
          <dl className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-white/25 pt-7 sm:gap-6">{metrics.map(([value, label]) => <div key={label}><dt className="text-headline-md font-semibold text-secondary-fixed">{value}</dt><dd className="mt-1 text-body-sm text-on-primary/85">{label}</dd></div>)}</dl>
        </div>
        <div className="absolute bottom-8 right-gutter hidden items-center gap-3 rounded-xl bg-surface/95 px-4 py-3 text-on-surface shadow-xl backdrop-blur-md lg:flex"><Factory className="size-7 text-primary" /><span><strong className="block text-label-md">Thủy lực khí nén </strong><small className="text-body-sm text-on-surface-variant">CTY ThanhDanh-VMC</small></span></div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
        <button type="button" onClick={goToPrevious} className="inline-flex size-9 items-center justify-center rounded-full border border-white/35 bg-primary/50 text-on-primary backdrop-blur-sm transition hover:bg-white/15" aria-label="Slide trước"><ArrowLeft className="size-4" /></button>
        {slides.map((slide, index) => <button key={slide.title} type="button" onClick={() => setActiveIndex(index)} className={`h-2.5 rounded-full transition-all ${index === activeIndex ? "w-7 bg-secondary-container" : "w-2.5 bg-white/55 hover:bg-white"}`} aria-label={`Hiển thị slide ${index + 1}`} aria-current={index === activeIndex ? "true" : undefined} />)}
        <button type="button" onClick={() => setIsPaused((paused) => !paused)} className="inline-flex size-9 items-center justify-center rounded-full border border-white/35 bg-primary/50 text-on-primary backdrop-blur-sm transition hover:bg-white/15" aria-label={isPaused ? "Tiếp tục tự động chuyển slide" : "Tạm dừng tự động chuyển slide"}>{isPaused ? <Play className="size-4" /> : <Pause className="size-4" />}</button>
        <button type="button" onClick={goToNext} className="inline-flex size-9 items-center justify-center rounded-full border border-white/35 bg-primary/50 text-on-primary backdrop-blur-sm transition hover:bg-white/15" aria-label="Slide tiếp theo"><ArrowRight className="size-4" /></button>
      </div>
    </section>
  );
}
