UPDATE categorias
SET nombre = 'Counter', nombre_visible = 'Counter', slug = 'counter'
WHERE id = 20;

INSERT INTO categorias (id, nombre, nombre_visible, slug, parent_id, orden) VALUES
  (21, 'Escritorios', 'Escritorios', 'escritorios', 1, 1),
  (22, 'Islas de trabajo', 'Islas de trabajo', 'islas-de-trabajo', 1, 2);
