"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { BadgeCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { stats } from "@/data/company";
import { testimonials } from "@/data/testimonials";
import type { Testimonial } from "@/types";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
const ROTATE_MS = 3000;
const TOTAL = testimonials.length;

function TestimonialImagePanel({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="relative h-full w-full min-h-0">
      {testimonial.image && (
        <Image
          src={testimonial.image}
          alt={`${testimonial.name}, Alliance Square customer`}
          fill
          className="object-cover object-[center_22%]"
          sizes="(max-width: 1024px) 100vw, 40vw"
          priority
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/15 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 lg:p-6">
        <div className="rounded-2xl border border-white/10 bg-navy-deep/85 p-3.5 backdrop-blur-sm md:p-4">
          {testimonial.verified !== false && (
            <div className="flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 shrink-0 text-warm-gold" aria-hidden="true" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/90">
                Verified Customer
              </span>
            </div>
          )}

          <p className="mt-3 text-lg font-semibold text-white md:text-xl">{testimonial.name}</p>

          {testimonial.designation && (
            <p className="mt-1 text-sm text-white/70">{testimonial.designation}</p>
          )}

          <p className="mt-4 border-t border-white/10 pt-4 text-xs font-medium tracking-wide text-white/75">
            {stats.customers.toLocaleString("en-IN")}+ Happy Customers
          </p>
        </div>
      </div>
    </div>
  );
}

function TestimonialContentPanel({
  testimonial,
  current,
  onPrev,
  onNext,
  onSelect,
  reduceMotion,
}: {
  testimonial: Testimonial;
  current: number;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
  reduceMotion: boolean | null;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col px-6 py-7 sm:px-8 sm:py-8 lg:px-10 lg:py-10 xl:px-12 xl:py-11">
      <AnimatePresence mode="wait">
        <motion.div
          key={testimonial.id}
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="flex min-h-0 flex-1 flex-col"
          aria-live="polite"
        >
          <span
            className="text-[3.5rem] font-light leading-none text-warm-gold/75 md:text-[4rem] lg:text-[4.25rem]"
            aria-hidden="true"
          >
            &ldquo;
          </span>

          <blockquote className="mt-4 max-w-2xl lg:mt-5">
            <p className="text-lg font-normal leading-[1.6] text-testimonial-text md:text-xl md:leading-[1.55] lg:text-[1.35rem] lg:leading-[1.62]">
              {testimonial.quote}
            </p>
            <footer className="sr-only">
              <cite>{testimonial.name}, {testimonial.location}</cite>
            </footer>
          </blockquote>
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 flex flex-col gap-4 border-t border-testimonial-border pt-6 sm:flex-row sm:items-center sm:justify-between lg:mt-7">
        <div
          className="flex items-center gap-2"
          role="tablist"
          aria-label="Testimonial slides"
        >
          {testimonials.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={index === current}
              aria-label={`Go to testimonial ${index + 1} of ${TOTAL}`}
              onClick={() => onSelect(index)}
              className={cn(
                "h-2.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-secondary focus-visible:ring-offset-2",
                index === current
                  ? "w-7 bg-warm-gold"
                  : "w-2.5 bg-light-gray hover:bg-cool-gray/50"
              )}
            />
          ))}
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onPrev}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-testimonial-border bg-white text-testimonial-text transition-all duration-300 hover:border-navy-secondary hover:text-navy-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-secondary focus-visible:ring-offset-2 md:h-12 md:w-12"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <span
            className="min-w-[4.5rem] text-center text-sm tabular-nums text-cool-gray"
            aria-live="polite"
          >
            {String(current + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={onNext}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-testimonial-border bg-white text-testimonial-text transition-all duration-300 hover:border-navy-secondary hover:text-navy-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-secondary focus-visible:ring-offset-2 md:h-12 md:w-12"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function TestimonialCarousel({ className }: { className?: string } = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [timerReset, setTimerReset] = useState(0);
  const reduceMotion = useReducedMotion();
  const isInView = useInView(sectionRef, { amount: 0.35 });
  const testimonial = testimonials[current];

  const prev = useCallback(() => {
    setCurrent((c) => (c === 0 ? TOTAL - 1 : c - 1));
    setTimerReset((value) => value + 1);
  }, []);

  const next = useCallback(() => {
    setCurrent((c) => (c === TOTAL - 1 ? 0 : c + 1));
    setTimerReset((value) => value + 1);
  }, []);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
    setTimerReset((value) => value + 1);
  }, []);

  useEffect(() => {
    if (reduceMotion || isHovered || !isInView || TOTAL <= 1) return;

    const timer = window.setInterval(() => {
      setCurrent((c) => (c === TOTAL - 1 ? 0 : c + 1));
    }, ROTATE_MS);

    return () => window.clearInterval(timer);
  }, [isHovered, isInView, reduceMotion, timerReset]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        prev();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        next();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [next, prev]);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className={cn("section-pad relative overflow-hidden bg-testimonial-bg", className)}
      aria-labelledby="testimonials-heading"
      aria-roledescription="carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="container-main relative">
        <SectionHeader
          headingId="testimonials-heading"
          label="Testimonials"
          title="What Our Customers Say"
          description="Real stories from homebuyers and investors who chose Alliance Square."
        />

        <div className="relative mt-8 overflow-hidden rounded-[26px] border border-testimonial-border bg-white shadow-testimonial lg:mt-10">
          <div
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm-gold/40 to-transparent"
            aria-hidden="true"
          />

          <div className="grid lg:h-[440px] lg:grid-cols-[2fr_3fr] lg:items-stretch">
            <div className="relative h-[300px] min-h-0 overflow-hidden sm:h-[340px] lg:h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`photo-${testimonial.id}`}
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="h-full"
                >
                  <TestimonialImagePanel testimonial={testimonial} />
                </motion.div>
              </AnimatePresence>
            </div>

            <TestimonialContentPanel
              testimonial={testimonial}
              current={current}
              onPrev={prev}
              onNext={next}
              onSelect={goTo}
              reduceMotion={reduceMotion}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
