import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button, buttonClasses } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import type { ComponentInstance, ComponentProps, PageSchema } from "@/lib/page-schema";

type BadgeVariant = "default" | "secondary" | "outline" | "destructive";

function toBadgeVariant(variant?: ComponentProps["variant"]): BadgeVariant {
  const allowed: BadgeVariant[] = ["default", "secondary", "outline", "destructive"];
  return allowed.includes((variant as BadgeVariant) ?? "default")
    ? ((variant as BadgeVariant) ?? "default")
    : "default";
}

function HeroBlock({ component }: { component: ComponentInstance }) {
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-3xl border bg-gradient-to-br from-yellow-50 via-white to-sky-50",
        component.props.className
      )}
    >
      <div className="space-y-4 p-8 md:p-12">
        <Badge variant="outline" className="rounded-full border-yellow-300 text-yellow-800">
          {component.props.label ?? "Hero"}
        </Badge>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          {component.props.title ?? "Hero Title"}
        </h1>
        <p className="text-base text-muted-foreground md:text-lg">
          {component.props.description ?? "Hero description"}
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          {component.props.href ? (
            <Link
              href={component.props.href}
              className={buttonClasses({ className: "inline-flex" })}
            >
              {component.props.label ?? "Learn more"}
            </Link>
          ) : (
            <Button>{component.props.label ?? "Learn more"}</Button>
          )}
          <Button variant="outline">รองรับ Tailwind className</Button>
        </div>
      </div>
    </section>
  );
}

function CardBlock({ component }: { component: ComponentInstance }) {
  return (
    <Card className={cn("shadow-sm", component.props.className)}>
      <CardHeader>
        <CardTitle>{component.props.title ?? "Card Title"}</CardTitle>
        <CardDescription>
          {component.props.description ?? "รายละเอียดของการ์ด"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">Info</Badge>
          <Badge variant="outline">Tag</Badge>
        </div>
      </CardContent>
    </Card>
  );
}

function ButtonBlock({ component }: { component: ComponentInstance }) {
  const variant = component.props.variant ?? "default";
  const size = component.props.size ?? "default";

  if (component.props.href) {
    return (
      <Link
        href={component.props.href}
        className={buttonClasses({ variant, size, className: component.props.className })}
      >
        {component.props.label ?? "Button"}
      </Link>
    );
  }

  return (
    <Button variant={variant} size={size} className={component.props.className}>
      {component.props.label ?? "Button"}
    </Button>
  );
}

function BadgeBlock({ component }: { component: ComponentInstance }) {
  const variant = toBadgeVariant(component.props.variant);

  return (
    <Badge className={component.props.className} variant={variant}>
      {component.props.label ?? "Badge"}
    </Badge>
  );
}

function NavigationBlock({ component }: { component: ComponentInstance }) {
  return (
    <NavigationMenu className={cn("w-full justify-start", component.props.className)}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>{component.props.label ?? "เมนูหลัก"}</NavigationMenuTrigger>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href={component.props.href ?? "#"}>ฟีเจอร์</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#">ช่วยเหลือ</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export function renderComponent(component: ComponentInstance) {
  switch (component.type) {
    case "hero":
      return <HeroBlock component={component} />;
    case "card":
      return <CardBlock component={component} />;
    case "button":
      return <ButtonBlock component={component} />;
    case "badge":
      return <BadgeBlock component={component} />;
    case "navigation":
      return <NavigationBlock component={component} />;
    default:
      return null;
  }
}

export function PageRenderer({ schema }: { schema: PageSchema }) {
  return (
    <div
      className={cn(
        "flex min-h-[420px] flex-col gap-6 rounded-xl border bg-background/70 p-4 md:p-6",
        schema.background ?? "bg-muted/30"
      )}
    >
      {schema.components.length === 0 ? (
        <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
          ยังไม่มี component ในหน้านี้
        </div>
      ) : (
        schema.components.map((component) => (
          <div key={component.id} className="w-full space-y-3">
            {renderComponent(component)}
          </div>
        ))
      )}
    </div>
  );
}
