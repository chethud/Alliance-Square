import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { FadeIn } from "@/components/ui/Motion";
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
      <section className="relative overflow-hidden pt-28">
        <div className="relative aspect-[21/9] min-h-[280px] md:min-h-[320px]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            quality={92}
            className="object-cover object-center hero-image-clarity"
            sizes="100vw"
          />
        </div>

        <div className="container-main pb-12 pt-8 md:pb-16 md:pt-10">
          <div className="max-w-3xl text-left">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-charcoal/70">
                <li>
                  <Link href="/" className="transition-colors hover:text-charcoal">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/insights" className="transition-colors hover:text-charcoal">
                    Insights
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="font-medium text-charcoal line-clamp-1" aria-current="page">
                  {post.title}
                </li>
              </ol>
            </nav>

            <span className="badge">{post.category}</span>
            <time className="ml-3 text-sm text-cool-gray" dateTime={post.date}>
              {formatDate(post.date)}
            </time>
            <h1 className="heading-display mt-6">{post.title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-cool-gray">{post.excerpt}</p>
          </div>
        </div>
      </section>

      <div className="container-main pb-24">
        <FadeIn delay={0.1}>
          <div className="max-w-3xl space-y-6 text-left text-body">
            <p>{post.excerpt}</p>
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

        <div className="mt-10 text-left">
          <Link href="/insights" className="link-arrow">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Insights
          </Link>
        </div>
      </div>
    </article>
  );
}
