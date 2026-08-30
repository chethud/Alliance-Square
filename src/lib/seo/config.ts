export const SITE_URL = "https://www.alliancesquare.com";

export const SITE_NAME = "Alliance Square Properties";

export const SITE_SHORT_NAME = "Alliance Square";

export const DEFAULT_OG_IMAGE = "/images/sliders/slider-01.jpg";

export const SOCIAL_PROFILES = [
  "https://www.facebook.com/alliancesquare",
  "https://www.instagram.com/alliancesquare",
  "https://www.youtube.com/@alliancesquareproperties/",
] as const;

export const SEO_KEYWORDS = [
  "real estate in Mysuru",
  "real estate in Mysore",
  "properties in Mysuru",
  "properties in Mysore",
  "residential plots in Mysuru",
  "residential plots in Mysore",
  "sites for sale in Mysuru",
  "sites for sale in Mysore",
  "MUDA approved sites in Mysuru",
  "MUDA approved plots in Mysore",
  "DTCP approved sites in Mysuru",
  "premium plots in Mysuru",
  "gated community plots in Mysuru",
  "investment property in Mysuru",
  "land investment in Mysuru",
  "apartments in Mysuru",
  "villas in Mysuru",
  "layouts in Mysuru",
  "30x40 sites in Mysuru",
  "30x50 sites in Mysuru",
  "property developers in Mysuru",
  "real estate developers in Mysuru",
  "best properties in Mysuru",
  "best real estate company in Mysuru",
  "best plots in Mysuru",
  "property investment in Mysuru",
] as const;

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
