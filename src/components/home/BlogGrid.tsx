import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/ui/Motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { blogPosts } from "@/data/blogs";
import { formatDate } from "@/lib/utils";

export function BlogGrid() {
  const posts = blogPosts.slice(0, 3);

  return (
    <section className="section-pad bg-off-white" aria-labelledby="insights-heading">
      <div className="container-main">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            label="Insights"
            title="Insights for Smarter Property Decisions"
          />
          <Link href="/insights" className="link-arrow shrink-0">
            View All Articles →
          </Link>
        </div>

        <div className="mt-8 grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <FadeIn key={post.id} delay={index * 0.1} className="h-full">
              <Link href={`/insights/${post.slug}`} className="premium-card group flex h-full flex-col">
                <div className="relative aspect-[16/10] shrink-0 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <div className="flex items-center gap-3">
                    <span className="badge">{post.category}</span>
                    <span className="text-xs text-cool-gray">{formatDate(post.date)}</span>
                  </div>
                  <h3 className="mt-4 line-clamp-2 min-h-[3.5rem] text-xl font-bold leading-snug text-charcoal md:min-h-[4rem] md:text-2xl">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 min-h-[4.5rem] text-sm leading-relaxed text-cool-gray">
                    {post.excerpt}
                  </p>
                  <span className="link-arrow mt-auto pt-5">Read Article →</span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
