"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { mapMarkers } from "@/data/projects";
import { cn } from "@/lib/utils";

const MysuruMapView = dynamic(
  () => import("@/components/home/MysuruMapView").then((m) => m.MysuruMapView),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[420px] items-center justify-center rounded-2xl bg-off-white text-sm text-cool-gray">
        Loading map…
      </div>
    ),
  }
);

export function MysuruMap() {
  const [activeMarker, setActiveMarker] = useState<string | null>(
    mapMarkers[0]?.projectSlug ?? null
  );
  const active = mapMarkers.find((m) => m.projectSlug === activeMarker);

  return (
    <section id="mysuru-map" className="section-pad bg-off-white" aria-labelledby="map-heading">
      <div className="container-main">
        <SectionHeader
          label="Project Locations"
          title="Mysuru Development Map"
          description="Explore Alliance Square projects across Mysuru and key growth corridors."
        />

        <div className="mt-8 grid items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="relative h-[420px] overflow-hidden rounded-2xl border border-light-gray/80 bg-white shadow-subtle lg:col-span-8 lg:h-[640px]">
            <div className="absolute inset-0 z-0">
              <MysuruMapView
                markers={mapMarkers}
                activeMarker={activeMarker}
                onMarkerHover={setActiveMarker}
              />
            </div>

            <div className="pointer-events-none absolute inset-0 z-10">
              {active ? (
                <div className="pointer-events-auto absolute left-4 top-4 w-[calc(100%-2rem)] max-w-[300px] overflow-hidden rounded-2xl border border-light-gray/80 bg-white/95 shadow-premium backdrop-blur-sm">
                  <div className="relative h-[120px] w-full">
                    <Image
                      src={active.heroImage}
                      alt={active.name}
                      fill
                      className="object-cover"
                      sizes="300px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent" />
                    <p className="badge absolute left-4 top-4">Project</p>
                  </div>
                  <div className="p-5 pt-3">
                    <h3 className="text-xl font-bold text-charcoal">{active.name}</h3>
                    <p className="mt-1 text-lg font-bold text-charcoal">{active.priceLabel}</p>
                    <p className="mt-1 text-sm text-cool-gray">{active.location}</p>
                    <Link href={`/projects/${active.projectSlug}`} className="link-arrow mt-4">
                      View Project
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="absolute left-4 top-4 max-w-[260px] rounded-2xl border border-dashed border-light-gray/80 bg-white/90 p-4 shadow-subtle backdrop-blur-sm">
                  <p className="text-sm text-cool-gray">
                    Hover a cyan marker or select a project to view details.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex h-[420px] flex-col lg:col-span-4 lg:h-[640px]">
            <div className="shrink-0 rounded-2xl border border-light-gray/80 bg-white p-4 shadow-subtle">
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-cool-gray">
                <span className="flex items-center gap-2">
                  <span className="inline-block h-3 w-3 rounded-full bg-brand-cyan shadow-glow" />
                  Alliance Square Projects
                </span>
                <span className="flex items-center gap-2">
                  <span className="inline-block h-0.5 w-6 border-t-2 border-dashed border-cool-gray" />
                  Growth Corridors
                </span>
              </div>
            </div>

            <div className="relative mt-4 h-[148px] shrink-0 overflow-hidden rounded-2xl border border-light-gray/80 bg-white shadow-subtle">
              <AnimatePresence mode="wait" initial={false}>
                {active ? (
                  <motion.div
                    key={active.projectSlug}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={active.heroImage}
                      alt={active.name}
                      fill
                      className="object-cover"
                      sizes="340px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/75 to-white/20" />
                    <div className="absolute inset-0 bg-brand-cyan/10 mix-blend-multiply" />
                    <div className="absolute inset-0 flex flex-col justify-end p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-cyan">
                        Project Preview
                      </p>
                      <h3 className="mt-1 text-lg font-bold leading-tight text-charcoal">{active.name}</h3>
                      <p className="mt-1 text-sm font-semibold text-cool-gray">{active.priceLabel}</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex h-full items-center justify-center px-6 text-center text-sm text-cool-gray"
                  >
                    Hover a project below to preview
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <ul className="why-mysuru-scroll mt-4 min-h-0 flex-1 overflow-y-auto rounded-2xl border border-light-gray/80 bg-white shadow-subtle">
              {mapMarkers.map((m) => {
                const isActive = activeMarker === m.projectSlug;

                return (
                  <li key={m.projectSlug} className="border-b border-light-gray/60 last:border-b-0">
                    <button
                      type="button"
                      onMouseEnter={() => setActiveMarker(m.projectSlug)}
                      onFocus={() => setActiveMarker(m.projectSlug)}
                      onClick={() => setActiveMarker(m.projectSlug)}
                      className={cn(
                        "group relative flex w-full items-center gap-3 overflow-hidden px-4 py-3.5 text-left transition-colors",
                        isActive ? "bg-brand-cyan/8" : "hover:bg-off-white"
                      )}
                    >
                      {isActive && (
                        <span
                          className="absolute inset-y-0 left-0 w-1 bg-brand-cyan"
                          aria-hidden="true"
                        />
                      )}
                      <span
                        className={cn(
                          "min-w-0 flex-1 truncate text-sm font-medium transition-colors",
                          isActive ? "text-brand-cyan" : "text-charcoal group-hover:text-brand-cyan"
                        )}
                      >
                        {m.name}
                      </span>
                      <span
                        className={cn(
                          "shrink-0 text-right text-xs font-semibold leading-tight transition-colors",
                          isActive ? "text-brand-cyan/80" : "text-cool-gray"
                        )}
                      >
                        {m.priceLabel}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
