import { PageRenderer } from "@/components/page-renderer";
import { getPageSchema } from "@/lib/page-schema-client";

export default async function PublicPage({
  params,
}: {
  params: { publicRoute: string };
}) {
  const schema = await getPageSchema(params.publicRoute);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{schema.route}</h1>
          <p className="text-sm text-muted-foreground">
            โหลด schema จาก backend แล้ว map เป็น component Shadcn/UI
          </p>
        </div>
      </div>

      <PageRenderer schema={schema} />
    </div>
  );
}
