import Link from "next/link";
import { FadeIn } from "@/components/ui/Motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { company } from "@/data/company";

export function BrandIntro() {
  return (
    <section className="bg-white pt-10 pb-20 md:pt-12 md:pb-28 lg:pt-14 lg:pb-32" aria-labelledby="who-we-are">
      <div className="container-main">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-6">
            <SectionHeader
              label="Who We Are"
              title={
                <>
                  25+ Years of Building
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
