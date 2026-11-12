import { company, contact } from "@/data/company";
import { faqs } from "@/data/faqs";
import { absoluteUrl, SITE_NAME, SITE_URL, SOCIAL_PROFILES } from "@/lib/seo/config";
import { getIndexablePaths } from "@/lib/seo/urls";
import { getSchemaInstanceCount } from "@/lib/seo/schema";
import { getPublished } from "@/lib/published";

export async function GET() {
  const { projects, insights } = await getPublished();
  const paths = await getIndexablePaths();
  const lines = [
    `# ${SITE_NAME}`,
    `# Canonical site: ${SITE_URL}`,
    "",
    "## About",
    `- ${company.intro}`,
    `- Operates in: Mysuru (Mysore), Karnataka, India`,
    `- Phone: ${company.phone}`,
    `- Email: ${company.email}`,
    `- Sales office: ${contact.salesOffice.address.join(" ")}`,
    "",
    "## Primary pages",
    `- Homepage: ${SITE_URL}/`,
    `- Layouts / plots: ${absoluteUrl("/layouts")}`,
    `- About: ${absoluteUrl("/about")}`,
    `- Contact: ${absoluteUrl("/contact")}`,
    `- Verify advisor: ${absoluteUrl("/verify")}`,
    `- Insights / blog: ${absoluteUrl("/insights")}`,
    `- FAQs: ${absoluteUrl("/faqs")}`,
    `- Testimonials: ${absoluteUrl("/testimonials")}`,
    "",
    "## Active projects",
    ...projects.map(
      (p) =>
        `- ${p.name} (${p.priceLabel}) — ${absoluteUrl(`/projects/${p.slug}`)} — ${p.location.area}, ${p.location.city}`
    ),
    "",
    "## Insights",
    ...insights.map((b) => `- ${b.title} — ${absoluteUrl(`/insights/${b.slug}`)}`),
    "",
    "## FAQs",
    ...faqs.slice(0, 5).map((f) => `- Q: ${f.question}`),
    "",
    "## Social profiles",
    ...SOCIAL_PROFILES.map((url) => `- ${url}`),
    "",
    "## Indexable URLs",
    ...paths.map((path) => `- ${absoluteUrl(path)}`),
    "",
    `## Structured data instances: ${getSchemaInstanceCount()}`,
    "",
    "For the complete machine-readable index, see /full-llms.txt",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
