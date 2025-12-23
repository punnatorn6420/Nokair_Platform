// lib/cms.ts
export type NavItem = {
  label: string;
  href: string;
};

export type HeaderConfig = {
  logoSrc: string;
  logoAlt: string;
  navItems: NavItem[];
  cta?: {
    label: string;
    href: string;
  };
};

export type FooterLink = {
  label: string;
  href: string;
};

export type FooterColumn = {
  title: string;
  links: FooterLink[];
};

export type FooterConfig = {
  columns: FooterColumn[];
  copyright: string;
};

export type HomepageConfig = {
  heroTitle: string;
  heroSubtitle: string;
  heroImage?: string;
};

export type SiteLayoutConfig = {
  header: HeaderConfig;
  footer: FooterConfig;
  homepage: HomepageConfig;
};

const API_BASE = process.env.NEXT_PUBLIC_CMS_API_URL ?? "http://localhost:8080";
const SITE_SLUG = "nokair";

export async function fetchSiteLayout(): Promise<SiteLayoutConfig> {
  const res = await fetch(`${API_BASE}/admin/site/${SITE_SLUG}/layout`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch layout: ${res.status}`);
  }

  return (await res.json()) as SiteLayoutConfig;
}

export async function saveSiteLayout(layout: SiteLayoutConfig): Promise<void> {
  const res = await fetch(`${API_BASE}/admin/site/${SITE_SLUG}/layout`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(layout),
  });

  if (!res.ok && res.status !== 204) {
    throw new Error(`Failed to save layout: ${res.status}`);
  }
}
