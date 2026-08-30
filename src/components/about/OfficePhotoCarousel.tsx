"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { officePhotos } from "@/data/about";

export function OfficePhotoCarousel() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? officePhotos.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === officePhotos.length - 1 ? 0 : c + 1));

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-light-gray/80 bg-white shadow-subtle">
      <div className="relative aspect-[455/300]">
        <Image
          src={officePhotos[current]}
          alt={`Alliance Square office photo ${current + 1}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/50 via-transparent to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5">
        <button
          type="button"
          onClick={prev}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/90 text-charcoal backdrop-blur-sm transition-all duration-300 hover:bg-brand-cyan hover:text-white"
          aria-label="Previous photo"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="rounded-full bg-dark/40 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
          {current + 1} / {officePhotos.length}
        </span>
        <button
          type="button"
          onClick={next}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/90 text-charcoal backdrop-blur-sm transition-all duration-300 hover:bg-brand-cyan hover:text-white"
          aria-label="Next photo"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
