BEGIN TRANSACTION;

INSERT INTO productos (nombre, imagen_url, especificaciones, created_at, updated_at, categoria_id)
SELECT 'Silla PRISMA', '/productos/operativas-ejecutivas/prisma-frente.webp', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 12
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Silla PRISMA');
INSERT INTO productos (nombre, imagen_url, especificaciones, created_at, updated_at, categoria_id)
SELECT 'Silla PINK', '/productos/operativas-ejecutivas/pink-frente.webp', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 12
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Silla PINK');
INSERT INTO productos (nombre, imagen_url, especificaciones, created_at, updated_at, categoria_id)
SELECT 'Silla PENTA', '/productos/operativas-ejecutivas/penta-frente.webp', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 12
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Silla PENTA');
INSERT INTO productos (nombre, imagen_url, especificaciones, created_at, updated_at, categoria_id)
SELECT 'Silla NOVAISO', '/productos/operativas-ejecutivas/novaiso-frente.webp', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 12
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Silla NOVAISO');
INSERT INTO productos (nombre, imagen_url, especificaciones, created_at, updated_at, categoria_id)
SELECT 'Silla NOVA', '/productos/operativas-ejecutivas/nova-frente.webp', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 12
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Silla NOVA');
INSERT INTO productos (nombre, imagen_url, especificaciones, created_at, updated_at, categoria_id)
SELECT 'Silla MILES', '/productos/operativas-ejecutivas/miles-frente.webp', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 12
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Silla MILES');
INSERT INTO productos (nombre, imagen_url, especificaciones, created_at, updated_at, categoria_id)
SELECT 'Silla RUDY', '/productos/operativas-ejecutivas/rudy-frente.webp', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 12
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Silla RUDY');
INSERT INTO productos (nombre, imagen_url, especificaciones, created_at, updated_at, categoria_id)
SELECT 'Silla REX', '/productos/operativas-ejecutivas/rex-frente.webp', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 12
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Silla REX');
INSERT INTO productos (nombre, imagen_url, especificaciones, created_at, updated_at, categoria_id)
SELECT 'Silla ONYX', '/productos/operativas-ejecutivas/onyx-frente.webp', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 12
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Silla ONYX');
INSERT INTO productos (nombre, imagen_url, especificaciones, created_at, updated_at, categoria_id)
SELECT 'Silla OLE', '/productos/operativas-ejecutivas/ole-frente.webp', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 12
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Silla OLE');
INSERT INTO productos (nombre, imagen_url, especificaciones, created_at, updated_at, categoria_id)
SELECT 'Silla MARLY', '/productos/operativas-ejecutivas/marly-frente.webp', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 12
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Silla MARLY');
INSERT INTO productos (nombre, imagen_url, especificaciones, created_at, updated_at, categoria_id)
SELECT 'Silla ISONET', '/productos/operativas-ejecutivas/isonet-frente.webp', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 12
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Silla ISONET');
INSERT INTO productos (nombre, imagen_url, especificaciones, created_at, updated_at, categoria_id)
SELECT 'Silla IRLANDA', '/productos/operativas-ejecutivas/irlanda-frente.webp', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 12
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Silla IRLANDA');
INSERT INTO productos (nombre, imagen_url, especificaciones, created_at, updated_at, categoria_id)
SELECT 'Silla HERRADURA', '/productos/operativas-ejecutivas/herradura-frente.webp', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 12
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Silla HERRADURA');
INSERT INTO productos (nombre, imagen_url, especificaciones, created_at, updated_at, categoria_id)
SELECT 'Silla BUTTERFLY', '/productos/operativas-ejecutivas/butterfly-frente.webp', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 12
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Silla BUTTERFLY');
INSERT INTO productos (nombre, imagen_url, especificaciones, created_at, updated_at, categoria_id)
SELECT 'Silla BURO', '/productos/operativas-ejecutivas/buro-frente.webp', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 12
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Silla BURO');
INSERT INTO productos (nombre, imagen_url, especificaciones, created_at, updated_at, categoria_id)
SELECT 'Silla ORION', '/productos/operativas-ejecutivas/orion-frente.webp', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 12
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Silla ORION');
INSERT INTO productos (nombre, imagen_url, especificaciones, created_at, updated_at, categoria_id)
SELECT 'Silla LOGAN', '/productos/operativas-ejecutivas/logan-frente.webp', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 12
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Silla LOGAN');
INSERT INTO productos (nombre, imagen_url, especificaciones, created_at, updated_at, categoria_id)
SELECT 'Silla ISOCELES', '/productos/operativas-ejecutivas/isoceles-frente.webp', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 12
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Silla ISOCELES');
INSERT INTO productos (nombre, imagen_url, especificaciones, created_at, updated_at, categoria_id)
SELECT 'Silla ESTELA', '/productos/operativas-ejecutivas/estela-frente.webp', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 12
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Silla ESTELA');
INSERT INTO productos (nombre, imagen_url, especificaciones, created_at, updated_at, categoria_id)
SELECT 'Silla EMMA', '/productos/operativas-ejecutivas/emma-frente.webp', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 12
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Silla EMMA');

