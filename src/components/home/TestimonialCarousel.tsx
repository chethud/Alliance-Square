"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { testimonials } from "@/data/testimonials";

const EASE = [0.22, 1, 0.36, 1] as const;
const TOTAL = testimonials.length;

export function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const reduceMotion = useReducedMotion();
  const testimonial = testimonials[current];
  const progress = ((current + 1) / TOTAL) * 100;

  const prev = () => setCurrent((c) => (c === 0 ? TOTAL - 1 : c - 1));
  const next = () => setCurrent((c) => (c === TOTAL - 1 ? 0 : c + 1));

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-off-white pt-20 pb-8 md:pt-28 md:pb-10 lg:pt-32 lg:pb-8"
      aria-labelledby="testimonials-heading"
      aria-roledescription="carousel"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(32,33,36,0.03) 0, rgba(32,33,36,0.03) 1px, transparent 1px, transparent 80px)",
          }}
        />
      </div>

      <div className="container-main relative">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            headingId="testimonials-heading"
            label="Testimonials"
            title="What Our Customers Say"
            description="Real stories from homebuyers and investors who chose Alliance Square."
          />
          <Link href="/testimonials" className="link-arrow shrink-0">
            View All Testimonials
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-light-gray/80 bg-white lg:mt-14">
          <div
            className="h-0.5 bg-light-gray"
            role="progressbar"
            aria-valuenow={current + 1}
            aria-valuemin={1}
            aria-valuemax={TOTAL}
            aria-label="Testimonial progress"
          >
            <div
              className="h-0.5 bg-brand-cyan transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="grid h-[640px] grid-rows-[240px_1fr] sm:grid-rows-[280px_1fr] lg:h-[520px] lg:grid-cols-[minmax(0,42%)_1fr] lg:grid-rows-1">
            <div className="relative h-full w-full min-h-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`photo-${testimonial.id}`}
                  initial={reduceMotion ? false : { opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="absolute inset-0"
                >
                  {testimonial.image && (
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      priority={current === 0}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/50 via-dark/10 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-white/30" />
                </motion.div>
              </AnimatePresence>

              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 lg:bottom-6 lg:left-6 lg:right-6">
                <span className="badge bg-white/95 text-brand-cyan shadow-subtle backdrop-blur-sm">
                  Verified Customer
                </span>
                <span className="hidden rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-charcoal shadow-subtle backdrop-blur-sm sm:inline-block">
                  4,000+ Happy Customers
                </span>
              </div>
            </div>

            <div className="flex h-full min-h-0 flex-col">
              <div className="relative min-h-0 flex-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`quote-${testimonial.id}`}
                    initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="absolute inset-0 flex flex-col overflow-y-auto px-7 pt-7 pb-4 md:px-9 md:pt-9 lg:px-11 lg:pt-11"
                  >
                    <span
                      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-cyan/10"
                      aria-hidden="true"
                    >
                      <Quote className="h-5 w-5 fill-brand-cyan/20 text-brand-cyan" />
                    </span>

                    <blockquote className="mt-6 min-h-0 flex-1">
                      <p className="text-lg font-medium leading-[1.75] text-charcoal md:text-xl lg:text-[22px] lg:leading-[1.7]">
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>
                    </blockquote>

                    <footer className="mt-8 flex shrink-0 items-center gap-4 border-t border-light-gray/80 pt-6">
                      {testimonial.image && (
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-brand-cyan/25">
                          <Image
                            src={testimonial.image}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                      )}
                      <cite className="not-italic">
                        <span className="block text-base font-bold text-charcoal md:text-lg">
                          {testimonial.name}
                        </span>
                        <span className="mt-0.5 block text-sm text-cool-gray">{testimonial.location}</span>
                      </cite>
                    </footer>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex shrink-0 items-center justify-end gap-3 border-t border-light-gray/80 px-7 py-6 md:px-9 lg:px-11">
                <button
                  type="button"
                  onClick={prev}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-light-gray bg-white transition-all hover:border-brand-cyan hover:text-brand-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <span className="min-w-[4.5rem] text-center font-mono text-sm tabular-nums text-cool-gray">
                  {String(current + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  onClick={next}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-light-gray bg-white transition-all hover:border-brand-cyan hover:text-brand-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
