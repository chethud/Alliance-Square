import type { Project, MapMarker, CmsProject } from "@/types";
import { projectImage } from "./images";
import cmsProjectsJson from "@/content/cms-projects.json";

const projectsSeed: Project[] = [
  {
    id: "uk-square",
    slug: "uk-square",
    name: "UK Square",
    tagline: "Premium Residential Plots at a Strategic Mysuru Growth Corridor",
    description:
      "UK Square is a premium gated plotted community located right on the Mysuru–Kushalnagar Highway Entry/Exit Junction at Yelawala, off Hunsur Road, Mysuru. Designed for modern families and smart investors, the project offers excellent connectivity, peaceful surroundings, and strong future appreciation in one of Mysuru's fastest-growing corridors.",
    location: {
      area: "Yalachahalli, Hobli, Yelawala, Karnataka 571130",
      city: "Mysuru",
      coordinates: { lat: 12.3858889, lng: 76.522086 },
    },
    pricePerSqft: 3300,
    priceLabel: "₹3,300 / Sq.ft onwards",
    plotSizes: ["30×40", "30×50", "30×Odd"],
    approvals: ["DTCP"],
    filters: ["premium", "dtcp", "investment"],
    highlights: [
      "DTCP Approved Layout",
      "Gated Community",
      "Excellent Connectivity",
      "Investment Potential",
    ],
    amenities: [
      "Wide Concrete Roads",
      "Underground Cabling",
      "Decorative Street Lights",
      "Landscaped Park & Open Spaces",
    ],
    facilities: [
      "Grand Entrance Arch",
      "Gated Community",
      "Children's Play Area",
      "Landscaped Parks",
      "Walking & Jogging Track",
      "Street Lighting",
      "Underground Drainage",
      "Rainwater Drainage System",
      "Security Provision",
      "Wide Internal Roads",
    ],
    featured: true,
    spotlight: true,
    heroImage: projectImage("uk-square"),
    gallery: [
      projectImage("uk-square"),
      "/images/projects/uk-square-2.jpg",
      "/images/projects/uk-square-3.jpg",
      "/images/projects/uk-square-4.jpg",
      "/images/projects/uk-square-5.jpg",
      "/images/projects/uk-square-6.jpg",
    ],
    listingDescription:
      "UK Square is a premium gated plotted community at the Mysuru–Kushalnagar Highway Exit Junction. With excellent connectivity, peaceful surroundings, and modern infrastructure, it offers the perfect blend of comfortable living and smart investment in one of Mysuru's fastest-growing corridors.",
  },
  {
    id: "cnm-apex-city",
    slug: "cnm-apex-city",
    name: "CNM Apex City",
    tagline: "Premium Residential Layout on Srirampura Ring Road",
    description:
      "CNM Apex City is a premium residential layout strategically located on Srirampura Ring Road, offering the perfect mix of connectivity, convenience, and future growth in Mysuru. Designed with modern infrastructure and a focus on comfortable living, it is an ideal choice for both homebuyers and smart investors.",
    location: {
      area: "7J2G+JFG, Ring Rd, Srirampura, Sriramapura, Karnataka 570008",
      city: "Mysuru",
      coordinates: { lat: 12.2515591, lng: 76.6262138 },
    },
    pricePerSqft: 5499,
    priceLabel: "₹5,499 / Sq.ft onwards",
    plotSizes: ["30×40", "30×Odd"],
    approvals: ["MDA", "RERA"],
    filters: ["premium", "muda", "investment"],
    highlights: [
      "MUDA Approved & RERA Registered",
      "Direct Ring Road Access",
      "Bank Loans Available",
      "Kabini Water Supply",
    ],
    amenities: [
      "Black Top Roads",
      "30 Ft Wide Access Road",
      "Street Lights with Timers",
      "Parks & Open Spaces",
    ],
    facilities: [
      "Kabini Water Supply",
      "Black Top Roads",
      "30 Ft Wide Access Road",
      "Direct Entry & Exit to Ring Road",
      "Street Lights with Timers",
      "Avenue Trees",
      "Parks & Open Spaces",
    ],
    nearbyLandmarks: [
      "Mysore Public School – 2 mins",
      "Narayana e-Techno School – 2 mins",
      "Kamakshi Hospital, JP Nagar – 5 mins",
      "Ashokapuram Railway Station – 7 mins",
      "Mysore Airport – 9 mins",
    ],
    featured: true,
    heroImage: projectImage("cnm-apex-city"),
    gallery: [
      projectImage("cnm-apex-city"),
      "/images/projects/cnm-apex-city-2.jpeg",
      "/images/projects/cnm-apex-city-3.jpeg",
      "/images/projects/cnm-apex-city-4.jpeg",
      "/images/projects/cnm-apex-city-5.jpeg",
    ],
    listingDescription:
      "CNM Apex City is a premium residential layout on Srirampura Ring Road, Mysuru, offering excellent connectivity and future growth. With essential amenities and a strategic location near key landmarks, it's ideal for both living and smart investment.",
    youtubeShortId: "4mZ_jTHoI1Q",
  },
  {
    id: "sridevi-lake-view",
    slug: "sridevi-lake-view",
    name: "Sridevi Lake View",
    tagline: "Scenic Residential Plots with Natural Surroundings",
    description:
      "Sridevi Lake View offers residential plots in a serene setting with natural surroundings, ideal for those seeking peaceful living with strong investment potential in Mysuru.",
    location: {
      area: "Off T Narasipura Road, near Blue Ocean Convention Hall",
      city: "Mysuru",
      coordinates: { lat: 12.2634911, lng: 76.7679361 },
    },
    pricePerSqft: 2400,
    priceLabel: "₹2,400 / Sq.ft onwards",
    plotSizes: ["30×40", "30×50"],
    approvals: ["DTCP"],
    filters: ["dtcp", "investment"],
    highlights: [
      "Scenic Location",
      "Natural Surroundings",
      "Affordable Entry Point",
      "Investment Opportunity",
    ],
    amenities: [
      "Wide Roads",
      "Street Lighting",
      "Water & Electricity Provision",
      "Green Open Spaces",
    ],
    facilities: [
      "Wide Internal Roads",
      "Street Lighting",
      "Underground Drainage",
      "Landscaped Areas",
    ],
    featured: true,
    heroImage: "/images/projects/sridevi-lake-view.png",
    gallery: [
      "/images/projects/sridevi-lake-view.png",
      "/images/projects/sridevi-lake-view-2.png",
      "/images/projects/sridevi-lake-view-3.png",
      "/images/projects/sridevi-lake-view-4.png",
      "/images/projects/sridevi-lake-view-5.png",
      "/images/projects/sridevi-lake-view-6.png",
    ],
    listingDescription:
      "Sridevi Lake View is a premium residential layout with DTCP approval. It is located off T Narasipura Road and offers all major facilities.",
    youtubeShortId: "_PGeDN80qCg",
  },
  {
    id: "jeevan-vihar-phase-2",
    slug: "jeevan-vihar-phase-2",
    name: "Jeevan Vihar Phase 2",
    tagline: "Premium Phase 2 Development in Established Corridor",
    description:
      "Jeevan Vihar Phase 2 extends the trusted Jeevan Vihar legacy with premium residential plots, modern infrastructure, and a customer-focused buying experience.",
    location: {
      area: "Bannur–Kanakapura Highway, Harohalli",
      city: "Mysuru",
      coordinates: { lat: 12.3182661, lng: 76.7757179 },
    },
    pricePerSqft: 6499,
    priceLabel: "₹6,499 / Sq.ft onwards",
    plotSizes: ["30×40", "30×50"],
    approvals: ["MUDA"],
    filters: ["premium", "muda"],
    highlights: [
      "Premium Location",
      "Established Community",
      "Modern Infrastructure",
      "Strong Resale Value",
    ],
    amenities: [
      "Gated Community",
      "Wide Roads",
      "Underground Drainage",
      "Landscaped Parks",
    ],
    facilities: [
      "Gated Entry",
      "Children's Play Area",
      "Street Lighting",
      "Underground Drainage",
      "Avenue Plantation",
    ],
    featured: true,
    heroImage: projectImage("jeevan-vihar-phase-2"),
    gallery: [projectImage("jeevan-vihar-phase-2")],
    listingDescription:
      "Premium Residential Layout Right on Bannur–Kanakapura Highway, Mysuru.",
  },
  {
    id: "alliance-serene-phase-2",
    slug: "alliance-serene-phase-2",
    name: "Alliance Serene Phase 2",
    tagline: "Thoughtfully Planned Residential Community",
    description:
      "Alliance Serene Phase 2 offers thoughtfully planned residential plots in a well-developed layout with modern amenities and excellent connectivity in Mysuru.",
    location: {
      area: "Vajamangala, Bannur Road",
      city: "Mysuru",
      coordinates: { lat: 12.3074408, lng: 76.7458599 },
    },
    pricePerSqft: 3500,
    priceLabel: "₹3,500 / Sq.ft onwards",
    plotSizes: ["30×40", "30×50"],
    approvals: ["DTCP"],
    filters: ["dtcp", "ready"],
    highlights: [
      "Well-Developed Layout",
      "Modern Amenities",
      "Peaceful Surroundings",
      "Smart Investment",
    ],
    amenities: [
      "Wide Roads",
      "Underground Drainage",
      "Street Lighting",
      "Green Spaces",
    ],
    facilities: [
      "Gated Community",
      "Landscaped Parks",
      "Street Lighting",
      "Underground Drainage",
    ],
    featured: true,
    heroImage: projectImage("alliance-serene-phase-2"),
    gallery: [
      "/images/projects/alliance-serene-phase-2-4.jpg",
      "/images/projects/alliance-serene-phase-2-1.jpg",
      "/images/projects/alliance-serene-phase-2-2.jpg",
      "/images/projects/alliance-serene-phase-2-3.jpg",
    ],
    listingDescription:
      "Our premium residential layout in Mysore, located just off Bannur road, is one of the best locations in Mysuru to build your dream home. It is just 2 mins away from the ring road with premium educational institutions, hospitals, resorts, hotels & convention centers located very close by.",
  },
  {
    id: "adhya-enclave",
    slug: "adhya-enclave",
    name: "Adhya Enclave",
    tagline: "MUDA-Approved Gated Community in Nanjangud",
    description:
      "Adhya Enclave is a fully developed premium residential layout in Nanjangud, just 20 minutes from Mysore. Spanning 3 acres on Chamalapura Main Road, this MUDA-approved gated community offers spacious plots with well-planned infrastructure, wide roads, lush green spaces, and top-tier amenities.",
    location: {
      area: "Chamalapura Main Road, Nanjangud",
      city: "Mysuru Region",
      coordinates: { lat: 12.1301588, lng: 76.6754512 },
    },
    pricePerSqft: 3400,
    priceLabel: "₹3,400 / Sq.ft onwards",
    plotSizes: ["30×40", "30×50", "30×Odd"],
    approvals: ["MUDA"],
    filters: ["premium", "muda", "ready"],
    highlights: [
      "MUDA-Approved Gated Community",
      "3 Acres",
      "Near RV University",
      "Mysore–Nanjangud Highway Access",
    ],
    amenities: [
      "Wide Asphalted Roads",
      "24/7 Water Supply",
      "Electricity with Street Lighting",
      "Landscaped Parks",
    ],
    facilities: [
      "MUDA-approved gated community",
      "Wide asphalted roads for smooth connectivity",
      "Underground drainage system",
      "24/7 water supply with overhead tank",
      "Electricity with street lighting",
      "Landscaped parks and green spaces",
      "Children's play area",
      "Stormwater drains",
      "Secure compound wall with gated entry",
    ],
    nearbyLandmarks: [
      "Srikanteshwara Temple – 5 minutes",
      "RV University (Nanjangud Campus) – 4 minutes",
      "Mysore–Ooty Road (SH-33) – Adjacent",
      "Nanjangud Town Railway Station – 3 minutes",
    ],
    featured: true,
    heroImage: projectImage("adhya-enclave"),
    gallery: [
      projectImage("adhya-enclave"),
      "/images/projects/adhya-enclave-2.jpg",
      "/images/projects/adhya-enclave-4.jpg",
      "/images/projects/adhya-enclave-5.jpg",
      "/images/projects/adhya-enclave-6.jpg",
    ],
    listingDescription:
      "Adhya Enclave is a fully developed premium residential layout in Nanjangud, just 20 minutes from Mysore. Spanning 3 acres on Chamalapura Main Road, this MUDA-approved gated community offers plots and row houses with modern amenities, green spaces, and excellent connectivity.",
  },
  {
    id: "dr-daya-nagar",
    slug: "dr-daya-nagar",
    name: "Dr. Daya Nagar",
    tagline: "MUDA Approved Layout, Off Bogadi Road, Mysuru",
    description:
      "Dr. Daya Nagar is a MUDA approved residential layout off Bogadi Road, Mysuru, offering legally sanctioned plots with planned infrastructure and excellent connectivity.",
    location: {
      area: "Off Bogadi Road, Gaddige Road",
      city: "Mysuru",
      coordinates: { lat: 12.304697, lng: 76.5666079 },
    },
    pricePerSqft: 3500,
    priceLabel: "₹3,500 / Sq.ft onwards",
    plotSizes: ["30×40", "30×50"],
    approvals: ["MUDA"],
    filters: ["muda", "investment"],
    highlights: [
      "MUDA Approved Layout",
      "Off Bogadi Road",
      "Planned Infrastructure",
      "Smart Investment",
    ],
    amenities: [
      "Wide Roads",
      "Street Lighting",
      "Water Provision",
      "Green Spaces",
    ],
    facilities: [
      "Wide Internal Roads",
      "Underground Drainage",
      "Street Lighting",
      "Landscaped Areas",
    ],
    featured: true,
    heroImage: projectImage("dr-daya-nagar"),
    gallery: [projectImage("dr-daya-nagar")],
    listingDescription:
      "A completely developed MUDA Approved Layout, Off Bogadi Road, Mysuru.",
  },
  {
    id: "jeevan-vihar",
    slug: "jeevan-vihar",
    name: "Jeevan Vihar",
    tagline: "Trusted Residential Layout with Hassle-Free Process",
    description:
      "Jeevan Vihar is an established residential layout known for transparent processes, good locality, and excellent customer support through purchase and registration.",
    location: {
      area: "Mysuru",
      city: "Mysuru",
      coordinates: { lat: 12.3266725, lng: 76.53125 },
    },
    pricePerSqft: 2500,
    priceLabel: "₹2,500 / Sq.ft onwards",
    plotSizes: ["30×40", "30×50"],
    approvals: ["MUDA"],
    filters: ["muda", "investment"],
    highlights: [
      "Established Layout",
      "Good Locality",
      "Transparent Process",
      "Customer Support",
    ],
    amenities: [
      "Wide Roads",
      "Street Lighting",
      "Underground Drainage",
      "Green Spaces",
    ],
    facilities: [
      "Gated Entry",
      "Street Lighting",
      "Underground Drainage",
      "Landscaped Parks",
    ],
    featured: true,
    heroImage: projectImage("jeevan-vihar"),
    gallery: [
      "/images/projects/jeevan-vihar-2.jpg",
      "/images/projects/jeevan-vihar-3.jpg",
      "/images/projects/jeevan-vihar-4.jpg",
      "/images/projects/jeevan-vihar-5.jpg",
      "/images/projects/jeevan-vihar-6.jpg",
      "/images/projects/jeevan-vihar-7.jpg",
    ],
    listingDescription:
      "Jeevan Vihar is a MUDA-approved layout featuring sites with various dimensions, including 30×40 and 30×50, available for immediate registration.",
  },
  {
    id: "dhatri-square",
    slug: "dhatri-square",
    name: "DHATRI SQUARE",
    tagline: "Fully Developed DTCP Approved Layout Off Hunsur Road",
    description:
      "Dhatri Square is a top residential layout in Mysuru, located off Hunsur Road (behind RMP). The layout is adjacent to the Mysore-Coorg Highway and has all the top amenities. Approved by DTCP, the layout has ready-to-register sites.",
    location: {
      area: "Hunsur Road (behind RMP)",
      city: "Mysuru",
      coordinates: { lat: 12.3592778, lng: 76.5029224 },
    },
    pricePerSqft: 1600,
    priceLabel: "₹1,600 / Sq.ft onwards",
    plotSizes: ["30×40", "30×50"],
    approvals: ["DTCP"],
    filters: ["dtcp", "ready", "investment"],
    highlights: [
      "Fully Developed",
      "Ready to Register",
      "Adjacent to Mysore-Coorg Highway",
      "Best Value Entry Point",
    ],
    amenities: [
      "Blacktop Roads",
      "Underground Drainage",
      "Well Developed Parks",
      "Rainwater Harvesting",
    ],
    facilities: [
      "Tree-lined avenues & landscapes",
      "Sewage Treatment Plant",
      "Blacktop roads",
      "Rainwater harvesting",
      "Well Developed Parks",
      "Underground drainage",
      "Surrounded by Residential Layouts",
    ],
    featured: true,
    heroImage: projectImage("dhatri-square"),
    gallery: [projectImage("dhatri-square")],
    listingDescription:
      "A completely Developed DTCP Approved Layout Off Hunsur Road, Mysuru.",
  },
];

