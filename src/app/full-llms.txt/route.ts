import { company, contact, stats } from "@/data/company";
import { projects } from "@/data/projects";
import { blogPosts } from "@/data/blogs";
import { faqs } from "@/data/faqs";
import { testimonials } from "@/data/testimonials";
import { absoluteUrl, SITE_NAME, SITE_URL, SOCIAL_PROFILES } from "@/lib/seo/config";
import { getAllIndexableUrls } from "@/lib/seo/urls";
import { generateSchemaInventory } from "@/lib/seo/schema";

export async function GET() {
  const schemaInventory = generateSchemaInventory();

  const lines = [
    `# ${SITE_NAME} — Full Machine-Readable Knowledge Index`,
    `# Canonical: ${SITE_URL}`,
    `# Last updated: 2026-08-30`,
    "",
    "## Organization",
    `entity: Organization`,
    `name: ${company.name}`,
    `alternateName: ${company.shortName}`,
    `url: ${SITE_URL}`,
    `description: ${company.intro}`,
    `phone: ${company.phone}`,
    `email: ${company.email}`,
    `yearsExperience: ${stats.years}+`,
    `layouts: ${stats.layouts}+`,
    `customers: ${stats.customers}+`,
    `corporateOffice: ${contact.corporateOffice.address.join(", ")}`,
    `salesOffice: ${contact.salesOffice.address.join(", ")}`,
    `hours: ${contact.salesOffice.hours}`,
    `sameAs: ${SOCIAL_PROFILES.join(", ")}`,
    "",
    "## Service area",
    `- Mysuru (Mysore), Karnataka, India`,
    `- Residential plots, layouts, apartments, villas, land investment`,
    "",
    "## All indexable URLs",
    ...getAllIndexableUrls().map(
      (entry) =>
        `- url: ${absoluteUrl(entry.path)} | priority: ${entry.priority} | changefreq: ${entry.changeFrequency}`
    ),
    "",
    "## Projects",
    ...projects.flatMap((p) => [
      `### ${p.name}`,
      `type: RealEstateListing`,
      `url: ${absoluteUrl(`/projects/${p.slug}`)}`,
      `location: ${p.location.area}, ${p.location.city}`,
      `price: ${p.priceLabel}`,
      `approvals: ${p.approvals.join(", ")}`,
      `plotSizes: ${p.plotSizes.join(", ")}`,
      `description: ${p.tagline}`,
      ...(p.nearbyLandmarks?.map((l) => `nearby: ${l}`) ?? []),
      "",
    ]),
    "",
    "## Articles",
    ...blogPosts.flatMap((b) => [
      `### ${b.title}`,
      `type: BlogPosting`,
      `url: ${absoluteUrl(`/insights/${b.slug}`)}`,
      `category: ${b.category}`,
      `date: ${b.date}`,
      `summary: ${b.excerpt}`,
      "",
    ]),
    "",
    "## FAQs",
    ...faqs.map((f) => [`Q: ${f.question}`, `A: ${f.answer}`, ""]),
    "",
    "## Testimonials",
    ...testimonials.map(
      (t) => `- ${t.name} (${t.location}): "${t.quote.slice(0, 120)}..."`
    ),
    "",
    "## Schema inventory",
    `totalInstances: ${schemaInventory.length}`,
    ...schemaInventory.map((schema, i) => {
      const type = Array.isArray(schema["@type"]) ? schema["@type"].join("+") : schema["@type"];
      const id = schema["@id"] ?? schema.url ?? schema.name ?? `instance-${i + 1}`;
      return `- [${i + 1}] ${type} — ${id}`;
    }),
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
