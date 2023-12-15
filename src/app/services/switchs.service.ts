import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { LoginService } from './login.service';
import { switchModel } from '../models/switchModel';
import { ConexionSwitch } from '../models/conexionSwitch';

@Injectable({
  providedIn: 'root'
})
export class SwitchsService {

  constructor(private http: HttpClient, public loginService: LoginService) { }

  private apiUrl = '/servidor/api/switches';
  private token = this.loginService.getToken(); 

  getSwitch(): Observable<switchModel[]> {
    const mockData = [
      {
        id: 1,
        ipadress: { id: 1, direccion: '192.168.1.1' },
        marca: 'Marca 1',
        modelo: 'Modelo 1',
        sector: { id: 1, nombre: 'Sector 1' },
        estadoConexion: true,
        agente: { id: 1, nombre: 'Nombre 1', apellido: 'Apellido 1' },
        etiqueta: 'Etiqueta 1',
      },
      {
        id: 2,
        ipadress: { id: 2, direccion: '192.122.1.1' },
        marca: 'Marca 2',
        modelo: 'Modelo 2',
        sector: { id: 2, nombre: 'Sector 2' },
        estadoConexion: true,
        agente: { id: 2, nombre: 'Nombre 2', apellido: 'Apellido 2' },
        etiqueta: 'Etiqueta 2',
      },
      {
        id: 3,
        ipadress: { id: 3, direccion: '192.111.1.1' },
        marca: 'Marca 3',
        modelo: 'Modelo 3',
        sector: { id: 1, nombre: 'Sector 1' },
        estadoConexion: false,
        agente: { id: 3, nombre: 'Nombre 3', apellido: 'Apellido 3' },
        etiqueta: 'Etiqueta 3',
      },
      // Add more sample data as needed
    ];
  
    // Mapping the mock data using the mapSwitch method
    const mappedData = mockData.map((switchs) => this.mapSwitch(switchs));
  
    // Returning the mock data as an observable
    return of(mappedData);
  }

  // getSwitch(): Observable<switchModel[]> {
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${this.token}`,
  //   });

  //   return this.http.get<any[]>(this.apiUrl, { headers }).pipe(
  //     map((data) => {
  //       return data.map((switchs) => this.mapSwitch(switchs));
  //     })
  //   );
  // }

  private mapSwitch(switchs: any): switchModel {
    return {
      id: switchs.id,
      ip: switchs.ipadress ? switchs.ipadress : {id:-1, direccion:''},
      marca: switchs.marca,
      modelo: switchs.modelo,
      sector: switchs.sector ? switchs.sector : {id:-1, nombre:''},
      conexion: switchs.estadoConexion == true ? ConexionSwitch.Encendido : ConexionSwitch.Apagado,
      agente: switchs.agente ? switchs.agente : {id:-1, nombre:'', apellido: ''},
      etiqueta: switchs.etiqueta
    };
  }

  crearSwitch(switchs: any): Observable<any> {
    // Construimos el objeto para enviar en la solicitud POST
    const requestBody = {
      marca: switchs.marca,
      modelo: switchs.modelo,
      etiqueta: switchs.etiqueta,
      estadoConexion: switchs.conexion == ConexionSwitch.Encendido ? true : false,
      sector: switchs.sector ? `/api/sectors/${switchs.sector}` : null,
      agente: switchs.agente ? `/api/agentes/${switchs.agente}` : null,
      ipAdress: switchs.ip ? { direccion: switchs.ip } : null,
    };

    // Realizamos la solicitud POST
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.post(`servidor/agregar-switch`, requestBody, { headers });
  }


  eliminarSwitch(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.post(`servidor/eliminar-switch/${id}`, { headers });
  }

  actualizarSwitch(switchs: any): Observable<any> {
    // Construimos el objeto para enviar en la solicitud POST
    const requestBody = {
      marca: switchs.marca,
      modelo: switchs.modelo,
      etiqueta: switchs.etiqueta,
      estadoConexion: switchs.conexion == ConexionSwitch.Encendido ? true : false,
      sector: switchs.sector ? `/api/sectors/${switchs.sector}` : null,
      agente: switchs.agente ? `/api/agentes/${switchs.agente}` : null,
      ipAdress: switchs.ip ? { direccion: switchs.ip } : null,
    };

    // Realizamos la solicitud PATCH
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.post(`servidor/actualizar-switch/${switchs.id}`, requestBody, { headers });
  }
  

}
