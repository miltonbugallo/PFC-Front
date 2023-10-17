import { ConexionSwitch } from "./conexionSwitch";

export interface switchModel {
    id: string;
    ip: string;
    marca: string;
    modelo: string;
    sector: string;
    conexion: ConexionSwitch;
}
