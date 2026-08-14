-- Productos de Islas de trabajo. El precio 0 se muestra como
-- “Precio a cotizar”. La posición 1 se usa como portada.
WITH modelos(nombre, slug) AS (
  VALUES
    ('Cubículo', 'cubiculo'),
    ('Isla comercial', 'isla-comercial'),
    ('Isla de trabajo en L', 'isla-de-trabajo-en-l'),
    ('Isla de trabajo recta', 'isla-de-trabajo-recta'),
    ('Wave', 'wave')
)
INSERT INTO productos (nombre, imagen_url, precio, especificaciones, categoria_id)
SELECT
  modelos.nombre,
  '/productos/islas-de-trabajo/' || modelos.slug || '-1.webp',
  0,
  NULL,
  22
FROM modelos
WHERE NOT EXISTS (
  SELECT 1
  FROM productos
  WHERE productos.nombre = modelos.nombre AND productos.categoria_id = 22
);

-- Mantiene la migración idempotente y limita cualquier actualización a esta
-- categoría para no alterar productos del mismo nombre en otras secciones.
WITH modelos(nombre, slug) AS (
  VALUES
    ('Cubículo', 'cubiculo'),
    ('Isla comercial', 'isla-comercial'),
    ('Isla de trabajo en L', 'isla-de-trabajo-en-l'),
    ('Isla de trabajo recta', 'isla-de-trabajo-recta'),
    ('Wave', 'wave')
)
UPDATE productos
SET
  imagen_url = (
    SELECT '/productos/islas-de-trabajo/' || modelos.slug || '-1.webp'
    FROM modelos
    WHERE modelos.nombre = productos.nombre
  ),
  precio = 0,
  especificaciones = NULL,
  updated_at = CURRENT_TIMESTAMP
WHERE categoria_id = 22 AND nombre IN (SELECT nombre FROM modelos);

WITH imagenes(nombre, slug, posicion, orden) AS (
  VALUES
    ('Cubículo', 'cubiculo', '1', 1),
    ('Cubículo', 'cubiculo', '2', 2),
    ('Isla comercial', 'isla-comercial', '1', 1),
    ('Isla comercial', 'isla-comercial', '2', 2),
    ('Isla de trabajo en L', 'isla-de-trabajo-en-l', '1', 1),
    ('Isla de trabajo recta', 'isla-de-trabajo-recta', '1', 1),
    ('Isla de trabajo recta', 'isla-de-trabajo-recta', '2', 2),
    ('Wave', 'wave', '1', 1),
    ('Wave', 'wave', '2', 2)
)
INSERT OR IGNORE INTO producto_imagenes (producto_id, imagen_url, angulo, orden)
SELECT
  productos.id,
  '/productos/islas-de-trabajo/' || imagenes.slug || '-' || imagenes.posicion || '.webp',
  'vista-' || imagenes.posicion,
  imagenes.orden
FROM imagenes
JOIN productos
  ON productos.nombre = imagenes.nombre AND productos.categoria_id = 22;
