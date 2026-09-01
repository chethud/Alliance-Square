"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
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
  const [display, setDisplay] = useState(() => `${format(target)}${suffix}`);

  useEffect(() => {
    if (!play) return;

    if (reduceMotion) {
      setDisplay(`${format(target)}${suffix}`);
      return;
    }

    setDisplay(`${format(0)}${suffix}`);

    const controls = animate(0, target, {
      duration: 2,
      ease: EASE,
      onUpdate: (value) => setDisplay(`${format(value)}${suffix}`),
      onComplete: () => setDisplay(`${format(target)}${suffix}`),
    });

    return () => {
      controls.stop();
      setDisplay(`${format(target)}${suffix}`);
    };
  }, [play, target, suffix, format, reduceMotion]);

  return (
    <p className="text-3xl font-extrabold leading-none tabular-nums text-white sm:text-4xl md:text-5xl lg:text-6xl">
      {display}
    </p>
  );
}

export function StatsSection() {
  const pathname = usePathname();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    amount: 0.2,
    margin: "0px 0px -10% 0px",
  });
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    if (pathname === "/") {
      setAnimationKey((key) => key + 1);
    }
  }, [pathname]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-premium-dark py-5 md:py-6"
      aria-label="Company statistics"
    >
      <div className="absolute inset-0 bg-mesh-dark opacity-60" aria-hidden="true" />
      <div className="container-main relative flex min-h-[132px] items-center md:min-h-[148px]">
        <div className="grid w-full grid-cols-2 items-center gap-x-3 gap-y-6 md:grid-cols-4 md:gap-y-0">
          {statItems.map((item, index) => (
            <div
              key={item.label}
              className={`flex flex-col items-center justify-center px-3 text-center md:px-5 ${
                index > 0 ? "md:border-l md:border-white/10" : ""
              }`}
            >
              <AnimatedStatValue
                key={`${animationKey}-${item.label}`}
                target={item.target}
                suffix={item.suffix}
                format={item.format}
                play={isInView}
              />
              <p className="mt-2 max-w-[160px] text-xs leading-snug text-white/55 md:max-w-[180px] md:text-sm">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