UPDATE productos SET imagen_url = '/productos/operativas-ejecutivas/prisma-frente.webp', especificaciones = '', updated_at = CURRENT_TIMESTAMP, categoria_id = 12 WHERE nombre = 'Silla PRISMA';
UPDATE productos SET imagen_url = '/productos/operativas-ejecutivas/pink-frente.webp', especificaciones = '', updated_at = CURRENT_TIMESTAMP, categoria_id = 12 WHERE nombre = 'Silla PINK';
UPDATE productos SET imagen_url = '/productos/operativas-ejecutivas/penta-frente.webp', especificaciones = '', updated_at = CURRENT_TIMESTAMP, categoria_id = 12 WHERE nombre = 'Silla PENTA';
UPDATE productos SET imagen_url = '/productos/operativas-ejecutivas/novaiso-frente.webp', especificaciones = '', updated_at = CURRENT_TIMESTAMP, categoria_id = 12 WHERE nombre = 'Silla NOVAISO';
UPDATE productos SET imagen_url = '/productos/operativas-ejecutivas/nova-frente.webp', especificaciones = '', updated_at = CURRENT_TIMESTAMP, categoria_id = 12 WHERE nombre = 'Silla NOVA';
UPDATE productos SET imagen_url = '/productos/operativas-ejecutivas/miles-frente.webp', especificaciones = '', updated_at = CURRENT_TIMESTAMP, categoria_id = 12 WHERE nombre = 'Silla MILES';
UPDATE productos SET imagen_url = '/productos/operativas-ejecutivas/rudy-frente.webp', especificaciones = '', updated_at = CURRENT_TIMESTAMP, categoria_id = 12 WHERE nombre = 'Silla RUDY';
UPDATE productos SET imagen_url = '/productos/operativas-ejecutivas/rex-frente.webp', especificaciones = '', updated_at = CURRENT_TIMESTAMP, categoria_id = 12 WHERE nombre = 'Silla REX';
UPDATE productos SET imagen_url = '/productos/operativas-ejecutivas/onyx-frente.webp', especificaciones = '', updated_at = CURRENT_TIMESTAMP, categoria_id = 12 WHERE nombre = 'Silla ONYX';
UPDATE productos SET imagen_url = '/productos/operativas-ejecutivas/ole-frente.webp', especificaciones = '', updated_at = CURRENT_TIMESTAMP, categoria_id = 12 WHERE nombre = 'Silla OLE';
UPDATE productos SET imagen_url = '/productos/operativas-ejecutivas/marly-frente.webp', especificaciones = '', updated_at = CURRENT_TIMESTAMP, categoria_id = 12 WHERE nombre = 'Silla MARLY';
UPDATE productos SET imagen_url = '/productos/operativas-ejecutivas/isonet-frente.webp', especificaciones = '', updated_at = CURRENT_TIMESTAMP, categoria_id = 12 WHERE nombre = 'Silla ISONET';
UPDATE productos SET imagen_url = '/productos/operativas-ejecutivas/irlanda-frente.webp', especificaciones = '', updated_at = CURRENT_TIMESTAMP, categoria_id = 12 WHERE nombre = 'Silla IRLANDA';
UPDATE productos SET imagen_url = '/productos/operativas-ejecutivas/herradura-frente.webp', especificaciones = '', updated_at = CURRENT_TIMESTAMP, categoria_id = 12 WHERE nombre = 'Silla HERRADURA';
UPDATE productos SET imagen_url = '/productos/operativas-ejecutivas/butterfly-frente.webp', especificaciones = '', updated_at = CURRENT_TIMESTAMP, categoria_id = 12 WHERE nombre = 'Silla BUTTERFLY';
UPDATE productos SET imagen_url = '/productos/operativas-ejecutivas/buro-frente.webp', especificaciones = '', updated_at = CURRENT_TIMESTAMP, categoria_id = 12 WHERE nombre = 'Silla BURO';
UPDATE productos SET imagen_url = '/productos/operativas-ejecutivas/orion-frente.webp', especificaciones = '', updated_at = CURRENT_TIMESTAMP, categoria_id = 12 WHERE nombre = 'Silla ORION';
UPDATE productos SET imagen_url = '/productos/operativas-ejecutivas/logan-frente.webp', especificaciones = '', updated_at = CURRENT_TIMESTAMP, categoria_id = 12 WHERE nombre = 'Silla LOGAN';
UPDATE productos SET imagen_url = '/productos/operativas-ejecutivas/isoceles-frente.webp', especificaciones = '', updated_at = CURRENT_TIMESTAMP, categoria_id = 12 WHERE nombre = 'Silla ISOCELES';
UPDATE productos SET imagen_url = '/productos/operativas-ejecutivas/estela-frente.webp', especificaciones = '', updated_at = CURRENT_TIMESTAMP, categoria_id = 12 WHERE nombre = 'Silla ESTELA';
UPDATE productos SET imagen_url = '/productos/operativas-ejecutivas/emma-frente.webp', especificaciones = '', updated_at = CURRENT_TIMESTAMP, categoria_id = 12 WHERE nombre = 'Silla EMMA';

