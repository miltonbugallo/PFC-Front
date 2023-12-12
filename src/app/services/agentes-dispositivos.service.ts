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


//   getData(): Observable<any> {
//   const fakeData: any  = {
//     Relacion:  [
//         {
//           direccion: "100",
//           nombre_agente: "Joaquin",
//           apellido_agente: "Loreficcio",
//           nombre_dispositivo: "22222",
//           mac_dispositivo: null
//         },
//         {
//           direccion: "200",
//           nombre_agente: "prueba sin null",
//           apellido_agente: "Apellido del Agente",
//           nombre_dispositivo: "administrador-MS-7D22",
//           mac_dispositivo: "d8:bb:c1:9e:12:da"
//         },
//         {
//           direccion: "300",
//           nombre_agente: "Marcos",
//           apellido_agente: "Roldan",
//           nombre_dispositivo: "ciencia10",
//           mac_dispositivo: "88:a4:c2:ef:51:fa"
//         }
//   ]
//   }
//   console.log(fakeData.Relacion)
//   return of(fakeData.Relacion);
// }

}