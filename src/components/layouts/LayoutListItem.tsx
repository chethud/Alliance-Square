import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/types";

interface LayoutListItemProps {
  project: Project;
}

export function LayoutListItem({ project }: LayoutListItemProps) {
  return (
    <article className="premium-card group">
      <div className="grid md:grid-cols-[minmax(280px,36%)_1fr]">
        <Link
          href={`/projects/${project.slug}`}
          className="relative block aspect-[297/194] overflow-hidden md:aspect-auto md:min-h-[220px]"
        >
          <Image
            src={project.heroImage}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 36vw"
          />
        </Link>

        <div className="flex flex-col justify-center p-7 md:p-9">
          <Link
            href={`/projects/${project.slug}`}
            className="text-3xl font-bold text-charcoal transition-colors hover:text-brand-cyan"
          >
            {project.name}
          </Link>
          <p className="mt-2 text-xl font-bold text-charcoal">{project.priceLabel}</p>
          <p className="mt-4 text-body text-sm md:text-base">
            {project.listingDescription ?? project.description}
          </p>
          <Link href={`/projects/${project.slug}`} className="link-arrow mt-6">
            View More
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
