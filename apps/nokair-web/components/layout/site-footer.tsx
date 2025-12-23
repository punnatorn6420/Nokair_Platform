// components/layout/site-footer.tsx
import Link from "next/link";
import { FooterConfig } from "@/lib/site-layout";

interface SiteFooterProps {
  config: FooterConfig;
}

export function SiteFooter({ config }: SiteFooterProps) {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 mt-12">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {config.columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-slate-900 mb-3">
                {col.title}
              </h3>
              <ul className="space-y-2 text-sm text-slate-600">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="hover:text-yellow-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-slate-200 pt-4 text-xs text-slate-500">
          {config.copyright}
        </div>
      </div>
    </footer>
  );
}
