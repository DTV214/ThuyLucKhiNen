import type { Metadata } from "next";
import Link from "next/link";
import { BookOpenText, ChevronRight, FolderOpen } from "lucide-react";
import { BlogGrid } from "@/features/blog/components/BlogGrid";
import { blogCategories, blogPosts } from "@/features/blog/data/blog-data";

export const metadata: Metadata = {
  title: "Cẩm nang thủy lực & khí nén | CTY ThanhDanh-VMC",
  description:
    "Cẩm nang thiết bị thủy lực và khí nén từ CTY ThanhDanh-VMC: hướng dẫn chọn mã, bảo trì hệ thống, tin tức thương hiệu và kiến thức công nghiệp.",
};

export default function KnowledgeHubPage() {
  return (
    <>
      <section className="bg-surface-container-low px-gutter py-12 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-body-sm text-on-surface-variant">
            <Link href="/" className="hover:text-primary">Trang chủ</Link>
            <ChevronRight aria-hidden="true" className="size-4" />
            <span className="font-medium text-primary">Cẩm nang</span>
          </nav>
          <div className="mt-7 max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-fixed px-3 py-1.5 text-label-sm font-semibold text-primary">
              <BookOpenText aria-hidden="true" className="size-4" /> Kiến thức cho doanh nghiệp công nghiệp
            </span>
            <h1 className="mt-4 text-headline-lg font-bold leading-tight text-on-surface sm:text-display-sm">Tài nguyên &amp; Cẩm nang Kỹ thuật Thủy lực</h1>
            <p className="mt-4 max-w-2xl text-body-lg leading-7 text-on-surface-variant">
              Cập nhật kiến thức bảo dưỡng, lựa chọn thiết bị công nghiệp và tra cứu mã tương đương để hỗ trợ đội ngũ kỹ thuật, thu mua ra quyết định nhanh hơn.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-gutter py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-4">
          <aside className="lg:col-span-1" aria-label="Danh mục cẩm nang">
            <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-5 lg:sticky lg:top-28">
              <h2 className="flex items-center gap-2 text-headline-sm font-semibold text-on-surface"><FolderOpen aria-hidden="true" className="size-5 text-primary" />Danh mục bài viết</h2>
              <nav className="mt-4" aria-label="Lọc bài viết theo danh mục">
                <ul className="flex gap-2 overflow-x-auto pb-1 lg:block lg:space-y-1">
                  {blogCategories.map((category, index) => (
                    <li key={category} className="shrink-0">
                      <button type="button" className={`w-full rounded-lg px-3 py-2.5 text-left text-body-md transition-colors ${index === 0 ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container hover:text-primary"}`}>
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
              <p className="mt-5 border-t border-outline-variant/20 pt-5 text-body-sm leading-5 text-on-surface-variant">
                Cần hỗ trợ tra mã hoặc chọn thiết bị phù hợp? Đội ngũ CTY ThanhDanh-VMC sẵn sàng tư vấn.
              </p>
              <Link href="/lien-he" className="mt-3 inline-flex text-label-md font-semibold text-primary hover:underline">Liên hệ tư vấn</Link>
            </div>
          </aside>
          <div className="min-w-0 lg:col-span-3">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div><p className="text-label-md font-semibold uppercase tracking-wider text-primary">Bài viết mới nhất</p><h2 className="mt-1 text-headline-md font-bold text-on-surface">Kiến thức hữu ích cho vận hành &amp; thu mua</h2></div>
              <p className="hidden text-body-sm text-on-surface-variant sm:block">{blogPosts.length} bài viết</p>
            </div>
            <BlogGrid posts={blogPosts} />
          </div>
        </div>
      </section>
    </>
  );
}
