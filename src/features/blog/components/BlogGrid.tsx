import { BlogCard } from "@/features/blog/components/BlogCard";
import type { BlogPost } from "@/features/blog/data/blog-data";

type BlogGridProps = Readonly<{ posts: ReadonlyArray<BlogPost> }>;

/** Server-rendered article list; accepts injected data for an easy CMS migration. */
export function BlogGrid({ posts }: BlogGridProps) {
  return <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">{posts.map((post) => <BlogCard key={post.id} post={post} />)}</div>;
}