function toProject(item: CmsProject): Project {
  const { mapStatus: _mapStatus, showOnLayouts: _showOnLayouts, ...project } = item;
  return project;
}

export const cmsProjects = cmsProjectsJson as CmsProject[];
export const catalogProjects: Project[] = projectsSeed;

/** Order used on alliancesquare.com/layouts listing page */
export const catalogLayoutsPageOrder = [
  "uk-square",
  "cnm-apex-city",
  "sridevi-lake-view",
  "jeevan-vihar-phase-2",
  "alliance-serene-phase-2",
  "adhya-enclave",
  "dr-daya-nagar",
  "jeevan-vihar",
  "dhatri-square",
] as const;

export const catalogRunningMapMarkerOrder = [
  "uk-square",
  "cnm-apex-city",
  "sridevi-lake-view",
  "jeevan-vihar-phase-2",
  "adhya-enclave",
] as const;

export const catalogCompletedMapMarkerOrder = [
  "alliance-serene-phase-2",
  "dr-daya-nagar",
  "jeevan-vihar",
  "dhatri-square",
] as const;

export function catalogProjectsAsCms(): CmsProject[] {
  const running = new Set<string>(catalogRunningMapMarkerOrder);
  return catalogProjects.map((project) => ({
    ...project,
    mapStatus: running.has(project.slug) ? "running" : "completed",
    showOnLayouts: true,
  }));
}

