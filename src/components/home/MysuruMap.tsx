"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getGroupedMapMarkers, mapMarkers } from "@/data/projects";
import type { MapMarker } from "@/types";
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

const { running: runningMarkers, completed: completedMarkers } = getGroupedMapMarkers();

function ProjectListItem({
  marker,
  status,
  isActive,
  onSelect,
}: {
  marker: MapMarker;
  status: "running" | "completed";
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <li className="border-b border-light-gray/60 last:border-b-0">
      <button
        type="button"
        onMouseEnter={onSelect}
        onFocus={onSelect}
        onClick={onSelect}
        className={cn(
          "group relative flex w-full items-start gap-3 overflow-hidden px-4 py-3.5 text-left transition-colors",
          isActive ? "bg-brand-cyan/8" : "hover:bg-off-white"
        )}
      >
        {isActive && (
          <span className="absolute inset-y-0 left-0 w-1 bg-brand-cyan" aria-hidden="true" />
        )}
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "truncate text-sm font-medium transition-colors",
                isActive ? "text-brand-cyan" : "text-charcoal group-hover:text-brand-cyan"
              )}
            >
              {marker.name}
            </span>
            <span
              className={cn(
                "inline-flex shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em]",
                status === "running"
                  ? "bg-emerald-500/12 text-emerald-700"
                  : "bg-light-gray text-cool-gray"
              )}
            >
              {status === "running" ? "Currently Running" : "Completed"}
            </span>
          </span>
          <span
            className={cn(
              "mt-1 block text-xs font-semibold leading-tight transition-colors",
              isActive ? "text-brand-cyan/80" : "text-cool-gray"
            )}
          >
            {marker.priceLabel}
          </span>
          <span
            className={cn(
              "mt-1 block text-[11px] leading-snug transition-colors",
              isActive ? "text-charcoal/80" : "text-cool-gray/90"
            )}
          >
            {marker.location}
          </span>
        </span>
      </button>
    </li>
  );
}

export function MysuruMap() {
  const [activeMarker, setActiveMarker] = useState<string | null>(
    runningMarkers[0]?.projectSlug ?? mapMarkers[0]?.projectSlug ?? null
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
              <div className="pointer-events-auto absolute left-4 top-4 w-[calc(100%-2rem)] max-w-[300px] rounded-2xl border border-light-gray/80 bg-white/95 p-4 shadow-premium backdrop-blur-sm">
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
            </div>
          </div>

          <div className="flex h-[420px] flex-col lg:col-span-4 lg:h-[640px]">
            <div className="relative h-[220px] shrink-0 overflow-hidden rounded-2xl border border-light-gray/80 bg-white shadow-subtle sm:h-[240px] lg:h-[300px]">
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
                    <div className="absolute inset-x-0 bottom-0 bg-white/95 p-5 backdrop-blur-sm lg:p-6">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-cyan">
                        Project Preview
                      </p>
                      <h3 className="mt-1.5 text-xl font-bold leading-tight text-charcoal lg:text-2xl">{active.name}</h3>
                      <p className="mt-1.5 text-sm font-semibold text-cool-gray lg:text-base">{active.priceLabel}</p>
                      <p className="mt-1 text-xs leading-snug text-cool-gray">{active.location}</p>
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
              {runningMarkers.map((m) => (
                <ProjectListItem
                  key={m.projectSlug}
                  marker={m}
                  status="running"
                  isActive={activeMarker === m.projectSlug}
                  onSelect={() => setActiveMarker(m.projectSlug)}
                />
              ))}
              {completedMarkers.length > 0 && (
                <li className="border-b border-light-gray/60 bg-off-white/80 px-4 py-2.5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-cool-gray">
                    Completed Projects
                  </p>
                </li>
              )}
              {completedMarkers.map((m) => (
                <ProjectListItem
                  key={m.projectSlug}
                  marker={m}
                  status="completed"
                  isActive={activeMarker === m.projectSlug}
                  onSelect={() => setActiveMarker(m.projectSlug)}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
