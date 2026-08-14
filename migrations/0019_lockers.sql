-- Productos de Lockers. El precio 0 se muestra como “Precio a cotizar”.
WITH modelos(nombre, slug) AS (
  VALUES
    ('Locker Vertical', 'locker-vertical'),
    ('Locker Metálico 3x3', 'locker-metalico-3x3')
)
INSERT INTO productos (nombre, imagen_url, precio, especificaciones, categoria_id)
SELECT
  modelos.nombre,
  '/productos/lockers/' || modelos.slug || '-1.webp',
  0,
  NULL,
  17
FROM modelos
WHERE NOT EXISTS (
  SELECT 1
  FROM productos
  WHERE productos.nombre = modelos.nombre AND productos.categoria_id = 17
);

-- Mantiene la migración idempotente y limita la actualización a Lockers.
WITH modelos(nombre, slug) AS (
  VALUES
    ('Locker Vertical', 'locker-vertical'),
    ('Locker Metálico 3x3', 'locker-metalico-3x3')
)
UPDATE productos
SET
  imagen_url = (
    SELECT '/productos/lockers/' || modelos.slug || '-1.webp'
    FROM modelos
    WHERE modelos.nombre = productos.nombre
  ),
  precio = 0,
  especificaciones = NULL,
  updated_at = CURRENT_TIMESTAMP
WHERE categoria_id = 17 AND nombre IN (SELECT nombre FROM modelos);

WITH imagenes(nombre, slug, orden) AS (
  VALUES
    ('Locker Vertical', 'locker-vertical', 1),
    ('Locker Metálico 3x3', 'locker-metalico-3x3', 1),
    ('Locker Metálico 3x3', 'locker-metalico-3x3', 2)
)
INSERT OR IGNORE INTO producto_imagenes (producto_id, imagen_url, angulo, orden)
SELECT
  productos.id,
  '/productos/lockers/' || imagenes.slug || '-' || imagenes.orden || '.webp',
  'vista-' || imagenes.orden,
  imagenes.orden
FROM imagenes
JOIN productos
  ON productos.nombre = imagenes.nombre AND productos.categoria_id = 17;
