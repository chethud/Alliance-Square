import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { company, contact, footerLinks } from "@/data/company";

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/alliancesquare" },
  { label: "Instagram", href: "https://www.instagram.com/alliancesquare" },
  { label: "YouTube", href: "https://www.youtube.com/@alliancesquareproperties/" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-dark text-white">
      <div className="absolute inset-0 bg-mesh-dark opacity-40" />
      <div className="container-main relative section-spacing pb-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Logo />
            <h2 className="mt-8 text-2xl font-bold text-white md:text-3xl">
              Welcome to Alliance Square
            </h2>
            <div className="mt-8 flex flex-wrap gap-4">
              {socialLinks.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white/70 transition-colors hover:border-brand-cyan hover:text-brand-cyan"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="label-accent text-brand-cyan">Address</h3>
            <div className="mt-6 space-y-8 text-sm text-white/70">
              <div>
                <p className="mb-3 font-semibold text-white">Corporate Office</p>
                {contact.corporateOffice.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
                <a href={company.phoneHref} className="mt-3 block hover:text-brand-cyan">
                  {contact.corporateOffice.phone}
                </a>
                <span className="block">{contact.mobile[0]}</span>
              </div>
              <div>
                <p className="mb-3 font-semibold text-white">Sales Office</p>
                {contact.salesOffice.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
                <a href={company.phoneHref} className="mt-3 block hover:text-brand-cyan">
                  {contact.salesOffice.phone}
                </a>
                <span className="block">{contact.mobile[1]}</span>
              </div>
              <a href={`mailto:${company.email}`} className="block hover:text-brand-cyan">
                {company.email}
              </a>
            </div>
          </div>

          <div className="lg:col-span-4">
            <h3 className="label-accent text-brand-cyan">Quick Links</h3>
            <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/75 transition-colors hover:text-brand-cyan"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="divider-gradient mt-16" />
        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-white/45">
            © {new Date().getFullYear()} Alliance Square Properties. All Rights Reserved.
          </p>
          <div className="flex flex-wrap gap-6">
            <Link href="/privacy" className="text-sm text-white/45 hover:text-brand-cyan">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-white/45 hover:text-brand-cyan">
              Terms
            </Link>
            <Link href="/disclaimer" className="text-sm text-white/45 hover:text-brand-cyan">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
