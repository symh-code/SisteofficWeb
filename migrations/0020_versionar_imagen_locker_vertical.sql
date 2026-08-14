-- Evita una respuesta 404 conservada por la caché de Cloudflare para la
-- imagen de Locker Vertical consultada durante la propagación del despliegue.
UPDATE productos
SET
  imagen_url = imagen_url || '?v=20260813',
  updated_at = CURRENT_TIMESTAMP
WHERE categoria_id = 17
  AND nombre = 'Locker Vertical'
  AND imagen_url = '/productos/lockers/locker-vertical-1.webp';

UPDATE producto_imagenes
SET imagen_url = imagen_url || '?v=20260813'
WHERE producto_id IN (
  SELECT id
  FROM productos
  WHERE categoria_id = 17 AND nombre = 'Locker Vertical'
)
  AND imagen_url = '/productos/lockers/locker-vertical-1.webp';
