import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  constructor(private http: HttpClient) { }


  public alertasData: any[]= [
    { alerta: "Switch 1 desconectado"},
    { alerta: "PC 1 Ram obsoleta"},
    { alerta: "PC 1 SO obsoleto"},
    { alerta: "Switch 2 desconectado"},
    { alerta: "PC 2 Ram obsoleta"},
    { alerta: "PC 3 SO obsoleto"},
    { alerta: "Switch 3 desconectado"},
    { alerta: "PC 3 Ram obsoleta"},
    { alerta: "PC 4 SO obsoleto"},
  ];

  private url = 'URL_DE_TU_BACKEND'; // Reemplaza con la URL de tu servicio backend

  obtenerAlertas() {
    return this.alertasData
  }

  // obtenerAlertas(): Observable<any[]> {
  //   return this.http.get<any[]>(this.url);
  // }

}
