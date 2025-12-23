export type TailwindClassName = string;

export type ComponentType = "hero" | "card" | "button" | "badge" | "navigation";

export type ComponentProps = {
  title?: string;
  description?: string;
  label?: string;
  href?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg";
  className?: string;
};

export type ComponentInstance = {
  id: string;
  type: ComponentType;
  props: ComponentProps;
};

export type PageSchema = {
  route: string;
  layout: "stack" | "section";
  background?: TailwindClassName;
  components: ComponentInstance[];
};

export function cloneSchema(schema: PageSchema): PageSchema {
  return JSON.parse(JSON.stringify(schema));
}

export function createDefaultSchema(route: string): PageSchema {
  return {
    route,
    layout: "stack",
    background: "bg-muted/30",
    components: [
      {
        id: crypto.randomUUID(),
        type: "hero",
        props: {
          title: "สร้าง Landing Page ได้ทันที",
          description: "ลากวาง component แล้วดู preview จริงแบบ realtime",
          label: "เริ่มต้น",
          className: "bg-white",
        },
      },
    ],
  } satisfies PageSchema;
}

export function ensureSchemaRoute(
  schema: PageSchema,
  route: string
): PageSchema {
  return {
    ...schema,
    route,
  };
}

export const presetSchemas: Record<string, PageSchema> = {
  homepage: {
    route: "homepage",
    layout: "stack",
    background: "bg-gradient-to-br from-yellow-50 via-white to-sky-50",
    components: [
      {
        id: "hero-1",
        type: "hero",
        props: {
          title: "จัดการเลย์เอาต์ Nok Air",
          description: "โหลด schema เดิมแล้วลาก component เพื่อจัดหน้าได้เลย",
          label: "บันทึกสคีมา",
          className: "bg-yellow-50",
        },
      },
      {
        id: "card-1",
        type: "card",
        props: {
          title: "Promo Block",
          description: "ใช้การ์ดเพื่อจัดเรียง content สั้น ๆ",
          className: "",
        },
      },
    ],
  },
};
