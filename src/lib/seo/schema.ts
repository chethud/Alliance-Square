import { blogPosts } from "@/data/blogs";
import { company, contact } from "@/data/company";
import { faqs } from "@/data/faqs";
import { projects } from "@/data/projects";
import { testimonials } from "@/data/testimonials";
import type { BlogPost, Project, Testimonial } from "@/types";
import { absoluteUrl, SITE_NAME, SITE_URL, SOCIAL_PROFILES } from "./config";

export type SchemaObject = Record<string, unknown>;

export type BreadcrumbItem = {
  name: string;
  path: string;
};

function orgId() {
  return `${SITE_URL}/#organization`;
}

function websiteId() {
  return `${SITE_URL}/#website`;
}

export function buildOrganizationSchema(): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "RealEstateAgent", "LocalBusiness"],
    "@id": orgId(),
    name: company.name,
    alternateName: company.shortName,
    url: SITE_URL,
    logo: absoluteUrl("/images/logo/alliance-square.png"),
    image: absoluteUrl("/images/logo/alliance-square.png"),
    description: company.intro,
    telephone: company.phone,
    email: company.email,
    address: [
      {
        "@type": "PostalAddress",
        name: "Corporate Office",
        streetAddress: contact.corporateOffice.address.slice(0, 2).join(", "),
        addressLocality: "Mysuru",
        addressRegion: "Karnataka",
        postalCode: "570009",
        addressCountry: "IN",
      },
      {
        "@type": "PostalAddress",
        name: "Sales Office",
        streetAddress: contact.salesOffice.address.slice(0, 2).join(", "),
        addressLocality: "Mysuru",
        addressRegion: "Karnataka",
        postalCode: "570009",
        addressCountry: "IN",
      },
    ],
    areaServed: [
      { "@type": "City", name: "Mysuru" },
      { "@type": "City", name: "Mysore" },
    ],
    sameAs: [...SOCIAL_PROFILES],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: company.phone,
        contactType: "sales",
        areaServed: "IN",
        availableLanguage: ["English", "Kannada"],
      },
      {
        "@type": "ContactPoint",
        telephone: `+91${company.mobile[1]}`,
        contactType: "customer service",
        areaServed: "IN",
      },
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "10:00",
      closes: "19:00",
    },
  };
}

export function buildWebSiteSchema(): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId(),
    url: SITE_URL,
    name: SITE_NAME,
    description: company.tagline,
    publisher: { "@id": orgId() },
    inLanguage: "en-IN",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/layouts?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildWebPageSchema({
  path,
  title,
  description,
  type = "WebPage",
}: {
  path: string;
  title: string;
  description: string;
  type?: string;
}): SchemaObject {
  const url = absoluteUrl(path);
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: { "@id": websiteId() },
    about: { "@id": orgId() },
    inLanguage: "en-IN",
  };
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildFAQSchema(questions = faqs): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildProjectSchemas(project: Project): SchemaObject[] {
  const url = absoluteUrl(`/projects/${project.slug}`);
  const schemas: SchemaObject[] = [];

  schemas.push({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: `${project.name} | ${SITE_NAME}`,
    description: project.description,
    isPartOf: { "@id": websiteId() },
    about: { "@id": `${url}#listing` },
    inLanguage: "en-IN",
  });

  schemas.push({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Layouts", item: absoluteUrl("/layouts") },
      { "@type": "ListItem", position: 3, name: project.name, item: url },
    ],
  });

  const listing: SchemaObject = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "@id": `${url}#listing`,
    name: project.name,
    description: project.description,
    url,
    datePosted: "2024-01-01",
    image: project.gallery.map((img) => absoluteUrl(img)),
    offers: {
      "@type": "Offer",
      price: project.pricePerSqft,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url,
      seller: { "@id": orgId() },
    },
    provider: { "@id": orgId() },
  };

  if (project.location.coordinates) {
    listing.contentLocation = {
      "@type": "Place",
      name: `${project.name}, ${project.location.area}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: project.location.area,
        addressLocality: project.location.city,
        addressRegion: "Karnataka",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: project.location.coordinates.lat,
        longitude: project.location.coordinates.lng,
      },
    };
  }

  if (project.amenities.length > 0) {
    listing.amenityFeature = project.amenities.map((amenity) => ({
      "@type": "LocationFeatureSpecification",
      name: amenity,
      value: true,
    }));
  }

  schemas.push(listing);

  project.gallery.forEach((image, index) => {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "ImageObject",
      "@id": `${url}#image-${index + 1}`,
      contentUrl: absoluteUrl(image),
      name: `${project.name} - Image ${index + 1}`,
      description: `${project.name} residential layout in ${project.location.area}, Mysuru`,
      representativeOfPage: index === 0,
    });
  });

  return schemas;
}

