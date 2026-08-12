-- Productos de Sillas > Lounge. El precio 0 se muestra como “Precio a cotizar”.
-- Cada producto conserva la vista frontal como portada y la lateral en su galería.
INSERT INTO productos (nombre, imagen_url, precio, especificaciones, categoria_id)
SELECT 'Silla VAMP', '/productos/lounge/vamp-frente.webp', 0, NULL, 13
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Silla VAMP' AND categoria_id = 13);

INSERT INTO productos (nombre, imagen_url, precio, especificaciones, categoria_id)
SELECT 'Silla SWAM', '/productos/lounge/swam-frente.webp', 0, NULL, 13
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Silla SWAM' AND categoria_id = 13);

INSERT INTO productos (nombre, imagen_url, precio, especificaciones, categoria_id)
SELECT 'Silla LIA', '/productos/lounge/lia-frente.webp', 0, NULL, 13
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Silla LIA' AND categoria_id = 13);

INSERT INTO productos (nombre, imagen_url, precio, especificaciones, categoria_id)
SELECT 'Silla KARL', '/productos/lounge/karl-frente.webp', 0, NULL, 13
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Silla KARL' AND categoria_id = 13);

INSERT INTO productos (nombre, imagen_url, precio, especificaciones, categoria_id)
SELECT 'Silla GENEVE', '/productos/lounge/geneve-frente.webp', 0, NULL, 13
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Silla GENEVE' AND categoria_id = 13);

INSERT INTO productos (nombre, imagen_url, precio, especificaciones, categoria_id)
SELECT 'Silla BRIGHT', '/productos/lounge/bright-frente.webp', 0, NULL, 13
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Silla BRIGHT' AND categoria_id = 13);

INSERT INTO productos (nombre, imagen_url, precio, especificaciones, categoria_id)
SELECT 'Silla BOOM PRO', '/productos/lounge/boom-pro-frente.webp', 0, NULL, 13
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Silla BOOM PRO' AND categoria_id = 13);

INSERT INTO productos (nombre, imagen_url, precio, especificaciones, categoria_id)
SELECT 'Silla BOOM', '/productos/lounge/boom-frente.webp', 0, NULL, 13
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Silla BOOM' AND categoria_id = 13);

INSERT INTO productos (nombre, imagen_url, precio, especificaciones, categoria_id)
SELECT 'Silla BLADE', '/productos/lounge/blade-frente.webp', 0, NULL, 13
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Silla BLADE' AND categoria_id = 13);

INSERT OR IGNORE INTO producto_imagenes (producto_id, imagen_url, angulo, orden)
SELECT id, '/productos/lounge/vamp-frente.webp', 'frente', 1 FROM productos WHERE nombre = 'Silla VAMP' AND categoria_id = 13;
INSERT OR IGNORE INTO producto_imagenes (producto_id, imagen_url, angulo, orden)
SELECT id, '/productos/lounge/vamp-lado.webp', 'lado', 2 FROM productos WHERE nombre = 'Silla VAMP' AND categoria_id = 13;

INSERT OR IGNORE INTO producto_imagenes (producto_id, imagen_url, angulo, orden)
SELECT id, '/productos/lounge/swam-frente.webp', 'frente', 1 FROM productos WHERE nombre = 'Silla SWAM' AND categoria_id = 13;
INSERT OR IGNORE INTO producto_imagenes (producto_id, imagen_url, angulo, orden)
SELECT id, '/productos/lounge/swam-lado.webp', 'lado', 2 FROM productos WHERE nombre = 'Silla SWAM' AND categoria_id = 13;

INSERT OR IGNORE INTO producto_imagenes (producto_id, imagen_url, angulo, orden)
SELECT id, '/productos/lounge/lia-frente.webp', 'frente', 1 FROM productos WHERE nombre = 'Silla LIA' AND categoria_id = 13;
INSERT OR IGNORE INTO producto_imagenes (producto_id, imagen_url, angulo, orden)
SELECT id, '/productos/lounge/lia-lado.webp', 'lado', 2 FROM productos WHERE nombre = 'Silla LIA' AND categoria_id = 13;

INSERT OR IGNORE INTO producto_imagenes (producto_id, imagen_url, angulo, orden)
SELECT id, '/productos/lounge/karl-frente.webp', 'frente', 1 FROM productos WHERE nombre = 'Silla KARL' AND categoria_id = 13;
INSERT OR IGNORE INTO producto_imagenes (producto_id, imagen_url, angulo, orden)
SELECT id, '/productos/lounge/karl-lado.webp', 'lado', 2 FROM productos WHERE nombre = 'Silla KARL' AND categoria_id = 13;

INSERT OR IGNORE INTO producto_imagenes (producto_id, imagen_url, angulo, orden)
SELECT id, '/productos/lounge/geneve-frente.webp', 'frente', 1 FROM productos WHERE nombre = 'Silla GENEVE' AND categoria_id = 13;
INSERT OR IGNORE INTO producto_imagenes (producto_id, imagen_url, angulo, orden)
SELECT id, '/productos/lounge/geneve-lado.webp', 'lado', 2 FROM productos WHERE nombre = 'Silla GENEVE' AND categoria_id = 13;

INSERT OR IGNORE INTO producto_imagenes (producto_id, imagen_url, angulo, orden)
SELECT id, '/productos/lounge/bright-frente.webp', 'frente', 1 FROM productos WHERE nombre = 'Silla BRIGHT' AND categoria_id = 13;
INSERT OR IGNORE INTO producto_imagenes (producto_id, imagen_url, angulo, orden)
SELECT id, '/productos/lounge/bright-lado.webp', 'lado', 2 FROM productos WHERE nombre = 'Silla BRIGHT' AND categoria_id = 13;

INSERT OR IGNORE INTO producto_imagenes (producto_id, imagen_url, angulo, orden)
SELECT id, '/productos/lounge/boom-pro-frente.webp', 'frente', 1 FROM productos WHERE nombre = 'Silla BOOM PRO' AND categoria_id = 13;
INSERT OR IGNORE INTO producto_imagenes (producto_id, imagen_url, angulo, orden)
SELECT id, '/productos/lounge/boom-pro-lado.webp', 'lado', 2 FROM productos WHERE nombre = 'Silla BOOM PRO' AND categoria_id = 13;

INSERT OR IGNORE INTO producto_imagenes (producto_id, imagen_url, angulo, orden)
SELECT id, '/productos/lounge/boom-frente.webp', 'frente', 1 FROM productos WHERE nombre = 'Silla BOOM' AND categoria_id = 13;
INSERT OR IGNORE INTO producto_imagenes (producto_id, imagen_url, angulo, orden)
SELECT id, '/productos/lounge/boom-lado.webp', 'lado', 2 FROM productos WHERE nombre = 'Silla BOOM' AND categoria_id = 13;

INSERT OR IGNORE INTO producto_imagenes (producto_id, imagen_url, angulo, orden)
SELECT id, '/productos/lounge/blade-frente.webp', 'frente', 1 FROM productos WHERE nombre = 'Silla BLADE' AND categoria_id = 13;
INSERT OR IGNORE INTO producto_imagenes (producto_id, imagen_url, angulo, orden)
SELECT id, '/productos/lounge/blade-lado.webp', 'lado', 2 FROM productos WHERE nombre = 'Silla BLADE' AND categoria_id = 13;
