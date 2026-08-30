import { PageHero } from "@/components/ui/PageHero";
import { TestimonialCarousel } from "@/components/home/TestimonialCarousel";
import { SiteVisitCTA } from "@/components/home/SiteVisitCTA";
import { TestimonialsPageSchema } from "@/components/seo/StructuredData";
import { createPageMetadata } from "@/lib/seo/metadata";
import { heroSliderImages } from "@/data/images";

export const metadata = createPageMetadata({
  title: "Customer Testimonials | Alliance Square Properties",
  description: "Customer testimonials and reviews for Alliance Square Properties, Mysuru.",
  path: "/testimonials",
  image: heroSliderImages[4],
});

export default function TestimonialsPage() {
  return (
    <>
      <TestimonialsPageSchema />
      <PageHero
        title="What Our Customers Say"
        description="Real experiences from homebuyers and investors who chose Alliance Square Properties."
        image={heroSliderImages[4]}
        imageAlt="Alliance Square customer testimonials"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Testimonials" }]}
      />
      <TestimonialCarousel className="pt-0" />
      <SiteVisitCTA />
    </>
  );
}
