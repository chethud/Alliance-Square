import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/ui/Motion";
import { company } from "@/data/company";
import { projectImage } from "@/data/images";

export function SiteVisitCTA() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="site-visit-heading">
      <div className="relative min-h-[520px]">
        <Image
          src={projectImage("jeevan-vihar-phase-2")}
          alt="Jeevan Vihar Phase 2 — Alliance Square layout in Mysuru"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/70 to-dark/40" />
        <div className="absolute inset-0 bg-mesh-dark opacity-40" />
      </div>

      <div className="container-main absolute inset-0 flex items-center">
        <FadeIn>
          <div className="max-w-xl">
            <p className="label-accent text-brand-cyan">Site Visit</p>
            <h2 id="site-visit-heading" className="heading-section-light mt-4">
              See It Before You Decide.
            </h2>
            <p className="mt-4 text-lg text-white/75">
              Visit the property, explore the surroundings and speak with our experts.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact#site-visit" className="btn-primary">
                Schedule a Site Visit
              </Link>
              <a href={company.phoneHref} className="btn-outline-light">
                Call an Expert
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
