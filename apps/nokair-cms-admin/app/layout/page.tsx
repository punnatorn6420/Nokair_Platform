// app/layout/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  fetchSiteLayout,
  saveSiteLayout,
  type SectionBlock,
  type SiteLayoutConfig,
} from "@/lib/cms";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const sectionTemplates: Record<string, () => SectionBlock> = {
  hero: () => ({
    id: crypto.randomUUID(),
    type: "hero",
    content: {
      title: "หัวข้อ Hero",
      subtitle: "คำอธิบายสั้น ๆ",
      image: "",
      actions: [
        { label: "จองเที่ยวบิน", href: "/booking" },
        { label: "ดูโปรโมชั่น", href: "/promo" },
      ],
    },
  }),
  promo_grid: () => ({
    id: crypto.randomUUID(),
    type: "promo_grid",
    content: {
      title: "โปรโมชั่น",
      description: "คำอธิบาย",
      items: [
        { title: "ตัวอย่าง", description: "รายละเอียดโปรโมชั่น", badge: "ใหม่" },
      ],
    },
  }),
  rich_text: () => ({
    id: crypto.randomUUID(),
    type: "rich_text",
    content: {
      title: "เนื้อหา",
      body: "<p>เนื้อหาที่ต้องการแสดงผล</p>",
    },
  }),
};

function SectionEditor({
  section,
  onChange,
  onRemove,
}: {
  section: SectionBlock;
  onChange: (value: SectionBlock) => void;
  onRemove: () => void;
}) {
  const [contentDraft, setContentDraft] = useState(
    JSON.stringify(section.content, null, 2)
  );
  const [parseError, setParseError] = useState<string | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setContentDraft(JSON.stringify(section.content, null, 2));
  }, [section.content]);

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Section Type</Label>
          <Input
            value={section.type}
            onChange={(e) => onChange({ ...section, type: e.target.value })}
            placeholder="เช่น hero, promo_grid"
          />
        </div>
        <div className="space-y-2">
          <Label>Variant (ถ้ามี)</Label>
          <Input
            value={section.variant ?? ""}
            onChange={(e) =>
              onChange({ ...section, variant: e.target.value || undefined })
            }
            placeholder="เช่น dark, compact"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Content (JSON)</Label>
        <Textarea
          rows={12}
          value={contentDraft}
          onChange={(e) => setContentDraft(e.target.value)}
          className="font-mono text-xs"
        />
        <p className="text-xs text-slate-500">
          ปรับเนื้อหาเป็น JSON เพื่อให้ Web ฝั่งหน้าเว็บนำไป render ได้หลากหลาย
        </p>
        {parseError && <p className="text-xs text-red-600">{parseError}</p>}
      </div>

      <div className="flex justify-between gap-3">
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            try {
              const parsed = JSON.parse(contentDraft);
              onChange({ ...section, content: parsed });
              setParseError(null);
            } catch (err) {
              console.error(err);
              setParseError("JSON ไม่ถูกต้อง ตรวจสอบรูปแบบอีกครั้ง");
            }
          }}
        >
          Apply Content
        </Button>
        <Button type="button" variant="destructive" onClick={onRemove}>
          ลบ Section
        </Button>
      </div>
    </div>
  );
}

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

  const sections = useMemo(() => layout?.homepage.sections ?? [], [layout]);

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
        <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-600">กำลังโหลด layout...</p>
        </div>
      </div>
    );
  }

  const { header, footer } = layout;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h1 className="text-xl font-semibold text-slate-900 mb-1">
            Site Layout Settings
          </h1>
          <p className="text-sm text-slate-600 mb-6">
            ปรับโครงสร้างหน้าเว็บให้ dynamic ด้วย JSON block ที่ CMS จัดการได้
          </p>

          <form onSubmit={handleSave} className="space-y-8">
            {/* Header CTA */}
            <section className="space-y-4">
              <h2 className="text-sm font-semibold text-slate-800">
                Header CTA Button
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
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
              </div>
            </section>

            {/* Homepage Sections */}
            <section className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-sm font-semibold text-slate-800">
                  Homepage Sections (Dynamic JSON Blocks)
                </h2>
                <div className="flex gap-2">
                  {Object.keys(sectionTemplates).map((type) => (
                    <Button
                      key={type}
                      type="button"
                      variant="secondary"
                      onClick={() =>
                        setLayout({
                          ...layout,
                          homepage: {
                            sections: [...sections, sectionTemplates[type]()],
                          },
                        })
                      }
                    >
                      + {type}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {sections.map((section) => (
                  <SectionEditor
                    key={section.id}
                    section={section}
                    onChange={(updated) =>
                      setLayout({
                        ...layout,
                        homepage: {
                          sections: sections.map((s) =>
                            s.id === section.id ? updated : s
                          ),
                        },
                      })
                    }
                    onRemove={() =>
                      setLayout({
                        ...layout,
                        homepage: {
                          sections: sections.filter((s) => s.id !== section.id),
                        },
                      })
                    }
                  />
                ))}

                {!sections.length && (
                  <p className="text-sm text-slate-600">
                    ยังไม่มี section ในหน้าแรก กดปุ่มด้านบนเพื่อสร้าง block ใหม่
                  </p>
                )}
              </div>
            </section>

            {/* Footer */}
            <section className="space-y-2">
              <h2 className="text-sm font-semibold text-slate-800">Footer</h2>
              <Label htmlFor="copyright">Copyright</Label>
              <Input
                id="copyright"
                value={footer.copyright}
                onChange={(e) =>
                  setLayout({
                    ...layout,
                    footer: { ...footer, copyright: e.target.value },
                  })
                }
              />
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
    </div>
  );
}
