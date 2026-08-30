import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { heroSliderImages } from "@/data/images";

export const metadata: Metadata = {
  title: "Disclaimer",
};

export default function DisclaimerPage() {
  return (
    <>
      <PageHero
        title="Disclaimer"
        image={heroSliderImages[9]}
        imageAlt="Alliance Square Disclaimer"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Disclaimer" }]}
      />
      <section className="section-spacing bg-off-white">
        <div className="container-main max-w-3xl">
          <div className="surface-card">
            <p className="text-body">
              Infrastructure developments and growth projections mentioned on this website are based on publicly
              reported information and should not be construed as guaranteed outcomes. Property investment
              carries inherent risks. Please verify all documentation independently before making investment decisions.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
