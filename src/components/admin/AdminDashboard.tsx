"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ExternalLink, LogOut } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";
import type { ApprovalType, BlogPost, CmsProject, ProjectFilter, Testimonial } from "@/types";
import type { CmsContent, SiteContent } from "@/lib/cms/types";
import {
  EditorPane,
  Field,
  ImageField,
  ItemList,
  ListRow,
  SaveRow,
  inputClass,
  labelClass,
} from "@/components/admin/cms-ui";
import { parseYouTubeId } from "@/lib/cms/youtube";

type Tab = "insights" | "testimonials" | "layouts" | "site";

const NAV: { id: Tab; label: string; hint: string }[] = [
  { id: "insights", label: "Insights", hint: "Articles" },
  { id: "testimonials", label: "Testimonials", hint: "Reviews" },
  { id: "layouts", label: "Layouts", hint: "Projects" },
  { id: "site", label: "Homepage", hint: "Stats & video" },
];

async function uploadImage(file: File, folder: string, name: string) {
  const form = new FormData();
  form.set("file", file);
  form.set("folder", folder);
  form.set("name", name);
  const response = await fetch("/api/admin/upload", { method: "POST", body: form });
  const data = (await response.json()) as { url?: string; error?: string };
  if (!response.ok || !data.url) throw new Error(data.error || "Upload failed");
  return data.url;
}

function emptyInsight(): BlogPost {
  return {
    id: crypto.randomUUID(),
    slug: "",
    title: "",
    excerpt: "",
    category: "Market Insights",
    date: new Date().toISOString().slice(0, 10),
    image: "",
    body: [],
  };
}

function emptyTestimonial(): Testimonial {
  return {
    id: crypto.randomUUID(),
    name: "",
    location: "Mysuru",
    quote: "",
    image: "",
    verified: true,
  };
}

function emptyLayout(): CmsProject {
  return {
    id: "",
    slug: "",
    name: "",
    tagline: "",
    description: "",
    listingDescription: "",
    location: { area: "", city: "Mysuru", coordinates: { lat: 12.2958, lng: 76.6394 } },
    pricePerSqft: 0,
    priceLabel: "",
    plotSizes: ["30×40"],
    approvals: ["DTCP"],
    filters: ["dtcp"],
    highlights: [],
    amenities: [],
    facilities: [],
    featured: true,
    heroImage: "",
    gallery: [],
    youtubeShortId: "",
    mapStatus: "running",
    showOnLayouts: true,
  };
}

function splitList(value: string) {
  return value
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}

