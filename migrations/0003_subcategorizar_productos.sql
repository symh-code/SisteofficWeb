-- Las categorías padre quedan como agrupadores. Cada producto debe apuntar a
-- una categoría hoja para que el catálogo pueda filtrarlo correctamente.

-- Escritorios individuales dentro de "Puesto de trabajo".
UPDATE productos
SET categoria_id = 21,
    updated_at = CURRENT_TIMESTAMP
WHERE id IN (1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18);

-- Islas y estaciones colaborativas dentro de "Puesto de trabajo".
UPDATE productos
SET categoria_id = 22,
    updated_at = CURRENT_TIMESTAMP
WHERE id IN (19, 20, 21, 22, 23, 24);

-- Eclipse es una mesa ejecutiva de reuniones, no un puesto individual.
UPDATE productos
SET categoria_id = 2,
    updated_at = CURRENT_TIMESTAMP
WHERE id = 10;
