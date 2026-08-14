-- Productos de Counter. El precio 0 se muestra como
-- “Precio a cotizar”. Cada producto tiene una única imagen.
WITH modelos(nombre, slug) AS (
  VALUES
    ('Japandi', 'japandi'),
    ('Signature', 'signature'),
    ('Recepción Soft', 'recepcion-soft'),
    ('Recepción Curve', 'recepcion-curve'),
    ('Lumi', 'lumi'),
    ('Line Light', 'line-light'),
    ('Counter Recepción Glass', 'counter-recepcion-glass'),
    ('Counter Nórdico', 'counter-nordico'),
    ('Balance', 'balance'),
    ('Arc Wood', 'arc-wood'),
    ('Woon', 'woon')
)
INSERT INTO productos (nombre, imagen_url, precio, especificaciones, categoria_id)
SELECT
  modelos.nombre,
  '/productos/counter/' || modelos.slug || '-1.webp',
  0,
  NULL,
  20
FROM modelos
WHERE NOT EXISTS (
  SELECT 1
  FROM productos
  WHERE productos.nombre = modelos.nombre AND productos.categoria_id = 20
);

-- Mantiene la migración idempotente y limita la actualización a Counter.
WITH modelos(nombre, slug) AS (
  VALUES
    ('Japandi', 'japandi'),
    ('Signature', 'signature'),
    ('Recepción Soft', 'recepcion-soft'),
    ('Recepción Curve', 'recepcion-curve'),
    ('Lumi', 'lumi'),
    ('Line Light', 'line-light'),
    ('Counter Recepción Glass', 'counter-recepcion-glass'),
    ('Counter Nórdico', 'counter-nordico'),
    ('Balance', 'balance'),
    ('Arc Wood', 'arc-wood'),
    ('Woon', 'woon')
)
UPDATE productos
SET
  imagen_url = (
    SELECT '/productos/counter/' || modelos.slug || '-1.webp'
    FROM modelos
    WHERE modelos.nombre = productos.nombre
  ),
  precio = 0,
  especificaciones = NULL,
  updated_at = CURRENT_TIMESTAMP
WHERE categoria_id = 20 AND nombre IN (SELECT nombre FROM modelos);

WITH imagenes(nombre, slug) AS (
  VALUES
    ('Japandi', 'japandi'),
    ('Signature', 'signature'),
    ('Recepción Soft', 'recepcion-soft'),
    ('Recepción Curve', 'recepcion-curve'),
    ('Lumi', 'lumi'),
    ('Line Light', 'line-light'),
    ('Counter Recepción Glass', 'counter-recepcion-glass'),
    ('Counter Nórdico', 'counter-nordico'),
    ('Balance', 'balance'),
    ('Arc Wood', 'arc-wood'),
    ('Woon', 'woon')
)
INSERT OR IGNORE INTO producto_imagenes (producto_id, imagen_url, angulo, orden)
SELECT
  productos.id,
  '/productos/counter/' || imagenes.slug || '-1.webp',
  'vista-1',
  1
FROM imagenes
JOIN productos
  ON productos.nombre = imagenes.nombre AND productos.categoria_id = 20;
