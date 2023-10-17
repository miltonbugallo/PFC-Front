import { CondicionIP } from "./condicionIP";

export interface agenteModel {
    id: string;
    ip: string;
    nombre: string;
    rol: string;
    ubicacion: string;
    estadoIP: CondicionIP
}
