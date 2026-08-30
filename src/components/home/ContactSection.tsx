import Link from "next/link";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";
import { FadeIn } from "@/components/ui/Motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { contact, company } from "@/data/company";

export function ContactSection() {
  return (
    <section className="section-spacing bg-white" aria-labelledby="contact-heading">
      <div className="container-main">
        <SectionHeader label="Contact" title="Alliance Square Properties" />

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <FadeIn delay={0.1}>
              <div className="surface-card">
                <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-brand-cyan">
                  <MapPin className="h-4 w-4" />
                  Corporate Office
                </h3>
                <address className="mt-3 not-italic text-cool-gray">
                  {contact.corporateOffice.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
                <a
                  href={`tel:${contact.corporateOffice.phone.replace(/-/g, "")}`}
                  className="mt-3 block text-sm font-medium text-charcoal hover:text-brand-cyan"
                >
                  {contact.corporateOffice.phone}
                </a>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="surface-card">
                <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-brand-cyan">
                  <MapPin className="h-4 w-4" />
                  Sales Office
                </h3>
                <address className="mt-3 not-italic text-cool-gray">
                  {contact.salesOffice.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
                <p className="mt-3 text-sm text-cool-gray">{contact.salesOffice.hours}</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="flex flex-wrap gap-3">
                <a href={company.phoneHref} className="btn-secondary">
                  <Phone className="h-4 w-4" />
                  {company.phone}
                </a>
                <a href={`mailto:${company.email}`} className="btn-secondary">
                  <Mail className="h-4 w-4" />
                  Email
                </a>
                <a
                  href={`https://wa.me/${company.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              </div>
              <p className="mt-4 text-sm text-cool-gray">Mobile: {contact.mobile.join(" / ")}</p>
            </FadeIn>
          </div>

          <FadeIn delay={0.25}>
            <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-light-gray shadow-subtle">
              <iframe
                title="Alliance Square Properties location on Google Maps"
                src="https://maps.google.com/maps?q=Saraswathipuram+Mysuru&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
