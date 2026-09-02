import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/ui/Motion";
import { company } from "@/data/company";
import { projectImage } from "@/data/images";

export function SiteVisitCTA() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="site-visit-heading">
      <div className="relative min-h-[520px] lg:min-h-[560px]">
        <Image
          src={projectImage("uk-square")}
          alt="UK Square — Alliance Square layout in Mysuru"
          fill
          priority
          quality={90}
          className="hero-image-clarity object-cover object-[center_42%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/88 via-dark/52 to-dark/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/35 via-transparent to-transparent" />
      </div>

      <div className="container-main absolute inset-0 flex items-center">
        <FadeIn>
          <div className="max-w-xl rounded-2xl border border-white/10 bg-dark/15 p-6 backdrop-blur-[3px] md:border-0 md:bg-transparent md:p-0 md:backdrop-blur-none">
            <p className="label-upper text-brand-cyan">Site Visit</p>
            <h2 id="site-visit-heading" className="heading-section-light mt-4">
              See It Before You Decide.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/85">
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
