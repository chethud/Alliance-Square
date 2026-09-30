"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { PublishedContent } from "@/lib/published";

const CmsContext = createContext<PublishedContent | null>(null);

export function CmsProvider({ value, children }: { value: PublishedContent; children: ReactNode }) {
  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>;
}

export function useCms() {
  const value = useContext(CmsContext);
  if (!value) {
    throw new Error("useCms must be used inside CmsProvider");
  }
  return value;
}
