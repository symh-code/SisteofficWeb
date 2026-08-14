-- Productos de Escritorios. "Frame" ya existe en esta categoría y se
-- actualiza sin crear un duplicado. La posición 1 se usa como portada.
WITH modelos(nombre, slug) AS (
  VALUES
    ('Escritorio Ejecutivo Organic', 'escritorio-ejecutivo-organic'),
    ('Frame', 'frame'),
    ('Escritorio L Frame', 'escritorio-l-frame'),
    ('Escritorio Lateral Wood', 'escritorio-lateral-wood'),
    ('Escritorio Monolito', 'escritorio-monolito'),
    ('Escritorio Quare', 'escritorio-quare'),
    ('Puesto en L con Falda', 'puesto-en-l-con-falda'),
    ('Puesto Trabajo Lateral Glass', 'puesto-trabajo-lateral-glass'),
    ('Superficie Recta con Base', 'superficie-recta-con-base')
)
INSERT INTO productos (nombre, imagen_url, precio, especificaciones, categoria_id)
SELECT
  modelos.nombre,
  '/productos/escritorios/' || modelos.slug || '-1.webp',
  0,
  NULL,
  21
FROM modelos
WHERE NOT EXISTS (
  SELECT 1
  FROM productos
  WHERE productos.nombre = modelos.nombre AND productos.categoria_id = 21
);

-- Mantiene la migración idempotente y limita la actualización a Escritorios.
WITH modelos(nombre, slug) AS (
  VALUES
    ('Escritorio Ejecutivo Organic', 'escritorio-ejecutivo-organic'),
    ('Frame', 'frame'),
    ('Escritorio L Frame', 'escritorio-l-frame'),
    ('Escritorio Lateral Wood', 'escritorio-lateral-wood'),
    ('Escritorio Monolito', 'escritorio-monolito'),
    ('Escritorio Quare', 'escritorio-quare'),
    ('Puesto en L con Falda', 'puesto-en-l-con-falda'),
    ('Puesto Trabajo Lateral Glass', 'puesto-trabajo-lateral-glass'),
    ('Superficie Recta con Base', 'superficie-recta-con-base')
)
UPDATE productos
SET
  imagen_url = (
    SELECT '/productos/escritorios/' || modelos.slug || '-1.webp'
    FROM modelos
    WHERE modelos.nombre = productos.nombre
  ),
  precio = 0,
  especificaciones = NULL,
  updated_at = CURRENT_TIMESTAMP
WHERE categoria_id = 21 AND nombre IN (SELECT nombre FROM modelos);

WITH imagenes(nombre, slug, posicion, orden) AS (
  VALUES
    ('Escritorio Ejecutivo Organic', 'escritorio-ejecutivo-organic', '1', 1),
    ('Frame', 'frame', '1', 1),
    ('Frame', 'frame', '2', 2),
    ('Frame', 'frame', '3', 3),
    ('Escritorio L Frame', 'escritorio-l-frame', '1', 1),
    ('Escritorio L Frame', 'escritorio-l-frame', '2', 2),
    ('Escritorio L Frame', 'escritorio-l-frame', '3', 3),
    ('Escritorio Lateral Wood', 'escritorio-lateral-wood', '1', 1),
    ('Escritorio Lateral Wood', 'escritorio-lateral-wood', '2', 2),
    ('Escritorio Monolito', 'escritorio-monolito', '1', 1),
    ('Escritorio Quare', 'escritorio-quare', '1', 1),
    ('Escritorio Quare', 'escritorio-quare', '2', 2),
    ('Puesto en L con Falda', 'puesto-en-l-con-falda', '1', 1),
    ('Puesto en L con Falda', 'puesto-en-l-con-falda', '2', 2),
    ('Puesto Trabajo Lateral Glass', 'puesto-trabajo-lateral-glass', '1', 1),
    ('Puesto Trabajo Lateral Glass', 'puesto-trabajo-lateral-glass', '2', 2),
    ('Superficie Recta con Base', 'superficie-recta-con-base', '1', 1)
)
INSERT OR IGNORE INTO producto_imagenes (producto_id, imagen_url, angulo, orden)
SELECT
  productos.id,
  '/productos/escritorios/' || imagenes.slug || '-' || imagenes.posicion || '.webp',
  'vista-' || imagenes.posicion,
  imagenes.orden
FROM imagenes
JOIN productos
  ON productos.nombre = imagenes.nombre AND productos.categoria_id = 21;