export function mergeCmsLayouts(overrides: CmsProject[]): CmsProject[] {
  const bySlug = new Map(
    overrides.filter((project) => project.slug).map((project) => [project.slug, project])
  );
  const catalog = catalogProjectsAsCms();
  const catalogSlugs = new Set(catalog.map((project) => project.slug));
  return [
    ...catalog.map((project) => bySlug.get(project.slug) ?? project),
    ...overrides.filter((project) => project.slug && !catalogSlugs.has(project.slug)),
  ];
}

export function mergeProjects(catalog: Project[], overrides: CmsProject[]): Project[] {
  const bySlug = new Map(
    overrides.filter((project) => project.slug).map((project) => [project.slug, toProject(project)])
  );
  const catalogSlugs = new Set(catalog.map((project) => project.slug));
  return [
    ...catalog.map((project) => bySlug.get(project.slug) ?? project),
    ...overrides
      .filter((project) => project.slug && !catalogSlugs.has(project.slug))
      .map(toProject),
  ];
}

export const projects: Project[] = mergeProjects(catalogProjects, cmsProjects);

export const mapMarkers: MapMarker[] = projects
  .filter((p) => p.location.coordinates)
  .map((p) => ({
    projectSlug: p.slug,
    name: p.name,
    priceLabel: p.priceLabel,
    location: `${p.location.area}, ${p.location.city}`,
    heroImage: p.heroImage,
    lat: p.location.coordinates!.lat,
    lng: p.location.coordinates!.lng,
  }));

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProject(): Project {
  return projects.find((p) => p.spotlight) ?? projects[0];
}

