-- Productos de Estantería. El precio 0 se muestra como “Precio a cotizar”.
WITH modelos(nombre, slug) AS (
  VALUES
    ('Estantería de Madera x3', 'estanteria-madera-x3'),
    ('Estantería de Madera x5', 'estanteria-madera-x5')
)
INSERT INTO productos (nombre, imagen_url, precio, especificaciones, categoria_id)
SELECT
  modelos.nombre,
  '/productos/estanteria/' || modelos.slug || '-1.webp',
  0,
  NULL,
  18
FROM modelos
WHERE NOT EXISTS (
  SELECT 1
  FROM productos
  WHERE productos.nombre = modelos.nombre AND productos.categoria_id = 18
);

-- Mantiene la migración idempotente y limita la actualización a Estantería.
WITH modelos(nombre, slug) AS (
  VALUES
    ('Estantería de Madera x3', 'estanteria-madera-x3'),
    ('Estantería de Madera x5', 'estanteria-madera-x5')
)
UPDATE productos
SET
  imagen_url = (
    SELECT '/productos/estanteria/' || modelos.slug || '-1.webp'
    FROM modelos
    WHERE modelos.nombre = productos.nombre
  ),
  precio = 0,
  especificaciones = NULL,
  updated_at = CURRENT_TIMESTAMP
WHERE categoria_id = 18 AND nombre IN (SELECT nombre FROM modelos);

WITH imagenes(nombre, slug, orden) AS (
  VALUES
    ('Estantería de Madera x3', 'estanteria-madera-x3', 1),
    ('Estantería de Madera x3', 'estanteria-madera-x3', 2),
    ('Estantería de Madera x5', 'estanteria-madera-x5', 1),
    ('Estantería de Madera x5', 'estanteria-madera-x5', 2)
)
INSERT OR IGNORE INTO producto_imagenes (producto_id, imagen_url, angulo, orden)
SELECT
  productos.id,
  '/productos/estanteria/' || imagenes.slug || '-' || imagenes.orden || '.webp',
  'vista-' || imagenes.orden,
  imagenes.orden
FROM imagenes
JOIN productos
  ON productos.nombre = imagenes.nombre AND productos.categoria_id = 18;
