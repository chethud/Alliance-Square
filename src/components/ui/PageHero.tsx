import Image from "next/image";
import Link from "next/link";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  description?: string;
  image: string;
  imageAlt: string;
  breadcrumbs?: Breadcrumb[];
}

export function PageHero({ title, description, image, imageAlt, breadcrumbs }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pt-28 pb-24 md:pt-32 md:pb-28">
      <div className="absolute inset-0">
        <Image src={image} alt={imageAlt} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-br from-dark/90 via-dark/75 to-dark/50" />
        <div className="absolute inset-0 bg-mesh-dark opacity-60" />
      </div>
      <div className="container-main relative">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-white/60">
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true">/</span>}
                  {crumb.href ? (
                    <Link href={crumb.href} className="transition-colors hover:text-white">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="font-medium text-white" aria-current="page">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <h1 className="heading-display-light max-w-3xl">{title}</h1>
        {description && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">{description}</p>
        )}
      </div>
    </section>
  );
}
