-- Añade jerarquía a la taxonomía existente sin reconstruir la tabla ni
-- modificar los IDs que ya utilizan los productos.
ALTER TABLE categorias ADD COLUMN slug TEXT;
ALTER TABLE categorias ADD COLUMN parent_id INTEGER REFERENCES categorias(id);
ALTER TABLE categorias ADD COLUMN orden INTEGER NOT NULL DEFAULT 0;
ALTER TABLE categorias ADD COLUMN nombre_visible TEXT;

UPDATE categorias SET
  nombre = CASE id
    WHEN 1 THEN 'Puesto de trabajo'
    WHEN 2 THEN 'Mesas de juntas'
    WHEN 3 THEN 'Sillas'
    WHEN 4 THEN 'Línea educativa'
    WHEN 5 THEN 'Almacenamiento'
    WHEN 6 THEN 'Cabinas Zenbox'
    WHEN 7 THEN 'Divisiones'
    WHEN 8 THEN 'Mobiliario especial'
    WHEN 9 THEN 'Accesorios'
  END,
  nombre_visible = CASE id
    WHEN 1 THEN 'Puesto de trabajo'
    WHEN 2 THEN 'Mesas de juntas'
    WHEN 3 THEN 'Sillas'
    WHEN 4 THEN 'Línea educativa'
    WHEN 5 THEN 'Almacenamiento'
    WHEN 6 THEN 'Cabinas Zenbox'
    WHEN 7 THEN 'Divisiones'
    WHEN 8 THEN 'Mobiliario especial'
    WHEN 9 THEN 'Accesorios'
  END,
  slug = CASE id
    WHEN 1 THEN 'puesto-de-trabajo'
    WHEN 2 THEN 'mesas-de-juntas'
    WHEN 3 THEN 'sillas'
    WHEN 4 THEN 'linea-educativa'
    WHEN 5 THEN 'almacenamiento'
    WHEN 6 THEN 'cabinas-zenbox'
    WHEN 7 THEN 'divisiones'
    WHEN 8 THEN 'mobiliario-especial'
    WHEN 9 THEN 'accesorios'
  END,
  orden = CASE id
    WHEN 1 THEN 1
    WHEN 2 THEN 1
    WHEN 3 THEN 3
    WHEN 4 THEN 5
    WHEN 5 THEN 4
    WHEN 6 THEN 6
    WHEN 7 THEN 7
    WHEN 8 THEN 9
    WHEN 9 THEN 10
  END
WHERE id BETWEEN 1 AND 9;

INSERT INTO categorias (id, nombre, nombre_visible, slug, parent_id, orden) VALUES
  (10, 'Mesas', 'Mesas', 'mesas', NULL, 2),
  (11, 'Mesas generales', 'Mesas', 'mesas-generales', 10, 2),
  (12, 'Sillas operativas y ejecutivas', 'Sillas operativas y ejecutivas', 'sillas-operativas-ejecutivas', 3, 1),
  (13, 'Lounge', 'Lounge', 'lounge', 3, 2),
  (14, 'Gerenciales', 'Gerenciales', 'gerenciales', 3, 3),
  (15, 'Interlocutoras', 'Interlocutoras', 'interlocutoras', 3, 4),
  (16, 'Sala de espera', 'Sala de espera', 'sala-de-espera', 3, 5),
  (17, 'Lockers', 'Lockers', 'lockers', 5, 1),
  (18, 'Estantería', 'Estantería', 'estanteria', 5, 2),
  (19, 'Archivadores', 'Archivadores', 'archivadores', 5, 3),
  (20, 'Recepciones', 'Recepciones', 'recepciones', NULL, 8);

UPDATE categorias SET parent_id = 10 WHERE id = 2;

CREATE UNIQUE INDEX idx_categorias_slug ON categorias(slug);
CREATE INDEX idx_categorias_parent_id ON categorias(parent_id);
CREATE INDEX idx_categorias_orden ON categorias(parent_id, orden);
