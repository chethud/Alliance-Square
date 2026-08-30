import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/types";

interface LayoutListItemProps {
  project: Project;
}

export function LayoutListItem({ project }: LayoutListItemProps) {
  return (
    <article className="premium-card group flex h-full min-h-[420px] flex-col overflow-hidden md:min-h-[460px]">
      <Link
        href={`/projects/${project.slug}`}
        className="relative min-h-0 flex-[7] overflow-hidden"
      >
        <Image
          src={project.heroImage}
          alt={project.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </Link>

      <div className="flex min-h-0 flex-[3] flex-col justify-center p-5 md:p-6">
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
