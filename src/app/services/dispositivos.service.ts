import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { dispositivoModel } from '../models/dispositivoModel';
import { Observable, of } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class DispositivosService {
  
  private apiUrl = '/servidor/obtener-equipos';
  private token = this.loginService.getToken();


  constructor(private http: HttpClient, public loginService: LoginService) { }

  // getEquipos(): Observable<dispositivoModel[]> {
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${this.token}`,
  //   });

  //   return this.http.get<any[]>(this.apiUrl, { headers })
  // }

  getEquipos(): Observable<any[]> {
    // Mock data for testing
    const mockData = [
      {
        nombreDispositivo: 'PC 1',
        sistemaOperativo: 'Windows 7',
        memoriaRam: 4000,
        macaddress: '1324',
        sogood: false,
        ramgood: true,
        ip: '10.1.1.1',
      },
      {
        nombreDispositivo: 'PC 2',
        sistemaOperativo: 'Windows 10',
        memoriaRam: 16000,
        macaddress: null,
        sogood: true,
        ramgood: true,
        ip: '10.10.33.1',
      },
    ];
  
    // Returning the mock data as an observable
    return of(mockData);
  }
}
