import { createDefaultSchema, ensureSchemaRoute, type PageSchema } from "./page-schema";

const API_BASE_URL = process.env.WEB_API_URL;

export async function getPageSchema(route: string): Promise<PageSchema> {
  if (!API_BASE_URL) {
    console.warn("WEB_API_URL is not set, using default page schema");
    return createDefaultSchema(route);
  }

  try {
    const response = await fetch(`${API_BASE_URL}/site/${route}/layout`, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.warn(`Failed to fetch page schema for route: ${route}`);
      return createDefaultSchema(route);
    }

    const data = (await response.json()) as PageSchema;
    return ensureSchemaRoute(data, route);
  } catch (error) {
    console.error("Error fetching page schema", error);
    return createDefaultSchema(route);
  }
}
