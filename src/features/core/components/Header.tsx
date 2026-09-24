import Link from "next/link";
import Image from "next/image";
import { Menu, Search, ShieldCheck } from "lucide-react";
import { ContactPrompt } from "@/features/core/components/ContactPrompt";
import { companyInfo } from "@/features/core/data/company-info";

const navigationItems = [
  { href: "/", label: "Trang chủ" },
  { href: "/san-pham", label: "Danh mục sản phẩm" },
  { href: "/cam-nang", label: "Cẩm nang" },
  { href: "/lien-he", label: "Liên hệ" },
] as const;

/** Primary public navigation. Its translucent background remains legible on scroll. */
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-outline-variant/30 bg-surface/90 shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl">
      {/* Topbar: concise contact and certification trust signals. */}
      <div className="border-b border-outline-variant/20 bg-surface-container-low px-gutter py-1.5">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 text-body-sm text-on-surface-variant">
          <ContactPrompt label={`Hotline: ${companyInfo.phoneDisplay}`} className="inline-flex items-center gap-1.5 transition-colors hover:text-primary" />
          <span className="hidden items-center gap-1.5 sm:inline-flex">
            <ShieldCheck aria-hidden="true" className="size-4 text-primary" /> ISO 9001:2015
          </span>
        </div>
      </div>
      <div className="mx-auto flex h-20 max-w-7xl items-center gap-6 px-gutter">
        {/* Brand link doubles as the accessible site identity. */}
        <Link href="/" className="shrink-0" aria-label="CTY ThanhDanh-VMC - Trang chủ">
          <Image
            src="https://res.cloudinary.com/dratbz8bh/image/upload/e_make_transparent/v1789983022/LogoThanhDanhVMC.png_c3tpty.png"
            alt="CTY ThanhDanh-VMC"
            width={240}
            height={64}
            priority
            sizes="(min-width: 640px) 200px, 160px"
            className="h-12 w-auto object-contain sm:h-14"
          />
        </Link>
        <form action="/san-pham" method="get" role="search" className="relative hidden min-w-0 max-w-md flex-1 lg:block">
          <label htmlFor="site-search" className="sr-only">Tìm kiếm theo tên hoặc SKU sản phẩm</label>
          <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-outline" />
          <input id="site-search" name="search" type="search" placeholder="Tìm tên sản phẩm hoặc SKU..." className="h-10 w-full rounded-xl border border-outline-variant/40 bg-surface-container py-2 pl-10 pr-4 text-body-md outline-none transition-colors placeholder:text-outline focus:border-primary" />
        </form>
        {/* Main navigation is a semantic landmark for crawlers and assistive technology. */}
        <nav aria-label="Điều hướng chính" className="ml-auto hidden items-center gap-5 xl:flex">
          {navigationItems.map((item) => (
            <Link key={item.href} href={item.href} className="whitespace-nowrap text-body-md font-medium text-on-surface-variant transition-colors hover:text-primary">
              {item.label}
            </Link>
          ))}
        </nav>
        <ContactPrompt label="Liên hệ ngay" className="hidden items-center gap-2 rounded-xl bg-primary-container px-4 py-2.5 text-label-md font-semibold text-on-primary-container shadow-sm transition-colors hover:bg-primary sm:inline-flex" />
        {/* Native details keeps the initial mobile menu accessible without client-side JavaScript. */}
        <details className="relative ml-auto xl:ml-0 xl:hidden">
          <summary className="flex size-10 cursor-pointer list-none items-center justify-center rounded-xl text-on-surface hover:bg-surface-container [&::-webkit-details-marker]:hidden">
            <Menu aria-hidden="true" className="size-5" />
            <span className="sr-only">Mở menu điều hướng</span>
          </summary>
          <nav aria-label="Điều hướng trên thiết bị di động" className="absolute right-0 top-12 w-64 rounded-xl border border-outline-variant/30 bg-surface p-3 shadow-xl">
            <ul className="space-y-1">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="block rounded-lg px-3 py-2.5 text-body-md font-medium text-on-surface-variant hover:bg-surface-container hover:text-primary">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <form action="/san-pham" method="get" role="search" className="hidden">
              <label htmlFor="site-search-mobile" className="sr-only">Tìm kiếm theo tên hoặc SKU sản phẩm</label>
              <div className="relative"><Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-outline" /><input id="site-search-mobile" name="search" type="search" placeholder="Tìm tên hoặc SKU..." className="h-10 w-full rounded-lg border border-outline-variant/40 bg-surface-container py-2 pl-10 pr-3 text-body-sm outline-none focus:border-primary" /></div>
            </form>
          </nav>
        </details>
      </div>
      <div className="border-t border-outline-variant/20 px-gutter py-3 lg:hidden">
        <form action="/san-pham" method="get" role="search" className="relative mx-auto max-w-7xl">
          <label htmlFor="site-search-compact" className="sr-only">Tìm kiếm theo tên hoặc SKU sản phẩm</label>
          <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-outline" />
          <input id="site-search-compact" name="search" type="search" placeholder="Tìm tên sản phẩm hoặc SKU..." className="h-11 w-full rounded-xl border border-outline-variant/40 bg-surface-container py-2 pl-10 pr-4 text-body-md outline-none transition-colors placeholder:text-outline focus:border-primary" />
        </form>
      </div>
    </header>
  );
}
