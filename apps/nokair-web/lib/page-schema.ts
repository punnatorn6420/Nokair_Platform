export type TailwindClassName = string;

export type ComponentType = "hero" | "card" | "button" | "badge" | "navigation";

export type ComponentProps = {
  title?: string;
  description?: string;
  label?: string;
  href?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
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

export function createDefaultSchema(route: string): PageSchema {
  return {
    route,
    layout: "stack",
    background: "bg-muted/30",
    components: [
      {
        id: "hero",
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

export function ensureSchemaRoute(schema: PageSchema, route: string): PageSchema {
  return {
    ...schema,
    route,
  };
}
