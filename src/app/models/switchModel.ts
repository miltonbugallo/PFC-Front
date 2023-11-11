import { ConexionSwitch } from "./conexionSwitch";
import { ipModel } from "./ipModel";
import { sectorModel } from "./sectorModel";

export interface switchModel {
    id: string;
    ip: string;
    marca: string;
    modelo: string;
    sector: string;
    conexion: ConexionSwitch;
    // agente: {
    //     id: number,
    //     nombre: "string",
    //     apellido: "string"
    //   };
    // etiqueta: string
}
