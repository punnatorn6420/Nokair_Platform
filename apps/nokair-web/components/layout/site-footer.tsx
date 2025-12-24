// components/layout/site-footer.tsx
import Link from "next/link";
import { FooterConfig } from "@/lib/site-layout";

interface SiteFooterProps {
  config: FooterConfig;
}

export function SiteFooter({ config }: SiteFooterProps) {
  return (
    <footer className="mt-12 bg-yellow-400 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 lg:py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[repeat(4,minmax(0,1fr))_minmax(0,1.4fr)]">
          <div className="space-y-3">
            <h3 className="text-base font-semibold">จองตั๋ว</h3>
            <ul className="space-y-2 text-sm">
              {config.booking.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-black/70">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-semibold">วางแผนการเดินทาง</h3>
            <ul className="space-y-2 text-sm">
              {config.journeyPlanning.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-black/70">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-base font-semibold">เกี่ยวกับนกแอร์</h3>
              <ul className="space-y-2 text-sm">
                {config.aboutUs.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-black/70">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-base font-semibold">บริการบนเครื่อง</h3>
              <ul className="space-y-2 text-sm">
                {config.inFlightService.length ? (
                  config.inFlightService.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="hover:text-black/70">
                        {link.label}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-black/70">เร็วๆ นี้</li>
                )}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-base font-semibold">นกแฟนคลับ</h3>
              <ul className="space-y-2 text-sm">
                {config.nokFanClub.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-black/70">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-base font-semibold">ลูกค้าบริษัท</h3>
              <ul className="space-y-2 text-sm">
                {config.corporateCustomer.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-black/70">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              {config.contactUs.map((link) => (
                <h3 key={link.href} className="text-base font-semibold">
                  <Link href={link.href} className="hover:text-black/70">
                    {link.label}
                  </Link>
                </h3>
              ))}
            </div>
            <div className="space-y-3">
              {config.nokMobile.map((link) => (
                <h3 key={link.href} className="text-base font-semibold">
                  <Link href={link.href} className="hover:text-black/70">
                    {link.label}
                  </Link>
                </h3>
              ))}
            </div>
          </div>

          <div className="space-y-8 border-black/20 lg:border-l lg:pl-8">
            <div className="space-y-3">
              <h3 className="text-base font-semibold">{config.mobile.title}</h3>
              <p className="text-sm text-black/80">{config.mobile.description}</p>
              <div className="grid grid-cols-3 gap-2">
                {config.mobile.downloads.map((download) => (
                  <Link
                    key={download.href}
                    href={download.href}
                    className="rounded-lg border border-black/20 bg-white/70 px-2 py-2 text-center text-[11px] font-semibold uppercase tracking-wide text-black shadow-sm hover:bg-white"
                  >
                    {download.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-base font-semibold">ติดตามเราได้ที่</h3>
              <div className="flex flex-wrap gap-3">
                {config.mobile.socials.map((social) => (
                  <Link
                    key={social.href}
                    href={social.href}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-lg font-semibold text-slate-900 shadow-sm hover:bg-slate-100"
                  >
                    <span className="sr-only">{social.label}</span>
                    {social.label === "Facebook" && "f"}
                    {social.label === "X" && "𝕏"}
                    {social.label === "YouTube" && "▶"}
                    {social.label === "LINE" && "LINE"}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-black/20 pt-4 text-sm text-black/80">
          <div className="flex flex-wrap gap-x-3 gap-y-2">
            {config.legal.map((link, index) => (
              <span key={link.href} className="flex items-center gap-3">
                <Link href={link.href} className="hover:text-black/70">
                  {link.label}
                </Link>
                {index < config.legal.length - 1 && (
                  <span className="hidden h-4 w-px bg-black/40 sm:inline-flex" aria-hidden />
                )}
              </span>
            ))}
            <span className="text-black/80">{config.copyright}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
