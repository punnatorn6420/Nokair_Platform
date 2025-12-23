"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

import { Badge, badgeVariants } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { renderComponent } from "@/components/page-renderer";
import {
  ComponentInstance,
  ComponentProps,
  ComponentType,
  PageSchema,
  TailwindClassName,
  cloneSchema,
  createDefaultSchema,
  ensureSchemaRoute,
  presetSchemas,
} from "@/lib/page-schema";
import { loadPageSchema, persistPageSchema } from "@/lib/schema-storage";
import { cn } from "@/lib/utils";
import {
  Blocks,
  CalendarDays,
  ChevronRight,
  CirclePlus,
  Component as ComponentIcon,
  GripVertical,
  Heading,
  MousePointer2,
  Palette,
  Sparkles,
} from "lucide-react";

type ComponentLibraryItem = {
  type: ComponentType;
  label: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  defaults: ComponentProps;
};

type SupportedComponent = {
  name: string;
  description: string;
  defaultProps?: Record<string, string>;
  defaultClassName: string;
};

const cardDefaultClassName =
  "rounded-xl border bg-card text-card-foreground shadow";
const navigationDefaultClassName = "relative z-10 flex justify-center";
const inputDefaultClassName = [
  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30",
  "border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none",
  "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
].join(" ");
const textareaDefaultClassName = [
  "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  "dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px]",
  "disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
].join(" ");
const avatarDefaultClassName =
  "relative flex size-10 shrink-0 overflow-hidden rounded-full border border-border";
const tabsListDefaultClassName =
  "inline-flex items-center justify-center gap-1 rounded-lg bg-muted p-1 text-muted-foreground";

const presetColorGroups = [
  {
    label: "พื้นหลัง (bg-*)",
    options: [
      { label: "White", value: "bg-white" },
      { label: "Muted", value: "bg-muted" },
      { label: "Yellow 50", value: "bg-yellow-50" },
      { label: "Sky 50", value: "bg-sky-50" },
      { label: "Slate 100", value: "bg-slate-100" },
      { label: "Yellow 400", value: "bg-yellow-400" },
    ],
  },
  {
    label: "ตัวอักษร (text-*)",
    options: [
      { label: "Foreground", value: "text-foreground" },
      { label: "Muted", value: "text-muted-foreground" },
      { label: "Slate 900", value: "text-slate-900" },
      { label: "Yellow 700", value: "text-yellow-700" },
      { label: "Sky 600", value: "text-sky-600" },
      { label: "White", value: "text-white" },
    ],
  },
  {
    label: "เส้นขอบ (border-*)",
    options: [
      { label: "Border default", value: "border" },
      { label: "Border Slate 200", value: "border border-slate-200" },
      { label: "Border Slate 300", value: "border border-slate-300" },
      { label: "Border Yellow 300", value: "border border-yellow-300" },
      { label: "Dotted Slate", value: "border border-dashed border-slate-200" },
      { label: "Transparent", value: "border border-transparent" },
    ],
  },
];

const supportedComponents: SupportedComponent[] = [
  {
    name: "Button",
    description: "ปุ่มกดแอคชันมาตรฐานพร้อม variant และ size",
    defaultProps: {
      variant: "default",
      size: "default",
    },
    defaultClassName: buttonVariants({ variant: "default", size: "default" }),
  },
  {
    name: "Badge",
    description: "ป้ายกำกับหรือแสดงสถานะ",
    defaultProps: {
      variant: "default",
    },
    defaultClassName: badgeVariants({ variant: "default" }),
  },
  {
    name: "Card",
    description: "คอนเทนเนอร์สำหรับเนื้อหาและข้อมูล",
    defaultClassName: cardDefaultClassName,
  },
  {
    name: "Input",
    description: "ฟิลด์กรอกข้อมูลเดี่ยว",
    defaultProps: {
      type: "text",
    },
    defaultClassName: inputDefaultClassName,
  },
  {
    name: "Textarea",
    description: "ฟิลด์กรอกข้อความหลายบรรทัด",
    defaultClassName: textareaDefaultClassName,
  },
  {
    name: "Avatar",
    description: "แสดงรูปโปรไฟล์หรือ fallback",
    defaultClassName: avatarDefaultClassName,
  },
  {
    name: "Navigation Menu",
    description: "เมนูนำทางแนวนอนแบบกลุ่ม",
    defaultClassName: navigationDefaultClassName,
  },
  {
    name: "Tabs List",
    description: "ส่วนควบคุมสำหรับเลือก tab ต่าง ๆ",
    defaultClassName: tabsListDefaultClassName,
  },
];

