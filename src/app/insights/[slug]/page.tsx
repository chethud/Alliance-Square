import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { FadeIn } from "@/components/ui/Motion";
import { BackButton } from "@/components/ui/BackButton";
import { BlogSchema } from "@/components/seo/StructuredData";
import { createPageMetadata } from "@/lib/seo/metadata";
import { blogPosts, getBlogBySlug } from "@/data/blogs";
import { formatDate } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return { title: "Article Not Found" };
  return createPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/insights/${post.slug}`,
    image: post.image,
    type: "article",
  });
}

export default async function InsightPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) notFound();

  return (
    <article>
      <BlogSchema post={post} />
      <section className="relative overflow-hidden">
        <div className="relative h-[200px] sm:h-[240px] md:h-[280px]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            quality={92}
            className="object-cover object-center hero-image-clarity"
            sizes="100vw"
          />
          <BackButton
            fallbackHref="/insights"
            label="Back to insights"
            className="absolute left-4 top-20 z-10 md:left-6 md:top-24"
          />
        </div>

        <div className="container-main pb-24 pt-8 md:pt-10">
          <div className="text-left">
            <span className="badge">{post.category}</span>
            <time className="ml-3 text-sm text-cool-gray" dateTime={post.date}>
              {formatDate(post.date)}
            </time>
            <h1 className="mt-6 text-[26px] font-extrabold leading-tight tracking-tight text-charcoal sm:text-[28px] md:text-[32px] md:whitespace-nowrap lg:text-[36px]">
              {post.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-cool-gray">{post.excerpt}</p>

            <FadeIn delay={0.1}>
              <div className="mt-6 space-y-6 text-body">
                <p>
                  Mysuru continues to emerge as one of South India&apos;s most compelling real estate destinations.
                  With improving connectivity, expanding infrastructure, and a quality of life that rivals metro cities,
                  the city presents thoughtful investment opportunities for homebuyers and investors alike.
                </p>
                <p>
                  At Alliance Square Properties, we help you navigate these opportunities with verified documentation,
                  transparent processes, and expert guidance from site visit to registration.
                </p>
              </div>
            </FadeIn>

            <div className="mt-10">
              <Link href="/insights" className="link-arrow">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back to Insights
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
