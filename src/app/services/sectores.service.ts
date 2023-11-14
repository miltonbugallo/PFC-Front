import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { sectorModel } from '../models/sectorModel';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class SectoresService {

  private apiUrl = 'http://localhost:250/api/sectors'; 
  private token = this.loginService.getToken(); 

  constructor(private http: HttpClient, public loginService: LoginService) { }

  sectoresData = [{id: 1,nombre: 'Sector 1'}, {id:2, nombre: 'Sector 2'}, {id: 3, nombre: 'Sector 3'}];

  obtenerSectores(){
    return this.sectoresData;
  }

  getSectores(): Observable<sectorModel[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.get<any[]>(this.apiUrl, { headers })
  }

}
