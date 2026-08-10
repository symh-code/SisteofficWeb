import { getCamodProyectos, type CamodProyecto } from "../../lib/camodContent";

export type { CamodProyecto };

/** Proyectos reales de CAMÖD Studio, leídos desde public/camodProyectos. */
export const camodProyectos: CamodProyecto[] = getCamodProyectos();
