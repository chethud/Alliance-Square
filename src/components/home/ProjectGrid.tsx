"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects, filterOptions } from "@/data/projects";
import type { ProjectFilter } from "@/types";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const layoutSpring = {
  type: "spring" as const,
  stiffness: 320,
  damping: 32,
  mass: 0.85,
};

export function ProjectGrid({ showHeader = true }: { showHeader?: boolean }) {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");
  const reduceMotion = useReducedMotion();

  const filtered =
    activeFilter === "all" ? projects : projects.filter((p) => p.filters.includes(activeFilter));

  return (
    <section
      id="projects"
      className="section-spacing bg-off-white"
      aria-labelledby="projects-heading"
    >
      <div className="container-main">
        {showHeader && (
          <SectionHeader
            label="Featured Layouts"
            title="Find a Place Worth Investing In."
            description="Explore thoughtfully planned residential communities across Mysuru and emerging growth corridors."
            titleClassName="max-w-none lg:whitespace-nowrap"
          />
        )}

        <div
          className={cn("flex flex-wrap gap-2", showHeader ? "mt-8" : "mt-0")}
          role="tablist"
          aria-label="Filter projects"
        >
          {filterOptions.map((option) => {
            const isActive = activeFilter === option.value;

            return (
              <button
                key={option.value}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(option.value)}
                className={cn(
                  "relative rounded-full border px-5 py-2.5 text-sm font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2",
                  isActive
                    ? "border-brand-cyan text-white"
                    : "border-light-gray bg-white text-charcoal hover:border-brand-cyan hover:text-brand-cyan"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="project-filter-pill"
                    className="absolute inset-0 rounded-full bg-brand-cyan shadow-glow"
                    transition={reduceMotion ? { duration: 0 } : layoutSpring}
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10">{option.label}</span>
              </button>
            );
          })}
        </div>

        <motion.div
          layout
          transition={reduceMotion ? { duration: 0 } : { layout: layoutSpring }}
          className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, y: 28, scale: 0.94, filter: "blur(4px)" }
                }
                animate={
                  reduceMotion
                    ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
                    : {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        filter: "blur(0px)",
                        transition: {
                          duration: 0.45,
                          delay: index * 0.05,
                          ease: EASE,
                          layout: layoutSpring,
                        },
                      }
                }
                exit={
                  reduceMotion
                    ? { opacity: 0 }
                    : {
                        opacity: 0,
                        y: -16,
                        scale: 0.96,
                        filter: "blur(4px)",
                        transition: { duration: 0.28, ease: EASE },
                      }
                }
                transition={{ layout: reduceMotion ? { duration: 0 } : layoutSpring }}
                className="h-full"
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
