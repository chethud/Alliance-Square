"use client";

import { useMemo, useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { LayoutListItem } from "@/components/layouts/LayoutListItem";
import {
  filterOptions,
  getProjectsInOrder,
  layoutsPageOrder,
} from "@/data/projects";
import type { ProjectFilter } from "@/types";
import { cn } from "@/lib/utils";

/** Hidden on /layouts only — project page remains available */
const layoutsListingExcludedSlugs = new Set(["dhatri-square", "dr-daya-nagar"]);

export function LayoutListing() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");

  const orderedProjects = useMemo(
    () => getProjectsInOrder(layoutsPageOrder).filter((p) => !layoutsListingExcludedSlugs.has(p.slug)),
    []
  );

  const filtered = useMemo(() => {
    if (activeFilter === "all") return orderedProjects;
    return orderedProjects.filter((p) => p.filters.includes(activeFilter));
  }, [activeFilter, orderedProjects]);

  return (
    <section className="section-spacing bg-off-white" aria-labelledby="layouts-listing-heading">
      <div className="container-main">
        <SectionHeader
          label="Browse"
          title={
            <>
              Layout <span className="text-brand-cyan">Listing</span>
            </>
          }
          description="Filter by approval type and explore MUDA, DTCP, and premium residential plots across Mysuru."
        />

        <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Filter layouts">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              role="tab"
              aria-selected={activeFilter === option.value}
              onClick={() => setActiveFilter(option.value)}
              className={cn(
                "rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300",
                activeFilter === option.value
                  ? "border-brand-cyan bg-brand-cyan text-white shadow-glow"
                  : "border-light-gray bg-white text-charcoal hover:border-brand-cyan/50 hover:text-brand-cyan"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {filtered.length > 0 ? (
            filtered.map((project) => <LayoutListItem key={project.id} project={project} />)
          ) : (
            <p className="text-cool-gray">No layouts match this filter.</p>
          )}
        </div>
      </div>
    </section>
  );
}
