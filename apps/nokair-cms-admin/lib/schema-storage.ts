import { ensureSchemaRoute, type PageSchema } from "./page-schema";

const STORAGE_PREFIX = "nokair:page-schema:";
const API_BASE_URL = process.env.NEXT_PUBLIC_CMS_ADMIN_API_URL;

function getStorageKey(route: string) {
  return `${STORAGE_PREFIX}${route}`;
}

function loadFromLocalStorage(route: string): PageSchema | null {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(getStorageKey(route));
  if (!raw) return null;

  try {
    return ensureSchemaRoute(JSON.parse(raw) as PageSchema, route);
  } catch (error) {
    console.error("Failed to parse schema from localStorage", error);
    return null;
  }
}

export function saveToLocalStorage(route: string, schema: PageSchema) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(getStorageKey(route), JSON.stringify(schema));
}

async function loadFromApi(route: string): Promise<PageSchema | null> {
  if (!API_BASE_URL) return null;

  const response = await fetch(`${API_BASE_URL}/admin/site/${route}/layout`, {
    cache: "no-store",
  });

  if (!response.ok) return null;

  const data = (await response.json()) as PageSchema;
  return ensureSchemaRoute(data, route);
}

async function saveToApi(route: string, schema: PageSchema) {
  if (!API_BASE_URL) return null;

  const response = await fetch(`${API_BASE_URL}/admin/site/${route}/layout`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(schema),
  });

  if (!response.ok) {
    throw new Error(`Failed to save schema: ${response.statusText}`);
  }

  return response;
}

export async function loadPageSchema(
  route: string
): Promise<PageSchema | null> {
  try {
    const apiSchema = await loadFromApi(route);
    if (apiSchema) return apiSchema;
  } catch (error) {
    console.error("Error loading schema from API", error);
  }

  return loadFromLocalStorage(route);
}

export async function persistPageSchema(route: string, schema: PageSchema) {
  saveToLocalStorage(route, schema);

  if (!API_BASE_URL) {
    return "local" as const;
  }

  await saveToApi(route, schema);
  return "api" as const;
}
