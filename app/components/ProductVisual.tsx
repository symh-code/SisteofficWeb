type ProductVisualProps = {
  name: string;
  category: string;
  tag?: string;
  className?: string;
};

function monogram(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

/**
 * Panel visual de marca para cada producto: como el catálogo no tiene
 * fotografías, usamos un monograma + degradado como firma visual
 * consistente en toda la app (tarjetas y página de detalle).
 */
export function ProductVisual({ name, category, tag, className = "" }: ProductVisualProps) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 ${className}`}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(99,102,241,0.5), transparent 45%), radial-gradient(circle at 80% 70%, rgba(56,189,248,0.35), transparent 50%)",
        }}
      />
      <span className="relative select-none text-7xl font-semibold leading-none tracking-tight text-white/10 sm:text-8xl">
        {monogram(name)}
      </span>
      {tag && (
        <span className="absolute left-4 top-4 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
          {tag}
        </span>
      )}
      <span className="absolute bottom-4 left-4 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
        {category}
      </span>
    </div>
  );
}