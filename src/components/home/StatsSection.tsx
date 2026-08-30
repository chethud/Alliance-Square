"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { stats } from "@/data/company";

const EASE = [0.22, 1, 0.36, 1] as const;

const formatInteger = (value: number) => String(Math.round(value));
const formatLocale = (value: number) => Math.round(value).toLocaleString("en-IN");

const statItems = [
  { target: stats.years, suffix: "+", label: "Years of Real Estate Excellence", format: formatInteger },
  { target: stats.layouts, suffix: "+", label: "Layouts", format: formatInteger },
  { target: stats.customers, suffix: "+", label: "Happy Customers", format: formatLocale },
  { target: 100, suffix: "%", label: "Customer-Focused Approach", format: formatInteger },
] as const;

function AnimatedStatValue({
  target,
  suffix,
  format,
  play,
}: {
  target: number;
  suffix: string;
  format: (value: number) => string;
  play: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const hasPlayed = useRef(false);
  const [display, setDisplay] = useState(() => `${format(target)}${suffix}`);

  useEffect(() => {
    if (!play || hasPlayed.current) return;
    hasPlayed.current = true;

    if (reduceMotion) {
      return;
    }

    setDisplay(`${format(0)}${suffix}`);

    const controls = animate(0, target, {
      duration: 2,
      ease: EASE,
      onUpdate: (value) => setDisplay(`${format(value)}${suffix}`),
      onComplete: () => setDisplay(`${format(target)}${suffix}`),
    });

    return () => controls.stop();
  }, [play, target, suffix, format, reduceMotion]);

  return (
    <p className="text-4xl font-extrabold tabular-nums text-white sm:text-5xl md:text-6xl lg:text-7xl">
      {display}
    </p>
  );
}

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.2,
    margin: "0px 0px -10% 0px",
  });
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (isInView) {
      setVisible(true);
      return;
    }

    const node = sectionRef.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setVisible(true);
    }
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-premium-dark py-20 md:py-24"
      aria-label="Company statistics"
    >
      <div className="absolute inset-0 bg-mesh-dark opacity-60" aria-hidden="true" />
      <div className="container-main relative">
        <div className="grid grid-cols-2 gap-y-12 md:grid-cols-4">
          {statItems.map((item, index) => (
            <div
              key={item.label}
              className={`flex flex-col items-center px-4 text-center md:px-6 ${
                index > 0 ? "md:border-l md:border-white/10" : ""
              }`}
            >
              <AnimatedStatValue
                target={item.target}
                suffix={item.suffix}
                format={item.format}
                play={visible}
              />
              <p className="mt-3 max-w-[180px] text-sm leading-snug text-white/55 md:text-base">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
