-- Sillas de Línea educativa. El precio 0 se muestra como
-- “Precio a cotizar”. La vista frontal se usa como portada.
WITH modelos(nombre, slug) AS (
  VALUES
    ('Silla BUTTERFLY', 'butterfly'),
    ('Silla CARP', 'carp'),
    ('Silla FOLDY', 'foldy'),
    ('Silla ISOCELES', 'isoceles'),
    ('Silla ISONET', 'isonet'),
    ('Silla KIDDO', 'kiddo'),
    ('Silla LOGAN', 'logan'),
    ('Silla NOVAISO', 'novaiso'),
    ('Silla PASS', 'pass'),
    ('Silla PRISMA', 'prisma'),
    ('Silla ZYLE', 'zyle')
)
INSERT INTO productos (nombre, imagen_url, precio, especificaciones, categoria_id)
SELECT
  modelos.nombre,
  '/productos/linea-educativa/' || modelos.slug || '-frente.webp',
  0,
  NULL,
  4
FROM modelos
WHERE NOT EXISTS (
  SELECT 1
  FROM productos
  WHERE productos.nombre = modelos.nombre AND productos.categoria_id = 4
);

-- Mantiene la migración idempotente y limita la actualización a Línea
-- educativa para no alterar sillas del mismo nombre en otras categorías.
WITH modelos(nombre, slug) AS (
  VALUES
    ('Silla BUTTERFLY', 'butterfly'),
    ('Silla CARP', 'carp'),
    ('Silla FOLDY', 'foldy'),
    ('Silla ISOCELES', 'isoceles'),
    ('Silla ISONET', 'isonet'),
    ('Silla KIDDO', 'kiddo'),
    ('Silla LOGAN', 'logan'),
    ('Silla NOVAISO', 'novaiso'),
    ('Silla PASS', 'pass'),
    ('Silla PRISMA', 'prisma'),
    ('Silla ZYLE', 'zyle')
)
UPDATE productos
SET
  imagen_url = (
    SELECT '/productos/linea-educativa/' || modelos.slug || '-frente.webp'
    FROM modelos
    WHERE modelos.nombre = productos.nombre
  ),
  precio = 0,
  especificaciones = NULL,
  updated_at = CURRENT_TIMESTAMP
WHERE categoria_id = 4 AND nombre IN (SELECT nombre FROM modelos);

WITH imagenes(nombre, slug, angulo, orden) AS (
  VALUES
    ('Silla BUTTERFLY', 'butterfly', 'frente', 1),
    ('Silla BUTTERFLY', 'butterfly', 'lado', 2),
    ('Silla CARP', 'carp', 'frente', 1),
    ('Silla CARP', 'carp', 'lado', 2),
    ('Silla FOLDY', 'foldy', 'frente', 1),
    ('Silla FOLDY', 'foldy', 'lado', 2),
    ('Silla ISOCELES', 'isoceles', 'frente', 1),
    ('Silla ISOCELES', 'isoceles', 'lado', 2),
    ('Silla ISONET', 'isonet', 'frente', 1),
    ('Silla ISONET', 'isonet', 'lado', 2),
    ('Silla KIDDO', 'kiddo', 'frente', 1),
    ('Silla KIDDO', 'kiddo', 'lado', 2),
    ('Silla LOGAN', 'logan', 'frente', 1),
    ('Silla LOGAN', 'logan', 'lado', 2),
    ('Silla NOVAISO', 'novaiso', 'frente', 1),
    ('Silla NOVAISO', 'novaiso', 'lado', 2),
    ('Silla PASS', 'pass', 'frente', 1),
    ('Silla PASS', 'pass', 'lado', 2),
    ('Silla PRISMA', 'prisma', 'frente', 1),
    ('Silla PRISMA', 'prisma', 'lado', 2),
    ('Silla ZYLE', 'zyle', 'frente', 1),
    ('Silla ZYLE', 'zyle', 'lado', 2)
)
INSERT OR IGNORE INTO producto_imagenes (producto_id, imagen_url, angulo, orden)
SELECT
  productos.id,
  '/productos/linea-educativa/' || imagenes.slug || '-' || imagenes.angulo || '.webp',
  imagenes.angulo,
  imagenes.orden
FROM imagenes
JOIN productos
  ON productos.nombre = imagenes.nombre AND productos.categoria_id = 4;
