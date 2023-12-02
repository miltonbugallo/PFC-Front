import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { sistemaOperativoModel } from '../models/sistemaOperativoModel';

@Injectable({
  providedIn: 'root'
})
export class SistemasOperativosService {

  constructor(private http: HttpClient, public loginService: LoginService) { }

  private apiUrl = '/servidor/api/sistema_operativos';
  private token = this.loginService.getToken(); 


  getSO(): Observable<sistemaOperativoModel[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.get<any[]>(this.apiUrl, { headers })
  }

  crearSO(so: any): Observable<any> {
    // Construimos el objeto para enviar en la solicitud POST
    const requestBody = {
      nombre: so.nombre,
      version: so.version,
    };
    console.log(requestBody)

    // Realizamos la solicitud POST
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.post(`${this.apiUrl}`, requestBody, { headers });
  }


  eliminarSO(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }

  actualizarSO(so: any): Observable<any> {
    // Construimos el objeto para enviar en la solicitud POST
    const requestBody = {
      nombre: so.nombre,
      version: so.version,
    };
    console.log(requestBody)

    // Realizamos la solicitud PATCH
    const headers = new HttpHeaders({
      'Content-Type': 'application/merge-patch+json',
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.put(`${this.apiUrl}/${so.id}`, requestBody, { headers });
  }

}
