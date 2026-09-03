import { NextResponse } from "next/server";
import { isAdminSession } from "@/lib/cms/auth";
import { loadCmsContent, type SiteContent } from "@/lib/cms/content";
import { writeJson, parseYouTubeId, priceLabelFromSqft, slugify } from "@/lib/cms/fs";
import type { BlogPost, CmsProject, CompanyStats } from "@/types";

export async function GET() {
  if (!(await isAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(await loadCmsContent());
}

export async function POST(request: Request) {
  if (!(await isAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as {
    type: "insights" | "testimonials" | "site" | "layouts";
    data: unknown;
  };

  if (body.type === "insights") {
    const insights = body.data as BlogPost[];
    await writeJson("insights.json", insights);
    return NextResponse.json({ ok: true });
  }

  if (body.type === "testimonials") {
    await writeJson("testimonials.json", body.data);
    return NextResponse.json({ ok: true });
  }

  if (body.type === "site") {
    const site = body.data as { heroVideoId?: string; stats?: CompanyStats };
    const nextSite: SiteContent = {
      heroVideoId: parseYouTubeId(site.heroVideoId ?? ""),
      stats: {
        years: Number(site.stats?.years) || 0,
        layouts: Number(site.stats?.layouts) || 0,
        customers: Number(site.stats?.customers) || 0,
        customerFocused: site.stats?.customerFocused || "100%",
      },
    };
    if (!nextSite.heroVideoId) {
      return NextResponse.json({ error: "Enter a valid YouTube URL or video ID." }, { status: 400 });
    }
    await writeJson("site.json", nextSite);
    return NextResponse.json({ ok: true, site: nextSite });
  }

  if (body.type === "layouts") {
    const layouts = (body.data as CmsProject[]).map((project) => {
      const slug = slugify(project.slug || project.name);
      const price = Number(project.pricePerSqft) || 0;
      const youtubeShortId = parseYouTubeId(project.youtubeShortId ?? "");
      return {
        ...project,
        id: slug,
        slug,
        pricePerSqft: price,
        priceLabel: project.priceLabel || priceLabelFromSqft(price),
        heroImage: project.heroImage,
        gallery: project.gallery?.length ? project.gallery : project.heroImage ? [project.heroImage] : [],
        highlights: project.highlights?.length ? project.highlights : ["Residential Layout"],
        amenities: project.amenities?.length ? project.amenities : ["Wide Roads", "Street Lighting"],
        facilities: project.facilities?.length ? project.facilities : ["Wide Internal Roads"],
        youtubeShortId: youtubeShortId || undefined,
        location: {
          area: project.location?.area || "",
          city: project.location?.city || "Mysuru",
          coordinates: project.location?.coordinates,
        },
      };
    });
    await writeJson("cms-projects.json", layouts);
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Unknown content type." }, { status: 400 });
}
