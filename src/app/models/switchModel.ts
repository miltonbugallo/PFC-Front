import { ConexionSwitch } from "./conexionSwitch";
import { ipModel } from "./ipModel";
import { sectorModel } from "./sectorModel";

export interface switchModel {
    id: string;
    ip: ipModel;
    marca: string;
    modelo: string;
    sector: sectorModel;
    conexion: ConexionSwitch;
    agente: {
        id: number,
        nombre: "string",
        apellido: "string"
      };
    etiqueta: string
}
