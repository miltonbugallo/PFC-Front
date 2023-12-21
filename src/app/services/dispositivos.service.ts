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

  getEquipos(): Observable<dispositivoModel[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.get<any[]>(this.apiUrl, { headers })
  }

}
