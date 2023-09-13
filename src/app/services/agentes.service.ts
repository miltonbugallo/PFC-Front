import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgentesService {

  constructor() { }


  agentesData = [
    { id: "1", ip: '10.255.255', nombre: 'Milton', apellido: 'Bugallo', sector: 'Secretaria' },
    { id: "2", ip: '20.255.255', nombre: 'Joaco', apellido: 'Luengo', sector: 'IT'},
    { id: "3", ip: '30.255.255', nombre: 'Miguel', apellido: 'Robledo', sector: 'Ministerio' },
  ];

  obtenerAgentes() {
    return this.agentesData
  }

}
