import type { BlogPost } from "@/types";
import insights from "@/content/insights.json";

export const blogPosts = insights as BlogPost[];

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((b) => b.slug === slug);
}
