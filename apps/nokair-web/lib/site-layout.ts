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

export type FooterDownload = {
  label: string;
  href: string;
};

export type FooterSocial = {
  label: string;
  href: string;
};

export type FooterConfig = {
  booking: FooterLink[];
  journeyPlanning: FooterLink[];
  aboutUs: FooterLink[];
  inFlightService: FooterLink[];
  nokFanClub: FooterLink[];
  corporateCustomer: FooterLink[];
  contactUs: FooterLink[];
  nokMobile: FooterLink[];
  mobile: {
    title: string;
    description: string;
    downloads: FooterDownload[];
    socials: FooterSocial[];
  };
  legal: FooterLink[];
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
    booking: [
      {
        label: "วิธีการจองและจ่าย",
        href: "//content.nokair.com/th/Booking/How-to-Book-and-Pay.aspx",
      },
      { label: "QR Payment", href: "//content.nokair.com/th/Booking/QR-Payment.aspx" },
      {
        label: "การเลือกที่นั่ง",
        href: "//content.nokair.com/th/Booking/How-to-Select-Seat.aspx",
      },
      { label: "เส้นทางการบิน", href: "//content.nokair.com/th/Booking/Where-we-fly.aspx" },
      { label: "ตั๋วราคาประหยัด", href: "https://booking.nokair.com/th/" },
      { label: "ตารางการบิน", href: "https://booking.nokair.com/th/flight-schedule" },
      { label: "โปรโมชั่น", href: "//content.nokair.com/th/Booking/Promotion.aspx" },
      {
        label: "ประเภทบัตรโดยสาร",
        href: "//content.nokair.com/th/Booking/Seat-Types.aspx",
      },
      { label: "NOKGO", href: "https://content.nokair.com/th/NokGo.aspx" },
    ],
    journeyPlanning: [
      { label: "เช็คอิน", href: "//content.nokair.com/th/Journey-Planning/Check-In.aspx" },
      { label: "จัดการบุ๊คกิ้ง", href: "/ManageBooking" },
      { label: "สถานะเที่ยวบิน", href: "https://booking.nokair.com/th/flight-status" },
      {
        label: "การนำสัมภาระขึ้นเครื่อง",
        href: "//content.nokair.com/th/Journey-Planning/Baggage.aspx",
      },
      {
        label: "การเดินทางพร้อมเด็ก",
        href: "//content.nokair.com/th/Journey-Planning/Travel-with-infant-or-Children.aspx",
      },
      {
        label: "การขนส่งสัตว์เลี้ยง",
        href: "//content.nokair.com/th/Journey-Planning/Nok-Air-Cargo.aspx",
      },
      {
        label: "ผู้โดยสารที่ต้องการความช่วยเหลือ",
        href: "//content.nokair.com/th/Journey-Planning/Physically-Challenged-Passenger.aspx",
      },
      {
        label: "เปลี่ยนแปลงการเดินทาง",
        href: "//content.nokair.com/th/Journey-Planning/Change-Travel-Itinerary.aspx",
      },
      { label: "นกรีฟันด์", href: "//content.nokair.com/th/Journey-Planning/Nok-Refund.aspx" },
      { label: "นกเฟิร์ส", href: "//content.nokair.com/th/Journey-Planning/Nok-First.aspx" },
      {
        label: "ประกันการเดินทาง",
        href: "//content.nokair.com/th/TravelInsurance-NokProtect.aspx",
      },
      {
        label: "นกคาร์",
        href:
          "//content.nokair.com/th/Booking/Where-we-fly/Flight-Service/Other-Convenience-Services/Nok-Car",
      },
      { label: "บริการอื่นๆ", href: "//content.nokair.com/th/Journey-Planning/OtherServices.aspx" },
    ],
    aboutUs: [
      {
        label: "ข้อมูลบริษัท",
        href: "//content.nokair.com/th/About-Nokair/Company-Information.aspx",
      },
      { label: "ข่าวสาร", href: "//content.nokair.com/th/About-Nokair/News.aspx" },
      {
        label: "เครื่องบินนก",
        href: "//content.nokair.com/th/About-Nokair/Nok-Air-plane.aspx",
      },
      { label: "สมัครงาน", href: "//content.nokair.com/th/About-Nokair/Careers.aspx" },
      {
        label: "นักศึกษาฝึกงาน",
        href: "//content.nokair.com/th/About-Nokair/Internship.aspx",
      },
      {
        label: "นักลงทุนสัมพันธ์",
        href: "//content.nokair.com/th/About-Nokair/Investor-relations.aspx",
      },
    ],
    inFlightService: [],
    nokFanClub: [
      {
        label: "สิทธิประโยชน์นกแฟนคลับ",
        href: "https://content.nokair.com/th/nok-fanclub/Member-Benefit.aspx",
      },
      {
        label: "สมัครสมาชิก",
        href: "https://content.nokair.com/th/nok-fanclub/Be-a-Member.aspx",
      },
      {
        label: "แลกของรางวัล",
        href: "https://content.nokair.com/th/nok-fanclub/Redeem-Point.aspx",
      },
    ],
    corporateCustomer: [
      {
        label: "เดินทางเป็นหมู่คณะ",
        href: "//content.nokair.com/th/Customer-Company/Travel-together.aspx",
      },
      { label: "ตัวแทนจำหน่าย", href: "//booking.nokair.com/th/ta" },
      {
        label: "บริการเที่ยวบินเช่าเหมาลำ",
        href: "//content.nokair.com/th/Customer-Company/charterflight.aspx",
      },
      {
        label: "กลุ่มลูกค้าบริษัท",
        href: "//content.nokair.com/th/Customer-Company/Corporate-customers.aspx",
      },
      {
        label: "กลุ่มลูกค้าราชการ",
        href: "//content.nokair.com/th/Customer-Company/Government-customers.aspx",
      },
    ],
    contactUs: [{ label: "ติดต่อเรา", href: "https://content.nokair.com/th/Contact-Nok.aspx" }],
    nokMobile: [
      { label: "Nok Mobile", href: "https://content.nokair.com/th/Nok-Air-Application.aspx" },
    ],
    mobile: {
      title: "Nok Mobile",
      description: "ไม่พลาดทุกโปรโมชั่น เช็คอินเร็วทันใจ โหลดฟรี",
      downloads: [
        {
          label: "Google Play",
          href: "https://play.google.com/store/apps/details?id=com.NokAir.app&hl=en",
        },
        {
          label: "App Store",
          href: "https://apps.apple.com/us/app/nok-airlines/id1597911105",
        },
        {
          label: "AppGallery",
          href: "https://appgallery.huawei.com/app/C105119185?channelId=web&detailType=0",
        },
      ],
      socials: [
        { label: "Facebook", href: "https://www.facebook.com/nokairlines" },
        { label: "X", href: "https://twitter.com/nokairlines" },
        {
          label: "YouTube",
          href: "https://www.youtube.com/user/NokairlinesTV/featured?&ab_channel=NokAirlines",
        },
        {
          label: "LINE",
          href: "https://line.me/R/ti/p/@nokair?from=page&openQrModal=true&searchId=nokair",
        },
      ],
    },
    legal: [
      {
        label: "เงื่อนไขและข้อกำหนด",
        href: "//content.nokair.com/en/Terms/terms-and-conditions.aspx",
      },
      {
        label: "ข้อกำหนดการใช้งาน",
        href: "//content.nokair.com/en/Terms/Terms-of-use.aspx",
      },
      {
        label: "นโยบายความเป็นส่วนตัว",
        href: "//content.nokair.com/en/Terms/Privacy-policy.aspx",
      },
    ],
    copyright: "©2024 บริษัท สายการบินนกแอร์ จำกัด (มหาชน) สงวนลิขสิทธิ์",
  },
  homepage: {
    sections: [defaultHeroSection, defaultPromoSection],
  },
};

