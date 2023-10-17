import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgentesSinEquipoService {

  constructor(private http: HttpClient) { }


  agentesSinEquipoData = [
    { id: "1", ip: '10.255.255', agente: 'Milton'},
    { id: "2", ip: '20.255.255', agente: 'Joaco'},
    { id: "3", ip: '30.255.255', agente: 'Miguel'},
  ];

  obtenerAgentesSinEquipo() {
    return this.agentesSinEquipoData
  }

}
