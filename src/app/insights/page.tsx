import type { Metadata } from "next";
import Image from "next/image";
import { InsightsIndexSchema } from "@/components/seo/StructuredData";
import { createPageMetadata } from "@/lib/seo/metadata";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { FadeIn } from "@/components/ui/Motion";
import { blogPosts } from "@/data/blogs";
import { heroSliderImages } from "@/data/images";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = createPageMetadata({
  title: "Real Estate Insights & Investment Guides for Mysuru",
  description:
    "Real estate insights, market updates, and investment guides for smarter property decisions in Mysuru.",
  path: "/insights",
  image: heroSliderImages[5],
});

export default function InsightsPage() {
  return (
    <>
      <InsightsIndexSchema />
      <PageHero
        label="Insights"
        title="Smarter Property Decisions"
        description="Real estate insights, market updates, and investment guides for Mysuru."
        image={heroSliderImages[5]}
        imageAlt="Alliance Square property insights"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Insights" }]}
      />

      <section className="section-spacing bg-off-white pt-0">
        <div className="container-main">
          <div className="grid items-stretch gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, index) => (
              <FadeIn key={post.id} delay={index * 0.05} className="h-full">
                <Link href={`/insights/${post.slug}`} className="premium-card group flex h-full flex-col">
                  <div className="relative aspect-[16/10] shrink-0 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                  <div className="flex flex-1 flex-col p-6 md:p-7">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="badge">{post.category}</span>
                      <span className="text-xs text-cool-gray">{formatDate(post.date)}</span>
                    </div>
                    <h2 className="mt-4 line-clamp-2 min-h-[3.5rem] text-xl font-bold leading-snug text-charcoal transition-colors group-hover:text-brand-cyan md:min-h-[4rem] md:text-2xl">
                      {post.title}
                    </h2>
                    <p className="mt-2 line-clamp-3 min-h-[4.5rem] flex-1 text-sm leading-relaxed text-cool-gray">
                      {post.excerpt}
                    </p>
                    <span className="link-arrow mt-auto pt-5">
                      Read Article
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
