import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Download, ArrowRight } from "lucide-react";
import { ApprovalBadge } from "@/components/projects/ApprovalBadge";
import { Gallery } from "@/components/projects/Gallery";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { SiteVisitForm } from "@/components/forms/SiteVisitForm";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/ui/Motion";
import { BackButton } from "@/components/ui/BackButton";
import { ProjectSchema } from "@/components/seo/StructuredData";
import { getProjectBySlug, getRelatedProjects, projects, layoutsBrochureUrl } from "@/data/projects";
import { createPageMetadata } from "@/lib/seo/metadata";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  return createPageMetadata({
    title: `${project.name} | Plots for Sale in Mysuru`,
    description: project.listingDescription ?? project.description,
    path: `/projects/${project.slug}`,
    image: project.heroImage,
  });
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const related = getRelatedProjects(slug);

  return (
    <>
      <ProjectSchema project={project} />
      <section className="relative overflow-hidden">
        <div className="relative aspect-[21/9] min-h-[380px]">
          <Image
            src={project.heroImage}
            alt={project.name}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-dark/90 via-dark/60 to-dark/30" />
          <div className="absolute inset-0 bg-mesh-dark opacity-50" />
          <BackButton
            fallbackHref="/layouts"
            label="Back to layouts"
            className="absolute left-4 top-24 z-10 md:left-6 md:top-28"
          />
        </div>

        <div className="container-main relative -mt-32 pb-8 md:-mt-36 md:pb-10">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-white/60">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/layouts" className="transition-colors hover:text-white">
                  Layouts
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-white" aria-current="page">
                {project.name}
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl rounded-2xl border border-white/10 bg-white/95 p-8 shadow-premium backdrop-blur-xl md:p-12">
            <ApprovalBadge approvals={project.approvals} />
            <h1 className="heading-section mt-6">{project.name}</h1>
            <p className="mt-3 flex items-center gap-2 text-cool-gray">
              <MapPin className="h-4 w-4 text-brand-cyan" aria-hidden="true" />
              {project.location.area}, {project.location.city}
            </p>
            <p className="mt-4 text-2xl font-bold text-charcoal">{project.priceLabel}</p>
            <p className="mt-4 text-body">{project.tagline}</p>
            <a
              href={layoutsBrochureUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary mt-8 inline-flex w-full sm:w-auto"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download Brochure
            </a>
          </div>
        </div>
      </section>

      <section className="section-spacing bg-off-white pt-0 pb-12 md:pb-14">
        <div className="container-main grid gap-10 lg:grid-cols-12">
          <div className="space-y-10 lg:col-span-8">
            <FadeIn>
              <div>
                <h2 className="font-bold text-3xl text-charcoal">Overview</h2>
                <p className="mt-5 text-body">{project.description}</p>
              </div>
            </FadeIn>

            <FadeIn>
              <div>
                <h2 className="font-bold text-3xl text-charcoal">Project Highlights</h2>
                <ul className="mt-6 grid gap-4 md:grid-cols-2">
                  {project.highlights.map((h) => (
                    <li key={h} className="surface-card flex items-start gap-3 py-4 text-sm text-cool-gray md:text-base">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-cyan" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn>
              <div>
                <h2 className="font-bold text-3xl text-charcoal">Available Plot Sizes</h2>
                <div className="mt-6 flex flex-wrap gap-3">
                  {project.plotSizes.map((size) => (
                    <span
                      key={size}
                      className="rounded-full border border-light-gray bg-white px-6 py-3 text-sm font-semibold text-charcoal shadow-subtle"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn>
              <div>
                <h2 className="font-bold text-3xl text-charcoal">Amenities & Facilities</h2>
                <div className="mt-6 grid gap-8 md:grid-cols-2">
                  <ul className="surface-card space-y-3">
                    {project.amenities.map((a) => (
                      <li key={a} className="flex items-start gap-2 text-sm text-cool-gray">
                        <span className="mt-1 text-brand-cyan">▪</span>
                        {a}
                      </li>
                    ))}
                  </ul>
                  <ul className="surface-card space-y-3">
                    {project.facilities.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-cool-gray">
                        <span className="mt-1 text-brand-cyan">▪</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>

            {project.nearbyLandmarks && (
              <FadeIn>
                <div>
                  <h2 className="font-bold text-3xl text-charcoal">Nearby Landmarks</h2>
                  <ul className="mt-6 space-y-3">
                    {project.nearbyLandmarks.map((l) => (
                      <li key={l} className="flex items-center gap-3 text-cool-gray">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />
                        {l}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            )}

            <FadeIn>
              <div>
                <h2 className="font-bold text-3xl text-charcoal">Gallery</h2>
                <div className="mt-6">
                  <Gallery images={project.gallery} projectName={project.name} />
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <SiteVisitForm projectName={project.name} />
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-spacing bg-white pt-0">
          <div className="container-main">
            <SectionHeader
              label="Explore More"
              title="Related Projects"
              description="Discover similar layouts and investment opportunities across Mysuru."
            />
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/layouts" className="link-arrow">
                View All Layouts
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
