import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { ADVISORS_ORIGIN } from "@/lib/advisors";
import { brandLogo } from "@/data/images";
import { createPageMetadata } from "@/lib/seo/metadata";

export const dynamic = "force-dynamic";

type AdvisorProfile = {
  name: string;
  role: string;
  phoneDisplay: string;
  phoneHref: string;
  whatsappHref: string | null;
  checkedAt: string | null;
};

function decodeHtml(value: string) {
  return value
    .replace(/&#x27;/gi, "'")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

async function fetchAdvisorProfile(slug: string): Promise<AdvisorProfile | null> {
  try {
    const response = await fetch(`${ADVISORS_ORIGIN}/advisor/${encodeURIComponent(slug)}`, {
      cache: "no-store",
      headers: { Accept: "text/html" },
    });
    if (!response.ok) return null;

    const html = await response.text();
    const name =
      decodeHtml(html.match(/<h1[^>]*>([^<]+)<\/h1>/i)?.[1]?.trim() ?? "") ||
      decodeHtml(html.match(/<title>([^|<]+)/i)?.[1]?.trim() ?? "");
    if (!name) return null;

    const role =
      decodeHtml(
        html.match(/<p class="muted"[^>]*>([^<]+)<\/p>/i)?.[1]?.trim() ?? "Alliance Square Advisor"
      ) || "Alliance Square Advisor";

    const telMatch = html.match(/href="(tel:[^"]+)"[^>]*>Call\s*(?:<!-- -->)?([^<]+)/i);
    const phoneHref = telMatch?.[1] ?? "";
    const phoneDisplay = decodeHtml(
      (telMatch?.[2] ?? phoneHref.replace(/^tel:/i, "")).replace(/<!--\s*-->/g, "").trim()
    );

    const whatsappHref =
      html.match(/href="(https?:\/\/(?:wa\.me|api\.whatsapp\.com)[^"]+)"/i)?.[1] ?? null;

    const checkedRaw = html.match(/Checked live on\s*(?:<!-- -->)?([^<]+?)(?:<!-- -->)?\s*IST/i);
    const checkedAt = checkedRaw
      ? `${decodeHtml(checkedRaw[1].replace(/<!--\s*-->/g, "").trim())} IST`
      : null;

    return {
      name,
      role,
      phoneDisplay: phoneDisplay || "Sales office",
      phoneHref: phoneHref || "tel:08212541100",
      whatsappHref,
      checkedAt,
    };
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const profile = await fetchAdvisorProfile(slug);
  const title = profile
    ? `${profile.name}, Verified Advisor`
    : "Verified Advisor";

  return createPageMetadata({
    title,
    description:
      "Official Alliance Square advisor verification card. Confirm you are speaking with a verified advisor before sharing documents or making payments.",
    path: `/verify/advisor/${slug}`,
  });
}

export default async function AdvisorProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const profile = await fetchAdvisorProfile(slug);
  if (!profile) notFound();

  const initial = profile.name.trim().charAt(0).toUpperCase() || "A";

  return (
    <div className="flex min-h-[100dvh] flex-col items-center bg-[#f3f4f6] px-4 py-10 sm:px-6">
      <Link href="/verify" className="mb-8 inline-flex sm:mb-10" aria-label="Back to verify">
        <Image
          src={brandLogo}
          alt="Alliance Square Property Management & Consultants"
          width={260}
          height={66}
          className="h-12 w-auto sm:h-14"
          priority
        />
      </Link>

      <article className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-[0_10px_40px_rgba(15,23,42,0.08)] sm:p-8">
        <div
          className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4 border-brand-cyan/40 bg-brand-cyan/10 text-3xl font-bold text-brand-cyan"
          aria-hidden="true"
        >
          {initial}
        </div>

        <h1 className="mt-5 text-2xl font-bold tracking-tight text-charcoal">{profile.name}</h1>
        <p className="mt-1 text-sm text-cool-gray">{profile.role}</p>

        <p
          role="status"
          className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700"
        >
          <ShieldCheck className="h-4 w-4" aria-hidden="true" />
          Verified Alliance Square advisor
        </p>

        {profile.checkedAt ? (
          <p className="mt-2 text-xs text-cool-gray">Checked live on {profile.checkedAt}</p>
        ) : null}

        <div className="mt-6 space-y-3">
          {profile.whatsappHref ? (
            <a
              href={profile.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center rounded-xl bg-brand-cyan px-5 py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-cyan/90"
            >
              Chat on WhatsApp
            </a>
          ) : null}
          <a
            href={profile.phoneHref}
            className="flex w-full items-center justify-center rounded-xl border border-light-gray bg-white px-5 py-3.5 text-base font-semibold text-charcoal transition-colors hover:border-brand-cyan/40 hover:text-brand-cyan"
          >
            Call {profile.phoneDisplay}
          </a>
        </div>
      </article>

      <p className="mt-8 max-w-md text-center text-sm leading-relaxed text-cool-gray">
        This is an official Alliance Square verification page. Alliance Square never asks for
        payments into personal accounts.
      </p>

      <Link
        href="/verify"
        className="mt-4 text-sm font-medium text-brand-cyan underline-offset-2 hover:underline"
      >
        Check another number
      </Link>
    </div>
  );
}
