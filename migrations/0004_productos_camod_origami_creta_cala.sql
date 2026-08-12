-- Añade los tres productos nuevos de la colección CAMÖD. Las imágenes forman
-- parte de los assets públicos del sitio y se publican junto con el frontend.
INSERT INTO camodproductos (nombre, imagen_url)
SELECT 'Origami', 'https://sisteoffic.com/camodProductos/origami.webp'
WHERE NOT EXISTS (
  SELECT 1 FROM camodproductos WHERE nombre = 'Origami'
);

INSERT INTO camodproductos (nombre, imagen_url)
SELECT 'Creta', 'https://sisteoffic.com/camodProductos/creta.webp'
WHERE NOT EXISTS (
  SELECT 1 FROM camodproductos WHERE nombre = 'Creta'
);

INSERT INTO camodproductos (nombre, imagen_url)
SELECT 'Cala', 'https://sisteoffic.com/camodProductos/cala.webp'
WHERE NOT EXISTS (
  SELECT 1 FROM camodproductos WHERE nombre = 'Cala'
);
