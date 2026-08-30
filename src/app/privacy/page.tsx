import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { heroSliderImages } from "@/data/images";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        title="Privacy Policy"
        image={heroSliderImages[7]}
        imageAlt="Alliance Square Privacy Policy"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
      />
      <section className="section-spacing bg-off-white">
        <div className="container-main max-w-3xl">
          <div className="surface-card">
            <p className="text-body">
              Alliance Square Properties respects your privacy. Information collected through enquiry forms
              is used solely to respond to your requests and provide property-related services.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
