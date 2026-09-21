import { Filter, RotateCcw, Wrench } from "lucide-react";
import { filterGroups } from "@/features/catalog/data/catalog-data";

/** Static filter form. Its native fields can be wired to URL search params in a later phase. */
export function FilterSidebar() {
  return (
    <aside className="lg:col-span-1">
      <form className="rounded-2xl bg-surface-container-lowest p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3"><h2 className="inline-flex items-center gap-2 text-headline-sm font-semibold text-on-surface"><Filter className="size-5 text-primary" />Bộ lọc kỹ thuật</h2><button type="reset" className="inline-flex items-center gap-1 text-body-sm font-medium text-primary hover:underline"><RotateCcw className="size-3.5" />Đặt lại</button></div>
        {filterGroups.map((group, groupIndex) => <fieldset key={group.id} className={groupIndex === 0 ? "mt-6" : "mt-6 border-t border-outline-variant/20 pt-6"}><legend className="text-label-md font-semibold uppercase tracking-wide text-on-surface">{group.title}</legend><div className="mt-3 space-y-3">{group.options.map((option, optionIndex) => { const id = `${group.id}-${optionIndex}`; return <label key={option} htmlFor={id} className="flex cursor-pointer items-start gap-3 text-body-md text-on-surface-variant transition-colors hover:text-primary"><input id={id} name={group.id} type="checkbox" defaultChecked={(group.id === "category" && optionIndex === 0) || (group.id === "brand" && optionIndex === 0) || (group.id === "pressure" && optionIndex === 2)} className="mt-0.5 size-4 rounded border-outline-variant text-primary focus:ring-primary" />{option}</label>; })}</div></fieldset>)}
        <button type="submit" className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary-container px-4 py-3 text-label-md font-semibold text-on-primary-container transition-colors hover:bg-primary"><Filter className="size-4" />Áp dụng bộ lọc</button>
      </form>
      <section className="mt-6 rounded-2xl bg-surface-container p-6" aria-labelledby="technical-support-title"><span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Wrench className="size-5" /></span><h2 id="technical-support-title" className="mt-4 text-headline-sm font-semibold text-on-surface">Cần tư vấn kỹ thuật?</h2><p className="mt-2 text-body-sm leading-5 text-on-surface-variant">Kỹ sư CTY ThanhDanh-VMC sẵn sàng hỗ trợ tính toán lưu lượng và áp suất cho dây chuyền của bạn.</p><a href="/lien-he" className="mt-4 inline-block text-label-md font-semibold text-primary hover:underline">Liên hệ kỹ sư trưởng</a></section>
    </aside>
  );
}
