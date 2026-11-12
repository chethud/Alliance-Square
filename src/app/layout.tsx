import type { Metadata } from "next";
import Script from "next/script";

import { OrganizationSchema } from "@/components/seo/StructuredData";
import { ConditionalChrome } from "@/components/layout/ConditionalChrome";
import { CmsProvider } from "@/components/cms/CmsProvider";
import { rootMetadata } from "@/lib/seo/metadata";
import { getPublished } from "@/lib/published";

import "./globals.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = rootMetadata;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const published = await getPublished();
  return (
    <html lang="en-IN">
      <body>
        <Script
          id="youtube-iframe-api"
          src="https://www.youtube.com/iframe_api"
          strategy="afterInteractive"
        />
        <CmsProvider value={published}>
          <OrganizationSchema />
          <ConditionalChrome>{children}</ConditionalChrome>
        </CmsProvider>
      </body>
    </html>
  );
}