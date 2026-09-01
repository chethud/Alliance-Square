"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { company, navLinks } from "@/data/company";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-light-gray/60 bg-white py-3 shadow-subtle">
        <div className="container-main">
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-8">
            <Logo className="justify-self-start" />

            <nav
              className="hidden items-center justify-center gap-1 lg:flex xl:gap-2"
              aria-label="Main navigation"
            >
              {navLinks.map((link) => {
                const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative whitespace-nowrap rounded-full px-4 py-2 text-[13px] font-medium text-charcoal transition-colors duration-300 hover:text-brand-cyan xl:text-sm",
                      active && "text-brand-cyan"
                    )}
                  >
                    {link.label === "Why Alliance Square" ? (
                      <>
                        <span className="lg:inline xl:hidden">Why Us</span>
                        <span className="hidden xl:inline">{link.label}</span>
                      </>
                    ) : (
                      link.label
                    )}
                    {active && (
                      <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-brand-cyan" />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden items-center justify-end lg:flex">
              <a
                href={company.phoneHref}
                className="flex items-center gap-2 whitespace-nowrap text-sm font-medium text-charcoal transition-colors hover:text-brand-cyan"
                aria-label={`Call ${company.phone}`}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-cyan/10">
                  <Phone className="h-4 w-4 shrink-0 text-brand-cyan" />
                </span>
                {company.phone}
              </a>
            </div>

            <div className="flex items-center justify-end gap-2 lg:hidden">
              <a
                href={company.phoneHref}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-light-gray bg-white text-brand-cyan transition-colors hover:border-brand-cyan/30 hover:bg-brand-cyan/5"
                aria-label={`Call ${company.phone}`}
              >
                <Phone className="h-4 w-4" />
              </a>
              <Link href="/contact#site-visit" className="btn-primary px-4 py-2.5 text-xs">
                Visit
              </Link>
              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-light-gray bg-white text-charcoal transition-colors"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-dark/95 backdrop-blur-xl pt-24 lg:hidden">
          <nav className="container-main flex flex-col gap-1" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-4 text-lg font-medium text-white/90 transition-colors hover:bg-white/5 hover:text-brand-cyan"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={company.phoneHref}
              className="mt-6 flex items-center gap-3 rounded-xl px-4 py-4 text-lg font-medium text-brand-cyan"
            >
              <Phone className="h-5 w-5" />
              {company.phone}
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