type LegacyFooterColumn = {
  title: string;
  links: FooterLink[];
};

type LegacyFooterConfig = {
  columns?: LegacyFooterColumn[];
  copyright?: string;
};

function normalizeFooter(footer?: Partial<FooterConfig> & LegacyFooterConfig): FooterConfig {
  if (!footer) return defaultSiteLayout.footer;

  const hasStructuredFooter =
    Array.isArray(footer.booking) &&
    Array.isArray(footer.journeyPlanning) &&
    Array.isArray(footer.aboutUs) &&
    Array.isArray(footer.nokFanClub);

  if (hasStructuredFooter) {
    return {
      booking: footer.booking ?? defaultSiteLayout.footer.booking,
      journeyPlanning: footer.journeyPlanning ?? defaultSiteLayout.footer.journeyPlanning,
      aboutUs: footer.aboutUs ?? defaultSiteLayout.footer.aboutUs,
      inFlightService: footer.inFlightService ?? defaultSiteLayout.footer.inFlightService,
      nokFanClub: footer.nokFanClub ?? defaultSiteLayout.footer.nokFanClub,
      corporateCustomer:
        footer.corporateCustomer ?? defaultSiteLayout.footer.corporateCustomer,
      contactUs: footer.contactUs ?? defaultSiteLayout.footer.contactUs,
      nokMobile: footer.nokMobile ?? defaultSiteLayout.footer.nokMobile,
      mobile: footer.mobile ?? defaultSiteLayout.footer.mobile,
      legal: footer.legal ?? defaultSiteLayout.footer.legal,
      copyright: footer.copyright ?? defaultSiteLayout.footer.copyright,
    };
  }

  if (Array.isArray(footer.columns)) {
    return {
      ...defaultSiteLayout.footer,
      copyright: footer.copyright ?? defaultSiteLayout.footer.copyright,
    };
  }

  return defaultSiteLayout.footer;
}

export function normalizeLayout(data: unknown): SiteLayoutConfig {
  if (!data || typeof data !== "object") return defaultSiteLayout;

  const source = data as Partial<SiteLayoutConfig> &
    Partial<{ homepage: { heroTitle?: string; heroSubtitle?: string; heroImage?: string; sections?: SectionBlock[] } }>;

  const header = source.header ?? defaultSiteLayout.header;
  const footer = normalizeFooter(source.footer);

  const sections = Array.isArray(source.homepage?.sections)
    ? source.homepage?.sections
    : [];

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
