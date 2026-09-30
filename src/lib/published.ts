import { cache } from "react";
import { blogPosts as fileInsights } from "@/data/blogs";
import { heroVideoId as fileHeroVideoId, stats as fileStats } from "@/data/company";
import { cmsProjects as fileProjects, createProjectCatalog, type ProjectCatalog } from "@/data/projects";
import { testimonials as fileTestimonials } from "@/data/testimonials";
import { homepageFromCms, insightFromCms, projectFromCms, testimonialFromCms } from "@/lib/cms-map";
import { cmsSiteId, createCmsClient } from "@/lib/supabase";
import type { BlogPost, CmsProject, CompanyStats, Testimonial } from "@/types";

export type PublishedContent = ProjectCatalog & {
  insights: BlogPost[];
  testimonials: Testimonial[];
  heroVideoId: string;
  stats: CompanyStats;
};

type CmsRow = { id: string; content: unknown };

async function loadRemote(): Promise<{
  projects: CmsProject[];
  insights: BlogPost[];
  testimonials: Testimonial[];
  homepage: ReturnType<typeof homepageFromCms>;
} | null> {
  const supabase = createCmsClient();
  if (!supabase) return null;
  const siteId = cmsSiteId();

  const [projects, insights, testimonials, settings] = await Promise.all([
    supabase.from("projects").select("id, position, content").eq("site_id", siteId).order("position"),
    supabase.from("insights").select("id, position, content").eq("site_id", siteId).order("position"),
    supabase.from("testimonials").select("id, position, content").eq("site_id", siteId).order("position"),
    supabase.from("site_settings").select("content").eq("site_id", siteId).maybeSingle(),
  ]);

  const failed = [projects.error, insights.error, testimonials.error, settings.error].find(Boolean);
  if (failed) {
    console.error("Alliance Square CMS:", failed.message);
    return null;
  }

  return {
    projects: ((projects.data ?? []) as CmsRow[])
      .map((row) => projectFromCms(row.content))
      .filter((item): item is CmsProject => Boolean(item)),
    insights: ((insights.data ?? []) as CmsRow[])
      .map((row) => insightFromCms(row.content))
      .filter((item): item is BlogPost => Boolean(item)),
    testimonials: ((testimonials.data ?? []) as CmsRow[])
      .map((row) => testimonialFromCms(row.content))
      .filter((item): item is Testimonial => Boolean(item)),
    homepage: settings.data ? homepageFromCms(settings.data.content) : null,
  };
}

export const getPublished = cache(async (): Promise<PublishedContent> => {
  const remote = await loadRemote();
  const catalog = createProjectCatalog(remote?.projects.length ? remote.projects : fileProjects);
  const homepage = remote?.homepage;
  return {
    ...catalog,
    insights: remote?.insights.length ? remote.insights : fileInsights,
    testimonials: remote?.testimonials.length ? remote.testimonials : fileTestimonials,
    heroVideoId: homepage?.heroVideoId || fileHeroVideoId,
    stats: homepage?.stats ?? fileStats,
  };
});
