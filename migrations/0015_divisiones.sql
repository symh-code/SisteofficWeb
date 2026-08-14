-- Productos de Divisiones. El precio 0 se muestra como
-- “Precio a cotizar”. Cada producto tiene una única imagen.
WITH modelos(nombre, slug) AS (
  VALUES
    ('División Proyectante Perfilería Negra', 'division-proyectante-perfileria-negra'),
    ('División Piso a Techo', 'division-piso-a-techo'),
    ('División con Vidrio y Perfilería Gris', 'division-con-vidrio-y-perfileria-gris'),
    ('División con Panelería', 'division-con-paneleria')
)
INSERT INTO productos (nombre, imagen_url, precio, especificaciones, categoria_id)
SELECT
  modelos.nombre,
  '/productos/divisiones/' || modelos.slug || '-1.webp',
  0,
  NULL,
  7
FROM modelos
WHERE NOT EXISTS (
  SELECT 1
  FROM productos
  WHERE productos.nombre = modelos.nombre AND productos.categoria_id = 7
);

-- Mantiene la migración idempotente y limita la actualización a Divisiones.
WITH modelos(nombre, slug) AS (
  VALUES
    ('División Proyectante Perfilería Negra', 'division-proyectante-perfileria-negra'),
    ('División Piso a Techo', 'division-piso-a-techo'),
    ('División con Vidrio y Perfilería Gris', 'division-con-vidrio-y-perfileria-gris'),
    ('División con Panelería', 'division-con-paneleria')
)
UPDATE productos
SET
  imagen_url = (
    SELECT '/productos/divisiones/' || modelos.slug || '-1.webp'
    FROM modelos
    WHERE modelos.nombre = productos.nombre
  ),
  precio = 0,
  especificaciones = NULL,
  updated_at = CURRENT_TIMESTAMP
WHERE categoria_id = 7 AND nombre IN (SELECT nombre FROM modelos);

WITH imagenes(nombre, slug) AS (
  VALUES
    ('División Proyectante Perfilería Negra', 'division-proyectante-perfileria-negra'),
    ('División Piso a Techo', 'division-piso-a-techo'),
    ('División con Vidrio y Perfilería Gris', 'division-con-vidrio-y-perfileria-gris'),
    ('División con Panelería', 'division-con-paneleria')
)
INSERT OR IGNORE INTO producto_imagenes (producto_id, imagen_url, angulo, orden)
SELECT
  productos.id,
  '/productos/divisiones/' || imagenes.slug || '-1.webp',
  'vista-1',
  1
FROM imagenes
JOIN productos
  ON productos.nombre = imagenes.nombre AND productos.categoria_id = 7;