export function AdminDashboard({ initial }: { initial: CmsContent }) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("insights");
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [insights, setInsights] = useState<BlogPost[]>(initial.insights);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initial.testimonials);
  const [layouts, setLayouts] = useState<CmsProject[]>(initial.layouts);
  const [site, setSite] = useState<SiteContent>(initial.site);
  const [insightIndex, setInsightIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [layoutIndex, setLayoutIndex] = useState(initial.layouts.length ? 0 : -1);
  const catalogSlugSet = useMemo(() => new Set(initial.catalogSlugs), [initial.catalogSlugs]);

  useEffect(() => {
    setInsights(initial.insights);
    setTestimonials(initial.testimonials);
    setLayouts(initial.layouts);
    setSite(initial.site);
    setLayoutIndex(initial.layouts.length ? 0 : -1);
  }, [initial]);

  const insight = insights[insightIndex] ?? emptyInsight();
  const testimonial = testimonials[testimonialIndex] ?? emptyTestimonial();
  const layout = useMemo(
    () => (layoutIndex >= 0 ? layouts[layoutIndex] : emptyLayout()),
    [layoutIndex, layouts]
  );
  const activeNav = NAV.find((item) => item.id === tab)!;

  async function save(type: "insights" | "testimonials" | "site" | "layouts", data: unknown) {
    setSaving(true);
    setStatus("");
    const response = await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, data }),
    });
    const result = (await response.json()) as { error?: string; site?: SiteContent };
    setSaving(false);
    if (response.status === 401) {
      router.push("/admin/login");
      return;
    }
    if (!response.ok) {
      setStatus(result.error || "Save failed.");
      return;
    }
    if (result.site) setSite(result.site);
    setStatus("Saved. Refresh the public page to see it.");
    router.refresh();
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="flex h-dvh overflow-hidden">
      <aside className="hidden w-[232px] shrink-0 flex-col border-r border-light-gray bg-white lg:flex">
        <div className="border-b border-light-gray px-5 py-5">
          <Logo className="[&_img]:h-8" />
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-cool-gray">
            Content
          </p>
        </div>
        <nav className="flex-1 px-3 py-4" aria-label="CMS sections">
          {NAV.map((item) => {
            const active = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={cn(
                  "mb-0.5 flex w-full flex-col border-l-2 px-3 py-2.5 text-left transition-colors",
                  active
                    ? "border-brand-cyan bg-brand-cyan/[0.07]"
                    : "border-transparent hover:bg-off-white"
                )}
              >
                <span className={cn("text-sm font-semibold", active ? "text-charcoal" : "text-charcoal/80")}>
                  {item.label}
                </span>
                <span className="text-[11px] text-cool-gray">{item.hint}</span>
              </button>
            );
          })}
        </nav>
        <div className="border-t border-light-gray px-5 py-4">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-sm text-cool-gray hover:text-charcoal"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            View website
          </a>
          <button
            type="button"
            onClick={logout}
            className="mt-3 flex items-center gap-2 text-sm text-cool-gray hover:text-charcoal"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="border-b border-light-gray bg-white">
          <div className="flex h-14 items-center justify-between gap-4 px-5 lg:px-6">
            <div className="min-w-0">
              <h1 className="truncate text-base font-semibold tracking-tight">{activeNav.label}</h1>
              <p className="hidden text-xs text-cool-gray sm:block">{activeNav.hint}</p>
            </div>
            <div className="flex items-center gap-4">
              {status ? <p className="hidden text-sm text-brand-cyan md:block">{status}</p> : null}
              <button type="button" onClick={logout} className="text-sm text-cool-gray hover:text-charcoal lg:hidden">
                Sign out
              </button>
            </div>
          </div>
          <div className="flex gap-1 overflow-x-auto border-t border-light-gray px-3 lg:hidden">
            {NAV.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={cn(
                  "relative shrink-0 px-3 py-3 text-sm font-semibold",
                  tab === item.id ? "text-brand-cyan" : "text-cool-gray"
                )}
              >
                {item.label}
                {tab === item.id ? (
                  <span className="absolute inset-x-3 bottom-0 h-0.5 bg-brand-cyan" />
                ) : null}
              </button>
            ))}
          </div>
        </header>

        {status ? <p className="border-b border-light-gray bg-white px-5 py-2 text-sm text-brand-cyan sm:hidden">{status}</p> : null}

        <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
          {tab === "insights" && (
            <>
              <ItemList
                heading="Articles"
                count={insights.length}
                addLabel="Add"
                onAdd={() => {
                  setInsights((current) => [...current, emptyInsight()]);
                  setInsightIndex(insights.length);
                }}
              >
                {insights.map((post, index) => (
                  <ListRow
                    key={post.id}
                    selected={index === insightIndex}
                    title={post.title || "Untitled insight"}
                    meta={post.category}
                    onClick={() => setInsightIndex(index)}
                  />
                ))}
              </ItemList>
              <EditorPane
                title={insight.title || "New insight"}
                note="Shown on the Insights page and homepage article cards."
                footer={
                  <SaveRow
                    saving={saving}
                    saveLabel="Save insights"
                    onSave={() => save("insights", insights)}
                    dangerLabel="Delete this insight"
                    onDanger={() => {
                      setInsights((current) => current.filter((_, index) => index !== insightIndex));
                      setInsightIndex(0);
                    }}
                  />
                }
              >
                <Field label="Title">
                  <input
                    className={inputClass}
                    value={insight.title}
                    onChange={(event) =>
                      setInsights((current) =>
                        current.map((item, index) =>
                          index === insightIndex
                            ? {
                                ...item,
                                title: event.target.value,
                                slug: item.slug || event.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                              }
                            : item
                        )
                      )
                    }
                  />
                </Field>
                <div className="grid gap-4 md:grid-cols-3">
                  <Field label="Slug">
                    <input
                      className={inputClass}
                      value={insight.slug}
                      onChange={(event) =>
                        setInsights((current) =>
                          current.map((item, index) =>
                            index === insightIndex ? { ...item, slug: event.target.value } : item
                          )
                        )
                      }
                    />
                  </Field>
                  <Field label="Category">
                    <input
                      className={inputClass}
                      value={insight.category}
                      onChange={(event) =>
                        setInsights((current) =>
                          current.map((item, index) =>
                            index === insightIndex ? { ...item, category: event.target.value } : item
                          )
                        )
                      }
                    />
                  </Field>
                  <Field label="Date">
                    <input
                      type="date"
                      className={inputClass}
                      value={insight.date}
                      onChange={(event) =>
                        setInsights((current) =>
                          current.map((item, index) =>
                            index === insightIndex ? { ...item, date: event.target.value } : item
                          )
                        )
                      }
                    />
                  </Field>
                </div>
                <Field label="Excerpt">
                  <textarea
                    className={`${inputClass} min-h-24`}
                    value={insight.excerpt}
                    onChange={(event) =>
                      setInsights((current) =>
                        current.map((item, index) =>
                          index === insightIndex ? { ...item, excerpt: event.target.value } : item
                        )
                      )
                    }
                  />
                </Field>
                <Field label="Article body">
                  <textarea
                    className={`${inputClass} min-h-48`}
                    placeholder="Separate paragraphs with a blank line."
                    value={(insight.body ?? []).join("\n\n")}
                    onChange={(event) =>
                      setInsights((current) =>
                        current.map((item, index) =>
                          index === insightIndex
                            ? {
                                ...item,
                                body: event.target.value
                                  .split(/\n\s*\n/)
                                  .map((part) => part.trim())
                                  .filter(Boolean),
                              }
                            : item
                        )
                      )
                    }
                  />
                </Field>
                <ImageField
                  label="Hero image"
                  value={insight.image}
                  onPathChange={(value) =>
                    setInsights((current) =>
                      current.map((item, index) => (index === insightIndex ? { ...item, image: value } : item))
                    )
                  }
                  onFile={async (file) => {
                    try {
                      const url = await uploadImage(file, "blogs", insight.slug || insight.title || "insight");
                      setInsights((current) =>
                        current.map((item, index) => (index === insightIndex ? { ...item, image: url } : item))
                      );
                      setStatus("Image uploaded. Save insights to publish.");
                    } catch (error) {
                      setStatus(error instanceof Error ? error.message : "Upload failed.");
                    }
                  }}
                />
              </EditorPane>
            </>
          )}

          {tab === "testimonials" && (
            <>
              <ItemList
                heading="Reviews"
                count={testimonials.length}
                addLabel="Add"
                onAdd={() => {
                  setTestimonials((current) => [...current, emptyTestimonial()]);
                  setTestimonialIndex(testimonials.length);
                }}
              >
                {testimonials.map((item, index) => (
                  <ListRow
                    key={item.id}
                    selected={index === testimonialIndex}
                    title={item.name || "Untitled review"}
                    meta={item.location}
                    onClick={() => setTestimonialIndex(index)}
                  />
                ))}
              </ItemList>
              <EditorPane
                title={testimonial.name || "New testimonial"}
                note="Shown in the homepage carousel and on the Testimonials page."
                footer={
                  <SaveRow
                    saving={saving}
                    saveLabel="Save testimonials"
                    onSave={() => save("testimonials", testimonials)}
                    dangerLabel="Delete this testimonial"
                    onDanger={() => {
                      setTestimonials((current) => current.filter((_, index) => index !== testimonialIndex));
                      setTestimonialIndex(0);
                    }}
                  />
                }
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Name">
                    <input
                      className={inputClass}
                      value={testimonial.name}
                      onChange={(event) =>
                        setTestimonials((current) =>
                          current.map((item, index) =>
                            index === testimonialIndex ? { ...item, name: event.target.value } : item
                          )
                        )
                      }
                    />
                  </Field>
                  <Field label="Location">
                    <input
                      className={inputClass}
                      value={testimonial.location}
                      onChange={(event) =>
                        setTestimonials((current) =>
                          current.map((item, index) =>
                            index === testimonialIndex ? { ...item, location: event.target.value } : item
                          )
                        )
                      }
                    />
                  </Field>
                </div>
                <Field label="Quote">
                  <textarea
                    className={`${inputClass} min-h-32`}
                    value={testimonial.quote}
                    onChange={(event) =>
                      setTestimonials((current) =>
                        current.map((item, index) =>
                          index === testimonialIndex ? { ...item, quote: event.target.value } : item
                        )
                      )
                    }
                  />
                </Field>
                <ImageField
                  label="Photo"
                  value={testimonial.image ?? ""}
                  onPathChange={(value) =>
                    setTestimonials((current) =>
                      current.map((item, index) =>
                        index === testimonialIndex ? { ...item, image: value } : item
                      )
                    )
                  }
                  onFile={async (file) => {
                    try {
                      const url = await uploadImage(file, "testimonials", testimonial.name || "review");
                      setTestimonials((current) =>
                        current.map((item, index) =>
                          index === testimonialIndex ? { ...item, image: url } : item
                        )
                      );
                      setStatus("Image uploaded. Save testimonials to publish.");
                    } catch (error) {
                      setStatus(error instanceof Error ? error.message : "Upload failed.");
                    }
                  }}
                />
              </EditorPane>
            </>
          )}

          {tab === "layouts" && (
            <>
              <ItemList
                heading="Projects"
                count={layouts.length}
                addLabel="Add"
                onAdd={() => {
                  setLayouts((current) => [...current, emptyLayout()]);
                  setLayoutIndex(layouts.length);
                }}
              >
                {layouts.map((item, index) => (
                  <ListRow
                    key={item.slug || item.id || index}
                    selected={index === layoutIndex}
                    title={item.name || "Untitled layout"}
                    meta={`${catalogSlugSet.has(item.slug) ? "Hosted" : "New"}${item.showOnLayouts === false ? " · Hidden" : ""}`}
                    onClick={() => setLayoutIndex(index)}
                  />
                ))}
              </ItemList>
              {layoutIndex < 0 ? (
                <div className="flex flex-1 items-center justify-center px-8 text-sm text-cool-gray">
                  Select a hosted layout to edit, or add a new one.
                </div>
              ) : (
                <LayoutEditor
                  layout={layout}
                  saving={saving}
                  isCatalog={catalogSlugSet.has(layout.slug)}
                  onChange={(next) => {
                    setLayouts((current) => current.map((item, index) => (index === layoutIndex ? next : item)));
                  }}
                  onNotice={setStatus}
                  onSave={() => save("layouts", layouts)}
                  onDelete={() => {
                    const current = layouts[layoutIndex];
                    if (catalogSlugSet.has(current.slug)) {
                      setLayouts((items) =>
                        items.map((item, index) =>
                          index === layoutIndex ? { ...item, showOnLayouts: false } : item
                        )
                      );
                      setStatus("Hosted layout marked hidden. Save to apply.");
                      return;
                    }
                    setLayouts((items) => items.filter((_, index) => index !== layoutIndex));
                    setLayoutIndex(0);
                  }}
                />
              )}
            </>
          )}

          {tab === "site" && (
            <EditorPane
              title="Homepage"
              note="These numbers and the hero video appear on the first screen of the site."
              footer={
                <SaveRow
                  saving={saving}
                  saveLabel="Save homepage"
                  onSave={() => save("site", site)}
                />
              }
            >
              <div className="grid gap-4 md:grid-cols-3">
                <Field label="Years">
                  <input
                    type="number"
                    className={inputClass}
                    value={site.stats.years}
                    onChange={(event) =>
                      setSite((current) => ({
                        ...current,
                        stats: { ...current.stats, years: Number(event.target.value) },
                      }))
                    }
                  />
                </Field>
                <Field label="Layouts">
                  <input
                    type="number"
                    className={inputClass}
                    value={site.stats.layouts}
                    onChange={(event) =>
                      setSite((current) => ({
                        ...current,
                        stats: { ...current.stats, layouts: Number(event.target.value) },
                      }))
                    }
                  />
                </Field>
                <Field label="Customers">
                  <input
                    type="number"
                    className={inputClass}
                    value={site.stats.customers}
                    onChange={(event) =>
                      setSite((current) => ({
                        ...current,
                        stats: { ...current.stats, customers: Number(event.target.value) },
                      }))
                    }
                  />
                </Field>
              </div>
              <Field label="Homepage YouTube link">
                <input
                  className={inputClass}
                  value={site.heroVideoId}
                  onChange={(event) => setSite((current) => ({ ...current, heroVideoId: event.target.value }))}
                  placeholder="https://www.youtube.com/watch?v=..."
                />
                <p className="mt-1.5 text-xs text-cool-gray">
                  Paste the normal YouTube link — watch, live, Shorts, share, or embed.
                </p>
              </Field>
              {parseYouTubeId(site.heroVideoId) ? (
                <div className="aspect-video w-full overflow-hidden border border-light-gray bg-charcoal">
                  <iframe
                    title="Homepage video preview"
                    src={`https://www.youtube.com/embed/${parseYouTubeId(site.heroVideoId)}`}
                    className="h-full w-full"
                    allow="encrypted-media"
                  />
                </div>
              ) : null}
            </EditorPane>
          )}
        </div>
      </div>
    </div>
  );
}

