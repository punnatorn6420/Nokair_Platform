"use client";

import React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import type {
  ComponentInstance,
  ComponentProps,
  PageSchema,
} from "@/lib/page-schema";

type BadgeVariant = "default" | "secondary" | "outline" | "destructive";

function toBadgeVariant(variant?: ComponentProps["variant"]): BadgeVariant {
  const allowed: BadgeVariant[] = [
    "default",
    "secondary",
    "outline",
    "destructive",
  ];
  return allowed.includes((variant as BadgeVariant) ?? "default")
    ? (variant as BadgeVariant) ?? "default"
    : "default";
}

function HeroPreview({ component }: { component: ComponentInstance }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-dashed border-yellow-200 bg-white",
        component.props.className
      )}
    >
      <div className="relative space-y-3 p-8">
        <Badge
          variant="outline"
          className="rounded-full border-yellow-300 text-yellow-800"
        >
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
    <Card
      className={cn("border-dashed shadow-none", component.props.className)}
    >
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
  const variant = component.props.variant ?? "default";
  const size = component.props.size ?? "default";

  return (
    <Button className={component.props.className} variant={variant} size={size}>
      {component.props.label ?? "Button"}
    </Button>
  );
}

function BadgePreview({ component }: { component: ComponentInstance }) {
  const variant = toBadgeVariant(component.props.variant);

  return (
    <Badge className={component.props.className} variant={variant}>
      {component.props.label ?? "Badge"}
    </Badge>
  );
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

export function renderComponent(component: ComponentInstance) {
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

export function PageRenderer({ schema }: { schema: PageSchema }) {
  return (
    <div
      className={cn(
        "flex min-h-115 flex-col gap-4 rounded-xl border border-dashed p-4",
        schema.background ?? "bg-muted/30"
      )}
    >
      {schema.components.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 text-sm text-muted-foreground">
          ยังไม่มี component ในหน้านี้
        </div>
      ) : (
        schema.components.map((component) => (
          <div
            key={component.id}
            className="relative w-full rounded-xl border bg-white p-3 text-left shadow-sm"
          >
            <div className="mb-3 flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] uppercase tracking-wide">
                  {component.type}
                </span>
              </div>
              <Badge variant="outline">
                {component.props.className ? "custom" : "default"}
              </Badge>
            </div>
            <div className="space-y-2">{renderComponent(component)}</div>
          </div>
        ))
      )}
    </div>
  );
}
