const VIDEO_ID = /^[\w-]{11}$/;

function parseYouTubeId(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (VIDEO_ID.test(trimmed)) return trimmed;

  let candidate = "";

  try {
    const url = new URL(trimmed);
    if (url.hostname.includes("youtu.be")) {
      candidate = url.pathname.split("/").filter(Boolean)[0] ?? "";
    } else {
      const fromPath = url.pathname.match(/\/(?:live|shorts|embed|v)\/([\w-]{11})/);
      candidate = fromPath?.[1] || url.searchParams.get("v") || "";
    }
  } catch {
    candidate = trimmed;
  }

  return VIDEO_ID.test(candidate) ? candidate : "";
}

export function galleryVideoIds(project: { youtubeGalleryIds?: string[]; youtubeGalleryId?: string }) {
  const values = [...(project.youtubeGalleryIds ?? [])];
  if (project.youtubeGalleryId) values.push(project.youtubeGalleryId);
  const ids: string[] = [];
  for (const value of values) {
    const id = parseYouTubeId(value);
    if (id && !ids.includes(id)) ids.push(id);
  }
  return ids;
}
