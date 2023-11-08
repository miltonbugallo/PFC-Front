import { sectorModel } from "./sectorModel";

export interface agenteModel {
    id: string;
    ip: string;
    nombre: string;
    apellido: string;
    sector: sectorModel;
}
