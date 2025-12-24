import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const highlightCards = [
  {
    title: "Nok Deal ทุกวัน",
    description: "ดีลราคาพิเศษสำหรับเส้นทางยอดนิยมพร้อมบินทันที",
  },
  {
    title: "เส้นทางภายในประเทศ",
    description: "เชื่อมต่อทั่วไทยกับเที่ยวบินตรงและต่อเครื่องสะดวกสบาย",
  },
  {
    title: "บริการเพิ่มเติม",
    description: "เลือกอาหาร ที่นั่ง และน้ำหนักสัมภาระล่วงหน้าได้ง่าย",
  },
];

const dealCards = [
  {
    route: "กรุงเทพฯ (ดอนเมือง) → เชียงใหม่",
    price: "1,290",
    detail: "เริ่มต้นต่อเที่ยว พร้อมโหลดกระเป๋า 7 กก.",
  },
  {
    route: "กรุงเทพฯ (ดอนเมือง) → ภูเก็ต",
    price: "1,490",
    detail: "ดีลพิเศษเฉพาะสมาชิก Nok Fan Club",
  },
  {
    route: "กรุงเทพฯ (ดอนเมือง) → หาดใหญ่",
    price: "1,150",
    detail: "รวมส่วนลดบัตรเครดิตและคะแนนสะสม",
  },
];

