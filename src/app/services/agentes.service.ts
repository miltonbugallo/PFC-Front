import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { agenteModel } from '../models/agenteModel';
import { Observable, forkJoin, map, of } from 'rxjs';
import { sectorModel } from '../models/sectorModel';
import { ipModel } from '../models/ipModel';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AgentesService {

  constructor(private http: HttpClient, public loginService: LoginService) { }

  private apiUrl = 'http://localhost:250/api/agentes';
  private token = this.loginService.getToken(); 

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
        {
          id: 3,
          nombre: 'Nombre3',
          apellido: 'Apellido3',
          ipadress: {id: 3,
            direccion: 'IP 3',} 
        },
        {
          id: 4,
          nombre: 'Nombre4',
          apellido: 'Apellido4',
          sector: { id: 2,
            nombre: 'Sector 2' }
        },
        {
          id: 5,
          nombre: 'Nombre5',
          apellido: 'Apellido5',
        },
      ];
  
      // Aplicar el mapeo a cada elemento de la lista
      const agentesFicticiosMapeados = agentesFicticiosData.map(agente => this.mapAgente(agente));
  
      return of(agentesFicticiosMapeados);
    }

  getAgentes(): Observable<agenteModel[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.get<any[]>(this.apiUrl, { headers }).pipe(
      map((data) => {
        return data.map((agente) => this.mapAgente(agente));
      })
    );
  }

  private mapAgente(agente: any): agenteModel {
    return {
      id: agente.id,
      ip: agente.ipadress ? this.mapIP(agente.ipadress) : {id:-1, direccion:''},
      nombre: agente.nombre,
      apellido: agente.apellido,
      sector: agente.sector ? this.mapSector(agente.sector) : {id:-1, nombre:''},
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
    // Realizamos la solicitud PATCH
    const headers = new HttpHeaders({
      'Content-Type': 'application/merge-patch+json',
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.patch(`${this.apiUrl}/actualizar-agente/${agente.id}`, JSON.stringify(requestBody), { headers });
  }
  

}
