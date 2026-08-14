-- Productos de Sillas > Gerenciales. El precio 0 se muestra como
-- “Precio a cotizar”. La vista frontal se usa como portada.
WITH modelos(nombre, slug) AS (
  VALUES
    ('Silla DELPHI II', 'delphi-ii'),
    ('Silla DELPHI MESH', 'delphi-mesh'),
    ('Silla DREAM', 'dream'),
    ('Silla ERGO ELITE', 'ergo-elite'),
    ('Silla ERGO HUMAN', 'ergo-human'),
    ('Silla KONU', 'konu'),
    ('Silla LEXUS', 'lexus'),
    ('Silla MALI', 'mali'),
    ('Silla MONACO', 'monaco'),
    ('Silla MUSK', 'musk'),
    ('Silla NIZA', 'niza'),
    ('Silla OSAKA', 'osaka'),
    ('Silla SAM', 'sam'),
    ('Silla SHINNY', 'shinny'),
    ('Silla BOSS', 'boss'),
    ('Silla SWIFT', 'swift'),
    ('Silla THINK', 'think'),
    ('Silla TOM', 'tom'),
    ('Silla WINNER', 'winner')
)
INSERT INTO productos (nombre, imagen_url, precio, especificaciones, categoria_id)
SELECT
  modelos.nombre,
  '/productos/gerenciales/' || modelos.slug || '-frente.webp',
  0,
  NULL,
  14
FROM modelos
WHERE NOT EXISTS (
  SELECT 1
  FROM productos
  WHERE productos.nombre = modelos.nombre AND productos.categoria_id = 14
);

-- Mantiene la migración idempotente y normaliza cualquier registro previo de
-- estos mismos modelos dentro de la categoría Gerenciales.
WITH modelos(nombre, slug) AS (
  VALUES
    ('Silla DELPHI II', 'delphi-ii'),
    ('Silla DELPHI MESH', 'delphi-mesh'),
    ('Silla DREAM', 'dream'),
    ('Silla ERGO ELITE', 'ergo-elite'),
    ('Silla ERGO HUMAN', 'ergo-human'),
    ('Silla KONU', 'konu'),
    ('Silla LEXUS', 'lexus'),
    ('Silla MALI', 'mali'),
    ('Silla MONACO', 'monaco'),
    ('Silla MUSK', 'musk'),
    ('Silla NIZA', 'niza'),
    ('Silla OSAKA', 'osaka'),
    ('Silla SAM', 'sam'),
    ('Silla SHINNY', 'shinny'),
    ('Silla BOSS', 'boss'),
    ('Silla SWIFT', 'swift'),
    ('Silla THINK', 'think'),
    ('Silla TOM', 'tom'),
    ('Silla WINNER', 'winner')
)
UPDATE productos
SET
  imagen_url = (
    SELECT '/productos/gerenciales/' || modelos.slug || '-frente.webp'
    FROM modelos
    WHERE modelos.nombre = productos.nombre
  ),
  precio = 0,
  especificaciones = NULL,
  updated_at = CURRENT_TIMESTAMP
WHERE categoria_id = 14 AND nombre IN (SELECT nombre FROM modelos);

WITH imagenes(nombre, slug, angulo, orden) AS (
  VALUES
    ('Silla DELPHI II', 'delphi-ii', 'frente', 1),
    ('Silla DELPHI II', 'delphi-ii', 'lado', 2),
    ('Silla DELPHI MESH', 'delphi-mesh', 'frente', 1),
    ('Silla DELPHI MESH', 'delphi-mesh', 'lado', 2),
    ('Silla DREAM', 'dream', 'frente', 1),
    ('Silla DREAM', 'dream', 'lado', 2),
    ('Silla ERGO ELITE', 'ergo-elite', 'frente', 1),
    ('Silla ERGO ELITE', 'ergo-elite', 'lado', 2),
    ('Silla ERGO HUMAN', 'ergo-human', 'frente', 1),
    ('Silla ERGO HUMAN', 'ergo-human', 'lado', 2),
    ('Silla KONU', 'konu', 'frente', 1),
    ('Silla KONU', 'konu', 'lado', 2),
    ('Silla LEXUS', 'lexus', 'frente', 1),
    ('Silla LEXUS', 'lexus', 'lado', 2),
    ('Silla MALI', 'mali', 'frente', 1),
    ('Silla MALI', 'mali', 'lado', 2),
    ('Silla MONACO', 'monaco', 'frente', 1),
    ('Silla MONACO', 'monaco', 'detras', 2),
    ('Silla MUSK', 'musk', 'frente', 1),
    ('Silla MUSK', 'musk', 'lado', 2),
    ('Silla NIZA', 'niza', 'frente', 1),
    ('Silla NIZA', 'niza', 'lado', 2),
    ('Silla OSAKA', 'osaka', 'frente', 1),
    ('Silla OSAKA', 'osaka', 'lado', 2),
    ('Silla SAM', 'sam', 'frente', 1),
    ('Silla SAM', 'sam', 'lado', 2),
    ('Silla SHINNY', 'shinny', 'frente', 1),
    ('Silla SHINNY', 'shinny', 'lado', 2),
    ('Silla BOSS', 'boss', 'frente', 1),
    ('Silla BOSS', 'boss', 'lado', 2),
    ('Silla SWIFT', 'swift', 'frente', 1),
    ('Silla SWIFT', 'swift', 'lado', 2),
    ('Silla THINK', 'think', 'frente', 1),
    ('Silla THINK', 'think', 'lado', 2),
    ('Silla TOM', 'tom', 'frente', 1),
    ('Silla TOM', 'tom', 'lado', 2),
    ('Silla WINNER', 'winner', 'frente', 1),
    ('Silla WINNER', 'winner', 'lado', 2)
)
INSERT OR IGNORE INTO producto_imagenes (producto_id, imagen_url, angulo, orden)
SELECT
  productos.id,
  '/productos/gerenciales/' || imagenes.slug || '-' || imagenes.angulo || '.webp',
  imagenes.angulo,
  imagenes.orden
FROM imagenes
JOIN productos
  ON productos.nombre = imagenes.nombre AND productos.categoria_id = 14;
