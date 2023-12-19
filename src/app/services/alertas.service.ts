import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  private apiUrl = '/servidor/alert'; 
  private token = this.loginService.getToken();

  constructor(private http: HttpClient, public loginService: LoginService) { }

  getAlertas(): Observable<{ equiposObsoletos: any[]; switchSinConexion: any[] }> {
    // Mock data for testing
    const mockData = {
      EquiposObsoletos: Array.from({ length: 3 }, (_, index) => ({
        ip: '1.1.1.1',
        nombre: `Equipo${index + 1}`,
        SO: 'Windows 10',
        RAM: 8192
      })),
      SwitchesSinConexion: Array.from({ length: 2 }, (_, index) => ({
        ip: ['1.1.1.1'],
        marca: `Marca${index + 1}`,
        modelo: `Modelo${index + 1}`,
        estadoConexion: false,
        etiqueta: `SW-${index + 1}`
      }))
    };
  
    // Returning the mock data as an observable
    return of({equiposObsoletos: mockData.EquiposObsoletos, switchSinConexion: mockData.SwitchesSinConexion});
  }

  // getAlertas(): Observable<{ equiposObsoletos: any[]; switchSinConexion: any[] }> {
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${this.token}`,
  //   });
  
  //   return this.http.get<any[]>(this.apiUrl, { headers }).pipe(
  //     map((response: any) => {
  //       return {
  //         equiposObsoletos: response.EquiposObsoletos ? response.EquiposObsoletos : [],
  //         switchSinConexion: response.SwitchesSinConexion ? response.SwitchesSinConexion : []
  //       };
  //     })
  //   );
  // }


}

