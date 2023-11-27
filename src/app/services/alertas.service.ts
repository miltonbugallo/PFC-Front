import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  private apiUrl = '/servidor/Ip-conflictivas';
  private token = this.loginService.getToken();

  constructor(private http: HttpClient, public loginService: LoginService) { }

  getAlertas(): Observable<{ equiposObsoletos: any[]; switchSinConexion: any[] }> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
  
    return this.http.get<any[]>(this.apiUrl, { headers }).pipe(
      map((response: any) => {
        return {
          equiposObsoletos: response.EquiposObsoletos ? response.EquiposObsoletos : [],
          switchSinConexion: response.SwitchesSinConexion ? response.SwitchesSinConexion : []
        };
      })
    );
  }


}