const componentLibrary: ComponentLibraryItem[] = [
  {
    type: "hero",
    label: "Hero",
    description: "หัวเรื่องพร้อมคำอธิบายสำหรับหน้าหลัก",
    icon: Heading,
    defaults: {
      title: "สร้าง Landing Page ได้ทันที",
      description: "ลากวาง component แล้วดู preview จริงแบบ realtime",
      label: "เริ่มต้น",
      className: "bg-gradient-to-r from-yellow-100 to-white",
    },
  },
  {
    type: "card",
    label: "Card",
    description: "บัตรข้อมูลพร้อมหัวข้อและรายละเอียด",
    icon: ComponentIcon,
    defaults: {
      title: "การ์ดใหม่",
      description: "เนื้อหารายละเอียด หรือคำอธิบายสั้น ๆ",
      className: cardDefaultClassName,
    },
  },
  {
    type: "button",
    label: "Button",
    description: "ปุ่มกดแอคชัน",
    icon: MousePointer2,
    defaults: {
      label: "Action",
      variant: "default",
      size: "default",
      className: buttonVariants({ variant: "default", size: "default" }),
    },
  },
  {
    type: "badge",
    label: "Badge",
    description: "แสดงสถานะหรือหมวดหมู่",
    icon: CalendarDays,
    defaults: {
      label: "New",
      variant: "default",
      className: badgeVariants({ variant: "default" }),
    },
  },
  {
    type: "navigation",
    label: "Navigation",
    description: "เมนูนำทางอย่างง่าย",
    icon: Blocks,
    defaults: {
      label: "เมนูหลัก",
      href: "#",
      className: navigationDefaultClassName,
    },
  },
];

function mergeClassNames(base: string | undefined, additions: string) {
  const existing = base?.split(/\s+/).filter(Boolean) ?? [];
  const incoming = additions.split(/\s+/).filter(Boolean);
  const merged = [...existing];

  incoming.forEach((utility) => {
    if (!merged.includes(utility)) {
      merged.push(utility);
    }
  });

  return merged.join(" ").trim();
}

function createInstance(type: ComponentType): ComponentInstance {
  const libraryItem = componentLibrary.find((item) => item.type === type);
  return {
    id: crypto.randomUUID(),
    type,
    props: libraryItem?.defaults ? { ...libraryItem.defaults } : {},
  };
}

const pageBackgroundPresets: {
  label: string;
  options: { label: string; value: TailwindClassName }[];
}[] = [
  {
    label: "Tailwind colors",
    options: [
      { label: "Muted", value: "bg-muted/30" },
      { label: "White", value: "bg-white" },
      { label: "Slate 50", value: "bg-slate-50" },
      { label: "Zinc 100", value: "bg-zinc-100" },
    ],
  },
  {
    label: "Gradients",
    options: [
      {
        label: "Sunrise",
        value: "bg-gradient-to-b from-yellow-50 via-white to-sky-50",
      },
      {
        label: "Skyline",
        value: "bg-gradient-to-br from-sky-50 via-white to-blue-50",
      },
      {
        label: "Warm glow",
        value: "bg-gradient-to-br from-amber-50 via-white to-orange-50",
      },
      {
        label: "Muted glass",
        value: "bg-gradient-to-b from-muted/50 via-white to-muted/40",
      },
    ],
  },
];

