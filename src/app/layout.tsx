import type { Metadata } from "next";
import Script from "next/script";

import { OrganizationSchema } from "@/components/seo/StructuredData";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { rootMetadata } from "@/lib/seo/metadata";

import "./globals.css";

export const metadata: Metadata = rootMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN">
      <body>
        <Script
          id="youtube-iframe-api"
          src="https://www.youtube.com/iframe_api"
          strategy="afterInteractive"
        />
        <OrganizationSchema />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}