export function getSpotlightProjects(): Project[] {
  return getProjectsInOrder([
    "uk-square",
    "cnm-apex-city",
    "sridevi-lake-view",
    "jeevan-vihar-phase-2",
  ]);
}

export function getRelatedProjects(currentSlug: string, limit = 3): Project[] {
  return projects.filter((p) => p.slug !== currentSlug).slice(0, limit);
}

export const filterOptions: { value: import("@/types").ProjectFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "premium", label: "Premium" },
  { value: "muda", label: "MUDA Approved" },
  { value: "dtcp", label: "DTCP Approved" },
  { value: "ready", label: "Ready to Develop" },
  { value: "investment", label: "Investment" },
];

const cmsBySlug = new Map(cmsProjects.map((project) => [project.slug, project]));
const catalogSlugSet = new Set(catalogProjects.map((project) => project.slug));

function shownOnLayouts(slug: string) {
  const override = cmsBySlug.get(slug);
  return override ? override.showOnLayouts !== false : true;
}

function mapStatusFor(slug: string): "running" | "completed" {
  const override = cmsBySlug.get(slug);
  if (override?.mapStatus) return override.mapStatus;
  if ((catalogRunningMapMarkerOrder as readonly string[]).includes(slug)) return "running";
  return "completed";
}

const featuredCmsSlugs = cmsProjects
  .filter((project) => project.featured && shownOnLayouts(project.slug))
  .map((project) => project.slug);

