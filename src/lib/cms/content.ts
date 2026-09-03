import { readJson } from "@/lib/cms/fs";
import type { BlogPost, CmsProject, Testimonial } from "@/types";
import type { CmsContent, SiteContent } from "@/lib/cms/types";
import { catalogProjects, mergeCmsLayouts } from "@/data/projects";

export type { CmsContent, SiteContent };

const fallbackSite: SiteContent = {
  heroVideoId: "KWV_2LWONlw",
  stats: { years: 20, layouts: 15, customers: 4000, customerFocused: "100%" },
};

export async function loadCmsContent(): Promise<CmsContent> {
  const [insights, testimonials, site, layoutOverrides] = await Promise.all([
    readJson<BlogPost[]>("insights.json"),
    readJson<Testimonial[]>("testimonials.json"),
    readJson<SiteContent>("site.json"),
    readJson<CmsProject[]>("cms-projects.json"),
  ]);

  return {
    insights: insights ?? [],
    testimonials: testimonials ?? [],
    site: site?.stats ? site : fallbackSite,
    layouts: mergeCmsLayouts(layoutOverrides ?? []),
    catalogSlugs: catalogProjects.map((project) => project.slug),
  };
}
