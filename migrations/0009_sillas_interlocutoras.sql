-- Productos de Sillas > Interlocutoras. El precio 0 se muestra como
-- “Precio a cotizar”. La vista frontal se usa como portada.
WITH modelos(nombre, slug) AS (
  VALUES
    ('Silla ANDY', 'andy'),
    ('Silla ATLANTIS', 'atlantis'),
    ('Silla BOSS', 'boss'),
    ('Silla IZO', 'izo'),
    ('Silla MONACO', 'monaco'),
    ('Silla NOVA', 'nova'),
    ('Silla TOLEDO', 'toledo'),
    ('Silla ZAO', 'zao')
)
INSERT INTO productos (nombre, imagen_url, precio, especificaciones, categoria_id)
SELECT
  modelos.nombre,
  '/productos/interlocutoras/' || modelos.slug || '-frente.webp',
  0,
  NULL,
  15
FROM modelos
WHERE NOT EXISTS (
  SELECT 1
  FROM productos
  WHERE productos.nombre = modelos.nombre AND productos.categoria_id = 15
);

-- Mantiene la migración idempotente y normaliza cualquier registro previo de
-- estos mismos modelos dentro de la categoría Interlocutoras.
WITH modelos(nombre, slug) AS (
  VALUES
    ('Silla ANDY', 'andy'),
    ('Silla ATLANTIS', 'atlantis'),
    ('Silla BOSS', 'boss'),
    ('Silla IZO', 'izo'),
    ('Silla MONACO', 'monaco'),
    ('Silla NOVA', 'nova'),
    ('Silla TOLEDO', 'toledo'),
    ('Silla ZAO', 'zao')
)
UPDATE productos
SET
  imagen_url = (
    SELECT '/productos/interlocutoras/' || modelos.slug || '-frente.webp'
    FROM modelos
    WHERE modelos.nombre = productos.nombre
  ),
  precio = 0,
  especificaciones = NULL,
  updated_at = CURRENT_TIMESTAMP
WHERE categoria_id = 15 AND nombre IN (SELECT nombre FROM modelos);

WITH imagenes(nombre, slug, angulo, orden) AS (
  VALUES
    ('Silla ANDY', 'andy', 'frente', 1),
    ('Silla ANDY', 'andy', 'lado', 2),
    ('Silla ATLANTIS', 'atlantis', 'frente', 1),
    ('Silla ATLANTIS', 'atlantis', 'lado', 2),
    ('Silla BOSS', 'boss', 'frente', 1),
    ('Silla BOSS', 'boss', 'lado', 2),
    ('Silla IZO', 'izo', 'frente', 1),
    ('Silla IZO', 'izo', 'lado', 2),
    ('Silla MONACO', 'monaco', 'frente', 1),
    ('Silla MONACO', 'monaco', 'lado', 2),
    ('Silla NOVA', 'nova', 'frente', 1),
    ('Silla NOVA', 'nova', 'lado', 2),
    ('Silla TOLEDO', 'toledo', 'frente', 1),
    ('Silla TOLEDO', 'toledo', 'lado', 2),
    ('Silla ZAO', 'zao', 'frente', 1),
    ('Silla ZAO', 'zao', 'lado', 2)
)
INSERT OR IGNORE INTO producto_imagenes (producto_id, imagen_url, angulo, orden)
SELECT
  productos.id,
  '/productos/interlocutoras/' || imagenes.slug || '-' || imagenes.angulo || '.webp',
  imagenes.angulo,
  imagenes.orden
FROM imagenes
JOIN productos
  ON productos.nombre = imagenes.nombre AND productos.categoria_id = 15;
