-- Separa los cuatro modelos de estantería que fueron agrupados por error.
-- La condición sobre imagen_url identifica únicamente el registro consolidado
-- por la migración 0023 y permite ejecutar esta corrección más de una vez.
UPDATE productos
SET
  nombre = 'Estantería de Madera x5',
  imagen_url = '/productos/estanteria/estanteria-madera-x5-1.webp',
  precio = 0,
  especificaciones = NULL,
  updated_at = CURRENT_TIMESTAMP
WHERE categoria_id = 18
  AND nombre = 'Estantería Metálica x5'
  AND imagen_url = '/productos/estanteria/estanteria-madera-x5-1.webp';

WITH modelos(nombre, slug) AS (
  VALUES
    ('Estantería de Madera x5', 'estanteria-madera-x5'),
    ('Estantería Metálica Blanca x5', 'estanteria-metalica-blanca-x5'),
    ('Estantería Metálica Blanca x6', 'estanteria-metalica-blanca-x6'),
    ('Estantería Metálica Negra x6', 'estanteria-metalica-negra-x6')
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
  WHERE productos.nombre = modelos.nombre
    AND productos.categoria_id = 18
);

-- Normaliza los datos de los cuatro productos dentro de la categoría Estantería.
WITH modelos(nombre, slug) AS (
  VALUES
    ('Estantería de Madera x5', 'estanteria-madera-x5'),
    ('Estantería Metálica Blanca x5', 'estanteria-metalica-blanca-x5'),
    ('Estantería Metálica Blanca x6', 'estanteria-metalica-blanca-x6'),
    ('Estantería Metálica Negra x6', 'estanteria-metalica-negra-x6')
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
WHERE categoria_id = 18
  AND nombre IN (SELECT nombre FROM modelos);

-- Sustituye la galería consolidada incorrecta por una imagen exacta por producto.
DELETE FROM producto_imagenes
WHERE producto_id IN (
  SELECT id
  FROM productos
  WHERE categoria_id = 18
    AND nombre IN (
      'Estantería de Madera x5',
      'Estantería Metálica Blanca x5',
      'Estantería Metálica Blanca x6',
      'Estantería Metálica Negra x6'
    )
);

WITH modelos(nombre, slug) AS (
  VALUES
    ('Estantería de Madera x5', 'estanteria-madera-x5'),
    ('Estantería Metálica Blanca x5', 'estanteria-metalica-blanca-x5'),
    ('Estantería Metálica Blanca x6', 'estanteria-metalica-blanca-x6'),
    ('Estantería Metálica Negra x6', 'estanteria-metalica-negra-x6')
)
INSERT OR IGNORE INTO producto_imagenes (producto_id, imagen_url, angulo, orden)
SELECT
  productos.id,
  '/productos/estanteria/' || modelos.slug || '-1.webp',
  'vista-1',
  1
FROM modelos
JOIN productos
  ON productos.nombre = modelos.nombre
  AND productos.categoria_id = 18;
