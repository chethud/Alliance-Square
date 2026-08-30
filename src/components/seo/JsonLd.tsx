import type { SchemaObject } from "@/lib/seo/schema";

interface JsonLdProps {
  data: SchemaObject | SchemaObject[];
}

export function JsonLd({ data }: JsonLdProps) {
  const schemas = Array.isArray(data) ? data : [data];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`jsonld-${index}-${String(schema["@type"] ?? schema["@id"] ?? index)}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
