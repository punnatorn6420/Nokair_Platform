"use client";

import { useEffect, useState } from "react";

import { PageRenderer } from "@/components/page-renderer";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  PageSchema,
  cloneSchema,
  createDefaultSchema,
  ensureSchemaRoute,
  presetSchemas,
} from "@/lib/page-schema";
import { loadPageSchema } from "@/lib/schema-storage";

export default function PublishedRoutePage({
  params,
}: {
  params: { route: string };
}) {
  const [schema, setSchema] = useState<PageSchema>(() =>
    ensureSchemaRoute(
      cloneSchema(presetSchemas[params.route] ?? createDefaultSchema(params.route)),
      params.route,
    ),
  );
  const [loadedRoute, setLoadedRoute] = useState<string | null>(null);

  const isLoading = loadedRoute !== params.route;

  useEffect(() => {
    let mounted = true;

    loadPageSchema(params.route)
      .then((storedSchema) => {
        if (!mounted) return;
        const fallback = ensureSchemaRoute(
          cloneSchema(presetSchemas[params.route] ?? createDefaultSchema(params.route)),
          params.route,
        );

        const normalized = storedSchema
          ? ensureSchemaRoute(storedSchema, params.route)
          : fallback;

        setSchema(normalized);
      })
      .finally(() => {
        if (mounted) setLoadedRoute(params.route);
      });

    return () => {
      mounted = false;
    };
  }, [params.route]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/30 via-white to-muted/20 py-10">
      <div className="mx-auto max-w-5xl space-y-6 px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Published route</p>
            <h1 className="text-2xl font-semibold tracking-tight">/{params.route}</h1>
          </div>
          <Badge variant={isLoading ? "outline" : "secondary"} className="rounded-full">
            {isLoading ? "กำลังโหลด schema" : "Renderer ready"}
          </Badge>
        </div>

        <Card className="border-dashed shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Route preview</CardTitle>
            <CardDescription>
              ใช้ renderer เดียวกับ Page Builder โดยโหลด schema ตาม route
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PageRenderer schema={schema} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
