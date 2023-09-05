import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgentesService {

  constructor() { }


  agentesData = [
    { ID: "1", IP: '10.255.255', Nombre: 'Milton', Rol: 'Usuario', Ubicacion: 'Secretaria', EstadoIP: 'Asignada' },
    { ID: "2", IP: '20.255.255', Nombre: 'Joaco', Rol: 'Usuario', Ubicacion: 'IT', EstadoIP: 'Asignada' },
    { ID: "3", IP: '30.255.255', Nombre: 'Miguel', Rol: 'Usuario', Ubicacion: 'Ministerio', EstadoIP: 'Asignada' },
  ];

  obtenerAgentes() {
    return this.agentesData
  }

}
