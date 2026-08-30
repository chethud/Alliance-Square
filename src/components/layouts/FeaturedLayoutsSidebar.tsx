import Image from "next/image";
import Link from "next/link";
import {
  featuredSidebarOrder,
  getProjectsInOrder,
} from "@/data/projects";

export function FeaturedLayoutsSidebar() {
  const featured = getProjectsInOrder(featuredSidebarOrder);

  return (
    <aside className="space-y-6 lg:sticky lg:top-28">
      <div className="surface-card">        <h2 className="text-2xl font-bold text-charcoal">
          Featured <span className="text-brand-cyan">Layouts</span>
        </h2>
        <ul className="mt-6 space-y-5">
          {featured.map((project) => (
            <li key={project.id}>
              <Link href={`/projects/${project.slug}`} className="group flex gap-4">
                <div className="relative h-16 w-[85px] shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={project.heroImage}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="85px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-charcoal group-hover:text-brand-cyan">
                    {project.name}
                  </p>
                  <p className="mt-1 text-sm font-bold text-charcoal">{project.priceLabel}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
