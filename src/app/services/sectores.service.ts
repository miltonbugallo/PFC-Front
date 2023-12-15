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

  // getSectores(): Observable<sectorModel[]> {
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${this.token}`,
  //   });

  //   return this.http.get<any[]>(this.apiUrl, { headers })
  // }

  getSectores(): Observable<sectorModel[]> {
    // Mock data for testing
    const mockData = [
      { id: 1, nombre: 'Sector 1' },
      { id: 2, nombre: 'Sector 2' },
      { id: 3, nombre: 'Sector 3' },
      { id: 4, nombre: 'Sector 4' },
      { id: 5, nombre: 'Sector 5' },
    ];
  
    // Returning the mock data as an observable
    return of(mockData);
  }

  crearSector(sector: any): Observable<any> {
    // Construimos el objeto para enviar en la solicitud POST
    const requestBody = {
      nombre: sector.nombre
    };

    // Realizamos la solicitud POST
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
    // Construimos el objeto para enviar en la solicitud POST
    const requestBody = {
      nombre: sector.nombre
    };
    console.log(requestBody)

    // Realizamos la solicitud PATCH
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.put(`${this.apiUrl}/${sector.id}`, requestBody, { headers });
  }

}
