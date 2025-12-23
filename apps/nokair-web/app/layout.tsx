// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { getSiteLayout } from "@/lib/cms-client";

export const metadata: Metadata = {
  title: "Nok Air",
  description: "Nok Air official website prototype with CMS-powered layout.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { header, footer } = await getSiteLayout();

  return (
    <html lang="th">
      <body className="min-h-screen bg-white text-slate-900">
        <SiteHeader config={header} />
        <main className="mx-auto max-w-6xl px-4 pb-12 pt-6 md:px-6 md:pt-8">
          {children}
        </main>
        <SiteFooter config={footer} />
      </body>
    </html>
  );
}
