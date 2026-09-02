import { FadeIn } from "@/components/ui/Motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { approvalSteps } from "@/data/company";
import { faqs } from "@/data/faqs";

export function ApprovalSection() {
  return (
    <section id="approval-trust" className="section-spacing bg-off-white" aria-labelledby="approval-heading">
      <div className="container-main">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeader
              label="Trust & Compliance"
              title="Confidence Before You Invest."
              description="We emphasize legally approved properties with verified documentation — MUDA/MDA approval, DTCP approval, RERA registration where applicable, and complete registration support."
            />

            <div className="mt-10 space-y-3">
              {faqs.slice(0, 4).map((faq, index) => (
                <FadeIn key={faq.id} delay={index * 0.05}>
                  <details className="group surface-card overflow-hidden p-0">
                    <summary className="cursor-pointer px-6 py-4 text-sm font-semibold text-charcoal transition-colors hover:text-brand-cyan">
                      {faq.question}
                    </summary>
                    <p className="border-t border-light-gray px-6 py-4 text-sm leading-relaxed text-cool-gray">
                      {faq.answer}
                    </p>
                  </details>
                </FadeIn>
              ))}
            </div>
          </div>

          <div>
            <FadeIn delay={0.2}>
              <p className="label-upper text-brand-cyan">Your Journey</p>
              <div className="mt-8 space-y-0">
                {approvalSteps.map((step, index) => (
                  <div key={step.number} className="relative flex gap-6 pb-8">
                    {index < approvalSteps.length - 1 && (
                      <div
                        className="absolute left-[19px] top-10 h-full w-px bg-light-gray"
                        aria-hidden="true"
                      />
                    )}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-cyan/30 bg-brand-cyan/10 text-xs font-bold text-brand-cyan">
                      {step.number}
                    </div>
                    <div>
                      <h3 className="font-bold text-charcoal">{step.title}</h3>
                      <p className="mt-1 text-sm text-cool-gray">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
