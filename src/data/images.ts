/** Local images extracted from alliancesquare.com page exports */

export const brandLogo = "/images/logo/alliance-square.png";
export const brandLogoLight = "/images/logos/alliance-logo.png";

export function projectImage(slug: string): string {
  return `/images/projects/${slug}.jpg`;
}

export const apartmentImages = {
  hasiru: "/images/apartments/hasiru.jpg",
  courtyard: "/images/apartments/courtyard.jpg",
} as const;

export const blogImages = {
  rera: "/images/blogs/rera.jpg",
  "hospitality-hub": "/images/blogs/hospitality-hub.jpg",
  "why-alliance-square": "/images/blogs/why-alliance-square.jpg",
  "rv-university": "/images/blogs/rv-university.png",
  "greater-mysuru": "/images/blogs/greater-mysuru.jpg",
  "bengaluru-connectivity": "/images/blogs/bengaluru-connectivity.jpg",
} as const;

export const testimonialImages = [
  "/images/testimonials/testimonial-01.jpeg",
  "/images/testimonials/testimonial-02.jpeg",
  "/images/testimonials/testimonial-03.jpeg",
  "/images/testimonials/testimonial-04.jpg",
  "/images/testimonials/testimonial-05.jpg",
  "/images/testimonials/testimonial-06.jpg",
  "/images/testimonials/testimonial-07.jpg",
] as const;

export const heroSliderImages = [
  "/images/sliders/slider-01.jpg",
  "/images/sliders/slider-02.jpg",
  "/images/sliders/slider-03.jpg",
  "/images/sliders/slider-04.png",
  "/images/sliders/slider-05.jpg",
  "/images/sliders/slider-06.jpg",
  "/images/sliders/slider-07.jpg",
  "/images/sliders/slider-08.jpg",
  "/images/sliders/slider-09.jpg",
  "/images/sliders/slider-10.jpg",
] as const;

export const layoutsBanner = "/images/layouts-banner.jpg";

export const projectLogos = {
  "uk-square": "/images/logos/uk-square.png",
  "cnm-apex-city": "/images/logos/cnm-apex-city.png",
  "jeevan-vihar-phase-2": "/images/logos/jeevan-vihar-phase-2.png",
  "sridevi-lake-view": "/images/logos/sridevi-lake-view.jpg",
} as const;

/** Topic imagery for Why Mysuru growth stories — local assets, not project plot photos */
export const growthStoryImages = {
  expressway: "/images/growth/expressway.jpg",
  "ring-road": "/images/growth/ring-road.jpg",
  highways: "/images/growth/highways.jpg",
  airport: "/images/growth/airport.jpg",
  "cricket-stadium": "/images/growth/cricket-stadium.jpg",
  "greater-mysuru": blogImages["greater-mysuru"],
  "it-sector": "/images/growth/it-sector.jpg",
  logistics: "/images/growth/logistics.jpg",
  tourism: blogImages["hospitality-hub"],
  education: blogImages["rv-university"],
} as const;

export const whyInvestIcons = [
  "/images/icons/inv1.png",
  "/images/icons/inv2.png",
  "/images/icons/inv3.png",
  "/images/icons/inv4.png",
  "/images/icons/inv5.png",
  "/images/icons/inv6.png",
] as const;
