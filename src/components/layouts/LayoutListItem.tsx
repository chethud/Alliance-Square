import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProjectMapStatus } from "@/data/projects";
import type { Project } from "@/types";

interface LayoutListItemProps {
  project: Project;
}

export function LayoutListItem({ project }: LayoutListItemProps) {
  const isCompleted = getProjectMapStatus(project.slug) === "completed";

  return (
    <article className="premium-card group flex h-full flex-col overflow-hidden">
      <Link
        href={`/projects/${project.slug}`}
        className="relative aspect-[16/10] w-full shrink-0 overflow-hidden"
      >
        <Image
          src={project.heroImage}
          alt={project.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px"
        />
        {isCompleted ? (
          <span
            className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
            aria-label="Completed project"
          >
            <Image
              src="/images/ui/completed-seal.png"
              alt=""
              width={180}
              height={180}
              unoptimized
              className="h-24 w-24 object-contain drop-shadow-[0_6px_14px_rgba(11,13,15,0.25)] sm:h-28 sm:w-28 md:h-32 md:w-32 lg:h-[140px] lg:w-[140px]"
            />
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col justify-center p-5 md:p-6">
        <Link
          href={`/projects/${project.slug}`}
          className="text-xl font-bold leading-tight text-charcoal transition-colors hover:text-brand-cyan md:text-2xl"
        >
          {project.name}
        </Link>
        <p className="mt-1.5 text-base font-bold text-charcoal md:text-lg">{project.priceLabel}</p>
        <p className="mt-2 line-clamp-2 text-sm leading-snug text-cool-gray">
          {project.listingDescription ?? project.description}
        </p>
        <Link href={`/projects/${project.slug}`} className="link-arrow mt-3 text-sm">
          View More
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