function PropertiesPanel({
  component,
  onChange,
}: {
  component?: ComponentInstance;
  onChange: (props: ComponentProps) => void;
}) {
  if (!component) {
    return (
      <div className="rounded-xl border bg-muted/30 p-4 text-sm text-muted-foreground">
        เลือก component บน Canvas เพื่อแก้ไข properties
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        <Sparkles className="h-4 w-4" />
        Properties
      </div>

      {component.type !== "button" && (
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={component.props.title ?? ""}
            onChange={(event) =>
              onChange({ ...component.props, title: event.target.value })
            }
            placeholder="ใส่หัวข้อ"
          />
        </div>
      )}

      {(component.type === "hero" || component.type === "card") && (
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            value={component.props.description ?? ""}
            onChange={(event) =>
              onChange({ ...component.props, description: event.target.value })
            }
            placeholder="รายละเอียดหรือคำอธิบาย"
          />
        </div>
      )}

      {(component.type === "button" || component.type === "badge") && (
        <div className="space-y-2">
          <Label htmlFor="label">Label</Label>
          <Input
            id="label"
            value={component.props.label ?? ""}
            onChange={(event) =>
              onChange({ ...component.props, label: event.target.value })
            }
            placeholder="ข้อความบน component"
          />
        </div>
      )}

      {component.type === "navigation" && (
        <div className="space-y-2">
          <Label htmlFor="navLabel">Label</Label>
          <Input
            id="navLabel"
            value={component.props.label ?? ""}
            onChange={(event) =>
              onChange({ ...component.props, label: event.target.value })
            }
          />
          <Label htmlFor="navHref">Href</Label>
          <Input
            id="navHref"
            value={component.props.href ?? ""}
            onChange={(event) =>
              onChange({ ...component.props, href: event.target.value })
            }
          />
        </div>
      )}

      {component.type === "button" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Variant</Label>
            <Select
              value={component.props.variant ?? "default"}
              onValueChange={(value) =>
                onChange({
                  ...component.props,
                  variant: value as ComponentProps["variant"],
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="เลือก variant" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="secondary">Secondary</SelectItem>
                <SelectItem value="outline">Outline</SelectItem>
                <SelectItem value="destructive">Destructive</SelectItem>
                <SelectItem value="ghost">Ghost</SelectItem>
                <SelectItem value="link">Link</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Size</Label>
            <Select
              value={(component.props as { size?: string }).size ?? "default"}
              onValueChange={(value) =>
                onChange({
                  ...component.props,
                  size: value as ComponentProps["size"],
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="เลือก size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="sm">Small</SelectItem>
                <SelectItem value="lg">Large</SelectItem>
                <SelectItem value="icon">Icon</SelectItem>
                <SelectItem value="icon-sm">Icon Small</SelectItem>
                <SelectItem value="icon-lg">Icon Large</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {component.type === "badge" && (
        <div className="space-y-2">
          <Label>Variant</Label>
          <Select
            value={
              (component.props as { variant?: string }).variant ?? "default"
            }
            onValueChange={(value) =>
              onChange({
                ...component.props,
                variant: value as ComponentProps["variant"],
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="เลือก variant" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="secondary">Secondary</SelectItem>
              <SelectItem value="outline">Outline</SelectItem>
              <SelectItem value="destructive">Destructive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="className">className</Label>
        <Input
          id="className"
          value={component.props.className ?? ""}
          onChange={(event) =>
            onChange({ ...component.props, className: event.target.value })
          }
          placeholder="เพิ่ม utility class"
        />
        <p className="text-xs text-muted-foreground">
          className จะถูก merge ด้วย cn(...) กับ style ของ component
        </p>
      </div>

      <div className="space-y-3 rounded-lg border bg-muted/20 p-3">
        <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Tailwind color presets
        </div>

        {presetColorGroups.map((group) => (
          <div key={group.label} className="space-y-2">
            <Label>{group.label}</Label>
            <Select
              onValueChange={(value) =>
                onChange({
                  ...component.props,
                  className: mergeClassNames(component.props.className, value),
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="เลือกสี" />
              </SelectTrigger>
              <SelectContent>
                {group.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <span className="flex items-center justify-between gap-2">
                      <span>{option.label}</span>
                      <span
                        className={cn(
                          "h-5 w-10 rounded border border-border text-[10px]",
                          option.value
                        )}
                      />
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BuilderPage({ params }: { params: { route: string } }) {
  const [canvasSchema, setCanvasSchema] = useState<PageSchema>(() =>
    ensureSchemaRoute(
      cloneSchema(
        presetSchemas[params.route] ?? createDefaultSchema(params.route)
      ),
      params.route
    )
  );
  const [selectedComponentId, setSelectedComponentId] = useState<
    string | undefined
  >(canvasSchema.components[0]?.id);
  const [pendingType, setPendingType] = useState<ComponentType>(
    componentLibrary[0].type
  );
  const [loadedRoute, setLoadedRoute] = useState<string | null>(null);
  const [saveState, setSaveState] = useState<
    "idle" | "saving" | "success" | "error"
  >("idle");
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const isLoading = loadedRoute !== params.route;

  useEffect(() => {
    let mounted = true;
    loadPageSchema(params.route)
      .then((storedSchema) => {
        if (!mounted) return;

        const fallback = ensureSchemaRoute(
          cloneSchema(
            presetSchemas[params.route] ?? createDefaultSchema(params.route)
          ),
          params.route
        );

        const normalized = storedSchema
          ? ensureSchemaRoute(storedSchema, params.route)
          : fallback;

        setCanvasSchema(normalized);
        setSelectedComponentId(normalized.components[0]?.id);
      })
      .finally(() => {
        if (mounted) setLoadedRoute(params.route);
      });

    return () => {
      mounted = false;
    };
  }, [params.route]);

  const selectedComponent = canvasSchema.components.find(
    (component) => component.id === selectedComponentId
  );

  const handleSave = async () => {
    setSaveState("saving");
    setSaveMessage(null);

    try {
      const schemaToSave = ensureSchemaRoute(canvasSchema, params.route);
      const target = await persistPageSchema(params.route, schemaToSave);
      setSaveState("success");
      setSaveMessage(
        target === "api"
          ? "บันทึกเรียบร้อยแล้ว (backend)"
          : "บันทึกลง local storage แล้ว"
      );
    } catch (error) {
      console.error(error);
      setSaveState("error");
      setSaveMessage("บันทึกไม่สำเร็จ ลองใหม่อีกครั้ง");
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const type = event.dataTransfer.getData("component/type") as ComponentType;
    if (!type) return;
    addComponent(type);
  };

  const addComponent = (type: ComponentType) => {
    setCanvasSchema((prev) => ({
      ...prev,
      components: [...prev.components, createInstance(type)],
    }));
  };

  const updateBackground = (value?: TailwindClassName) => {
    setCanvasSchema((prev) => ({
      ...prev,
      background: value,
    }));
  };

  const updateComponent = (id: string, props: ComponentProps) => {
    setCanvasSchema((prev) => ({
      ...prev,
      components: prev.components.map((component) =>
        component.id === id ? { ...component, props } : component
      ),
    }));
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-zinc-50 via-white to-zinc-50">
      <div className="mx-auto max-w-350 space-y-6 px-6 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Palette className="h-4 w-4" />
              Builder
              <ChevronRight className="h-4 w-4" />
              <span className="font-medium text-foreground">
                /{params.route}
              </span>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Page Builder
            </h1>
            <p className="text-sm text-muted-foreground">
              โหลด schema เดิมถ้ามี แล้วลองลาก component จาก Library หรือกด Add
              เพื่อ append
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 text-right">
            <div className="flex flex-wrap items-center justify-end gap-2">
              <Badge variant="secondary" className="rounded-full">
                Layout: {canvasSchema.layout}
              </Badge>
              {isLoading && (
                <Badge variant="outline" className="rounded-full">
                  กำลังโหลด schema...
                </Badge>
              )}
              {saveMessage && (
                <Badge
                  variant={saveState === "error" ? "destructive" : "outline"}
                  className="rounded-full"
                >
                  {saveMessage}
                </Badge>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSave}
                disabled={isLoading || saveState === "saving"}
              >
                {saveState === "saving" ? "กำลังบันทึก..." : "บันทึกสคีมา"}
              </Button>
              <Button variant="secondary" size="sm" asChild>
                <Link
                  href={`/pages/${params.route}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Preview
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link
                  href={`/pages/${params.route}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Publish
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
          <div className="space-y-4">
            <Card className="border-dashed">
              <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-4">
                <Sparkles className="h-4 w-4 text-muted-foreground" />
                <div>
                  <CardTitle className="text-base">Page background</CardTitle>
                  <CardDescription>
                    เลือกสีพื้นหลังหรือ gradient
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {pageBackgroundPresets.map((group) => (
                  <div key={group.label} className="space-y-2">
                    <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {group.label}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {group.options.map((option) => {
                        const isActive =
                          canvasSchema.background === option.value;

                        return (
                          <button
                            key={option.value}
                            type="button"
                            className={cn(
                              "group relative rounded-lg border bg-white p-2 text-left transition hover:border-foreground/30",
                              isActive && "border-foreground shadow-sm"
                            )}
                            onClick={() => updateBackground(option.value)}
                          >
                            <div
                              className={cn(
                                "h-14 w-full rounded-md border border-border text-xs",
                                option.value
                              )}
                            />
                            <div className="mt-2 text-sm font-medium text-foreground">
                              {option.label}
                            </div>
                            <div className="text-[11px] text-muted-foreground">
                              {option.value}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full"
                  onClick={() => updateBackground(undefined)}
                >
                  ล้างค่า background
                </Button>
              </CardContent>
            </Card>

            <Card className="border-dashed">
              <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-4">
                <CirclePlus className="h-4 w-4 text-muted-foreground" />
                <div>
                  <CardTitle className="text-base">Component Library</CardTitle>
                  <CardDescription>
                    ลาก component เพื่อวางบน Canvas
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {componentLibrary.map((item) => (
                  <button
                    key={item.type}
                    type="button"
                    className="flex w-full items-start gap-3 rounded-lg border border-dashed bg-white p-3 text-left transition hover:border-foreground/30"
                    draggable
                    onDragStart={(event) =>
                      event.dataTransfer.setData("component/type", item.type)
                    }
                    onClick={() => {
                      addComponent(item.type);
                      setSelectedComponentId(undefined);
                    }}
                  >
                    <div className="rounded-md bg-muted p-2">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{item.label}</span>
                        <Badge
                          variant="secondary"
                          className="rounded-full text-[10px]"
                        >
                          drag
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            <Card className="border-dashed">
              <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-4">
                <Palette className="h-4 w-4 text-muted-foreground" />
                <div>
                  <CardTitle className="text-base">Properties</CardTitle>
                  <CardDescription>
                    แก้ไข props ของ component ที่เลือก
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <PropertiesPanel
                  component={selectedComponent}
                  onChange={(props) =>
                    selectedComponent &&
                    updateComponent(selectedComponent.id, props)
                  }
                />
              </CardContent>
            </Card>

            <Card className="border-dashed">
              <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-4">
                <ComponentIcon className="h-4 w-4 text-muted-foreground" />
                <div>
                  <CardTitle className="text-base">
                    Supported UI Components
                  </CardTitle>
                  <CardDescription>
                    default props และ className จาก design system
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {supportedComponents.map((component) => (
                  <div
                    key={component.name}
                    className="space-y-2 rounded-lg border bg-white p-3 text-sm shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="font-medium text-foreground">
                          {component.name}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {component.description}
                        </p>
                      </div>
                      <Badge
                        variant="secondary"
                        className="rounded-full text-[10px]"
                      >
                        className
                      </Badge>
                    </div>

                    {component.defaultProps && (
                      <div className="flex flex-wrap gap-2 text-[11px]">
                        {Object.entries(component.defaultProps).map(
                          ([key, value]) => (
                            <Badge
                              key={key}
                              variant="outline"
                              className="rounded-full"
                            >
                              {key}: {value}
                            </Badge>
                          )
                        )}
                      </div>
                    )}

                    <div className="space-y-1 rounded-md bg-muted/40 p-3 font-mono text-xs">
                      <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
                        className pattern
                      </div>
                      <div className="break-all text-foreground">
                        {`className={cn("${component.defaultClassName}", className)}`}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div>
            <Tabs defaultValue="canvas">
              <TabsList className="mb-4">
                <TabsTrigger value="canvas">Canvas</TabsTrigger>
                <TabsTrigger value="schema">Schema</TabsTrigger>
              </TabsList>
              <TabsContent value="canvas">
                <Card className="border-dashed shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <GripVertical className="h-4 w-4" />
                      Canvas Preview
                    </div>
                    <div className="flex items-center gap-2">
                      <Select
                        value={pendingType}
                        onValueChange={(value) =>
                          setPendingType(value as ComponentType)
                        }
                      >
                        <SelectTrigger className="w-45">
                          <SelectValue placeholder="เลือก component" />
                        </SelectTrigger>
                        <SelectContent>
                          {componentLibrary.map((item) => (
                            <SelectItem key={item.type} value={item.type}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button onClick={() => addComponent(pendingType)}>
                        <CirclePlus className="mr-2 h-4 w-4" />
                        Add
                      </Button>
                    </div>
                  </CardHeader>
                  <Separator />
                  <CardContent>
                    <div
                      className={cn(
                        "flex min-h-115 flex-col gap-4 rounded-xl border border-dashed p-4",
                        canvasSchema.background ?? "bg-muted/30"
                      )}
                      onDragOver={(event) => event.preventDefault()}
                      onDrop={handleDrop}
                    >
                      {canvasSchema.components.length === 0 && (
                        <div className="flex flex-1 flex-col items-center justify-center gap-2 text-sm text-muted-foreground">
                          <MousePointer2 className="h-4 w-4" />
                          ลาก component มาวางหรือกด Add เพื่อเริ่มต้น
                        </div>
                      )}

                      {canvasSchema.components.map((component) => (
                        <button
                          key={component.id}
                          type="button"
                          className={cn(
                            "relative w-full rounded-xl border bg-white p-3 text-left shadow-sm transition hover:border-yellow-400",
                            selectedComponentId === component.id &&
                              "border-yellow-500 ring-2 ring-yellow-200"
                          )}
                          onClick={() => setSelectedComponentId(component.id)}
                        >
                          <div className="mb-3 flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Blocks className="h-4 w-4" />
                              {component.type}
                            </div>
                            <Badge variant="outline">
                              {component.props.className ? "custom" : "default"}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            {renderComponent(component)}
                          </div>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="schema">
                <Card className="border-dashed shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-base">Loaded Schema</CardTitle>
                    <CardDescription>
                      schema ถูกโหลดตาม route param:{" "}
                      <span className="font-semibold">{params.route}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-xs">
                      {JSON.stringify(canvasSchema, null, 2)}
                    </pre>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
