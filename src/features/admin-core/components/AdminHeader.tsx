import { ShieldCheck } from "lucide-react";

export function AdminHeader() {
  return <header className="sticky top-0 z-40 flex h-16 items-center border-b border-outline-variant/20 bg-surface/90 px-5 backdrop-blur-xl lg:ml-64 lg:px-8"><span className="inline-flex items-center gap-2 rounded-lg bg-secondary-fixed px-3 py-1.5 text-label-sm font-medium text-on-secondary-fixed"><ShieldCheck aria-hidden="true" className="size-4 text-secondary" />Hệ thống phân phối chuẩn hóa</span></header>;
}
