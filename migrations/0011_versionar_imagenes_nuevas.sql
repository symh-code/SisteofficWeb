-- Evita respuestas 404 conservadas por la caché de Cloudflare para imágenes
-- que se consultaron antes de que los archivos fueran desplegados.
UPDATE productos
SET
  imagen_url = imagen_url || '?v=20260812',
  updated_at = CURRENT_TIMESTAMP
WHERE categoria_id = 15
  AND imagen_url LIKE '/productos/interlocutoras/%'
  AND instr(imagen_url, '?') = 0;

UPDATE producto_imagenes
SET imagen_url = imagen_url || '?v=20260812'
WHERE producto_id IN (SELECT id FROM productos WHERE categoria_id = 15)
  AND imagen_url LIKE '/productos/interlocutoras/%'
  AND instr(imagen_url, '?') = 0;

UPDATE productos
SET
  imagen_url = imagen_url || '?v=20260812',
  updated_at = CURRENT_TIMESTAMP
WHERE categoria_id = 22
  AND nombre IN ('Cubículo', 'Isla comercial', 'Isla de trabajo en L', 'Isla de trabajo recta', 'Wave')
  AND imagen_url LIKE '/productos/islas-de-trabajo/%'
  AND instr(imagen_url, '?') = 0;

UPDATE producto_imagenes
SET imagen_url = imagen_url || '?v=20260812'
WHERE producto_id IN (
  SELECT id
  FROM productos
  WHERE categoria_id = 22
    AND nombre IN ('Cubículo', 'Isla comercial', 'Isla de trabajo en L', 'Isla de trabajo recta', 'Wave')
)
  AND imagen_url LIKE '/productos/islas-de-trabajo/%'
  AND instr(imagen_url, '?') = 0;
