import { PageHero } from "@/components/ui/PageHero";
import { FadeIn } from "@/components/ui/Motion";
import { faqs } from "@/data/faqs";
import { FAQsIndexSchema } from "@/components/seo/StructuredData";
import { createPageMetadata } from "@/lib/seo/metadata";
import { heroSliderImages } from "@/data/images";

export const metadata = createPageMetadata({
  title: "FAQs | Buying Property in Mysuru",
  description:
    "Frequently asked questions about MUDA, DTCP, MDA, RERA approved sites and buying property in Mysuru.",
  path: "/faqs",
  image: heroSliderImages[2],
});

export default function FAQsPage() {
  return (
    <>
      <FAQsIndexSchema />
      <PageHero
        title="Frequently Asked Questions"
        description="Answers to common questions about approvals, documentation, and buying property in Mysuru."
        image={heroSliderImages[2]}
        imageAlt="Alliance Square Properties FAQs"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "FAQs" }]}
      />

      <section className="section-spacing bg-off-white">
        <div className="container-main max-w-3xl">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FadeIn key={faq.id} delay={index * 0.05}>
                <details className="group premium-card">
                  <summary className="cursor-pointer px-6 py-5 font-semibold text-charcoal transition-colors hover:text-brand-cyan md:px-8 md:py-6">
                    {faq.question}
                  </summary>
                  <div className="border-t border-light-gray/60 px-6 py-5 text-body whitespace-pre-line md:px-8 md:py-6">
                    {faq.answer}
                  </div>
                </details>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
