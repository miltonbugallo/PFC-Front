import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgentesDispositivosService {

  private apiUrl = '/servidor/agentes-dispositivos';
  private token = this.loginService.getToken();


  constructor(private http: HttpClient, public loginService: LoginService) { }

  

  getData(): Observable<any[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.get<any[]>(this.apiUrl, { headers })
  }


//   getData(): Observable<any[]> {
//   const fakeData: any[] = Array.from({ length: 5 }, (_, index) => ({
//     id: index + 1,
//     direccion: '100'+index, // Puedes personalizar estos valores según tus necesidades
//     agente: {
//       id: index + 1,
//       nombre: 'nombre'+index,
//       apellido: 'apellido'+index,
//     },
//     equipo: {
//       id: index + 1,
//       nombreDispositivo: 'equipo'+index,
//     },
//   }));
//   return of(fakeData);
// }

}