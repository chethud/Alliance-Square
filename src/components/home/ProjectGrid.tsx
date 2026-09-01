"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { layoutsPageOrder, getProjectsInOrder } from "@/data/projects";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
const HOME_PROJECT_LIMIT = 3;

const layoutSpring = {
  type: "spring" as const,
  stiffness: 320,
  damping: 32,
  mass: 0.85,
};

export function ProjectGrid({ showHeader = true }: { showHeader?: boolean }) {
  const reduceMotion = useReducedMotion();
  const displayed = getProjectsInOrder(layoutsPageOrder).slice(0, HOME_PROJECT_LIMIT);

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

        <motion.div
          layout
          transition={reduceMotion ? { duration: 0 } : { layout: layoutSpring }}
          className={cn("grid gap-6 md:grid-cols-2 lg:grid-cols-3", showHeader ? "mt-8" : "mt-0")}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {displayed.map((project, index) => (
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
