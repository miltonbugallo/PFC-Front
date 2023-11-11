import { Injectable } from '@angular/core';
import { ipModel } from '../models/ipModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IpsService {

  private apiUrl = 'http://localhost:250/api/ipaddress'; // Reemplaza con la URL de tu backend
  private token = 'TU_TOKEN'; // Reemplaza con tu token de autorización
  constructor(private http: HttpClient) { }
  
  public ipsData: ipModel[]= [
    { id: 1, direccion: '10.255.255'},
    { id: 2, direccion: '20.255.255'},
    { id: 3, direccion: '30.255.255'},
  ];

  obtenerIps() {
    return this.ipsData
  }

  getIps(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  mapIPModel(ipModel: any): ipModel {
    return {
      id: ipModel.id,
      direccion: ipModel.direccion,
    };
  }

}