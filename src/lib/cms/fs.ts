import { mkdir, rename, writeFile } from "fs/promises";
import path from "path";

export const CONTENT_DIR = path.join(process.cwd(), "src", "content");

export async function writeJson(filename: string, data: unknown) {
  const filePath = path.join(CONTENT_DIR, filename);
  await mkdir(path.dirname(filePath), { recursive: true });
  const payload = `${JSON.stringify(data, null, 2)}\n`;
  const tempPath = `${filePath}.${process.pid}.${Date.now()}.tmp`;
  await writeFile(tempPath, payload, "utf8");
  await rename(tempPath, filePath);
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

export function priceLabelFromSqft(price: number) {
  return `₹${price.toLocaleString("en-IN")} / Sq.ft onwards`;
}