const newCmsSlugs = cmsProjects
  .filter((project) => !catalogSlugSet.has(project.slug) && shownOnLayouts(project.slug))
  .map((project) => project.slug);

export const layoutsPageOrder = [
  ...featuredCmsSlugs,
  ...catalogLayoutsPageOrder.filter(
    (slug) => shownOnLayouts(slug) && !featuredCmsSlugs.includes(slug)
  ),
  ...newCmsSlugs.filter((slug) => !featuredCmsSlugs.includes(slug)),
];

const allMapSlugs = [
  ...catalogRunningMapMarkerOrder,
  ...catalogCompletedMapMarkerOrder,
  ...cmsProjects.map((project) => project.slug),
];
const uniqueMapSlugs = [...new Set(allMapSlugs)];

export const runningMapMarkerOrder = uniqueMapSlugs.filter(
  (slug) => mapStatusFor(slug) === "running"
);

export const completedMapMarkerOrder = uniqueMapSlugs.filter(
  (slug) => mapStatusFor(slug) === "completed"
);

export function getGroupedMapMarkers(): {
  running: MapMarker[];
  completed: MapMarker[];
} {
  const bySlug = new Map(mapMarkers.map((m) => [m.projectSlug, m]));

  return {
    running: runningMapMarkerOrder
      .map((slug) => bySlug.get(slug))
      .filter((m): m is MapMarker => Boolean(m)),
    completed: completedMapMarkerOrder
      .map((slug) => bySlug.get(slug))
      .filter((m): m is MapMarker => Boolean(m)),
  };
}

/** Sidebar featured order from original layouts page */
export const featuredSidebarOrder = [
  "jeevan-vihar-phase-2",
  "uk-square",
  "cnm-apex-city",
  "adhya-enclave",
  "sridevi-lake-view",
  "jeevan-vihar",
  "dr-daya-nagar",
  "alliance-serene-phase-2",
  "dhatri-square",
] as const;

export const layoutsBrochureUrl =
  "https://www.alliancesquare.com/user_assets/pdf/AllianceSquare-Projects-Brochure.pdf";

export function getProjectsInOrder(slugs: readonly string[]): Project[] {
  return slugs
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is Project => Boolean(p));
}
