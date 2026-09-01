import type { Metadata } from "next";
import Script from "next/script";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { OrganizationSchema } from "@/components/seo/StructuredData";
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
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}