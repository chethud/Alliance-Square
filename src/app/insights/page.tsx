import type { Metadata } from "next";
import Image from "next/image";
import { InsightsIndexSchema } from "@/components/seo/StructuredData";
import { createPageMetadata } from "@/lib/seo/metadata";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { FadeIn } from "@/components/ui/Motion";
import { blogPosts } from "@/data/blogs";
import { insightsHero } from "@/data/images";

export const metadata: Metadata = createPageMetadata({
  title: "Real Estate Insights & Investment Guides for Mysuru",
  description:
    "Real estate insights, market updates, and investment guides for smarter property decisions in Mysuru.",
  path: "/insights",
  image: insightsHero,
});

export default function InsightsPage() {
  return (
    <>
      <InsightsIndexSchema />
      <PageHero
        label="Insights"
        title="Smarter Property Decisions"
        description="Real estate insights, market updates, and investment guides for Mysuru."
        image={insightsHero}
        imageAlt="Alliance Square property insights"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Insights" }]}
      />

      <section className="section-spacing bg-off-white pt-0">
        <div className="container-main">
          <div className="grid items-stretch gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, index) => (
              <FadeIn key={post.id} delay={index * 0.05} className="h-full">
                <Link
                  href={`/insights/${post.slug}`}
                  className="premium-card group relative block h-full min-h-[360px] overflow-hidden md:min-h-[400px]"
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
                    <h2 className="text-xl font-bold leading-snug text-white/85 md:text-2xl">
                      {post.title}
                    </h2>
                    <span className="link-arrow mt-4 text-brand-cyan">
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
