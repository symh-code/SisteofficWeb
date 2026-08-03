/** Inyecta un bloque JSON-LD. `data` siempre debe construirse desde datos
 * internos (nunca texto libre de usuario sin pasar por acá controlado). */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
