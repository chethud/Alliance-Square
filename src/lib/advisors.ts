export const ADVISORS_ORIGIN = "https://alliance-advisors.vercel.app";

export type AdvisorLookup =
  | { status: "idle" }
  | { status: "invalid"; message: string }
  | { status: "not_found"; message: string }
  | { status: "found"; name: string; profilePath: string; message: string }
  | { status: "error"; message: string };

function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

export function normalizeAdvisorPhone(value: string) {
  let digits = digitsOnly(value);
  if (digits.startsWith("91") && digits.length === 12) {
    digits = digits.slice(2);
  }
  if (digits.startsWith("0") && digits.length === 11) {
    digits = digits.slice(1);
  }
  return digits;
}

function decodeHtml(value: string) {
  return value
    .replace(/&#x27;/gi, "'")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

export async function lookupAdvisor(rawPhone: string): Promise<AdvisorLookup> {
  const phone = normalizeAdvisorPhone(rawPhone);
  if (phone.length !== 10) {
    return { status: "invalid", message: "Please enter a valid 10-digit mobile number." };
  }

  try {
    const response = await fetch(`${ADVISORS_ORIGIN}/?phone=${encodeURIComponent(phone)}`, {
      cache: "no-store",
      headers: { Accept: "text/html" },
    });
    if (!response.ok) {
      return { status: "error", message: "Verification is temporarily unavailable. Please try again." };
    }

    const html = await response.text();
    const found = html.match(
      /class="success">[\s\S]*?belongs to <a href="([^"]+)">([^<]+)<\/a>, a verified Alliance Square advisor/
    );
    if (found) {
      const externalPath = found[1].startsWith("http") ? found[1] : `${ADVISORS_ORIGIN}${found[1]}`;
      const slug =
        externalPath.match(/\/advisor\/([^/?#]+)/)?.[1] ??
        externalPath.split("/").filter(Boolean).pop() ??
        "";
      const profilePath = slug ? `/verify/advisor/${encodeURIComponent(slug)}` : externalPath;
      const name = decodeHtml(found[2].trim());
      return {
        status: "found",
        name,
        profilePath,
        message: `This number belongs to ${name}, a verified Alliance Square advisor.`,
      };
    }

    if (/not registered/i.test(html)) {
      return {
        status: "not_found",
        message:
          "This number is not registered to any current Alliance Square advisor. Do not share documents or make payments.",
      };
    }

    const error = html.match(/class="error">([^<]+)/);
    if (error) {
      const message = decodeHtml(error[1].replace(/^✕\s*/, "").replace(/^✓\s*/, "").trim());
      return { status: "invalid", message };
    }

    return { status: "error", message: "We could not complete this check. Please try again." };
  } catch {
    return { status: "error", message: "Verification is temporarily unavailable. Please try again." };
  }
}
