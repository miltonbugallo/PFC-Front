import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IpsDuplicadasService {

  constructor(private http: HttpClient) { }


  ipsDuplicadasData = [
    { id: "1", ip: '10.255.255', agentes: ["Agente1", "Agente2"], dispositivos: ["Dispositivo1", "Dispositivo2"], switches: []}
  ];

  obtenerIpsDuplicadas() {
    return this.ipsDuplicadasData
  }
}
