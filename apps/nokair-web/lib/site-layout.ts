// lib/site-layout.ts
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

// ตอนนี้ใช้ config แบบ hard-coded ไปก่อน
// อนาคตค่อยเปลี่ยนเป็น fetch จาก CMS API
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
    heroTitle: "บินสบายไปกับนกแอร์",
    heroSubtitle: "จองง่าย ราคาคุ้มค่า พร้อมบริการด้วยรอยยิ้ม",
    heroImage: "/images/home-hero.png",
  },
};
