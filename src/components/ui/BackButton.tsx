"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface BackButtonProps {
  fallbackHref?: string;
  className?: string;
  label?: string;
}

export function BackButton({
  fallbackHref = "/layouts",
  className,
  label = "Go back",
}: BackButtonProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window !== "undefined" && window.history.length > 1) {
          router.back();
        } else {
          router.push(fallbackHref);
        }
      }}
      className={cn(
        "flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-dark/40 text-white backdrop-blur-sm transition-all duration-300 hover:border-brand-cyan hover:bg-brand-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-dark",
        className
      )}
      aria-label={label}
    >
      <ArrowLeft className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
