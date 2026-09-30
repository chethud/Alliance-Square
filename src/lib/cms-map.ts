import type { ApprovalType, BlogPost, CmsProject, CompanyStats, ProjectFilter, Testimonial } from "@/types";

const APPROVALS: ApprovalType[] = ["MUDA", "MDA", "DTCP", "RERA"];
const FILTERS: ProjectFilter[] = ["premium", "muda", "dtcp", "ready", "investment"];

function str(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function num(value: unknown) {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : 0;
}

function flag(value: unknown, fallback: boolean) {
  return typeof value === "boolean" ? value : fallback;
}

function strList(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.map((item) => String(item).trim()).filter(Boolean);
}

function asRecord(value: unknown) {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

export function projectFromCms(raw: unknown): CmsProject | null {
  const row = asRecord(raw);
  const slug = str(row.slug) || str(row.id);
  if (!slug) return null;
  const location = asRecord(row.location);
  const coordinates = asRecord(location.coordinates);
  const lat = num(coordinates.lat);
  const lng = num(coordinates.lng);
  const mapStatus = str(row.mapStatus) === "completed" ? "completed" : "running";
  const youtubeGalleryIds = strList(row.youtubeGalleryIds);
  const youtubeGalleryId = str(row.youtubeGalleryId) || undefined;
  return {
    id: str(row.id) || slug,
    slug,
    name: str(row.name) || slug,
    tagline: str(row.tagline),
    description: str(row.description),
    location: {
      area: str(location.area),
      city: str(location.city),
      ...(lat || lng ? { coordinates: { lat, lng } } : {}),
    },
    pricePerSqft: num(row.pricePerSqft),
    priceLabel: str(row.priceLabel),
    plotSizes: strList(row.plotSizes),
    approvals: strList(row.approvals).filter((item): item is ApprovalType => APPROVALS.includes(item as ApprovalType)),
    filters: strList(row.filters).filter((item): item is ProjectFilter => FILTERS.includes(item as ProjectFilter)),
    highlights: strList(row.highlights),
    amenities: strList(row.amenities),
    facilities: strList(row.facilities),
    nearbyLandmarks: strList(row.nearbyLandmarks),
    featured: flag(row.featured, false),
    spotlight: flag(row.spotlight, false),
    heroImage: str(row.heroImage),
    gallery: strList(row.gallery),
    listingDescription: str(row.listingDescription) || undefined,
    brochureUrl: str(row.brochureUrl) || undefined,
    youtubeShortId: str(row.youtubeShortId) || undefined,
    youtubeGalleryIds: youtubeGalleryIds.length ? youtubeGalleryIds : undefined,
    youtubeGalleryId,
    mapStatus,
    showOnLayouts: flag(row.showOnLayouts, true),
  };
}

export function insightFromCms(raw: unknown): BlogPost | null {
  const row = asRecord(raw);
  const slug = str(row.slug) || str(row.id);
  if (!slug) return null;
  return {
    id: str(row.id) || slug,
    slug,
    title: str(row.title),
    excerpt: str(row.excerpt),
    category: str(row.category),
    date: str(row.date),
    image: str(row.image),
    body: strList(row.body),
  };
}

export function testimonialFromCms(raw: unknown): Testimonial | null {
  const row = asRecord(raw);
  const id = str(row.id) || str(row.name);
  if (!id) return null;
  return {
    id,
    name: str(row.name),
    location: str(row.location),
    quote: str(row.quote),
    image: str(row.image) || undefined,
    designation: str(row.designation) || undefined,
    verified: flag(row.verified, false),
    service: str(row.service) || undefined,
  };
}

export function homepageFromCms(raw: unknown): { heroVideoId: string; stats: CompanyStats } | null {
  const row = asRecord(raw);
  const stats = asRecord(row.stats);
  const heroVideoId = str(row.heroVideoId);
  if (!heroVideoId && !Object.keys(stats).length) return null;
  return {
    heroVideoId,
    stats: {
      years: num(stats.years),
      layouts: num(stats.layouts),
      customers: num(stats.customers),
      customerFocused: str(stats.customerFocused) || "100%",
    },
  };
}
