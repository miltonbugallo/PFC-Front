import { sectorModel } from "./sectorModel";
import { ipModel } from "./ipModel";

export interface agenteModel {
    id?: number;
    ip: ipModel;
    nombre: string;
    apellido: string;
    sector: sectorModel;
}
