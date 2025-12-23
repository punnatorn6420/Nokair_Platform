// app/page.tsx
import { getSiteLayout } from "@/lib/cms-client";

export default async function HomePage() {
  const { homepage } = await getSiteLayout();

  return (
    <section className="grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-center">
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
          {homepage.heroTitle}
        </h1>
        <p className="text-slate-600 md:text-lg">{homepage.heroSubtitle}</p>

        <div className="flex flex-wrap gap-3 pt-2">
          <button className="rounded-full bg-yellow-400 px-5 py-2.5 text-sm font-semibold text-yellow-900 shadow-sm hover:bg-yellow-300">
            จองเที่ยวบินตอนนี้
          </button>
          <button className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:border-yellow-400 hover:text-yellow-700">
            ดูโปรโมชั่นทั้งหมด
          </button>
        </div>
      </div>

      <div className="relative hidden md:block">
        {homepage.heroImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={homepage.heroImage}
            alt="Nok Air hero"
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
