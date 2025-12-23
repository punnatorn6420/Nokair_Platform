// app/page.tsx
import { getSiteLayout } from "@/lib/cms-client";
import { type SectionBlock } from "@/lib/site-layout";
import Link from "next/link";

function HeroSection({ section }: { section: SectionBlock }) {
  const content = section.content as {
    title?: string;
    subtitle?: string;
    image?: string;
    actions?: { label: string; href: string }[];
  };

  return (
    <section className="grid items-center gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
          {content.title}
        </h1>
        <p className="text-slate-600 md:text-lg">{content.subtitle}</p>

        <div className="flex flex-wrap gap-3 pt-2">
          {(content.actions ?? []).map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="rounded-full bg-yellow-400 px-5 py-2.5 text-sm font-semibold text-yellow-900 shadow-sm hover:bg-yellow-300"
            >
              {action.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="relative hidden md:block">
        {content.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={content.image}
            alt={content.title ?? "Hero"}
            className="w-full max-w-md mx-auto"
          />
        ) : (
          <div className="aspect-4/3 w-full max-w-md rounded-3xl border border-dashed border-yellow-300 bg-yellow-50/60 flex items-center justify-center text-sm text-yellow-700">
            Hero Image Placeholder
          </div>
        )}
      </div>
    </section>
  );
}

function PromoGridSection({ section }: { section: SectionBlock }) {
  const content = section.content as {
    title?: string;
    description?: string;
    items?: { title?: string; description?: string; badge?: string }[];
  };

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">{content.title}</h2>
        {content.description && (
          <p className="text-slate-600">{content.description}</p>
        )}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {(content.items ?? []).map((item, idx) => (
          <div
            key={`${item.title}-${idx}`}
            className="rounded-xl border border-slate-200 p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">
                {item.title}
              </h3>
              {item.badge && (
                <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800">
                  {item.badge}
                </span>
              )}
            </div>
            <p className="mt-2 text-sm text-slate-600">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function RichTextSection({ section }: { section: SectionBlock }) {
  const content = section.content as { title?: string; body?: string };
  return (
    <section className="space-y-2">
      {content.title && (
        <h2 className="text-2xl font-semibold text-slate-900">
          {content.title}
        </h2>
      )}
      {content.body && (
        <div
          className="prose prose-slate max-w-none"
          dangerouslySetInnerHTML={{ __html: content.body }}
        />
      )}
    </section>
  );
}

function SectionRenderer({ section }: { section: SectionBlock }) {
  switch (section.type) {
    case "hero":
      return <HeroSection section={section} />;
    case "promo_grid":
      return <PromoGridSection section={section} />;
    case "rich_text":
      return <RichTextSection section={section} />;
    default:
      return null;
  }
}

export default async function HomePage() {
  const { homepage } = await getSiteLayout();

  return (
    <div className="space-y-12">
      {homepage.sections.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </div>
  );
}
