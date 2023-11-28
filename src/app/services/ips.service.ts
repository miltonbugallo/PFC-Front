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
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
  
    return this.http.get<any[]>(this.apiUrl, { headers }).pipe(
      map(data => data.map(item => this.mapIpAdress(item)))
    );
  }
  
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

    return this.http.delete(`servidor/eliminar-ip/${id}`, { headers });
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