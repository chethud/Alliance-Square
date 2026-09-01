import Image from "next/image";
import Link from "next/link";
import { company } from "@/data/company";

export function SafeWheelsBranding() {
  return (
    <section
      className="relative overflow-hidden bg-white pb-10 pt-10 md:pb-12 md:pt-12"
      aria-labelledby="footer-welcome-heading"
    >
      <div className="container-main relative">
        <div className="grid items-center gap-8 md:grid-cols-12 md:gap-10 lg:gap-12">
          <div className="flex justify-center md:col-span-4 md:justify-start lg:col-span-4">
            <div className="relative w-full max-w-[200px] sm:max-w-[220px] md:max-w-[240px]">
              <Image
                src="/images/brand/safewheels-footer-logo.png"
                alt="Powered by Safe Wheels Group of Companies"
                width={240}
                height={280}
                className="h-auto w-full object-contain drop-shadow-sm"
              />
            </div>
          </div>

          <div className="md:col-span-8 lg:col-span-8">
            <div className="border-t-[3px] border-brand-cyan/25 pt-6 md:pt-8">
              <h2
                id="footer-welcome-heading"
                className="text-lg font-bold uppercase tracking-[0.06em] text-charcoal sm:text-xl md:text-[1.35rem]"
              >
                Welcome to Alliance Square
              </h2>
              <p className="mt-4 text-sm leading-[1.75] text-charcoal/85 sm:text-[15px] md:text-justify">
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
