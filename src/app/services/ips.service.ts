import { Injectable } from '@angular/core';
import { ipModel } from '../models/ipModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IpsService {


  constructor(private http: HttpClient) { }
  
  public ipsData: ipModel[]= [
    { id: "1", ip: '10.255.255'},
    { id: "2", ip: '20.255.255'},
    { id: "3", ip: '30.255.255'},
  ];

  private url = 'URL_DE_TU_BACKEND'; // Reemplaza con la URL de tu servicio backend
  

  obtenerIps() {
    return this.ipsData
  }

  agregarIp(ipNueva: ipModel): Observable<boolean> {
    return this.http.post<boolean>(this.url, ipNueva);
  }

  //Editar
  editarIp(ipEditar: ipModel): Observable<boolean> {
    const editUrl = `${this.url}/${ipEditar.id}`;
    return this.http.put<boolean>(editUrl, ipEditar);
  }

  //Delete
  deleteIp(ipDelete: ipModel): Observable<boolean> {
    const deleteUrl = `${this.url}/${ipDelete.id}`;
    return this.http.delete<boolean>(deleteUrl);
  }
}