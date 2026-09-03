import { NextResponse } from "next/server";
import {
  createSessionToken,
  isAdminConfigured,
  passwordsMatch,
  ADMIN_COOKIE,
  sessionCookieOptions,
} from "@/lib/cms/auth";

export async function POST(request: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { error: "Set ADMIN_PASSWORD in .env.local (at least 6 characters)." },
      { status: 500 }
    );
  }

  const body = (await request.json()) as { password?: string };
  if (!body.password || !passwordsMatch(body.password)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, await createSessionToken(), sessionCookieOptions());
  return response;
}
