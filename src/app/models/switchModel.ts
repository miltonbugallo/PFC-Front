import { CondicionSwitch } from "./condicionSwitch";

export interface switchModel {
    id: string;
    ip: string;
    condicion: CondicionSwitch;
    nombre: string;
    sector: string;
    estado: string
}
