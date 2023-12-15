import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { Observable, map, of } from 'rxjs';
import { ipDuplicadaModel } from '../models/ipDuplicadaModel';

@Injectable({
  providedIn: 'root'
})
export class IpsDuplicadasAgentesSinEquipoService {

  private apiUrl = '/servidor/ip-conflictivas';
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

  // getData(): Observable<{ ipsDuplicadas: any[]; agentesSinEquipo: any[] }> {
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${this.token}`,
  //   });

  //   return this.http.get<any[]>(this.apiUrl, { headers }).pipe(
  //     map((response: any) => {
  //       return {
  //         ipsDuplicadas: response.ipsDuplicadas ? response.ipsDuplicadas.map((ipDuplicada: ipDuplicadaModel) => this.mapIpDuplicada(ipDuplicada)) : [],
  //         agentesSinEquipo: response.agenteSinEquipo ? response.agenteSinEquipo : [],
  //       };
  //     })
  //   );
  // }

  getData(): Observable<{ ipsDuplicadas: ipDuplicadaModel[]; agentesSinEquipo: any[] }> {
    // Mock data for testing
    const mockResponse = {
      ipsDuplicadas: [
        {
          id: 1,
          direccion: '192.168.0.1',
          agente: { nombre: 'Nombre 1', apellido: 'Apellido 1' },
          switch: { etiqueta: 'Switch 1' },
          equipo: { nombreDispositivo: 'Equipo 1' },
        },
      ],
      agentesSinEquipo: [
        // Fake data for agentesSinEquipo
        { id: 1, direccion: '100.10.0.1', agente: {nombre: 'Nombre 1 ', apellido: 'Apellido 1' }},
        // Add more fake data as needed
      ],
    };
  
    // Returning the mock data as an observable
    return of(mockResponse).pipe(
      map((response) => {
        return {
          ipsDuplicadas: response.ipsDuplicadas.map((ipDuplicada: any) => this.mapIpDuplicada(ipDuplicada)),
          agentesSinEquipo: response.agentesSinEquipo ? response.agentesSinEquipo : [],
        };
      })
    );
  }

}
             