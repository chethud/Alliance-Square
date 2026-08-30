import type { ReactNode } from "react";
import Link from "next/link";
import { Clock, Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { company, contact } from "@/data/company";

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/alliancesquare", icon: Facebook },
  { label: "Instagram", href: "https://www.instagram.com/alliancesquare", icon: Instagram },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@alliancesquareproperties/",
    icon: Youtube,
  },
] as const;

function FooterHeading({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-8 shrink-0 bg-brand-cyan" aria-hidden="true" />
      <h3 className="label-upper text-brand-cyan">{children}</h3>
    </div>
  );
}

function FooterContactItem({
  icon: Icon,
  children,
}: {
  icon: typeof MapPin;
  children: ReactNode;
}) {
  return (
    <p className="flex gap-3 text-sm leading-relaxed text-white/70">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-dark text-white">
      <div className="absolute inset-0 bg-mesh-dark opacity-40" />
      <div className="container-main relative pt-12 pb-8 md:pt-14">
        <div className="grid items-start gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-12">
          <div className="sm:col-span-2 lg:col-span-4">
            <Logo variant="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65 md:text-base">
              {company.tagline}
            </p>
            <Link
              href="/contact"
              className="btn-outline-light mt-8 inline-flex text-sm"
            >
              Get in Touch
            </Link>
          </div>

          <div className="lg:col-span-4">
            <FooterHeading>Corporate Office</FooterHeading>
            <div className="mt-5 space-y-4">
              <FooterContactItem icon={MapPin}>
                {contact.corporateOffice.address.map((line, index) => (
                  <span key={line}>
                    {line}
                    {index < contact.corporateOffice.address.length - 1 && <br />}
                  </span>
                ))}
              </FooterContactItem>
              <FooterContactItem icon={Phone}>
                <a
                  href={`tel:${contact.corporateOffice.phone.replace(/-/g, "")}`}
                  className="transition-colors hover:text-brand-cyan"
                >
                  {contact.corporateOffice.phone}
                </a>
                {" · "}
                <a href={`tel:${contact.mobile[0]}`} className="transition-colors hover:text-brand-cyan">
                  {contact.mobile[0]}
                </a>
              </FooterContactItem>
              <div className="flex flex-wrap items-center gap-3 pl-7">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-all duration-300 hover:border-brand-cyan hover:bg-brand-cyan/10 hover:text-brand-cyan"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <FooterHeading>Sales Office</FooterHeading>
            <div className="mt-5 space-y-4">
              <FooterContactItem icon={MapPin}>
                {contact.salesOffice.address.map((line, index) => (
                  <span key={line}>
                    {line}
                    {index < contact.salesOffice.address.length - 1 && <br />}
                  </span>
                ))}
              </FooterContactItem>
              <FooterContactItem icon={Phone}>
                <a
                  href={`tel:${contact.salesOffice.phone.replace(/-/g, "")}`}
                  className="transition-colors hover:text-brand-cyan"
                >
                  {contact.salesOffice.phone}
                </a>
                {" · "}
                <a href={`tel:${contact.mobile[1]}`} className="transition-colors hover:text-brand-cyan">
                  {contact.mobile[1]}
                </a>
              </FooterContactItem>
              <FooterContactItem icon={Mail}>
                <a href={`mailto:${company.email}`} className="transition-colors hover:text-brand-cyan">
                  {company.email}
                </a>
              </FooterContactItem>
              {contact.salesOffice.hours && (
                <FooterContactItem icon={Clock}>{contact.salesOffice.hours}</FooterContactItem>
              )}
            </div>
          </div>
        </div>

        <div className="divider-gradient mt-8 md:mt-10" />
        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-white/45">
            © {new Date().getFullYear()} Alliance Square Properties. All Rights Reserved.
          </p>
          <div className="flex flex-wrap gap-6">
            <Link href="/privacy" className="text-sm text-white/45 transition-colors hover:text-brand-cyan">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-white/45 transition-colors hover:text-brand-cyan">
              Terms
            </Link>
            <Link href="/disclaimer" className="text-sm text-white/45 transition-colors hover:text-brand-cyan">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
