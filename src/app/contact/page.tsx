import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ContactPageSchema } from "@/components/seo/StructuredData";
import { createPageMetadata } from "@/lib/seo/metadata";
import { ContactAddressPanel } from "@/components/contact/ContactAddressPanel";
import { ContactEnquiryForm } from "@/components/contact/ContactEnquiryForm";
import { contactBanner } from "@/data/contact-page";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Alliance Square Properties | Schedule a Site Visit",
  description:
    "Contact Alliance Square Properties in Mysuru for MUDA and DTCP approved plots, site visits, and property enquiries.",
  path: "/contact",
  image: contactBanner,
});

export default function ContactPage() {
  return (
    <>
      <ContactPageSchema />
      <PageHero
        title="Contact"
        image={contactBanner}
        imageAlt="Contact Alliance Square Properties"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
      />

      <section className="section-spacing bg-off-white">
        <div className="container-main">
          <div className="grid items-start gap-10 lg:grid-cols-[340px_1fr]">
            <ContactAddressPanel />
            <ContactEnquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
