import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo/config";
import { getAllIndexableUrls } from "@/lib/seo/urls";

export default function sitemap(): MetadataRoute.Sitemap {
  return getAllIndexableUrls().map((entry) => ({
    url: absoluteUrl(entry.path),
    lastModified: entry.lastModified ?? new Date("2026-08-30"),
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
