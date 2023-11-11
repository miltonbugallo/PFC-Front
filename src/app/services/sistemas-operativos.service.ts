import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SistemasOperativosService {

  private apiUrl = 'http://localhost:250/api/sectors'; // Reemplaza con la URL de tu backend
  private token = 'TU_TOKEN'; // Reemplaza con tu token de autorización
  constructor(private http: HttpClient) { }


  getSistemasOperativos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

}
