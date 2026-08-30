import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { heroSliderImages } from "@/data/images";

export const metadata: Metadata = {
  title: "Terms & Conditions",
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        title="Terms & Conditions"
        image={heroSliderImages[8]}
        imageAlt="Alliance Square Terms and Conditions"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Terms & Conditions" }]}
      />
      <section className="section-spacing bg-off-white">
        <div className="container-main max-w-3xl">
          <div className="surface-card">
            <p className="text-body">
              All property information on this website is subject to availability and verification.
              Prices, approvals, and project details may change. Please contact our team for the latest information.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
