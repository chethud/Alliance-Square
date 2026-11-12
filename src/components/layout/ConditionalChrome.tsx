"use client";

import { usePathname } from "next/navigation";
import { SiteChrome } from "@/components/layout/SiteChrome";

export function ConditionalChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bare = pathname === "/verify" || pathname.startsWith("/verify/");

  if (bare) {
    return <main>{children}</main>;
  }

  return <SiteChrome>{children}</SiteChrome>;
}
