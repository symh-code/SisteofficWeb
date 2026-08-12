-- Galería de imágenes para productos con más de una vista.
CREATE TABLE IF NOT EXISTS producto_imagenes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  producto_id INTEGER NOT NULL REFERENCES productos(id) ON DELETE CASCADE,
  imagen_url TEXT NOT NULL,
  angulo TEXT,
  orden INTEGER NOT NULL DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (producto_id, imagen_url)
);

CREATE INDEX IF NOT EXISTS idx_producto_imagenes_producto
  ON producto_imagenes (producto_id, orden, id);

-- La tabla productos exige un precio. El valor 0 representa “Precio a cotizar”
-- en el frontend. Estos productos no tienen descripción/especificaciones.
INSERT INTO productos (nombre, imagen_url, precio, especificaciones, categoria_id)
SELECT 'Silla ARI', '/productos/sala-de-espera/ari-frente.webp', 0, NULL, 16
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Silla ARI' AND categoria_id = 16);

INSERT INTO productos (nombre, imagen_url, precio, especificaciones, categoria_id)
SELECT 'Silla BUTTERFLY', '/productos/sala-de-espera/butterfly-frente.webp', 0, NULL, 16
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Silla BUTTERFLY' AND categoria_id = 16);

INSERT INTO productos (nombre, imagen_url, precio, especificaciones, categoria_id)
SELECT 'Silla BX CROMADO', '/productos/sala-de-espera/bx-cromado-frente.webp', 0, NULL, 16
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Silla BX CROMADO' AND categoria_id = 16);

INSERT INTO productos (nombre, imagen_url, precio, especificaciones, categoria_id)
SELECT 'Silla ISOCELES', '/productos/sala-de-espera/isoceles-frente.webp', 0, NULL, 16
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Silla ISOCELES' AND categoria_id = 16);

INSERT INTO productos (nombre, imagen_url, precio, especificaciones, categoria_id)
SELECT 'Silla LOGAN', '/productos/sala-de-espera/logan-frente.webp', 0, NULL, 16
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Silla LOGAN' AND categoria_id = 16);

INSERT INTO productos (nombre, imagen_url, precio, especificaciones, categoria_id)
SELECT 'Silla NOVAISO', '/productos/sala-de-espera/novaiso-frente.webp', 0, NULL, 16
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Silla NOVAISO' AND categoria_id = 16);

INSERT INTO productos (nombre, imagen_url, precio, especificaciones, categoria_id)
SELECT 'Silla ORION', '/productos/sala-de-espera/orion-frente.webp', 0, NULL, 16
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Silla ORION' AND categoria_id = 16);

INSERT INTO productos (nombre, imagen_url, precio, especificaciones, categoria_id)
SELECT 'Silla PRISMA', '/productos/sala-de-espera/prisma-frente.webp', 0, NULL, 16
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Silla PRISMA' AND categoria_id = 16);

INSERT INTO productos (nombre, imagen_url, precio, especificaciones, categoria_id)
SELECT 'Silla Q5', '/productos/sala-de-espera/q5-frente.webp', 0, NULL, 16
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Silla Q5' AND categoria_id = 16);

INSERT INTO productos (nombre, imagen_url, precio, especificaciones, categoria_id)
SELECT 'Silla VISSO', '/productos/sala-de-espera/visso-frente.webp', 0, NULL, 16
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Silla VISSO' AND categoria_id = 16);

INSERT INTO productos (nombre, imagen_url, precio, especificaciones, categoria_id)
SELECT 'Silla ZYLE', '/productos/sala-de-espera/zyle-frente.webp', 0, NULL, 16
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Silla ZYLE' AND categoria_id = 16);

-- Registra portada y vista lateral en el mismo producto. PRISMA solo tiene una
-- imagen adjunta, por lo que su galería contiene únicamente la vista frontal.
INSERT OR IGNORE INTO producto_imagenes (producto_id, imagen_url, angulo, orden)
SELECT id, '/productos/sala-de-espera/ari-frente.webp', 'frente', 1 FROM productos WHERE nombre = 'Silla ARI' AND categoria_id = 16;
INSERT OR IGNORE INTO producto_imagenes (producto_id, imagen_url, angulo, orden)
SELECT id, '/productos/sala-de-espera/ari-lado.webp', 'lado', 2 FROM productos WHERE nombre = 'Silla ARI' AND categoria_id = 16;

INSERT OR IGNORE INTO producto_imagenes (producto_id, imagen_url, angulo, orden)
SELECT id, '/productos/sala-de-espera/butterfly-frente.webp', 'frente', 1 FROM productos WHERE nombre = 'Silla BUTTERFLY' AND categoria_id = 16;
INSERT OR IGNORE INTO producto_imagenes (producto_id, imagen_url, angulo, orden)
SELECT id, '/productos/sala-de-espera/butterfly-lado.webp', 'lado', 2 FROM productos WHERE nombre = 'Silla BUTTERFLY' AND categoria_id = 16;

