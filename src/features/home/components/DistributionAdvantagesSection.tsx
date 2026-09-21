import { BadgeCheck, Boxes, FastForward, ScanSearch } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const advantages = [
  { title: "Hàng sẵn kho số lượng lớn", description: "Danh mục đa dạng, đáp ứng nhanh nhu cầu thay thế và bảo trì cấp bách.", icon: Boxes },
  { title: "Đầy đủ chứng từ CO/CQ", description: "Minh bạch nguồn gốc, hỗ trợ hồ sơ chất lượng cho doanh nghiệp và dự án.", icon: BadgeCheck },
  { title: "Giao hàng tốc hành toàn quốc", description: "Phối hợp đóng gói và vận chuyển linh hoạt để giảm thời gian chờ thiết bị.", icon: FastForward },
  { title: "Hỗ trợ chuyển đổi mã tương đương", description: "Kỹ sư hỗ trợ đối chiếu thông số và chọn phương án thay thế phù hợp.", icon: ScanSearch },
] as const;

export function DistributionAdvantagesSection() {
  return (
    <section id="loi-the" className="mx-auto max-w-7xl px-gutter py-20"><Reveal className="mx-auto max-w-2xl text-center"><p className="text-label-md font-semibold uppercase tracking-wider text-primary">Lợi thế phân phối</p><h2 className="mt-2 text-headline-lg font-bold text-on-surface">Nguồn hàng Tin cậy cho Doanh nghiệp</h2><p className="mt-4 text-body-lg leading-7 text-on-surface-variant">CTY ThanhDanh-VMC tập trung vào tốc độ đáp ứng, nguồn gốc minh bạch và hỗ trợ chọn đúng thiết bị.</p></Reveal><div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">{advantages.map(({ icon: Icon, ...advantage }, index) => <Reveal key={advantage.title} delay={index * 0.05}><article className="h-full rounded-2xl border border-outline-variant/20 bg-surface-container-low p-7 transition-colors hover:bg-primary-fixed/30"><span className="flex size-14 items-center justify-center rounded-xl bg-primary-container text-on-primary-container shadow-md"><Icon className="size-7" /></span><h3 className="mt-6 text-headline-sm font-semibold text-on-surface">{advantage.title}</h3><p className="mt-3 text-body-md leading-6 text-on-surface-variant">{advantage.description}</p></article></Reveal>)}</div></section>
  );
}
