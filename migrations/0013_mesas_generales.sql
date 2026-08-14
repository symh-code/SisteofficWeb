-- Productos de Mesas generales. El precio 0 se muestra como
-- “Precio a cotizar”. La posición 1 se usa como portada.
WITH modelos(nombre, slug) AS (
  VALUES
    ('Mesa Circular', 'mesa-circular'),
    ('Mesa Cuadrada', 'mesa-cuadrada'),
    ('Mesa de Vidrio', 'mesa-de-vidrio'),
    ('Mesa Rectangular', 'mesa-rectangular'),
    ('Mesa Café', 'mesa-cafe')
)
INSERT INTO productos (nombre, imagen_url, precio, especificaciones, categoria_id)
SELECT
  modelos.nombre,
  '/productos/mesas-generales/' || modelos.slug || '-1.webp',
  0,
  NULL,
  11
FROM modelos
WHERE NOT EXISTS (
  SELECT 1
  FROM productos
  WHERE productos.nombre = modelos.nombre AND productos.categoria_id = 11
);

-- Mantiene la migración idempotente y limita la actualización a esta
-- subcategoría para no alterar mesas del mismo nombre en otras secciones.
WITH modelos(nombre, slug) AS (
  VALUES
    ('Mesa Circular', 'mesa-circular'),
    ('Mesa Cuadrada', 'mesa-cuadrada'),
    ('Mesa de Vidrio', 'mesa-de-vidrio'),
    ('Mesa Rectangular', 'mesa-rectangular'),
    ('Mesa Café', 'mesa-cafe')
)
UPDATE productos
SET
  imagen_url = (
    SELECT '/productos/mesas-generales/' || modelos.slug || '-1.webp'
    FROM modelos
    WHERE modelos.nombre = productos.nombre
  ),
  precio = 0,
  especificaciones = NULL,
  updated_at = CURRENT_TIMESTAMP
WHERE categoria_id = 11 AND nombre IN (SELECT nombre FROM modelos);

WITH imagenes(nombre, slug, posicion, orden) AS (
  VALUES
    ('Mesa Circular', 'mesa-circular', '1', 1),
    ('Mesa Circular', 'mesa-circular', '2', 2),
    ('Mesa Cuadrada', 'mesa-cuadrada', '1', 1),
    ('Mesa Cuadrada', 'mesa-cuadrada', '2', 2),
    ('Mesa de Vidrio', 'mesa-de-vidrio', '1', 1),
    ('Mesa Rectangular', 'mesa-rectangular', '1', 1),
    ('Mesa Rectangular', 'mesa-rectangular', '2', 2),
    ('Mesa Café', 'mesa-cafe', '1', 1),
    ('Mesa Café', 'mesa-cafe', '2', 2)
)
INSERT OR IGNORE INTO producto_imagenes (producto_id, imagen_url, angulo, orden)
SELECT
  productos.id,
  '/productos/mesas-generales/' || imagenes.slug || '-' || imagenes.posicion || '.webp',
  'vista-' || imagenes.posicion,
  imagenes.orden
FROM imagenes
JOIN productos
  ON productos.nombre = imagenes.nombre AND productos.categoria_id = 11;
