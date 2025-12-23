"use client";

import React, { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

type ComponentType = "hero" | "card" | "button" | "badge" | "navigation";

type ComponentProps = {
  title?: string;
  description?: string;
  label?: string;
  href?: string;
  variant?: string;
  className?: string;
};

type ComponentInstance = {
  id: string;
  type: ComponentType;
  props: ComponentProps;
};

type BuilderSchema = {
  layout: "stack" | "section";
  components: ComponentInstance[];
};

type ComponentLibraryItem = {
  type: ComponentType;
  label: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  defaults: ComponentProps;
};

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
      className: "",
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
      className: "",
    },
  },
  {
    type: "badge",
    label: "Badge",
    description: "แสดงสถานะหรือหมวดหมู่",
    icon: CalendarDays,
    defaults: {
      label: "New",
      className: "",
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
      className: "",
    },
  },
];

const presetSchemas: Record<string, BuilderSchema> = {
  homepage: {
    layout: "stack",
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

function cloneSchema(schema: BuilderSchema): BuilderSchema {
  return JSON.parse(JSON.stringify(schema));
}

function createInstance(type: ComponentType): ComponentInstance {
  const libraryItem = componentLibrary.find((item) => item.type === type);
  return {
    id: crypto.randomUUID(),
    type,
    props: libraryItem?.defaults ? { ...libraryItem.defaults } : {},
  };
}

function useSchema(route: string): BuilderSchema {
  return useMemo(() => {
    const preset = presetSchemas[route];
    if (preset) return cloneSchema(preset);
    return {
      layout: "stack",
      components: [createInstance("hero")],
    } satisfies BuilderSchema;
  }, [route]);
}

function HeroPreview({ component }: { component: ComponentInstance }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-dashed border-yellow-200 bg-white",
        component.props.className,
      )}
    >
      <div className="relative space-y-3 p-8">
        <Badge variant="outline" className="rounded-full border-yellow-300 text-yellow-800">
          {component.props.label ?? "Hero"}
        </Badge>
        <h2 className="text-2xl font-semibold tracking-tight">
          {component.props.title ?? "Hero Title"}
        </h2>
        <p className="text-sm text-muted-foreground">
          {component.props.description ?? "Hero description"}
        </p>
        <div className="flex items-center gap-2 pt-2">
          <Button size="sm">CTA</Button>
          <Button size="sm" variant="outline">
            Secondary
          </Button>
        </div>
      </div>
    </div>
  );
}

