"use client";

import Link from "next/link";
import { Phone, MessageCircle, Calendar } from "lucide-react";
import { company } from "@/data/company";

export function FloatingActions() {
  return (
    <div
      className="fixed bottom-6 right-5 z-40 flex flex-col gap-3 sm:right-6"
      aria-label="Quick contact actions"
    >
      <a
        href={`https://wa.me/${company.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-12 w-12 items-center justify-center rounded-full border border-light-gray/80 bg-white shadow-premium transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-cyan hover:bg-brand-cyan hover:shadow-glow"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle className="h-5 w-5 text-brand-cyan transition-colors group-hover:text-white" />
      </a>
      <a
        href={company.phoneHref}
        className="group flex h-12 w-12 items-center justify-center rounded-full border border-light-gray/80 bg-white shadow-premium transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-cyan hover:bg-brand-cyan hover:shadow-glow"
        aria-label={`Call ${company.phone}`}
      >
        <Phone className="h-5 w-5 text-brand-cyan transition-colors group-hover:text-white" />
      </a>
      <Link
        href="/contact#site-visit"
        className="group flex h-12 w-12 items-center justify-center rounded-full bg-brand-cyan shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:bg-deep-blue hover:shadow-premium"
        aria-label="Schedule a site visit"
      >
        <Calendar className="h-5 w-5 text-white" />
      </Link>
    </div>
  );
}