const destinationCards = [
  {
    city: "เชียงใหม่",
    subtitle: "ภูเขา คาเฟ่ และวัฒนธรรมเหนือ",
    highlight: "โปรสัปดาห์นี้",
  },
  {
    city: "ภูเก็ต",
    subtitle: "ทะเลสีฟ้าและรีสอร์ตครบครัน",
    highlight: "บินตรงทุกวัน",
  },
  {
    city: "กระบี่",
    subtitle: "หาดสวย น้ำใส และกิจกรรมผจญภัย",
    highlight: "ที่นั่งเหลือน้อย",
  },
  {
    city: "อุดรธานี",
    subtitle: "เมืองแห่งธรรมชาติและอาหารอีสาน",
    highlight: "เที่ยวคุ้มค่า",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-200 px-6 py-12 md:px-10 md:py-16">
        <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-yellow-200/70 blur-3xl" />
        <div className="absolute -bottom-24 left-16 h-56 w-56 rounded-full bg-yellow-100/80 blur-3xl" />
        <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="space-y-6">
            <Badge className="w-fit bg-white/90 text-yellow-900 shadow">โปรโมชั่นหน้าฝน</Badge>
            <div className="space-y-3">
              <h1 className="text-3xl font-semibold tracking-tight text-yellow-950 md:text-4xl lg:text-5xl">
                บินสนุกกับ Nok Air จองง่าย โปรโมชั่นแรงเหมือนหน้าแรก nokair.com
              </h1>
              <p className="text-base text-yellow-900/90 md:text-lg">
                จองตั๋วเครื่องบินภายในประเทศ เช็คอิน จัดการเที่ยวบิน และรับดีลพิเศษในที่เดียว
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button className="rounded-full bg-black text-white hover:bg-black/90">
                จองเที่ยวบิน
              </Button>
              <Button
                variant="outline"
                className="rounded-full border-yellow-900/30 bg-white/80 text-yellow-900 hover:bg-white"
              >
                เช็คอินออนไลน์
              </Button>
              <Button
                variant="ghost"
                className="rounded-full text-yellow-900 hover:bg-yellow-100"
              >
                ตารางบิน
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {highlightCards.map((card) => (
                <div key={card.title} className="rounded-2xl bg-white/70 p-4 shadow-sm">
                  <p className="text-sm font-semibold text-yellow-900">{card.title}</p>
                  <p className="mt-2 text-sm text-yellow-900/80">{card.description}</p>
                </div>
              ))}
            </div>
          </div>

          <Card className="border-yellow-100/70 bg-white/95 shadow-xl">
            <CardHeader className="space-y-2">
              <CardTitle className="text-xl text-slate-900">ค้นหาเที่ยวบิน</CardTitle>
              <CardDescription>กรอกข้อมูลเพื่อเริ่มการจอง</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-slate-700" htmlFor="origin">
                    ต้นทาง
                  </label>
                  <input
                    id="origin"
                    type="text"
                    placeholder="เช่น กรุงเทพฯ (ดอนเมือง)"
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-200"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-slate-700" htmlFor="destination">
                    ปลายทาง
                  </label>
                  <input
                    id="destination"
                    type="text"
                    placeholder="เช่น เชียงใหม่"
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-200"
                  />
                </div>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-slate-700" htmlFor="depart-date">
                    วันที่เดินทาง
                  </label>
                  <input
                    id="depart-date"
                    type="text"
                    placeholder="เลือกวันที่"
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-200"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-slate-700" htmlFor="return-date">
                    วันที่กลับ
                  </label>
                  <input
                    id="return-date"
                    type="text"
                    placeholder="(ถ้ามี)"
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-200"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium text-slate-700" htmlFor="passengers">
                  ผู้โดยสาร & ชั้นโดยสาร
                </label>
                <input
                  id="passengers"
                  type="text"
                  placeholder="ผู้ใหญ่ 1 คน · ชั้นประหยัด"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-200"
                />
              </div>
              <Button className="w-full rounded-lg bg-yellow-400 text-yellow-900 hover:bg-yellow-300">
                ค้นหาเที่ยวบิน
              </Button>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>รวมสัมภาระ 7 กก. ฟรี</span>
                <Link href="#" className="font-medium text-yellow-800 hover:underline">
                  ดูรายละเอียดเงื่อนไข
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="space-y-4">
          <Badge className="w-fit" variant="outline">
            Nok Fan Club
          </Badge>
          <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">
            สมัครสมาชิกเพื่อรับส่วนลดและสิทธิพิเศษ
          </h2>
          <p className="text-slate-600">
            สะสมคะแนน Nok Point แลกรับตั๋วเครื่องบิน อัปเกรดที่นั่ง และรับข่าวสารดีลพิเศษก่อนใคร
          </p>
          <div className="flex flex-wrap gap-3">
            <Button className="rounded-full bg-slate-900 text-white hover:bg-slate-800">
              สมัครสมาชิก
            </Button>
            <Button variant="outline" className="rounded-full">
              ดูสิทธิประโยชน์
            </Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {dealCards.map((deal) => (
            <Card key={deal.route} className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-base text-slate-900">{deal.route}</CardTitle>
                <CardDescription>{deal.detail}</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase text-slate-500">เริ่มต้น</p>
                  <p className="text-2xl font-semibold text-slate-900">฿{deal.price}</p>
                </div>
                <Button size="sm" className="rounded-full">
                  จองเลย
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">
              จุดหมายปลายทางยอดนิยม
            </h2>
            <p className="text-slate-600">เลือกเมืองที่คุณอยากไปและดูโปรล่าสุด</p>
          </div>
          <Button variant="outline" className="rounded-full">
            ดูเส้นทางทั้งหมด
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {destinationCards.map((destination) => (
            <Card
              key={destination.city}
              className="group overflow-hidden border border-slate-200/80 bg-white"
            >
              <div className="relative h-36 bg-gradient-to-br from-slate-200 via-slate-100 to-white">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.3),transparent_60%)]" />
                <span className="absolute left-4 top-4 rounded-full bg-yellow-400 px-3 py-1 text-xs font-semibold text-yellow-900">
                  {destination.highlight}
                </span>
              </div>
              <CardHeader className="space-y-1">
                <CardTitle className="text-lg text-slate-900">{destination.city}</CardTitle>
                <CardDescription>{destination.subtitle}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-yellow-700 hover:text-yellow-600"
                >
                  ดูโปรโมชั่น
                  <span aria-hidden>→</span>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
        <Card className="border-slate-200/80">
          <CardHeader>
            <CardTitle className="text-xl text-slate-900">จัดการการเดินทางได้ในแอป</CardTitle>
            <CardDescription>
              เช็คอินออนไลน์ ติดตามเที่ยวบิน และรับการแจ้งเตือนแบบเรียลไทม์
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 md:grid-cols-2">
              {[
                "เช็คอินและบอร์ดดิ้งพาสในมือถือ",
                "รับแจ้งเตือนเปลี่ยนแปลงเที่ยวบิน",
                "ชำระเงินและเพิ่มบริการเสริมได้ทันที",
                "สะสม Nok Points อัตโนมัติ",
              ].map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex size-5 items-center justify-center rounded-full bg-yellow-100 text-yellow-700">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="size-3">
                      <path
                        fillRule="evenodd"
                        d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.25 7.3a1 1 0 0 1-1.42.01l-3.25-3.2a1 1 0 1 1 1.4-1.43l2.54 2.5 6.54-6.59a1 1 0 0 1 1.414-.004Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <p className="text-sm text-slate-600">{feature}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button className="rounded-full">ดาวน์โหลดแอป</Button>
              <Button variant="outline" className="rounded-full">
                วิธีใช้งาน
              </Button>
            </div>
          </CardContent>
        </Card>
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-10 text-white">
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-yellow-400/30 blur-3xl" />
          <div className="relative space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-300">
              Nok Air Mobile
            </p>
            <h3 className="text-2xl font-semibold">จองตั๋ว จัดการเที่ยวบิน ครบจบในมือถือ</h3>
            <p className="text-sm text-slate-200">
              แอปเดียวที่รวมโปรโมชันล่าสุดและบริการพิเศษสำหรับสมาชิก
            </p>
            <div className="rounded-3xl border border-white/20 bg-white/10 p-6">
              <div className="space-y-4">
                <div className="h-3 w-24 rounded-full bg-white/40" />
                <div className="h-32 rounded-2xl bg-white/20" />
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-16 rounded-2xl bg-white/10" />
                  <div className="h-16 rounded-2xl bg-white/10" />
                </div>
              </div>
            </div>
            <Button className="rounded-full bg-yellow-400 text-yellow-900 hover:bg-yellow-300">
              รับลิงก์ดาวน์โหลด
            </Button>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-slate-50 px-6 py-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]">
          <div className="space-y-3">
            <Badge className="w-fit bg-yellow-400 text-yellow-900">ศูนย์บริการลูกค้า</Badge>
            <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">
              ต้องการความช่วยเหลือเพิ่มเติมใช่ไหม
            </h2>
            <p className="text-slate-600">
              ศูนย์บริการ Nok Air พร้อมดูแลตลอด 24 ชั่วโมง ทั้งการเปลี่ยนเที่ยวบินและขอคืนเงิน
            </p>
          </div>
          <div className="grid gap-3">
            {[
              "ติดตามสถานะเที่ยวบินแบบเรียลไทม์",
              "เพิ่มบริการเสริมและเปลี่ยนแปลงการจอง",
              "สอบถามผ่าน Live Chat หรือ Call Center",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
                <span className="inline-flex size-10 items-center justify-center rounded-full bg-yellow-100 text-yellow-700">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
                    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8Z" />
                    <path d="M12 6a1 1 0 0 0-1 1v5.2a1 1 0 0 0 .3.71l2.5 2.5a1 1 0 0 0 1.4-1.42l-2.2-2.2V7a1 1 0 0 0-1-1Z" />
                  </svg>
                </span>
                <p className="text-sm text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
