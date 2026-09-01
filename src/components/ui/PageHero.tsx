import Image from "next/image";
import Link from "next/link";
import { BackButton } from "@/components/ui/BackButton";
interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  description?: string;
  label?: string;
  image: string;
  imageAlt: string;
  breadcrumbs?: Breadcrumb[];
  backFallbackHref?: string;
}

export function PageHero({
  title,
  description,
  label,
  image,
  imageAlt,
  breadcrumbs,
  backFallbackHref,
}: PageHeroProps) {
  const fallbackHref =
    backFallbackHref ??
    breadcrumbs?.findLast((crumb) => crumb.href)?.href ??
    "/";

  return (
    <section className="relative overflow-hidden">
      <div className="page-hero-shell relative min-h-[380px] md:min-h-[440px] lg:min-h-[480px]">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          quality={92}
          className="object-cover object-center hero-image-clarity scale-[1.03]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/65 to-dark/20" />
        <BackButton
          fallbackHref={fallbackHref}
          label="Go back"
          className="absolute left-4 top-24 z-10 md:left-6 md:top-28"
        />
      </div>

      <div className="container-main relative -mt-28 pb-8 md:-mt-32 md:pb-10">
        <div className="max-w-3xl rounded-2xl border border-white/10 bg-dark/40 p-6 shadow-premium backdrop-blur-xl md:p-8">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav aria-label="Breadcrumb" className="mb-6">
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

          {label && (
            <div className="flex items-center gap-3">
              <span className="h-px w-8 shrink-0 bg-brand-cyan" aria-hidden="true" />
              <p className="label-upper text-brand-cyan">{label}</p>
            </div>
          )}
          <h1 className={`heading-section-light ${label ? "mt-4" : ""}`}>{title}</h1>
          {description && (
            <p className="mt-4 text-base leading-relaxed text-white/75 md:text-lg">{description}</p>
          )}
        </div>
      </div>
    </section>
  );
}
