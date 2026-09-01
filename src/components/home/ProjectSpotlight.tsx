"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { getSpotlightProjects } from "@/data/projects";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

const SPOTLIGHT_PROJECTS = getSpotlightProjects();
const TOTAL = SPOTLIGHT_PROJECTS.length;
const ROTATE_MS = 3500;
const EASE = [0.22, 1, 0.36, 1] as const;

function SpotlightContent({ project }: { project: Project }) {
  return (
    <>
      <p className="label-upper text-brand-cyan">Project Spotlight</p>
      <h2 id="spotlight-heading" className="heading-section-light mt-6">
        {project.name}
      </h2>
      <p className="mt-4 text-lg leading-relaxed text-white/75">{project.tagline}</p>
      <div className="mt-8 flex flex-wrap items-center gap-4 md:gap-6">
        <p className="text-3xl font-bold text-white">{project.priceLabel}</p>
        <span className="hidden h-8 w-px bg-white/25 md:block" aria-hidden="true" />
        <p className="text-sm text-white/60">Premium Residential Plots</p>
      </div>
      <Link href={`/projects/${project.slug}`} className="btn-primary mt-10">
        View Project
      </Link>
    </>
  );
}

function SpotlightDots({
  current,
  onSelect,
  className,
}: {
  current: number;
  onSelect: (index: number) => void;
  className?: string;
}) {
  if (TOTAL <= 1) return null;

  return (
    <div
      className={cn("flex items-center gap-2", className)}
      role="tablist"
      aria-label="Project spotlight slides"
    >
      {SPOTLIGHT_PROJECTS.map((item, index) => (
        <button
          key={item.id}
          type="button"
          role="tab"
          aria-selected={index === current}
          aria-label={`Show ${item.name}, slide ${index + 1} of ${TOTAL}`}
          onClick={() => onSelect(index)}
          className={cn(
            "h-2.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-dark/40",
            index === current ? "w-7 bg-brand-cyan" : "w-2.5 bg-white/45 hover:bg-white/70"
          )}
        />
      ))}
    </div>
  );
}

export function ProjectSpotlight() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const project = SPOTLIGHT_PROJECTS[current];

  const next = useCallback(() => {
    setCurrent((index) => (index + 1) % TOTAL);
  }, []);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  useEffect(() => {
    if (reduceMotion || isPaused || TOTAL <= 1) return;

    const timer = window.setInterval(next, ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [isPaused, next, reduceMotion]);

  return (
    <section
      className="relative overflow-hidden"
      aria-labelledby="spotlight-heading"
      aria-roledescription="carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div className="relative min-h-[520px] lg:min-h-[600px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={project.id}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.7, ease: EASE }}
            className="absolute inset-0"
          >
            <Image
              src={project.heroImage}
              alt={`${project.name} - Premium residential plots in Mysuru`}
              fill
              className="object-cover"
              sizes="100vw"
              priority={current === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/55 to-dark/20" />
          </motion.div>
        </AnimatePresence>

        <div className="container-main relative flex h-full min-h-[520px] items-end pb-14 md:pb-20 lg:min-h-[600px]">
          <div className="max-w-2xl py-12">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={project.id}
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: reduceMotion ? 0 : 0.55, ease: EASE }}
              >
                <SpotlightContent project={project} />
              </motion.div>
            </AnimatePresence>
          </div>

          <SpotlightDots
            current={current}
            onSelect={goTo}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 md:bottom-8"
          />
        </div>
      </div>
    </section>
  );
}
