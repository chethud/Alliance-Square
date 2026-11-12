import Image from "next/image";
import Link from "next/link";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { ADVISORS_ORIGIN, type AdvisorLookup } from "@/lib/advisors";
import { brandLogo } from "@/data/images";
import { company } from "@/data/company";

export function VerifyAdvisor({
  phone,
  result,
}: {
  phone: string;
  result: AdvisorLookup;
}) {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-[#f3f4f6] px-4 py-10 sm:px-6">
      <Image
        src={brandLogo}
        alt="Alliance Square Property Management & Consultants"
        width={260}
        height={66}
        className="mb-8 h-12 w-auto sm:mb-10 sm:h-14"
        priority
      />

      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-[0_10px_40px_rgba(15,23,42,0.08)] sm:p-8">
        <h1 className="text-2xl font-bold tracking-tight text-charcoal sm:text-[1.75rem]">
          Verify an Alliance Square advisor
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-cool-gray">
          Got a call or WhatsApp message from someone saying they are from Alliance Square? Check
          their number here.
        </p>

        <form method="get" action="/verify" className="mt-8 space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-charcoal">
              Their mobile number
            </span>
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="off"
              required
              maxLength={20}
              defaultValue={phone}
              placeholder="e.g. 96060 25056"
              className="w-full rounded-xl border border-light-gray bg-white px-4 py-3 text-base text-charcoal outline-none transition-colors placeholder:text-cool-gray/70 focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20"
            />
          </label>
          <button
            type="submit"
            className="flex w-full items-center justify-center rounded-xl bg-brand-cyan px-5 py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-cyan/90"
          >
            Verify
          </button>
        </form>

        {result.status !== "idle" ? (
          <div
            role="status"
            className={`mt-6 rounded-xl border p-4 ${
              result.status === "found"
                ? "border-brand-cyan/30 bg-brand-cyan/5"
                : "border-light-gray bg-off-white"
            }`}
          >
            {result.status === "found" ? (
              <p className="flex gap-3 text-sm leading-relaxed text-charcoal">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-cyan" aria-hidden="true" />
                <span>
                  This number belongs to{" "}
                  <Link
                    href={result.profilePath}
                    className="font-semibold text-brand-cyan hover:underline"
                  >
                    {result.name}
                  </Link>
                  , a verified Alliance Square advisor.
                </span>
              </p>
            ) : (
              <p className="flex gap-3 text-sm leading-relaxed text-charcoal">
                <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-charcoal" aria-hidden="true" />
                <span>
                  {result.message}{" "}
                  {result.status === "not_found" ? (
                    <>
                      Call{" "}
                      <a
                        href={company.phoneHref}
                        className="font-semibold text-brand-cyan hover:underline"
                      >
                        {company.phone}
                      </a>{" "}
                      if you are unsure.
                    </>
                  ) : null}
                </span>
              </p>
            )}
          </div>
        ) : null}
      </div>

      <a
        href={`${ADVISORS_ORIGIN}/login`}
        className="mt-8 text-sm font-medium text-brand-cyan underline-offset-2 hover:underline"
      >
        Staff login
      </a>
    </div>
  );
}
