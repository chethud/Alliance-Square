import { NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { isAdminSession } from "@/lib/cms/auth";
import { slugify } from "@/lib/cms/fs";

const FOLDERS = new Set(["blogs", "testimonials", "projects"]);
const TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export async function POST(request: Request) {
  if (!(await isAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");
  const folder = String(form.get("folder") || "blogs");
  const hint = String(form.get("name") || "image");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Choose an image file." }, { status: 400 });
  }
  if (!FOLDERS.has(folder)) {
    return NextResponse.json({ error: "Invalid upload folder." }, { status: 400 });
  }

  const ext = TYPES[file.type] || path.extname(file.name).replace(".", "").toLowerCase();
  if (!["jpg", "jpeg", "png", "webp"].includes(ext)) {
    return NextResponse.json({ error: "Use a JPG, PNG, or WebP image." }, { status: 400 });
  }

  const filename = `${slugify(hint) || "image"}-${Date.now()}.${ext === "jpeg" ? "jpg" : ext}`;
  const dir = path.join(process.cwd(), "public", "images", folder);
  await mkdir(dir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, filename), buffer);

  return NextResponse.json({ url: `/images/${folder}/${filename}` });
}
