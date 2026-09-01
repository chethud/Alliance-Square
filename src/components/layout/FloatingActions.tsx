"use client";

import { useState } from "react";
import { Menu, MessageCircle, Phone, X } from "lucide-react";
import { company } from "@/data/company";
import { cn } from "@/lib/utils";

export function FloatingActions() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-3 sm:right-6"
      aria-label="Quick contact actions"
    >
      <div
        className={cn(
          "flex flex-col items-end gap-3 transition-all duration-300",
          open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
        )}
        aria-hidden={!open}
      >
        <a
          href={`https://wa.me/${company.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={open ? 0 : -1}
          className="group flex h-12 w-12 items-center justify-center rounded-full border border-light-gray/80 bg-white shadow-premium transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-cyan hover:bg-brand-cyan hover:shadow-glow"
          aria-label="Contact on WhatsApp"
        >
          <MessageCircle className="h-5 w-5 text-brand-cyan transition-colors group-hover:text-white" />
        </a>
        <a
          href={company.phoneHref}
          tabIndex={open ? 0 : -1}
          className="group flex h-12 w-12 items-center justify-center rounded-full border border-light-gray/80 bg-white shadow-premium transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-cyan hover:bg-brand-cyan hover:shadow-glow"
          aria-label={`Call ${company.phone}`}
        >
          <Phone className="h-5 w-5 text-brand-cyan transition-colors group-hover:text-white" />
        </a>
      </div>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label={open ? "Close quick contact menu" : "Open quick contact menu"}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-cyan shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:bg-deep-blue hover:shadow-premium"
      >
        {open ? (
          <X className="h-5 w-5 text-white" strokeWidth={2.75} aria-hidden="true" />
        ) : (
          <Menu className="h-5 w-5 text-white" strokeWidth={2.75} aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
