import type { BlogPost, CmsProject, CompanyStats, Testimonial } from "@/types";

export type SiteContent = {
  heroVideoId: string;
  stats: CompanyStats;
};

export type CmsContent = {
  insights: BlogPost[];
  testimonials: Testimonial[];
  site: SiteContent;
  layouts: CmsProject[];
  /** Slugs that already exist on the public site (seed catalog). */
  catalogSlugs: string[];
};
