import type { Metadata } from "next";
import Link from "next/link";
import { AboutPageSchema } from "@/components/seo/StructuredData";
import { createPageMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { OfficePhotoCarousel } from "@/components/about/OfficePhotoCarousel";
import { SiteVisitCTA } from "@/components/home/SiteVisitCTA";
import {
  aboutBanner,
  aboutServices,
  allianceSquareAboutContent,
  propertiesInMysoreContent,
} from "@/data/about";

export const metadata: Metadata = createPageMetadata({
  title: "About Alliance Square Properties | 20+ Years in Mysuru Real Estate",
  description:
    "Learn about Alliance Square Properties — a pioneer in Mysuru real estate with 20+ years of excellence, professional services, and thousands of happy customers.",
  path: "/about",
  image: aboutBanner,
});

export default function AboutPage() {
  return (
    <>
      <AboutPageSchema />
      <PageHero
        title="About Us"
        image={aboutBanner}
        imageAlt="About Alliance Square Properties"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
      />

      <section className="section-spacing bg-off-white">
        <div className="container-main">
          <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-14">
            <div className="space-y-6">
              <SectionHeader
                label="Property Portal"
                title={propertiesInMysoreContent.title}
              />
              <p className="text-body">
                <a
                  href={propertiesInMysoreContent.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand-cyan hover:underline"
                >
                  Propertiesinmysore.com
                </a>{" "}
                {propertiesInMysoreContent.intro}
              </p>
              <OfficePhotoCarousel />
              <p className="text-body">{propertiesInMysoreContent.portalGuide}</p>
            </div>

            <div className="space-y-6">
              <SectionHeader label="About Us" title={allianceSquareAboutContent.title} />
              <p className="text-body">
                <Link href="/" className="font-semibold text-brand-cyan hover:underline">
                  Alliance Square
                </Link>{" "}
                {allianceSquareAboutContent.intro}
              </p>
              {allianceSquareAboutContent.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-body">
                  {paragraph}
                </p>
              ))}

              <div className="surface-card">
                <h3 className="text-xl font-bold text-charcoal">Our range of services include,</h3>
                <ul className="mt-6 space-y-4">
                  {aboutServices.map((service) => (
                    <li key={service.title} className="flex items-center gap-3">
                      <span className="h-2 w-2 shrink-0 rounded-full bg-brand-cyan" aria-hidden="true" />
                      <span className="text-sm font-medium text-charcoal md:text-base">{service.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteVisitCTA />
    </>
  );
}
