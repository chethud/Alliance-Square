import { mkdir, writeFile } from "fs/promises";
import path from "path";

export const CONTENT_DIR = path.join(process.cwd(), "src", "content");

export async function writeJson(filename: string, data: unknown) {
  const filePath = path.join(CONTENT_DIR, filename);
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

export async function readJson<T>(filename: string): Promise<T> {
  const { readFile } = await import("fs/promises");
  const raw = await readFile(path.join(CONTENT_DIR, filename), "utf8");
  return JSON.parse(raw) as T;
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function parseYouTubeId(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^[\w-]{11}$/.test(trimmed)) return trimmed;

  try {
    const url = new URL(trimmed);
    if (url.hostname.includes("youtu.be")) {
      return url.pathname.split("/").filter(Boolean)[0] ?? "";
    }
    const shorts = url.pathname.match(/\/shorts\/([\w-]{11})/);
    if (shorts?.[1]) return shorts[1];
    const v = url.searchParams.get("v");
    if (v) return v;
    const embed = url.pathname.match(/\/embed\/([\w-]{11})/);
    if (embed?.[1]) return embed[1];
  } catch {
    return trimmed;
  }

  return trimmed;
}

export function priceLabelFromSqft(price: number) {
  return `₹${price.toLocaleString("en-IN")} / Sq.ft onwards`;
}
