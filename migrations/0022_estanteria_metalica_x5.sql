-- Estantería Metálica x5 en acabados blanco y negro.
INSERT INTO productos (nombre, imagen_url, precio, especificaciones, categoria_id)
SELECT
  'Estantería Metálica x5',
  '/productos/estanteria/estanteria-metalica-x5-1.webp',
  0,
  NULL,
  18
WHERE NOT EXISTS (
  SELECT 1
  FROM productos
  WHERE nombre = 'Estantería Metálica x5' AND categoria_id = 18
);

-- Mantiene la migración idempotente y limitada a Estantería.
UPDATE productos
SET
  imagen_url = '/productos/estanteria/estanteria-metalica-x5-1.webp',
  precio = 0,
  especificaciones = NULL,
  updated_at = CURRENT_TIMESTAMP
WHERE categoria_id = 18 AND nombre = 'Estantería Metálica x5';

WITH imagenes(imagen_url, angulo, orden) AS (
  VALUES
    ('/productos/estanteria/estanteria-metalica-x5-1.webp', 'acabado-blanco', 1),
    ('/productos/estanteria/estanteria-metalica-x5-2.webp', 'acabado-negro', 2)
)
INSERT OR IGNORE INTO producto_imagenes (producto_id, imagen_url, angulo, orden)
SELECT productos.id, imagenes.imagen_url, imagenes.angulo, imagenes.orden
FROM imagenes
JOIN productos
  ON productos.nombre = 'Estantería Metálica x5' AND productos.categoria_id = 18;
