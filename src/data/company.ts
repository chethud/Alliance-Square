import type { CompanyStats, ContactInfo, WhyAllianceFeature, ApprovalStep } from "@/types";

export const company = {
  name: "Alliance Square Properties",
  shortName: "Alliance Square",
  city: "Mysuru",
  state: "Karnataka",
  tagline: "Premium residential plots and thoughtfully planned communities in Mysuru's most promising growth corridors.",
  intro:
    "Alliance Square is a pioneer in the real estate industry in Mysuru, offering thoughtfully planned investment opportunities across residential layouts, apartments and villas.",
  description:
    "Alliance Square Apartments, Layouts & Villas are meticulously designed with unbound convenience and the best of amenities — an effortless blend of modernity and elegance.",
  phone: "0821-2541100",
  phoneHref: "tel:08212541100",
  mobile: ["8867324404", "9902926006"],
  email: "info@alliancesquare.com",
  whatsapp: "919902926006",
  footerWelcome:
    "is a pioneer in the real estate industry in Mysuru. It offers you the best investment opportunities & inspires you to live life to the fullest. Alliance Square Apartments, Layouts & Villas are meticulously designed with unbound convenience & the best of amenities and are an effortless blend of modernity and elegance.",
};

export const stats: CompanyStats = {
  years: 20,
  layouts: 15,
  customers: 5000,
  customerFocused: "100%",
};

export const contact: ContactInfo = {
  corporateOffice: {
    address: [
      "CH 16, Prashanth Plaza,",
      "5th Cross, 4th Main,",
      "Saraswathipuram,",
      "Mysuru - 570 009",
    ],
    phone: "0821-2541100",
  },
  salesOffice: {
    address: [
      "693, S&S Complex,",
      "2nd Floor,",
      "Vishwamanava Double Road,",
      "Saraswathipuram,",
      "Mysuru - 570 009",
    ],
    phone: "0821-2541100",
    hours: "Monday to Sunday, 10:00 AM - 7:00 PM",
  },
  mobile: ["8867324404", "9902926006"],
  email: "info@alliancesquare.com",
  whatsapp: "919902926006",
};

export const whyAllianceFeatures: WhyAllianceFeature[] = [
  {
    number: "01",
    title: "20+ Years of Experience",
    description:
      "Two decades of real estate sector excellence in Mysuru, building lasting relationships with investors and homebuyers.",
  },
  {
    number: "02",
    title: "5,000+ Happy Customers",
    description:
      "Thousands of families have trusted Alliance Square for transparent, hassle-free property purchases and registrations.",
  },
  {
    number: "03",
    title: "15+ Layouts",
    description:
      "A diverse portfolio of residential layouts across Mysuru and emerging growth corridors.",
  },
  {
    number: "04",
    title: "Legally Approved Properties",
    description:
      "MUDA, MDA, and DTCP approved properties with thoroughly verified documentation — legally approved, error-free, and discrepancy-free.",
  },
  {
    number: "05",
    title: "Professional Expert Team",
    description:
      "An expert team with professional backgrounds guiding you from site visit to registration.",
  },
  {
    number: "06",
    title: "Customer-First Process",
    description:
      "Transparent, honest, and truly customer-first — making property buying feel straightforward and supported.",
  },
];

export const approvalSteps: ApprovalStep[] = [
  {
    number: "01",
    title: "Verify Project",
    description:
      "Review MUDA/MDA or DTCP approvals, RERA registration where applicable, and verify all documentation.",
  },
  {
    number: "02",
    title: "Visit Site",
    description:
      "Schedule a site visit to explore the layout, surroundings, and infrastructure firsthand.",
  },
  {
    number: "03",
    title: "Review Documents",
    description:
      "Examine mother documents, NOC, approved survey numbers, and project development status.",
  },
  {
    number: "04",
    title: "Choose Your Plot",
    description:
      "Select from available plot sizes that match your requirements and investment goals.",
  },
  {
    number: "05",
    title: "Booking",
    description:
      "Complete booking with guided support through financial processes and bank loan assistance where available.",
  },
  {
    number: "06",
    title: "Registration",
    description:
      "Proceed with registration supported by our team for a smooth, hassle-free experience.",
  },
];

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Layouts", href: "/layouts" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export const footerLinks = {
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "Layouts", href: "/layouts" },
    { label: "MUDA Approved Sites", href: "/layouts" },
    { label: "30x40 Sites in Mysore", href: "/layouts" },
    { label: "About Us", href: "/about" },
    { label: "Layout Marketing", href: "/contact" },
    { label: "Blogs", href: "/insights" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "FAQs", href: "/faqs" },
    { label: "Contact Us", href: "/contact" },
  ],
};
