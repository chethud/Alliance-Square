import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/ui/Motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { blogPosts } from "@/data/blogs";

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
              <Link
                href={`/insights/${post.slug}`}
                className="premium-card group relative block h-full min-h-[280px] overflow-hidden md:min-h-[400px]"
              >
                <div className="absolute inset-0">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/55 via-35% to-dark/15" />

                <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col p-6 md:p-7">
                  <h3 className="text-xl font-bold leading-snug text-white/85 md:text-2xl">
                    {post.title}
                  </h3>
                  <span className="link-arrow mt-4 text-brand-cyan">Read Article →</span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
