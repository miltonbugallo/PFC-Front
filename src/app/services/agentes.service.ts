import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { agenteModel } from '../models/agenteModel';
import { Observable, forkJoin, map, of } from 'rxjs';
import { sectorModel } from '../models/sectorModel';
import { ipModel } from '../models/ipModel';

@Injectable({
  providedIn: 'root'
})
export class AgentesService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:250/api/agentes'; // Reemplaza con la URL de tu backend
  private token = 'TU_TOKEN'; // Reemplaza con tu token de autorización

  //Datos pruebas

    getAgentesFicticios(): Observable<agenteModel[]> {
      const agentesFicticiosData = [
        {
          id: 1,
          nombre: 'Nombre1',
          apellido: 'Apellido1',
          sector: { id: 1,
            nombre: 'Sector 1' },
          ipadress: {id: 1,
            direccion: 'IP 1',} 
        },
        {
          id: 2,
          nombre: 'Nombre2',
          apellido: 'Apellido2',
          sector: { id: 2,
            nombre: 'Sector 2' },
          ipadress: {id: 2,
            direccion: 'IP 2',} 
        },
      ];
  
      // Aplicar el mapeo a cada elemento de la lista
      const agentesFicticiosMapeados = agentesFicticiosData.map(agente => this.mapAgente(agente));
  
      return of(agentesFicticiosMapeados);
    }


  // Datos reales
  getAgentePorId(id: number): Observable<agenteModel> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map((agente) => {
        return this.mapAgente(agente);
      })
    );
  }  

  getAgentes(): Observable<agenteModel[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((data) => {
        return data.map((agente) => this.mapAgente(agente));
      })
    );
  }

  private mapAgente(agente: any): agenteModel {
    return {
      id: agente.id,
      ip: this.mapIP(agente.ipadress),
      nombre: agente.nombre,
      apellido: agente.apellido,
      sector: this.mapSector(agente.sector),
    };
  }

  private mapSector(sector: any): sectorModel {
    return {
      id: sector.id,
      nombre: sector.nombre,
    };
  }

  private mapIP(ipadress: any): ipModel {
    return {
      id: ipadress.id,
      direccion: ipadress.direccion,
    };
  }

  crearAgente(agente: any): Observable<any> {
    // Construimos el objeto para enviar en la solicitud POST
    const requestBody = {
      nombre: agente.nombre,
      apellido: agente.apellido,
      sector: agente.sector ? `/api/sectors/${agente.sector}` : null,
      ipAdress: agente.ip ? { direccion: `/api/ip_adresses/${agente.ip}` } : null,
    };

    // Realizamos la solicitud POST
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.post(`${this.apiUrl}/agregar-agente`, JSON.stringify(requestBody), { headers });
  }


  eliminarAgente(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.delete(`${this.apiUrl}/eliminar-agente/${id}`, { headers });
  }

  actualizarAgente(agente: any): Observable<any> {
    // Construimos el objeto para enviar en la solicitud PUT
    const requestBody = {
      nombre: agente.nombre,
      apellido: agente.apellido,
      sector: agente.sector ? `/api/sectors/${agente.sector}` : null,
      ipAdress: agente.ip ? { direccion: `/api/ip_adresses/${agente.ip}` } : null,
    };

    // Realizamos la solicitud PUT
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.put(`${this.apiUrl}/actualizar-agente/${agente.id}`, JSON.stringify(requestBody), { headers });
  }
  

}
