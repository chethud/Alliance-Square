import type { Metadata } from "next";
import { LayoutsPageSchema } from "@/components/seo/StructuredData";
import { createPageMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/ui/PageHero";
import { LayoutListing } from "@/components/layouts/LayoutListing";
import { layoutsBanner } from "@/data/images";

export const metadata: Metadata = createPageMetadata({
  title: "Residential Layouts & Plots for Sale in Mysuru",
  description:
    "Browse MUDA, MDA and DTCP approved residential plots and layouts for sale in Mysuru — 30×40, 30×50 and premium sites.",
  path: "/layouts",
  image: layoutsBanner,
});

export default function LayoutsPage() {
  return (
    <>
      <LayoutsPageSchema />
      <PageHero
        title="Layouts"
        description="MUDA approved, DTCP approved, and premium residential plots across Mysuru — 30×40, 30×50, 30×60 and odd dimension sites for sale."
        image={layoutsBanner}
        imageAlt="Alliance Square featured layouts in Mysuru"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Layouts" }]}
      />
      <LayoutListing />
    </>
  );
}
