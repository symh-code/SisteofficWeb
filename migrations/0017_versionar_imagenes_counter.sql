-- Evita respuestas 404 conservadas por la caché de Cloudflare para las
-- imágenes de Counter consultadas durante la propagación del despliegue.
UPDATE productos
SET
  imagen_url = imagen_url || '?v=20260813',
  updated_at = CURRENT_TIMESTAMP
WHERE categoria_id = 20
  AND nombre IN (
    'Japandi', 'Signature', 'Recepción Soft', 'Recepción Curve', 'Lumi',
    'Line Light', 'Counter Recepción Glass', 'Counter Nórdico', 'Balance',
    'Arc Wood', 'Woon'
  )
  AND imagen_url LIKE '/productos/counter/%'
  AND instr(imagen_url, '?') = 0;

UPDATE producto_imagenes
SET imagen_url = imagen_url || '?v=20260813'
WHERE producto_id IN (
  SELECT id
  FROM productos
  WHERE categoria_id = 20
    AND nombre IN (
      'Japandi', 'Signature', 'Recepción Soft', 'Recepción Curve', 'Lumi',
      'Line Light', 'Counter Recepción Glass', 'Counter Nórdico', 'Balance',
      'Arc Wood', 'Woon'
    )
)
  AND imagen_url LIKE '/productos/counter/%'
  AND instr(imagen_url, '?') = 0;
