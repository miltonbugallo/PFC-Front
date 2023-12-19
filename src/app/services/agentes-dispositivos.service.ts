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

  

  // getData(): Observable<any> {
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${this.token}`,
  //   });

  //   return this.http.get<any[]>(this.apiUrl, { headers })
  // }


  getData(): Observable<any> {
  const fakeData: any  = {
    Relacion:  [
        {
          direccion: "100.100.1.0",
          nombre_agente: "Nombre 1",
          apellido_agente: "Apellido 1",
          nombre_dispositivo: "Equipo 1",
          mac_dispositivo: null
        },
        {
          direccion: "200.200.0.1",
          nombre_agente: "Nombre 2",
          apellido_agente: "Apellido 2",
          nombre_dispositivo: "Equipo 2",
          mac_dispositivo: "d8:bb:c1:9e:12:da"
        },
        {
          direccion: "300.300.0.1",
          nombre_agente: "Nombre 3",
          apellido_agente: "Apellido 3",
          nombre_dispositivo: "Equipo 3",
          mac_dispositivo: "88:a4:c2:ef:51:fa"
        }
  ]
  }
  return of(fakeData);
}

}