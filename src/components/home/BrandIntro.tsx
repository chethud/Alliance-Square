import Link from "next/link";
import { FadeIn } from "@/components/ui/Motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { company, stats } from "@/data/company";

export function BrandIntro() {
  return (
    <section className="section-pad bg-white pt-10 md:pt-12 lg:pt-14" aria-labelledby="who-we-are">
      <div className="container-main">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <SectionHeader
              label="Who We Are"
              title={
                <>
                  {stats.years}+ Years of Building
                  <br />
                  Trust in Mysuru Real Estate.
                </>
              }
            />
          </div>
          <div className="lg:col-span-6">
            <FadeIn delay={0.2}>
              <div className="surface-card">
                <p className="text-body">{company.intro}</p>
                <p className="mt-4 text-base leading-relaxed text-cool-gray">{company.description}</p>
                <Link href="/about" className="link-arrow mt-8">
                  Discover Alliance Square
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
