import type { Metadata } from "next";
import { Mail, MapPin, MessageCircleMore, PhoneCall, ReceiptText, UserRound } from "lucide-react";
import { ContactForm } from "@/features/contact/components/ContactForm";
import { companyInfo } from "@/features/core/data/company-info";

export const metadata: Metadata = {
  title: "Liên hệ & Báo giá | CTY ThanhDanh-VMC",
  description:
    "Liên hệ CTY ThanhDanh-VMC để nhận tư vấn mã thiết bị, kiểm tra tồn kho và báo giá B2B thiết bị thủy lực, khí nén.",
};

const contactDetails = [
  { label: "Hotline tư vấn", value: companyInfo.phoneDisplay, href: companyInfo.primaryPhoneHref, icon: PhoneCall },
  { label: "Email kinh doanh", value: companyInfo.email, href: companyInfo.emailHref, icon: Mail },
  { label: "Zalo tư vấn", value: companyInfo.phoneDisplay, href: companyInfo.zaloHref, icon: MessageCircleMore },
] as const;

export default function ContactPage() {
  return (
    <section className="bg-surface-container-low px-gutter py-14 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-label-md font-semibold uppercase tracking-wider text-primary">Liên hệ {companyInfo.shortName}</p>
          <h1 className="mt-2 text-headline-lg font-bold text-on-surface">Tư vấn thiết bị &amp; nhận báo giá B2B</h1>
          <p className="mt-4 text-body-lg leading-7 text-on-surface-variant">
            Gửi thông tin thiết bị bạn đang cần thay thế, đội ngũ tư vấn sẽ hỗ trợ tra mã và báo giá phù hợp.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <section className="rounded-2xl bg-surface p-7 shadow-sm sm:p-8" aria-labelledby="contact-info-title">
            <h2 id="contact-info-title" className="text-headline-md font-bold text-on-surface">Thông tin doanh nghiệp</h2>
            <p className="mt-3 text-body-md leading-6 text-on-surface-variant">{companyInfo.legalName}</p>

            <div className="mt-7 space-y-4">
              <div className="flex items-start gap-3 rounded-xl p-2">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-fixed text-primary"><MapPin className="size-5" /></span>
                <span><small className="block text-body-sm text-outline">Địa chỉ kho hàng</small><strong className="text-body-md text-on-surface">{companyInfo.warehouseAddress}</strong></span>
              </div>
              <div className="flex items-start gap-3 rounded-xl p-2">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-fixed text-primary"><UserRound className="size-5" /></span>
                <span><small className="block text-body-sm text-outline">Giám đốc</small><strong className="text-body-md text-on-surface">{companyInfo.director}</strong></span>
              </div>
              <div className="flex items-start gap-3 rounded-xl p-2">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-fixed text-primary"><ReceiptText className="size-5" /></span>
                <span><small className="block text-body-sm text-outline">Mã số thuế</small><strong className="text-body-md text-on-surface">{companyInfo.taxCode}</strong></span>
              </div>
              {contactDetails.map(({ icon: Icon, ...detail }) => (
                <a key={detail.label} href={detail.href} className="flex items-start gap-3 rounded-xl p-2 transition hover:bg-surface-container-low">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-fixed text-primary"><Icon className="size-5" /></span>
                  <span><small className="block text-body-sm text-outline">{detail.label}</small><strong className="text-body-md text-on-surface">{detail.value}</strong></span>
                </a>
              ))}
            </div>

            <div className="mt-7 overflow-hidden rounded-xl border border-outline-variant/20">
              <iframe title={`Bản đồ kho hàng ${companyInfo.shortName}`} src={companyInfo.mapEmbedUrl} className="h-64 w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
            <p className="mt-3 inline-flex items-center gap-1 text-body-sm text-on-surface-variant"><MapPin className="size-4 text-primary" />{companyInfo.warehouseAddress}</p>
          </section>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
