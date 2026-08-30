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
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navText = scrolled || !isHome ? "text-charcoal" : "text-white";
  const navHover = "hover:text-brand-cyan";

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled || !isHome
            ? "border-b border-light-gray/60 bg-white/90 py-3 shadow-subtle backdrop-blur-xl"
            : "bg-transparent py-5"
        )}
      >
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
                      "relative whitespace-nowrap rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-300 xl:text-sm",
                      navText,
                      navHover,
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

            <div className="hidden items-center justify-end gap-4 lg:flex">
              <a
                href={company.phoneHref}
                className={cn(
                  "hidden items-center gap-2 whitespace-nowrap text-sm font-medium transition-colors xl:flex",
                  navText,
                  navHover
                )}
                aria-label={`Call ${company.phone}`}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-cyan/10">
                  <Phone className="h-4 w-4 shrink-0 text-brand-cyan" />
                </span>
                {company.phone}
              </a>
              <Link href="/contact#site-visit" className="btn-primary whitespace-nowrap text-xs xl:text-sm">
                Schedule Site Visit
              </Link>
            </div>

            <div className="flex items-center justify-end gap-2 lg:hidden">
              <Link href="/contact#site-visit" className="btn-primary px-4 py-2.5 text-xs">
                Visit
              </Link>
              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border transition-colors",
                  scrolled || !isHome
                    ? "border-light-gray bg-white text-charcoal"
                    : "border-white/20 bg-white/10 text-white backdrop-blur-sm"
                )}
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
