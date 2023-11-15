import { Injectable } from '@angular/core';
import { ipModel } from '../models/ipModel';
import { Observable } from 'rxjs';
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

    return this.http.get<any[]>(this.apiUrl, { headers })
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
    };
    console.log(requestBody)

    // Realizamos la solicitud POST
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.post(`${this.apiUrl}/agregar-ip`, requestBody, { headers });
  }


  eliminarIp(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.delete(`${this.apiUrl}/eliminar-ip/${id}`, { headers });
  }

  actualizarIp(ip: any): Observable<any> {
    // Construimos el objeto para enviar en la solicitud POST
    const requestBody = {
    };
    console.log(requestBody)

    // Realizamos la solicitud PATCH
    const headers = new HttpHeaders({
      'Content-Type': 'application/merge-patch+json',
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.patch(`${this.apiUrl}/actualizar-ip/${ip.id}`, requestBody, { headers });
  }

}