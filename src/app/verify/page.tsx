import type { Metadata } from "next";
import { VerifyPageSchema } from "@/components/seo/StructuredData";
import { VerifyAdvisor } from "@/components/verify/VerifyAdvisor";
import { createPageMetadata } from "@/lib/seo/metadata";
import { layoutsBanner } from "@/data/images";
import { lookupAdvisor, type AdvisorLookup } from "@/lib/advisors";

export const dynamic = "force-dynamic";

export const metadata: Metadata = createPageMetadata({
  title: "Verify an Alliance Square Advisor | Official Staff Check",
  description:
    "Got a call or WhatsApp from someone saying they are from Alliance Square? Check their mobile number against official verified advisors.",
  path: "/verify",
  image: layoutsBanner,
});

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ phone?: string }>;
}) {
  const { phone = "" } = await searchParams;
  const result: AdvisorLookup = phone.trim() ? await lookupAdvisor(phone) : { status: "idle" };

  return (
    <>
      <VerifyPageSchema />
      <VerifyAdvisor phone={phone} result={result} />
    </>
  );
}
