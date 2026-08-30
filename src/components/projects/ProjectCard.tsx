"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="premium-card group relative block h-full min-h-[420px] overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image
          src={project.heroImage}
          alt={`${project.name} - ${project.location.area}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/45 via-30% to-transparent" />

      <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2">
        {project.approvals.map((approval) => (
          <span key={approval} className="badge bg-white/90 text-brand-cyan backdrop-blur-sm">
            {approval}
          </span>
        ))}
      </div>

      <div className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-card transition-all duration-300 group-hover:opacity-100">
        <ArrowUpRight className="h-4 w-4 text-charcoal" />
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 flex h-[30%] min-h-[140px] flex-col justify-end p-5 md:p-6">
        <h3 className="text-xl font-bold leading-snug text-white md:text-2xl">{project.name}</h3>
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-white/75">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-brand-cyan" />
          {project.location.area}, {project.location.city}
        </p>
        <p className="mt-2 text-lg font-bold text-white md:text-xl">{project.priceLabel}</p>
        <p className="mt-1 line-clamp-1 text-xs text-white/65 md:text-sm">
          Plot sizes: {project.plotSizes.join(" • ")}
        </p>
        <span className="link-arrow mt-3 text-brand-cyan">
          View Project
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}