export function buildBlogSchemas(post: BlogPost): SchemaObject[] {
  const url = absoluteUrl(`/insights/${post.slug}`);

  return [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      headline: post.title,
      description: post.excerpt,
      image: absoluteUrl(post.image),
      datePublished: post.date,
      dateModified: post.date,
      author: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
      },
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/images/logo/alliance-square.png"),
        },
      },
      mainEntityOfPage: { "@id": `${url}#webpage` },
      articleSection: post.category,
      inLanguage: "en-IN",
      url,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: post.title,
      description: post.excerpt,
      isPartOf: { "@id": websiteId() },
      inLanguage: "en-IN",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Insights", item: absoluteUrl("/insights") },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ImageObject",
      "@id": `${url}#image`,
      contentUrl: absoluteUrl(post.image),
      name: post.title,
      description: post.excerpt,
    },
  ];
}

export function buildReviewSchema(testimonial: Testimonial): SchemaObject {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    author: {
      "@type": "Person",
      name: testimonial.name,
    },
    reviewBody: testimonial.quote,
    itemReviewed: {
      "@type": "RealEstateAgent",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function buildTestimonialsPageSchemas(): SchemaObject[] {
  return [
    buildWebPageSchema({
      path: "/testimonials",
      title: "Customer Testimonials | Alliance Square Properties",
      description: "Customer testimonials and reviews for Alliance Square Properties, Mysuru.",
    }),
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Testimonials", path: "/testimonials" },
    ]),
    ...testimonials.map((t) => buildReviewSchema(t)),
  ];
}

export function buildLayoutsPageSchemas(): SchemaObject[] {
  return [
    buildWebPageSchema({
      path: "/layouts",
      title: "Residential Layouts & Plots for Sale in Mysuru | Alliance Square",
      description:
        "Browse MUDA, MDA and DTCP approved residential plots and layouts for sale in Mysuru.",
      type: "CollectionPage",
    }),
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Layouts", path: "/layouts" },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Alliance Square Residential Layouts in Mysuru",
      numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/projects/${project.slug}`),
        name: project.name,
      })),
    },
  ];
}

export function buildHomePageSchemas(): SchemaObject[] {
  return [
    buildWebSiteSchema(),
    buildWebPageSchema({
      path: "/",
      title: "Alliance Square Properties | Premium Real Estate in Mysuru",
      description: company.tagline,
    }),
    buildFAQSchema(faqs.slice(0, 5)),
    {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: "Alliance Square Properties - Mysuru Real Estate",
      description: company.intro,
      thumbnailUrl: absoluteUrl("/images/sliders/slider-01.jpg"),
      uploadDate: "2024-01-01",
      embedUrl: "https://www.youtube.com/embed/KWV_2LWONlw",
      publisher: { "@id": orgId() },
    },
  ];
}

/** Generates the full schema inventory for validation and LLM indexing */
export function generateSchemaInventory(): SchemaObject[] {
  const inventory: SchemaObject[] = [buildOrganizationSchema()];

  inventory.push(...buildHomePageSchemas());

  inventory.push(
    buildWebPageSchema({
      path: "/about",
      title: "About Alliance Square Properties",
      description: company.description,
      type: "AboutPage",
    }),
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "About Us", path: "/about" },
    ])
  );

  inventory.push(
    buildWebPageSchema({
      path: "/contact",
      title: "Contact Alliance Square Properties",
      description: "Contact Alliance Square Properties in Mysuru for site visits and enquiries.",
      type: "ContactPage",
    }),
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Contact Us", path: "/contact" },
    ])
  );

  inventory.push(...buildLayoutsPageSchemas());

  inventory.push(
    buildWebPageSchema({
      path: "/insights",
      title: "Real Estate Insights for Mysuru",
      description: "Guides and insights on property investment in Mysuru.",
      type: "CollectionPage",
    }),
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Insights", path: "/insights" },
    ])
  );

  inventory.push(
    buildWebPageSchema({
      path: "/faqs",
      title: "FAQs | Alliance Square Properties",
      description: "Frequently asked questions about buying property in Mysuru.",
    }),
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "FAQs", path: "/faqs" },
    ]),
    buildFAQSchema()
  );

  inventory.push(...buildTestimonialsPageSchemas());

  for (const project of projects) {
    inventory.push(...buildProjectSchemas(project));
  }

  for (const post of blogPosts) {
    inventory.push(...buildBlogSchemas(post));
  }

  return inventory;
}

export function getSchemaInstanceCount(): number {
  return generateSchemaInventory().length;
}
