// lib/cms-client.ts
import { defaultSiteLayout, normalizeLayout, type SiteLayoutConfig } from "./site-layout";

const SITE_SLUG = "nokair";

export async function getSiteLayout(): Promise<SiteLayoutConfig> {
  const baseUrl = process.env.WEB_API_URL;

  if (!baseUrl) {
    console.warn("WEB_API_URL is not set, using defaultSiteLayout");
    return defaultSiteLayout;
  }

  try {
    const res = await fetch(`${baseUrl}/site/${SITE_SLUG}/layout`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.warn(
        "Failed to fetch layout from Website Backend, using defaultSiteLayout"
      );
      return defaultSiteLayout;
    }

    const data = await res.json();
    return normalizeLayout(data);
  } catch (err) {
    console.error("Error fetching layout from Website Backend:", err);
    return defaultSiteLayout;
  }
}
