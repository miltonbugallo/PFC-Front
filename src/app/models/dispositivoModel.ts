import { ipModel } from "./ipModel";

export interface dispositivoModel {
    id: string;
    nombreDispositivo: string;
    sistemaOperativo: string;
    memoriaRam: number;
    macaddress: string,
    ipadress: ipModel
}