DELETE FROM producto_imagenes
WHERE producto_id IN (
  SELECT id FROM productos WHERE nombre IN (
    'Silla PRISMA', 'Silla PINK', 'Silla PENTA', 'Silla NOVAISO', 'Silla NOVA',
    'Silla MILES', 'Silla RUDY', 'Silla REX', 'Silla ONYX', 'Silla OLE',
    'Silla MARLY', 'Silla ISONET', 'Silla IRLANDA', 'Silla HERRADURA',
    'Silla BUTTERFLY', 'Silla BURO', 'Silla ORION', 'Silla LOGAN',
    'Silla ISOCELES', 'Silla ESTELA', 'Silla EMMA'
  )
);

INSERT INTO producto_imagenes (producto_id, imagen_url, orden)
SELECT id, '/productos/operativas-ejecutivas/' ||
  CASE nombre
    WHEN 'Silla PRISMA' THEN 'prisma' WHEN 'Silla PINK' THEN 'pink'
    WHEN 'Silla PENTA' THEN 'penta' WHEN 'Silla NOVAISO' THEN 'novaiso'
    WHEN 'Silla NOVA' THEN 'nova' WHEN 'Silla MILES' THEN 'miles'
    WHEN 'Silla RUDY' THEN 'rudy' WHEN 'Silla REX' THEN 'rex'
    WHEN 'Silla ONYX' THEN 'onyx' WHEN 'Silla OLE' THEN 'ole'
    WHEN 'Silla MARLY' THEN 'marly' WHEN 'Silla ISONET' THEN 'isonet'
    WHEN 'Silla IRLANDA' THEN 'irlanda' WHEN 'Silla HERRADURA' THEN 'herradura'
    WHEN 'Silla BUTTERFLY' THEN 'butterfly' WHEN 'Silla BURO' THEN 'buro'
    WHEN 'Silla ORION' THEN 'orion' WHEN 'Silla LOGAN' THEN 'logan'
    WHEN 'Silla ISOCELES' THEN 'isoceles' WHEN 'Silla ESTELA' THEN 'estela'
    WHEN 'Silla EMMA' THEN 'emma'
  END || '-frente.webp', 1
FROM productos WHERE categoria_id = 12 AND nombre IN (
  'Silla PRISMA', 'Silla PINK', 'Silla PENTA', 'Silla NOVAISO', 'Silla NOVA',
  'Silla MILES', 'Silla RUDY', 'Silla REX', 'Silla ONYX', 'Silla OLE',
  'Silla MARLY', 'Silla ISONET', 'Silla IRLANDA', 'Silla HERRADURA',
  'Silla BUTTERFLY', 'Silla BURO', 'Silla ORION', 'Silla LOGAN',
  'Silla ISOCELES', 'Silla ESTELA', 'Silla EMMA'
);

INSERT INTO producto_imagenes (producto_id, imagen_url, orden)
SELECT id, '/productos/operativas-ejecutivas/' ||
  CASE nombre
    WHEN 'Silla PRISMA' THEN 'prisma' WHEN 'Silla PINK' THEN 'pink'
    WHEN 'Silla PENTA' THEN 'penta' WHEN 'Silla NOVAISO' THEN 'novaiso'
    WHEN 'Silla NOVA' THEN 'nova' WHEN 'Silla MILES' THEN 'miles'
    WHEN 'Silla RUDY' THEN 'rudy' WHEN 'Silla REX' THEN 'rex'
    WHEN 'Silla ONYX' THEN 'onyx' WHEN 'Silla OLE' THEN 'ole'
    WHEN 'Silla MARLY' THEN 'marly' WHEN 'Silla ISONET' THEN 'isonet'
    WHEN 'Silla IRLANDA' THEN 'irlanda' WHEN 'Silla HERRADURA' THEN 'herradura'
    WHEN 'Silla BUTTERFLY' THEN 'butterfly' WHEN 'Silla BURO' THEN 'buro'
    WHEN 'Silla ORION' THEN 'orion' WHEN 'Silla LOGAN' THEN 'logan'
    WHEN 'Silla ISOCELES' THEN 'isoceles' WHEN 'Silla ESTELA' THEN 'estela'
    WHEN 'Silla EMMA' THEN 'emma'
  END || '-lado.webp', 2
FROM productos WHERE categoria_id = 12 AND nombre IN (
  'Silla PRISMA', 'Silla PINK', 'Silla PENTA', 'Silla NOVAISO', 'Silla NOVA',
  'Silla MILES', 'Silla RUDY', 'Silla REX', 'Silla ONYX', 'Silla OLE',
  'Silla MARLY', 'Silla ISONET', 'Silla IRLANDA', 'Silla HERRADURA',
  'Silla BUTTERFLY', 'Silla BURO', 'Silla ORION', 'Silla LOGAN',
  'Silla ISOCELES', 'Silla ESTELA', 'Silla EMMA'
);

COMMIT;
