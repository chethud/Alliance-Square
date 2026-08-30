import type { BlogPost } from "@/types";
import { blogImages } from "./images";

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "what-is-rera",
    title: "What Is RERA and Why Does It Matter When Buying Property?",
    excerpt:
      "Buying property is one of the biggest financial decisions most people make. Whether you are purchasing a plot, apartment, or villa, understanding RERA protections is essential.",
    category: "Legal & Compliance",
    date: "2026-08-28",
    image: blogImages.rera,
  },
  {
    id: "2",
    slug: "mysuru-hospitality-hub",
    title: "Mysuru is now South India's Hospitality Hub!",
    excerpt:
      "Mysuru's hospitality sector is entering a remarkable phase of growth, creating exciting opportunities for real estate investors and homebuyers.",
    category: "Market Insights",
    date: "2026-08-04",
    image: blogImages["hospitality-hub"],
  },
  {
    id: "3",
    slug: "why-choose-alliance-square",
    title: "Why Choose Alliance Square to Invest in Residential Plots in Mysore?",
    excerpt:
      "There was a time when people aspired to settle in metropolitan cities. Today, Mysuru offers a compelling alternative with planned growth and quality of life.",
    category: "Investment Guide",
    date: "2026-07-27",
    image: blogImages["why-alliance-square"],
  },
  {
    id: "4",
    slug: "rv-university-nanjangud",
    title: "RV University in Nanjangud: A New Growth Engine for Mysuru Real Estate",
    excerpt:
      "Mysuru is entering a defining phase of growth — and education is leading the charge. Bengaluru's expansion is creating ripple effects across the region.",
    category: "Growth Corridors",
    date: "2026-02-19",
    image: blogImages["rv-university"],
  },
  {
    id: "5",
    slug: "greater-mysuru-corporation",
    title: "Greater Mysuru City Corporation: A New Era for Real Estate Growth in Mysuru",
    excerpt:
      "Mysuru is not just growing. It is unfolding. The transformation of Mysuru City Corporation into Greater Mysuru signals a new chapter for urban development.",
    category: "Market Insights",
    date: "2026-02-19",
    image: blogImages["greater-mysuru"],
  },
  {
    id: "6",
    slug: "bengaluru-mysuru-connectivity",
    title: "Bengaluru–Mysuru Connectivity Just Got a Major Upgrade",
    excerpt:
      "The Bengaluru–Mysuru travel corridor is undergoing a major transformation. With new infrastructure developments, Mysuru's connectivity story is changing.",
    category: "Connectivity",
    date: "2025-07-05",
    image: blogImages["bengaluru-connectivity"],
  },
];

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((b) => b.slug === slug);
}
