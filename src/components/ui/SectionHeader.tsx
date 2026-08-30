import { FadeIn } from "@/components/ui/Motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionHeaderProps {
  label: string;
  title: ReactNode;
  description?: string;
  light?: boolean;
  align?: "left" | "center";
  className?: string;
  headingId?: string;
  titleClassName?: string;
}

export function SectionHeader({
  label,
  title,
  description,
  light = false,
  align = "left",
  className,
  headingId,
  titleClassName,
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <FadeIn className={cn(isCenter && "text-center", className)}>
      <div className={cn("flex items-center gap-3", isCenter && "justify-center")}>
        <span className="h-px w-8 shrink-0 bg-brand-cyan" aria-hidden="true" />
        <p className="label-upper text-brand-cyan">{label}</p>
      </div>
      <h2
        id={headingId}
        className={cn(
          "mt-4 max-w-2xl",
          light ? "heading-section-light" : "heading-section",
          isCenter && "mx-auto",
          titleClassName
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 max-w-xl text-body",
            light && "text-white/70",
            isCenter && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </FadeIn>
  );
}
