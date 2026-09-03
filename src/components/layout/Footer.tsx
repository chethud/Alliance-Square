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
  return <h3 className="label-upper text-brand-cyan">{children}</h3>;
}

function FooterContactItem({
  icon: Icon,
  children,
}: {
  icon: typeof MapPin;
  children: ReactNode;
}) {
  return (
    <p className="flex gap-2 text-xs leading-snug text-cool-gray md:gap-3 md:text-sm md:leading-relaxed">
      <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-cyan md:h-4 md:w-4" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}

function AddressLines({ lines }: { lines: string[] }) {
  return (
    <>
      <span className="md:hidden">{lines.join(" ")}</span>
      <span className="hidden md:inline">
        {lines.map((line, index) => (
          <span key={line}>
            {line}
            {index < lines.length - 1 && <br />}
          </span>
        ))}
      </span>
    </>
  );
}

function SocialLinks({ compact = false }: { compact?: boolean }) {
  return (
    <>
      {socialLinks.map(({ label, href, icon: Icon }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={
            compact
              ? "flex h-8 w-8 items-center justify-center rounded-full border border-light-gray bg-white text-cool-gray transition-colors hover:border-brand-cyan hover:text-brand-cyan"
              : "flex h-10 w-10 items-center justify-center rounded-full border border-light-gray bg-white text-cool-gray transition-all duration-300 hover:border-brand-cyan hover:bg-brand-cyan/10 hover:text-brand-cyan"
          }
        >
          <Icon className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} aria-hidden="true" />
        </a>
      ))}
    </>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-light-gray/80 bg-white text-charcoal">
      <div className="container-main relative pt-8 pb-6 md:pt-14 md:pb-8">
        <div className="grid grid-cols-2 items-start gap-x-4 gap-y-6 md:grid-cols-12 md:gap-x-10 md:gap-y-12">
          <div className="col-span-2 flex items-start justify-between gap-4 md:col-span-4 md:block">
            <div className="min-w-0">
              <Logo />
              <p className="mt-3 max-w-sm text-xs leading-relaxed text-cool-gray md:mt-5 md:text-base">
                {company.tagline}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2 md:hidden">
              <SocialLinks compact />
            </div>
          </div>

          <div className="min-w-0 md:col-span-4">
            <FooterHeading>Corporate Office</FooterHeading>
            <div className="mt-3 space-y-2.5 md:mt-5 md:space-y-4">
              <FooterContactItem icon={MapPin}>
                <AddressLines lines={contact.corporateOffice.address} />
              </FooterContactItem>
              <FooterContactItem icon={Phone}>
                <span className="flex flex-col gap-0.5">
                  <a
                    href={`tel:${contact.corporateOffice.phone.replace(/-/g, "")}`}
                    className="transition-colors hover:text-brand-cyan"
                  >
                    {contact.corporateOffice.phone}
                  </a>
                  <a href={`tel:${contact.mobile[0]}`} className="transition-colors hover:text-brand-cyan">
                    {contact.mobile[0]}
                  </a>
                </span>
              </FooterContactItem>
              <div className="hidden flex-wrap items-center gap-3 pl-7 md:flex">
                <SocialLinks />
              </div>
            </div>
          </div>

          <div className="min-w-0 md:col-span-4">
            <FooterHeading>Sales Office</FooterHeading>
            <div className="mt-3 space-y-2.5 md:mt-5 md:space-y-4">
              <FooterContactItem icon={MapPin}>
                <AddressLines lines={contact.salesOffice.address} />
              </FooterContactItem>
              <FooterContactItem icon={Phone}>
                <span className="flex flex-col gap-0.5">
                  <a
                    href={`tel:${contact.salesOffice.phone.replace(/-/g, "")}`}
                    className="transition-colors hover:text-brand-cyan"
                  >
                    {contact.salesOffice.phone}
                  </a>
                  <a href={`tel:${contact.mobile[1]}`} className="transition-colors hover:text-brand-cyan">
                    {contact.mobile[1]}
                  </a>
                </span>
              </FooterContactItem>
              <FooterContactItem icon={Mail}>
                <a href={`mailto:${company.email}`} className="break-all transition-colors hover:text-brand-cyan">
                  {company.email}
                </a>
              </FooterContactItem>
              {contact.salesOffice.hours && (
                <FooterContactItem icon={Clock}>
                  <span className="md:hidden">Mon–Sun, 10 AM – 7 PM</span>
                  <span className="hidden md:inline">{contact.salesOffice.hours}</span>
                </FooterContactItem>
              )}
            </div>
          </div>
        </div>

        <div className="divider-gradient mt-6 md:mt-10" />
        <div className="mt-4 flex flex-col gap-2.5 md:mt-8 md:flex-row md:items-center md:justify-between md:gap-4">
          <p className="text-[11px] leading-relaxed text-cool-gray md:text-sm">
            © {new Date().getFullYear()} Alliance Square Properties. All Rights Reserved. Designed by{" "}
            <a
              href="https://admarkdigitals.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-brand-cyan"
            >
              Admark Digitals
            </a>
            .
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 md:gap-6">
            <Link href="/privacy" className="text-[11px] text-cool-gray transition-colors hover:text-brand-cyan md:text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-[11px] text-cool-gray transition-colors hover:text-brand-cyan md:text-sm">
              Terms
            </Link>
            <Link href="/disclaimer" className="text-[11px] text-cool-gray transition-colors hover:text-brand-cyan md:text-sm">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
