import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { agenteModel } from '../models/agenteModel';
import { Observable, map, of } from 'rxjs';
import { sectorModel } from '../models/sectorModel';
import { ipModel } from '../models/ipModel';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AgentesService {

  constructor(private http: HttpClient, public loginService: LoginService) { }

  private apiUrl = '/servidor/api/agentes';
  private token = this.loginService.getToken(); 

  getAgentes(): Observable<agenteModel[]> {
    // Datos falsos para la prueba
    const datosFalsos = [
      {
        id: 1,
        ipadress: {id: 1, direccion: '192.168.0.1'},
        nombre: 'Nombre 1',
        apellido: 'Apellido 1',
        sector: { id: 1, nombre: 'Sector 1' },
      },
      {
        id: 2,
        ipadress: {id: 2, direccion: '255.255.0.1'},
        nombre: 'Nombre 2',
        apellido: 'Apellido 2',
        sector: { id: 2, nombre: 'Sector 2' },
      },
      {
        id: 3,
        ipadress: {id: 3, direccion: '10.10.0.1'},
        nombre: 'Nombre 3',
        apellido: 'Apellido 3',
        sector: { id: 1, nombre: 'Sector 1' },
      },
    ];
  
    // Mapea los datos falsos utilizando la función mapAgente
    const agentesFalsos = datosFalsos.map((agente) => this.mapAgente(agente));
  
    // Devuelve un observable que emite los datos falsos
    return of(agentesFalsos);
  }

  // getAgentes(): Observable<agenteModel[]> {
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${this.token}`,
  //   });

  //   return this.http.get<any[]>(this.apiUrl, { headers }).pipe(
  //     map((data) => {
  //       return data.map((agente) => this.mapAgente(agente));
  //     })
  //   );
  // }

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
      ipAdress: agente.ip ? { direccion: agente.ip } : null,
    };
    // Realizamos la solicitud POST
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.post(`servidor/agregar-agente`, requestBody, { headers });
  }


  eliminarAgente(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.post(`servidor/eliminar-agente/${id}`, { headers });
  }

  actualizarAgente(agente: any): Observable<any> {
    // Construimos el objeto para enviar en la solicitud POST
    const requestBody = {
      nombre: agente.nombre,
      apellido: agente.apellido,
      sector: agente.sector ? `/api/sectors/${agente.sector}` : null,
      ipAdress: agente.ip ? { direccion: agente.ip } : null,
    };
    // Realizamos la solicitud PATCH
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.post(`servidor/actualizar-agente/${agente.id}`, requestBody, { headers });
  }
  

}
