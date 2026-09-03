import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/cms/session";

export {
  ADMIN_COOKIE,
  isAdminConfigured,
  passwordsMatch,
  createSessionToken,
  verifySessionToken,
  sessionCookieOptions,
} from "@/lib/cms/session";

export async function isAdminSession() {
  const store = await cookies();
  return verifySessionToken(store.get(ADMIN_COOKIE)?.value);
}
