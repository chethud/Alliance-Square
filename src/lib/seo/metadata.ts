import type { Metadata } from "next";
import { absoluteUrl, DEFAULT_OG_IMAGE, SEO_KEYWORDS, SITE_NAME, SITE_URL } from "./config";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  type = "website",
  noIndex = false,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = absoluteUrl(image);

  return {
    title,
    description,
    keywords: [...SEO_KEYWORDS],
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_IN",
      type,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Alliance Square Properties | Premium Real Estate in Mysuru",
    template: "%s | Alliance Square Properties",
  },
  description:
    "Explore premium residential plots, MUDA & DTCP approved layouts, apartments and investment opportunities in Mysuru with Alliance Square Properties.",
  keywords: [...SEO_KEYWORDS],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Alliance Square Properties | Premium Real Estate in Mysuru",
    description:
      "Explore premium residential plots, MUDA & DTCP approved layouts, apartments and investment opportunities in Mysuru.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_IN",
    type: "website",
    images: [{ url: absoluteUrl(DEFAULT_OG_IMAGE), width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alliance Square Properties | Premium Real Estate in Mysuru",
    description:
      "Explore premium residential plots, MUDA & DTCP approved layouts, apartments and investment opportunities in Mysuru.",
    images: [absoluteUrl(DEFAULT_OG_IMAGE)],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/favicon.jpg", type: "image/jpeg" }],
    shortcut: "/favicon.jpg",
    apple: "/favicon.jpg",
  },
};
