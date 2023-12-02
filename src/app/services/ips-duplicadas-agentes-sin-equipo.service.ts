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

  getData(): Observable<{ ipsDuplicadas: any[]; agentesSinEquipo: any[] }> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.get<any[]>(this.apiUrl, { headers }).pipe(
      map((response: any) => {
        return {
          ipsDuplicadas: response.ipsDuplicadas ? response.ipsDuplicadas.map((ipDuplicada: ipDuplicadaModel) => this.mapIpDuplicada(ipDuplicada)) : [],
          agentesSinEquipo: response.agenteSinEquipo ? response.agenteSinEquipo : [],
        };
      })
    );
  }

}
             