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
      <section className="relative overflow-hidden pt-28 pb-16 md:pb-20">
        <div className="absolute inset-0">
          <Image src={post.image} alt={post.title} fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-br from-dark/90 via-dark/75 to-dark/50" />
          <div className="absolute inset-0 bg-mesh-dark opacity-60" />
        </div>

        <div className="container-main relative max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-white/60">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/insights" className="transition-colors hover:text-white">
                  Insights
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-white line-clamp-1" aria-current="page">
                {post.title}
              </li>
            </ol>
          </nav>

          <span className="badge">{post.category}</span>
          <time className="ml-3 text-sm text-white/60" dateTime={post.date}>
            {formatDate(post.date)}
          </time>
          <h1 className="heading-display-light mt-6">{post.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-white/75">{post.excerpt}</p>
        </div>
      </section>

      <div className="container-main pb-24 pt-12">
        <FadeIn delay={0.1}>
          <div className="prose-custom mx-auto max-w-3xl space-y-6 text-body">
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

        <div className="mt-16 text-center">
          <Link href="/insights" className="link-arrow">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Insights
          </Link>
        </div>
      </div>
    </article>
  );
}
