import { FadeIn } from "@/components/ui/Motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { whyAllianceFeatures } from "@/data/company";

export function WhyAllianceSquare() {
  return (
    <section
      id="why-alliance-square"
      className="section-dark section-spacing relative overflow-hidden"
      aria-labelledby="why-alliance-heading"
    >
      <div className="absolute inset-0 bg-mesh-dark opacity-50" />
      <div className="container-main relative">
        <SectionHeader
          label="Why Choose Us"
          title={
            <>
              Why Invest With
              <br />
              Alliance Square?
            </>
          }
          description="Mysuru's trusted real estate partner — legally approved, error-free, and discrepancy-free properties."
          light
        />

        <div className="mt-10 grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-3">
          {whyAllianceFeatures.map((feature, index) => (
            <FadeIn key={feature.number} delay={index * 0.08}>
              <article className="group h-full rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-500 hover:border-brand-cyan/30 hover:bg-white/10 sm:p-6 md:p-10">
                <div className="flex items-center gap-2 sm:gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-cyan/15 text-xs font-bold text-brand-cyan sm:h-10 sm:w-10 sm:text-sm">
                    {feature.number}
                  </span>
                  <div className="h-px flex-1 bg-white/10 transition-all group-hover:bg-brand-cyan/40" />
                </div>
                <h3 className="mt-4 text-base font-bold text-white sm:mt-6 sm:text-xl md:text-2xl">{feature.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-white/60 sm:mt-3 sm:text-sm">{feature.description}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
