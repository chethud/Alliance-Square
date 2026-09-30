import { getPublished } from "@/lib/published";

export type SitemapEntry = {
  path: string;
  priority: number;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  lastModified?: Date;
};

const STATIC_PAGES: SitemapEntry[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/layouts", priority: 0.95, changeFrequency: "weekly" },
  { path: "/about", priority: 0.85, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.9, changeFrequency: "monthly" },
  { path: "/insights", priority: 0.8, changeFrequency: "weekly" },
  { path: "/faqs", priority: 0.75, changeFrequency: "monthly" },
  { path: "/testimonials", priority: 0.7, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  { path: "/disclaimer", priority: 0.3, changeFrequency: "yearly" },
];

export async function getAllIndexableUrls(): Promise<SitemapEntry[]> {
  const { projects, insights } = await getPublished();
  const projectPages: SitemapEntry[] = projects.map((project) => ({
    path: `/projects/${project.slug}`,
    priority: project.featured ? 0.9 : 0.85,
    changeFrequency: "weekly" as const,
  }));

  const insightPages: SitemapEntry[] = insights.map((post) => ({
    path: `/insights/${post.slug}`,
    priority: 0.65,
    changeFrequency: "monthly" as const,
    lastModified: new Date(post.date),
  }));

  return [...STATIC_PAGES, ...projectPages, ...insightPages];
}

export async function getIndexablePaths(): Promise<string[]> {
  return (await getAllIndexableUrls()).map((entry) => entry.path);
}
