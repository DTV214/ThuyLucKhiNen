import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, FolderOpen } from "lucide-react";
import type { BlogPost } from "@/features/blog/data/blog-data";

type BlogCardProps = Readonly<{ post: BlogPost }>;

/** A semantic article preview, ready to link to a future CMS-backed article route. */
export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-outline-variant/20 bg-surface-container-lowest shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <Link href={`/cam-nang/${post.slug}`} className="relative block aspect-[16/9] overflow-hidden bg-surface-container" aria-label={`Đọc bài: ${post.title}`}>
        <Image src={post.coverImage} alt="" fill sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw" className="object-cover transition duration-300 group-hover:scale-105" />
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-body-sm text-on-surface-variant">
          <span className="inline-flex items-center gap-1.5"><FolderOpen aria-hidden="true" className="size-4 text-primary" />{post.category}</span>
          <span className="inline-flex items-center gap-1.5"><CalendarDays aria-hidden="true" className="size-4 text-primary" />{post.date}</span>
        </div>
        <h2 className="mt-4 text-headline-sm font-semibold leading-6 text-on-surface"><Link href={`/cam-nang/${post.slug}`} className="transition-colors hover:text-primary">{post.title}</Link></h2>
        <p className="mt-3 text-body-md leading-6 text-on-surface-variant">{post.excerpt}</p>
        <Link href={`/cam-nang/${post.slug}`} className="mt-5 inline-flex items-center gap-1.5 text-label-md font-semibold text-primary hover:underline">Đọc bài viết <ArrowRight aria-hidden="true" className="size-4" /></Link>
      </div>
    </article>
  );
}