INSERT OR IGNORE INTO producto_imagenes (producto_id, imagen_url, angulo, orden)
SELECT id, '/productos/sala-de-espera/bx-cromado-frente.webp', 'frente', 1 FROM productos WHERE nombre = 'Silla BX CROMADO' AND categoria_id = 16;
INSERT OR IGNORE INTO producto_imagenes (producto_id, imagen_url, angulo, orden)
SELECT id, '/productos/sala-de-espera/bx-cromado-lado.webp', 'lado', 2 FROM productos WHERE nombre = 'Silla BX CROMADO' AND categoria_id = 16;

INSERT OR IGNORE INTO producto_imagenes (producto_id, imagen_url, angulo, orden)
SELECT id, '/productos/sala-de-espera/isoceles-frente.webp', 'frente', 1 FROM productos WHERE nombre = 'Silla ISOCELES' AND categoria_id = 16;
INSERT OR IGNORE INTO producto_imagenes (producto_id, imagen_url, angulo, orden)
SELECT id, '/productos/sala-de-espera/isoceles-lado.webp', 'lado', 2 FROM productos WHERE nombre = 'Silla ISOCELES' AND categoria_id = 16;

INSERT OR IGNORE INTO producto_imagenes (producto_id, imagen_url, angulo, orden)
SELECT id, '/productos/sala-de-espera/logan-frente.webp', 'frente', 1 FROM productos WHERE nombre = 'Silla LOGAN' AND categoria_id = 16;
INSERT OR IGNORE INTO producto_imagenes (producto_id, imagen_url, angulo, orden)
SELECT id, '/productos/sala-de-espera/logan-lado.webp', 'lado', 2 FROM productos WHERE nombre = 'Silla LOGAN' AND categoria_id = 16;

INSERT OR IGNORE INTO producto_imagenes (producto_id, imagen_url, angulo, orden)
SELECT id, '/productos/sala-de-espera/novaiso-frente.webp', 'frente', 1 FROM productos WHERE nombre = 'Silla NOVAISO' AND categoria_id = 16;
INSERT OR IGNORE INTO producto_imagenes (producto_id, imagen_url, angulo, orden)
SELECT id, '/productos/sala-de-espera/novaiso-lado.webp', 'lado', 2 FROM productos WHERE nombre = 'Silla NOVAISO' AND categoria_id = 16;

INSERT OR IGNORE INTO producto_imagenes (producto_id, imagen_url, angulo, orden)
SELECT id, '/productos/sala-de-espera/orion-frente.webp', 'frente', 1 FROM productos WHERE nombre = 'Silla ORION' AND categoria_id = 16;
INSERT OR IGNORE INTO producto_imagenes (producto_id, imagen_url, angulo, orden)
SELECT id, '/productos/sala-de-espera/orion-lado.webp', 'lado', 2 FROM productos WHERE nombre = 'Silla ORION' AND categoria_id = 16;

INSERT OR IGNORE INTO producto_imagenes (producto_id, imagen_url, angulo, orden)
SELECT id, '/productos/sala-de-espera/prisma-frente.webp', 'frente', 1 FROM productos WHERE nombre = 'Silla PRISMA' AND categoria_id = 16;

INSERT OR IGNORE INTO producto_imagenes (producto_id, imagen_url, angulo, orden)
SELECT id, '/productos/sala-de-espera/q5-frente.webp', 'frente', 1 FROM productos WHERE nombre = 'Silla Q5' AND categoria_id = 16;
INSERT OR IGNORE INTO producto_imagenes (producto_id, imagen_url, angulo, orden)
SELECT id, '/productos/sala-de-espera/q5-lado.webp', 'lado', 2 FROM productos WHERE nombre = 'Silla Q5' AND categoria_id = 16;

INSERT OR IGNORE INTO producto_imagenes (producto_id, imagen_url, angulo, orden)
SELECT id, '/productos/sala-de-espera/visso-frente.webp', 'frente', 1 FROM productos WHERE nombre = 'Silla VISSO' AND categoria_id = 16;
INSERT OR IGNORE INTO producto_imagenes (producto_id, imagen_url, angulo, orden)
SELECT id, '/productos/sala-de-espera/visso-lado.webp', 'lado', 2 FROM productos WHERE nombre = 'Silla VISSO' AND categoria_id = 16;

INSERT OR IGNORE INTO producto_imagenes (producto_id, imagen_url, angulo, orden)
SELECT id, '/productos/sala-de-espera/zyle-frente.webp', 'frente', 1 FROM productos WHERE nombre = 'Silla ZYLE' AND categoria_id = 16;
INSERT OR IGNORE INTO producto_imagenes (producto_id, imagen_url, angulo, orden)
SELECT id, '/productos/sala-de-espera/zyle-lado.webp', 'lado', 2 FROM productos WHERE nombre = 'Silla ZYLE' AND categoria_id = 16;
