"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { growthDrivers } from "@/data/mysuru-growth";
import type { GrowthDriver } from "@/types";
import { cn } from "@/lib/utils";

const TOTAL = growthDrivers.length;
const EASE = [0.22, 1, 0.36, 1] as const;

function formatIndex(index: number) {
  return String(index + 1).padStart(2, "0");
}

function CategoryBadge({ label, active }: { label: string; active: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center border px-2.5 text-[11px] font-semibold uppercase tracking-[0.1em] transition-colors duration-300",
        active
          ? "border-brand-cyan/35 bg-brand-cyan/[0.08] text-deep-blue"
          : "border-brand-cyan/20 bg-brand-cyan/[0.04] text-deep-blue/80"
      )}
      style={{ borderRadius: 4 }}
    >
      {label}
    </span>
  );
}

function StoryVisual({ driver, active }: { driver: GrowthDriver; active: boolean }) {
  const stroke = active ? "#00A9E8" : "#D8DEE2";
  const fill = active ? "rgba(0,169,232,0.12)" : "rgba(216,222,226,0.35)";

  if (driver.id === "airport") {
    return (
      <svg viewBox="0 0 120 48" className="mt-10 h-12 w-[120px]" aria-hidden="true">
        <line x1="8" y1="40" x2="112" y2="40" stroke={stroke} strokeWidth="1" />
        <line x1="20" y1="40" x2="20" y2="28" stroke={stroke} strokeWidth="1" />
        <line x1="100" y1="40" x2="100" y2="28" stroke={stroke} strokeWidth="1" />
        <rect x="20" y="28" width="80" height="4" fill={fill} stroke={stroke} strokeWidth="1" />
      </svg>
    );
  }

  if (driver.category === "Connectivity") {
    return (
      <svg viewBox="0 0 140 48" className="mt-10 h-12 w-[140px]" aria-hidden="true">
        <path
          d="M8 36 C40 36, 50 12, 72 12 S104 36, 132 20"
          fill="none"
          stroke={stroke}
          strokeWidth="1.5"
          strokeDasharray={active ? "none" : "4 4"}
        />
        <circle cx="8" cy="36" r="3" fill={active ? "#00A9E8" : "#D8DEE2"} />
        <circle cx="132" cy="20" r="3" fill={active ? "#00A9E8" : "#D8DEE2"} />
      </svg>
    );
  }

  if (driver.category === "Infrastructure") {
    return (
      <svg viewBox="0 0 120 48" className="mt-10 h-12 w-[120px]" aria-hidden="true">
        {[0, 1, 2, 3].map((row) =>
          [0, 1, 2, 3].map((col) => (
            <rect
              key={`${row}-${col}`}
              x={12 + col * 24}
              y={8 + row * 10}
              width="18"
              height="6"
              fill={fill}
              stroke={stroke}
              strokeWidth="0.75"
            />
          ))
        )}
      </svg>
    );
  }

  if (driver.category === "Industry") {
    return (
      <svg viewBox="0 0 120 48" className="mt-10 h-12 w-[120px]" aria-hidden="true">
        <rect x="16" y="28" width="20" height="16" fill={fill} stroke={stroke} strokeWidth="1" />
        <rect x="42" y="20" width="20" height="24" fill={fill} stroke={stroke} strokeWidth="1" />
        <rect x="68" y="12" width="20" height="32" fill={fill} stroke={stroke} strokeWidth="1" />
        <rect x="94" y="24" width="16" height="20" fill={fill} stroke={stroke} strokeWidth="1" />
      </svg>
    );
  }

  if (driver.category === "Education") {
    return (
      <svg viewBox="0 0 120 48" className="mt-10 h-12 w-[120px]" aria-hidden="true">
        <rect x="20" y="14" width="80" height="28" fill="none" stroke={stroke} strokeWidth="1" />
        <line x1="20" y1="26" x2="100" y2="26" stroke={stroke} strokeWidth="1" />
        <line x1="44" y1="14" x2="44" y2="42" stroke={stroke} strokeWidth="1" />
        <line x1="68" y1="14" x2="68" y2="42" stroke={stroke} strokeWidth="1" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 120 48" className="mt-10 h-12 w-[120px]" aria-hidden="true">
      <line x1="60" y1="8" x2="60" y2="40" stroke={stroke} strokeWidth="1" />
      <line x1="36" y1="24" x2="84" y2="24" stroke={stroke} strokeWidth="1" />
      <line x1="44" y1="16" x2="76" y2="32" stroke={stroke} strokeWidth="1" />
      <line x1="44" y1="32" x2="76" y2="16" stroke={stroke} strokeWidth="1" />
    </svg>
  );
}

function GrowthNavItem({
  driver,
  index,
  active,
  onSelect,
}: {
  driver: GrowthDriver;
  index: number;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <li className="relative">
      <button
        type="button"
        onClick={onSelect}
        aria-current={active ? "step" : undefined}
        aria-label={`View growth story ${index + 1}: ${driver.title}`}
        className={cn(
          "group relative flex w-full items-start gap-4 border-b py-[18px] pl-3 text-left transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2",
          "border-charcoal/[0.08]"
        )}
      >
        <span
          className={cn(
            "absolute left-0 top-[18px] w-0.5 rounded-full bg-brand-cyan transition-all duration-300",
            active ? "h-[calc(100%-36px)] opacity-100" : "h-0 opacity-0"
          )}
          aria-hidden="true"
        />
        <span
          className={cn(
            "w-8 shrink-0 font-mono text-[13px] tabular-nums transition-colors duration-300",
            active ? "text-brand-cyan" : "text-[#9CA5AA]"
          )}
        >
          {formatIndex(index)}
        </span>
        <span
          className={cn(
            "min-w-0 flex-1 text-[15px] leading-snug transition-colors duration-300",
            active ? "font-semibold text-charcoal" : "font-normal text-[#7B858C]"
          )}
        >
          {driver.title}
        </span>
      </button>
    </li>
  );
}

function MobileGrowthHeader({
  activeIndex,
  onPrev,
  onNext,
}: {
  activeIndex: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  const driver = growthDrivers[activeIndex];
  const progress = ((activeIndex + 1) / TOTAL) * 100;

  return (
    <div className="sticky top-[72px] z-20 border-b border-charcoal/[0.08] bg-[#F7F9FA]/95 px-5 py-4 backdrop-blur-[14px] lg:hidden">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7B858C]">
        Growth Story
      </p>
      <div className="mt-2 flex items-center justify-between gap-3">
        <p className="font-mono text-sm tabular-nums text-[#7B858C]">
          <span className="text-brand-cyan">{formatIndex(activeIndex)}</span> /{" "}
          {String(TOTAL).padStart(2, "0")}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPrev}
            disabled={activeIndex === 0}
            aria-label="Previous growth story"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-charcoal/10 text-charcoal transition-colors hover:border-brand-cyan hover:text-brand-cyan disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={activeIndex === TOTAL - 1}
            aria-label="Next growth story"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-charcoal/10 text-charcoal transition-colors hover:border-brand-cyan hover:text-brand-cyan disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      <p className="mt-2 text-sm font-semibold leading-snug text-charcoal">{driver.title}</p>
      <div className="mt-3 h-0.5 w-full bg-[#DDE4E7]">
        <div
          className="h-0.5 bg-brand-cyan transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

function GrowthStory({
  driver,
  index,
  onActive,
  setRef,
}: {
  driver: GrowthDriver;
  index: number;
  onActive: (index: number) => void;
  setRef: (index: number, node: HTMLElement | null) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const isInView = useInView(ref, {
    margin: reduceMotion ? "0px" : "-35% 0px -50% 0px",
    amount: 0.2,
  });

  useEffect(() => {
    const node = ref.current;
    setRef(index, node);
    return () => setRef(index, null);
  }, [index, setRef]);

  useEffect(() => {
    if (isInView) onActive(index);
  }, [isInView, index, onActive]);

  const titleParts = driver.title.includes("–")
    ? driver.title.split("–").map((part) => part.trim())
    : driver.title.split(" ").length > 3
      ? [
          driver.title.split(" ").slice(0, Math.ceil(driver.title.split(" ").length / 2)).join(" "),
          driver.title.split(" ").slice(Math.ceil(driver.title.split(" ").length / 2)).join(" "),
        ]
      : [driver.title];

  return (
    <motion.article
      ref={ref}
      id={`story-${driver.id}`}
      data-index={index}
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      className="relative min-w-0 scroll-mt-32 border-b border-charcoal/[0.08] py-12 last:border-b-0 md:border-b-0 md:px-5 md:py-10 md:odd:border-r md:odd:border-charcoal/[0.08] lg:px-6"
    >
      <div className="relative lg:pl-2">
        <span
          className={cn(
            "pointer-events-none absolute -left-1 top-0 select-none font-medium leading-none transition-colors duration-500 lg:-left-2",
            "text-[52px] md:text-[72px] lg:text-[56px] xl:text-[64px]",
            isInView ? "text-charcoal/[0.07]" : "text-charcoal/[0.04]"
          )}
          aria-hidden="true"
        >
          {formatIndex(index)}
        </span>

        <div className="relative">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-mono text-[13px] tabular-nums text-[#9CA5AA] lg:hidden">
              {formatIndex(index)}
            </span>
            <CategoryBadge label={driver.label.toUpperCase()} active={isInView} />
          </div>

          <h3
            className={cn(
              "mt-5 text-[32px] font-semibold leading-[1.1] tracking-[-0.02em] text-charcoal transition-opacity duration-300 md:text-[34px] lg:text-[36px] xl:text-[40px]",
              isInView ? "opacity-100" : "opacity-80"
            )}
          >
            {titleParts.map((part, i) => (
              <span key={part} className="block">
                {part}
              </span>
            ))}
          </h3>

          <p className="mt-6 text-[17px] leading-[1.7] text-[#687178] md:text-[18px] lg:text-[17px]">
            {driver.description}
          </p>

          <StoryVisual driver={driver} active={isInView} />

          <motion.div
            initial={false}
            animate={{ scaleX: isInView ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.06, ease: EASE }}
            className="mt-10 h-px max-w-[280px] origin-left bg-charcoal/[0.12]"
            aria-hidden="true"
          />
        </div>
      </div>
    </motion.article>
  );
}

export function WhyMysuru() {
  const [activeIndex, setActiveIndex] = useState(0);
  const storyRefs = useRef<Map<number, HTMLElement>>(new Map());
  const reduceMotion = useReducedMotion();

  const setStoryRef = useCallback((index: number, node: HTMLElement | null) => {
    if (node) storyRefs.current.set(index, node);
    else storyRefs.current.delete(index);
  }, []);

  const scrollToStory = useCallback(
    (index: number) => {
      const node = storyRefs.current.get(index);
      if (node) {
        node.scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
          block: "center",
        });
        setActiveIndex(index);
      }
    },
    [reduceMotion]
  );

  const handleActive = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  return (
    <section
      id="why-mysuru"
      className="relative bg-[#F7F9FA] pt-16 pb-8 md:pt-20 md:pb-10 lg:pt-24 lg:pb-8"
      aria-labelledby="why-mysuru-heading"
    >
      {/* Background architecture */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(32,33,36,0.04) 0, rgba(32,33,36,0.04) 1px, transparent 1px, transparent 120px)",
          }}
        />
        <p className="absolute -right-8 top-24 select-none text-[120px] font-semibold uppercase tracking-tight text-charcoal/[0.03] md:text-[180px] lg:right-16 lg:top-32 lg:text-[220px]">
          Mysuru
        </p>
        <div className="absolute left-[8%] top-[18%] h-16 w-16 border border-brand-cyan/[0.06]" />
        <div className="absolute bottom-[12%] right-[10%] h-10 w-10 border border-brand-cyan/[0.05]" />
      </div>

      <div className="relative mx-auto w-full max-w-[1360px] px-5 md:px-12 lg:px-16">
        {/* Editorial header */}
        <header className="w-full">
          <p className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-brand-cyan">
            <span className="inline-block h-2 w-2 shrink-0 bg-brand-cyan" aria-hidden="true" />
            Investment Context
          </p>

          <div className="mt-6 flex items-center gap-6 md:gap-8 lg:gap-10">
            <h2
              id="why-mysuru-heading"
              className="shrink-0 text-[40px] font-semibold tracking-[-0.03em] text-charcoal md:text-[56px] lg:text-[64px]"
              style={{ lineHeight: 1.05 }}
            >
              Why Mysuru?
            </h2>
            <div className="hidden h-px min-w-0 flex-1 bg-charcoal/10 lg:block" aria-hidden="true" />
          </div>

          <p className="mt-5 max-w-[600px] text-lg leading-relaxed text-[#687178] md:text-xl">
            The next chapter of Karnataka&apos;s growth is taking shape here.
          </p>
        </header>

        <MobileGrowthHeader
          activeIndex={activeIndex}
          onPrev={() => scrollToStory(Math.max(0, activeIndex - 1))}
          onNext={() => scrollToStory(Math.min(TOTAL - 1, activeIndex + 1))}
        />

        {/* Main layout — left nav sticky, right stories scroll with page */}
        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-x-10 xl:gap-x-12">
          {/* Left — stays fixed while stories scroll */}
          <aside className="hidden lg:sticky lg:top-[120px] lg:z-10 lg:col-span-4 lg:block lg:max-h-[calc(100vh-120px)] lg:self-start lg:overflow-y-auto">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7B858C]">
              Growth Story
            </p>
            <nav aria-label="Mysuru growth story navigation" className="mt-6">
              <ul>
                {growthDrivers.map((driver, index) => (
                  <GrowthNavItem
                    key={driver.id}
                    driver={driver}
                    index={index}
                    active={activeIndex === index}
                    onSelect={() => scrollToStory(index)}
                  />
                ))}
              </ul>
            </nav>
          </aside>

          {/* Right — editorial stories */}
          <div className="relative w-full min-w-0 lg:col-span-8">
            <div className="grid w-full grid-cols-1 md:grid-cols-2 md:divide-y md:divide-charcoal/[0.08]">
              {growthDrivers.map((driver, index) => (
                <GrowthStory
                  key={driver.id}
                  driver={driver}
                  index={index}
                  onActive={handleActive}
                  setRef={setStoryRef}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
