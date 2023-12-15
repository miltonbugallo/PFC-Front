import { Injectable } from '@angular/core';
import { ipModel } from '../models/ipModel';
import { Observable, map, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ipAddressModel } from '../models/ipAddressModel';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class IpsService {

  private apiUrl = '/servidor/api/ip_adresses';
  private token = this.loginService.getToken(); 

  constructor(private http: HttpClient, public loginService: LoginService) { }

  getIps(): Observable<ipAddressModel[]> {
    // Mock data for testing
    const mockData = [
      {
        id: 1,
        direccion: '192.168.0.1',
        agente: { id: 101, nombre: 'Nombre 1', apellido: 'Apellido 1' },
        switches: { id: 201, etiqueta: 'Switch 1' },
        equipo: { id: 301, nombreDispositivo: 'Equipo 1' },
      },
      {
        id: 2,
        direccion: '192.168.0.2',
        agente: { id: 102, nombre: 'Agente 2', apellido: 'Apellido 2' },
        switches: { id: 202, etiqueta: 'Switch 2' },
        equipo: { id: 302, nombreDispositivo: 'Equipo 2' },
      },
      {
        id: 3,
        direccion: '192.168.0.3',
        agente: { id: 103, nombre: 'Agente 3', apellido: 'Apellido 3' },
        switches: { id: 203, etiqueta: 'Switch 3' },
        equipo: { id: 303, nombreDispositivo: 'Equipo 3' },
      },
      {
        id: 4,
        direccion: '192.168.0.4',
        agente: { id: 104, nombre: 'Agente 4', apellido: 'Apellido 4' },
        switches: { id: 204, etiqueta: 'Switch 4' },
        equipo: { id: 304, nombreDispositivo: 'Equipo 4' },
      },
      {
        id: 5,
        direccion: '192.168.0.5',
        agente: { id: 105, nombre: 'Agente 5', apellido: 'Apellido 5' },
        switches: { id: 205, etiqueta: 'Switch 5' },
        equipo: { id: 305, nombreDispositivo: 'Equipo 5' },
      },
    ];
  
    // Mapping the mock data using the mapIpAdress method
    const mappedData = mockData.map((item) => this.mapIpAdress(item));
  
    // Returning the mock data as an observable
    return of(mappedData);
  }
  
  // getIps(): Observable<ipAddressModel[]> {
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${this.token}`,
  //   });
  
  //   return this.http.get<any[]>(this.apiUrl, { headers }).pipe(
  //     map(data => data.map(item => this.mapIpAdress(item)))
  //   );
  // }
  
  mapIpAdress(ip: any): ipAddressModel {
    return {
  id: ip.id,
  direccion: ip.direccion,
  agente: ip.agente ? ip.agente :{
    id: -1,
    nombre: '',
    apellido: ''
  },
  switches: ip.switches ? ip.switches :{
    id: -1,
    etiqueta: ''
  },
  equipo: ip.equipo ? ip.equipo :{
    id: -1,
    nombreDispositivo: '',
  }
}
  }

  mapIPModel(ipModel: any): ipModel {
    return {
      id: ipModel.id,
      direccion: ipModel.direccion,
    };
  }

  crearIp(ip: any): Observable<any> {
    // Construimos el objeto para enviar en la solicitud POST
    const requestBody = {
      direccion: ip.direccion
    };

    // Realizamos la solicitud POST
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.post(`${this.apiUrl}`, requestBody, { headers });
  }


  eliminarIp(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.delete(`servidor/eliminar-ipadress/${id}`, { headers });
  }

  actualizarIp(ip: any): Observable<any> {
    // Construimos el objeto para enviar en la solicitud POST
    const requestBody = {
      direccion: ip.direccion
    };

    // Realizamos la solicitud PUT
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.put(`${this.apiUrl}/${ip.id}`, requestBody, { headers });
  }

}