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

export type SectionBlock = {
  id: string;
  type: string;
  variant?: string;
  content: Record<string, unknown>;
};

export type HomepageConfig = {
  sections: SectionBlock[];
};

export type SiteLayoutConfig = {
  header: HeaderConfig;
  footer: FooterConfig;
  homepage: HomepageConfig;
};

const API_BASE = process.env.NEXT_PUBLIC_CMS_API_URL ?? "http://localhost:8080";
const SITE_SLUG = "nokair";

const defaultHeroSection: SectionBlock = {
  id: "hero",
  type: "hero",
  content: {
    title: "บินสบายไปกับนกแอร์",
    subtitle: "จองง่าย ราคาคุ้มค่า พร้อมบริการด้วยรอยยิ้ม",
    image: "/images/home-hero.png",
    actions: [
      { label: "จองเที่ยวบิน", href: "/booking" },
      { label: "ดูโปรโมชั่น", href: "/promo" },
    ],
  },
};

const defaultPromoSection: SectionBlock = {
  id: "featured-promos",
  type: "promo_grid",
  content: {
    title: "โปรโมชั่นแนะนำ",
    description: "ดีลพิเศษคัดสรรสำหรับคุณ",
    items: [
      {
        title: "บินเชียงใหม่ ราคาเริ่มต้น 999 บาท",
        description: "เที่ยวเชียงใหม่ฤดูหนาว ราคาสุดคุ้ม",
        badge: "ยอดนิยม",
      },
      {
        title: "ส่วนลด 15% สำหรับสมาชิก",
        description: "ใช้โค้ด NOKAIR15 ในการจองครั้งแรก",
        badge: "สมาชิก",
      },
    ],
  },
};

export const defaultSiteLayout: SiteLayoutConfig = {
  header: {
    logoSrc: "/images/nokair-logo.svg",
    logoAlt: "Nok Air",
    navItems: [
      { label: "จองตั๋วเครื่องบิน", href: "/booking" },
      { label: "โปรโมชั่น", href: "/promo" },
      { label: "เช็คอินออนไลน์", href: "/check-in" },
    ],
    cta: {
      label: "เข้าสู่ระบบ",
      href: "/login",
    },
  },
  footer: {
    columns: [
      {
        title: "เกี่ยวกับนกแอร์",
        links: [
          { label: "เกี่ยวกับเรา", href: "/about" },
          { label: "ข่าวประชาสัมพันธ์", href: "/news" },
        ],
      },
      {
        title: "บริการลูกค้า",
        links: [
          { label: "ศูนย์ช่วยเหลือ", href: "/support" },
          { label: "ติดต่อเรา", href: "/contact" },
        ],
      },
    ],
    copyright: "© 2025 Nok Air. All rights reserved.",
  },
  homepage: {
    sections: [defaultHeroSection, defaultPromoSection],
  },
};

export function normalizeLayout(data: unknown): SiteLayoutConfig {
  if (!data || typeof data !== "object") return defaultSiteLayout;

  const source = data as Partial<SiteLayoutConfig> &
    Partial<{ homepage: Partial<HomepageConfig> & { heroTitle?: string; heroSubtitle?: string; heroImage?: string } }>;

  const header = source.header ?? defaultSiteLayout.header;
  const footer = source.footer ?? defaultSiteLayout.footer;

  const sections = Array.isArray(source.homepage?.sections)
    ? source.homepage?.sections
    : [];

  // backward compatibility for legacy homepage shape
  if (!sections.length && source.homepage) {
    const { heroTitle, heroSubtitle, heroImage } = source.homepage;
    if (heroTitle || heroSubtitle || heroImage) {
      sections.push({
        ...defaultHeroSection,
        content: {
          ...defaultHeroSection.content,
          title: heroTitle ?? defaultHeroSection.content.title,
          subtitle: heroSubtitle ?? defaultHeroSection.content.subtitle,
          image: heroImage ?? defaultHeroSection.content.image,
        },
      });
    }
  }

  return {
    header,
    footer,
    homepage: {
      sections: sections.length ? sections : defaultSiteLayout.homepage.sections,
    },
  };
}

export async function fetchSiteLayout(): Promise<SiteLayoutConfig> {
  try {
    const res = await fetch(`${API_BASE}/admin/site/${SITE_SLUG}/layout`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch layout: ${res.status}`);
    }

    const parsed = await res.json();
    return normalizeLayout(parsed);
  } catch (err) {
    console.error("Falling back to defaultSiteLayout", err);
    return defaultSiteLayout;
  }
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
