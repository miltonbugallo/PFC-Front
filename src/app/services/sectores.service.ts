import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { sectorModel } from '../models/sectorModel';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class SectoresService {

  private apiUrl = '/servidor/api/sectors'; 
  private token = this.loginService.getToken(); 

  constructor(private http: HttpClient, public loginService: LoginService) { }

  getSectores(): Observable<sectorModel[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.get<any[]>(this.apiUrl, { headers })
  }

  crearSector(sector: any): Observable<any> {
    const requestBody = {
      nombre: sector.nombre
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.post(`${this.apiUrl}`, requestBody, { headers });
  }


  eliminarSector(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.delete(`servidor/eliminar-sector/${id}`, { headers });
  }

  actualizarSector(sector: any): Observable<any> {
    const requestBody = {
      nombre: sector.nombre
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.put(`${this.apiUrl}/${sector.id}`, requestBody, { headers });
  }

}
