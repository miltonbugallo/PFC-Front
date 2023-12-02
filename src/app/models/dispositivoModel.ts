import { ipModel } from "./ipModel";

export interface dispositivoModel {
    nombreDispositivo: string;
    sistemaOperativo: string;
    memoriaRam: number;
    macaddress: string,
    ipadress: ipModel,
    sogood: boolean,
    ramgood: boolean,
    ip: string

}
