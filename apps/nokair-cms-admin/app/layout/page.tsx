// app/layout/page.tsx
"use client";

import { useEffect, useState } from "react";
import {
  fetchSiteLayout,
  saveSiteLayout,
  type SiteLayoutConfig,
} from "@/lib/cms";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function LayoutSettingsPage() {
  const [layout, setLayout] = useState<SiteLayoutConfig | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await fetchSiteLayout();
        if (!cancelled) {
          setLayout(data);
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          setError("โหลด layout ไม่สำเร็จ");
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!layout) return;

    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      await saveSiteLayout(layout);
      setSuccess("บันทึกสำเร็จ");
    } catch (err) {
      console.error(err);
      setError("บันทึกไม่สำเร็จ");
    } finally {
      setSaving(false);
    }
  }

  if (!layout) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-8">
        <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-600">กำลังโหลด layout...</p>
        </div>
      </div>
    );
  }

  const { homepage, header } = layout;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-slate-900 mb-1">
          Site Layout Settings
        </h1>
        <p className="text-sm text-slate-600 mb-6">
          แก้ไขเนื้อหาหน้าแรก และปุ่ม CTA บน Header ของเว็บไซต์ Nok Air
        </p>

        <form onSubmit={handleSave} className="space-y-8">
          {/* Homepage hero */}
          <section className="space-y-4">
            <h2 className="text-sm font-semibold text-slate-800">
              Homepage Hero
            </h2>

            <div className="space-y-2">
              <Label htmlFor="heroTitle">หัวข้อใหญ่ (Hero Title)</Label>
              <Input
                id="heroTitle"
                value={homepage.heroTitle}
                onChange={(e) =>
                  setLayout({
                    ...layout,
                    homepage: {
                      ...homepage,
                      heroTitle: e.target.value,
                    },
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="heroSubtitle">คำอธิบาย (Hero Subtitle)</Label>
              <Textarea
                id="heroSubtitle"
                rows={3}
                value={homepage.heroSubtitle}
                onChange={(e) =>
                  setLayout({
                    ...layout,
                    homepage: {
                      ...homepage,
                      heroSubtitle: e.target.value,
                    },
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="heroImage">Hero Image URL</Label>
              <Input
                id="heroImage"
                value={homepage.heroImage ?? ""}
                onChange={(e) =>
                  setLayout({
                    ...layout,
                    homepage: {
                      ...homepage,
                      heroImage: e.target.value || undefined,
                    },
                  })
                }
              />
            </div>
          </section>

          {/* Header CTA */}
          <section className="space-y-4">
            <h2 className="text-sm font-semibold text-slate-800">
              Header CTA Button
            </h2>

            <div className="space-y-2">
              <Label htmlFor="ctaLabel">ปุ่ม CTA (Label)</Label>
              <Input
                id="ctaLabel"
                value={header.cta?.label ?? ""}
                onChange={(e) =>
                  setLayout({
                    ...layout,
                    header: {
                      ...header,
                      cta: {
                        label: e.target.value,
                        href: header.cta?.href ?? "/login",
                      },
                    },
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ctaHref">ลิงก์ CTA (Href)</Label>
              <Input
                id="ctaHref"
                value={header.cta?.href ?? ""}
                onChange={(e) =>
                  setLayout({
                    ...layout,
                    header: {
                      ...header,
                      cta: {
                        label: header.cta?.label ?? "เข้าสู่ระบบ",
                        href: e.target.value,
                      },
                    },
                  })
                }
              />
            </div>
          </section>

          {/* Status */}
          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && <p className="text-sm text-emerald-600">{success}</p>}

          <div className="flex justify-end">
            <Button type="submit" disabled={saving} className="min-w-30">
              {saving ? "กำลังบันทึก..." : "บันทึกการเปลี่ยนแปลง"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
