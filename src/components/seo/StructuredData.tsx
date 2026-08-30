import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildBlogSchemas,
  buildFAQSchema,
  buildHomePageSchemas,
  buildLayoutsPageSchemas,
  buildOrganizationSchema,
  buildProjectSchemas,
  buildTestimonialsPageSchemas,
  buildWebPageSchema,
  buildBreadcrumbSchema,
} from "@/lib/seo/schema";
import type { BlogPost, Project } from "@/types";
import { faqs } from "@/data/faqs";
import { company } from "@/data/company";

export function OrganizationSchema() {
  return <JsonLd data={buildOrganizationSchema()} />;
}

export function WebSiteSchema() {
  return <JsonLd data={buildHomePageSchemas()} />;
}

export function FAQSchema() {
  return <JsonLd data={buildFAQSchema(faqs.slice(0, 5))} />;
}

export function FAQsPageSchema() {
  return <JsonLd data={buildFAQSchema()} />;
}

export function ProjectSchema({ project }: { project: Project }) {
  return <JsonLd data={buildProjectSchemas(project)} />;
}

export function BlogSchema({ post }: { post: BlogPost }) {
  return <JsonLd data={buildBlogSchemas(post)} />;
}

export function LayoutsPageSchema() {
  return <JsonLd data={buildLayoutsPageSchemas()} />;
}

export function TestimonialsPageSchema() {
  return <JsonLd data={buildTestimonialsPageSchemas()} />;
}

export function AboutPageSchema() {
  return (
    <JsonLd
      data={[
        buildWebPageSchema({
          path: "/about",
          title: "About Alliance Square Properties",
          description: company.description,
          type: "AboutPage",
        }),
        buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about" },
        ]),
      ]}
    />
  );
}

export function ContactPageSchema() {
  return (
    <JsonLd
      data={[
        buildWebPageSchema({
          path: "/contact",
          title: "Contact Alliance Square Properties",
          description: "Contact Alliance Square Properties in Mysuru for site visits and enquiries.",
          type: "ContactPage",
        }),
        buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact Us", path: "/contact" },
        ]),
      ]}
    />
  );
}

export function InsightsIndexSchema() {
  return (
    <JsonLd
      data={[
        buildWebPageSchema({
          path: "/insights",
          title: "Real Estate Insights for Mysuru",
          description: "Guides and insights on property investment in Mysuru.",
          type: "CollectionPage",
        }),
        buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
        ]),
      ]}
    />
  );
}

export function FAQsIndexSchema() {
  return (
    <JsonLd
      data={[
        buildWebPageSchema({
          path: "/faqs",
          title: "FAQs | Alliance Square Properties",
          description: "Frequently asked questions about buying property in Mysuru.",
        }),
        buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "FAQs", path: "/faqs" },
        ]),
        buildFAQSchema(),
      ]}
    />
  );
}
