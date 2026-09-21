import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, PhoneCall, ReceiptText, UserRound } from "lucide-react";
import { companyInfo } from "@/features/core/data/company-info";

const footerColumns = [
  {
    title: "Danh mục sản phẩm",
    links: [
      { href: "/san-pham/bom-thuy-luc", label: "Bơm thủy lực" },
      { href: "/san-pham/xi-lanh", label: "Xi lanh công nghiệp" },
      { href: "/san-pham/van-thuy-luc", label: "Van thủy lực" },
      { href: "/san-pham/tram-nguon", label: "Trạm nguồn thủy lực" },
    ],
  },
  {
    title: "Tài nguyên kỹ thuật",
    links: [
      { href: "/cam-nang", label: "Cẩm nang chọn thiết bị" },
      { href: "/tai-nguyen/catalogue", label: "Catalogue thiết bị" },
      { href: "/tai-nguyen/bang-thong-so", label: "Bảng tra thông số" },
      { href: "/tai-nguyen/chung-chi", label: "Tài liệu CO/CQ" },
    ],
  },
  {
    title: "Liên kết SEO",
    links: [
      { href: "/thuong-hieu", label: "Thương hiệu thủy lực & khí nén" },
      { href: "/san-pham", label: "Thiết bị thủy lực chính hãng" },
      { href: "/cam-nang", label: "Tư vấn chọn mã tương đương" },
      { href: "/lien-he", label: "Nhận báo giá thiết bị B2B" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-outline-variant/20 bg-surface-container-low">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-gutter py-14 md:grid-cols-2 lg:grid-cols-4">
        <section aria-labelledby="footer-company-title">
          <h2 id="footer-company-title" className="text-headline-sm font-bold text-primary">
            {companyInfo.legalName}
          </h2>
          <p className="mt-4 text-body-md leading-6 text-on-surface-variant">
            Đơn vị thương mại và phân phối thiết bị thủy lực, khí nén cho doanh nghiệp công nghiệp Việt Nam.
          </p>
          <address className="mt-5 space-y-3 not-italic text-body-sm text-on-surface-variant">
            <p className="flex gap-2">
              <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>{companyInfo.warehouseAddress}</span>
            </p>
            <p className="flex gap-2">
              <UserRound aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>Giám đốc: {companyInfo.director}</span>
            </p>
            <p className="flex gap-2">
              <ReceiptText aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>MST: {companyInfo.taxCode}</span>
            </p>
            <a href={companyInfo.primaryPhoneHref} className="flex items-center gap-2 hover:text-primary">
              <PhoneCall aria-hidden="true" className="size-4 shrink-0 text-primary" />
              {companyInfo.phoneDisplay}
            </a>
            <a href={companyInfo.emailHref} className="flex items-center gap-2 break-all hover:text-primary">
              <Mail aria-hidden="true" className="size-4 shrink-0 text-primary" />
              {companyInfo.email}
            </a>
          </address>
        </section>

        {footerColumns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h2 className="text-label-md font-semibold uppercase tracking-wide text-primary">{column.title}</h2>
            <ul className="mt-4 space-y-3">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link className="group inline-flex items-center gap-1 text-body-md text-on-surface-variant transition-colors hover:text-primary" href={link.href}>
                    {link.label}
                    <ArrowUpRight aria-hidden="true" className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-outline-variant/20 px-gutter py-6">
        <p className="mx-auto max-w-7xl text-center text-body-sm text-on-surface-variant">
          © {new Date().getFullYear()} {companyInfo.shortName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
