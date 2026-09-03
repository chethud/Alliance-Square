import { Hero } from "@/components/home/Hero";
import { BrandIntro } from "@/components/home/BrandIntro";
import { StatsSection } from "@/components/home/StatsSection";
import { ProjectGrid } from "@/components/home/ProjectGrid";
import { ProjectSpotlight } from "@/components/home/ProjectSpotlight";
import { WhyMysuru } from "@/components/home/WhyMysuru";
import { MysuruMap } from "@/components/home/MysuruMap";
import { WhyAllianceSquare } from "@/components/home/WhyAllianceSquare";
import { ApprovalSection } from "@/components/home/ApprovalSection";
import { TestimonialCarousel } from "@/components/home/TestimonialCarousel";
import { BlogGrid } from "@/components/home/BlogGrid";
import { LeadForm } from "@/components/forms/LeadForm";
import { WebSiteSchema } from "@/components/seo/StructuredData";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <WebSiteSchema />
      <Hero />
      <BrandIntro />
      <StatsSection />
      <ProjectGrid />
      <ProjectSpotlight />
      <WhyMysuru />
      <MysuruMap />
      <WhyAllianceSquare />
      <ApprovalSection />
      <TestimonialCarousel />
      <BlogGrid />
      <LeadForm />
    </>
  );
}
