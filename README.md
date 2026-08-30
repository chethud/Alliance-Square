# Alliance Square Properties

Premium modern real estate website for Alliance Square Properties, Mysuru, Karnataka.

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/              # Pages and routes
├── components/       # Reusable UI components
├── data/             # Content data (projects, blogs, testimonials)
├── lib/              # Utilities
└── types/            # TypeScript types
```

## Content Management

All content is centralized in `src/data/` for easy updates:

- `projects.ts` — Project listings and details
- `blogs.ts` — Insights/articles
- `testimonials.ts` — Customer testimonials
- `company.ts` — Company info, contact, stats
- `faqs.ts` — FAQ content
- `mysuru-growth.ts` — Growth drivers

## Build

```bash
npm run build
npm start
```
