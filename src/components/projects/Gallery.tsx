"use client";

import { useState } from "react";
import Image from "next/image";

interface GalleryProps {
  images: string[];
  projectName: string;
}

export function Gallery({ images, projectName }: GalleryProps) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-light-gray/80 shadow-subtle">
        <Image
          src={images[active]}
          alt={`${projectName} gallery image ${active + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 1200px) 100vw, 80vw"
        />
      </div>
      <div className="mt-4 flex gap-2 overflow-x-auto pb-1 md:grid md:grid-cols-6 md:overflow-visible md:pb-0">
        {images.map((img, index) => (
          <button
            key={img}
            type="button"
            onClick={() => setActive(index)}
            className={`relative aspect-[4/3] w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-300 md:w-auto ${
              active === index
                ? "border-brand-cyan shadow-glow"
                : "border-transparent opacity-70 hover:opacity-100"
            }`}
            aria-label={`View image ${index + 1}`}
          >
            <Image src={img} alt="" fill className="object-cover" sizes="120px" />
          </button>
        ))}
      </div>
    </div>
  );
}
