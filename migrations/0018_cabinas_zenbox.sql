-- Productos de Cabinas Zenbox. El precio 0 se muestra como
-- “Precio a cotizar”. La vista frontal se usa como portada.
WITH modelos(nombre, slug) AS (
  VALUES
    ('KAVIN 1P', 'kavin-1p'),
    ('KAVIN DUO', 'kavin-duo')
)
INSERT INTO productos (nombre, imagen_url, precio, especificaciones, categoria_id)
SELECT
  modelos.nombre,
  '/productos/cabinas-zenbox/' || modelos.slug || '-frente.webp',
  0,
  NULL,
  6
FROM modelos
WHERE NOT EXISTS (
  SELECT 1
  FROM productos
  WHERE productos.nombre = modelos.nombre AND productos.categoria_id = 6
);

-- Mantiene la migración idempotente y limita la actualización a Cabinas Zenbox.
WITH modelos(nombre, slug) AS (
  VALUES
    ('KAVIN 1P', 'kavin-1p'),
    ('KAVIN DUO', 'kavin-duo')
)
UPDATE productos
SET
  imagen_url = (
    SELECT '/productos/cabinas-zenbox/' || modelos.slug || '-frente.webp'
    FROM modelos
    WHERE modelos.nombre = productos.nombre
  ),
  precio = 0,
  especificaciones = NULL,
  updated_at = CURRENT_TIMESTAMP
WHERE categoria_id = 6 AND nombre IN (SELECT nombre FROM modelos);

WITH imagenes(nombre, slug, angulo, orden) AS (
  VALUES
    ('KAVIN 1P', 'kavin-1p', 'frente', 1),
    ('KAVIN 1P', 'kavin-1p', 'lado', 2),
    ('KAVIN DUO', 'kavin-duo', 'frente', 1),
    ('KAVIN DUO', 'kavin-duo', 'lado', 2)
)
INSERT OR IGNORE INTO producto_imagenes (producto_id, imagen_url, angulo, orden)
SELECT
  productos.id,
  '/productos/cabinas-zenbox/' || imagenes.slug || '-' || imagenes.angulo || '.webp',
  imagenes.angulo,
  imagenes.orden
FROM imagenes
JOIN productos
  ON productos.nombre = imagenes.nombre AND productos.categoria_id = 6;
