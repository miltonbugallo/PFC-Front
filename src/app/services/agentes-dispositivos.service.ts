import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgentesDispositivosService {

  private apiUrl = '/servidor/agente-equipo';
  private token = this.loginService.getToken();


  constructor(private http: HttpClient, public loginService: LoginService) { }


  getData(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.get<any[]>(this.apiUrl, { headers })
  }

}