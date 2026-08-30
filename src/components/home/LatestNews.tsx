"use client";

import Link from "next/link";
import { latestNews } from "@/data/news";

export function LatestNews() {
  return (
    <div className="border-b border-brand-cyan/20 bg-premium-dark">
      <div className="container-main flex flex-col gap-3 py-3.5 sm:flex-row sm:items-center sm:gap-8">
        <span className="shrink-0 rounded-full bg-brand-cyan/15 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-cyan">
          Latest News
        </span>
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-10 sm:gap-y-1">
          {latestNews.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="text-sm text-white/80 transition-colors hover:text-brand-cyan"
            >
              {item.text}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
