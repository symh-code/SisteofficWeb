-- Corrige el nombre del producto publicado y consolida en el registro original
-- las cuatro vistas disponibles. MIN(id) conserva el producto más antiguo.
WITH producto_destino AS (
  SELECT MIN(id) AS id
  FROM productos
  WHERE categoria_id = 18
    AND nombre IN ('Estantería de Madera x5', 'Estantería Metálica x5')
),
imagenes(imagen_url, angulo, orden) AS (
  VALUES
    ('/productos/estanteria/estanteria-madera-x5-1.webp', 'vista-1', 1),
    ('/productos/estanteria/estanteria-madera-x5-2.webp', 'vista-2', 2),
    ('/productos/estanteria/estanteria-metalica-x5-1.webp', 'acabado-blanco', 3),
    ('/productos/estanteria/estanteria-metalica-x5-2.webp', 'acabado-negro', 4)
)
INSERT OR IGNORE INTO producto_imagenes (producto_id, imagen_url, angulo, orden)
SELECT producto_destino.id, imagenes.imagen_url, imagenes.angulo, imagenes.orden
FROM producto_destino
CROSS JOIN imagenes
WHERE producto_destino.id IS NOT NULL;

-- Retira galerías pertenecientes únicamente a un duplicado provisional.
DELETE FROM producto_imagenes
WHERE producto_id IN (
  SELECT id
  FROM productos
  WHERE categoria_id = 18
    AND nombre IN ('Estantería de Madera x5', 'Estantería Metálica x5')
    AND id <> (
      SELECT MIN(id)
      FROM productos
      WHERE categoria_id = 18
        AND nombre IN ('Estantería de Madera x5', 'Estantería Metálica x5')
    )
);

-- Retira únicamente el producto provisional duplicado, si existe.
DELETE FROM productos
WHERE categoria_id = 18
  AND nombre IN ('Estantería de Madera x5', 'Estantería Metálica x5')
  AND id <> (
    SELECT MIN(id)
    FROM productos
    WHERE categoria_id = 18
      AND nombre IN ('Estantería de Madera x5', 'Estantería Metálica x5')
  );

UPDATE productos
SET
  nombre = 'Estantería Metálica x5',
  imagen_url = '/productos/estanteria/estanteria-madera-x5-1.webp',
  precio = 0,
  especificaciones = NULL,
  updated_at = CURRENT_TIMESTAMP
WHERE categoria_id = 18
  AND id = (
    SELECT MIN(id)
    FROM productos
    WHERE categoria_id = 18
      AND nombre IN ('Estantería de Madera x5', 'Estantería Metálica x5')
  );
