"use client";

import { Filter, RotateCcw, Wrench } from "lucide-react";
import { useRouter } from "next/navigation";
import type { PublicEntity } from "@/features/core/api/public-api";

type FilterSidebarProps = Readonly<{
  categories: ReadonlyArray<PublicEntity>;
  brands: ReadonlyArray<PublicEntity>;
  selectedCategoryId?: string;
  selectedBrandId?: string;
  search?: string;
}>;

/** Updates category/brand URL params; the page fetches and renders matching data on the server. */
export function FilterSidebar({ categories, brands, selectedCategoryId = "", selectedBrandId = "", search = "" }: FilterSidebarProps) {
  const router = useRouter();

  const navigate = (categoryId: string, brandId: string) => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (categoryId) params.set("category", categoryId);
    if (brandId) params.set("brand", brandId);
    const query = params.toString();
    router.push(query ? `/san-pham?${query}` : "/san-pham", { scroll: false });
  };

  return (
    <aside className="lg:col-span-1">
      <div className="rounded-2xl bg-surface-container-lowest p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <h2 className="inline-flex items-center gap-2 text-headline-sm font-semibold text-on-surface"><Filter className="size-5 text-primary" />Bộ lọc kỹ thuật</h2>
          <button type="button" onClick={() => navigate("", "")} className="inline-flex items-center gap-1 text-body-sm font-medium text-primary hover:underline"><RotateCcw className="size-3.5" />Đặt lại</button>
        </div>

        <fieldset className="mt-6">
          <legend className="text-label-md font-semibold uppercase tracking-wide text-on-surface">Danh mục thiết bị</legend>
          <div className="mt-3 space-y-3">
            {categories.length ? categories.map((category) => {
              const id = `category-${category.id}`;
              const checked = selectedCategoryId === category.id;
              return <label key={category.id} htmlFor={id} className="flex cursor-pointer items-start gap-3 text-body-md text-on-surface-variant transition-colors hover:text-primary"><input id={id} type="checkbox" checked={checked} onChange={(event) => navigate(event.target.checked ? category.id : "", selectedBrandId)} className="mt-0.5 size-4 rounded border-outline-variant text-primary focus:ring-primary" />{category.name}</label>;
            }) : <p className="text-body-sm text-on-surface-variant">Chưa có dữ liệu.</p>}
          </div>
        </fieldset>

        <fieldset className="mt-6 border-t border-outline-variant/20 pt-6">
          <legend className="text-label-md font-semibold uppercase tracking-wide text-on-surface">Thương hiệu</legend>
          <div className="mt-3 space-y-3">
            {brands.length ? brands.map((brand) => {
              const id = `brand-${brand.id}`;
              const checked = selectedBrandId === brand.id;
              return <label key={brand.id} htmlFor={id} className="flex cursor-pointer items-start gap-3 text-body-md text-on-surface-variant transition-colors hover:text-primary"><input id={id} type="checkbox" checked={checked} onChange={(event) => navigate(selectedCategoryId, event.target.checked ? brand.id : "")} className="mt-0.5 size-4 rounded border-outline-variant text-primary focus:ring-primary" />{brand.name}</label>;
            }) : <p className="text-body-sm text-on-surface-variant">Chưa có dữ liệu.</p>}
          </div>
        </fieldset>
      </div>
      <section className="mt-6 rounded-2xl bg-surface-container p-6" aria-labelledby="technical-support-title">
        <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Wrench className="size-5" /></span>
        <h2 id="technical-support-title" className="mt-4 text-headline-sm font-semibold text-on-surface">Cần tư vấn kỹ thuật?</h2>
        <p className="mt-2 text-body-sm leading-5 text-on-surface-variant">Kỹ sư CTY ThanhDanh-VMC sẵn sàng hỗ trợ tính toán lưu lượng và áp suất cho dây chuyền của bạn.</p>
        <a href="/lien-he" className="mt-4 inline-block text-label-md font-semibold text-primary hover:underline">Liên hệ kỹ sư trưởng</a>
      </section>
    </aside>
  );
}
