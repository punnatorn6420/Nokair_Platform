// components/layout/site-header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { HeaderConfig } from "@/lib/site-layout";

interface SiteHeaderProps {
  config: HeaderConfig;
}

export function SiteHeader({ config }: SiteHeaderProps) {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6 md:py-4">
        <div className="flex items-center gap-3">
          <Image
            src={config.logoSrc}
            alt={config.logoAlt}
            width={40}
            height={40}
            className="h-9 w-auto md:h-10"
            priority
          />
          <span className="hidden text-sm font-semibold text-slate-800 md:inline">
            Nok Air
          </span>
        </div>

        {/* Navigation */}
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex">
          {config.navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-yellow-600 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-2">
          {config.cta && (
            <Link
              href={config.cta.href}
              className="rounded-full bg-yellow-400 px-4 py-2 text-xs font-semibold text-yellow-900 shadow-sm hover:bg-yellow-300 md:text-sm"
            >
              {config.cta.label}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
