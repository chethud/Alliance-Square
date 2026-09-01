export type ProjectFilter =
  | "all"
  | "premium"
  | "muda"
  | "dtcp"
  | "ready"
  | "investment";

export type ApprovalType = "MUDA" | "MDA" | "DTCP" | "RERA";

export interface ProjectLocation {
  area: string;
  city: string;
  coordinates?: { lat: number; lng: number };
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  location: ProjectLocation;
  pricePerSqft: number;
  priceLabel: string;
  plotSizes: string[];
  approvals: ApprovalType[];
  filters: ProjectFilter[];
  highlights: string[];
  amenities: string[];
  facilities: string[];
  nearbyLandmarks?: string[];
  featured: boolean;
  spotlight?: boolean;
  heroImage: string;
  gallery: string[];
  listingDescription?: string;
  brochureUrl?: string;
  /** YouTube Shorts video ID (from youtube.com/shorts/{id}) */
  youtubeShortId?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
  image?: string;
  designation?: string;
  verified?: boolean;
  service?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface GrowthDriver {
  id: string;
  label: string;
  category: "Connectivity" | "Infrastructure" | "Industry" | "Education" | "Growth Driver";
  title: string;
  description: string;
}

export interface ContactInfo {
  corporateOffice: {
    address: string[];
    phone: string;
  };
  salesOffice: {
    address: string[];
    phone: string;
    hours: string;
  };
  mobile: string[];
  email: string;
  whatsapp: string;
}

export interface CompanyStats {
  years: number;
  layouts: number;
  customers: number;
  customerFocused: string;
}

export interface WhyAllianceFeature {
  number: string;
  title: string;
  description: string;
}

export interface ApprovalStep {
  number: string;
  title: string;
  description: string;
}

export interface MapMarker {
  projectSlug: string;
  name: string;
  priceLabel: string;
  location: string;
  heroImage: string;
  lat: number;
  lng: number;
}
