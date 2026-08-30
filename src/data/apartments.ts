import type { Project } from "@/types";
import { apartmentImages } from "./images";

/** Apartment listings from alliancesquare.com */
export const apartments: Pick<
  Project,
  "id" | "slug" | "name" | "tagline" | "priceLabel" | "location" | "heroImage" | "description"
>[] = [
  {
    id: "hasiru",
    slug: "hasiru",
    name: "Hasiru",
    tagline: "Premium Apartment for Sale in Mysuru",
    description:
      "Hasiru offers premium apartment living in Mysuru with thoughtfully designed spaces and excellent connectivity.",
    location: { area: "Mysuru", city: "Mysuru" },
    priceLabel: "₹1,05,00,000 onwards",
    heroImage: apartmentImages.hasiru,
  },
  {
    id: "courtyard",
    slug: "courtyard",
    name: "Courtyard",
    tagline: "Premium Apartment for Sale in Mysuru",
    description:
      "Courtyard offers comfortable apartment living with modern amenities in a well-connected Mysuru location.",
    location: { area: "Mysuru", city: "Mysuru" },
    priceLabel: "₹50,00,000 onwards",
    heroImage: apartmentImages.courtyard,
  },
];
