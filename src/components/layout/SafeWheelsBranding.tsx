import Image from "next/image";
import Link from "next/link";
import { company } from "@/data/company";

export function SafeWheelsBranding() {
  return (
    <section
      className="relative overflow-hidden bg-white pb-6 pt-6 md:pb-8 md:pt-8"
      aria-labelledby="footer-welcome-heading"
    >
      <div className="container-main relative">
        <div className="grid items-center gap-5 md:grid-cols-12 md:gap-6 lg:gap-8">
          <div className="flex justify-center md:col-span-3 md:justify-start lg:col-span-3">
            <div className="relative w-full max-w-[140px] sm:max-w-[160px] md:max-w-[170px]">
              <Image
                src="/images/brand/safewheels-footer-logo.png"
                alt="Powered by Safe Wheels Group of Companies"
                width={170}
                height={200}
                className="h-auto w-full object-contain drop-shadow-sm"
              />
            </div>
          </div>

          <div className="md:col-span-9 lg:col-span-9">
            <div className="border-t-[2px] border-brand-cyan/25 pt-4 md:pt-5">
              <h2
                id="footer-welcome-heading"
                className="text-base font-bold uppercase tracking-[0.06em] text-charcoal sm:text-lg"
              >
                Welcome to Alliance Square
              </h2>
              <p className="mt-2.5 text-xs leading-[1.65] text-charcoal/85 sm:text-sm md:text-justify">
                <Link href="/" className="font-semibold text-brand-cyan transition-colors hover:text-deep-blue">
                  {company.shortName}
                </Link>{" "}
                {company.footerWelcome}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