function LayoutEditor({
  layout,
  saving,
  isCatalog,
  onChange,
  onNotice,
  onSave,
  onDelete,
}: {
  layout: CmsProject;
  saving: boolean;
  isCatalog: boolean;
  onChange: (layout: CmsProject) => void;
  onNotice: (message: string) => void;
  onSave: () => void;
  onDelete: () => void;
}) {
  const approvals: ApprovalType[] = ["MUDA", "MDA", "DTCP", "RERA"];
  const filters: ProjectFilter[] = ["premium", "muda", "dtcp", "ready", "investment"];

  return (
    <EditorPane
      title={layout.name || "New layout"}
      note={
        isCatalog
          ? "This layout is already on the site. Saving updates the live project page and listing."
          : "A new project. Saving adds it to Layouts and the map if coordinates are set."
      }
      footer={
        <SaveRow
          saving={saving}
          saveLabel="Save layouts"
          onSave={onSave}
          dangerLabel={isCatalog ? "Hide from Layouts page" : "Delete this layout"}
          onDanger={onDelete}
        />
      }
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Layout name">
          <input className={inputClass} value={layout.name} onChange={(event) => onChange({ ...layout, name: event.target.value })} />
        </Field>
        <Field label="Price per sq.ft">
          <input
            type="number"
            className={inputClass}
            value={layout.pricePerSqft || ""}
            onChange={(event) => onChange({ ...layout, pricePerSqft: Number(event.target.value) })}
          />
        </Field>
      </div>
      <Field label="Tagline">
        <input className={inputClass} value={layout.tagline} onChange={(event) => onChange({ ...layout, tagline: event.target.value })} />
      </Field>
      <Field label="Short listing text">
        <textarea
          className={`${inputClass} min-h-20`}
          value={layout.listingDescription ?? ""}
          onChange={(event) => onChange({ ...layout, listingDescription: event.target.value })}
        />
      </Field>
      <Field label="Full description">
        <textarea
          className={`${inputClass} min-h-28`}
          value={layout.description}
          onChange={(event) => onChange({ ...layout, description: event.target.value })}
        />
      </Field>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Area / address">
          <input
            className={inputClass}
            value={layout.location.area}
            onChange={(event) => onChange({ ...layout, location: { ...layout.location, area: event.target.value } })}
          />
        </Field>
        <Field label="Plot sizes">
          <input
            className={inputClass}
            value={layout.plotSizes.join(", ")}
            onChange={(event) => onChange({ ...layout, plotSizes: splitList(event.target.value) })}
          />
        </Field>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Map latitude">
          <input
            className={inputClass}
            value={layout.location.coordinates?.lat ?? ""}
            onChange={(event) =>
              onChange({
                ...layout,
                location: {
                  ...layout.location,
                  coordinates: {
                    lat: Number(event.target.value) || 0,
                    lng: layout.location.coordinates?.lng ?? 0,
                  },
                },
              })
            }
          />
        </Field>
        <Field label="Map longitude">
          <input
            className={inputClass}
            value={layout.location.coordinates?.lng ?? ""}
            onChange={(event) =>
              onChange({
                ...layout,
                location: {
                  ...layout.location,
                  coordinates: {
                    lat: layout.location.coordinates?.lat ?? 0,
                    lng: Number(event.target.value) || 0,
                  },
                },
              })
            }
          />
        </Field>
      </div>
      <div>
        <p className={labelClass}>Approvals</p>
        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
          {approvals.map((approval) => (
            <label key={approval} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                className="accent-brand-cyan"
                checked={layout.approvals.includes(approval)}
                onChange={(event) =>
                  onChange({
                    ...layout,
                    approvals: event.target.checked
                      ? [...layout.approvals, approval]
                      : layout.approvals.filter((item) => item !== approval),
                  })
                }
              />
              {approval}
            </label>
          ))}
        </div>
      </div>
      <div>
        <p className={labelClass}>Filters</p>
        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
          {filters.map((filter) => (
            <label key={filter} className="flex items-center gap-2 text-sm capitalize">
              <input
                type="checkbox"
                className="accent-brand-cyan"
                checked={layout.filters.includes(filter)}
                onChange={(event) =>
                  onChange({
                    ...layout,
                    filters: event.target.checked
                      ? [...layout.filters, filter]
                      : layout.filters.filter((item) => item !== filter),
                  })
                }
              />
              {filter}
            </label>
          ))}
        </div>
      </div>
      <Field label="Highlights">
        <input
          className={inputClass}
          value={layout.highlights.join(", ")}
          onChange={(event) => onChange({ ...layout, highlights: splitList(event.target.value) })}
        />
      </Field>
      <Field label="YouTube Shorts link">
        <input
          className={inputClass}
          value={layout.youtubeShortId ?? ""}
          onChange={(event) => onChange({ ...layout, youtubeShortId: event.target.value })}
          placeholder="https://www.youtube.com/shorts/..."
        />
        <p className="mt-1.5 text-xs text-cool-gray">
          Paste the normal Shorts or watch link. Embed links also work.
        </p>
      </Field>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Map status">
          <select
            className={inputClass}
            value={layout.mapStatus ?? "running"}
            onChange={(event) => onChange({ ...layout, mapStatus: event.target.value as CmsProject["mapStatus"] })}
          >
            <option value="running">Currently running</option>
            <option value="completed">Completed</option>
          </select>
        </Field>
        <label className="mt-7 flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            className="accent-brand-cyan"
            checked={layout.showOnLayouts !== false}
            onChange={(event) => onChange({ ...layout, showOnLayouts: event.target.checked })}
          />
          Show on Layouts page
        </label>
      </div>
      <ImageField
        label="Hero image"
        value={layout.heroImage}
        onPathChange={(value) => onChange({ ...layout, heroImage: value })}
        onFile={async (file) => {
          try {
            const url = await uploadImage(file, "projects", layout.name || "layout");
            onChange({
              ...layout,
              heroImage: url,
              gallery: layout.gallery.includes(url) ? layout.gallery : [url, ...layout.gallery],
            });
            onNotice("Image uploaded. Save layouts to publish.");
          } catch (error) {
            onNotice(error instanceof Error ? error.message : "Upload failed.");
          }
        }}
      />
    </EditorPane>
  );
}
