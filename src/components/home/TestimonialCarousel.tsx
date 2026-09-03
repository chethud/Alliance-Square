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

      <div className="absolute inset-x-0 bottom-0 p-3 md:p-5 lg:p-6">
        <div className="rounded-xl border border-white/10 bg-navy-deep/85 p-2.5 backdrop-blur-sm md:rounded-2xl md:p-4">
          {testimonial.verified !== false && (
            <div className="flex items-center gap-2">
              <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-warm-gold md:h-4 md:w-4" aria-hidden="true" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/90 md:text-[11px]">
                Verified Customer
              </span>
            </div>
          )}

          <p className="mt-1.5 text-base font-semibold text-white md:mt-3 md:text-xl">{testimonial.name}</p>

          {testimonial.designation && (
            <p className="mt-0.5 text-xs text-white/70 md:mt-1 md:text-sm">{testimonial.designation}</p>
          )}

          <p className="mt-2.5 border-t border-white/10 pt-2.5 text-[11px] font-medium tracking-wide text-white/75 md:mt-4 md:pt-4 md:text-xs">
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
    <div className="flex h-full min-h-0 flex-col px-4 py-4 sm:px-8 sm:py-8 lg:px-10 lg:py-10 xl:px-12 xl:py-11">
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
            className="text-[2.25rem] font-light leading-none text-warm-gold/75 sm:text-[3.5rem] md:text-[4rem] lg:text-[4.25rem]"
            aria-hidden="true"
          >
            &ldquo;
          </span>

          <blockquote className="mt-2 max-w-2xl sm:mt-4 lg:mt-5">
            <p className="text-sm font-normal leading-[1.55] text-testimonial-text sm:text-lg sm:leading-[1.6] md:text-xl md:leading-[1.55] lg:text-[1.35rem] lg:leading-[1.62]">
              {testimonial.quote}
            </p>
            <footer className="sr-only">
              <cite>{testimonial.name}, {testimonial.location}</cite>
            </footer>
          </blockquote>
        </motion.div>
      </AnimatePresence>

      <div className="mt-4 flex flex-col gap-3 border-t border-testimonial-border pt-4 sm:mt-6 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pt-6 lg:mt-7">
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
                "h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-secondary focus-visible:ring-offset-2 sm:h-2.5",
                index === current
                  ? "w-6 bg-warm-gold sm:w-7"
                  : "w-2 bg-light-gray hover:bg-cool-gray/50 sm:w-2.5"
              )}
            />
          ))}
        </div>

        <div className="flex items-center justify-end gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onPrev}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-testimonial-border bg-white text-testimonial-text transition-all duration-300 hover:border-navy-secondary hover:text-navy-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-secondary focus-visible:ring-offset-2 sm:h-11 sm:w-11 md:h-12 md:w-12"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
          </button>
          <span
            className="min-w-[3.75rem] text-center text-xs tabular-nums text-cool-gray sm:min-w-[4.5rem] sm:text-sm"
            aria-live="polite"
          >
            {String(current + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={onNext}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-testimonial-border bg-white text-testimonial-text transition-all duration-300 hover:border-navy-secondary hover:text-navy-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-secondary focus-visible:ring-offset-2 sm:h-11 sm:w-11 md:h-12 md:w-12"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
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

        <div className="relative mt-6 overflow-hidden rounded-[20px] border border-testimonial-border bg-white shadow-testimonial sm:mt-8 sm:rounded-[26px] lg:mt-10">
          <div
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm-gold/40 to-transparent"
            aria-hidden="true"
          />

          <div className="grid lg:h-[440px] lg:grid-cols-[2fr_3fr] lg:items-stretch">
            <div className="relative h-[200px] min-h-0 overflow-hidden sm:h-[280px] md:h-[340px] lg:h-full">
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
