import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { Observable, map, of } from 'rxjs';
import { ipDuplicadaModel } from '../models/ipDuplicadaModel';
import { agenteSinEquipoModel } from '../models/agenteSinEquipoModel';

@Injectable({
  providedIn: 'root'
})
export class IpsDuplicadasAgentesSinEquipoService {

  private apiUrl = '/servidor/Ip-conflictivas';
  private token = this.loginService.getToken();


  constructor(private http: HttpClient, public loginService: LoginService) { }

  private mapIpDuplicada(ipDuplicada: any): ipDuplicadaModel {
    return {
      id: ipDuplicada.id,
      direccion: ipDuplicada.direccion,
      agente: ipDuplicada.agente ? ipDuplicada.agente : { nombre: '', apellido: '' },
      switch: ipDuplicada.switch ? ipDuplicada.switch : { etiqueta: '' },
      equipo: ipDuplicada.equipo ? ipDuplicada.equipo : { nombreDispositivo: '' },
    };
  }

  getData(): Observable<{ ipsDuplicadas: ipDuplicadaModel[]; agentesSinEquipo: agenteSinEquipoModel[] }> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.get<any[]>(this.apiUrl, { headers }).pipe(
      map((response: any[]) => {
        const ipsDuplicadasData = response.find((item) => item.nombre === 'ipsDuplicadas');
        const agentesSinEquipoData = response.find((item) => item.nombre === 'agenteSinEquipo');

        return {
          ipsDuplicadas: ipsDuplicadasData ? ipsDuplicadasData.map((ipDuplicada: ipDuplicadaModel) => this.mapIpDuplicada(ipDuplicada)) : [],
          agentesSinEquipo: agentesSinEquipoData ? agentesSinEquipoData : [],
        };
      })
    );
  }
}