function CardPreview({ component }: { component: ComponentInstance }) {
  return (
    <Card className={cn("border-dashed shadow-none", component.props.className)}>
      <CardHeader>
        <CardTitle>{component.props.title ?? "Card"}</CardTitle>
        <CardDescription>
          {component.props.description ?? "รายละเอียดของการ์ด"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Badge variant="secondary">Info</Badge>
          <Badge variant="outline">Tag</Badge>
        </div>
      </CardContent>
    </Card>
  );
}

function ButtonPreview({ component }: { component: ComponentInstance }) {
  return (
    <Button variant={component.props.variant as "default" | "outline" | "secondary"}>
      {component.props.label ?? "Button"}
    </Button>
  );
}

function BadgePreview({ component }: { component: ComponentInstance }) {
  return <Badge className={cn(component.props.className)}>{component.props.label ?? "Badge"}</Badge>;
}

function NavigationPreview({ component }: { component: ComponentInstance }) {
  return (
    <NavigationMenu className={cn("justify-start", component.props.className)}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href={component.props.href ?? "#"}>
            {component.props.label ?? "เมนูหลัก"}
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#">Feature</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#">Docs</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function renderComponent(component: ComponentInstance) {
  switch (component.type) {
    case "hero":
      return <HeroPreview component={component} />;
    case "card":
      return <CardPreview component={component} />;
    case "button":
      return <ButtonPreview component={component} />;
    case "badge":
      return <BadgePreview component={component} />;
    case "navigation":
      return <NavigationPreview component={component} />;
    default:
      return null;
  }
}

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
            onChange={(event) => onChange({ ...component.props, title: event.target.value })}
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
            onChange={(event) => onChange({ ...component.props, label: event.target.value })}
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
            onChange={(event) => onChange({ ...component.props, label: event.target.value })}
          />
          <Label htmlFor="navHref">Href</Label>
          <Input
            id="navHref"
            value={component.props.href ?? ""}
            onChange={(event) => onChange({ ...component.props, href: event.target.value })}
          />
        </div>
      )}

      {component.type === "button" && (
        <div className="space-y-2">
          <Label>Variant</Label>
          <Select
            value={component.props.variant ?? "default"}
            onValueChange={(value) => onChange({ ...component.props, variant: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="เลือก variant" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="secondary">Secondary</SelectItem>
              <SelectItem value="outline">Outline</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="className">className</Label>
        <Input
          id="className"
          value={component.props.className ?? ""}
          onChange={(event) => onChange({ ...component.props, className: event.target.value })}
          placeholder="เพิ่ม utility class"
        />
        <p className="text-xs text-muted-foreground">
          className จะถูก merge ด้วย cn(...) กับ style ของ component
        </p>
      </div>
    </div>
  );
}

export default function BuilderPage({ params }: { params: { route: string } }) {
  const schema = useSchema(params.route);
  const [canvasSchema, setCanvasSchema] = useState<BuilderSchema>(schema);
  const [selectedComponentId, setSelectedComponentId] = useState<string | undefined>(
    canvasSchema.components[0]?.id,
  );
  const [pendingType, setPendingType] = useState<ComponentType>(componentLibrary[0].type);

  const selectedComponent = canvasSchema.components.find(
    (component) => component.id === selectedComponentId,
  );

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

  const updateComponent = (id: string, props: ComponentProps) => {
    setCanvasSchema((prev) => ({
      ...prev,
      components: prev.components.map((component) =>
        component.id === id ? { ...component, props } : component,
      ),
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
      <div className="mx-auto max-w-[1400px] space-y-6 px-6 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Palette className="h-4 w-4" />
              Builder
              <ChevronRight className="h-4 w-4" />
              <span className="font-medium text-foreground">/{params.route}</span>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">Page Builder</h1>
            <p className="text-sm text-muted-foreground">
              โหลด schema เดิมถ้ามี แล้วลองลาก component จาก Library หรือกด Add เพื่อ append
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="rounded-full">
              Layout: {schema.layout}
            </Badge>
            <Button variant="outline" size="sm">
              บันทึกสคีมา
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
          <div className="space-y-4">
            <Card className="border-dashed">
              <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-4">
                <CirclePlus className="h-4 w-4 text-muted-foreground" />
                <div>
                  <CardTitle className="text-base">Component Library</CardTitle>
                  <CardDescription>ลาก component เพื่อวางบน Canvas</CardDescription>
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
                        <Badge variant="secondary" className="rounded-full text-[10px]">
                          drag
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
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
                  <CardDescription>แก้ไข props ของ component ที่เลือก</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <PropertiesPanel
                  component={selectedComponent}
                  onChange={(props) => selectedComponent && updateComponent(selectedComponent.id, props)}
                />
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
                      <Select value={pendingType} onValueChange={(value) => setPendingType(value as ComponentType)}>
                        <SelectTrigger className="w-[180px]">
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
                      className="flex min-h-[460px] flex-col gap-4 rounded-xl border border-dashed bg-muted/30 p-4"
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
                            selectedComponentId === component.id && "border-yellow-500 ring-2 ring-yellow-200",
                          )}
                          onClick={() => setSelectedComponentId(component.id)}
                        >
                          <div className="mb-3 flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Blocks className="h-4 w-4" />
                              {component.type}
                            </div>
                            <Badge variant="outline">{component.props.className ? "custom" : "default"}</Badge>
                          </div>
                          <div className="space-y-2">{renderComponent(component)}</div>
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
                      schema ถูกโหลดตาม route param: <span className="font-semibold">{params.route}</span>
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
